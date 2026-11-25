import React, { useState } from 'react';
import { FoodProduct, MainCategoryId, SubCategoryId, SourceFilter } from '../../../types/food';
import { CategorySelector } from '../components/CategorySelector';
import { FoodProductCard } from '../components/FoodProductCard';
import { MenuDetailCard } from '../components/MenuDetailCard';

interface CatalogViewProps {
  items: FoodProduct[];
  allProducts?: FoodProduct[];
  selectedItem: FoodProduct | null;
  onSelectItem: (item: FoodProduct) => void;
  onCloseDetail: () => void;
  onOrderNow: (product: FoodProduct, quantity: number) => void;
  orderSuccess: boolean;
  isOrderLoading: boolean;
  selectedMainCategory: MainCategoryId | 'all';
  onSelectMainCategory: (cat: MainCategoryId | 'all') => void;
  selectedSubCategory: SubCategoryId;
  onSelectSubCategory: (sub: SubCategoryId) => void;
  activeFilter: 'all' | 'promo';
  onClearPromoFilter: () => void;
}

/**
 * CatalogView — Halaman Etalase Belanja Sakura Kyoto Kitchen (MP-SCR-001 & MP-SCR-002)
 * Memuat Bar Kategori Utama (.cats), Sub-Kategori (.sub), dan Filter Sumber Segmented.
 * Budget: < 200 LOC.
 */
export const CatalogView: React.FC<CatalogViewProps> = ({
  items,
  allProducts = [],
  selectedItem,
  onSelectItem,
  onCloseDetail,
  onOrderNow,
  orderSuccess,
  isOrderLoading,
  selectedMainCategory,
  onSelectMainCategory,
  selectedSubCategory,
  onSelectSubCategory,
  activeFilter,
  onClearPromoFilter,
}) => {
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('ALL');

  const visibleItems = items.filter((item) => {
    if (sourceFilter === 'ALL') return true;
    return item.source === sourceFilter;
  });

  return (
    <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-1 sm:pt-1.5 pb-2 sm:pb-3">
      {/* 1. Kategori Utama (.cats), Sub-Kategori (.sub), & Filter Sumber Sesuai Mockup */}
      <CategorySelector
        selectedMainCategory={selectedMainCategory}
        onSelectMainCategory={onSelectMainCategory}
        selectedSubCategory={selectedSubCategory}
        onSelectSubCategory={onSelectSubCategory}
        activeFilter={activeFilter}
        onClearPromoFilter={onClearPromoFilter}
        allProducts={allProducts.length > 0 ? allProducts : items}
        sourceFilter={sourceFilter}
        onSelectSourceFilter={setSourceFilter}
      />

      {/* 2. Dual-Pane Layout: Grid Produk + Panel Detail */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-6 items-start pb-8 sm:pb-12 transition-all duration-300 w-full mt-3.5 sm:mt-4">
        {/* Catalog Grid Section */}
        <div className={`w-full transition-all duration-300 ${selectedItem ? 'lg:col-span-7 xl:col-span-8' : 'lg:col-span-12'}`}>
          <div
            className={`grid gap-3 sm:gap-4 md:gap-4.5 w-full ${
              selectedItem
                ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {visibleItems.map((item) => (
              <FoodProductCard
                key={item.id}
                product={item}
                isSelected={selectedItem?.id === item.id}
                onClick={onSelectItem}
              />
            ))}
          </div>

          {visibleItems.length === 0 && (
            <div className="w-full py-16 text-center text-[#8C827A] bg-white rounded-2xl border border-[#EAE3D5] p-8">
              <p className="text-sm font-medium">Tidak ada produk yang cocok dengan filter yang dipilih.</p>
            </div>
          )}
        </div>

        {/* Desktop Sticky Detail Panel */}
        {selectedItem && (
          <div
            id="detail-panel-section"
            className="hidden lg:block lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 transition-all duration-300 w-full"
          >
            <MenuDetailCard
              product={selectedItem}
              onClose={onCloseDetail}
              onOrder={onOrderNow}
              orderSuccess={orderSuccess}
              isLoading={isOrderLoading}
            />
          </div>
        )}
      </div>

      {/* Mobile Product Detail Modal Overlay */}
      {selectedItem && (
        <div
          className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn"
          onClick={onCloseDetail}
          aria-modal="true"
          role="dialog"
        >
          <div className="w-full max-w-[400px] my-auto">
            <MenuDetailCard
              product={selectedItem}
              onClose={onCloseDetail}
              onOrder={onOrderNow}
              orderSuccess={orderSuccess}
              isLoading={isOrderLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};
