# Backend Domain Module Templates (FastAPI)

Gunakan template acuan di bawah ini saat menyusun modul domain baru.

---

## 1. `models.py` (SQLAlchemy 2.0 Async Mapped)

```python
from datetime import datetime
from decimal import Decimal
from typing import Optional
from sqlalchemy import String, Numeric, Boolean, DateTime, ForeignKey, func, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class ProductSubmission(Base):
    __tablename__ = "product_submissions"
    __table_args__ = {"schema": "schema_kopkar"}

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    supplier_id: Mapped[int] = mapped_column(ForeignKey("shared_auth.users.id"), nullable=False, index=True)
    product_name: Mapped[str] = mapped_column(String(150), nullable=False)
    product_type: Mapped[str] = mapped_column(String(50), nullable=False) # 'CATERING' atau 'STORE'
    cost_price: Mapped[Decimal] = mapped_column(Numeric(15, 2), nullable=False) # HPP
    proposed_sale_price: Mapped[Decimal] = mapped_column(Numeric(15, 2), nullable=False)
    status: Mapped[str] = mapped_column(String(30), default="PROPOSED", nullable=False) # PROPOSED, SAMPLE_SCHEDULED, APPROVED, REJECTED
    photo_s3_key: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
```

---

## 2. `schemas.py` (Pydantic v2 DTOs)

```python
from datetime import datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

class ProductSubmissionCreateRequest(BaseModel):
    product_name: str = Field(..., min_length=3, max_length=150)
    product_type: str = Field(..., pattern="^(CATERING|STORE)$")
    cost_price: Decimal = Field(..., gt=0, description="Harga Pokok Penjualan (HPP)")
    proposed_sale_price: Decimal = Field(..., gt=0, description="Usulan Harga Jual")
    photo_s3_key: Optional[str] = None

class ProductSubmissionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    supplier_id: int
    product_name: str
    product_type: str
    cost_price: Decimal
    proposed_sale_price: Decimal
    status: str
    photo_url: Optional[str] = None
    created_at: datetime
```

---

## 3. `repository.py` (SQLAlchemy 2.0 Async Queries)

```python
from typing import Optional, Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from .models import ProductSubmission

class ProductSubmissionRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, submission_id: int) -> Optional[ProductSubmission]:
        stmt = select(ProductSubmission).where(ProductSubmission.id == submission_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def list_by_supplier(self, supplier_id: int) -> Sequence[ProductSubmission]:
        stmt = (
            select(ProductSubmission)
            .where(ProductSubmission.supplier_id == supplier_id)
            .order_by(ProductSubmission.created_at.desc())
        )
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def create(self, submission: ProductSubmission) -> ProductSubmission:
        self.session.add(submission)
        await self.session.flush()
        await self.session.refresh(submission)
        return submission
```

---

## 4. `service.py` (Authoritative Business Logic)

```python
from typing import Sequence
from app.core.exceptions import BusinessRuleViolationException, NotFoundException
from app.core.storage import get_presigned_download_url
from .models import ProductSubmission
from .repository import ProductSubmissionRepository
from .schemas import ProductSubmissionCreateRequest, ProductSubmissionResponse

class ProductSubmissionService:
    def __init__(self, repository: ProductSubmissionRepository):
        self.repo = repository

    async def submit_product(
        self, supplier_id: int, request: ProductSubmissionCreateRequest
    ) -> ProductSubmissionResponse:
        # Invariant: Harga jual usulan tidak boleh lebih rendah dari HPP
        if request.proposed_sale_price <= request.cost_price:
            raise BusinessRuleViolationException(
                "Usulan harga jual harus lebih tinggi dari HPP (margin positif).",
                code="INVALID_PROPOSED_PRICE"
            )

        new_submission = ProductSubmission(
            supplier_id=supplier_id,
            product_name=request.product_name,
            product_type=request.product_type,
            cost_price=request.cost_price,
            proposed_sale_price=request.proposed_sale_price,
            photo_s3_key=request.photo_s3_key,
            status="PROPOSED",
        )
        created = await self.repo.create(new_submission)
        return self._to_response(created)

    def _to_response(self, entity: ProductSubmission) -> ProductSubmissionResponse:
        photo_url = get_presigned_download_url(entity.photo_s3_key) if entity.photo_s3_key else None
        return ProductSubmissionResponse(
            id=entity.id,
            supplier_id=entity.supplier_id,
            product_name=entity.product_name,
            product_type=entity.product_type,
            cost_price=entity.cost_price,
            proposed_sale_price=entity.proposed_sale_price,
            status=entity.status,
            photo_url=photo_url,
            created_at=entity.created_at,
        )
```

---

## 5. `router.py` (FastAPI APIRouter)

```python
from typing import Sequence
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.dependencies import get_db, get_current_active_user, require_roles
from app.shared.auth_schemas import UserContext
from .schemas import ProductSubmissionCreateRequest, ProductSubmissionResponse
from .repository import ProductSubmissionRepository
from .service import ProductSubmissionService

router = APIRouter(prefix="/products/submissions", tags=["KopKar - Supplier Product Submissions"])

def get_submission_service(db: AsyncSession = Depends(get_db)) -> ProductSubmissionService:
    repo = ProductSubmissionRepository(db)
    return ProductSubmissionService(repo)

@router.post("/", response_model=ProductSubmissionResponse, status_code=status.HTTP_201_CREATED)
async def create_submission(
    payload: ProductSubmissionCreateRequest,
    current_user: UserContext = Depends(require_roles(["SUPPLIER", "ADMIN_TOKO", "SUPERADMIN"])),
    service: ProductSubmissionService = Depends(get_submission_service),
):
    return await service.submit_product(supplier_id=current_user.id, request=payload)
```
