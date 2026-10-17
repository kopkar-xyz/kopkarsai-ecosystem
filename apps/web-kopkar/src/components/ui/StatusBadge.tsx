import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeStatusType =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'IN_REVIEW'
  | 'ACC'
  | 'REVISION'
  | 'ACTIVE'
  | 'PRIORITY_GA';

interface StatusBadgeProps {
  status: BadgeStatusType | string;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
  className = '',
}) => {
  const normalized = status.toUpperCase();

  const configs: Record<string, { bg: string; text: string; dot: string; defaultLabel: string }> = {
    PENDING: {
      bg: 'bg-amber-100 text-amber-900 border-amber-200/80',
      text: 'text-amber-900',
      dot: 'bg-amber-500',
      defaultLabel: 'Menunggu',
    },
    ACCEPTED: {
      bg: 'bg-emerald-100 text-emerald-900 border-emerald-200/80',
      text: 'text-emerald-900',
      dot: 'bg-emerald-500',
      defaultLabel: 'Sanggup',
    },
    ACC: {
      bg: 'bg-emerald-100 text-emerald-900 border-emerald-200/80',
      text: 'text-emerald-900',
      dot: 'bg-emerald-500',
      defaultLabel: 'Disetujui (ACC)',
    },
    ACTIVE: {
      bg: 'bg-emerald-100 text-emerald-900 border-emerald-200/80',
      text: 'text-emerald-900',
      dot: 'bg-emerald-500',
      defaultLabel: 'Aktif',
    },
    REJECTED: {
      bg: 'bg-rose-100 text-rose-900 border-rose-200/80',
      text: 'text-rose-900',
      dot: 'bg-rose-500',
      defaultLabel: 'Berhalangan',
    },
    IN_REVIEW: {
      bg: 'bg-blue-100 text-blue-900 border-blue-200/80',
      text: 'text-blue-900',
      dot: 'bg-blue-500',
      defaultLabel: 'Sedang Diuji',
    },
    REVISION: {
      bg: 'bg-orange-100 text-orange-900 border-orange-200/80',
      text: 'text-orange-900',
      dot: 'bg-orange-500',
      defaultLabel: 'Revisi',
    },
    PRIORITY_GA: {
      bg: 'bg-kopkar-gold-light text-kopkar-dark border-kopkar-gold/40',
      text: 'text-kopkar-dark',
      dot: 'bg-kopkar-gold',
      defaultLabel: 'Prioritas GA',
    },
  };

  const current = configs[normalized] || {
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    text: 'text-slate-700',
    dot: 'bg-slate-400',
    defaultLabel: status,
  };

  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold rounded-full border shadow-2xs select-none',
        current.bg,
        sizeClasses,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', current.dot)} />
      {label || current.defaultLabel}
    </span>
  );
};
