import React, { useState } from 'react';
import { Search, Plus, Package } from 'lucide-react';
import { useRouter } from '../app/router';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { formatCurrencyIDR } from '../lib/utils';
import type { OperationalStatus } from '../types';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: OperationalStatus;
  supplier: string;
}

const MOCK_PRODUCTS: ProductItem[] = [
  { id: 'p-1', name: 'Nasi Kotak Ayam Bakar Madu', category: 'Katering H-1', price: 25000, stock: 45, status: 'ACCEPTED', supplier: 'Dapur Berkah Bu Siti' },
  { id: 'p-2', name: 'Roti Gandum Serat Tinggi', category: 'Toko Same-Day', price: 14000, stock: 28, status: 'ACTIVE', supplier: 'Sari Bakery SAI' },
  { id: 'p-3', name: 'Snack Box Rapat GA Unit B', category: 'Katering H-1', price: 15000, stock: 60, status: 'ACCEPTED', supplier: 'Katering Lestari' },
  { id: 'p-4', name: 'Kopi Susu Gula Aren Botol', category: 'Minuman Kantin', price: 15000, stock: 20, status: 'ACTIVE', supplier: 'Kedai Kopi Sahabat' },
  { id: 'p-5', name: 'Bento Ayam Teriyaki Spesial', category: 'Uji Sampel', price: 27000, stock: 0, status: 'IN_REVIEW', supplier: 'Dapur Oishi Mitra' },
  { id: 'p-6', name: 'Dimsum Ayam Jamur (Isi 4)', category: 'Uji Sampel', price: 18000, stock: 0, status: 'REVISION', supplier: 'Dimsum Juara' },
];

/**
 * ProductsView (Halaman Produk) — KK-SCR-006 & KK-SCR-007
 * Manajemen produk toko dan status kurasi kemitraan supplier
 * Dilengkapi Floating Action Button (FAB) pada mobile. Budget: < 200 LOC.
 */
export const ProductsView: React.FC = () => {
  const { navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Katering H-1', 'Toko Same-Day', 'Minuman Kantin', 'Uji Sampel'];

  const filtered = MOCK_PRODUCTS.filter((prod) => {
    const matchSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'ALL' || prod.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Halaman Produk (Mobile & Desktop) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DED5C3]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1F5B45] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Package size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1A2421]">
              Katalog Produk
            </h1>
            <p className="text-xs sm:text-sm font-body text-[#5C6F67]">
              Manajemen etalase toko karyawan dan alur kurasi drop sampel makanan
            </p>
          </div>
        </div>

        {/* Desktop Button Ajukan Produk Baru */}
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/products/new')}
          icon={<Plus size={16} />}
          className="hidden sm:inline-flex"
        >
          Ajukan Produk Baru
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C6F67]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama produk atau supplier mitra..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-[#DED5C3] text-sm font-body text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 focus:ring-[#1F5B45]/30"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-accent font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1F5B45] text-white shadow-xs'
                  : 'bg-[#F8F4EC] text-[#5C6F67] hover:text-[#1F5B45] border border-[#DED5C3]'
              }`}
            >
              {cat === 'ALL' ? 'Semua Produk' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((prod) => (
          <Card key={prod.id} padding="sm" className="space-y-2.5 flex flex-col justify-between hover:shadow-bento-hover">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-accent font-bold px-2 py-0.5 rounded-md bg-[#F3ECDD] text-[#2F6F56] border border-[#DED5C3]">
                  {prod.category}
                </span>
                <StatusBadge status={prod.status} size="sm" />
              </div>
              <h3 className="text-sm sm:text-base font-heading font-bold text-[#1A2421] line-clamp-1">
                {prod.name}
              </h3>
              <p className="text-xs font-body text-[#5C6F67] line-clamp-1">
                Mitra: {prod.supplier}
              </p>
            </div>

            <div className="pt-2 border-t border-[#DED5C3]/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-accent text-[#5C6F67]">Harga Anggota</span>
                <p className="text-sm font-heading font-extrabold text-[#1F5B45]">
                  {formatCurrencyIDR(prod.price)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-accent text-[#5C6F67]">Ketersediaan</span>
                <p className="text-xs font-heading font-bold text-[#1A2421]">
                  {prod.stock > 0 ? `${prod.stock} Porsi` : 'Drop Sampel'}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Mobile Floating Action Button (FAB) */}
      <div className="fixed bottom-20 right-4 z-40 sm:hidden">
        <button
          type="button"
          onClick={() => navigate('/products/new')}
          className="flex items-center gap-2 px-4 py-3 bg-[#1F5B45] hover:bg-[#2F6F56] text-white rounded-full shadow-xl shadow-[#1F5B45]/40 active:scale-95 transition-all font-heading font-bold text-xs ring-2 ring-[#F6CE2C] cursor-pointer"
          aria-label="Ajukan Produk Baru"
        >
          <Plus size={18} className="text-[#F6CE2C]" />
          <span>Ajukan Produk</span>
        </button>
      </div>
    </div>
  );
};
