import React from 'react';
import topLeftBranch from '../../assets/top-left-branch.png';
import bottomRightBranch from '../../assets/bottom-righ-branch.png';
import { JapaneseBackgroundWaves } from '../decorations/JapaneseBackgroundWaves';
import { SakuraPetalsOverlay } from '../sakura/SakuraPetalsOverlay';

export const GatewayV3RightDecor: React.FC = () => {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none">
      {/* Kyoto Sakura Halo & Seigaiha Waves */}
      <JapaneseBackgroundWaves />

      {/* Animated Falling & Tumbling Sakura Petals (contained to right panel only) */}
      <SakuraPetalsOverlay contained />

      {/* Fine architectural dot-grid subtle edge texture */}
      <div
        className="absolute inset-0 opacity-[0.26]"
        style={{
          backgroundImage: 'radial-gradient(#D8B4BE 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(circle at 50% 50%, transparent 32%, black 88%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 32%, black 88%)',
        }}
      />

      {/* Swaying Sakura Branches — clearly visible top-left & bottom-right */}
      <img
        src={topLeftBranch}
        alt=""
        className="animate-branch-tl absolute -top-2 -left-2 w-40 sm:w-56 opacity-80 object-contain"
      />
      <img
        src={bottomRightBranch}
        alt=""
        className="animate-branch-br absolute -bottom-3 -right-3 w-48 sm:w-68 opacity-85 object-contain"
      />

      {/* Editorial vertical Kanji accent */}
      <div className="hidden xl:flex flex-col items-center gap-2 absolute right-5 top-1/2 -translate-y-1/2 opacity-40">
        <div className="w-px h-10 bg-[#BC3455]/50" />
        <span className="tategaki font-kanji text-sm text-[#83273B] tracking-[0.25em]">
          協同組合
        </span>
        <div className="w-px h-10 bg-[#BC3455]/50" />
      </div>
    </div>
  );
};
