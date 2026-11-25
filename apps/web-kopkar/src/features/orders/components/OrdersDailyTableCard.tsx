import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { OrdersDailyTableRow } from './OrdersDailyTableRow';
import { formatRupiah } from '../../../lib/kopkarsaiFormatters';

export interface DailyOrderItem {
  id: string;
  qty: number;
  productName: string;
  supplierName: string;
  unitPrice: number;
  customerName: string;
  department: string;
  time: string;
  unit: string;
  totalAmount: number;
  status: 'DITERIMA' | 'MENUNGGU';
}

interface OrdersDailyTableCardProps {
  items: DailyOrderItem[];
  onAcceptOrder: (id: string) => void;
  onAcceptAll: () => void;
  onViewDetail: (order: DailyOrderItem) => void;
}

export const OrdersDailyTableCard: React.FC<OrdersDailyTableCardProps> = ({
  items,
  onAcceptOrder,
  onAcceptAll,
  onViewDetail,
}) => {
  const [unitFilter, setUnitFilter] = useState<'Semua' | 'SAI-B' | 'SAI-T'>('Semua');
  const [statusTab, setStatusTab] = useState<'Semua' | 'Menunggu' | 'Diterima'>('Semua');

  const filteredItems = items.filter((item) => {
    const matchUnit = unitFilter === 'Semua' || item.unit === unitFilter;
    const matchStatus =
      statusTab === 'Semua'
        ? true
        : statusTab === 'Menunggu'
        ? item.status === 'MENUNGGU'
        : item.status === 'DITERIMA';
    return matchUnit && matchStatus;
  });

  const totalProducts = new Set(items.map((i) => i.productName)).size;
  const totalItemsCount = items.reduce((sum, i) => sum + i.qty, 0);
  const totalAmountSum = items.reduce((sum, i) => sum + i.totalAmount, 0);

  const waitingCount = items.filter((i) => i.status === 'MENUNGGU').length;
  const acceptedCount = items.filter((i) => i.status === 'DITERIMA').length;

  return (
    <section className="bg-white rounded-2xl border border-[#EAE4D3] p-4 sm:p-6 shadow-xs select-none">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F0EBDC]">
        <div>
          <h2 className="font-okashi text-[19px] text-[#18221D]">Pesanan hari ini</h2>
          <p className="text-[12.5px] text-[#7A867E] tabular-nums mt-0.5 font-sans">
            {totalProducts} produk · {totalItemsCount} item · {formatRupiah(totalAmountSum)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 font-sans">
          {/* Unit filter */}
          <div className="relative">
            <select
              aria-label="Filter unit koperasi"
              value={unitFilter}
              onChange={(e) => setUnitFilter(e.target.value as 'Semua' | 'SAI-B' | 'SAI-T')}
              className="appearance-none bg-[#FAF7EE] border border-[#EAE4D3] rounded-xl pl-3.5 pr-8 py-1.5 text-[12.5px] font-medium text-[#18221D] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5B45]"
            >
              <option value="Semua">Semua Unit</option>
              <option value="SAI-B">Unit SAI-B</option>
              <option value="SAI-T">Unit SAI-T</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#526058] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Status segmented tabs */}
          <div className="inline-flex items-center bg-[#F5F0E2] p-1 rounded-xl">
            {(['Semua', 'Menunggu', 'Diterima'] as const).map((tab) => {
              const count =
                tab === 'Semua' ? items.length : tab === 'Menunggu' ? waitingCount : acceptedCount;
              const active = statusTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusTab(tab)}
                  className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                    active
                      ? 'bg-[#1F5B45] text-white shadow-xs'
                      : 'text-[#526058] hover:text-[#18221D]'
                  }`}
                >
                  {tab} {count}
                </button>
              );
            })}
          </div>

          {waitingCount > 0 && (
            <button
              type="button"
              onClick={onAcceptAll}
              className="px-3.5 py-1.5 rounded-xl border border-[#1F5B45] text-[#1F5B45] hover:bg-[#EAF4EE] text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              Terima Semua
            </button>
          )}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="py-10 text-center text-[13px] text-[#7A867E] font-sans">
          Belum ada pesanan sesuai filter pada tanggal ini.
        </div>
      ) : (
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left border-collapse min-w-[540px]">
            <thead>
              <tr className="bg-[#F6F2E6] text-[12px] font-medium text-[#526058] font-sans">
                <th className="py-2.5 px-3 rounded-l-xl">Produk & Mitra</th>
                <th className="py-2.5 px-3">Pemesan</th>
                <th className="py-2.5 px-3">Unit</th>
                <th className="py-2.5 px-3 text-right">Total</th>
                <th className="py-2.5 px-3 text-right rounded-r-xl">Status / Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBDC] text-[13px]">
              {filteredItems.map((item) => (
                <OrdersDailyTableRow
                  key={item.id}
                  item={item}
                  onAcceptOrder={onAcceptOrder}
                  onViewDetail={onViewDetail}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
