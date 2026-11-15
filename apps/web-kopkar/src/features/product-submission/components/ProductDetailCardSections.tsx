import React from 'react';
import {
  Package,
  Calendar,
  Power,
  Lock,
  Plus,
  FileEdit,
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { DetailedProduct, SubmissionTransaction } from '../types';

interface ProductDetailCardSectionsProps {
  product: DetailedProduct;
  isApproved: boolean;
  marginAmount: number;
  marginPercent: number;
  onToggleActive: (productId: string) => void;
  onStartRevision: (trx: SubmissionTransaction) => void;
  onNewDropSchedule: (product: DetailedProduct) => void;
}

export const ProductDetailCardSections: React.FC<ProductDetailCardSectionsProps> = ({
  product,
  isApproved,
  marginAmount,
  marginPercent,
  onToggleActive,
  onStartRevision,
  onNewDropSchedule,
}) => {
  return (
    <div className="space-y-5 text-xs font-body text-[#1A2421]">
      {/* 1. Toggle Aktifkan / Nonaktifkan Box */}
      <Card padding="md" className="border-[#DED5C3] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Power
              size={16}
              className={
                isApproved
                  ? product.isActive
                    ? 'text-[#1F5B45]'
                    : 'text-[#DC4C70]'
                  : 'text-[#8FA39A]'
              }
            />
            <span className="font-heading font-extrabold text-sm text-[#1A2421]">
              Status Operasional Etalase:
            </span>
            <span
              className={`font-heading font-bold px-2 py-0.5 rounded-md text-xs ${
                isApproved
                  ? product.isActive
                    ? 'bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2]'
                    : 'bg-[#FDF0F3] text-[#DC4C70] border border-[#DC4C70]/30'
                  : 'bg-[#EBE4D5] text-[#5C6F67]'
              }`}
            >
              {isApproved
                ? product.isActive
                  ? 'AKTIF (Etalase Buka)'
                  : 'NONAKTIF (Pasokan Dijeda)'
                : 'BELUM DISETUJUI'}
            </span>
          </div>
          <p className="text-[11px] text-[#5C6F67]">
            {isApproved
              ? product.isActive
                ? 'Produk tampil aktif di kasir toko dan marketplace karyawan. Siap menerima pesanan.'
                : 'Pasokan dijeda sementara oleh supplier. Produk tidak tampil di etalase belanja.'
              : 'Produk hanya dapat diaktifkan/dinonaktifkan jika telah resmi disetujui oleh pengurus koperasi.'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {isApproved ? (
            <button
              type="button"
              onClick={() => onToggleActive(product.id)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold flex items-center gap-2 cursor-pointer transition-all shadow-xs active:scale-95 ${
                product.isActive
                  ? 'bg-[#1F5B45] hover:bg-[#2F6F56] text-white'
                  : 'bg-white hover:bg-[#F3ECDD] text-[#DC4C70] border border-[#DC4C70]/40'
              }`}
            >
              <Power size={14} />
              <span>{product.isActive ? 'Nonaktifkan Produk' : 'Aktifkan Produk'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBE4D5]/70 text-[#8FA39A] text-[11px] font-heading font-bold select-none cursor-not-allowed border border-[#DED5C3]">
              <Lock size={13} />
              <span>Terkunci</span>
            </div>
          )}
        </div>
      </Card>

      {/* 2. Rincian Data Produk (Sama persis dengan formulir pengajuan) */}
      <Card padding="md" className="space-y-4">
        <h3 className="font-heading font-extrabold text-sm text-[#1A2421] flex items-center gap-2 border-b border-[#DED5C3] pb-2">
          <Package size={16} className="text-[#1F5B45]" />
          <span>Data Spesifikasi & Ketentuan Produk</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-3 bg-[#F8F4EC]/70 rounded-xl border border-[#DED5C3]/70 space-y-1">
            <span className="text-[#5C6F67] text-[10px] uppercase font-accent font-bold tracking-wider">
              Di Supply Dimana
            </span>
            <p className="font-heading font-bold text-sm text-[#1A2421]">
              Pabrik {product.supplyLocation}
            </p>
            <p className="text-[11px] text-[#5C6F67]">Toko & Kantin Koperasi Unit {product.supplyLocation}</p>
          </div>

          <div className="p-3 bg-[#F8F4EC]/70 rounded-xl border border-[#DED5C3]/70 space-y-1">
            <span className="text-[#5C6F67] text-[10px] uppercase font-accent font-bold tracking-wider">
              Waktu Rutin Supply
            </span>
            <p className="font-heading font-bold text-sm text-[#1A2421]">
              {product.supplySchedule}
            </p>
            <p className="text-[11px] text-[#5C6F67]">Jadwal pengiriman pasokan rutin</p>
          </div>

          <div className="p-3 bg-[#F8F4EC]/70 rounded-xl border border-[#DED5C3]/70 space-y-1">
            <span className="text-[#5C6F67] text-[10px] uppercase font-accent font-bold tracking-wider">
              Daya Tahan / Habis Barang
            </span>
            <p className="font-heading font-bold text-sm text-[#1A2421]">
              {product.shelfLife}
              {product.customShelfLifeDays ? ` (${product.customShelfLifeDays} Hari)` : ''}
            </p>
            <p className="text-[11px] text-[#5C6F67]">Masa simpan makanan/minuman</p>
          </div>

          <div className="p-3 bg-[#F8F4EC]/70 rounded-xl border border-[#DED5C3]/70 space-y-1">
            <span className="text-[#5C6F67] text-[10px] uppercase font-accent font-bold tracking-wider">
              Jam & Lama Pembuatan
            </span>
            <p className="font-heading font-bold text-sm text-[#1A2421]">
              {product.productionTime || '04:30'} WIB ({product.productionDuration || '1.5 Jam'})
            </p>
            <p className="text-[11px] text-[#5C6F67]">Waktu olah & proses produksi</p>
          </div>

          <div className="p-3 bg-[#F8F4EC]/70 rounded-xl border border-[#DED5C3]/70 space-y-1">
            <span className="text-[#5C6F67] text-[10px] uppercase font-accent font-bold tracking-wider">
              Rentang Waktu Kirim
            </span>
            <p className="font-heading font-bold text-sm text-[#1A2421]">
              {product.deliveryTimeWindow || '06:00 - 06:45 WIB'}
            </p>
            <p className="text-[11px] text-[#5C6F67]">Estimasi tiba di meja kasir</p>
          </div>

          <div className="p-3 bg-[#F8F4EC]/70 rounded-xl border border-[#DED5C3]/70 space-y-1">
            <span className="text-[#5C6F67] text-[10px] uppercase font-accent font-bold tracking-wider">
              Berat Bersih (Netto)
            </span>
            <p className="font-heading font-bold text-sm text-[#1A2421]">
              {product.weightGrams || 'Belum ditimbang'}
            </p>
            <p className="text-[10px] text-[#8FA39A] italic">Diverifikasi oleh pengurus</p>
          </div>
        </div>

        {/* Struktur Finansial */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#DED5C3] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <span className="text-[10px] font-accent text-[#5C6F67] block">Harga Beli Koperasi (HPP)</span>
            <span className="font-heading font-extrabold text-sm text-[#1A2421]">
              {formatCurrencyIDR(product.costPrice)}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-accent text-[#5C6F67] block">Harga Jual Etalase</span>
            <span className="font-heading font-extrabold text-sm text-[#1F5B45]">
              {formatCurrencyIDR(product.sellingPrice)}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-accent text-[#5C6F67] block">Margin Koperasi</span>
            <span className="font-heading font-extrabold text-sm text-[#1F5B45]">
              {formatCurrencyIDR(marginAmount)} ({marginPercent}%)
            </span>
          </div>
          <div>
            <span className="text-[10px] font-accent text-[#5C6F67] block">Qty Kirim Batch</span>
            <span className="font-heading font-extrabold text-sm text-[#1A2421]">
              {product.qtyKirim} Unit
            </span>
          </div>
        </div>

        {/* Komposisi Bahan */}
        <div className="p-3 bg-[#F8F4EC]/70 rounded-xl border border-[#DED5C3]/70 space-y-1.5">
          <span className="text-[#5C6F67] text-[10px] uppercase font-accent font-bold tracking-wider">
            Komposisi Barang ({product.ingredients.length} Bahan)
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.ingredients.map((ing, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full bg-white text-[#1F5B45] border border-[#A9C3A2] text-xs font-heading font-bold shadow-xs"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Keterangan Tambahan */}
        {product.additionalNotes && (
          <div className="p-3 bg-white rounded-xl border border-[#DED5C3] text-xs space-y-1">
            <span className="text-[#5C6F67] text-[10px] uppercase font-accent font-bold">
              Keterangan Tambahan
            </span>
            <p className="text-[#24332F]">{product.additionalNotes}</p>
          </div>
        )}
      </Card>

      {/* 3. Log Transaksi Pengajuan Produk */}
      <Card padding="md" className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#DED5C3] pb-2">
          <h3 className="font-heading font-extrabold text-sm text-[#1A2421] flex items-center gap-2">
            <Calendar size={16} className="text-[#1F5B45]" />
            <span>Log Transaksi Pengajuan Produk ({product.transactions.length})</span>
          </h3>

          <button
            type="button"
            onClick={() => onNewDropSchedule(product)}
            className="px-3 py-1.5 rounded-xl bg-[#1F5B45] hover:bg-[#2F6F56] text-white text-xs font-heading font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            <Plus size={14} />
            <span>Ajukan Jadwal Drop Baru</span>
          </button>
        </div>

        {product.transactions.length === 0 ? (
          <p className="text-center py-4 text-xs text-[#5C6F67] italic">
            Belum ada catatan riwayat transaksi untuk produk ini.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#DED5C3] bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8F4EC] text-[#5C6F67] border-b border-[#DED5C3] font-heading font-bold">
                  <th className="py-2.5 px-3">Tiket & Tanggal</th>
                  <th className="py-2.5 px-3">Jadwal & Shift</th>
                  <th className="py-2.5 px-3">Qty</th>
                  <th className="py-2.5 px-3">Status Pengujian</th>
                  <th className="py-2.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DED5C3]/60 font-body">
                {product.transactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-[#FDFBF7]">
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="font-heading font-bold text-[#1F5B45] block">
                        {trx.id}
                      </span>
                      <span className="text-[10px] text-[#5C6F67]">{trx.submissionDate}</span>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <p className="font-heading font-bold text-[#1A2421]">
                        {trx.dropDay}, {trx.dropShift === 'SHIFT_A' ? 'Shift A' : 'Shift B'}
                      </p>
                      <span className="text-[10px] text-[#5C6F67]">Pabrik {trx.dropLocation}</span>
                    </td>
                    <td className="py-2.5 px-3 font-heading font-bold whitespace-nowrap">
                      {trx.qtyKirim} Unit
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-heading font-bold ${
                          trx.status === 'DISETUJUI'
                            ? 'bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2]'
                            : trx.status === 'PERLU_REVISI'
                            ? 'bg-[#FEF6DC] text-[#B87D09] border border-[#F6CE2C]'
                            : trx.status === 'DITOLAK'
                            ? 'bg-[#FDF0F3] text-[#DC4C70] border border-[#DC4C70]/30'
                            : 'bg-[#EBE4D5] text-[#5C6F67]'
                        }`}
                      >
                        {trx.status === 'DISETUJUI'
                          ? 'Disetujui'
                          : trx.status === 'PERLU_REVISI'
                          ? 'Perlu Revisi'
                          : trx.status === 'DITOLAK'
                          ? 'Ditolak'
                          : 'Menunggu Pengujian'}
                      </span>
                      {trx.revisionNotes && (
                        <p className="text-[10px] text-[#801A38] mt-1 bg-[#FEF6DC] p-1.5 rounded border border-[#F6CE2C]/40">
                          <strong>Catatan:</strong> {trx.revisionNotes}
                        </p>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      {trx.status === 'PERLU_REVISI' || trx.status === 'DRAFT' ? (
                        <button
                          type="button"
                          onClick={() => onStartRevision(trx)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1F5B45] text-white hover:bg-[#2F6F56] text-[11px] font-heading font-bold shadow-xs cursor-pointer"
                        >
                          <FileEdit size={12} />
                          <span>Revisi</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#8FA39A] italic">Selesai</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
