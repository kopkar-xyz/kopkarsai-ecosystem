import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { DailySalesData } from '../types';

interface RevenueTrendChartProps {
  data: DailySalesData[];
}

function calculateNiceTicks(maxVal: number): number[] {
  if (maxVal <= 0) return [10000000, 7500000, 5000000, 2500000, 0];
  const rawStep = maxVal / 4.0;
  const power = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const norm = rawStep / power;
  const stepMult = norm <= 1 ? 1 : norm <= 1.5 ? 1.5 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  const step = stepMult * power;
  return [step * 4, step * 3, step * 2, step * 1, 0];
}

function formatYAxisLabel(val: number): string {
  if (val === 0) return '0';
  if (val >= 1_000_000_000) return `${Number((val / 1_000_000_000).toFixed(1))}M`;
  if (val >= 1_000_000) return `${Number((val / 1_000_000).toFixed(1))}jt`;
  if (val >= 1_000) return `${Number((val / 1_000).toFixed(1))}k`;
  return String(val);
}

/**
 * RevenueTrendChart — Grafik visualisasi tren omset harian (clean bar chart).
 * Invariant: Budget < 200 LOC.
 */
export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ data }) => {
  const [activeIdx, setActiveIdx] = useState<number>(data.length > 0 ? data.length - 1 : 0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const rawMax = Math.max(...data.map((d) => d.revenue), 1000000);
  const ticks = calculateNiceTicks(rawMax);
  const maxTick = ticks[0];

  const currentIdx = hoveredIdx !== null ? hoveredIdx : (activeIdx < data.length ? activeIdx : data.length - 1);

  return (
    <Card padding="md" className="space-y-4">
      {/* Header Info */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#DED5C3]">
        <div className="w-9 h-9 rounded-xl bg-[#EAF4EE] border border-[#A9C3A2] flex items-center justify-center text-[#1F5B45] flex-shrink-0">
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

      {/* Bar Chart Visualization */}
      <div className="pt-7">
        <div className="flex">
          {/* Y-Axis Labels */}
          <div className="relative w-8 sm:w-10 h-44 sm:h-52 flex-shrink-0 select-none">
            {ticks.map((tick, idx) => (
              <span
                key={idx}
                style={{ top: `${(idx / (ticks.length - 1)) * 100}%` }}
                className="absolute right-2 -translate-y-1/2 text-[11px] sm:text-xs font-body text-[#8FA39A]"
              >
                {formatYAxisLabel(tick)}
              </span>
            ))}
          </div>

          {/* Chart Drawing Area */}
          <div className="relative flex-1 h-44 sm:h-52">
            {/* Dashed Horizontal Gridlines */}
            <div className="absolute inset-0 pointer-events-none">
              {ticks.map((_, idx) => (
                <div
                  key={idx}
                  style={{ top: `${(idx / (ticks.length - 1)) * 100}%` }}
                  className="absolute left-0 right-0 border-t border-dashed border-[#E5E7EB]"
                />
              ))}
            </div>

            {/* Vertical Bars */}
            <div className="relative h-full flex items-end justify-between gap-1.5 sm:gap-4 px-1.5 sm:px-4">
              {data.map((item, idx) => {
                const heightPercent = Math.min(100, Math.max(4, Math.round((item.revenue / maxTick) * 100)));
                const isActive = currentIdx === idx;

                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="group relative flex-1 h-full flex flex-col justify-end items-center cursor-pointer focus:outline-none"
                    aria-label={`${item.day}: ${formatCurrencyIDR(item.revenue)}`}
                  >
                    {/* Bar Container with dynamic height */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="relative w-full max-w-[34px] sm:max-w-[44px] flex flex-col justify-end items-center transition-all duration-300"
                    >
                      {/* Tooltip dynamically positioned right above the top of this bar */}
                      <div
                        className={`absolute bottom-full mb-1.5 z-20 transition-all duration-150 pointer-events-none ${
                          isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                        }`}
                      >
                        <div className="relative bg-[#1A2421] text-white text-[10px] sm:text-[11px] font-accent font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                          {formatCurrencyIDR(item.revenue)}
                          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-3 border-x-transparent border-t-[4px] border-t-[#1A2421]" />
                        </div>
                      </div>

                      {/* Bar body */}
                      <div
                        className={`w-full h-full rounded-t-xl sm:rounded-t-2xl transition-all duration-300 ${
                          isActive ? 'bg-[#1F5B45] shadow-xs' : 'bg-[#EDEDEE] group-hover:bg-[#DFE2E0]'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* X-Axis Labels (Days) */}
        <div className="flex mt-3">
          <div className="w-8 sm:w-10 flex-shrink-0" />
          <div className="flex-1 flex justify-between gap-1.5 sm:gap-4 px-1.5 sm:px-4">
            {data.map((item, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className="flex-1 text-center focus:outline-none cursor-pointer"
              >
                <p
                  className={`text-xs sm:text-sm transition-colors ${
                    currentIdx === idx ? 'font-bold text-[#1A2421]' : 'font-medium text-[#8FA39A] hover:text-[#5C6F67]'
                  }`}
                >
                  {item.shortDay}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
