import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useGatewayRouter } from '../../router';
import { useDesignVersion } from '../../context/DesignVersionContext';

interface RegisterSuccessCardProps {
  nik: string;
  fullName: string;
}

export const RegisterSuccessCard: React.FC<RegisterSuccessCardProps> = ({
  nik,
  fullName,
}) => {
  const { navigate } = useGatewayRouter();
  const { version } = useDesignVersion();
  const isV2 = version === 'v2';

  return (
    <div
      className={`p-7 text-center space-y-4 border ${
        isV2
          ? 'bg-white border-[#EAE4D3] rounded-2xl'
          : 'bg-white/95 backdrop-blur-md border-pink-100/90 rounded-3xl shadow-[0_18px_45px_-12px_rgba(6,92,43,0.16)]'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
          isV2 ? 'bg-[#FDF0F3] text-[#83273B]' : 'bg-[#EAF4EE] text-[#165239]'
        }`}
      >
        <CheckCircle2 className="w-7 h-7" />
      </div>
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] text-xs font-semibold">
        STATUS: PENDING_ADMIN_VERIFICATION
      </span>
      <h1
        className={
          isV2
            ? 'font-geist text-xl font-semibold text-[#1A1615]'
            : 'font-heading text-2xl text-[#0B4A25]'
        }
      >
        Pendaftaran Terkirim!
      </h1>
      <p className="text-xs sm:text-sm text-[#665E60] max-w-md mx-auto leading-relaxed">
        Berkas NIK <strong>{nik}</strong> ({fullName}) sedang diverifikasi Admin Toko &amp;
        Kepala Koperasi sesuai alur Dual-Approval (KK-DEC-001).
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="h-9 px-4 rounded-xl border border-[#EAE3D5] bg-white hover:bg-[#FAF6F0] text-xs font-semibold text-[#1A1615] cursor-pointer"
        >
          Ke Portal Gateway
        </button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className={`h-9 px-4 rounded-xl text-white text-xs font-semibold cursor-pointer ${
            isV2 ? 'bg-[#83273B] hover:bg-[#650F26]' : 'bg-[#065C2B] hover:bg-[#043D1D]'
          }`}
        >
          Menuju Login SSO
        </button>
      </div>
    </div>
  );
};
