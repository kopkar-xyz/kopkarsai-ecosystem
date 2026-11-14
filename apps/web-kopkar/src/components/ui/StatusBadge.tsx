import React from 'react';
import { cn } from '../../lib/utils';
import type { OperationalStatus } from '../../types';

interface StatusBadgeProps {
  status: OperationalStatus;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
  showDot?: boolean;
}

const STATUS_CONFIG: Record<
  OperationalStatus,
  { bg: string; border: string; text: string; dot: string; label: string; kanji: string }
> = {
  PENDING: {
    bg: 'bg-[#FEF6DC]',
    border: 'border-[#FDE68A]',
    text: 'text-[#78350F]',
    dot: 'bg-[#E5A812]',
    label: 'Menunggu',
    kanji: '保留',
  },
  ACCEPTED: {
    bg: 'bg-[#EAF4EE]',
    border: 'border-[#A9C3A2]',
    text: 'text-[#1F5B45]',
    dot: 'bg-[#2F6F56]',
    label: 'Diterima',
    kanji: '承認',
  },
  ACTIVE: {
    bg: 'bg-[#EAF4EE]',
    border: 'border-[#A9C3A2]',
    text: 'text-[#1F5B45]',
    dot: 'bg-[#2F6F56]',
    label: 'Aktif',
    kanji: '有効',
  },
  IN_REVIEW: {
    bg: 'bg-[#EEF2F6]',
    border: 'border-[#BFDBFE]',
    text: 'text-[#1E3A5F]',
    dot: 'bg-[#3B82F6]',
    label: 'Diproses',
    kanji: '審査中',
  },
  REJECTED: {
    bg: 'bg-[#FDF0F3]',
    border: 'border-[#FECDD3]',
    text: 'text-[#9F1239]',
    dot: 'bg-[#DC4C70]',
    label: 'Ditolak',
    kanji: '却下',
  },
  REVISION: {
    bg: 'bg-[#FFF3E6]',
    border: 'border-[#FED7AA]',
    text: 'text-[#9A3412]',
    dot: 'bg-[#F97316]',
    label: 'Revisi',
    kanji: '修正',
  },
  PRIORITY_GA: {
    bg: 'bg-[#FEF9C3]',
    border: 'border-[#FDE047]',
    text: 'text-[#854D0E]',
    dot: 'bg-[#E5A812]',
    label: 'Prioritas GA',
    kanji: '優先',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
  className = '',
  showDot = true,
}) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
  const displayLabel = label || config.label;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-accent font-semibold rounded-full border transition-colors select-none',
        config.bg,
        config.border,
        config.text,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs sm:text-sm',
        className
      )}
    >
      {showDot && (
        <span
          className={cn(
            'rounded-full animate-pulse flex-shrink-0',
            config.dot,
            size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'
          )}
          aria-hidden="true"
        />
      )}
      <span>{displayLabel}</span>
      <span className="text-[10px] opacity-75 font-kanji hidden sm:inline">
        {config.kanji}
      </span>
    </span>
  );
};
