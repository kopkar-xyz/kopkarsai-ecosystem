import React from 'react';
import { Upload } from 'lucide-react';
import { useDesignVersion } from '../../context/DesignVersionContext';

interface RegisterKtpAndTermsProps {
  ktpFileName: string | null;
  fileError: string;
  agreed: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAgreedChange: (agreed: boolean) => void;
}

export const RegisterKtpAndTerms: React.FC<RegisterKtpAndTermsProps> = ({
  ktpFileName,
  fileError,
  agreed,
  onFileChange,
  onAgreedChange,
}) => {
  const { version } = useDesignVersion();
  const isV2 = version === 'v2';

  return (
    <>
      <div>
        <label className="block text-xs font-semibold text-[#18221D] mb-1.5">
          Foto KTP / Kartu Identitas Pegawai (Maks. 3 MB){' '}
          <span className="text-[#BD3A53]">*</span>
        </label>
        <div
          className={`border border-dashed rounded-xl p-3.5 text-center transition-colors ${
            isV2
              ? 'border-[#F7BAC7] hover:border-[#83273B] bg-[#FFF9FA] hover:bg-[#FDF0F3]/60'
              : 'border-pink-200 hover:border-[#065C2B] bg-[#FFF9FA] hover:bg-[#EEF7F1]/50'
          }`}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            id="gateway-ktp-upload"
            onChange={onFileChange}
          />
          <label htmlFor="gateway-ktp-upload" className="cursor-pointer block text-xs">
            <Upload className={`w-4 h-4 mx-auto mb-1 ${isV2 ? 'text-[#83273B]' : 'text-[#065C2B]'}`} />
            <span className="font-semibold text-[#18221D] block">
              {ktpFileName || 'Pilih foto KTP / ID Card'}
            </span>
            <span className="text-[11px] text-[#526058]">
              JPEG/PNG/WebP · Disimpan di S3 bucket privat
            </span>
          </label>
        </div>
        {fileError && <p className="text-[11px] text-[#B3261E] mt-1">{fileError}</p>}
      </div>

      <div
        className={`p-3.5 rounded-xl border text-xs ${
          isV2 ? 'bg-[#FAF6F0] border-[#EAE3D5]' : 'bg-[#EEF7F1] border-emerald-200/80'
        }`}
      >
        <span className={`font-semibold block mb-1.5 ${isV2 ? 'text-[#83273B]' : 'text-[#065C2B]'}`}>
          Ketentuan Simpanan Anggota:
        </span>
        <div className="grid grid-cols-2 gap-2">
          <div className={`p-2 bg-white rounded-lg border ${isV2 ? 'border-[#EAE3D5]' : 'border-emerald-100'}`}>
            <span className="text-[#665E60] block text-[11px]">Pokok (1× Bayar)</span>
            <strong className={`text-xs ${isV2 ? 'text-[#83273B]' : 'text-[#065C2B]'}`}>Rp 100.000</strong>
          </div>
          <div className={`p-2 bg-white rounded-lg border ${isV2 ? 'border-[#EAE3D5]' : 'border-emerald-100'}`}>
            <span className="text-[#665E60] block text-[11px]">Wajib (Payroll/Bln)</span>
            <strong className={`text-xs ${isV2 ? 'text-[#83273B]' : 'text-[#065C2B]'}`}>Rp 50.000</strong>
          </div>
        </div>
      </div>

      <label className="flex items-start gap-2 cursor-pointer text-xs text-[#4A5D52]">
        <input
          type="checkbox"
          required
          checked={agreed}
          onChange={(e) => onAgreedChange(e.target.checked)}
          className="mt-0.5 rounded border-stone-300 text-[#065C2B] focus:ring-[#065C2B]"
        />
        <span>
          Saya menyetujui AD/ART Koperasi PT SAI &amp; bersedia diverifikasi Dual-Approval
          (KK-DEC-001).
        </span>
      </label>
    </>
  );
};
