import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { CalendarPopover, formatMonthYear } from '../../../components/ui/CalendarPopover';

export interface DateItem {
  dateStr: string;     // e.g. "2026-11-14"
  dayName: string;     // e.g. "Sab"
  dateNum: number;     // e.g. 14
  fullLabel: string;   // e.g. "Sabtu, 14 Nov"
  isToday?: boolean;
  hasOrders?: boolean;
}

interface HorizontalDateSelectorProps {
  dates: DateItem[];
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
}

/**
 * HorizontalDateSelector — Selector tanggal geser kanan-kiri
 * Mengadopsi tombol pemilih bulan/tahun putih interaktif dengan popover kalender.
 * Budget: < 200 LOC.
 */
export const HorizontalDateSelector: React.FC<HorizontalDateSelectorProps> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const monthYearLabel = useMemo(() => formatMonthYear(selectedDate), [selectedDate]);
  const datesWithOrders = useMemo(() => dates.filter((d) => d.hasOrders).map((d) => d.dateStr), [dates]);

  // Center selected date button in scroll container
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const btn = scrollContainerRef.current.querySelector<HTMLButtonElement>(`[data-date="${selectedDate}"]`);
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [selectedDate]);

  const scroll = (dir: 'left' | 'right') => {
    scrollContainerRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  const stopDrag = () => { isDragging.current = false; };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    scrollContainerRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };

  return (
    <div className="w-full space-y-2.5 select-none">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-1">
        {/* Tombol Bulan & Tahun Berlatar Putih dengan Popover Kalender */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsCalendarOpen((prev) => !prev)}
            aria-label={`Buka kalender (${monthYearLabel})`}
            aria-expanded={isCalendarOpen}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F3ECDD]/50 border border-[#DED5C3] hover:border-[#1F5B45] transition-all cursor-pointer shadow-xs active:scale-95 group"
          >
            <Calendar size={15} className="text-[#1F5B45] transition-colors" />
            <span className="text-xs sm:text-sm font-heading font-extrabold text-[#1A2421]">
              {monthYearLabel}
            </span>
            <ChevronDown
              size={14}
              className={`text-[#5C6F67] transition-transform duration-200 ${
                isCalendarOpen ? 'rotate-180 text-[#1F5B45]' : 'group-hover:text-[#1A2421]'
              }`}
            />
          </button>

          {/* Popover Kalender Interaktif */}
          <CalendarPopover
            isOpen={isCalendarOpen}
            onClose={() => setIsCalendarOpen(false)}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            datesWithOrders={datesWithOrders}
          />
        </div>

        {/* Scroll Left & Right buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Geser ke tanggal sebelumnya"
            className="w-7 h-7 rounded-full bg-white hover:bg-[#F3ECDD] border border-[#DED5C3] text-[#1F5B45] flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-xs"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Geser ke tanggal berikutnya"
            className="w-7 h-7 rounded-full bg-white hover:bg-[#F3ECDD] border border-[#DED5C3] text-[#1F5B45] flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-xs"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Pill Row */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
        onMouseMove={handleMouseMove}
        className="flex items-center gap-2 overflow-x-auto py-1 px-1 scroll-smooth scrollbar-none cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {dates.map((item) => {
          const isSelected = selectedDate === item.dateStr;

          return (
            <button
              type="button"
              key={item.dateStr}
              data-date={item.dateStr}
              onClick={() => onSelectDate(item.dateStr)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-14 sm:w-16 h-[76px] sm:h-[82px] rounded-full transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#1F5B45] text-white border border-[#1F5B45] shadow-sm'
                  : 'bg-white hover:bg-[#EAF4EE]/60 text-[#5C6F67] border border-[#DED5C3]'
              }`}
            >
              {/* Dot indicator area (space always preserved for uniform height) */}
              <span
                aria-hidden="true"
                className={`w-1.5 h-1.5 rounded-full mb-1.5 transition-colors ${
                  item.hasOrders
                    ? isSelected
                      ? 'bg-white'
                      : 'bg-[#1F5B45]'
                    : 'invisible'
                }`}
              />

              {/* Day Name */}
              <span
                className={`text-[11px] sm:text-xs font-accent font-medium leading-none ${
                  isSelected ? 'text-white/80' : 'text-[#8FA39A]'
                }`}
              >
                {item.dayName}
              </span>

              {/* Date Number */}
              <span
                className={`text-sm sm:text-base font-heading font-extrabold mt-1.5 leading-none ${
                  isSelected ? 'text-white' : 'text-[#1A2421]'
                }`}
              >
                {item.dateNum}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
