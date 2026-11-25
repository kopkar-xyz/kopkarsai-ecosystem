import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { CompanyUnit } from '../types';

interface AvailableProduct {
  name: string;
  category: string;
  unitPrice: number;
  supplier?: string;
}

const AVAILABLE_PRODUCTS: AvailableProduct[] = [
  { name: 'Nasi Kotak Ayam Bakar Madu', category: 'Makanan Basah', unitPrice: 25000, supplier: 'Dapur Oishi Mitra' },
  { name: 'Es Teh Manis Melati', category: 'Minuman Kantin', unitPrice: 5000, supplier: 'Produksi Sendiri' },
  { name: 'Roti Gandum Cokelat', category: 'Toko Same-Day', unitPrice: 14000, supplier: 'Produksi Sendiri' },
  { name: 'Susu UHT Full Cream 250ml', category: 'Toko Same-Day', unitPrice: 8500, supplier: 'Produksi Sendiri' },
  { name: 'Kopi Susu Gula Aren Botol', category: 'Minuman Kantin', unitPrice: 15000, supplier: 'Kedai Kopi Sahabat' },
  { name: 'Snack Box Rapat GA', category: 'Makanan Basah', unitPrice: 15000, supplier: 'Snack Mitra Mandiri' },
  { name: 'Bento Ayam Teriyaki', category: 'Makanan Basah', unitPrice: 22000, supplier: 'Dapur Oishi Mitra' },
  { name: 'Air Mineral 600ml', category: 'Toko Same-Day', unitPrice: 3500, supplier: 'Produksi Sendiri' },
];

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: {
    productName: string;
    category: string;
    quantity: number;
    unitPrice: number;
    companyUnit: CompanyUnit;
    supplier?: string;
    notes?: string;
  }) => void;
  defaultCompany?: CompanyUnit;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultCompany = 'SAI-B',
}) => {
  const [selectedProductIdx, setSelectedProductIdx] = useState(0);
  const [companyUnit, setCompanyUnit] = useState<CompanyUnit>(defaultCompany);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const currentProduct = AVAILABLE_PRODUCTS[selectedProductIdx];
  const totalPrice = currentProduct.unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      productName: currentProduct.name,
      category: currentProduct.category,
      quantity,
      unitPrice: currentProduct.unitPrice,
      companyUnit,
      supplier: currentProduct.supplier || 'Produksi Sendiri',
      notes: notes.trim() || undefined,
    });
    setQuantity(1);
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#EAE4D3] p-5 sm:p-6 shadow-2xl space-y-4">
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DED5C3]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#1F5B45] text-white flex items-center justify-center">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className="text-base font-heading font-extrabold text-[#1A2421]">Pesan Produk</h3>
              <p className="text-xs font-body text-[#5C6F67]">Pemesanan produk Koperasi SAI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[#F3ECDD] text-[#5C6F67] hover:text-[#1A2421] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pilih Produk */}
          <div>
            <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5">
              Pilih Produk
            </label>
            <select
              value={selectedProductIdx}
              onChange={(e) => setSelectedProductIdx(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-[#F8F4EC] border border-[#DED5C3] text-sm font-heading font-bold text-[#1A2421] focus:ring-2 focus:ring-[#1F5B45]/20 focus:outline-none"
            >
              {AVAILABLE_PRODUCTS.map((prod, idx) => (
                <option key={prod.name} value={idx}>
                  {prod.name} — {formatCurrencyIDR(prod.unitPrice)} ({prod.category})
                </option>
              ))}
            </select>
          </div>

          {/* Unit Perusahaan (SAI-T / SAI-B) */}
          <div>
            <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5">
              Unit Perusahaan (Tag)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['SAI-B', 'SAI-T'] as const).map((unit) => (
                <button
                  type="button"
                  key={unit}
                  onClick={() => setCompanyUnit(unit)}
                  className={`py-2 px-3 rounded-xl text-xs font-accent font-bold transition-all border ${
                    companyUnit === unit
                      ? unit === 'SAI-B'
                        ? 'bg-[#EAF4EE] text-[#1F5B45] border-[#1F5B45] shadow-xs'
                        : 'bg-[#FEF6DC] text-[#B45309] border-[#B45309] shadow-xs'
                      : 'bg-[#F8F4EC] text-[#5C6F67] border-[#DED5C3] hover:bg-[#F3ECDD]'
                  }`}
                >
                  Unit {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="flex items-center justify-between py-2 border-y border-[#DED5C3]/60">
            <span className="text-xs font-heading font-bold text-[#1A2421]">Jumlah Pesanan</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-8 h-8 rounded-xl bg-[#F3ECDD] hover:bg-[#EAF4EE] border border-[#DED5C3] flex items-center justify-center text-[#1F5B45] font-bold"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-heading font-extrabold text-sm text-[#1A2421]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-8 h-8 rounded-xl bg-[#F3ECDD] hover:bg-[#EAF4EE] border border-[#DED5C3] flex items-center justify-center text-[#1F5B45] font-bold"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1">
              Catatan Khusus (Opsional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Antar sebelum jam istirahat siang..."
              className="w-full px-3 py-2 rounded-xl bg-[#F8F4EC] border border-[#DED5C3] text-xs font-body text-[#1A2421] focus:ring-2 focus:ring-[#1F5B45]/20 focus:outline-none"
            />
          </div>

          {/* Total & Submit */}
          <div className="pt-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-accent text-[#5C6F67]">Total Pembayaran</p>
              <p className="text-base font-heading font-extrabold text-[#1F5B45]">
                {formatCurrencyIDR(totalPrice)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Kirim Pesanan
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
