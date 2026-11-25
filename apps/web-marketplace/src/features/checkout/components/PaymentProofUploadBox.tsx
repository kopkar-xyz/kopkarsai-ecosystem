import React, { useRef } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

interface PaymentProofUploadBoxProps {
  proofImage?: string;
  onUploadProof: (base64Image: string) => void;
}

/**
 * PaymentProofUploadBox — Komponen Unggah Bukti Pembayaran
 * Gaya visual, font, bobot, dan gap selaras dengan OrdersView. Budget: < 200 LOC.
 */
export const PaymentProofUploadBox: React.FC<PaymentProofUploadBoxProps> = ({
  proofImage,
  onUploadProof,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert('Ukuran berkas melebihi batas maksimum 3.0 MB sesuai kebijakan keamanan S3.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onUploadProof(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white border border-[#EAE3D5] rounded-2xl p-5 space-y-3 shadow-2xs">
      <span className="text-xs font-semibold text-[#8C827A] block px-0.5">
        Unggah bukti pembayaran
      </span>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
      />

      {proofImage ? (
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#2E6B4F]/40 bg-[#F4F9F6]">
          <div className="flex items-center gap-3">
            <img
              src={proofImage}
              alt="Bukti Transfer"
              className="w-11 h-11 rounded-xl object-cover border border-[#2E6B4F]/30 bg-white"
            />
            <div>
              <span className="text-xs sm:text-sm font-semibold text-[#2E6B4F] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Bukti Berhasil Dilampirkan
              </span>
              <span className="text-xs text-[#665E60] block mt-0.5">Siap diverifikasi kasir toko</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-semibold text-[#83273B] hover:underline cursor-pointer"
          >
            Ganti
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="py-7 px-4 border-2 border-dashed border-[#EAE3D5] hover:border-[#83273B] rounded-xl bg-white flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer transition-colors"
        >
          <UploadCloud className="w-5 h-5 text-[#8C827A]" />
          <span className="text-xs sm:text-sm font-semibold text-[#1A1615]">
            Pilih foto struk ATM atau tangkapan layar transfer
          </span>
          <span className="text-xs text-[#8C827A]">
            Gambar, maksimal 3 MB
          </span>
        </div>
      )}
    </div>
  );
};
