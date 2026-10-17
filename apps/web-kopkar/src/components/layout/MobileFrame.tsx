import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-200/80 flex items-center justify-center sm:p-4 md:p-6">
      {/* Smartphone Outer Shell */}
      <div className="w-full max-w-md bg-kopkar-bg min-h-screen sm:min-h-[844px] sm:max-h-[920px] sm:rounded-[42px] shadow-2xl relative overflow-hidden flex flex-col border sm:border-slate-800/10 sm:ring-12 sm:ring-slate-900/5">
        {/* Mobile Status Bar (Simulated Dynamic Island & iOS top bar) */}
        <div className="pt-2.5 px-6 flex items-center justify-between text-xs font-semibold text-slate-800 select-none z-30 bg-kopkar-bg/95 backdrop-blur-xs">
          <span>9:41</span>
          {/* Dynamic Island Pill */}
          <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto -mt-1 hidden sm:block" />
          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal size={13} strokeWidth={2.5} />
            <Wifi size={13} strokeWidth={2.5} />
            <Battery size={15} strokeWidth={2.5} />
          </div>
        </div>

        {/* Inner Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-28 pt-2">
          {children}
        </div>

        {/* Mobile Home Indicator bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 rounded-full pointer-events-none z-40 hidden sm:block" />
      </div>
    </div>
  );
};
