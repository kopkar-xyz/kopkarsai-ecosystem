import React, { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import { useRouter } from '../app/router';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  ProductCard,
  type ProductItem,
  mapTypeToFilterCategory,
  getOperationalStatus,
} from '../components/ui/ProductCard';
import { ProductSearchFilterBar } from '../components/ui/ProductSearchFilterBar';
import type { ProductPlaceFilter, ProductTypeFilter } from '../components/ui/ProductFilterPopover';
import { useProductStore } from '../features/product-submission/context/ProductStoreContext';

/**
 * ProductsView (Katalog Produk Mitra) — KK-SCR-006 & KK-SCR-007
 * Budget: < 200 LOC.
 */
export const ProductsView: React.FC = () => {
  const { navigate } = useRouter();
  const { products, setSelectedProductId, setSelectedRevisionData } = useProductStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<ProductPlaceFilter>('ALL');
  const [selectedType, setSelectedType] = useState<ProductTypeFilter>('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const resetFilters = () => {
    setSelectedPlace('ALL');
    setSelectedType('ALL');
  };

  const filtered = products.filter((prod) => {
    const origin = prod.origin === 'BUAT_SENDIRI' ? 'Produksi Sendiri' : 'Supply Orang';
    const matchSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPlace = selectedPlace === 'ALL' || prod.supplyLocation === selectedPlace;
    const matchType =
      selectedType === 'ALL' || mapTypeToFilterCategory(prod.productType) === selectedType;
    return matchSearch && matchPlace && matchType;
  });

  const handleProductCardClick = (productId: string) => {
    setSelectedProductId(productId);
    navigate('/products/detail');
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Halaman Produk */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1F5B45] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Package size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421]">
              Katalog Produk Mitra
            </h1>
            <p className="text-xs sm:text-sm font-body text-[#5C6F67]">
              Pilih kartu produk untuk membuka halaman detail spesifikasi, history revisi, & status aktif
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setSelectedRevisionData(null);
            navigate('/products/new');
          }}
          icon={<Plus size={16} />}
          className="hidden sm:inline-flex"
        >
          Ajukan Produk Baru
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <ProductSearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedPlace={selectedPlace}
        onSelectPlace={setSelectedPlace}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        onResetFilter={resetFilters}
      />

      {/* Product Bento Grid */}
      {filtered.length === 0 ? (
        <Card padding="lg" className="text-center py-12 space-y-3">
          <p className="text-sm font-heading font-bold text-[#1A2421]">
            Tidak ada produk yang cocok dengan filter yang dipilih.
          </p>
          <Button variant="outline" size="sm" onClick={resetFilters} className="mx-auto">
            Reset Filter
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((prod) => {
            const cardItem: ProductItem = {
              id: prod.id,
              name: prod.name,
              category: prod.productType,
              productType: mapTypeToFilterCategory(prod.productType),
              unit: prod.supplyLocation,
              price: prod.sellingPrice,
              stock: prod.stock,
              status: getOperationalStatus(prod.submissionStatus, prod.isActive),
              supplier: prod.origin === 'BUAT_SENDIRI' ? 'Produksi Sendiri' : 'Supply Orang',
              isActive: prod.isActive,
            };

            return (
              <ProductCard
                key={prod.id}
                product={cardItem}
                onClick={() => handleProductCardClick(prod.id)}
              />
            );
          })}
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-24 right-4 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => {
            setSelectedRevisionData(null);
            navigate('/products/new');
          }}
          className="flex items-center gap-2 px-4 py-3 bg-[#1F5B45] hover:bg-[#2F6F56] text-white rounded-full active:scale-95 transition-all font-heading font-bold text-xs cursor-pointer shadow-lg"
          aria-label="Ajukan Produk Baru"
        >
          <Plus size={18} className="text-[#F6CE2C]" />
          <span>Ajukan Produk</span>
        </button>
      </div>
    </div>
  );
};
