import React from 'react';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { TopProductMetric } from '../../analytics/types';

interface TopProductsTableCardProps {
  products?: TopProductMetric[];
  className?: string;
}

const DEFAULT_TOP_PRODUCTS: TopProductMetric[] = [
  {
    id: 'tp-1',
    name: 'Nasi Kotak Ayam Bakar Madu',
    category: 'Makanan berat',
    soldUnits: 342,
    totalRevenue: 8550000,
    growthPercentage: 18.5,
  },
  {
    id: 'tp-2',
    name: 'Roti Gandum Serat Tinggi',
    category: 'Makanan ringan',
    soldUnits: 285,
    totalRevenue: 3990000,
    growthPercentage: 12.3,
  },
  {
    id: 'tp-3',
    name: 'Snack Box Rapat GA Unit B',
    category: 'Makanan ringan',
    soldUnits: 190,
    totalRevenue: 2850000,
    growthPercentage: 24.1,
  },
  {
    id: 'tp-4',
    name: 'Susu UHT Full Cream 250ml',
    category: 'Minuman',
    soldUnits: 240,
    totalRevenue: 2040000,
    growthPercentage: 7.8,
  },
];

/**
 * TopProductsTableCard — Tabel Produk Terlaris
 * Slicing 1:1 sesuai template kanonikal kopkar-sai-beranda (1).html.
 * Budget: < 200 LOC.
 */
export const TopProductsTableCard: React.FC<TopProductsTableCardProps> = ({
  products = DEFAULT_TOP_PRODUCTS,
  className = '',
}) => {
  return (
    <div className={`rounded-2xl bg-white border border-[#E9E2D2] p-5 shadow-xs flex flex-col justify-between h-full ${className}`}>
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg sm:text-[22px] font-heading font-medium text-[#14261E] leading-snug">
          Produk terlaris
        </h2>
        <p className="text-[13px] font-sans text-[#6F776F] mt-0.5">
          Kontribusi penjualan tertinggi
        </p>
      </div>

      {/* Table Slicing 1:1 */}
      <div className="overflow-x-auto scrollbar-thin flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F2EBDC]">
              <th className="rounded-l-[10px] py-2.5 px-3 text-left text-[13px] font-heading font-medium text-[#6F776F]">
                Produk
              </th>
              <th className="py-2.5 px-3 text-right text-[13px] font-heading font-medium text-[#6F776F]">
                Terjual
              </th>
              <th className="rounded-r-[10px] py-2.5 px-3 text-right text-[13px] font-heading font-medium text-[#6F776F]">
                Omset
              </th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 4).map((item, idx) => {
              const isLast = idx === Math.min(products.length, 4) - 1;
              return (
                <tr key={item.id} className="hover:bg-[#F8F4EC]/60 transition-colors">
                  {/* 1. Nama & Kategori Produk */}
                  <td className={`py-3 px-3 align-top ${isLast ? 'border-b-0' : 'border-b border-[#E9E2D2]'}`}>
                    <b className="text-[13px] font-heading font-medium text-[#14261E] leading-tight block">
                      {item.name}
                    </b>
                    <span className="text-xs font-sans text-[#6F776F] block mt-0.5">
                      {item.category}
                    </span>
                  </td>

                  {/* 2. Volume Terjual */}
                  <td className={`py-3 px-3 align-top text-right text-[13px] font-sans font-medium text-[#14261E] tabular-nums whitespace-nowrap ${isLast ? 'border-b-0' : 'border-b border-[#E9E2D2]'}`}>
                    {item.soldUnits}
                  </td>

                  {/* 3. Total Omset & Persentase Kenaikan */}
                  <td className={`py-3 px-3 align-top text-right whitespace-nowrap ${isLast ? 'border-b-0' : 'border-b border-[#E9E2D2]'}`}>
                    <span className="text-[13px] font-sans font-medium text-[#14261E] tabular-nums block">
                      {formatCurrencyIDR(item.totalRevenue)}
                    </span>
                    <span className="block text-xs font-semibold text-[#1E7A4F] tabular-nums mt-0.5">
                      +{item.growthPercentage.toLocaleString('id-ID')}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
