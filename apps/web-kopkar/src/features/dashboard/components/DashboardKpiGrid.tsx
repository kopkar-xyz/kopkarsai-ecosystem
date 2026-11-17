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
 * Menggunakan Geist tabular-nums untuk angka rapi, font semantik & tata letak responsif (1/2/4 col).
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
    <section className="space-y-3" aria-label="Ringkasan Performa">
      {/* Header Ringkasan & Filter Waktu */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-heading font-extrabold text-[#1A2421]">
            Ringkasan
          </h2>
          <p className="text-xs font-sans text-[#5C6F67]">
            Performa {currentLabel.toLowerCase()}
          </p>
        </div>

        {/* Dropdown Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F8F4EC] border border-[#DED5C3] text-xs font-heading font-medium text-[#1A2421] shadow-2xs transition-colors cursor-pointer"
          >
            <span>{currentLabel}</span>
            <ChevronDown size={14} className="text-[#5C6F67]" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-40 rounded-xl bg-white border border-[#DED5C3] shadow-bento py-1 z-20">
              {TIMEFRAME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-3 py-2 text-xs font-heading font-medium transition-colors ${
                    selectedTf === opt.value
                      ? 'bg-[#EAF4EE] text-[#1F5B45] font-semibold'
                      : 'text-[#1A2421] hover:bg-[#F8F4EC]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid 4 Kartu KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {KPI_METRICS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="p-4 sm:p-4.5 rounded-2xl bg-white border border-[#E9E2D2] shadow-xs flex flex-col justify-between space-y-2 hover:border-[#1F5B45]/40 transition-colors"
            >
              {/* Row Atas: Label & Ikon */}
              <div className="flex items-center justify-between text-xs text-[#5C6F67]">
                <span className="truncate font-heading font-medium text-xs text-[#5C6F67]">{kpi.title}</span>
                <div className="w-7 h-7 rounded-lg bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center flex-shrink-0">
                  <Icon size={14} />
                </div>
              </div>

              {/* Nilai Utama dengan Geist Tabular Nums */}
              <div className="flex items-baseline gap-1.5 text-xl sm:text-2xl font-sans font-semibold text-[#1A2421] tracking-tight tabular-nums">
                <span>{kpi.value}</span>
                {kpi.unit && (
                  <span className="text-xs sm:text-sm font-sans font-normal text-[#5C6F67]">
                    {kpi.unit}
                  </span>
                )}
              </div>

              {/* Subtitle Trend / Status */}
              <div className="text-[11px] font-sans text-[#5C6F67] tabular-nums flex items-center gap-1.5 flex-wrap">
                {kpi.badgeText ? (
                  <>
                    <span className="font-medium px-2 py-0.5 rounded-full text-[10px] bg-amber-100/80 text-amber-800">
                      {kpi.badgeText}
                    </span>
                    <span className="text-[#5C6F67]">{kpi.subtext}</span>
                  </>
                ) : (
                  <p className="text-[11px] font-sans text-[#5C6F67] tabular-nums">
                    <span
                      className={`font-semibold mr-1 ${
                        kpi.isPositive ? 'text-[#1F5B45]' : 'text-[#D97706]'
                      }`}
                    >
                      {kpi.trend}
                    </span>
                    {kpi.subtext || 'dari minggu lalu'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
