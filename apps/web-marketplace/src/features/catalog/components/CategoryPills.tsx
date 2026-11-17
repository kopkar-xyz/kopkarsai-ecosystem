import React from 'react';
import { ProductCategory } from '../../../types/catalog';

interface CategoryPillsProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

const CATEGORIES: { id: ProductCategory; label: string; kanji: string }[] = [
  { id: 'ALL', label: 'Semua Menu', kanji: 'すべて' },
  { id: 'SAME_DAY', label: 'Toko Fisik (Same-Day)', kanji: '即日売店' },
  { id: 'CATERING_H1', label: 'Katering (PO H-1)', kanji: '事前注文' },
  { id: 'BEVERAGE', label: 'Minuman Dingin', kanji: '飲み物' },
  { id: 'SNACK', label: 'Camilan & Roti', kanji: 'お菓子' },
];

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const active = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border shadow-sm ${
              active
                ? 'bg-[#83273B] text-white border-[#5E1526] shadow-sakura-card'
                : 'bg-white text-[#665E60] border-[#EAE3D5] hover:bg-[#FDF0F3] hover:text-[#83273B]'
            }`}
          >
            <span className="font-serif text-[11px] opacity-80">{cat.kanji}</span>
            <span className="font-semibold">{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};

