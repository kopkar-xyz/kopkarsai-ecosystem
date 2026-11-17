import React from 'react';
import { Tag, X } from 'lucide-react';
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
  return (
    <div className="w-full mb-3.5 sm:mb-4 select-none">
      {/* 1. Main Category Horizontal Bar (.cats) */}
      <div className="cats" role="tablist" id="c" aria-label="Kategori Utama Jajanan & Minuman">
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

