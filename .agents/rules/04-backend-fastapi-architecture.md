---
trigger: glob
globs: "apps/backend/**"
description: "FastAPI modular monolith structure, unidirectional layers, Pydantic v2 schemas, and async DB patterns for apps/backend."
---

# KopKar SAI — FastAPI Backend Architecture Rule

## Rule Identity
- **Activation**: **Glob (`apps/backend/**`)**
- **Scope**: All code inside `apps/backend/`.

---

## 1. Modular Monolith Canonical Layout

Backend dikembangkan sebagai modular monolith berbasis **FastAPI** dengan batas tanggung jawab antarlapisan yang tegas:

```text
apps/backend/
├── app/
│   ├── main.py                     # FastAPI application entrypoint & middleware
│   ├── core/                       # Core configuration, security & infrastructure
│   │   ├── config.py               # Pydantic BaseSettings (environment variables)
│   │   ├── security.py             # Password hashing (bcrypt) & JWT token handling
│   │   ├── database.py             # SQLAlchemy 2.0 async engine & sessionmaker
│   │   ├── storage.py              # S3-compatible client (upload, presigned URLs)
│   │   └── exceptions.py           # Custom domain exception classes & handlers
│   │
│   ├── shared/                     # Cross-domain shared infrastructure & models
│   │   ├── dependencies.py         # DB session & RBAC get_current_user dependencies
│   │   ├── pagination.py           # Standardized pagination schemas & helpers
│   │   └── audit.py                # Audit log tracking decorator/helper
│   │
│   └── modules/                    # Business domain modules
│       ├── auth/                   # Shared Authentication & User Profile
│       │   ├── router.py           # /api/v1/auth/* endpoints
│       │   ├── schemas.py          # LoginRequest, RegisterRequest, UserResponse
│       │   ├── service.py          # Authentication & verification workflow
│       │   ├── repository.py       # User persistence queries
│       │   └── models.py           # User & Role database entities
│       │
│       ├── kopkar/                 # Koperasi Karyawan Domain
│       │   ├── membership/         # Dual-Approval member registration
│       │   ├── suppliers/          # Supplier submission & activity tracking
│       │   ├── samples/            # Physical sample testing cycle & schedule
│       │   ├── simulation/         # Flat & decreasing loan calculator
│       │   └── analytics/          # Daily supply recommendation engine
│       │
│       └── marketplace/            # Internal Marketplace Domain
│           ├── catalog/            # Physical store products & ACC supplier goods
│           ├── orders/             # Same-day & Pre-order H-1 carts & checkout
│           ├── checklist/          # Store shelf physical checklist for cashiers
│           ├── ga_priority/        # General Affairs high-priority order queue
│           └── payments/           # Bank transfer upload & cashier verification
```

---

## 2. Unidirectional Layer Responsibilities

Setiap modul domain wajib mematuhi alur pemanggilan satu arah:

```text
HTTP Request
     │
     ▼
[router.py]        ──► Validasi request payload menggunakan Pydantic v2 schemas
     │                 Injeksi dependency (DB session, current_user, role check)
     ▼
[service.py]       ──► Logika bisnis murni, validasi domain invariants, alur kerja
     │                 (contoh: verifikasi alur Dual-Approval, batas H-1 katering)
     ▼
[repository.py]    ──► Akses data SQLAlchemy 2.0 (Query, Filter, Insert, Update)
     │                 Dilarang menempatkan HTTP exceptions di lapisan ini
     ▼
[models.py]        ──► Deklarasi entitas SQLAlchemy Mapped & Table schema
```

---

## 3. Pydantic v2 Schema Rules

1. **Pemisahan Input dan Output**:
   - `*CreateRequest` / `*UpdateRequest`: Schema untuk payload masukan dengan validasi ketat (`Field(..., min_length=1)`).
   - `*Response`: Schema untuk data keluaran dengan `model_config = ConfigDict(from_attributes=True)`.
2. **Output Sanitization**: Dilarang mengembalikan objek database mentah secara langsung. Selalu mapping ke response schema untuk mencegah kebocoran atribut sensitif (`password_hash`, internal IDs).

---

## 4. Error Handling & HTTP Status Code Mapping

Gunakan custom domain exception yang didefinisikan pada modul atau `core/exceptions.py`:

```python
# Contoh penanganan exception terstandar
class BusinessRuleViolationException(Exception):
    def __init__(self, message: str, code: str):
        self.message = message
        self.code = code

# Mapping pada router / exception handler:
# - EntityNotFoundException        -> HTTP 404 Not Found
# - AuthorizationDeniedException   -> HTTP 403 Forbidden
# - AuthenticationFailedException  -> HTTP 401 Unauthorized
# - BusinessRuleViolationException -> HTTP 422 Unprocessable Entity
```

---

## 5. Asynchronous Operations & Database Sessions

1. Gunakan SQLAlchemy 2.0 `AsyncSession` dengan pola dependensi FastAPI:
   ```python
   async def get_db() -> AsyncGenerator[AsyncSession, None]:
       async with AsyncSessionLocal() as session:
           yield session
   ```
2. Pastikan setiap operasi I/O (S3 upload, email dispatching) bersifat non-blocking (`async def` atau didelegasikan ke background tasks).
