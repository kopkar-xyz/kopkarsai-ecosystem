import React from 'react';
import { Package, Check, TrendingUp } from 'lucide-react';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { SupplyRecommendationItem } from './SupplyRecommendationTableCard';

interface SupplyRecommendationRowProps {
  item: SupplyRecommendationItem;
  isReadOnly?: boolean;
  onCreatePo: (id: string) => void;
}

export const SupplyRecommendationRow: React.FC<SupplyRecommendationRowProps> = ({
  item,
  isReadOnly = false,
  onCreatePo,
}) => {
  return (
    <tr className="hover:bg-[#FAF7EE]/75 transition-colors">
      {/* Kolom 1: Produk & Mitra */}
      <td className="py-3 px-3.5">
        <span className="font-semibold text-[13px] text-[#18221D] block">
          {item.productName}
        </span>
        <span className="text-[11.5px] text-[#7A867E] block mt-0.5">
          {item.supplier} · {item.unit}
        </span>
      </td>

      {/* Kolom 2: Rata-rata -> Saran */}
      <td className="py-3 px-3.5">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-[12.5px] text-[#18221D] tabular-nums">
            {item.avgQty} → {item.suggestedQty} pcs
          </span>
          <span
            className={`text-[10.5px] font-medium px-1.5 py-0.5 rounded ${
              item.isIncrease
                ? 'bg-[#EAF4EE] text-[#15803D]'
                : 'bg-[#FAF7EE] text-[#526058]'
            }`}
          >
            {item.isIncrease ? `↗ ${item.trendPercent}` : item.trendPercent}
          </span>
        </div>
      </td>

      {/* Kolom 3: Sinyal Permintaan */}
      <td className="py-3 px-3.5 text-[12px] text-[#526058]">
        <div className="flex items-center gap-1.5">
          <TrendingUp size={13} className="text-[#526058] shrink-0" />
          <span>{item.demandSignal}</span>
        </div>
      </td>

      {/* Kolom 4: Keyakinan */}
      <td className="py-3 px-3.5 text-center">
        <span className="inline-block px-2 py-0.5 rounded-md bg-[#FAF7EE] border border-[#EAE4D3] text-[11.5px] font-medium text-[#18221D] tabular-nums">
          {item.confidence}%
        </span>
      </td>

      {/* Kolom 5: Estimasi Nilai */}
      <td className="py-3 px-3.5 font-semibold text-[13px] text-[#18221D] tabular-nums">
        {formatCurrencyIDR(item.estimatedValue)}
      </td>

      {/* Kolom 6: Tombol Aksi / Status Monitoring */}
      <td className="py-3 px-3.5 text-right whitespace-nowrap">
        {item.poStatus === 'CREATED' ? (
          <span className="inline-flex items-center gap-1 h-7 px-3 rounded-lg bg-[#EAF4EE] text-[#15803D] text-[12px] font-medium">
            <Check size={13} />
            <span>PO Dibuat</span>
          </span>
        ) : isReadOnly ? (
          <span className="inline-flex items-center h-7 px-3 rounded-lg bg-[#FAF7EE] border border-[#EAE4D3] text-[#526058] text-[12px] font-medium">
            Siap PO
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onCreatePo(item.id)}
            className="inline-flex items-center gap-1.5 h-7 px-3.5 rounded-lg bg-[#165239] hover:bg-[#11402c] text-white text-[12px] font-medium transition-colors cursor-pointer"
          >
            <Package size={13} />
            <span>Buat PO</span>
          </button>
        )}
      </td>
    </tr>
  );
};
