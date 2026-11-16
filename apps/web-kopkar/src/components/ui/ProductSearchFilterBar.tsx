import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import {
  ProductFilterPopover,
  type ProductPlaceFilter,
  type ProductTypeFilter,
} from './ProductFilterPopover';

interface ProductSearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedPlace: ProductPlaceFilter;
  onSelectPlace: (place: ProductPlaceFilter) => void;
  selectedType: ProductTypeFilter;
  onSelectType: (type: ProductTypeFilter) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onResetFilter: () => void;
}

export const ProductSearchFilterBar: React.FC<ProductSearchFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedPlace,
  onSelectPlace,
  selectedType,
  onSelectType,
  isFilterOpen,
  setIsFilterOpen,
  onResetFilter,
}) => {
  const activeFilterCount = (selectedPlace !== 'ALL' ? 1 : 0) + (selectedType !== 'ALL' ? 1 : 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C6F67]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama produk, jenis, atau asal..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-[#DED5C3] text-sm font-body text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 focus:ring-[#1F5B45]/30 shadow-2xs"
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            aria-label="Buka filter produk"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border transition-all cursor-pointer shadow-2xs font-heading font-bold text-xs sm:text-sm active:scale-95 ${
              isFilterOpen || activeFilterCount > 0
                ? 'border-[#1F5B45] text-[#1F5B45] ring-2 ring-[#1F5B45]/15 bg-[#EAF4EE]/50'
                : 'border-[#DED5C3] text-[#1A2421] hover:border-[#1F5B45]/60 hover:bg-[#F3ECDD]/40'
            }`}
          >
            <SlidersHorizontal size={15} className="text-[#1F5B45]" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#1F5B45] text-white text-[10px] font-accent font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <ProductFilterPopover
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            selectedPlace={selectedPlace}
            onSelectPlace={onSelectPlace}
            selectedType={selectedType}
            onSelectType={onSelectType}
            onReset={onResetFilter}
          />
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[11px] font-accent text-[#5C6F67]">Filter Aktif:</span>
          {selectedPlace !== 'ALL' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-accent font-bold px-2 py-0.5 rounded-full bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2]">
              Tempat: {selectedPlace}
              <button
                type="button"
                onClick={() => onSelectPlace('ALL')}
                className="hover:text-[#DC4C70] cursor-pointer"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {selectedType !== 'ALL' && (
            <span className="inline-flex items-center gap-1 text-[11px] font-accent font-bold px-2 py-0.5 rounded-full bg-[#FEF6DC] text-[#854D0E] border border-[#FDE68A]">
              Jenis: {selectedType}
              <button
                type="button"
                onClick={() => onSelectType('ALL')}
                className="hover:text-[#DC4C70] cursor-pointer"
              >
                <X size={12} />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={onResetFilter}
            className="text-[11px] font-accent font-semibold text-[#5C6F67] hover:text-[#DC4C70] hover:underline cursor-pointer ml-1"
          >
            Hapus Semua
          </button>
        </div>
      )}
    </div>
  );
};
