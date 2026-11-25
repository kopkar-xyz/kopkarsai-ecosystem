import React, { useState } from 'react';
import { Volume2, QrCode } from 'lucide-react';
import { Order, OrderItem } from '../../../types/order';
import { OrderQueueCard } from './OrderQueueCard';
import { QrScanModal } from './QrScanModal';
import { ProductSubstitutionModal } from './ProductSubstitutionModal';
import { OrderQueueFilterBar, TabFilter } from './OrderQueueFilterBar';

interface OrderQueuePanelProps {
  orders: Order[];
  onToggleItemCheck: (orderId: string, itemId: string) => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  playIrasshaimase: () => void;
  audioPlayed: boolean;
  filterMode?: 'ALL' | 'GA_ONLY';
}

/**
 * OrderQueuePanel — Dasbor Kasir & Antrean Prioritas GA
 * Filter antrean rata kanan, field pencarian di kiri, tanpa dropdown sumber.
 * Budget: < 200 LOC.
 */
export const OrderQueuePanel: React.FC<OrderQueuePanelProps> = ({
  orders,
  onToggleItemCheck,
  onUpdateStatus,
  playIrasshaimase,
  filterMode = 'ALL',
}) => {
  const [currentTab, setCurrentTab] = useState<TabFilter>(filterMode === 'GA_ONLY' ? 'GA' : 'ALL');
  const [searchInvoice, setSearchInvoice] = useState('');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [substData, setSubstData] = useState<{ orderId: string; item: OrderItem } | null>(null);

  // Perhitungan KPI Tetap (Sesuai Invarian)
  const pendingCount = orders.filter((o) => o.status === 'MENUNGGU_CHECKLIST').length;
  const readyCount = orders.filter((o) => o.status === 'SIAP_DIAMBIL').length;
  const gaCount = orders.filter((o) => o.isGaPriority && o.status !== 'SELESAI').length;
  const allActiveCount = orders.filter((o) => o.status !== 'SELESAI').length;
  const shiftOmzet = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const filteredOrders = orders
    .filter((o) => {
      if (filterMode === 'GA_ONLY' || currentTab === 'GA') return o.isGaPriority && o.status !== 'SELESAI';
      if (currentTab === 'PENDING') return o.status === 'MENUNGGU_CHECKLIST';
      if (currentTab === 'READY') return o.status === 'SIAP_DIAMBIL';
      return o.status !== 'SELESAI';
    })
    .filter((o) => {
      if (!searchInvoice.trim()) return true;
      const q = searchInvoice.toLowerCase();
      return (
        o.invoiceNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.items.some((it) => it.name.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => (b.isGaPriority ? 1 : 0) - (a.isGaPriority ? 1 : 0));

  const handleApplySubstitution = (orderId: string, itemId: string, resolutionNote: string) => {
    const target = orders.find((o) => o.id === orderId);
    const it = target?.items.find((i) => i.id === itemId);
    if (it) {
      it.note = resolutionNote;
      it.isChecked = true;
    }
  };

  return (
    <div className="space-y-4 select-none">
      {/* 1. Header Dasbor Kasir + Aksi Audio & Tombol Verifikasi Pengambilan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h1 className="font-brush text-2xl sm:text-3xl text-[#83273B] font-semibold leading-tight">
            {filterMode === 'GA_ONLY' ? 'Antrean prioritas GA' : 'Dasbor kasir'}
          </h1>
          <p className="text-xs text-[#665E60] mt-0.5">
            Cek barang di rak, centang tiap item, lalu tandai siap diambil.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={playIrasshaimase}
            className="w-10 h-10 rounded-xl bg-white border border-[#EAE3D5] flex items-center justify-center text-[#83273B] hover:bg-[#FAF6F0] active:scale-95 transition-all cursor-pointer shadow-2xs"
            title="Bunyi pesanan masuk"
            aria-label="Bunyi pesanan"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsQrModalOpen(true)}
            className="h-10 px-4 rounded-xl bg-[#83273B] hover:bg-[#681E2E] active:scale-98 text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <QrCode className="w-4 h-4" />
            <span>Verifikasi pengambilan</span>
          </button>
        </div>
      </div>

      {/* 2. Empat Metric Cards Grid (KPI Tetap Dipertahankan) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-[#EAE3D5] rounded-2xl p-4 shadow-2xs">
          <span className="text-xs text-[#8C827A] block">Menunggu checklist</span>
          <span className="font-bold text-2xl sm:text-3xl text-[#1A1615] block mt-1">{pendingCount}</span>
        </div>
        <div className="bg-white border border-[#EAE3D5] rounded-2xl p-4 shadow-2xs">
          <span className="text-xs text-[#8C827A] block">Siap diambil</span>
          <span className="font-bold text-2xl sm:text-3xl text-[#1A1615] block mt-1">{readyCount}</span>
        </div>
        <div className="bg-white border border-[#EAE3D5] rounded-2xl p-4 shadow-2xs">
          <span className="text-xs text-[#8C827A] block">Prioritas GA</span>
          <span className="font-bold text-2xl sm:text-3xl text-[#1A1615] block mt-1">{gaCount}</span>
        </div>
        <div className="bg-white border border-[#EAE3D5] rounded-2xl p-4 shadow-2xs">
          <span className="text-xs text-[#8C827A] block">Omzet shift hari ini</span>
          <span className="font-bold text-2xl sm:text-3xl text-[#1A1615] block mt-1">
            Rp {shiftOmzet.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* 3. Baris Pencarian (Kiri) & Tab Filter Antrean (Rata Kanan) */}
      <OrderQueueFilterBar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        tabCounts={{ all: allActiveCount, pending: pendingCount, ready: readyCount, ga: gaCount }}
        searchQuery={searchInvoice}
        onSearchChange={setSearchInvoice}
      />

      {/* 4. Daftar Kartu Pesanan Kasir (OrderQueueCard) */}
      <div className="space-y-4 pt-0.5">
        {filteredOrders.map((ord) => (
          <OrderQueueCard
            key={ord.id}
            order={ord}
            onToggleItemCheck={onToggleItemCheck}
            onUpdateStatus={onUpdateStatus}
            onOpenSubstitution={(orderId, item) => setSubstData({ orderId, item })}
          />
        ))}
        {filteredOrders.length === 0 && (
          <div className="bg-white border border-[#EAE3D5] rounded-2xl p-12 text-center text-[#8C827A]">
            <p className="text-sm font-medium">Tidak ada antrean pesanan pada filter ini.</p>
          </div>
        )}
      </div>

      <QrScanModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        orders={orders}
        onConfirmPickup={(id) => {
          onUpdateStatus(id, 'SELESAI');
          setIsQrModalOpen(false);
        }}
      />

      {substData && (
        <ProductSubstitutionModal
          isOpen={!!substData}
          onClose={() => setSubstData(null)}
          orderId={substData.orderId}
          item={substData.item}
          onConfirmSubstitution={handleApplySubstitution}
        />
      )}
    </div>
  );
};
