import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Order } from '../../../types/order';
import { UserProfile } from '../../../types/auth';
import { OrderCard } from '../components/OrderCard';
import { OrdersSidebar, FilterTab, PaymentFilter } from '../components/OrdersSidebar';
import { OrdersFilterBar, DateFilter, SortOrder } from '../components/OrdersFilterBar';

interface OrdersViewProps {
  orders: Order[];
  currentUser?: UserProfile;
  onBackToCatalog: () => void;
  onViewReceipt: (order: Order) => void;
  onReorder?: (order: Order) => void;
}

/**
 * OrdersView — Halaman Riwayat Transaksi & Status Pesanan Konsumen
 * Pemisah jelas antara Pesanan Aktif vs Riwayat Selesai. Budget: < 200 LOC.
 */
export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  currentUser,
  onBackToCatalog,
  onViewReceipt,
  onReorder,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL');
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyToday, setOnlyToday] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilter>('ALL');
  const [sortBy, setSortBy] = useState<SortOrder>('NEWEST');
  const [openDropdown, setOpenDropdown] = useState<'none' | 'date' | 'sort'>('none');

  const isGaRole = currentUser?.role === 'GA';

  useEffect(() => {
    if (isGaRole && paymentFilter !== 'ALL') {
      setPaymentFilter('ALL');
    }
  }, [isGaRole, paymentFilter]);

  // Filter pesanan sesuai sesi akun: Anggota hanya miliknya, GA hanya GA
  const userOrders = orders.filter((ord) => {
    if (!currentUser) return true;
    if (currentUser.role === 'GA') return ord.isGaPriority || ord.customerNik === currentUser.nik;
    if (ord.isGaPriority) return false;
    return ord.customerNik === currentUser.nik || ord.customerName.toLowerCase() === currentUser.name.toLowerCase();
  });

  const activeCount = userOrders.filter((o) => o.status === 'MENUNGGU_CHECKLIST' || o.status === 'SIAP_DIAMBIL').length;
  const counts = {
    all: userOrders.length,
    active: activeCount,
    selesai: userOrders.filter((o) => o.status === 'SELESAI').length,
  };

  const todayOrders = userOrders.filter((o) => o.createdAt.includes('23 Nov 2026') || o.createdAt.includes('Hari Ini'));
  const todayTotal = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  // Rekap Finansial Bulanan
  const monthTotal = userOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const payrollOrders = userOrders.filter((o) => o.paymentMethod === 'PAYROLL_DEDUCTION');
  const payrollTotal = payrollOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const directOrders = userOrders.filter((o) => o.paymentMethod !== 'PAYROLL_DEDUCTION');
  const directTotal = directOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const filteredOrders = userOrders
    .filter((ord) => {
      if (activeTab === 'ACTIVE') {
        if (ord.status !== 'MENUNGGU_CHECKLIST' && ord.status !== 'SIAP_DIAMBIL') return false;
      } else if (activeTab !== 'ALL' && ord.status !== activeTab) {
        return false;
      }
      if (!isGaRole && paymentFilter === 'PAYROLL' && ord.paymentMethod !== 'PAYROLL_DEDUCTION') return false;
      if (!isGaRole && paymentFilter === 'DIRECT' && ord.paymentMethod === 'PAYROLL_DEDUCTION') return false;
      if ((onlyToday || dateFilter === 'TODAY') && !ord.createdAt.includes('23 Nov 2026') && !ord.createdAt.includes('Hari Ini')) return false;
      if (dateFilter === 'YESTERDAY' && !ord.createdAt.includes('22 Nov 2026')) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return ord.invoiceNumber.toLowerCase().includes(q) || ord.items.some((it) => it.name.toLowerCase().includes(q));
      }
      return true;
    })
    .sort((a, b) => {
      if (a.isGaPriority && !b.isGaPriority) return -1;
      if (!a.isGaPriority && b.isGaPriority) return 1;
      if (sortBy === 'OLDEST') return a.id.localeCompare(b.id);
      if (sortBy === 'HIGHEST') return b.totalAmount - a.totalAmount;
      return b.id.localeCompare(a.id);
    });

  const totalSum = filteredOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const resetFilters = () => {
    setActiveTab('ALL');
    setPaymentFilter('ALL');
    setOnlyToday(false);
    setDateFilter('ALL');
    setSearchQuery('');
  };

  return (
    <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 select-none" onClick={() => setOpenDropdown('none')}>
      {/* 1. Header Pesanan Saya */}
      <div className="flex items-center gap-3.5 pb-1">
        <button
          type="button"
          onClick={onBackToCatalog}
          className="w-9 h-9 rounded-xl bg-white border border-[#EAE3D5] flex items-center justify-center text-[#1A1615] hover:bg-[#FAF6F0] active:scale-95 transition-all cursor-pointer shadow-2xs"
          aria-label="Kembali ke katalog"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="font-brush text-2xl sm:text-3xl text-[#83273B] font-semibold leading-tight">Pesanan saya</h1>
          <p className="text-xs text-[#665E60] mt-0.5">Pantau status verifikasi kasir dan tiket pengambilan mandiri.</p>
        </div>
      </div>

      {/* 2. Dual-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-7 items-stretch lg:items-start w-full">
        <OrdersSidebar
          isGaRole={isGaRole}
          todayOrdersCount={todayOrders.length}
          todayTotal={todayTotal}
          todayWaitCount={todayOrders.filter((o) => o.status === 'MENUNGGU_CHECKLIST').length}
          onlyToday={onlyToday}
          onToggleOnlyToday={() => { setOnlyToday(!onlyToday); if (!onlyToday) setActiveTab('ALL'); }}
          monthTotal={monthTotal}
          monthOrdersCount={userOrders.length}
          payrollTotal={payrollTotal}
          payrollCount={payrollOrders.length}
          directTotal={directTotal}
          directCount={directOrders.length}
          paymentFilter={paymentFilter}
          onSelectPaymentFilter={setPaymentFilter}
        />

        {/* Right Orders List Area */}
        <main className="w-full flex-1 min-w-0 space-y-3.5">
          <OrdersFilterBar
            activeTab={activeTab}
            onSelectTab={(tab) => { setActiveTab(tab); setOnlyToday(false); }}
            counts={counts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateFilter={dateFilter}
            onSelectDate={(df) => { setDateFilter(df); setOnlyToday(false); setOpenDropdown('none'); }}
            sortBy={sortBy}
            onSelectSort={(so) => { setSortBy(so); setOpenDropdown('none'); }}
            openDropdown={openDropdown}
            onToggleDropdown={(d) => setOpenDropdown(openDropdown === d ? 'none' : d)}
            onlyToday={onlyToday}
          />

          <div className="flex items-center justify-between px-0.5 text-xs text-[#665E60]">
            <p>
              {filteredOrders.length} pesanan
              {!isGaRole && paymentFilter !== 'ALL' && (
                <span className="font-semibold text-[#83273B]"> ({paymentFilter === 'PAYROLL' ? 'Potong Gaji' : 'QRIS/Transfer'})</span>
              )}
              , total belanja <span className="font-semibold text-xs text-[#1A1615]">Rp {totalSum.toLocaleString('id-ID')}</span>
            </p>
            {(activeTab !== 'ALL' || (!isGaRole && paymentFilter !== 'ALL') || onlyToday || dateFilter !== 'ALL' || searchQuery) && (
              <button type="button" onClick={resetFilters} className="text-[#83273B] hover:underline cursor-pointer">Reset filter</button>
            )}
          </div>

          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} onViewReceipt={onViewReceipt} onReorder={onReorder} />
            ))}
            {filteredOrders.length === 0 && (
              <div className="bg-white border border-[#EAE3D5] rounded-2xl p-12 text-center text-[#8C827A]">
                <p className="text-sm font-medium">Tidak ada pesanan yang sesuai filter.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
