import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Tag, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MAIN_CATEGORIES, SUB_CATEGORIES } from '../../../data/categories';
import { MainCategoryId, SubCategoryId, FoodProduct, SourceFilter } from '../../../types/food';

interface CategorySelectorProps {
  selectedMainCategory: MainCategoryId | 'all';
  onSelectMainCategory: (cat: MainCategoryId | 'all') => void;
  selectedSubCategory: SubCategoryId;
  onSelectSubCategory: (sub: SubCategoryId) => void;
  activeFilter: 'all' | 'promo';
  onClearPromoFilter: () => void;
  allProducts?: FoodProduct[];
  sourceFilter: SourceFilter;
  onSelectSourceFilter: (source: SourceFilter) => void;
}

const SOURCE_OPTIONS: { id: SourceFilter; label: string }[] = [
  { id: 'ALL', label: 'Semua' },
  { id: 'TOKO_FISIK', label: 'Toko fisik' },
  { id: 'SUPPLIER_ACC', label: 'Mitra UMKM' },
];

/**
 * CategorySelector — Slicing 1:1 Kategori Utama, Tabs Sub-Kategori, & Filter Sumber
 * Desain presisi dari Kategori utama Kopkarsai (.cats, .cat, .sub, .tab, .k)
 * Dilengkapi scroll arrows interaktif mobile dan segmented control Sumber.
 * Budget: < 200 LOC.
 */
export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedMainCategory,
  onSelectMainCategory,
  selectedSubCategory,
  onSelectSubCategory,
  activeFilter,
  onClearPromoFilter,
  allProducts = [],
  sourceFilter,
  onSelectSourceFilter,
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
    el.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <div className="w-full mb-4 sm:mb-5 select-none">
      {/* 1. Main Category Horizontal Bar (.cats) dengan Navigasi Panah Mobile */}
      <div className="relative group">
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

        <div ref={scrollRef} className="cats scroll-smooth" role="tablist" id="c" aria-label="Kategori Utama Jajanan & Minuman">
          {MAIN_CATEGORIES.map((cat) => {
            const isActive = selectedMainCategory === cat.id;
            const IconComponent = cat.icon;
            const catCount = allProducts.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectMainCategory(selectedMainCategory === cat.id ? 'all' : cat.id)}
                className="cat group"
              >
                <IconComponent />
                <span className="flex-1 min-w-0">
                  <b className="truncate block">{cat.label}</b>
                  <small>{cat.kanji}</small>
                </span>
                {catCount > 0 && (
                  <span
                    className={`self-center inline-flex items-center justify-center min-w-[20px] h-[18px] px-1.5 rounded-[5px] text-[10px] font-semibold tabular-nums transition-colors shrink-0 ml-1.5 ${
                      isActive
                        ? 'bg-white text-[#83273B] shadow-xs'
                        : 'bg-[#F2ECE1] text-[#736860] border border-[#E0D5C5] group-hover:text-[#83273B] group-hover:border-[#83273B]/30 group-hover:bg-white'
                    }`}
                  >
                    {catCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sub-Category Tabs (.sub) & Filter Sumber Segmented Control Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-3">
        <div className="sub !mt-0" role="tablist" id="s" aria-label="Filter Cita Rasa & Karakteristik">
          {SUB_CATEGORIES.map((sub) => (
            <button
              key={sub.id}
              type="button"
              role="tab"
              aria-selected={selectedSubCategory === sub.id}
              onClick={() => onSelectSubCategory(sub.id)}
              className="tab"
            >
              <span className="k">{sub.kanji}</span>
              <span>{sub.label}</span>
            </button>
          ))}

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

        {/* Segmented Filter Sumber Sesuai Mockup */}
        <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
          <span className="text-xs font-medium text-[#8C827A]">Sumber</span>
          <div className="inline-flex items-center p-1 rounded-xl bg-white border border-[#EAE3D5] shadow-2xs">
            {SOURCE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectSourceFilter(opt.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  sourceFilter === opt.id
                    ? 'bg-[#83273B] text-white shadow-2xs'
                    : 'text-[#665E60] hover:text-[#1A1615]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
