import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Gift, ShoppingCart, Tag, Truck } from 'lucide-react';
import sliderFujiTorii from '../../assets/illustrations/slider-fuji-torii.jpg';
import sliderSakuraHouse from '../../assets/illustrations/slider-sakura-house.jpg';
import sliderKyotoLanterns from '../../assets/illustrations/slider-kyoto-lanterns.jpg';

interface MinimalSlide {
  id: number;
  tag: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitleAccent: string;
  subtitleText: string;
  chips: Array<{ icon: 'cart' | 'gift' | 'truck'; label: string }>;
  image: string;
}

const SLIDES: MinimalSlide[] = [
  {
    id: 1,
    tag: 'Promo Anggota',
    titlePrefix: 'Diskon hingga ',
    titleHighlight: '13%',
    subtitleAccent: 'Belanja Hemat',
    subtitleText: ' khusus Anggota KOPKARSAI di toko & marketplace.',
    chips: [
      { icon: 'cart', label: 'Diskon Marketplace' },
      { icon: 'gift', label: 'Produk Pilihan' },
      { icon: 'truck', label: 'Gratis Antar*' },
    ],
    image: sliderFujiTorii,
  },
  {
    id: 2,
    tag: 'Katering H-1',
    titlePrefix: 'Pesan Khusus ',
    titleHighlight: 'Katering',
    subtitleAccent: 'Menu Fresh H-1',
    subtitleText: ' langsung dari mitra UMKM terkurasi ke divisi.',
    chips: [
      { icon: 'gift', label: 'Mitra UMKM' },
      { icon: 'cart', label: 'Same-Day Ready' },
      { icon: 'truck', label: 'Prioritas GA' },
    ],
    image: sliderSakuraHouse,
  },
  {
    id: 3,
    tag: 'Simpan Pinjam',
    titlePrefix: 'Jasa Ringan ',
    titleHighlight: '0.8%',
    subtitleAccent: 'Layanan SinJam',
    subtitleText: ' dengan kalkulator payroll & Dual-Approval resmi.',
    chips: [
      { icon: 'gift', label: 'Dual-Approval' },
      { icon: 'cart', label: 'Kalkulator Payroll' },
      { icon: 'truck', label: 'SHU Tahunan' },
    ],
    image: sliderKyotoLanterns,
  },
];

export const PromoSliderV2: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIdx((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(id);
  }, [paused]);

  const slide = SLIDES[idx];
  const prevSlide = () => setIdx((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  const nextSlide = () => setIdx((prev) => (prev + 1) % SLIDES.length);

  return (
    <section
      aria-label="Sorotan Layanan KOPKARSAI"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="w-full space-y-2.5 sm:space-y-3"
    >
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Slide sebelumnya"
          className="absolute -left-2 sm:-left-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-[#F7BAC7] shadow-md shadow-[#83273B]/10 flex items-center justify-center text-[#83273B] hover:bg-[#83273B] hover:text-white cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="group w-full rounded-2xl bg-white border border-[#EAE3D5] shadow-[0_14px_36px_-10px_rgba(131,39,59,0.16)] overflow-hidden relative">
          {/* Subtle top-left sakura-crimson radial accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(253,240,243,0.9)_0%,transparent_50%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#83273B] via-[#DC4C70] to-[#F6CE2C]"
          />

          <div className="grid grid-cols-12 items-center min-h-[170px] sm:min-h-[210px] md:min-h-[240px] relative">
            {/* Left Content Area */}
            <div className="col-start-1 col-end-9 sm:col-end-8 row-start-1 p-3.5 sm:p-6 md:p-8 flex flex-col justify-center text-left z-10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#83273B] text-white text-[10px] sm:text-xs font-semibold shadow-xs">
                  <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F6CE2C]" />
                  <span>{slide.tag}</span>
                </span>
                <span className="text-[10.5px] sm:text-[11.5px] font-semibold text-[#665E60] tabular-nums">
                  0{idx + 1} / 0{SLIDES.length}
                </span>
              </div>

              <h2 className="mt-2 sm:mt-3 text-base sm:text-2xl md:text-[32px] font-bold tracking-[-0.025em] text-[#1A1615] leading-tight">
                <span>{slide.titlePrefix}</span>
                <span className="text-[#83273B]">{slide.titleHighlight}</span>
              </h2>

              <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs md:text-sm text-[#665E60] line-clamp-2 max-w-md leading-relaxed">
                <span className="font-semibold text-[#83273B]">{slide.subtitleAccent}</span>
                {slide.subtitleText}
              </p>

              <div className="mt-2.5 sm:mt-4 flex flex-nowrap items-center gap-1.5 sm:gap-2 overflow-hidden max-w-full">
                {slide.chips.map((chip) => (
                  <span
                    key={chip.label}
                    className="shrink-0 inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FDF0F3] border border-[#F7BAC7]/70 text-[#83273B] text-[10px] sm:text-[11.5px] font-medium whitespace-nowrap"
                  >
                    {chip.icon === 'cart' && <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#BC3455]" />}
                    {chip.icon === 'gift' && <Gift className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#BC3455]" />}
                    {chip.icon === 'truck' && <Truck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#BC3455]" />}
                    <span>{chip.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right High-Res Illustration Area */}
            <div className="col-start-7 sm:col-start-7 md:col-start-8 col-end-13 row-start-1 h-full flex items-center justify-end relative overflow-hidden">
              <div className="relative w-full h-[170px] sm:h-[210px] md:h-[240px] overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.tag}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white via-white/85 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Slide berikutnya"
          className="absolute -right-2 sm:-right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-[#F7BAC7] shadow-md shadow-[#83273B]/10 flex items-center justify-center text-[#83273B] hover:bg-[#83273B] hover:text-white cursor-pointer transition-colors"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Pilih slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${i === idx ? 'w-7 bg-[#83273B]' : 'w-2 bg-[#F7BAC7] hover:bg-[#DC4C70]'
              }`}
          />
        ))}
      </div>
    </section>
  );
};
