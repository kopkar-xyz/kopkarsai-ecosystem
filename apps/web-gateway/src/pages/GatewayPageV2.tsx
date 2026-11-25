import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { LogIn, UserPlus } from 'lucide-react';
import { BrandLogo } from '../components/brand/BrandLogo';
import { JapaneseBackgroundWaves } from '../components/decorations/JapaneseBackgroundWaves';
import { SakuraPetalsOverlay } from '../components/sakura/SakuraPetalsOverlay';
import { SakuraBranches } from '../components/sakura/SakuraBranches';
import { PromoSliderV2 } from '../components/v2/PromoSliderV2';
import { FeatureCardsV2 } from '../components/v2/FeatureCardsV2';
import { useGatewayRouter } from '../router';

export const GatewayPageV2: React.FC = () => {
  const { navigate } = useGatewayRouter();
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !pageRef.current ||
      (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.v2-anim-header', { y: -16, opacity: 0, duration: 0.45 })
        .from('.v2-anim-slider', { y: 20, scale: 0.98, opacity: 0, duration: 0.55 }, '-=0.25')
        .from('.v2-anim-divider', { scaleX: 0.85, opacity: 0, duration: 0.35 }, '-=0.3')
        .from(
          '.v2-anim-card',
          { y: 24, scale: 0.97, opacity: 0, duration: 0.5, stagger: 0.1 },
          '-=0.2',
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="relative min-h-[100dvh] w-full bg-[#FFF9F9] text-[#1A1615] font-geist flex flex-col overflow-x-hidden selection:bg-[#FADCE2] selection:text-[#83273B]"
    >
      {/* Animated Sakura & Seigaiha Background */}
      <JapaneseBackgroundWaves />
      <SakuraPetalsOverlay />
      <SakuraBranches />

      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-16 pb-20 sm:pb-12 flex-1 flex flex-col justify-center space-y-6">
        {/* Minimalist Top Brand & Auth Bar */}
        <header className="v2-anim-header flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE3D5]/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#83273B] border border-[#BC3455]/40 flex items-center justify-center p-1 shrink-0 shadow-xs">
              <BrandLogo className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold tracking-tight text-[#1A1615]">
                  KOPKAR SAI
                </span>
                <span className="text-[10.5px] font-medium px-2 py-0.5 rounded-md bg-white/90 border border-[#EAE3D5] text-[#665E60]">
                  PT SAI
                </span>
              </div>
              <p className="text-[11.5px] text-[#665E60]">
                Portal Gateway Ekosistem Koperasi &amp; Marketplace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="h-9 px-3.5 rounded-xl bg-white/90 hover:bg-[#FDF0F3] border border-[#EAE3D5] text-[12.5px] font-medium text-[#1A1615] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-[#83273B]" />
              <span>Login SSO</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="h-9 px-4 rounded-xl bg-[#83273B] hover:bg-[#650F26] text-[12.5px] font-semibold text-white inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Registrasi Mandiri</span>
            </button>
          </div>
        </header>

        {/* Minimalist Promo Slidebar */}
        <div className="v2-anim-slider">
          <PromoSliderV2 />
        </div>

        {/* Section Divider */}
        <div className="v2-anim-divider flex items-center gap-3 select-none">
          <div className="flex-1 h-px bg-[#EAE3D5]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#665E60]">
            Pilih Aplikasi
          </span>
          <div className="flex-1 h-px bg-[#EAE3D5]" />
        </div>

        {/* Minimalist 2 Cards Grid */}
        <div className="v2-anim-card">
          <FeatureCardsV2 />
        </div>
      </main>
    </div>
  );
};
