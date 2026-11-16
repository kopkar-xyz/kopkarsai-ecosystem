import React from 'react';
import { Package } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { ProductOrder } from '../types';

interface ProductOrdersListProps {
  orders: ProductOrder[];
}

export const ProductOrdersList: React.FC<ProductOrdersListProps> = ({ orders }) => {
  return (
    <Card padding="md" className="space-y-4 border border-[#DED5C3]">
      {/* Header Halaman Daftar Pesanan Produk */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DED5C3]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-heading font-extrabold text-[#1A2421] flex items-center gap-2">
              <Package size={20} className="text-[#1F5B45]" />
              <span>Daftar Pesanan Produk</span>
            </h2>
          </div>
          <p className="text-xs font-body text-[#5C6F67] mt-0.5">
            Pesanan produk yang masuk dari pembeli untuk supplier
          </p>
        </div>
      </div>

      {/* List Pesanan Produk */}
      {orders.length === 0 ? (
        <div className="text-center py-10 text-[#5C6F67] font-body">
          <Package size={36} className="mx-auto mb-2 text-[#8FA39A] opacity-60" />
          <p className="text-sm font-medium">Belum ada pesanan produk yang sesuai filter.</p>
          <p className="text-xs text-[#8FA39A] mt-1">Silakan pilih tanggal lain.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-3.5 sm:p-4 rounded-2xl bg-[#F8F4EC] hover:bg-[#EAF4EE]/60 border border-[#DED5C3] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group"
            >
              {/* Kolom Kiri: Badge Jumlah Pcs (Besar) + Detail Produk */}
              <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                {/* Badge Jumlah Pcs Besar */}
                <div className="flex flex-col items-center justify-center w-16 sm:w-20 py-2 sm:py-2.5 rounded-2xl bg-[#EAF4EE] border border-[#A9C3A2] flex-shrink-0 text-center shadow-xs">
                  <span className="text-[10px] font-accent font-semibold text-[#5C6F67] uppercase tracking-wider">
                    Jumlah
                  </span>
                  <span className="text-2xl sm:text-3xl font-heading font-black text-[#1F5B45] leading-tight my-0.5">
                    {order.quantity}
                  </span>
                  <span className="text-[11px] font-accent font-extrabold text-[#2F6F56] uppercase tracking-wider">
                    Pcs
                  </span>
                </div>

                {/* Detail: ID Order, Tempat (SAI-T / SAI-B), Nama Produk, Harga / pcs */}
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1F5B45]">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`text-[10px] font-accent font-bold px-2 py-0.5 rounded-full border ${
                        order.companyUnit === 'SAI-T'
                          ? 'bg-[#FEF6DC] text-[#B45309] border-[#FDE68A]'
                          : 'bg-[#EAF4EE] text-[#1F5B45] border-[#A9C3A2]'
                      }`}
                    >
                      {order.companyUnit}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-heading font-bold text-[#1A2421] truncate">
                    {order.productName}
                  </h3>

                  <p className="text-xs font-body text-[#5C6F67]">
                    Harga Satuan:{' '}
                    <strong className="font-semibold text-[#1A2421]">
                      {formatCurrencyIDR(order.unitPrice)} / pcs
                    </strong>
                  </p>
                </div>
              </div>

              {/* Kolom Kanan: Total Biaya */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center pt-2.5 sm:pt-0 border-t sm:border-t-0 border-[#DED5C3] flex-shrink-0 sm:min-w-[130px]">
                <span className="text-[10px] font-accent text-[#5C6F67] block">Total Biaya</span>
                <span className="text-base sm:text-xl font-heading font-extrabold text-[#1F5B45]">
                  {formatCurrencyIDR(order.totalPrice)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
