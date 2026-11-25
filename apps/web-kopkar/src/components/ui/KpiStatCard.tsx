import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface KpiStatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  pill: string;
  pillTone?: 'success' | 'warning';
  icon: LucideIcon;
}

/**
 * KpiStatCard — Shared KPI summary card matching DashboardKpiGrid style & hover state.
 */
export const KpiStatCard: React.FC<KpiStatCardProps> = ({
  label,
  value,
  unit,
  pill,
  pillTone = 'success',
  icon: Icon,
}) => {
  const pillClass =
    pillTone === 'warning'
      ? 'bg-[#FEF3C7] text-[#B45309]'
      : 'bg-[#EAF4EE] text-[#15803D]';

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#EAE4D3] flex flex-col justify-between hover:border-[#165239]/40 transition-colors select-none">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] text-[#526058]">{label}</span>
        <span className="w-8 h-8 rounded-lg bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
          <Icon size={16} />
        </span>
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="font-geist font-normal text-[24px] text-[#18221D] tabular-nums leading-tight">
          {value}
        </span>
        {unit && <span className="text-[12.5px] text-[#526058]">{unit}</span>}
      </div>

      <div className="mt-2.5">
        <span
          className={`inline-block px-2 py-0.5 rounded-md text-[11.5px] font-medium tabular-nums ${pillClass}`}
        >
          {pill}
        </span>
      </div>
    </div>
  );
};
