import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, Tag, ShoppingCart, Gift, Truck } from 'lucide-react';
import bannerPavilion from '../../assets/illustrations/banner-pavilion.jpg';

interface PromoSlide {
  id: number;
  badge: string;
  discount: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitleAccent: string;
  subtitleText: string;
  tags: { icon: 'cart' | 'gift' | 'truck'; label: string }[];
  image: string;
}

const SLIDES: PromoSlide[] = [
  {
    id: 1,
    badge: 'Promo Anggota',
    discount: '13%',
    titlePrefix: 'Diskon hingga ',
    titleHighlight: '13%',
    subtitleAccent: 'Belanja Hemat',
    subtitleText: ' khusus Anggota KOPKARSAI',
    tags: [
      { icon: 'cart', label: 'Diskon Marketplace' },
      { icon: 'gift', label: 'Promo Produk Pilihan' },
      { icon: 'truck', label: 'Gratis Ongkir*' },
    ],
    image: bannerPavilion,
  },
  {
    id: 2,
    badge: 'Katering H-1',
    discount: 'PO H-1',
    titlePrefix: 'Pesan Khusus ',
    titleHighlight: 'Katering',
    subtitleAccent: 'Menu Fresh H-1',
    subtitleText: ' langsung dari Supplier UMKM',
    tags: [
      { icon: 'gift', label: 'Kemitraan UMKM' },
      { icon: 'cart', label: 'Same-Day Ready' },
      { icon: 'truck', label: 'Antrean Prioritas GA' },
    ],
    image: bannerPavilion,
  },
  {
    id: 3,
    badge: 'Simpan Pinjam',
    discount: '0.8%',
    titlePrefix: 'Bunga Ringan ',
    titleHighlight: '0.8%',
    subtitleAccent: 'Simpanan Sukarela',
    subtitleText: ' & Fasilitas Pinjaman Digital',
    tags: [
      { icon: 'gift', label: 'Dual-Approval' },
      { icon: 'cart', label: 'Kalkulator Angsuran' },
      { icon: 'truck', label: 'SHU Transparan' },
    ],
    image: bannerPavilion,
  },
];

