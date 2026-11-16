import React from 'react';
import { Card } from './Card';
import { StatusBadge } from './StatusBadge';
import { formatCurrencyIDR } from '../../lib/utils';
import type { OperationalStatus } from '../../types';

export type ProductUnit = 'SAI-B' | 'SAI-T';
export type ProductType = 'Makanan Basah' | 'Makanan Kering' | 'Minuman';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  productType: ProductType;
  unit: ProductUnit;
  price: number;
  stock: number;
  status: OperationalStatus;
  supplier?: string;
  isActive?: boolean;
}

interface ProductCardProps {
  product: ProductItem;
  className?: string;
  onClick?: () => void;
}

export const mapTypeToFilterCategory = (type: string): ProductType => {
  if (type.includes('Minuman')) return 'Minuman';
  if (type.includes('Kering') || type.includes('Keripik')) return 'Makanan Kering';
  return 'Makanan Basah';
};

export const getOperationalStatus = (
  submissionStatus: string,
  isActive: boolean
): OperationalStatus => {
  if (submissionStatus === 'DISETUJUI') {
    return isActive ? 'ACTIVE' : 'INACTIVE';
  }
  if (submissionStatus === 'PERLU_REVISI') return 'REVISION';
  if (submissionStatus === 'DITOLAK') return 'REJECTED';
  return 'IN_REVIEW';
};

/**
 * ProductCard — Bento card untuk etalase katalog produk koperasi
 * Budget: < 200 LOC.
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '', onClick }) => {
  return (
    <Card
      padding="sm"
      onClick={onClick}
      className={`space-y-2.5 flex flex-col justify-between hover:shadow-bento-hover select-none cursor-pointer active:scale-[0.99] transition-all group ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-1.5 mb-1.5 flex-wrap">
          <span className="text-[10px] font-accent font-bold px-2 py-0.5 rounded-md bg-[#F3ECDD] text-[#2F6F56] border border-[#DED5C3]">
            {product.productType}
          </span>
          <StatusBadge status={product.status} size="sm" />
        </div>
        <h3 className="text-sm sm:text-base font-heading font-bold text-[#1A2421] line-clamp-1 group-hover:text-[#1F5B45] transition-colors">
          {product.name}
        </h3>
        <p className="text-xs font-body text-[#5C6F67] line-clamp-1">
          {product.supplier || 'Produksi Sendiri'}
        </p>
      </div>

      <div className="pt-2 border-t border-[#DED5C3]/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-accent text-[#5C6F67]">Harga Anggota</span>
          <p className="text-sm font-heading font-extrabold text-[#1F5B45]">
            {formatCurrencyIDR(product.price)}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-accent text-[#5C6F67]">Tempat</span>
          <p className="text-xs font-heading font-extrabold text-[#1A2421]">
            {product.unit}
          </p>
        </div>
      </div>
    </Card>
  );
};
