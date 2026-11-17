import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Tag, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MAIN_CATEGORIES, SUB_CATEGORIES } from '../../../data/categories';
import { MainCategoryId, SubCategoryId } from '../../../types/food';

interface CategorySelectorProps {
  selectedMainCategory: MainCategoryId | 'all';
  onSelectMainCategory: (cat: MainCategoryId | 'all') => void;
  selectedSubCategory: SubCategoryId;
  onSelectSubCategory: (sub: SubCategoryId) => void;
  activeFilter: 'all' | 'promo';
  onClearPromoFilter: () => void;
}

/**
 * CategorySelector — Slicing 1:1 Kategori Utama & Tabs Sub-Kategori
 * Desain presisi dari Kategori utama Kopkarsai (1).html dengan class .cats, .cat, .sub, .tab, .k
 * Dilengkapi scroll arrows interaktif untuk perangkat mobile.
 * Budget: < 200 LOC.
 */
export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedMainCategory,
  onSelectMainCategory,
  selectedSubCategory,
  onSelectSubCategory,
  activeFilter,
  onClearPromoFilter,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    const timer = setTimeout(checkScroll, 150);
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer);
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = direction === 'left' ? -200 : 200;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="w-full mb-3.5 sm:mb-4 select-none">
      {/* 1. Main Category Horizontal Bar (.cats) dengan Navigasi Panah Mobile */}
      <div className="relative group">
        {/* Tombol & Gradient Panah Kiri (Mobile <= 860px) */}
        {canScrollLeft && (
          <>
            <div className="min-[861px]:hidden pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#fffcf6] to-transparent z-10 rounded-l-[18px]" />
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Geser kategori ke kiri"
              className="min-[861px]:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#fffcf6]/95 backdrop-blur-xs text-[#83273B] border border-[#eadfce] shadow-[0_2px_8px_rgba(46,31,34,0.12)] flex items-center justify-center hover:bg-[#FAF6F0] active:scale-90 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Tombol & Gradient Panah Kanan (Mobile <= 860px) */}
        {canScrollRight && (
          <>
            <div className="min-[861px]:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#fffcf6] to-transparent z-10 rounded-r-[18px]" />
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Geser kategori ke kanan"
              className="min-[861px]:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#fffcf6]/95 backdrop-blur-xs text-[#83273B] border border-[#eadfce] shadow-[0_2px_8px_rgba(46,31,34,0.12)] flex items-center justify-center hover:bg-[#FAF6F0] active:scale-90 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          className="cats scroll-smooth"
          role="tablist"
          id="c"
          aria-label="Kategori Utama Jajanan & Minuman"
        >
          {MAIN_CATEGORIES.map((cat) => {
            const isActive = selectedMainCategory === cat.id;
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  // Toggle: jika diklik saat aktif, tampilkan seluruh kategori ('all')
                  onSelectMainCategory(selectedMainCategory === cat.id ? 'all' : cat.id);
                }}
                className="cat group"
              >
                <IconComponent />
                <span>
                  <b>{cat.label}</b>
                  <small>{cat.kanji}</small>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sub-Category Tabs with Kanji Stamp (.sub, .tab, .k) */}
      <div className="sub" role="tablist" id="s" aria-label="Filter Cita Rasa & Karakteristik">
        {SUB_CATEGORIES.map((sub) => {
          const isActive = selectedSubCategory === sub.id;
          return (
            <button
              key={sub.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectSubCategory(sub.id)}
              className="tab"
            >
              <span className="k">{sub.kanji}</span>
              <span>{sub.label}</span>
            </button>
          );
        })}

        {/* Promo Filter Badge Tag */}
        {activeFilter === 'promo' && (
          <div className="shrink-0 flex items-center gap-1.5 bg-[#FDF0F3] border border-[#F7BAC7] text-[#83273B] px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs">
            <Tag className="w-3.5 h-3.5 text-[#BC3455]" />
            <span>Promo Spesial</span>
            <button
              type="button"
              onClick={onClearPromoFilter}
              className="w-4 h-4 ml-1 rounded-full bg-[#83273B]/10 hover:bg-[#83273B]/20 flex items-center justify-center text-[#83273B] cursor-pointer border-none"
              aria-label="Hapus filter promo"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

