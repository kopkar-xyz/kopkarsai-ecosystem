import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export interface WeekDay {
  dateStr: string;
  dayName: string;
  dateNum: number;
  hasOrders?: boolean;
}

interface OrdersWeekCalendarProps {
  days: WeekDay[];
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  dateRangeLabel?: string;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  onToday?: () => void;
}

export const OrdersWeekCalendar: React.FC<OrdersWeekCalendarProps> = ({
  days,
  selectedDate,
  onSelectDate,
  dateRangeLabel = '23 – 29 Nov 2026',
  onPrevWeek,
  onNextWeek,
  onToday,
}) => {
  const selectedDay = days.find((d) => d.dateStr === selectedDate) ?? days[0];

  return (
    <section className="bg-white rounded-2xl border border-[#EAE4D3] px-4 py-3.5 sm:px-5 sm:py-4 select-none shadow-2xs">
      {/* Top Bar: Calendar Icon, Range + Dipilih, Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 mb-3 border-b border-[#F0EBDC]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
            <span className="text-[14px] sm:text-[15px] font-medium text-[#18221D] tabular-nums">
              {dateRangeLabel}
            </span>
            {selectedDay && (
              <span className="text-[12px] text-[#7A867E]">
                · Dipilih:{' '}
                <strong className="font-medium text-[#18221D]">
                  {selectedDay.dayName}, {selectedDay.dateNum} Nov
                </strong>
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onToday}
            className="px-3 py-1.5 rounded-xl bg-[#EAF4EE] hover:bg-[#DCECE2] border border-[#165239]/25 text-[12px] font-medium text-[#165239] transition-colors cursor-pointer"
          >
            Hari ini
          </button>
          <button
            type="button"
            onClick={onPrevWeek}
            aria-label="Minggu sebelumnya"
            className="w-8 h-8 rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] flex items-center justify-center text-[#526058] hover:bg-[#F3EDE0] cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNextWeek}
            aria-label="Minggu berikutnya"
            className="w-8 h-8 rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] flex items-center justify-center text-[#526058] hover:bg-[#F3EDE0] cursor-pointer transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal 7-Day Pills (stack vertical on mobile/tablet-sidebar, inline row on lg+) */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((day) => {
          const isSelected = selectedDate === day.dateStr;
          return (
            <button
              key={day.dateStr}
              type="button"
              onClick={() => onSelectDate(day.dateStr)}
              className={`h-11 lg:h-10 px-0.5 sm:px-2 rounded-xl border flex flex-col lg:flex-row items-center justify-center gap-0.5 lg:gap-1.5 transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-[#165239] border-[#165239] text-white shadow-2xs'
                  : 'bg-[#FAF8F2] border-[#EAE4D3] text-[#18221D] hover:bg-[#F3EDE0]'
              }`}
            >
              <span
                className={`text-[9.5px] sm:text-[11px] lg:text-[12px] leading-none ${
                  isSelected ? 'text-white/80' : 'text-[#7A867E]'
                }`}
              >
                {day.dayName}
              </span>
              <span className="inline-flex items-center gap-0.5 sm:gap-1">
                <span className="text-[12.5px] sm:text-[14px] lg:text-[15px] font-medium leading-none tabular-nums">
                  {day.dateNum}
                </span>
                {day.hasOrders && (
                  <span
                    className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full shrink-0 ${
                      isSelected ? 'bg-[#F2C94C]' : 'bg-[#165239]'
                    }`}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
