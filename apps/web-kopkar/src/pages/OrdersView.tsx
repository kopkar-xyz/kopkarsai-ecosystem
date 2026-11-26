import React, { useState } from 'react';
import { useKopkarRole } from '../app/auth/RoleContext';
import { OrdersWeekCalendar, type WeekDay } from '../features/orders/components/OrdersWeekCalendar';
import { OrdersMetricCards } from '../features/orders/components/OrdersMetricCards';
import { OrdersHeaderBar } from '../features/orders/components/OrdersHeaderBar';
import {
  OrdersFilterToolbar,
  type OrderKindFilter,
  type OrderPriorityFilter,
  type OrderStatusFilter,
} from '../features/orders/components/OrdersFilterToolbar';
import { KopkarOrderQueueCard } from '../features/orders/components/KopkarOrderQueueCard';
import { KopkarQrScanModal } from '../features/orders/components/KopkarQrScanModal';
import { KopkarSubstitutionModal } from '../features/orders/components/KopkarSubstitutionModal';
import { KopkarOrderDetailDrawer } from '../features/orders/components/KopkarOrderDetailDrawer';
import {
  INITIAL_KOPKAR_ORDERS,
  exportSalesReportCsv,
  type KopkarOrder,
  type KopkarOrderItem,
} from '../features/orders/data/kopkarOrdersData';

const WEEK_DAYS: WeekDay[] = [
  { dateStr: '2026-11-23', dayName: 'Sen', dateNum: 23, hasOrders: true },
  { dateStr: '2026-11-24', dayName: 'Sel', dateNum: 24, hasOrders: true },
  { dateStr: '2026-11-25', dayName: 'Rab', dateNum: 25, hasOrders: true },
  { dateStr: '2026-11-26', dayName: 'Kam', dateNum: 26, hasOrders: false },
  { dateStr: '2026-11-27', dayName: 'Jum', dateNum: 27, hasOrders: false },
  { dateStr: '2026-11-28', dayName: 'Sab', dateNum: 28, hasOrders: false },
  { dateStr: '2026-11-29', dayName: 'Min', dateNum: 29, hasOrders: false },
];

