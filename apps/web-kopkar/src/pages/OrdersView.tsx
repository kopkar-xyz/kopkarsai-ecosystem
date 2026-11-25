import React, { useState } from 'react';
import { OrdersWeekCalendar } from '../features/orders/components/OrdersWeekCalendar';
import { OrdersMetricCards } from '../features/orders/components/OrdersMetricCards';
import { OrdersPreOrderCard, PreOrderData } from '../features/orders/components/OrdersPreOrderCard';
import { OrdersDailyTableCard, DailyOrderItem } from '../features/orders/components/OrdersDailyTableCard';
import { OrderDetailModal } from '../features/orders/components/OrderDetailModal';
import {
  INITIAL_WEEK_DAYS,
  INITIAL_PREORDERS,
  INITIAL_DAILY_ORDERS,
} from '../features/orders/data/ordersMockData';

/**
 * OrdersView (Dasbor Rekapitulasi Pesanan Masuk & PO H-1 Supplier) — KK-SCR-010
 * Slicing 1:1 Presisi Sesuai Gambar Referensi:
 * 1. Kalender Mingguan (23 Nov – 29 Nov 2026, 7 Day Cards)
 * 2. 3 Kartu Metric KPI (Perlu Konfirmasi, Pesanan Harian, Akumulasi Harian)
 * 3. Modul PO Katering Untuk Besok (Cut-off 15:00 WIB, Porsi, Jadwal, Aksi)
 * 4. Modul Pesanan Hari Ini (Tabel Pesanan, Filter Unit, Status Pills, Aksi Terima)
 * Budget: < 200 LOC.
 */
export const OrdersView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2026-11-24');
  const [preOrders, setPreOrders] = useState<PreOrderData[]>(INITIAL_PREORDERS);
  const [dailyOrders, setDailyOrders] = useState<DailyOrderItem[]>(INITIAL_DAILY_ORDERS);
  const [activeDetailOrder, setActiveDetailOrder] = useState<DailyOrderItem | null>(null);

  const handleConfirmPreOrder = (id: string, isConfirmed: boolean) => {
    setPreOrders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: isConfirmed ? 'CONFIRMED' : 'DECLINED' } : item
      )
    );
  };

  const handleAcceptDailyOrder = (id: string) => {
    setDailyOrders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'DITERIMA' } : item))
    );
  };

  const handleAcceptAllDailyOrders = () => {
    setDailyOrders((prev) => prev.map((item) => ({ ...item, status: 'DITERIMA' })));
  };

  // Kalkulasi KPI Dinamis Sesuai Nilai di Gambar
  const pendingPoCount = preOrders.filter((po) => po.status === 'PENDING').length;
  const pendingDailyCount = dailyOrders.filter((o) => o.status === 'MENUNGGU').length;
  const totalPendingConfirmation = pendingPoCount + pendingDailyCount;

  const totalProducts = new Set(dailyOrders.map((o) => o.productName)).size;
  const totalItemsCount = dailyOrders.reduce((sum, o) => sum + o.qty, 0);
  const accumulatedDailyTotal = dailyOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const acceptedOrdersCount = dailyOrders.filter((o) => o.status === 'DITERIMA').length;

  return (
    <div className="space-y-4 sm:space-y-5 animate-fadeIn select-none">
      {/* 1. Selector Kalender Mingguan Sesuai Gambar */}
      <OrdersWeekCalendar
        days={INITIAL_WEEK_DAYS}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        dateRangeLabel="23 Nov – 29 Nov 2026"
        onToday={() => setSelectedDate('2026-11-24')}
      />

      {/* 2. Tiga Kartu Metrik Ringkasan KPI Sesuai Gambar */}
      <OrdersMetricCards
        pendingConfirmationCount={totalPendingConfirmation}
        pendingSubtitle={`${pendingPoCount} PO katering · ${pendingDailyCount} pesanan`}
        dailyProductsCount={totalProducts}
        dailyItemsSubtitle={`${totalItemsCount} item dipesan`}
        accumulatedDailyTotal={accumulatedDailyTotal}
        accumulatedSubtitle={`${acceptedOrdersCount} sudah diterima`}
      />

      {/* 3. Antrean PO Katering Untuk Besok Sesuai Gambar */}
      <OrdersPreOrderCard
        items={preOrders}
        onConfirm={handleConfirmPreOrder}
      />

      {/* 4. Tabel Pesanan Hari Ini Sesuai Gambar */}
      <OrdersDailyTableCard
        items={dailyOrders}
        onAcceptOrder={handleAcceptDailyOrder}
        onAcceptAll={handleAcceptAllDailyOrders}
        onViewDetail={setActiveDetailOrder}
      />

      {/* 5. Modal Rincian Pesanan (Aksi Tombol Mata) */}
      <OrderDetailModal
        order={activeDetailOrder}
        onClose={() => setActiveDetailOrder(null)}
        onAcceptOrder={handleAcceptDailyOrder}
      />
    </div>
  );
};
