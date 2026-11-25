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
  dateRangeLabel = '23 Nov – 29 Nov 2026',
  onPrevWeek,
  onNextWeek,
  onToday,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-[#EAE4D3] p-4 sm:p-5 select-none">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-[#1F5B45]" />
          <span className="font-okashi text-[17px] text-[#18221D]">
            {dateRangeLabel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToday}
            className="px-3 py-1.5 rounded-xl border border-[#EAE4D3] text-[12.5px] font-medium text-[#18221D] hover:bg-[#FAF7EE] transition-colors cursor-pointer"
          >
            Hari ini
          </button>
          <button
            type="button"
            onClick={onPrevWeek}
            aria-label="Hari sebelumnya"
            className="w-8 h-8 rounded-xl border border-[#EAE4D3] flex items-center justify-center text-[#526058] hover:bg-[#FAF7EE] cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNextWeek}
            aria-label="Hari berikutnya"
            className="w-8 h-8 rounded-xl border border-[#EAE4D3] flex items-center justify-center text-[#526058] hover:bg-[#FAF7EE] cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((day) => {
          const isSelected = selectedDate === day.dateStr;
          return (
            <button
              key={day.dateStr}
              type="button"
              onClick={() => onSelectDate(day.dateStr)}
              className={`py-2 px-1 sm:py-2.5 sm:px-2 rounded-xl border text-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5B45] ${
                isSelected
                  ? 'bg-[#1F5B45] border-[#1F5B45] text-white'
                  : 'bg-[#FAF7EE]/65 border-[#EAE4D3] text-[#18221D] hover:bg-[#F3EDE0]'
              }`}
            >
              <div className={`text-[10px] sm:text-[11px] ${isSelected ? 'text-white/80' : 'text-[#7A867E]'}`}>
                {day.dayName}
              </div>
              <div className="font-okashi text-[16px] sm:text-[18px] leading-tight mt-0.5 tabular-nums">
                {day.dateNum}
              </div>
              <div className="h-1.5 mt-1 flex justify-center">
                {day.hasOrders && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-[#F2C94C]' : 'bg-[#1F5B45]'
                    }`}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
