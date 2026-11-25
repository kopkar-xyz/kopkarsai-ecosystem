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
 * Slicing 1:1 Presisi aistudio-src DashboardPage:
 * - Header: font-okashi text-[20px] text-[#18221D]
 * - Container: rounded-2xl border border-[#EAE4D3] bg-white p-5
 * - Table header: bg-[#F6F2E6] text-[12px] font-medium text-[#526058] rounded-l-xl / rounded-r-xl
 * Budget: < 200 LOC.
 */
export const TopProductsTableCard: React.FC<TopProductsTableCardProps> = ({
  products = DEFAULT_TOP_PRODUCTS,
  className = '',
}) => {
  return (
    <div className={`rounded-2xl bg-white border border-[#EAE4D3] p-5 shadow-xs flex flex-col justify-between h-full select-none ${className}`}>
      {/* Header */}
      <div className="mb-3 pb-2 border-b border-[#F0EBDC]">
        <h3 className="font-okashi text-[20px] text-[#18221D]">
          Produk terlaris
        </h3>
        <p className="text-[12px] text-[#7A867E] mt-0.5">
          Kontribusi penjualan tertinggi
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[360px]">
          <thead>
            <tr className="bg-[#F6F2E6] text-[12px] font-medium text-[#526058]">
              <th className="rounded-l-xl py-2.5 px-3">
                Produk
              </th>
              <th className="py-2.5 px-3 text-right">
                Terjual
              </th>
              <th className="rounded-r-xl py-2.5 px-3 text-right">
                Omset
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0EBDC] text-[13px]">
            {products.slice(0, 4).map((item) => (
              <tr key={item.id} className="hover:bg-[#FAF7EE]/75 transition-colors">
                {/* 1. Nama & Kategori Produk */}
                <td className="py-3 px-3 align-top">
                  <div className="font-semibold text-[#18221D] leading-tight block">
                    {item.name}
                  </div>
                  <span className="text-[11.5px] text-[#7A867E] block mt-0.5">
                    {item.category}
                  </span>
                </td>

                {/* 2. Volume Terjual */}
                <td className="py-3 px-3 align-top text-right font-medium text-[#18221D] tabular-nums whitespace-nowrap">
                  {item.soldUnits}
                </td>

                {/* 3. Total Omset & Persentase Kenaikan */}
                <td className="py-3 px-3 align-top text-right whitespace-nowrap">
                  <span className="font-semibold text-[#18221D] tabular-nums block">
                    {formatCurrencyIDR(item.totalRevenue)}
                  </span>
                  <span className="block text-[11px] font-medium text-[#15803D] tabular-nums mt-0.5">
                    +{item.growthPercentage.toLocaleString('id-ID')}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
