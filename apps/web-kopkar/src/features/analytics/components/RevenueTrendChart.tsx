import React, { useState } from 'react';
import { TrendingUp, BarChart2 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { DailySalesData } from '../types';

interface RevenueTrendChartProps {
  data: DailySalesData[];
}

export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 10000000);
  const activeData = hoveredIdx !== null ? data[hoveredIdx] : data[data.length - 1];

  return (
    <Card padding="md" className="space-y-4">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EAF4EE] border border-[#A9C3A2] flex items-center justify-center text-[#1F5B45]">
            <BarChart2 size={19} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-heading font-extrabold text-[#1A2421]">
              Tren Omset & Volume Penjualan
            </h2>
            <p className="text-xs font-body text-[#5C6F67]">
              Grafik pergerakan nilai transaksi harian toko & katering
            </p>
          </div>
        </div>

        {/* Dynamic Highlight Badge */}
        {activeData && (
          <div className="flex items-center gap-2 bg-[#F8F4EC] px-3 py-1 rounded-xl border border-[#DED5C3] text-xs font-body self-start sm:self-auto">
            <span className="font-accent font-bold text-[#1F5B45]">{activeData.day} ({activeData.date}):</span>
            <span className="font-heading font-extrabold text-[#1A2421]">
              {formatCurrencyIDR(activeData.revenue)}
            </span>
            <span className="text-[#5C6F67]">({activeData.ordersCount} pesanan)</span>
          </div>
        )}
      </div>

      {/* SVG Bar Chart Visualization */}
      <div className="pt-2">
        <div className="h-48 sm:h-56 w-full flex items-end gap-2 sm:gap-4 px-2 select-none">
          {data.map((item, idx) => {
            const heightPercent = Math.max(12, Math.round((item.revenue / maxRevenue) * 100));
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="flex-1 h-full flex flex-col justify-end items-center group cursor-pointer"
              >
                {/* Tooltip on hover */}
                <div
                  className={`text-[10px] font-accent font-bold px-1.5 py-0.5 rounded bg-[#1F5B45] text-white mb-1.5 transition-all duration-150 whitespace-nowrap pointer-events-none ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 hidden sm:block'
                  }`}
                >
                  {Math.round(item.revenue / 1000000 * 10) / 10}jt
                </div>

                {/* Vertical Bar */}
                <div className="w-full max-w-[42px] bg-[#EAF4EE] rounded-t-xl overflow-hidden flex flex-col justify-end transition-all duration-200 group-hover:bg-[#A9C3A2]/40 h-full">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-xl transition-all duration-300 ${
                      isHovered
                        ? 'bg-[#1F5B45] shadow-md'
                        : 'bg-gradient-to-t from-[#2F6F56] to-[#4F8A67]'
                    }`}
                  />
                </div>

                {/* Day label */}
                <div className="mt-2 text-center">
                  <p className={`text-[11px] font-accent font-bold transition-colors ${
                    isHovered ? 'text-[#1F5B45]' : 'text-[#5C6F67]'
                  }`}>
                    {item.shortDay}
                  </p>
                  <p className="text-[9px] font-body text-[#8FA39A] hidden sm:block">
                    {item.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between text-xs text-[#5C6F67] border-t border-[#DED5C3]/60">
        <span className="flex items-center gap-1.5 font-accent">
          <TrendingUp size={14} className="text-[#2F6F56]" />
          <span>Pertumbuhan rata-rata harian stabil di atas target koperasi</span>
        </span>
        <span className="font-heading font-bold text-[#1F5B45]">Puncak: Jumat (Rp 9,35 jt)</span>
      </div>
    </Card>
  );
};
