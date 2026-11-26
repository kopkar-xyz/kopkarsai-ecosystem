import React from 'react';
import { Power, Star } from 'lucide-react';
import type { CatalogProductStatus } from '../../../components/ui/ProductCard';
import { formatCurrencyIDR } from '../../../lib/utils';

interface ProductDetailHeroCardProps {
  name?: string;
  categoryTag?: string;
  badgeStatus?: string;
  partnerSubtitle?: string;
  price?: number;
  stock?: string;
  rating?: string;
  quota?: string;
  productStatus?: CatalogProductStatus;
  isReadOnly?: boolean;
  image?: string;
  onToggleActive?: () => void;
}

export const ProductDetailHeroCard: React.FC<ProductDetailHeroCardProps> = ({
  name = 'Nasi Kotak Ayam Bakar Madu',
  categoryTag = 'Makanan Berat · Buat Sendiri · Pabrik SAI-B · v2.0',
  badgeStatus = 'Disetujui & Aktif',
  partnerSubtitle = 'Mitra: Dapur Oishi Mitra · Halal ID321100184920 · P-IRT 205327501',
  price = 25000,
  stock = '42 porsi',
  rating = '4.9 / 5.0',
  quota = '30 porsi/batch',
  productStatus = 'AKTIF',
  isReadOnly = false,
  image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
  onToggleActive,
}) => {
  const isActive = productStatus === 'AKTIF';
  const isCuration = productStatus === 'KURASI';

  return (
    <div className="bg-white border border-[#EAE4D3] rounded-2xl p-4 sm:p-6 select-none">
      <div className="flex flex-col md:flex-row gap-5 lg:gap-6 items-stretch">
        <div className="relative w-full md:w-[270px] h-[180px] md:h-auto rounded-xl overflow-hidden bg-[#F5F0E2] border border-[#EAE4D3] shrink-0">
          <img
            src={image}
            alt={name}
            className={`w-full h-full md:absolute md:inset-0 object-cover ${
              isActive ? '' : 'opacity-80 grayscale-[20%]'
            }`}
            loading="lazy"
          />
          {!isActive && (
            <span
              className={`absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold shadow-2xs border ${
                isCuration
                  ? 'bg-[#FEF3C7]/95 border-[#F59E0B]/35 text-[#B45309]'
                  : 'bg-[#F1EFEA]/95 border-[#CFC7B4] text-[#526058]'
              }`}
            >
              {isCuration ? 'Proses Kurasi' : 'Nonaktif Sementara'}
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-3.5 min-w-0">
          <div>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[12px] text-[#7A867E]">{categoryTag}</span>
              <span
                className={`px-3 py-1 rounded-full text-[11.5px] font-semibold ${
                  isActive
                    ? 'bg-[#EAF4EE] text-[#165239]'
                    : isCuration
                      ? 'bg-[#FEF3C7] text-[#B45309]'
                      : 'bg-[#F1EFEA] text-[#526058]'
                }`}
              >
                {badgeStatus}
              </span>
            </div>

            <h2 className="font-geist font-semibold text-[22px] sm:text-[26px] tracking-[-0.02em] leading-tight text-[#18221D] mt-1">
              {name}
            </h2>
            <p className="text-[12.5px] text-[#526058] mt-1">{partnerSubtitle}</p>
          </div>

          <div className="rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EAE4D3]">
            <div className="px-4 py-3">
              <span className="text-[11px] text-[#7A867E] block">Harga Etalase</span>
              <span className="text-[15px] font-semibold text-[#165239] block mt-0.5 tabular-nums">
                {formatCurrencyIDR(price)}
              </span>
            </div>
            <div className="px-4 py-3">
              <span className="text-[11px] text-[#7A867E] block">Stok Tersedia</span>
              <span className="text-[15px] font-semibold text-[#18221D] block mt-0.5 tabular-nums">
                {stock}
              </span>
            </div>
            <div className="px-4 py-3">
              <span className="text-[11px] text-[#7A867E] block">Rating Anggota</span>
              <div className="flex items-center gap-1 mt-0.5 text-[#18221D] font-semibold text-[15px] tabular-nums">
                <Star size={13} className="fill-[#18221D] text-[#18221D]" />
                <span>{rating}</span>
              </div>
            </div>
            <div className="px-4 py-3">
              <span className="text-[11px] text-[#7A867E] block">Kuota Dropping</span>
              <span className="text-[15px] font-semibold text-[#18221D] block mt-0.5 tabular-nums">
                {quota}
              </span>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isCuration
                ? 'bg-[#FEF3C7]/45 border-[#F59E0B]/30'
                : 'bg-[#FAF8F2] border-[#EAE4D3]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'bg-[#EAF4EE] text-[#165239]'
                    : isCuration
                      ? 'bg-[#FEF3C7] text-[#B45309]'
                      : 'bg-[#ECEAE3] text-[#526058]'
                }`}
              >
                <Power size={15} />
              </div>
              <div>
                <span className="font-semibold text-[12.5px] text-[#18221D] block">
                  {isCuration
                    ? 'Status Kurasi Awal (Belum Lolos Seleksi)'
                    : isActive
                      ? 'Kendali Etalase: Aktif di Marketplace'
                      : 'Kendali Etalase: Nonaktif Sementara'}
                </span>
                <span className="text-[11.5px] text-[#7A867E] block">
                  {isCuration
                    ? 'Kurasi hanya dilakukan 1x saat pengajuan awal sebelum produk dapat dijual.'
                    : isActive
                      ? 'Produk tampil di etalase belanja karyawan dan kasir toko.'
                      : 'Produk sudah lolos kurasi dan disembunyikan sementara oleh mitra/admin.'}
                </span>
              </div>
            </div>

            {!isReadOnly && !isCuration && (
              <button
                type="button"
                onClick={onToggleActive}
                className="px-3.5 py-1.5 rounded-xl border border-[#EAE4D3] bg-white text-[12px] font-semibold text-[#18221D] hover:bg-[#FAF7EE] transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
              >
                {isActive ? 'Nonaktifkan Produk' : 'Aktifkan Produk'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
