import React from 'react';
import { JapaneseBackgroundWaves } from '../decorations/JapaneseBackgroundWaves';
import { SakuraPetalsOverlay } from '../sakura/SakuraPetalsOverlay';
import { SakuraBranches } from '../sakura/SakuraBranches';
import { useDesignVersion } from '../../context/DesignVersionContext';

interface GatewayShellProps {
  children: React.ReactNode;
}

export const GatewayShell: React.FC<GatewayShellProps> = ({ children }) => {
  const { version } = useDesignVersion();
  const isV2 = version === 'v2';
  const isV3 = version === 'v3';

  if (isV3) {
    return (
      <div className="min-h-[100dvh] w-full bg-white text-[#111814] font-geist flex flex-col overflow-x-hidden selection:bg-[#F5C02E]/30 selection:text-[#111814]">
        <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100dvh] flex flex-col items-center justify-center pt-8 pb-20 sm:py-14">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-[100dvh] w-full bg-[#FFF9F9] flex flex-col overflow-x-hidden ${
        isV2
          ? 'text-[#1A1615] font-geist selection:bg-[#FADCE2] selection:text-[#83273B]'
          : 'text-[#1E2923] selection:bg-[#FADCE2] selection:text-[#065C2B]'
      }`}
    >
      <JapaneseBackgroundWaves />
      <SakuraPetalsOverlay />
      <SakuraBranches />
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100dvh] flex flex-col items-center justify-center pt-8 pb-20 sm:py-14">
        {children}
      </main>
    </div>
  );
};
