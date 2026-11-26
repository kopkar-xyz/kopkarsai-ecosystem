import React, { useState } from 'react';
import { Eye, Plus, Search } from 'lucide-react';
import { useRouter } from '../app/router';
import { useKopkarRole } from '../app/auth/RoleContext';
import { ProductCard, ProductType, type CatalogProductStatus } from '../components/ui/ProductCard';
import { FilterCountPill } from '../components/ui/FilterCountPill';
import { CATALOG_PRODUCTS } from '../features/products/data/catalogProductsData';
import { useProductStore } from '../features/product-submission/context/ProductStoreContext';

const CATEGORIES: ('Semua' | ProductType)[] = [
  'Semua',
  'Makanan Basah',
  'Makanan Ringan',
  'Minuman',
  'Sembako',
];

export const ProductsView: React.FC = () => {
  const { navigate } = useRouter();
  const { currentUser } = useKopkarRole();
  const { setSelectedRevisionData, setSelectedProductId } = useProductStore();

  const [activeTab, setActiveTab] = useState<'AKTIF' | 'KURASI' | 'NONAKTIF' | 'ALL'>('AKTIF');
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | ProductType>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const isSupplier = currentUser.role === 'SUPPLIER';
  const isHeadReadOnly = currentUser.role === 'KEPALA_KOPERASI';
  const supplierOwnerName = currentUser.supplierBusinessName ?? currentUser.name;

  // Supplier hanya boleh melihat produk miliknya sendiri; Admin Toko & Kepala melihat semua
  const scopedProducts = isSupplier
    ? CATALOG_PRODUCTS.filter((p) => p.supplier === supplierOwnerName)
    : CATALOG_PRODUCTS;

  const getStatus = (p: (typeof CATALOG_PRODUCTS)[number]): CatalogProductStatus =>
    p.productStatus ?? (p.isActive === false ? 'KURASI' : 'AKTIF');

  const activeCount = scopedProducts.filter((p) => getStatus(p) === 'AKTIF').length;
  const curationCount = scopedProducts.filter((p) => getStatus(p) === 'KURASI').length;
  const inactiveCount = scopedProducts.filter((p) => getStatus(p) === 'NONAKTIF').length;

  const filteredProducts = scopedProducts.filter((prod) => {
    const status = getStatus(prod);
    const matchTab = activeTab === 'ALL' ? true : status === activeTab;
    const matchCategory = selectedCategory === 'Semua' || prod.productType === selectedCategory;
    const matchSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.supplier && prod.supplier.toLowerCase().includes(searchQuery.toLowerCase())) ||
      prod.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchCategory && matchSearch;
  });

  const tabs: Array<{ key: typeof activeTab; label: string; count: number }> = [
    { key: 'AKTIF', label: 'Aktif', count: activeCount },
    { key: 'KURASI', label: 'Kurasi', count: curationCount },
    { key: 'NONAKTIF', label: 'Nonaktif', count: inactiveCount },
    { key: 'ALL', label: 'Semua', count: scopedProducts.length },
  ];

  return (
    <div className="space-y-5 animate-fadeIn select-none">
      {/* 1. Toolbar Kontrol Etalase & Filter */}
      <div className="bg-white rounded-2xl border border-[#EAE4D3] p-4 sm:p-5 space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="inline-flex flex-wrap items-center bg-[#F5F0E2] p-1 rounded-xl w-full sm:w-auto gap-0.5">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-medium transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center ${
                    isSelected
                      ? tab.key === 'KURASI'
                        ? 'bg-[#B45309] text-white shadow-xs'
                        : 'bg-[#165239] text-white shadow-xs'
                      : 'text-[#526058] hover:text-[#18221D]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <FilterCountPill count={tab.count} active={isSelected} />
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full lg:w-auto">
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-[#7A867E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk atau unit..."
                className="w-full bg-[#FAF7EE] border border-[#EAE4D3] rounded-xl pl-9 pr-3 py-2 text-[13px] text-[#18221D] placeholder:text-[#7A867E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#165239]"
              />
            </div>

            {isHeadReadOnly ? (
              <span className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] text-[12px] font-medium text-[#526058] shrink-0">
                <Eye className="w-3.5 h-3.5 text-[#165239]" />
                <span>Mode Monitoring</span>
              </span>
            ) : (
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
            )}
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
            {isSupplier ? `${supplierOwnerName} · ` : ''}Menampilkan {filteredProducts.length} produk
          </span>
        </div>
      </div>

      {/* 2. Grid Produk */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EAE4D3] p-12 text-center text-[13.5px] text-[#7A867E]">
          Produk tidak ditemukan pada kategori atau status ini.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onClick={() => {
                setSelectedProductId(prod.id);
                navigate('/products/detail');
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
