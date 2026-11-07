import React, { useState, useRef, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gatewayServices, GatewayService } from '../../config/services';
import cooperativePreviewImg from '../../assets/previews/cooperative-preview.jpg';
import marketplacePreviewImg from '../../assets/previews/marketplace-preview.jpg';

type ActivePanelId = 'cooperative' | 'marketplace';

interface PanelConfig {
  service: GatewayService;
  imageSrc: string;
  imageAlt: string;
  bgColor: string;
  borderColor: string;
  titleColor: string;
  textColor: string;
  arrowBtnBg: string;
  arrowBtnText: string;
  arrowBtnHoverBg: string;
  shortDesc: string;
  ctaLabel: string;
}

export const ExpandingGatewayPanels: React.FC = () => {
  // Sistem Koperasi is active by default as mandated
  const [activeId, setActiveId] = useState<ActivePanelId>('cooperative');
  const containerRef = useRef<HTMLDivElement>(null);

  const cooperativeService = gatewayServices.find((s) => s.id === 'cooperative')!;
  const marketplaceService = gatewayServices.find((s) => s.id === 'marketplace')!;

  const panels: Record<ActivePanelId, PanelConfig> = {
    cooperative: {
      service: cooperativeService,
      imageSrc: cooperativePreviewImg,
      imageAlt: 'Pratinjau antarmuka web Sistem Koperasi Karyawan PT SAI',
      bgColor: 'bg-[#F7F9F4]',
      borderColor: 'border-white/80',
      titleColor: 'text-[#043D1D]',
      textColor: 'text-[#1B3828]/80',
      arrowBtnBg: 'bg-[#065C2B]',
      arrowBtnText: 'text-[#F7F9F4]',
      arrowBtnHoverBg: 'group-hover:bg-[#043D1D]',
      shortDesc: 'Kelola layanan koperasi karyawan dalam satu sistem.',
      ctaLabel: 'Buka Sistem Koperasi',
    },
    marketplace: {
      service: marketplaceService,
      imageSrc: marketplacePreviewImg,
      imageAlt: 'Pratinjau antarmuka web Marketplace Belanja Karyawan PT SAI',
      bgColor: 'bg-white',
      borderColor: 'border-white/80',
      titleColor: 'text-[#043D1D]',
      textColor: 'text-[#1B3828]/80',
      arrowBtnBg: 'bg-[#065C2B]',
      arrowBtnText: 'text-white',
      arrowBtnHoverBg: 'group-hover:bg-[#043D1D]',
      shortDesc: 'Temukan produk dan kebutuhan karyawan.',
      ctaLabel: 'Jelajahi Marketplace',
    },
  };

  // Mouse/pointer enter on individual card sets it active
  const handleCardMouseEnter = useCallback((id: ActivePanelId) => {
    setActiveId(id);
  }, []);

  // Mouse leaving the entire container resets smoothly to default (Sistem Koperasi)
  const handleContainerMouseLeave = useCallback(() => {
    setActiveId('cooperative');
  }, []);

  // Keyboard navigation & focus
  const handleCardFocus = useCallback((id: ActivePanelId) => {
    setActiveId(id);
  }, []);

  const handleContainerBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    // If focus moves completely outside the card container, revert to default
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node | null)
    ) {
      setActiveId('cooperative');
    }
  }, []);

  // Navigation action
  const handleNavigate = (e: React.MouseEvent | React.KeyboardEvent, service: GatewayService) => {
    if (service.href) {
      // Allow default navigation if inside <a>, otherwise trigger window.location
      if ((e.target as HTMLElement).tagName !== 'A') {
        window.location.href = service.href;
      }
    } else {
      e.preventDefault();
      alert(`Layanan ${service.title} sedang disiapkan. Tautan URL belum dikonfigurasi di file .env.`);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseLeave={handleContainerMouseLeave}
      onBlur={handleContainerBlur}
      className="w-full max-w-5xl mx-auto"
      role="region"
      aria-label="Pilihan Layanan Digital KOPKARSAI"
    >
      {/* Desktop Layout: Fixed-height row container with horizontal expanding flex panels */}
      {/* Mobile Layout: Stacked panels with vertical expanding flex */}
      <div className="flex flex-col md:flex-row items-stretch gap-4 sm:gap-5 w-full md:h-[370px] lg:h-[390px]">
        {(['cooperative', 'marketplace'] as ActivePanelId[]).map((id) => {
          const config = panels[id];
          const isExpanded = activeId === id;
          const href = config.service.href || '#';

          return (
            <a
              key={id}
              href={href}
              onClick={(e) => handleNavigate(e, config.service)}
              onMouseEnter={() => handleCardMouseEnter(id)}
              onFocus={() => handleCardFocus(id)}
              tabIndex={0}
              role="link"
              aria-label={`${config.service.title}: ${config.shortDesc}`}
              aria-expanded={isExpanded}
              className={`gateway-card-item group relative flex flex-col justify-between rounded-[28px] sm:rounded-3xl border ${config.borderColor} ${config.bgColor} shadow-[0_16px_40px_-12px_rgba(4,61,29,0.25)] select-none text-left no-underline cursor-pointer overflow-hidden outline-none focus-visible:ring-4 focus-visible:ring-[#F6CE2C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#065C2B] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isExpanded
                  ? 'md:flex-[68] h-[300px] sm:h-[320px] md:h-full p-6 sm:p-7 md:p-8'
                  : 'md:flex-[32] h-[100px] sm:h-[110px] md:h-full p-5 sm:p-6 md:p-7'
              }`}
            >
              {/* DESKTOP LAYOUT (md and above) */}
              <div className="hidden md:flex w-full h-full items-stretch justify-between gap-5 lg:gap-7">
                {/* Left Text & Action Column */}
                <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                  {/* Top Header & Description */}
                  <div className="flex flex-col">
                    <h2
                      className={`font-extrabold tracking-tight transition-all duration-300 ${config.titleColor} ${
                        isExpanded ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'
                      }`}
                    >
                      {config.service.title}
                    </h2>

                    {/* Description: smoothly revealed when expanded, hidden cleanly when compact */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isExpanded
                          ? 'opacity-100 max-h-24 mt-2.5 translate-y-0'
                          : 'opacity-0 max-h-0 mt-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-sm ${config.textColor}`}>
                        {config.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Area: CTA text + Circular Arrow Button */}
                  <div className="flex items-center justify-between pt-4 mt-auto">
                    {/* CTA text (visible when expanded) */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'
                      }`}
                    >
                      <span className={`text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap ${config.titleColor}`}>
                        {config.ctaLabel}
                      </span>
                    </div>

                    {/* Circular Arrow Button (Ala Video) */}
                    <div
                      className={`w-11 h-11 lg:w-12 lg:h-12 rounded-full ${config.arrowBtnBg} ${config.arrowBtnText} ${config.arrowBtnHoverBg} flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg ml-auto flex-shrink-0`}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Right Image Preview Pane: Exclusively on Expanded Card */}
                <div
                  className={`relative h-full rounded-2xl overflow-hidden shadow-sm border border-black/5 flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isExpanded
                      ? 'w-[48%] lg:w-[50%] opacity-100 scale-100 pointer-events-auto'
                      : 'w-0 opacity-0 scale-95 pointer-events-none'
                  }`}
                  aria-hidden={!isExpanded}
                >
                  <img
                    src={config.imageSrc}
                    alt={config.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle inner top-edge vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10" />
                </div>
              </div>

              {/* MOBILE LAYOUT (< md) */}
              <div className="flex md:hidden flex-col justify-between h-full w-full">
                {/* Mobile Top Row: Title + Arrow button */}
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h2 className={`font-extrabold text-xl sm:text-2xl ${config.titleColor}`}>
                      {config.service.title}
                    </h2>
                    {isExpanded && (
                      <p className={`text-xs sm:text-sm font-medium mt-1 leading-snug ${config.textColor}`}>
                        {config.shortDesc}
                      </p>
                    )}
                  </div>

                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${config.arrowBtnBg} ${config.arrowBtnText} flex items-center justify-center shadow-sm flex-shrink-0 ml-3`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Mobile Expanded Preview Pane */}
                {isExpanded && (
                  <div className="relative mt-3 w-full flex-1 rounded-xl overflow-hidden shadow-inner border border-black/5 max-h-[160px]">
                    <img
                      src={config.imageSrc}
                      alt={config.imageAlt}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
