import React from 'react';
import { OrderStatus } from '../../../types/order';
import { OrdersMonthlyRecapCard } from './OrdersMonthlyRecapCard';

export type FilterTab = 'ALL' | 'ACTIVE' | OrderStatus;
export type PaymentFilter = 'ALL' | 'PAYROLL' | 'DIRECT';

interface OrdersSidebarProps {
  isGaRole?: boolean;
  todayOrdersCount: number;
  todayTotal: number;
  todayWaitCount: number;
  onlyToday: boolean;
  onToggleOnlyToday: () => void;
  monthTotal: number;
  monthOrdersCount: number;
  payrollTotal: number;
  payrollCount: number;
  directTotal: number;
  directCount: number;
  paymentFilter: PaymentFilter;
  onSelectPaymentFilter: (pf: PaymentFilter) => void;
}

const BREAKPOINT_LAYOUT = {
  ga: {
    asideGrid: 'grid-cols-1',
    card: 'p-3 lg:p-5 space-y-2 lg:space-y-3',
    body: 'lg:block lg:space-y-3',
    countWrap: 'lg:gap-2 lg:pt-0.5',
    countNum: 'lg:text-4xl',
    countLabel: 'lg:text-xs',
    statsWrap: 'lg:block lg:border-t lg:border-b lg:border-[#EAE3D5] lg:divide-y lg:divide-[#EAE3D5]',
    statItem: 'lg:border-l-0 lg:pl-0.5 lg:flex lg:justify-between lg:items-center lg:py-2 lg:px-0.5 lg:text-left',
    statLabel: 'lg:inline lg:text-xs lg:text-[#7A716B]',
    statValue: 'lg:inline lg:text-xs lg:mt-0',
    button: 'py-1.5 lg:py-2.5 text-[11px] lg:text-xs',
  },
  member: {
    asideGrid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-1',
    card: 'p-3 sm:p-5 space-y-2 sm:space-y-3',
    body: 'sm:block sm:space-y-3',
    countWrap: 'sm:gap-2 sm:pt-0.5',
    countNum: 'sm:text-4xl',
    countLabel: 'sm:text-xs',
    statsWrap: 'sm:block sm:border-t sm:border-b sm:border-[#EAE3D5] sm:divide-y sm:divide-[#EAE3D5]',
    statItem: 'sm:border-l-0 sm:pl-0.5 sm:flex sm:justify-between sm:items-center sm:py-2 sm:px-0.5 sm:text-left',
    statLabel: 'sm:inline sm:text-xs sm:text-[#7A716B]',
    statValue: 'sm:inline sm:text-xs sm:mt-0',
    button: 'py-1.5 sm:py-2.5 text-[11px] sm:text-xs',
  },
} as const;

/**
 * OrdersSidebar — Sidebar Pesanan Saya
 * Card 1: Stat Hari Ini (ringkas pada mobile, vertikal penuh di sidebar desktop)
 * Card 2: OrdersMonthlyRecapCard (disembunyikan pada role GA)
 * Budget: < 200 LOC.
 */
export const OrdersSidebar: React.FC<OrdersSidebarProps> = ({
  isGaRole = false,
  todayOrdersCount,
  todayTotal,
  todayWaitCount,
  onlyToday,
  onToggleOnlyToday,
  monthTotal,
  monthOrdersCount,
  payrollTotal,
  payrollCount,
  directTotal,
  directCount,
  paymentFilter,
  onSelectPaymentFilter,
}) => {
  const cls = BREAKPOINT_LAYOUT[isGaRole ? 'ga' : 'member'];
  const todayStats = [
    { label: 'Total belanja', value: `Rp ${todayTotal.toLocaleString('id-ID')}` },
    { label: 'Menunggu kasir', value: String(todayWaitCount) },
  ];

  return (
    <aside className={`w-full lg:w-[260px] xl:w-[270px] shrink-0 grid gap-4 select-none ${cls.asideGrid}`}>
      {/* 1. Hari Ini Stat Card (Ringkas di mobile, penuh di sidebar desktop) */}
      <div className={`bg-white border border-[#EAE3D5] rounded-2xl shadow-2xs ${cls.card}`}>
        <div className="flex items-center justify-between px-0.5">
          <span className="font-semibold text-xs text-[#1A1615]">Hari ini</span>
          <span className="text-[11px] text-[#8C827A]">Senin, 23 Nov 2026</span>
        </div>

        <div className={`flex items-center justify-between gap-2 flex-wrap ${cls.body}`}>
          <div className={`flex items-baseline gap-1.5 px-0.5 shrink-0 ${cls.countWrap}`}>
            <span className={`font-bold text-2xl text-[#1A1615] leading-none ${cls.countNum}`}>
              {todayOrdersCount}
            </span>
            <span className={`text-[11px] text-[#7A716B] ${cls.countLabel}`}>pesanan masuk</span>
          </div>

          <div className={`flex items-center gap-2 text-xs text-[#7A716B] ${cls.statsWrap}`}>
            {todayStats.map((stat) => (
              <div key={stat.label} className={`border-l border-[#EAE3D5] pl-2 text-right ${cls.statItem}`}>
                <span className={`block text-[10px] text-[#8C827A] leading-tight whitespace-nowrap ${cls.statLabel}`}>
                  {stat.label}
                </span>
                <span className={`block font-semibold text-[11px] text-[#1A1615] tabular-nums leading-tight mt-0.5 whitespace-nowrap ${cls.statValue}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleOnlyToday}
          className={`w-full rounded-xl font-semibold text-center transition-all cursor-pointer shadow-xs active:scale-98 ${cls.button} ${
            onlyToday ? 'bg-[#5A1220] ring-2 ring-[#83273B] text-white' : 'bg-[#83273B] hover:bg-[#6e1e2f] text-white'
          }`}
        >
          {onlyToday ? 'Tampilkan semua pesanan' : 'Lihat pesanan hari ini'}
        </button>
      </div>

      {/* 2. Rekap Belanja Bulanan (Disembunyikan pada role GA) */}
      {!isGaRole && (
        <OrdersMonthlyRecapCard
          monthTotal={monthTotal}
          monthOrdersCount={monthOrdersCount}
          payrollTotal={payrollTotal}
          payrollCount={payrollCount}
          directTotal={directTotal}
          directCount={directCount}
          paymentFilter={paymentFilter}
          onSelectPaymentFilter={onSelectPaymentFilter}
        />
      )}
    </aside>
  );
};
