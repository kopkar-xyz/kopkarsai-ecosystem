import React, { useEffect, useState } from 'react';
import sliderFujiTorii from '../../assets/illustrations/slider-fuji-torii.jpg';
import sliderSakuraHouse from '../../assets/illustrations/slider-sakura-house.jpg';
import sliderKyotoLanterns from '../../assets/illustrations/slider-kyoto-lanterns.jpg';

interface V3Slide {
  id: number;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  image: string;
}

const SLIDES: V3Slide[] = [
  {
    id: 1,
    titleLine1: 'Diskon Hingga 13%',
    titleLine2: 'Belanja Hemat Anggota',
    subtitle: 'Nikmati potongan langsung untuk kebutuhan harian & produk pilihan di toko internal.',
    image: sliderFujiTorii,
  },
  {
    id: 2,
    titleLine1: 'Pesan Khusus Katering',
    titleLine2: 'Menu Fresh H-1',
    subtitle: 'Hidangan bento dan prasmanan langsung dari mitra UMKM dengan antrean prioritas GA.',
    image: sliderSakuraHouse,
  },
  {
    id: 3,
    titleLine1: 'Layanan Simpan Pinjam',
    titleLine2: 'SinJam Jasa 0.8%',
    subtitle: 'Simulasi angsuran payroll transparan dengan otorisasi Dual-Approval resmi.',
    image: sliderKyotoLanterns,
  },
];

export const GatewayV3Slider: React.FC = () => {
  const [idx, setIdx] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = SLIDES[idx];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full h-full min-h-0 lg:h-[calc(100dvh-2rem)] rounded-2xl sm:rounded-[20px] overflow-hidden bg-[#0A110D] text-white select-none shadow-[0_20px_50px_-15px_rgba(10,17,13,0.35)]"
    >
      {/* Background Image */}
      <img
        src={slide.image}
        alt={`${slide.titleLine1} ${slide.titleLine2}`}
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
      />

      {/* Dark gradient scrim for crisp white text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#0A110D] via-[#0A110D]/60 to-black/20"
      />

      {/* Bottom-left Editorial Content + Gold Pill Indicator */}
      <div className="relative z-10 h-full flex flex-col justify-end p-3.5 sm:p-8 lg:p-10">
        <div className="max-w-md space-y-0.5 sm:space-y-2.5">
          <h2 className="text-[17px] sm:text-[28px] lg:text-[32px] font-bold tracking-[-0.025em] leading-[1.15] text-white">
            {slide.titleLine1}
            <br />
            {slide.titleLine2}
          </h2>
          <p className="text-[11px] sm:text-[13px] text-white/75 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
            {slide.subtitle}
          </p>
        </div>

        {/* Dots Indicator (matching screenshot: grey dot, gold pill, grey dot) */}
        <div className="mt-2 sm:mt-5 flex items-center gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Pilih slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === idx ? 'w-6 bg-[#F5B82E]' : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
