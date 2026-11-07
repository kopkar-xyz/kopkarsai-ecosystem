import React from 'react';
import topLeftBranch from '../../assets/top-left-branch.png';
import bottomRightBranch from '../../assets/bottom-righ-branch.png';

export const SakuraBranches: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-[3]"
      aria-hidden="true"
    >
      {/* Top-Left Sakura Branch with gentle breeze sway */}
      <div id="branch-tl-entrance" className="absolute top-0 left-0 select-none pointer-events-none origin-top-left">
        <div className="animate-branch-tl">
          <img
            src={topLeftBranch}
            alt=""
            className="w-56 sm:w-80 md:w-[480px] lg:w-[560px] h-auto object-contain max-w-none opacity-90 drop-shadow-[0_4px_15px_rgba(237,118,145,0.15)]"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Bottom-Right Sakura Blossom Cluster with gentle breeze sway (firmly anchored & attached to the right wall) */}
      <div id="branch-br-entrance" className="absolute bottom-0 -right-8 sm:-right-10 md:-right-12 lg:-right-14 select-none pointer-events-none origin-bottom-right">
        <div className="animate-branch-br">
          <img
            src={bottomRightBranch}
            alt=""
            className="w-48 sm:w-72 md:w-[440px] lg:w-[500px] h-auto object-contain max-w-none opacity-90 drop-shadow-[0_-4px_15px_rgba(237,118,145,0.15)]"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};
