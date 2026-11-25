import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Clock, Home, Store } from 'lucide-react';
import { BrandLogo } from '../components/brand/BrandLogo';
import { gatewayServices } from '../config/services';
import { GatewayV3Slider } from '../components/v3/GatewayV3Slider';
import { GatewayV3RightDecor } from '../components/v3/GatewayV3RightDecor';
import { useGatewayRouter } from '../router';

export const GatewayPageV3: React.FC = () => {
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
      tl.fromTo(
        '.v3-anim-left',
        { x: -24, scale: 0.98, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.6, clearProps: 'transform,opacity' },
      )
        .fromTo(
          '.v3-anim-right',
          { opacity: 0 },
          { opacity: 1, duration: 0.45, clearProps: 'opacity' },
          '-=0.45',
        )
        .fromTo(
          '.v3-anim-header',
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, clearProps: 'transform,opacity' },
          '-=0.3',
        )
        .fromTo(
          '.v3-anim-card',
          { y: 20, scale: 0.96, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.5, clearProps: 'transform,opacity' },
          '-=0.25',
        )
        .fromTo(
          '.v3-anim-btn',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.08, clearProps: 'transform,opacity' },
          '-=0.3',
        )
        .fromTo(
          '.v3-anim-footer',
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, clearProps: 'transform,opacity' },
          '-=0.2',
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const kopkarHref =
    gatewayServices.find((s) => s.id === 'cooperative')?.href || 'http://localhost:5173';
  const marketplaceHref =
    gatewayServices.find((s) => s.id === 'marketplace')?.href || 'http://localhost:5174';

  return (
    <div
      ref={pageRef}
      className="h-[100dvh] lg:h-auto lg:min-h-[100dvh] w-full bg-white text-[#111814] font-geist p-2.5 sm:p-4 overflow-hidden lg:overflow-visible"
    >
      <div className="h-full lg:h-auto w-full max-w-[1440px] mx-auto grid grid-cols-1 grid-rows-[minmax(0,7fr)_minmax(0,3fr)] lg:grid-rows-1 lg:grid-cols-2 gap-2.5 sm:gap-4 lg:gap-5 items-stretch">
        {/* Left (Desktop) / Bottom 20% (Mobile): Dark Editorial Slider */}
        <div className="v3-anim-left order-2 lg:order-1 h-full min-h-0">
          <GatewayV3Slider />
        </div>

        {/* Right (Desktop) / Top 80% (Mobile): Textured Minimalist Portal Panel */}
        <div className="v3-anim-right order-1 lg:order-2 relative flex flex-col justify-between h-full min-h-0 lg:min-h-[calc(100dvh-2rem)] px-4 sm:px-8 lg:px-12 py-3.5 sm:py-6 overflow-hidden rounded-2xl sm:rounded-[20px] bg-[#FFF9F9] border border-[#FCE4E9]">
          <GatewayV3RightDecor />

          {/* Top Bar */}
          <header className="v3-anim-header relative z-10 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-7 sm:h-7 shrink-0">
                <BrandLogo className="w-full h-full" />
              </div>
              <span className="text-[11.5px] sm:text-[13px] font-bold tracking-[0.08em] text-[#111814] uppercase">
                KOPKAR SAI
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs sm:pr-36 lg:pr-44">
              <span className="text-[#6B7280]">Butuh bantuan?</span>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-semibold text-[#111814] underline underline-offset-4 hover:text-[#B45309] cursor-pointer"
              >
                Hubungi Pengurus
              </button>
            </div>
          </header>

          {/* Center Portal Selection Card */}
          <div className="v3-anim-card relative z-10 w-full max-w-[380px] mx-auto my-auto py-2 sm:py-6">
            <div className="rounded-2xl sm:rounded-3xl bg-white/92 backdrop-blur-md border border-[#EAE5D8] p-5 sm:p-7 shadow-[0_18px_42px_-14px_rgba(17,24,20,0.08)] text-center space-y-4 sm:space-y-6">
              <div className="space-y-1.5 sm:space-y-2">
                <h1 className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.02em] text-[#111814]">
                  Pilih Layanan Portal
                </h1>
                <p className="text-[12.5px] sm:text-[13px] text-[#6B7280] leading-relaxed">
                  Masuk ke layanan Koperasi atau Marketplace KOPKAR SAI.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-2.5">
                <a
                  href={kopkarHref}
                  className="v3-anim-btn w-full h-10 sm:h-11 rounded-xl bg-[#F5C02E] hover:bg-[#E5AE19] text-[#111814] text-[13px] font-semibold inline-flex items-center justify-center gap-2 shadow-[0_6px_18px_-4px_rgba(245,192,46,0.45)] transition-colors cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Buka Web Koperasi</span>
                </a>

                <a
                  href={marketplaceHref}
                  className="v3-anim-btn w-full h-10 sm:h-11 rounded-xl bg-[#F5C02E] hover:bg-[#E5AE19] text-[#111814] text-[13px] font-semibold inline-flex items-center justify-center gap-2 shadow-[0_6px_18px_-4px_rgba(245,192,46,0.45)] transition-colors cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  <span>Buka Web Marketplace</span>
                </a>

                <button
                  type="button"
                  disabled
                  className="v3-anim-btn w-full h-10 sm:h-11 rounded-xl bg-[#F4F4F3] border border-[#E5E7EB] text-[#9CA3AF] text-[13px] font-medium inline-flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <Clock className="w-4 h-4" />
                  <span>Coming Soon</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 text-[11px] sm:text-[12px] text-[#6B7280] pt-0.5 sm:pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="hover:text-[#111814] font-medium cursor-pointer transition-colors"
                >
                  Login SSO
                </button>
                <span className="text-[#D1D5DB]">•</span>
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="hover:text-[#111814] font-medium cursor-pointer transition-colors"
                >
                  Registrasi Mandiri
                </button>
              </div>
            </div>
          </div>

          {/* Minimal Footer */}
          <footer className="v3-anim-footer relative z-10 flex items-center justify-between gap-3 text-[11.5px] text-[#6B7280] pt-2">
            <span>© 2026 KOPKAR SAI</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="hover:text-[#111814] cursor-pointer transition-colors"
              >
                Panduan Anggota
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="hover:text-[#111814] cursor-pointer transition-colors"
              >
                Kontak Pengurus
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
