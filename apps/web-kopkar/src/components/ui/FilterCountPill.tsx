import React from 'react';

interface FilterCountPillProps {
  count: number | string;
  active?: boolean;
}

/**
 * FilterCountPill — Badge angka berpadding untuk semua tab/pill filter agar terpisah jelas dari teks.
 */
export const FilterCountPill: React.FC<FilterCountPillProps> = ({ count, active = false }) => {
  return (
    <span
      className={`ml-1.5 inline-flex items-center justify-center min-w-[20px] px-1.5 py-0.5 rounded-full text-[10.5px] font-semibold tabular-nums leading-none ${
        active
          ? 'bg-white/20 text-white'
          : 'bg-[#E8E1CE] text-[#3F4D45]'
      }`}
    >
      {count}
    </span>
  );
};
