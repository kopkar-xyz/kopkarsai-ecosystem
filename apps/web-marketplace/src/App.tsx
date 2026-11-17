import React, { useState } from 'react';
import { MainCategoryId, SubCategoryId, FoodProduct } from './types/food';
import { MENU_DATA } from './data/mockFoodProducts';
import { MarketplaceNavbar } from './components/layout/MarketplaceNavbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { MarketplaceFooter } from './components/layout/MarketplaceFooter';
import { HelpSupportModal } from './components/ui/HelpSupportModal';
import { CategorySelector } from './features/catalog/components/CategorySelector';
import { FoodProductCard } from './features/catalog/components/FoodProductCard';
import { MenuDetailCard } from './features/catalog/components/MenuDetailCard';

/**
 * Marketplace App — Katalog & Belanja Karyawan PT SAI (MP-SCR-001)
 * Arsitektur Bersih Berbasis Komponen Sesuai Budget Invarian < 200 Baris.
 */
export const App: React.FC = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategoryId | 'all'>('jajanan');
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryId>('all');
  const [activeFilter, setActiveFilter] = useState<'all' | 'promo'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Selected item: Desktop opens first item by default; mobile starts closed
  const [selectedItem, setSelectedItem] = useState<FoodProduct | null>(() =>
    typeof window !== 'undefined' && window.innerWidth >= 1024 ? MENU_DATA[0] : null
  );

  const handleCardClick = (item: FoodProduct) => {
    if (selectedItem?.id === item.id) {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        setSelectedItem(null);
      } else {
        setSelectedItem(item);
        if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      setSelectedItem(item);
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  };

  const handleOrderNow = (quantity: number = 1) => {
    if (!selectedItem) return;
    setIsOrderLoading(true);
    setTimeout(() => {
      setIsOrderLoading(false);
      setOrderSuccess(true);
      setCartCount((prev) => prev + quantity);
      setTimeout(() => setOrderSuccess(false), 1800);
    }, 400);
  };

  const handleResetFilter = () => {
    setSelectedItem(null);
    setSelectedMainCategory('jajanan');
    setSelectedSubCategory('all');
    setActiveFilter('all');
    setSearchQuery('');
  };

  // Filter items berdasarkan Kategori, Sub-Kategori, Pencarian & Promo
  const filteredItems = MENU_DATA.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.kanjiName && item.kanjiName.includes(searchQuery));
    const matchesMain = selectedMainCategory === 'all' || item.category === selectedMainCategory;
    const matchesSub = selectedSubCategory === 'all' || item.subCategory === selectedSubCategory;
    if (!matchesSearch || !matchesMain || !matchesSub) return false;
    if (activeFilter === 'promo') return !!item.discountBadge;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1A1615] font-sans antialiased flex flex-col selection:bg-[#FCE4E9] selection:text-[#83273B]">
      {/* 1. Header Navbar */}
      <MarketplaceNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        onOpenHelp={() => setIsHelpModalOpen(true)}
        onResetFilter={handleResetFilter}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* 2. Main Content Container */}
      <main className="w-full pt-32 sm:pt-24 lg:pt-24 pb-28 sm:pb-36 xl:pb-16 min-h-screen block">
        <div className="relative w-full max-w-[1440px] mx-auto px-3 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3">
          {/* Sliced 1:1 Categories & Sub-Categories */}
          <CategorySelector
            selectedMainCategory={selectedMainCategory}
            onSelectMainCategory={setSelectedMainCategory}
            selectedSubCategory={selectedSubCategory}
            onSelectSubCategory={setSelectedSubCategory}
            activeFilter={activeFilter}
            onClearPromoFilter={() => setActiveFilter('all')}
          />

          {/* Dual-Pane Layout: Grid Produk + Panel Detail */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start pb-8 sm:pb-12 transition-all duration-300 w-full">
            {/* Catalog Grid Section */}
            <div className={`w-full transition-all duration-300 ${selectedItem ? 'lg:col-span-7 xl:col-span-8' : 'lg:col-span-12'}`}>
              <div
                className={`grid gap-3 sm:gap-4 md:gap-5 w-full ${
                  selectedItem
                    ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'
                }`}
              >
                {filteredItems.map((item) => (
                  <FoodProductCard
                    key={item.id}
                    product={item}
                    isSelected={selectedItem?.id === item.id}
                    onClick={handleCardClick}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Sticky Detail Panel */}
            {selectedItem && (
              <div
                id="detail-panel-section"
                className="hidden lg:block lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 transition-all duration-300 w-full"
              >
                <MenuDetailCard
                  product={selectedItem}
                  onClose={() => setSelectedItem(null)}
                  onOrder={(_, qty) => handleOrderNow(qty)}
                  orderSuccess={orderSuccess}
                  isLoading={isOrderLoading}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 3. Mobile Product Detail Modal Overlay */}
      {selectedItem && (
        <div
          className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedItem(null)}
          aria-modal="true"
          role="dialog"
        >
          <div className="w-full max-w-[400px] my-auto">
            <MenuDetailCard
              product={selectedItem}
              onClose={() => setSelectedItem(null)}
              onOrder={(_, qty) => handleOrderNow(qty)}
              orderSuccess={orderSuccess}
              isLoading={isOrderLoading}
            />
          </div>
        </div>
      )}

      {/* 4. Mobile Bottom Navigation */}
      <MobileBottomNav
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        cartCount={cartCount}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />

      {/* 5. 4-Column Footer */}
      <MarketplaceFooter isDetailOpen={!!selectedItem} />

      {/* 6. Help & Support Modal */}
      <HelpSupportModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
};
