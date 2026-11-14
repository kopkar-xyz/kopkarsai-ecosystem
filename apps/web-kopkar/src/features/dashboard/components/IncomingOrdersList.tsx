import React from 'react';
import { ShoppingBag, ChevronRight, Tag } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { IncomingOrder } from '../../../types';

interface IncomingOrdersListProps {
  orders: IncomingOrder[];
  filterType: 'ALL' | 'SAME_DAY' | 'PO_H1';
  onFilterChange: (type: 'ALL' | 'SAME_DAY' | 'PO_H1') => void;
}

export const IncomingOrdersList: React.FC<IncomingOrdersListProps> = ({
  orders,
  filterType,
  onFilterChange,
}) => {
  return (
    <Card padding="md" className="space-y-4">
      {/* Header and Filter chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DED5C3]">
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-extrabold text-[#1A2421] flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#1F5B45]" />
            <span>Pesanan Masuk</span>
            <span className="text-xs font-accent font-semibold text-[#2F6F56] bg-[#EAF4EE] px-2 py-0.5 rounded-full border border-[#A9C3A2]/60">
              Harian
            </span>
          </h2>
          <p className="text-xs font-body text-[#5C6F67] mt-0.5">
            Daftar pesanan toko same-day dan pre-order katering harian
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-[#F3ECDD] p-1 rounded-2xl border border-[#DED5C3] self-start sm:self-auto">
          {(
            [
              { id: 'ALL', label: 'Semua' },
              { id: 'SAME_DAY', label: 'Same-Day' },
              { id: 'PO_H1', label: 'PO H-1' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`px-3 py-1 rounded-xl text-xs font-accent font-bold transition-all duration-150 cursor-pointer ${
                filterType === tab.id
                  ? 'bg-[#1F5B45] text-white shadow-xs'
                  : 'text-[#5C6F67] hover:text-[#1F5B45]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-10 text-[#5C6F67] font-body">
          <ShoppingBag size={32} className="mx-auto mb-2 text-[#8FA39A] opacity-60" />
          <p className="text-sm font-medium">Belum ada pesanan yang sesuai filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-3.5 sm:p-4 rounded-2xl bg-[#F8F4EC] hover:bg-[#EAF4EE]/60 border border-[#DED5C3] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              {/* Left Column: Number, Customer, Items */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#1F5B45]">
                    {order.orderNumber}
                  </span>
                  <span
                    className={`text-[10px] font-accent font-bold px-2 py-0.5 rounded-full border ${
                      order.orderType === 'PO_H1'
                        ? 'bg-[#EEF2F6] text-[#1E3A5F] border-[#BFDBFE]'
                        : 'bg-[#EAF4EE] text-[#1F5B45] border-[#A9C3A2]'
                    }`}
                  >
                    {order.orderType === 'PO_H1' ? 'PO H-1 Katering' : 'Same-Day Belanja'}
                  </span>
                  <span className="text-xs text-[#5C6F67] font-body">• {order.orderTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-heading font-bold text-[#1A2421]">
                    {order.customerName}
                  </span>
                  <span className="text-xs font-accent text-[#5C6F67] bg-white px-2 py-0.5 rounded-md border border-[#DED5C3]">
                    {order.unit}
                  </span>
                </div>

                {/* Items preview */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#5C6F67] font-body">
                  <Tag size={12} className="text-[#2F6F56]" />
                  <span>
                    {order.items.map((it) => `${it.name} (${it.quantity}x)`).join(', ')}
                  </span>
                </div>

                {order.notes && (
                  <p className="text-[11px] font-body text-[#854D0E] bg-[#FEF9C3]/60 px-2.5 py-1 rounded-lg border border-[#FDE047]/60">
                    Catatan: {order.notes}
                  </p>
                )}
              </div>

              {/* Right Column: Amount & Status Badge */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#DED5C3]">
                <span className="text-base font-heading font-extrabold text-[#1A2421]">
                  {formatCurrencyIDR(order.totalAmount)}
                </span>
                <div className="flex items-center gap-2">
                  <StatusBadge status={order.status} size="sm" />
                  <ChevronRight
                    size={16}
                    className="text-[#5C6F67] group-hover:text-[#1F5B45] group-hover:translate-x-0.5 transition-all hidden sm:block"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
