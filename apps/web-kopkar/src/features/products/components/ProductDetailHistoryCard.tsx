import React from 'react';
import { History, CheckCircle2 } from 'lucide-react';

export interface ProductVersionRecord {
  version: string;
  title: string;
  dateAndAuthor: string;
  description: string;
}

interface ProductDetailHistoryCardProps {
  records?: ProductVersionRecord[];
}

const DEFAULT_RECORDS: ProductVersionRecord[] = [
  {
    version: 'v1.0',
    title: 'Diajukan',
    dateAndAuthor: '10 Okt 2026 · Dapur Oishi Mitra',
    description: 'Pengajuan awal menu makan siang karyawan HPP Rp 20.000.',
  },
  {
    version: 'v2.0',
    title: 'Disetujui & Aktif',
    dateAndAuthor: '13 Okt 2026 · Tim Kurasi Koperasi',
    description: 'Lolos uji rasa dan kebersihan kemasan kraft eco. HPP dikunci resmi.',
  },
];

/**
 * ProductDetailHistoryCard — Riwayat Pengajuan & Revisi Versi Produk
 * Slicing 1:1 Presisi aistudio-src ProductDetailPage: Daftar catatan versi dengan checkmark hijau.
 * Budget: < 200 LOC.
 */
export const ProductDetailHistoryCard: React.FC<ProductDetailHistoryCardProps> = ({
  records = DEFAULT_RECORDS,
}) => {
  return (
    <div className="space-y-4 select-none">
      {/* Header Riwayat */}
      <div className="flex items-center justify-between pb-2 border-b border-[#F0EBDC]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#EAF4EE] text-[#165239] flex items-center justify-center font-bold text-xs">
            <History size={14} />
          </div>
          <h3 className="font-geist font-semibold text-[16px] text-[#18221D]">
            Riwayat Pengajuan &amp; Revisi
          </h3>
        </div>

        <span className="text-[12px] text-[#7A867E]">
          {records.length} catatan versi
        </span>
      </div>

      {/* Daftar Versi */}
      <div className="space-y-3.5">
        {records.map((rec) => (
          <div key={rec.version} className="space-y-1">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#15803D] shrink-0" />
                <span className="font-semibold text-[13px] text-[#18221D]">
                  {rec.version} · {rec.title}
                </span>
              </div>
              <span className="text-[11.5px] text-[#7A867E]">
                {rec.dateAndAuthor}
              </span>
            </div>
            <p className="text-[12.5px] text-[#526058] pl-6 leading-relaxed">
              {rec.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