export const OrdersView: React.FC = () => {
  const { currentUser } = useKopkarRole();
  const isAdmin = currentUser.role === 'ADMIN_TOKO';
  const isSupplier = currentUser.role === 'SUPPLIER';
  const isHead = currentUser.role === 'KEPALA_KOPERASI';

  const [selectedDate, setSelectedDate] = useState('2026-11-24');
  const [orders, setOrders] = useState<KopkarOrder[]>(INITIAL_KOPKAR_ORDERS);
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>('ALL');
  const [kindFilter, setKindFilter] = useState<OrderKindFilter>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<OrderPriorityFilter>('ALL');
  const [unitFilter, setUnitFilter] = useState<'ALL' | 'SAI-B' | 'SAI-T'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [detailOrder, setDetailOrder] = useState<KopkarOrder | null>(null);
  const [substTarget, setSubstTarget] = useState<{ orderId: string; item: KopkarOrderItem } | null>(null);

  const supplierName = currentUser.supplierBusinessName ?? currentUser.name;
  const scopedOrders = isSupplier
    ? orders.filter(
        (o) =>
          o.orderKind === 'PO' &&
          o.items.some((i) => i.supplierName === supplierName)
      )
    : orders;

  const isOrderReadyForCashier = (o: KopkarOrder) =>
    o.orderKind !== 'PO' || o.supplierPoStatus === 'CONFIRMED';

  const pendingCount = scopedOrders.filter((o) => o.status === 'MENUNGGU_CHECKLIST').length;
  const acceptablePendingCount = scopedOrders.filter(
    (o) => o.status === 'MENUNGGU_CHECKLIST' && isOrderReadyForCashier(o)
  ).length;
  const readyCount = scopedOrders.filter((o) => o.status === 'SIAP_DIAMBIL').length;
  const completedCount = scopedOrders.filter((o) => o.status === 'SELESAI').length;
  const poCount = scopedOrders.filter((o) => o.orderKind === 'PO').length;
  const dailyCount = scopedOrders.filter((o) => o.orderKind === 'REGULER').length;
  const totalItemsCount = scopedOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, it) => s + it.quantity, 0),
    0
  );
  const accumulatedTotal = scopedOrders.reduce((s, o) => s + o.totalAmount, 0);

  const statusTabs: Array<{ key: OrderStatusFilter; label: string; count: number }> = [
    { key: 'ALL', label: 'Semua', count: scopedOrders.length },
    { key: 'MENUNGGU', label: 'Menunggu', count: pendingCount },
    { key: 'SIAP', label: 'Siap Diambil', count: readyCount },
    { key: 'SELESAI', label: 'Selesai', count: completedCount },
  ];

  const filteredOrders = scopedOrders
    .filter((o) => {
      if (statusFilter === 'MENUNGGU' && o.status !== 'MENUNGGU_CHECKLIST') return false;
      if (statusFilter === 'SIAP' && o.status !== 'SIAP_DIAMBIL') return false;
      if (statusFilter === 'SELESAI' && o.status !== 'SELESAI') return false;
      if (kindFilter !== 'ALL' && o.orderKind !== kindFilter) return false;
      if (priorityFilter === 'GA' && !o.isGaPriority) return false;
      if (priorityFilter === 'UMUM' && o.isGaPriority) return false;
      if (unitFilter !== 'ALL' && o.unit !== unitFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          o.invoiceNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.items.some((i) => i.name.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => (b.isGaPriority ? 1 : 0) - (a.isGaPriority ? 1 : 0));

  const toggleItem = (orderId: string, itemId: string) =>
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && isOrderReadyForCashier(o)
          ? { ...o, items: o.items.map((it) => (it.id === itemId ? { ...it, isChecked: !it.isChecked } : it)) }
          : o
      )
    );

  const setStatus = (orderId: string, status: KopkarOrder['status']) =>
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && (status !== 'SIAP_DIAMBIL' || isOrderReadyForCashier(o))
          ? { ...o, status }
          : o
      )
    );

  const handleAcceptAll = () =>
    setOrders((prev) =>
      prev.map((o) =>
        o.status === 'MENUNGGU_CHECKLIST' && isOrderReadyForCashier(o)
          ? { ...o, status: 'SIAP_DIAMBIL', items: o.items.map((it) => ({ ...it, isChecked: true })) }
          : o
      )
    );

  const applySub = (orderId: string, itemId: string, note: string) =>
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, items: o.items.map((it) => (it.id === itemId ? { ...it, note, isChecked: true } : it)) }
          : o
      )
    );

  const confirmPo = (orderId: string, confirmed: boolean, reason?: string) =>
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, supplierPoStatus: confirmed ? 'CONFIRMED' : 'DECLINED', supplierRejectReason: reason }
          : o
      )
    );

  return (
    <div className="space-y-4 animate-fadeIn select-none">
      <OrdersHeaderBar
        isAdmin={isAdmin}
        isHead={isHead}
        isSupplier={isSupplier}
        audioPlayed={audioPlayed}
        onPlayAudio={() => {
          setAudioPlayed(true);
          setTimeout(() => setAudioPlayed(false), 1800);
        }}
        onOpenQr={() => setIsQrOpen(true)}
        onExportCsv={() => exportSalesReportCsv(scopedOrders)}
      />

      <OrdersWeekCalendar
        days={WEEK_DAYS}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onToday={() => setSelectedDate('2026-11-24')}
      />

      <OrdersMetricCards
        pendingCount={pendingCount}
        pendingSubtitle={`${dailyCount} pesanan harian · ${poCount} PO katering`}
        totalItemsCount={totalItemsCount}
        volumeSubtitle={`${scopedOrders.length} transaksi · ${poCount} PO katering`}
        accumulatedTotal={accumulatedTotal}
        accumulatedSubtitle={`${completedCount} selesai · ${readyCount} siap diambil`}
      />

      <OrdersFilterToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        unitFilter={unitFilter}
        onUnitFilterChange={setUnitFilter}
        kindFilter={kindFilter}
        onKindFilterChange={setKindFilter}
        hideKindFilter={isSupplier}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        statusTabs={statusTabs}
        totalFilteredCount={filteredOrders.length}
        pendingCount={acceptablePendingCount}
        showAcceptAll={isAdmin}
        onAcceptAll={handleAcceptAll}
      />

      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#EAE4D3] p-10 text-center text-[13px] text-[#7A867E]">
            Tidak ada pesanan yang sesuai filter ini.
          </div>
        ) : (
          filteredOrders.map((ord) => (
            <KopkarOrderQueueCard
              key={ord.id}
              order={ord}
              canCashierAct={isAdmin}
              canSupplierConfirmPo={isSupplier}
              onToggleItemCheck={toggleItem}
              onUpdateStatus={setStatus}
              onOpenSubstitution={(id, it) => setSubstTarget({ orderId: id, item: it })}
              onSupplierConfirmPo={confirmPo}
              onViewDetail={setDetailOrder}
            />
          ))
        )}
      </div>

      <KopkarQrScanModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        orders={orders}
        onConfirmPickup={(id) => setStatus(id, 'SELESAI')}
      />

      <KopkarSubstitutionModal
        isOpen={Boolean(substTarget)}
        onClose={() => setSubstTarget(null)}
        orderId={substTarget?.orderId ?? ''}
        item={substTarget?.item ?? null}
        onConfirmSubstitution={applySub}
      />

      <KopkarOrderDetailDrawer order={detailOrder} onClose={() => setDetailOrder(null)} />
    </div>
  );
};
