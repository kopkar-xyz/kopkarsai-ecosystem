import React from 'react';
import { Clock, Package, UtensilsCrossed } from 'lucide-react';
import { formatRupiah } from '../../../lib/kopkarsaiFormatters';

interface OrdersMetricCardsProps {
  pendingCount: number;
  pendingSubtitle: string;
  totalItemsCount: number;
  volumeSubtitle: string;
  accumulatedTotal: number;
  accumulatedSubtitle: string;
}

export const OrdersMetricCards: React.FC<OrdersMetricCardsProps> = ({
  pendingCount,
  pendingSubtitle,
  totalItemsCount,
  volumeSubtitle,
  accumulatedTotal,
  accumulatedSubtitle,
}) => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 select-none">
      {/* Card 1: Perlu Konfirmasi */}
      <div className="bg-white rounded-2xl border border-[#EAE4D3] p-3.5 sm:p-5 flex items-start sm:items-center justify-between gap-2.5 shadow-2xs">
        <div className="min-w-0">
          <div className="text-[11px] sm:text-[12px] font-normal text-[#526058]">Perlu Konfirmasi</div>
          <div className="text-[22px] sm:text-[28px] font-normal text-[#B45309] leading-tight mt-1 tabular-nums">
            {pendingCount}
          </div>
          <div className="text-[10.5px] sm:text-[11.5px] text-[#7A867E] mt-1 truncate">{pendingSubtitle}</div>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

      {/* Card 2: Volume Pesanan */}
      <div className="bg-white rounded-2xl border border-[#EAE4D3] p-3.5 sm:p-5 flex items-start sm:items-center justify-between gap-2.5 shadow-2xs">
        <div className="min-w-0">
          <div className="text-[11px] sm:text-[12px] font-normal text-[#526058]">Volume Pesanan</div>
          <div className="flex items-baseline gap-1 mt-1 leading-tight">
            <span className="text-[22px] sm:text-[28px] font-normal text-[#18221D] tabular-nums">
              {totalItemsCount}
            </span>
            <span className="text-[12px] sm:text-[13px] text-[#7A867E]">item</span>
          </div>
          <div className="text-[10.5px] sm:text-[11.5px] text-[#7A867E] mt-1 truncate">{volumeSubtitle}</div>
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
          <Package className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

      {/* Card 3: Akumulasi Tanggal Ini (col-span-2 di mobile agar nominal Rp tidak terpotong) */}
      <div className="col-span-2 lg:col-span-1 bg-white rounded-2xl border border-[#EAE4D3] p-3.5 sm:p-5 flex items-center justify-between gap-3 shadow-2xs">
        <div className="min-w-0">
          <div className="text-[11px] sm:text-[12px] font-normal text-[#526058]">Akumulasi Tanggal Ini</div>
          <div className="text-[22px] sm:text-[26px] font-normal text-[#165239] leading-tight mt-1 tabular-nums truncate">
            {formatRupiah(accumulatedTotal)}
          </div>
          <div className="text-[10.5px] sm:text-[11.5px] font-normal text-[#15803D] mt-1 truncate">
            {accumulatedSubtitle}
          </div>
        </div>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
          <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </section>
  );
};
