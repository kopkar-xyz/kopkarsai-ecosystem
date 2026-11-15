import React from 'react';
import { ShoppingBag, Clock, ClipboardList } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { Dropdown, type DropdownOption } from '../../../components/ui/Dropdown';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { CompanyFilter, DailySummaryMetrics, ProductOrder } from '../types';

interface DailySummaryCardProps {
  metrics: DailySummaryMetrics;
  summaryOrders: ProductOrder[];
  selectedDate: string;
  companyFilter: CompanyFilter;
  onCompanyFilterChange?: (filter: CompanyFilter) => void;
}

const PLACE_OPTIONS: DropdownOption<CompanyFilter>[] = [
  { value: 'ALL', label: 'Semua' },
  { value: 'SAI-T', label: 'SAI-T' },
  { value: 'SAI-B', label: 'SAI-B' },
];

export const DailySummaryCard: React.FC<DailySummaryCardProps> = ({
  metrics,
  summaryOrders,
  selectedDate,
  companyFilter,
  onCompanyFilterChange,
}) => {
  return (
    <div className="space-y-4">
      {/* 1. Baris Kartu Metrik Ringkas: Pesanan Hari Ini (kiri) & Menunggu Konfirmasi (kanan) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Card 1: Pesanan Hari Ini */}
        <Card padding="sm" className="flex flex-col justify-between hover:shadow-bento-hover transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-accent font-semibold text-[#5C6F67] truncate">
              Pesanan Hari Ini
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#EAF4EE] border border-[#A9C3A2]/60 flex items-center justify-center flex-shrink-0">
              <ShoppingBag size={16} className="text-[#1F5B45]" />
            </div>
          </div>
          <div>
            <p className="text-base sm:text-xl font-heading font-extrabold text-[#1A2421] tracking-tight">
              {metrics.totalOrdersToday} Produk
            </p>
            <p className="text-[11px] font-body text-[#5C6F67] mt-0.5 truncate">
              Total {metrics.totalItemsCountToday} item dipesan
            </p>
          </div>
        </Card>

        {/* Card 2: Menunggu Konfirmasi */}
        <Card padding="sm" className="flex flex-col justify-between hover:shadow-bento-hover transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-accent font-semibold text-[#5C6F67] truncate">
              Menunggu Konfirmasi
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#FEF6DC] border border-[#FDE68A] flex items-center justify-center flex-shrink-0">
              <Clock size={16} className="text-[#B45309]" />
            </div>
          </div>
          <div>
            <p className="text-base sm:text-xl font-heading font-extrabold text-[#1A2421] tracking-tight">
              {metrics.pendingOrdersCount} Pesanan
            </p>
            <p className="text-[11px] font-body text-[#5C6F67] mt-0.5 truncate">
              {metrics.pendingOrdersCount > 0
                ? 'Sedang diproses koperasi'
                : 'Semua terkonfirmasi'}
            </p>
          </div>
        </Card>
      </div>

      {/* 2. Container Tunggal: List Summary dari apa saja yang dipesan di hari itu */}
      <Card padding="md" className="space-y-3.5 border border-[#DED5C3] shadow-xs">
        {/* Header List Summary */}
        <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-[#DED5C3]/70">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#1F5B45] text-white flex items-center justify-center flex-shrink-0">
              <ClipboardList size={16} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-heading font-extrabold text-[#1A2421] truncate">
                Ringkasan Pesanan
              </h3>
              <p className="text-[11px] sm:text-xs font-body text-[#5C6F67] truncate">
                Pesanan {selectedDate}
              </p>
            </div>
          </div>

          {/* Filter Tempat Dropdown di Kanan */}
          <div className="flex-shrink-0">
            <Dropdown<CompanyFilter>
              options={PLACE_OPTIONS}
              value={companyFilter}
              onChange={(val) => onCompanyFilterChange?.(val)}
              align="right"
              size="sm"
            />
          </div>
        </div>

        {/* List Body */}
        {summaryOrders.length === 0 ? (
          <div className="py-6 text-center text-[#5C6F67] font-body text-xs sm:text-sm">
            Belum ada produk yang dipesan untuk tanggal ini.
          </div>
        ) : (
          <div className="divide-y divide-[#DED5C3]/50">
            {summaryOrders.map((order) => (
              <div
                key={order.id}
                className="py-2.5 flex items-center justify-between gap-3 hover:bg-[#F8F4EC]/60 px-1.5 rounded-xl transition-colors"
              >
                {/* Left: Quantity, Product Name, Category */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-7 h-7 rounded-xl bg-[#EAF4EE] text-[#1F5B45] text-xs font-accent font-extrabold flex items-center justify-center flex-shrink-0 border border-[#A9C3A2]/50">
                    {order.quantity}x
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-heading font-bold text-[#1A2421] truncate">
                      {order.productName}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] font-body text-[#5C6F67]">
                      <span className="truncate">{order.supplier || 'Produksi Sendiri'}</span>
                      <span>•</span>
                      <span className="flex-shrink-0">@{formatCurrencyIDR(order.unitPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Tag Perusahaan, Nominal, Status */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <span
                    className={`text-[10px] font-accent font-bold px-2 py-0.5 rounded-full border ${
                      order.companyUnit === 'SAI-T'
                        ? 'bg-[#FEF6DC] text-[#B45309] border-[#FDE68A]'
                        : 'bg-[#EAF4EE] text-[#1F5B45] border-[#A9C3A2]'
                    }`}
                  >
                    {order.companyUnit}
                  </span>
                  <span className="text-xs sm:text-sm font-heading font-extrabold text-[#1A2421] min-w-[75px] text-right">
                    {formatCurrencyIDR(order.totalPrice)}
                  </span>
                  <div className="hidden sm:block">
                    <StatusBadge status={order.status} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total Summary Footer */}
        {summaryOrders.length > 0 && (
          <div className="pt-2 border-t border-[#DED5C3] flex items-center justify-between text-xs sm:text-sm">
            <span className="font-heading font-bold text-[#5C6F67]">
              Akumulasi Pesanan ({metrics.totalItemsCountToday} item)
            </span>
            <span className="font-heading font-extrabold text-[#1F5B45] text-sm sm:text-base">
              {formatCurrencyIDR(metrics.totalAmountToday)}
            </span>
          </div>
        )}
      </Card>
    </div>
  );
};
