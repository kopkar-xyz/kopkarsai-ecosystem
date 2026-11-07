import React, { useRef } from 'react';
import { JapaneseBackgroundWaves } from '../components/decorations/JapaneseBackgroundWaves';
import { SakuraPetalsOverlay } from '../components/sakura/SakuraPetalsOverlay';
import { SakuraBranches } from '../components/sakura/SakuraBranches';
import { GatewayBrandHeader } from '../components/brand/GatewayBrandHeader';
import { PromoBannerSlider } from '../components/landing/PromoBannerSlider';
import { FeatureCardsGrid } from '../components/landing/FeatureCardsGrid';
import { useGatewayIntro } from '../hooks/useGatewayIntro';

export const GatewayPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { isIntroComplete, canSkip, isDebugMode, skipIntro, replayIntro } = useGatewayIntro({
    scopeRef: pageRef,
  });

  return (
    <div
      ref={pageRef}
      className="relative min-h-[100dvh] w-full bg-[#FFF9F9] text-[#1E2923] flex flex-col overflow-x-hidden selection:bg-[#FADCE2] selection:text-[#065C2B]"
    >
      {/* Floating Skip Button (Appears during intro; press Esc or Click) */}
      {canSkip && !isIntroComplete && (
        <button
          onClick={skipIntro}
          aria-label="Lewati animasi intro (Esc)"
          className="fixed top-4 right-4 z-50 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-stone-600 hover:text-[#065C2B] text-xs font-medium tracking-wide shadow-sm border border-pink-200/80 backdrop-blur-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95 animate-fade-in"
        >
          <span>Lewati</span>
          <span className="text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
            Esc
          </span>
        </button>
      )}

      {/* Layer 0: Pure CSS & Inline SVG Background Decorations (Circle Halo + Lower-Left Seigaiha Waves) */}
      <JapaneseBackgroundWaves />

      {/* Layer 1: Dynamically Generated Falling Sakura Petals with 3D Drift & Tumbling (pointer-events: none) */}
      <SakuraPetalsOverlay />

      {/* Layer 2: Swaying Sakura Branches (Top-Left & Bottom-Right PNGs, pointer-events: none) */}
      <SakuraBranches />

      {/* Fixed Top Brand Header: Logo dan Judul Tetap */}
      <header className="fixed top-0 left-0 right-0 z-20 w-full flex items-center justify-center pt-4 sm:pt-6 pb-2 pointer-events-none">
        <div className="pointer-events-auto bg-[#FFF9F9]/85 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none px-4 py-1.5 rounded-full transition-all">
          <GatewayBrandHeader />
        </div>
      </header>

      {/* Layer 10: Interactive Landing Page Content — Banner hingga Card Center secara Vertikal */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100dvh] flex flex-col items-center justify-center py-20 sm:py-24">
        {/* Horizontal Promo Banner Carousel Slider */}
        <PromoBannerSlider />

        {/* Gray Line Divider with APPLICATION || アプリケーション */}
        <div
          id="gateway-section-divider"
          className="w-full max-w-5xl mx-auto my-3 sm:my-4 px-2 sm:px-4 flex items-center select-none"
          aria-label="Application Section Divider"
        >
          <div className="divider-line-left flex-1 h-px bg-stone-300 origin-right" />
          <span className="divider-label px-4 text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-stone-500 uppercase flex items-center gap-2 whitespace-nowrap">
            <span>APPLICATION</span>
            <span className="text-stone-300 font-light">||</span>
            <span className="font-kanji tracking-wider">アプリケーション</span>
          </span>
          <div className="divider-line-right flex-1 h-px bg-stone-300 origin-left" />
        </div>

        {/* Three Feature Cards Grid: Koperasi, Marketplace, and Benefit Anggota */}
        <FeatureCardsGrid />
      </main>

      {/* Developer Debug Replay Trigger (Only active when ?motionDebug=1 is present) */}
      {isDebugMode && (
        <button
          onClick={replayIntro}
          className="fixed bottom-4 right-4 z-50 px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white text-xs backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
          title="Putar ulang animasi intro (Debug Mode: ?motionDebug=1)"
        >
          <span>Putar Ulang</span>
          <span aria-hidden="true">↻</span>
          <span className="text-[10px] text-stone-400 bg-white/10 px-1 py-0.5 rounded">R</span>
        </button>
      )}
    </div>
  );
};
