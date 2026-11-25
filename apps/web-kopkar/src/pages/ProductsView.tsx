import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useRouter } from '../app/router';
import { ProductCard, ProductType } from '../components/ui/ProductCard';
import { CATALOG_PRODUCTS } from '../features/products/data/catalogProductsData';
import { useProductStore } from '../features/product-submission/context/ProductStoreContext';

const CATEGORIES: ('Semua' | ProductType)[] = [
  'Semua',
  'Makanan Basah',
  'Makanan Ringan',
  'Minuman',
  'Sembako',
];

/**
 * ProductsView (Katalog Produk Mitra) — KK-SCR-007
 * Slicing 1:1 Presisi aistudio-src CatalogPage:
 * - Toolbar container: bg-white rounded-2xl border border-[#EAE4D3] p-4 sm:p-5
 * - Segmented tab: bg-[#F5F0E2] p-1 rounded-xl dengan button rounded-lg text-[12.5px] font-medium
 * - Tombol aksi: rounded-xl bg-[#165239] text-white text-[13px] font-semibold
 * - Category filter: rounded-xl text-[12px] font-medium (active: bg-[#165239] text-white)
 * - Grid produk 4 kolom
 * Budget: < 200 LOC.
 */
export const ProductsView: React.FC = () => {
  const { navigate } = useRouter();
  const { setSelectedRevisionData, setSelectedProductId } = useProductStore();

  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'ALL'>('ACTIVE');
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | ProductType>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = CATALOG_PRODUCTS.filter((prod) => {
    const matchTab = activeTab === 'ACTIVE' ? prod.isActive : true;
    const matchCategory = selectedCategory === 'Semua' || prod.productType === selectedCategory;
    const matchSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.supplier && prod.supplier.toLowerCase().includes(searchQuery.toLowerCase())) ||
      prod.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchCategory && matchSearch;
  });

  const handleAddToCart = () => {
    // Handler keranjang belanja
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    navigate('/products/detail');
  };

  return (
    <div className="space-y-5 animate-fadeIn select-none">
      {/* 1. Header Toolbar Kontrol Etalase & Filter (Slicing 1:1 aistudio-src) */}
      <div className="bg-white rounded-2xl border border-[#EAE4D3] p-4 sm:p-5 space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Segmented Switch */}
          <div className="inline-flex flex-wrap items-center bg-[#F5F0E2] p-1 rounded-xl w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('ACTIVE')}
              className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-medium transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                activeTab === 'ACTIVE'
                  ? 'bg-[#165239] text-white shadow-xs'
                  : 'text-[#526058] hover:text-[#18221D]'
              }`}
            >
              Etalase Aktif (8)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ALL')}
              className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-medium transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                activeTab === 'ALL'
                  ? 'bg-[#165239] text-white shadow-xs'
                  : 'text-[#526058] hover:text-[#18221D]'
              }`}
            >
              Semua Produk Mitra (9 · 1 kurasi)
            </button>
          </div>

          {/* Search Input & Ajukan Produk Baru */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full lg:w-auto">
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-[#7A867E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk atau mitra..."
                className="w-full bg-[#FAF7EE] border border-[#EAE4D3] rounded-xl pl-9 pr-3 py-2 text-[13px] text-[#18221D] placeholder:text-[#7A867E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#165239]"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedRevisionData(null);
                navigate('/products/new');
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#165239] hover:bg-[#11402c] text-white font-semibold text-[13px] transition-colors cursor-pointer whitespace-nowrap shrink-0 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Ajukan Produk Baru</span>
            </button>
          </div>
        </div>

        {/* Category Pills Bar + Counter */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-[#F0EBDC]">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#165239] text-white shadow-2xs'
                      : 'bg-[#FAF8F2] border border-[#EAE4D3] text-[#526058] hover:text-[#18221D]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <span className="text-[12px] text-[#7A867E] tabular-nums">
            Menampilkan {filteredProducts.length} produk
          </span>
        </div>
      </div>

      {/* 2. Grid 4 Kolom Produk Mitra */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EAE4D3] p-12 text-center text-[13.5px] text-[#7A867E]">
          Produk tidak ditemukan. Coba kata kunci atau kategori lain.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onClick={() => handleProductClick(prod.id)}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};
