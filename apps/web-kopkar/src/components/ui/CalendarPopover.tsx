import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string; // "YYYY-MM-DD"
  onSelectDate: (dateStr: string) => void;
  datesWithOrders?: string[];
  className?: string;
}

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];
const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export function formatMonthYear(dateStr: string): string {
  if (!dateStr) return 'November 2026';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const idx = parseInt(parts[1], 10) - 1;
    if (idx >= 0 && idx < 12) return `${MONTH_NAMES[idx]} ${parts[0]}`;
  }
  return 'November 2026';
}

/**
 * CalendarPopover — Popover kalender interaktif bertema Japanese Green
 * Budget: < 200 LOC.
 */
export const CalendarPopover: React.FC<CalendarPopoverProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
  datesWithOrders = [],
  className = '',
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const initialDate = selectedDate ? new Date(selectedDate) : new Date(2026, 10, 14);
  const [viewYear, setViewYear] = useState<number>(initialDate.getFullYear() || 2026);
  const [viewMonth, setViewMonth] = useState<number>(initialDate.getMonth() ?? 10);

  // Sync view when selectedDate changes externally
  useEffect(() => {
    if (!selectedDate) return;
    const [y, m] = selectedDate.split('-').map(Number);
    if (y && m) {
      setViewYear(y);
      setViewMonth(m - 1);
    }
  }, [selectedDate]);

  // Click outside and ESC key handlers
  useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (e: MouseEvent) => { if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) onClose(); };
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('mousedown', onMouseDown); document.removeEventListener('keydown', onKeyDown); };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const changeMonth = (delta: -1 | 1) => {
    setViewMonth((m) => {
      const next = m + delta;
      if (next < 0) { setViewYear((y) => y - 1); return 11; }
      if (next > 11) { setViewYear((y) => y + 1); return 0; }
      return next;
    });
  };

  const handleGoToToday = () => {
    setViewYear(2026); setViewMonth(10);
    onSelectDate('2026-11-14'); onClose();
  };

  // Compute days grid
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();
  const prevMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) => daysInPrevMonth - firstDayOfWeek + i + 1);
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const totalCells = prevMonthDays.length + currentMonthDays.length;
  const nextMonthDays = Array.from({ length: totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7) }, (_, i) => i + 1);

  return (
    <div
      ref={popoverRef}
      className={`absolute left-0 top-full mt-2 z-50 w-72 sm:w-80 bg-white rounded-2xl border border-[#DED5C3] shadow-xl p-3.5 space-y-3 animate-in fade-in zoom-in-95 duration-150 select-none ${className}`}
    >
      {/* Calendar Header: Month/Year & Navigation */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <CalendarIcon size={16} className="text-[#1F5B45]" />
          <h3 className="text-sm font-heading font-extrabold text-[#1A2421]">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Bulan sebelumnya"
            className="w-7 h-7 rounded-lg hover:bg-[#F3ECDD] text-[#1F5B45] flex items-center justify-center cursor-pointer active:scale-90"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            aria-label="Bulan berikutnya"
            className="w-7 h-7 rounded-lg hover:bg-[#F3ECDD] text-[#1F5B45] flex items-center justify-center cursor-pointer active:scale-90"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekday Names Header */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {DAY_NAMES.map((name) => (
          <span key={name} className="text-[10px] sm:text-[11px] font-accent font-bold text-[#5C6F67]">
            {name}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {prevMonthDays.map((d) => (
          <div key={`p-${d}`} className="h-8 flex items-center justify-center text-xs text-[#5C6F67]/30 pointer-events-none">
            {d}
          </div>
        ))}

        {currentMonthDays.map((dayNum) => {
          const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
          const isSelected = selectedDate === dateStr;
          const isToday = dateStr === '2026-11-14';
          const hasOrders = datesWithOrders.includes(dateStr);

          return (
            <button
              type="button"
              key={dateStr}
              onClick={() => { onSelectDate(dateStr); onClose(); }}
              className={`h-8 rounded-xl text-xs flex flex-col items-center justify-center relative transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-[#1F5B45] text-white font-heading font-extrabold shadow-sm scale-105'
                  : isToday
                  ? 'bg-[#EAF4EE] text-[#1F5B45] font-bold border border-[#A9C3A2]'
                  : 'text-[#1A2421] hover:bg-[#EAF4EE] hover:text-[#1F5B45] font-medium'
              }`}
            >
              <span>{dayNum}</span>
              {hasOrders && (
                <span className={`w-1 h-1 rounded-full absolute bottom-1 ${isSelected ? 'bg-[#F6CE2C]' : 'bg-[#1F5B45]'}`} />
              )}
            </button>
          );
        })}

        {nextMonthDays.map((d) => (
          <div key={`n-${d}`} className="h-8 flex items-center justify-center text-xs text-[#5C6F67]/30 pointer-events-none">
            {d}
          </div>
        ))}
      </div>

      {/* Footer: Quick Jump to Today */}
      <div className="pt-2 border-t border-[#DED5C3]/80 flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={handleGoToToday}
          className="text-[11px] font-accent font-bold text-[#1F5B45] hover:underline cursor-pointer"
        >
          Hari Ini (14 Nov 2026)
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-[11px] font-body text-[#5C6F67] hover:text-[#1A2421] cursor-pointer"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
