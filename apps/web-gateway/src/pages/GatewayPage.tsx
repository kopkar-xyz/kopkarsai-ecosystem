import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, FastForward, Play, Pause } from 'lucide-react';
import { BrandLogo } from '../components/brand/BrandLogo';
import { BrandWordmark } from '../components/brand/BrandWordmark';
import { ExpandingGatewayPanels } from '../components/gateway/ExpandingGatewayPanels';
import { useGatewayIntro } from '../hooks/useGatewayIntro';

export const GatewayPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayingDebug, setIsPlayingDebug] = useState<boolean>(false);

  const {
    isIntroComplete,
    canSkip,
    isDebugMode,
    skipIntro,
    replayIntro,
    seekToCheckpoint,
  } = useGatewayIntro({
    scopeRef: containerRef,
  });

  // Listen for Escape key to skip intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && canSkip && !isIntroComplete) {
        skipIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canSkip, isIntroComplete, skipIntro]);

  const debugCheckpoints = [
    { label: 'green-screen', name: 'Canvas (0s)' },
    { label: 'clockwise-reveal', name: 'Petal Reveal (0.15s)' },
    { label: 'logo-complete-hold', name: 'Emblem Hold (1.18s)' },
    { label: 'vertical-lift', name: 'Vertical Lift (1.33s)' },
    { label: 'wordmark-reveal', name: 'Wordmark (1.58s)' },
    { label: 'cards-reveal', name: 'Cards Reveal (1.88s)' },
    { label: 'bottom-copy-reveal', name: 'Bottom Copy (2.18s)' },
    { label: 'final-state', name: 'Final State (2.65s)' },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[100dvh] w-full bg-[#065C2B] text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#F6CE2C] selection:text-[#065C2B] ${
        !isIntroComplete ? 'intro-pending' : ''
      }`}
    >
      {/* Background ambient lighting — subtle and organic, strictly non-sci-fi */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(9,72,36,0.85) 0%, rgba(6,92,43,0.4) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Developer Motion Debug Bar (Active only when ?motionDebug=1 is present in URL) */}
      {isDebugMode && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-1.5 p-2 rounded-2xl bg-black/85 backdrop-blur-md border border-white/20 text-xs text-white shadow-2xl">
          <span className="font-bold text-[#F6CE2C] px-2 py-0.5 rounded bg-white/10 uppercase tracking-wider text-[10px]">
            Motion Debug
          </span>
          <button
            onClick={() => {
              replayIntro();
              setIsPlayingDebug(!isPlayingDebug);
            }}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Replay"
          >
            {isPlayingDebug ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <div className="h-4 w-px bg-white/20 mx-1" />
          {debugCheckpoints.map((cp) => (
            <button
              key={cp.label}
              onClick={() => seekToCheckpoint(cp.label)}
              className="px-2 py-1 rounded-lg text-[11px] font-medium text-white/80 hover:text-white hover:bg-white/15 transition-colors"
            >
              {cp.name}
            </button>
          ))}
        </div>
      )}

      {/* Skip Intro Floating Control — Isolated persistent container, strictly zero reflow on unmount */}
      <div
        className={`fixed top-4 right-4 sm:top-5 sm:right-5 z-50 transition-all duration-300 pointer-events-none ${
          canSkip && !isIntroComplete && !isDebugMode
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-1'
        }`}
        aria-hidden={!canSkip || isIntroComplete}
      >
        <button
          onClick={skipIntro}
          tabIndex={canSkip && !isIntroComplete && !isDebugMode ? 0 : -1}
          aria-label="Lewati animasi intro"
          className="pointer-events-auto inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs font-medium text-white/90 hover:text-white hover:bg-black/60 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6CE2C]"
        >
          <span>Lewati</span>
          <FastForward className="w-3.5 h-3.5" />
          <kbd className="hidden sm:inline-block ml-1 px-1 rounded bg-white/10 text-[10px] text-white/60">
            Esc
          </kbd>
        </button>
      </div>

      {/* Main Single-Canvas Viewport Container */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1 flex flex-col justify-between items-center min-h-[100dvh]">
        {/* Centered Content Block: Vertically centered from Logo down to Bottom Copy */}
        <div className="w-full my-auto flex flex-col items-center justify-center py-2 sm:py-4">
          {/* Brand Header */}
          <header
            id="brand-stage"
            className="w-full flex flex-col items-center text-center mb-3 sm:mb-4"
          >
            {/* Emblem wrapper: ONLY moves vertically (Y-axis) during lift */}
            <div id="emblem-wrapper" className="relative mb-2">
              <BrandLogo size={125} className="sm:scale-105" />
            </div>

            {/* Masked Wordmark: revealed directly below emblem */}
            <div className="relative overflow-hidden py-0.5">
              <BrandWordmark size="md" />
            </div>
          </header>

          {/* Stable Cards Region: Video-Accurate Expanding Panels */}
          <section
            id="cards-stage"
            aria-label="Pilihan Layanan Digital KOPKARSAI"
            className="w-full max-w-5xl mt-2 sm:mt-3 mb-2"
          >
            <ExpandingGatewayPanels />

            {/* Single copy text strictly below both cards */}
            <div id="gateway-bottom-copy" className="w-full mt-4 sm:mt-5 text-center px-4">
              <p className="text-xs sm:text-sm text-[#BEDACC]/90 font-medium tracking-wide leading-relaxed max-w-xl mx-auto">
                Akses layanan sistem koperasi dan marketplace karyawan melalui satu gerbang digital.
              </p>
            </div>
          </section>
        </div>

        {/* Gateway Footer Meta & Replay Trigger: Pinned cleanly at the bottom */}
        <footer
          id="gateway-footer-meta"
          className="w-full pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between text-xs text-[#BEDACC]/70 space-y-3 sm:space-y-0 border-t border-white/10"
        >
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6CE2C]" />
            <span className="text-[11px] text-[#BEDACC]/80">
              © Koperasi Karyawan PT SAI
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={replayIntro}
              tabIndex={isIntroComplete ? 0 : -1}
              className={`inline-flex items-center space-x-1.5 text-xs text-[#BEDACC] hover:text-[#F6CE2C] transition-all duration-300 py-1 px-2.5 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6CE2C] ${
                isIntroComplete
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
              title="Putar ulang animasi pembuka"
              aria-hidden={!isIntroComplete}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Putar Ulang Intro</span>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};
