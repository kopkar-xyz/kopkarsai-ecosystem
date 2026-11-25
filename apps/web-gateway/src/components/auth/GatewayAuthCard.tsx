import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';
import { useDesignVersion } from '../../context/DesignVersionContext';
import { useGatewayRouter } from '../../router';

interface GatewayAuthCardProps {
  title: string;
  subtitle: string;
  maxWidthClass?: string;
  centeredHeader?: boolean;
  children: React.ReactNode;
}

export const GatewayAuthCard: React.FC<GatewayAuthCardProps> = ({
  title,
  subtitle,
  maxWidthClass = 'max-w-md',
  centeredHeader = false,
  children,
}) => {
  const { navigate } = useGatewayRouter();
  const { version } = useDesignVersion();
  const isV2 = version === 'v2';
  const isV3 = version === 'v3';

  return (
    <div className={`w-full ${maxWidthClass} mx-auto space-y-4`}>
      <button
        type="button"
        onClick={() => navigate('/')}
        className={`inline-flex items-center gap-2 text-xs font-semibold rounded-full px-3.5 py-1.5 cursor-pointer transition-colors border ${
          isV3
            ? 'bg-white hover:bg-[#F3F4F6] border-[#E5E7EB] text-[#111814]'
            : isV2
            ? 'bg-white/90 hover:bg-[#FDF0F3] border-[#EAE3D5] text-[#1A1615]'
            : 'bg-white/85 backdrop-blur-sm border-pink-100 text-[#065C2B] hover:text-[#043D1D] shadow-sm'
        }`}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Portal Gateway</span>
      </button>

      <div
        className={`p-6 sm:p-7 space-y-5 border ${
          isV3
            ? 'bg-white border-[#E5E7EB] rounded-2xl shadow-[0_10px_30px_-10px_rgba(17,24,20,0.08)]'
            : isV2
            ? 'bg-white/95 backdrop-blur-md border-[#EAE3D5] rounded-2xl shadow-[0_8px_28px_-8px_rgba(131,39,59,0.12)]'
            : 'bg-white/95 backdrop-blur-md border-pink-100/90 rounded-3xl shadow-[0_18px_45px_-12px_rgba(6,92,43,0.16)]'
        }`}
      >
        <div
          className={
            centeredHeader
              ? 'text-center space-y-2'
              : `flex items-center gap-3 pb-3 border-b ${
                  isV3 ? 'border-[#E5E7EB]' : isV2 ? 'border-[#F3EDE0]' : 'border-pink-100'
                }`
          }
        >
          <div
            className={`w-10 h-10 shrink-0 ${centeredHeader ? 'mx-auto w-11 h-11' : ''} ${
              isV2 ? 'rounded-xl bg-[#83273B] p-1.5' : ''
            }`}
          >
            <BrandLogo className="w-full h-full" />
          </div>
          <div>
            <h1
              className={`leading-tight ${
                isV3
                  ? 'font-geist text-xl sm:text-[22px] font-semibold tracking-tight text-[#111814]'
                  : isV2
                  ? 'font-geist text-xl sm:text-[22px] font-semibold tracking-tight text-[#18221D]'
                  : 'font-heading text-xl sm:text-2xl text-[#0B4A25]'
              }`}
            >
              {title}
            </h1>
            <p className={`text-xs mt-0.5 ${isV3 ? 'text-[#6B7280]' : isV2 ? 'text-[#526058]' : 'text-[#4A5D52]'}`}>
              {subtitle}
            </p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
