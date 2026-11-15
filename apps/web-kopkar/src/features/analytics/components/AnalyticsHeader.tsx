import React from 'react';
import { Calendar } from 'lucide-react';
import { Dropdown, type DropdownOption } from '../../../components/ui/Dropdown';

interface AnalyticsHeaderProps {
  timeframe: '7D' | '30D' | 'QUARTER';
  onTimeframeChange: (tf: '7D' | '30D' | 'QUARTER') => void;
}

/**
 * AnalyticsHeader — Header seksi Overview & Filter Waktu di atas chart performa bisnis
 * Budget: < 200 LOC.
 */
export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  timeframe,
  onTimeframeChange,
}) => {
  const options: DropdownOption<'7D' | '30D' | 'QUARTER'>[] = [
    { value: '7D', label: '7 Hari Terakhir' },
    { value: '30D', label: '30 Hari Terakhir' },
    { value: 'QUARTER', label: 'Kuartal Ini' },
  ];

  return (
    <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#DED5C3]">
      <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421] tracking-tight">
        Overview
      </h2>

      {/* Custom Timeframe Dropdown */}
      <Dropdown<'7D' | '30D' | 'QUARTER'>
        options={options}
        value={timeframe}
        onChange={onTimeframeChange}
        icon={<Calendar size={14} className="text-[#1F5B45]" />}
        align="right"
        size="sm"
      />
    </div>
  );
};
