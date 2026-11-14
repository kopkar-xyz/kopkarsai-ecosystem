import React, { useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { formatCurrencyIDR } from '../../../lib/utils';

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
  ordersCount?: number;
  totalAmount?: number;
}

/**
 * HorizontalDateSelector — Selector tanggal geser kanan-kiri
 * Mengadopsi interaktivitas dashboard lama dengan gaya Japanese Green.
 * Budget: < 200 LOC.
 */
export const HorizontalDateSelector: React.FC<HorizontalDateSelectorProps> = ({
  dates,
  selectedDate,
  onSelectDate,
  ordersCount = 0,
  totalAmount = 0,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const selectedItem = dates.find((d) => d.dateStr === selectedDate);

  return (
    <div className="w-full space-y-2.5 select-none">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[#1F5B45]" />
          <span className="text-xs sm:text-sm font-heading font-extrabold text-[#1A2421]">
            Pilih Tanggal Pesanan
          </span>
          <span className="text-[10px] font-accent font-bold text-[#2F6F56] bg-[#EAF4EE] px-2 py-0.5 rounded-full border border-[#A9C3A2]/60">
            November 2026
          </span>
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
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
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
              onClick={() => onSelectDate(item.dateStr)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-14 sm:w-16 py-2.5 px-1 rounded-2xl transition-all duration-200 cursor-pointer relative ${
                isSelected
                  ? 'bg-[#1F5B45] text-white shadow-md scale-105 font-bold ring-2 ring-[#F6CE2C]/40'
                  : 'bg-white hover:bg-[#EAF4EE]/60 text-[#5C6F67] border border-[#DED5C3]'
              }`}
            >
              {/* Dot indicator if has orders */}
              {item.hasOrders && (
                <span
                  className={`w-1.5 h-1.5 rounded-full mb-0.5 ${
                    isSelected ? 'bg-[#F6CE2C]' : 'bg-[#2F6F56]'
                  }`}
                />
              )}

              {/* Day Name */}
              <span className={`text-[11px] font-accent font-medium leading-none ${
                isSelected ? 'text-[#F3ECDD]' : 'text-[#5C6F67]'
              }`}>
                {item.dayName}
              </span>

              {/* Date Number */}
              <span className="text-sm sm:text-base font-heading font-extrabold mt-1 leading-none">
                {item.dateNum}
              </span>

              {/* Today Badge */}
              {item.isToday && (
                <span
                  className={`text-[8px] font-accent font-bold px-1.5 py-0.2 rounded-full mt-1 leading-none ${
                    isSelected
                      ? 'bg-[#F6CE2C] text-[#1A2421]'
                      : 'bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2]'
                  }`}
                >
                  Hari Ini
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Agenda Box (Gaya Dashboard Lama) */}
      {selectedItem && (
        <div className="p-3 sm:p-3.5 rounded-2xl bg-[#EAF4EE] border border-[#A9C3A2]/60 text-[#1A2421] flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#1F5B45] text-white shrink-0 mt-0.5 shadow-xs">
            <Info size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-heading font-extrabold text-[#1F5B45] truncate">
                {selectedItem.fullLabel} 2026 {ordersCount > 0 ? `— ${ordersCount} Pesanan Masuk` : '— Tidak Ada Pesanan'}
              </h4>
              {selectedItem.isToday && (
                <span className="text-[9px] font-accent font-extrabold bg-[#F6CE2C] text-[#1A2421] px-2 py-0.5 rounded-full uppercase border border-[#F6CE2C]">
                  Hari Ini
                </span>
              )}
            </div>
            <p className="text-xs font-body text-[#5C6F67] mt-0.5 leading-relaxed">
              {ordersCount > 0
                ? `Total transaksi pada tanggal ini sebesar ${formatCurrencyIDR(totalAmount)}. Gunakan filter tab di bawah untuk memilah pesanan Same-Day atau PO H-1 Katering.`
                : 'Belum ada pesanan belanja toko fisik atau PO katering yang tercatat untuk tanggal ini.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
