import React from 'react';
import { Store, MapPin, Sparkles } from 'lucide-react';
import { DeliveryMethod } from '../../../types/order';

interface DeliveryStepPanelProps {
  customerName: string;
  customerNik: string;
  department: string;
  deliveryMethod: DeliveryMethod;
  onChangeDeliveryMethod: (method: DeliveryMethod) => void;
  deskLocation: string;
  onChangeDeskLocation: (loc: string) => void;
  isGaRole: boolean;
  isGaPriority: boolean;
  onToggleGaPriority: (val: boolean) => void;
}

/**
 * DeliveryStepPanel — Langkah 1: Identitas Pemesan & Metode Pengambilan
 * Slicing 1:1 sesuai media_1795491886237_bf417914.png (2 row / 2 kolom side-by-side).
 * Budget: < 200 LOC.
 */
export const DeliveryStepPanel: React.FC<DeliveryStepPanelProps> = ({
  customerName,
  customerNik,
  department,
  deliveryMethod,
  onChangeDeliveryMethod,
  deskLocation,
  onChangeDeskLocation,
  isGaRole,
  isGaPriority,
  onToggleGaPriority,
}) => {
  return (
    <div className="space-y-4 select-none">
      {/* 1. Pemesan Card */}
      <div className="bg-white border border-[#EAE3D5] rounded-2xl p-5 space-y-2.5 shadow-2xs">
        <h2 className="text-xs font-semibold text-[#8C827A] px-0.5">
          Pemesan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-0.5 text-xs">
          <div>
            <span className="text-[11px] text-[#8C827A] block mb-0.5">Nama</span>
            <span className="font-semibold text-xs sm:text-sm text-[#1A1615] block">
              {customerName}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[#8C827A] block mb-0.5">NIK</span>
            <span className="font-semibold text-xs sm:text-sm text-[#1A1615] block font-mono">
              {customerNik}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[#8C827A] block mb-0.5">Departemen</span>
            <span className="font-semibold text-xs sm:text-sm text-[#1A1615] block">
              {department}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Metode Pengambilan Card (2 Kolom sesuai Gambar media_1795491886237_bf417914.png) */}
      <div className="bg-white border border-[#EAE3D5] rounded-2xl p-5 space-y-3.5 shadow-2xs">
        <h2 className="text-xs font-semibold text-[#8C827A] px-0.5">
          Metode pengambilan
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Opsi 1: Ambil Mandiri */}
          <div
            onClick={() => onChangeDeliveryMethod('PICKUP_KANTIN')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              deliveryMethod === 'PICKUP_KANTIN'
                ? 'border-[#83273B] bg-[#FFF8FA] shadow-2xs'
                : 'border-[#EAE3D5] bg-[#FAF6F0]/60 hover:bg-white'
            }`}
          >
            <Store
              className={`w-5 h-5 mb-2.5 ${
                deliveryMethod === 'PICKUP_KANTIN' ? 'text-[#83273B]' : 'text-[#1A1615]'
              }`}
            />
            <span
              className={`text-xs sm:text-sm font-bold block ${
                deliveryMethod === 'PICKUP_KANTIN' ? 'text-[#83273B]' : 'text-[#1A1615]'
              }`}
            >
              Ambil Mandiri
            </span>
            <span className="text-xs text-[#665E60] block mt-0.5">
              Counter Kantin Lt. 2
            </span>
          </div>

          {/* Opsi 2: Antar ke Meja */}
          <div
            onClick={() => onChangeDeliveryMethod('MEJA_KERJA')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              deliveryMethod === 'MEJA_KERJA'
                ? 'border-[#83273B] bg-[#FFF8FA] shadow-2xs'
                : 'border-[#EAE3D5] bg-[#FAF6F0]/60 hover:bg-white'
            }`}
          >
            <MapPin
              className={`w-5 h-5 mb-2.5 ${
                deliveryMethod === 'MEJA_KERJA' ? 'text-[#83273B]' : 'text-[#1A1615]'
              }`}
            />
            <span
              className={`text-xs sm:text-sm font-bold block ${
                deliveryMethod === 'MEJA_KERJA' ? 'text-[#83273B]' : 'text-[#1A1615]'
              }`}
            >
              Antar ke Meja
            </span>
            <span className="text-xs text-[#665E60] block mt-0.5">
              Ruang Kerja PT SAI
            </span>
          </div>
        </div>

        {/* Input detail jika pilih titip antar */}
        {deliveryMethod === 'MEJA_KERJA' && (
          <div className="pt-2 animate-fadeIn space-y-1">
            <label className="text-[11px] text-[#665E60] font-medium block">
              Catatan Lokasi Meja Kerja / Pos Sekuriti
            </label>
            <input
              type="text"
              value={deskLocation}
              onChange={(e) => onChangeDeskLocation(e.target.value)}
              placeholder="Contoh: Gedung A • Lantai 2 • Meja QA #14 atau Pos Sekuriti Gerbang Barat"
              className="w-full h-10 px-3.5 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] placeholder:text-[#8C827A] focus:outline-none focus:border-[#83273B] shadow-2xs transition-colors"
            />
          </div>
        )}

        {/* Option Prioritas GA (hanya muncul bila role GA) */}
        {isGaRole && (
          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FEF6DC] border border-[#E5A812]/50 text-xs cursor-pointer animate-fadeIn mt-2">
            <input
              type="checkbox"
              checked={isGaPriority}
              onChange={(e) => onToggleGaPriority(e.target.checked)}
              className="rounded accent-[#83273B] w-4 h-4 cursor-pointer"
            />
            <span className="font-semibold text-[#3A2A00] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A812]" /> Prioritas General Affairs (Pesanan Rapat Direksi / Kantor)
            </span>
          </label>
        )}
      </div>
    </div>
  );
};
