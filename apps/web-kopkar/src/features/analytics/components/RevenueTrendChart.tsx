import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { DailySalesData } from '../types';

interface RevenueTrendChartProps {
  data: DailySalesData[];
  className?: string;
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
 * RevenueTrendChart — Grafik visualisasi tren omset harian
 * Slicing 1:1 Presisi aistudio-src DashboardPage:
 * - Header: font-okashi text-[20px] text-[#18221D]
 * - Container: rounded-2xl border border-[#EAE4D3] bg-white p-5
 * Budget: < 200 LOC.
 */
export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ data, className = '' }) => {
  const [activeIdx, setActiveIdx] = useState<number>(data.length > 0 ? data.length - 1 : 0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const rawMax = Math.max(...data.map((d) => d.revenue), 1000000);
  const ticks = calculateNiceTicks(rawMax);
  const maxTick = ticks[0];

  const currentIdx = hoveredIdx !== null ? hoveredIdx : (activeIdx < data.length ? activeIdx : data.length - 1);

  return (
    <div className={`rounded-2xl bg-white border border-[#EAE4D3] p-5 shadow-xs flex flex-col justify-between space-y-3.5 h-full select-none ${className}`}>
      {/* Header Info */}
      <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#F0EBDC]">
        <div className="w-8 h-8 rounded-lg bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
          <BarChart2 size={16} />
        </div>
        <div>
          <h3 className="font-okashi text-[20px] text-[#18221D]">
            Tren omset
          </h3>
          <p className="text-[12px] text-[#7A867E]">
            Nilai transaksi harian toko dan katering
          </p>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="flex-1 flex flex-col justify-between pt-2 min-h-0">
        <div className="flex flex-1 items-stretch min-h-[200px]">
          {/* Y-Axis Labels */}
          <div className="relative w-8 sm:w-10 h-full min-h-[200px] shrink-0 select-none">
            {ticks.map((tick, idx) => (
              <span
                key={idx}
                style={{ top: `${(idx / (ticks.length - 1)) * 100}%` }}
                className="absolute right-2 -translate-y-1/2 text-[11px] font-sans text-[#7A867E] tabular-nums"
              >
                {formatYAxisLabel(tick)}
              </span>
            ))}
          </div>

          {/* Chart Drawing Area */}
          <div className="relative flex-1 h-full min-h-[200px]">
            {/* Dashed Horizontal Gridlines */}
            <div className="absolute inset-0 pointer-events-none">
              {ticks.map((_, idx) => (
                <div
                  key={idx}
                  style={{ top: `${(idx / (ticks.length - 1)) * 100}%` }}
                  className="absolute left-0 right-0 border-t border-dashed border-[#F0EBDC]"
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
                    onTouchStart={() => setActiveIdx(idx)}
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
                      {/* Tooltip */}
                      <div
                        className={`absolute bottom-full mb-1.5 z-20 transition-all duration-150 pointer-events-none ${
                          isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                        } ${
                          idx === 0
                            ? 'left-0 translate-x-0'
                            : idx === data.length - 1
                            ? 'right-0 translate-x-0'
                            : 'left-1/2 -translate-x-1/2'
                        }`}
                      >
                        <div className="relative bg-[#18221D] text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap tabular-nums">
                          {formatCurrencyIDR(item.revenue)}
                        </div>
                      </div>

                      {/* Bar body */}
                      <div
                        className={`w-full h-full rounded-t-xl transition-all duration-300 ${
                          isActive ? 'bg-[#165239] shadow-xs' : 'bg-[#EAE4D3] group-hover:bg-[#DFD8C5]'
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
          <div className="w-8 sm:w-10 shrink-0" />
          <div className="flex-1 flex justify-between gap-1.5 sm:gap-4 px-1.5 sm:px-4">
            {data.map((item, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className="flex-1 text-center focus:outline-none cursor-pointer"
              >
                <p
                  className={`text-[12px] transition-colors ${
                    currentIdx === idx ? 'font-semibold text-[#18221D]' : 'font-medium text-[#7A867E] hover:text-[#18221D]'
                  }`}
                >
                  {item.shortDay}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
