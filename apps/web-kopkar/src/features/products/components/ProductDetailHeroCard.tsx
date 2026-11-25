import React from 'react';
import { Power, Star } from 'lucide-react';
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
  isActive?: boolean;
  image?: string;
  onToggleActive?: () => void;
}

/**
 * ProductDetailHeroCard — Hero Card Detail Produk Mitra
 * Slicing 1:1 Presisi dari aistudio-src ProductDetailPage:
 * - Judul Produk: font-okashi text-[26px] leading-tight text-[#18221D]
 * - Kotak metrik: rounded-xl bg-[#FAF7EE] border border-[#EAE4D3]
 * - Nilai metrik: font-semibold text-[#18221D]
 * - Bar kendali: rounded-xl bg-[#F5F0E2]/60 border border-[#EAE4D3]
 * Budget: < 200 LOC.
 */
export const ProductDetailHeroCard: React.FC<ProductDetailHeroCardProps> = ({
  name = 'Nasi Kotak Ayam Bakar Madu',
  categoryTag = 'Makanan Berat · Buat Sendiri · Pabrik SAI-B · v2.0',
  badgeStatus = 'Disetujui & Aktif',
  partnerSubtitle = 'Mitra: Dapur Oishi Mitra · Halal ID321100184920 · P-IRT 205327501',
  price = 25000,
  stock = '42 porsi',
  rating = '4.9 / 5.0',
  quota = '30 porsi/batch',
  isActive = true,
  image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
  onToggleActive,
}) => {
  return (
    <div className="bg-white border border-[#EAE4D3] rounded-2xl p-4 sm:p-6 select-none">
      {/* 1. Layout 2 Kolom: Foto Kiri Full-Height & Info + Metrik + Kendali Kanan */}
      <div className="flex flex-col md:flex-row gap-5 lg:gap-6 items-stretch">
        {/* Foto Produk — tingginya mengikuti tinggi kolom kanan tanpa mendorong tinggi row */}
        <div className="relative w-full md:w-[270px] h-[180px] md:h-auto rounded-xl overflow-hidden bg-[#F5F0E2] border border-[#EAE4D3] shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full md:absolute md:inset-0 object-cover"
            loading="lazy"
          />
        </div>

        {/* Informasi Produk, Grid Metrik & Kendali Etalase */}
        <div className="flex-1 flex flex-col justify-between space-y-3.5 min-w-0">
          <div>
            {/* Tag Kategori & Badge Status */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[12px] text-[#7A867E]">
                {categoryTag}
              </span>
              <span className="px-3 py-1 rounded-full text-[11.5px] font-semibold bg-[#EAF4EE] text-[#165239]">
                {badgeStatus}
              </span>
            </div>

            {/* Nama Produk */}
            <h2 className="font-geist font-semibold text-[22px] sm:text-[26px] tracking-[-0.02em] leading-tight text-[#18221D] mt-1">
              {name}
            </h2>

            {/* Subtitle Mitra & Izin */}
            <p className="text-[12.5px] text-[#526058] mt-1">
              {partnerSubtitle}
            </p>
          </div>

          {/* 4 Metrik Utama dalam 1 Bar Terpadu */}
          <div className="rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EAE4D3]">
            <div className="px-4 py-3">
              <span className="text-[11px] text-[#7A867E] block">
                Harga Etalase
              </span>
              <span className="text-[15px] font-semibold text-[#165239] block mt-0.5 tabular-nums">
                {formatCurrencyIDR(price)}
              </span>
            </div>

            <div className="px-4 py-3">
              <span className="text-[11px] text-[#7A867E] block">
                Stok Tersedia
              </span>
              <span className="text-[15px] font-semibold text-[#18221D] block mt-0.5 tabular-nums">
                {stock}
              </span>
            </div>

            <div className="px-4 py-3">
              <span className="text-[11px] text-[#7A867E] block">
                Rating Anggota
              </span>
              <div className="flex items-center gap-1 mt-0.5 text-[#18221D] font-semibold text-[15px] tabular-nums">
                <Star size={13} className="fill-[#18221D] text-[#18221D]" />
                <span>{rating}</span>
              </div>
            </div>

            <div className="px-4 py-3">
              <span className="text-[11px] text-[#7A867E] block">
                Kuota Dropping
              </span>
              <span className="text-[15px] font-semibold text-[#18221D] block mt-0.5 tabular-nums">
                {quota}
              </span>
            </div>
          </div>

          {/* 2. Bar Kendali Etalase Mandiri */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
                <Power size={15} />
              </div>
              <div>
                <span className="font-semibold text-[12.5px] text-[#18221D] block">
                  Kendali Etalase Mandiri: {isActive ? 'Aktif di Marketplace' : 'Nonaktif di Marketplace'}
                </span>
                <span className="text-[11.5px] text-[#7A867E] block">
                  {isActive
                    ? 'Produk tampil di etalase belanja karyawan dan kasir toko.'
                    : 'Produk disembunyikan sementara dari etalase belanja karyawan.'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleActive}
              className="px-3.5 py-1.5 rounded-xl border border-[#EAE4D3] bg-white text-[12px] font-semibold text-[#18221D] hover:bg-[#FAF7EE] transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
            >
              {isActive ? 'Nonaktifkan Produk' : 'Aktifkan Produk'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