export const PromoBannerSlider: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Animation Element Refs
  const textColumnRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sparkleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Chevron Arrow Refs for recoil micro-interactions
  const leftArrowRef = useRef<SVGSVGElement>(null);
  const rightArrowRef = useRef<SVGSVGElement>(null);

  // Animation State Refs
  const directionRef = useRef<1 | -1>(1);
  const isAnimatingRef = useRef<boolean>(false);
  const isFirstRenderRef = useRef<boolean>(true);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const activeSlide = SLIDES[currentSlideIndex];

  // Trigger enter animation whenever currentSlideIndex changes
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const dir = directionRef.current;
    const enterDistance = dir === 1 ? 32 : -32;
    const imgEnterDistance = dir === 1 ? 48 : -48;
    const tagElements = tagsContainerRef.current ? tagsContainerRef.current.children : [];

    // Set initial enter states
    if (textColumnRef.current) gsap.set(textColumnRef.current, { x: enterDistance, opacity: 0 });
    if (badgeRef.current) gsap.set(badgeRef.current, { y: -10, scale: 0.9, opacity: 0 });
    if (titleRef.current) gsap.set(titleRef.current, { x: enterDistance * 0.7, opacity: 0 });
    if (sparkleRef.current) gsap.set(sparkleRef.current, { scale: 0.3, rotation: -90, opacity: 0 });
    if (subtitleRef.current) gsap.set(subtitleRef.current, { x: enterDistance * 0.5, opacity: 0 });
    if (tagElements.length > 0) gsap.set(tagElements, { y: 12, opacity: 0 });
    if (imageRef.current) gsap.set(imageRef.current, { x: imgEnterDistance, scale: 1.05, opacity: 0 });

    const enterTl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
    activeTimelineRef.current = enterTl;

    // Glide text wrapper
    if (textColumnRef.current) {
      enterTl.to(
        textColumnRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.42,
          ease: 'power2.out',
        },
        0
      );
    }

    // Parallax glide for right-side illustration
    if (imageRef.current) {
      enterTl.to(
        imageRef.current,
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.52,
          ease: 'power2.out',
        },
        0
      );
    }

    // Badge pop in with subtle overshoot bounce
    if (badgeRef.current) {
      enterTl.to(
        badgeRef.current,
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: 'back.out(1.8)',
        },
        0.04
      );
    }

    // Headline entrance
    if (titleRef.current) {
      enterTl.to(
        titleRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.38,
          ease: 'power2.out',
        },
        0.08
      );
    }

    // Sparkle star spin & pop
    if (sparkleRef.current) {
      enterTl.to(
        sparkleRef.current,
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'back.out(2)',
        },
        0.12
      );
    }

    // Subtitle entrance
    if (subtitleRef.current) {
      enterTl.to(
        subtitleRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.38,
          ease: 'power2.out',
        },
        0.12
      );
    }

    // Staggered tag pills entrance
    if (tagElements.length > 0) {
      enterTl.to(
        tagElements,
        {
          y: 0,
          opacity: 1,
          stagger: 0.045,
          duration: 0.32,
          ease: 'power2.out',
        },
        0.16
      );
    }

    return () => {
      enterTl.kill();
    };
  }, [currentSlideIndex]);

  // Clean directional transition function
  const changeSlide = (newIndex: number, direction: 1 | -1) => {
    if (isAnimatingRef.current || newIndex === currentSlideIndex) return;
    isAnimatingRef.current = true;
    directionRef.current = direction;

    // Arrow recoil micro-interaction
    if (direction === 1 && rightArrowRef.current) {
      gsap.fromTo(
        rightArrowRef.current,
        { x: 0 },
        { x: 4, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }
      );
    } else if (direction === -1 && leftArrowRef.current) {
      gsap.fromTo(
        leftArrowRef.current,
        { x: 0 },
        { x: -4, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }
      );
    }

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
    }

    const exitDistance = direction === 1 ? -28 : 28;
    const imgExitDistance = direction === 1 ? -40 : 40;

    const exitTl = gsap.timeline({
      onComplete: () => {
        setCurrentSlideIndex(newIndex);
      },
    });
    activeTimelineRef.current = exitTl;

    if (textColumnRef.current) {
      exitTl.to(
        textColumnRef.current,
        {
          x: exitDistance,
          opacity: 0,
          duration: 0.18,
          ease: 'power2.in',
        },
        0
      );
    }

    if (imageRef.current) {
      exitTl.to(
        imageRef.current,
        {
          x: imgExitDistance,
          scale: 0.97,
          opacity: 0,
          duration: 0.18,
          ease: 'power2.in',
        },
        0
      );
    }
  };

  const prevSlide = () => {
    const prevIdx = currentSlideIndex === 0 ? SLIDES.length - 1 : currentSlideIndex - 1;
    changeSlide(prevIdx, -1);
  };

  const nextSlide = () => {
    const nextIdx = (currentSlideIndex + 1) % SLIDES.length;
    changeSlide(nextIdx, 1);
  };

  const goToSlide = (idx: number) => {
    if (idx === currentSlideIndex) return;
    const dir = idx > currentSlideIndex ? 1 : -1;
    changeSlide(idx, dir);
  };

  // Gentle 7s Auto-slide with pause on hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      const nextIdx = (currentSlideIndex + 1) % SLIDES.length;
      changeSlide(nextIdx, 1);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentSlideIndex, isHovered]);

  return (
    <section
      id="gateway-promo-banner"
      aria-label="Promo Anggota KOPKARSAI"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-5xl mx-auto mt-0 mb-1 sm:mb-2 px-2 sm:px-4 select-none relative z-10"
    >
      <div className="relative flex items-center justify-center">
        {/* Left Chevron Button */}
        <button
          onClick={prevSlide}
          aria-label="Promo sebelumnya"
          className="absolute -left-2 sm:-left-4 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-pink-200/90 shadow-md shadow-pink-200/40 flex items-center justify-center text-pink-700 hover:text-[#065C2B] hover:scale-105 active:scale-95 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065C2B]"
        >
          <ChevronLeft ref={leftArrowRef} className="w-5 h-5 pointer-events-none" />
        </button>

        {/* Outer Banner Card Container */}
        <div className="w-full relative flex items-center justify-center overflow-hidden py-2 px-1 sm:px-3">
          {/* Main Active Banner Container */}
          <div className="w-full rounded-2xl sm:rounded-3xl bg-white border border-pink-100/90 shadow-[0_12px_36px_-10px_rgba(244,114,182,0.18)] overflow-hidden">
            <div className="grid grid-cols-12 items-center min-h-[170px] sm:min-h-[210px] md:min-h-[240px] relative">
              {/* Left Content Area (Columns 1-8 on mobile to gently overlap image, 1-7 on desktop) */}
              <div
                ref={textColumnRef}
                className="col-start-1 col-end-9 sm:col-end-8 md:col-start-1 md:col-end-8 row-start-1 p-3.5 sm:p-6 md:p-8 flex flex-col justify-center text-left will-change-transform z-10"
              >
                {/* Pill Tag Badge */}
                <div
                  ref={badgeRef}
                  className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#0B4A25] text-white text-[10px] sm:text-xs font-semibold w-fit shadow-sm will-change-transform"
                >
                  <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{activeSlide.badge}</span>
                </div>

                {/* Main Headline */}
                <h2
                  ref={titleRef}
                  className="mt-1.5 sm:mt-2.5 md:mt-3 font-heading text-base sm:text-2xl md:text-4xl text-[#0B4A25] font-bold leading-tight will-change-transform"
                >
                  <span>{activeSlide.titlePrefix}</span>
                  <span className="text-[#C93B57] relative inline-block">
                    {activeSlide.titleHighlight}
                    {/* Decorative Star Sparks Accent */}
                    <span
                      ref={sparkleRef}
                      className="absolute -top-1 -right-3 sm:-right-4 text-[#C93B57] text-[10px] sm:text-xs font-sans inline-block will-change-transform"
                    >
                      ✦
                    </span>
                  </span>
                </h2>

                {/* Subtitle */}
                <p
                  ref={subtitleRef}
                  className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs md:text-sm text-[#4A5D52] font-medium line-clamp-2 will-change-transform"
                >
                  <span className="italic text-[#BD3A53] font-semibold">
                    {activeSlide.subtitleAccent}
                  </span>
                  {activeSlide.subtitleText}
                </p>

                {/* Benefit Pills Row (Strictly 1 single line without wrapping, gently floating over gradient) */}
                <div
                  ref={tagsContainerRef}
                  className="mt-2.5 sm:mt-4 md:mt-5 flex flex-nowrap items-center gap-1.5 sm:gap-2 overflow-hidden max-w-full"
                >
                  {activeSlide.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="shrink-0 inline-flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FFF5F7] border border-pink-100 text-[#BD3A53] text-[10px] sm:text-xs font-medium shadow-2xs hover:bg-[#FEE9EE] transition-colors will-change-transform whitespace-nowrap"
                    >
                      {tag.icon === 'cart' && <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C93B57]" />}
                      {tag.icon === 'gift' && <Gift className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C93B57]" />}
                      {tag.icon === 'truck' && <Truck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C93B57]" />}
                      <span className="whitespace-nowrap">{tag.label}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Illustration Area (Starts from col 7 on mobile to allow gentle overlap, col 8 on desktop) */}
              <div className="col-start-7 sm:col-start-7 md:col-start-8 col-end-13 row-start-1 h-full flex items-center justify-end relative overflow-hidden pr-0 sm:pr-2">
                <div className="relative w-full h-[160px] sm:h-[190px] md:h-[220px] flex items-center justify-center overflow-hidden rounded-r-2xl sm:rounded-r-3xl">
                  <img
                    ref={imageRef}
                    src={activeSlide.image}
                    alt="Pavilion Sakura KOPKARSAI"
                    className="w-full h-full object-cover object-center rounded-r-2xl sm:rounded-r-3xl will-change-transform"
                    loading="eager"
                  />
                  {/* Subtle left-side blend gradient into white card so overlapping text is beautifully legible */}
                  <div className="absolute inset-y-0 left-0 w-12 sm:w-20 md:w-16 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-[1]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Chevron Button */}
        <button
          onClick={nextSlide}
          aria-label="Promo berikutnya"
          className="absolute -right-2 sm:-right-4 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 border border-pink-200/90 shadow-md shadow-pink-200/40 flex items-center justify-center text-pink-700 hover:text-[#065C2B] hover:scale-105 active:scale-95 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065C2B]"
        >
          <ChevronRight ref={rightArrowRef} className="w-5 h-5 pointer-events-none" />
        </button>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center space-x-2 mt-3.5 sm:mt-4">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(idx)}
            aria-label={`Pilih slide ke-${idx + 1}`}
            className={`transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065C2B] rounded-full ${
              idx === currentSlideIndex
                ? 'w-7 h-2 bg-[#065C2B] shadow-xs'
                : 'w-2 h-2 bg-pink-200 hover:bg-pink-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
