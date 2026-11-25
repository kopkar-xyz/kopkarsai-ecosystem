import React from 'react';
import { Eye, Check } from 'lucide-react';
import { DailyOrderItem } from './OrdersDailyTableCard';

interface OrdersDailyTableRowProps {
  item: DailyOrderItem;
  onAcceptOrder: (id: string) => void;
  onViewDetail: (order: DailyOrderItem) => void;
}

/**
 * OrdersDailyTableRow — Baris Item Tabel Pesanan Hari Ini Slicing 1:1 dari aistudio-src
 * Budget: < 200 LOC.
 */
export const OrdersDailyTableRow: React.FC<OrdersDailyTableRowProps> = ({
  item,
  onAcceptOrder,
  onViewDetail,
}) => {
  const isAccepted = item.status === 'DITERIMA';

  return (
    <tr className="hover:bg-[#FAF7EE]/75 transition-colors">
      {/* Kolom 1: Produk & Mitra */}
      <td className="py-3.5 px-3">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-[#EAF4EE] text-[#165239] font-semibold text-[12.5px] flex items-center justify-center shrink-0 tabular-nums">
            {item.qty}×
          </span>
          <div className="min-w-0">
            <div className="font-semibold text-[#18221D] truncate">
              {item.productName}
            </div>
            <div className="text-[11.5px] text-[#7A867E] tabular-nums mt-0.5 truncate">
              {item.supplierName} · Rp {item.unitPrice.toLocaleString('id-ID')} / pcs
            </div>
          </div>
        </div>
      </td>

      {/* Kolom 2: Pemesan */}
      <td className="py-3.5 px-3 whitespace-nowrap">
        <div className="font-medium text-[#18221D]">{item.customerName}</div>
        <div className="text-[11.5px] text-[#7A867E] mt-0.5">
          {item.department} · {item.time}
        </div>
      </td>

      {/* Kolom 3: Unit */}
      <td className="py-3.5 px-3 whitespace-nowrap">
        <span className="text-[12px] font-medium text-[#526058]">
          {item.unit}
        </span>
      </td>

      {/* Kolom 4: Total */}
      <td className="py-3.5 px-3 text-right font-semibold text-[#18221D] tabular-nums whitespace-nowrap">
        Rp {item.totalAmount.toLocaleString('id-ID')}
      </td>

      {/* Kolom 5: Status / Aksi */}
      <td className="py-3.5 px-3 text-right whitespace-nowrap">
        <div className="inline-flex items-center gap-2">
          {isAccepted ? (
            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#15803D]">
              <Check className="w-3.5 h-3.5" /> Diterima
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onAcceptOrder(item.id)}
              aria-label={`Terima pesanan ${item.productName}`}
              className="px-3.5 py-1.5 rounded-lg bg-[#165239] hover:bg-[#11402c] text-white text-[12px] font-medium transition-colors cursor-pointer"
            >
              Terima
            </button>
          )}
          <button
            type="button"
            onClick={() => onViewDetail(item)}
            aria-label={`Lihat detail pesanan ${item.productName}`}
            className="p-1.5 rounded-lg text-[#526058] hover:bg-[#F5F0E2] transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};
