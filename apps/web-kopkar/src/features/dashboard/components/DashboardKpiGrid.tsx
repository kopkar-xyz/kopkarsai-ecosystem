import React, { useState } from 'react';
import { DollarSign, ShoppingCart, UserCheck, Sparkles, ChevronDown, type LucideIcon } from 'lucide-react';

interface DashboardKpiGridProps {
  timeframe?: '7D' | '30D' | 'QUARTER';
  onTimeframeChange?: (tf: '7D' | '30D' | 'QUARTER') => void;
}

interface KpiItem {
  id: string;
  title: string;
  value: string;
  unit?: string;
  trend?: string;
  isPositive?: boolean;
  subtext?: string;
  badgeText?: string;
  icon: LucideIcon;
}

const KPI_METRICS: KpiItem[] = [
  {
    id: 'gmv',
    title: 'Total omset (GMV)',
    value: 'Rp 48.650.000',
    trend: '+14,2%',
    isPositive: true,
    icon: DollarSign,
  },
  {
    id: 'orders',
    title: 'Volume transaksi',
    value: '1.284',
    unit: 'pesanan',
    trend: '+8,6%',
    isPositive: true,
    icon: ShoppingCart,
  },
  {
    id: 'approval',
    title: 'Antrean approval',
    value: '6',
    unit: 'pengajuan',
    badgeText: 'Perlu review',
    subtext: '4 anggota • 2 sampel',
    icon: UserCheck,
  },
  {
    id: 'profit',
    title: 'Laba bersih',
    value: 'Rp 19.900.000',
    trend: '−2,4%',
    isPositive: false,
    icon: Sparkles,
  },
];

const TIMEFRAME_OPTIONS: { label: string; value: '7D' | '30D' | 'QUARTER' }[] = [
  { label: '7 hari terakhir', value: '7D' },
  { label: '30 hari terakhir', value: '30D' },
  { label: 'Kuartal ini', value: 'QUARTER' },
];

/**
 * DashboardKpiGrid — 4 Kartu KPI Ringkasan Performa Bisnis Koperasi
 * Slicing 1:1 Presisi aistudio-src DashboardPage:
 * - Header: font-okashi text-[20px] text-[#18221D]
 * - Nilai KPI: font-okashi text-[24px/26px] tabular-nums
 * - Label: text-[13px] text-[#526058] (Geist)
 * - Container: rounded-2xl border border-[#EAE4D3] bg-white p-5
 * Budget: < 200 LOC.
 */
export const DashboardKpiGrid: React.FC<DashboardKpiGridProps> = ({
  timeframe = '7D',
  onTimeframeChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTf, setSelectedTf] = useState<'7D' | '30D' | 'QUARTER'>(timeframe);

  const currentLabel =
    TIMEFRAME_OPTIONS.find((t) => t.value === selectedTf)?.label || '7 hari terakhir';

  const handleSelect = (val: '7D' | '30D' | 'QUARTER') => {
    setSelectedTf(val);
    onTimeframeChange?.(val);
    setDropdownOpen(false);
  };

  return (
    <section className="space-y-4" aria-label="Ringkasan Performa">
      {/* Header Ringkasan & Filter Waktu */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-okashi text-[20px] text-[#18221D]">
            Ringkasan
          </h2>
          <p className="text-[12.5px] text-[#7A867E]">
            Performa {currentLabel.toLowerCase()}
          </p>
        </div>

        {/* Dropdown Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#EAE4D3] text-[13px] font-medium text-[#18221D] cursor-pointer shadow-xs transition-colors"
          >
            <span>{currentLabel}</span>
            <ChevronDown size={14} className="text-[#526058]" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 rounded-xl bg-white border border-[#EAE4D3] shadow-lg py-1 z-20">
              {TIMEFRAME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-3.5 py-2 text-[12.5px] font-medium transition-colors ${
                    selectedTf === opt.value
                      ? 'bg-[#EAF4EE] text-[#165239] font-semibold'
                      : 'text-[#18221D] hover:bg-[#FAF7EE]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid 4 Kartu KPI (2x2 di mobile, 4 kolom di desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {KPI_METRICS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="p-3.5 sm:p-5 rounded-2xl bg-white border border-[#EAE4D3] flex flex-col justify-between hover:border-[#165239]/40 transition-colors min-w-0"
            >
              {/* Row Atas: Label & Ikon */}
              <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                <span className="text-[11.5px] sm:text-[13px] text-[#526058] truncate">
                  {kpi.title}
                </span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
                  <Icon size={15} />
                </span>
              </div>

              {/* Nilai Utama */}
              <div className="mt-2 sm:mt-3 flex items-baseline gap-1 sm:gap-1.5 min-w-0">
                <span className="font-geist font-normal text-[17px] sm:text-[24px] text-[#18221D] tabular-nums leading-tight truncate">
                  {kpi.value}
                </span>
                {kpi.unit && (
                  <span className="text-[11px] sm:text-[12.5px] text-[#526058] shrink-0">
                    {kpi.unit}
                  </span>
                )}
              </div>

              {/* Subtitle Trend / Status */}
              <div className="mt-2 sm:mt-2.5">
                {kpi.badgeText ? (
                  <span className="inline-block px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#B45309] text-[10px] sm:text-[11.5px] font-medium max-w-full truncate">
                    {kpi.badgeText} ({kpi.subtext})
                  </span>
                ) : (
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md text-[10px] sm:text-[11.5px] font-medium max-w-full truncate ${
                      kpi.isPositive
                        ? 'bg-[#EAF4EE] text-[#15803D]'
                        : 'bg-[#FEF3C7] text-[#B45309]'
                    }`}
                  >
                    {kpi.trend} vs minggu lalu
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
