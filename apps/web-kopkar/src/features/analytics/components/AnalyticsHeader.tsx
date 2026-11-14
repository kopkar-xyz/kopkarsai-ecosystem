import React from 'react';
import { BarChart3, Calendar } from 'lucide-react';

interface AnalyticsHeaderProps {
  timeframe: '7D' | '30D' | 'QUARTER';
  onTimeframeChange: (tf: '7D' | '30D' | 'QUARTER') => void;
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  timeframe,
  onTimeframeChange,
}) => {
  const options = [
    { id: '7D' as const, label: '7 Hari Terakhir' },
    { id: '30D' as const, label: '30 Hari' },
    { id: 'QUARTER' as const, label: 'Kuartal Ini' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#DED5C3]">
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1F5B45]/15 text-[#1F5B45] text-xs font-accent font-bold mb-1">
          <BarChart3 size={13} className="text-[#2F6F56]" />
          <span>Full Data Analisis Koperasi</span>
          <span className="text-[#5C6F67]">•</span>
          <span className="font-heading">PT SAI</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421] tracking-tight">
          Dasbor Analitik & Performa Bisnis
        </h1>
        <p className="text-xs sm:text-sm font-body text-[#5C6F67]">
          Monitoring real-time omset, volume pesanan, distribusi kanal belanja, dan likuiditas.
        </p>
      </div>

      {/* Timeframe Filter Buttons */}
      <div className="flex items-center gap-1.5 bg-[#F8F4EC] p-1.5 rounded-2xl border border-[#DED5C3] self-start sm:self-auto shadow-xs">
        <Calendar size={15} className="text-[#2F6F56] ml-1.5 mr-0.5 hidden sm:inline" />
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onTimeframeChange(opt.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-accent font-bold transition-all duration-150 cursor-pointer ${
              timeframe === opt.id
                ? 'bg-[#1F5B45] text-white shadow-xs'
                : 'text-[#5C6F67] hover:text-[#1F5B45]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
