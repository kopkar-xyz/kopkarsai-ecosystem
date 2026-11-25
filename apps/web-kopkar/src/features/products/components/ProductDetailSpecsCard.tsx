import React from 'react';
import { Calendar } from 'lucide-react';

interface ProductDetailSpecsCardProps {
  supplySchedule?: string;
  shelfLife?: string;
  productionTimeAndDuration?: string;
  deliveryTimeWindow?: string;
  netWeight?: string;
  sampleDropSchedule?: string;
}

/**
 * ProductDetailSpecsCard — Spesifikasi Teknis & Jadwal Pasokan
 * Slicing 1:1 Presisi aistudio-src ProductDetailPage: 6 Kotak Spesifikasi Grid 2 Kolom.
 * Budget: < 200 LOC.
 */
export const ProductDetailSpecsCard: React.FC<ProductDetailSpecsCardProps> = ({
  supplySchedule = 'Setiap Pagi · Unit SAI-B',
  shelfLife = 'Setiap Akhir Shift',
  productionTimeAndDuration = 'Mulai 04:30 WIB · 1,5 Jam',
  deliveryTimeWindow = '06:00 - 06:45 WIB',
  netWeight = '420 gram',
  sampleDropSchedule = 'Selasa · Shift A - SAI-B',
}) => {
  const specs = [
    { label: 'Jadwal Pasokan Rutin', value: supplySchedule },
    { label: 'Daya Tahan / Kedaluwarsa', value: shelfLife },
    { label: 'Waktu & Lama Produksi', value: productionTimeAndDuration },
    { label: 'Rentang Waktu Kirim', value: deliveryTimeWindow },
    { label: 'Berat Bersih (Netto)', value: netWeight },
    { label: 'Jadwal Drop Sampel Fisik', value: sampleDropSchedule },
  ];

  return (
    <div className="space-y-3.5 select-none">
      {/* Header Spesifikasi */}
      <div className="flex items-center gap-2.5 pb-2 border-b border-[#F0EBDC]">
        <div className="w-7 h-7 rounded-lg bg-[#EAF4EE] text-[#165239] flex items-center justify-center font-bold text-xs">
          <Calendar size={14} />
        </div>
        <h3 className="font-geist font-semibold text-[16px] text-[#18221D]">
          Spesifikasi Teknis &amp; Jadwal Pasokan
        </h3>
      </div>

      {/* Grid 6 Kartu Spesifikasi (3 Kolom x 2 Baris di Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {specs.map((item) => (
          <div
            key={item.label}
            className="bg-[#FAF7EE] rounded-xl p-3 border border-[#EAE4D3]"
          >
            <span className="text-[11px] text-[#7A867E] block">
              {item.label}
            </span>
            <span className="text-[13px] font-semibold text-[#18221D] block mt-0.5">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
