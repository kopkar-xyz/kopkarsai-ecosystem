import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { formatCurrencyIDR } from '../../../lib/utils';

export interface ProfitTrendPoint {
  day: string;
  shortDay: string;
  revenue: number;
  productionCost: number;
  netProfit: number;
}

const DEFAULT_DATA: ProfitTrendPoint[] = [
  { day: 'Senin', shortDay: 'Sen', revenue: 10000000, productionCost: 6500000, netProfit: 2000000 },
  { day: 'Selasa', shortDay: 'Sel', revenue: 12000000, productionCost: 7000000, netProfit: 3000000 },
  { day: 'Rabu', shortDay: 'Rab', revenue: 11000000, productionCost: 8000000, netProfit: 1500000 },
  { day: 'Kamis', shortDay: 'Kam', revenue: 14000000, productionCost: 9000000, netProfit: 3000000 },
  { day: 'Jumat', shortDay: 'Jum', revenue: 16200000, productionCost: 10000000, netProfit: 4000000 },
  { day: 'Sabtu', shortDay: 'Sab', revenue: 10000000, productionCost: 7500000, netProfit: 1000000 },
  { day: 'Minggu', shortDay: 'Min', revenue: 13000000, productionCost: 8000000, netProfit: 3500000 },
];

const TICKS = ['20 jt', '15 jt', '10 jt', '5 jt', '0 jt'];
const SERIES = [
  { key: 'revenue' as const, color: '#2563EB', label: 'Pendapatan' },
  { key: 'productionCost' as const, color: '#16A34A', label: 'Biaya produksi' },
  { key: 'netProfit' as const, color: '#EA580C', label: 'Laba bersih' },
];

interface ProfitTrendChartProps {
  data?: ProfitTrendPoint[];
  className?: string;
}

/**
 * ProfitTrendChart — Multi-line chart tren pendapatan, biaya produksi & laba bersih.
 * Slicing 1:1 Presisi aistudio-src DashboardPage:
 * - Header: font-okashi text-[20px] text-[#18221D]
 * - Container: rounded-2xl bg-white border border-[#EAE4D3] p-5
 * Budget: < 200 LOC.
 */
export const ProfitTrendChart: React.FC<ProfitTrendChartProps> = ({
  data = DEFAULT_DATA,
  className = '',
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const activeItem = hoveredIdx !== null ? data[hoveredIdx] : null;

  const getYPos = (val: number) => (1 - Math.min(20000000, Math.max(0, val)) / 20000000) * 190 + 5;
  const getXPos = (idx: number) => 25 + (idx / 6) * 450;

  return (
    <div className={`rounded-2xl bg-white border border-[#EAE4D3] p-5 shadow-xs flex flex-col justify-between space-y-3.5 h-full select-none ${className}`}>
      {/* Header Info */}
      <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#F0EBDC]">
        <div className="w-8 h-8 rounded-lg bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
          <TrendingUp size={16} />
        </div>
        <div>
          <h3 className="font-okashi text-[20px] text-[#18221D]">
            Keuangan dan profitabilitas
          </h3>
          <p className="text-[12px] text-[#7A867E]">
            Pendapatan, biaya produksi, dan laba bersih harian
          </p>
        </div>
      </div>

      {/* Chart Body */}
      <div className="flex-1 flex flex-col justify-between pt-1">
        <div className="flex">
          {/* Y-Axis Labels */}
          <div className="relative w-8 sm:w-10 h-44 sm:h-52 shrink-0 select-none">
            {TICKS.map((label, idx) => (
              <span
                key={idx}
                style={{ top: `${(idx / (TICKS.length - 1)) * 100}%` }}
                className="absolute right-2 -translate-y-1/2 text-[11px] font-sans text-[#7A867E] tabular-nums"
              >
                {label}
              </span>
            ))}
          </div>

          {/* SVG Multi-Line Drawing Area */}
          <div className="relative flex-1 h-44 sm:h-52">
            <div className="absolute inset-0 pointer-events-none">
              {TICKS.map((_, idx) => (
                <div
                  key={idx}
                  style={{ top: `${(idx / (TICKS.length - 1)) * 100}%` }}
                  className="absolute left-0 right-0 border-t border-dashed border-[#F0EBDC]"
                />
              ))}
            </div>

            <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
              {hoveredIdx !== null && (
                <line x1={getXPos(hoveredIdx)} y1={0} x2={getXPos(hoveredIdx)} y2={200} stroke="#165239" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />
              )}
              {SERIES.map((s) => (
                <g key={s.key}>
                  <polyline points={data.map((d, i) => `${getXPos(i)},${getYPos(d[s.key])}`).join(' ')} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {data.map((d, i) => (
                    <circle key={i} cx={getXPos(i)} cy={getYPos(d[s.key])} r={hoveredIdx === i ? 5 : 3.5} fill={s.color} stroke="#FFFFFF" strokeWidth="2" />
                  ))}
                </g>
              ))}
            </svg>

            {/* Interactive hover overlays */}
            <div className="absolute inset-0 flex">
              {data.map((_, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onTouchStart={() => setHoveredIdx(idx)}
                  onClick={() => setHoveredIdx(hoveredIdx === idx ? null : idx)}
                  className="flex-1 h-full cursor-pointer"
                />
              ))}
            </div>

            {/* Tooltip */}
            {activeItem && hoveredIdx !== null && (
              <div
                style={{
                  left:
                    hoveredIdx <= 1
                      ? '4%'
                      : hoveredIdx >= 5
                      ? '96%'
                      : `${((hoveredIdx + 0.5) / 7) * 100}%`,
                  top: '6px',
                }}
                className={`absolute z-30 pointer-events-none bg-[#18221D] text-white p-2.5 rounded-xl shadow-lg border border-[#EAE4D3]/20 text-[11px] whitespace-nowrap space-y-0.5 transition-all duration-150 ${
                  hoveredIdx <= 1
                    ? 'translate-x-0'
                    : hoveredIdx >= 5
                    ? '-translate-x-full'
                    : '-translate-x-1/2'
                }`}
              >
                <p className="font-semibold text-white border-b border-white/20 pb-0.5">{activeItem.day}</p>
                <p className="text-[#93C5FD]">Pendapatan: <span className="font-semibold tabular-nums">{formatCurrencyIDR(activeItem.revenue)}</span></p>
                <p className="text-[#86EFAC]">Biaya: <span className="font-semibold tabular-nums">{formatCurrencyIDR(activeItem.productionCost)}</span></p>
                <p className="text-[#FDBA74]">Laba: <span className="font-semibold tabular-nums">{formatCurrencyIDR(activeItem.netProfit)}</span></p>
              </div>
            )}
          </div>
        </div>

        {/* X-Axis Labels */}
        <div className="flex mt-3">
          <div className="w-8 sm:w-10 shrink-0" />
          <div className="flex-1 flex justify-between px-2 sm:px-4">
            {data.map((item, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setHoveredIdx(hoveredIdx === idx ? null : idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onTouchStart={() => setHoveredIdx(idx)}
                className="text-center focus:outline-none cursor-pointer py-1 flex items-center justify-center flex-1"
                aria-label={`Pilih ${item.day}`}
              >
                <p className={`text-[12px] transition-colors ${hoveredIdx === idx ? 'font-semibold text-[#18221D]' : 'font-medium text-[#7A867E]'}`}>
                  {item.shortDay}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 pt-3 mt-1 border-t border-[#F0EBDC] text-[12px] font-medium text-[#526058] select-none">
          {SERIES.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5 sm:gap-2">
              <span style={{ backgroundColor: s.color }} className="w-2.5 h-2.5 rounded-full" />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
