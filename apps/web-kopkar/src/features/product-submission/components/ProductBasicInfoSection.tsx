import React from 'react';
import { Package, Utensils, Clock, Thermometer } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import type {
  ProductSubmissionFormData,
  SubmissionFormErrors,
  ProductCategory,
  ItemOrigin,
  StorageRecommendation,
} from '../types';

interface ProductBasicInfoSectionProps {
  formData: ProductSubmissionFormData;
  errors: SubmissionFormErrors;
  onChange: <K extends keyof ProductSubmissionFormData>(field: K, value: ProductSubmissionFormData[K]) => void;
}

export const ProductBasicInfoSection: React.FC<ProductBasicInfoSectionProps> = ({
  formData,
  errors,
  onChange,
}) => {
  const categories: { label: ProductCategory; desc: string }[] = [
    { label: 'Katering H-1', desc: 'Pre-order porsi makan siang/malam' },
    { label: 'Toko Same-Day', desc: 'Camilan siap saji di etalase toko' },
    { label: 'Minuman Kantin', desc: 'Kopi, teh kemasan botol/cup' },
    { label: 'Snack & Kue Basah', desc: 'Kue basah, gorengan, jajanan pasar' },
  ];

  const origins: { value: ItemOrigin; label: string; sub: string }[] = [
    { value: 'PRODUKSI_SENDIRI', label: 'Produksi Sendiri', sub: 'Usaha kuliner mandiri / rumahan' },
    { value: 'RESELLER', label: 'Reseller / Distributor', sub: 'Mengambil barang dari produsen lain' },
  ];

  const storages: { value: StorageRecommendation; label: string; icon: string }[] = [
    { value: 'SUHU_RUANG', label: 'Suhu Ruang (25°C)', icon: '🌡️' },
    { value: 'CHILLER', label: 'Kulkas / Dingin (4°C)', icon: '❄️' },
    { value: 'WARMER', label: 'Penghangat / Warmer (60°C)', icon: '♨️' },
  ];

  return (
    <Card padding="md" className="space-y-4">
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#DED5C3]">
        <div className="w-8 h-8 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center flex-shrink-0">
          <Package size={18} />
        </div>
        <div>
          <h3 className="text-base font-heading font-extrabold text-[#1A2421]">
            1. Identitas & Karakteristik Produk
          </h3>
          <p className="text-xs font-body text-[#5C6F67]">
            Rincian barang dagangan yang diajukan untuk etalase koperasi / marketplace
          </p>
        </div>
      </div>

      {/* Nama Produk */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1">
          Nama Produk Jualan <span className="text-[#DC4C70]">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="cth: Bento Ayam Teriyaki Spesial Saus Wijen"
          className={`w-full px-3.5 py-2 rounded-xl bg-white border text-sm font-body text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 ${
            errors.name
              ? 'border-[#DC4C70] focus:ring-[#DC4C70]/30'
              : 'border-[#DED5C3] focus:ring-[#1F5B45]/30'
          }`}
        />
        {errors.name && <p className="text-[11px] font-body text-[#DC4C70] mt-1">{errors.name}</p>}
      </div>

      {/* Kategori Produk */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5">
          Kategori Etalase <span className="text-[#DC4C70]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => onChange('category', cat.label)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                formData.category === cat.label
                  ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-xs'
                  : 'bg-[#F8F4EC] text-[#1A2421] border-[#DED5C3] hover:border-[#1F5B45]/40'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                  formData.category === cat.label ? 'border-white' : 'border-[#5C6F67]'
                }`}
              >
                {formData.category === cat.label && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <div>
                <p className="text-xs font-heading font-bold">{cat.label}</p>
                <p
                  className={`text-[10px] font-body ${
                    formData.category === cat.label ? 'text-white/80' : 'text-[#5C6F67]'
                  }`}
                >
                  {cat.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Asal Barang (KK-REQ-002) */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5">
          Asal Barang Dagangan <span className="text-[#DC4C70]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {origins.map((orig) => (
            <button
              key={orig.value}
              type="button"
              onClick={() => onChange('origin', orig.value)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                formData.origin === orig.value
                  ? 'bg-[#EAF4EE] text-[#1F5B45] border-[#1F5B45] ring-1 ring-[#1F5B45]'
                  : 'bg-white text-[#1A2421] border-[#DED5C3] hover:bg-[#F8F4EC]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                  formData.origin === orig.value ? 'border-[#1F5B45]' : 'border-[#5C6F67]'
                }`}
              >
                {formData.origin === orig.value && (
                  <div className="w-2 h-2 rounded-full bg-[#1F5B45]" />
                )}
              </div>
              <div>
                <p className="text-xs font-heading font-bold">{orig.label}</p>
                <p className="text-[10px] font-body text-[#5C6F67]">{orig.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Komposisi & Deskripsi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1">
            Komposisi Bahan Utama
          </label>
          <input
            type="text"
            value={formData.ingredients}
            onChange={(e) => onChange('ingredients', e.target.value)}
            placeholder="cth: Beras pulen, paha ayam fillet, telur, saus teriyaki"
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DED5C3] text-xs font-body text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 focus:ring-[#1F5B45]/30"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1">
            Masa Kedaluwarsa / Ketahanan <span className="text-[#DC4C70]">*</span>
          </label>
          <div className="relative">
            <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C6F67]" />
            <input
              type="text"
              value={formData.shelfLife}
              onChange={(e) => onChange('shelfLife', e.target.value)}
              placeholder="cth: 24 Jam (Hari ini), 2 Hari, atau 7 Hari"
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white border border-[#DED5C3] text-xs font-body text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 focus:ring-[#1F5B45]/30"
            />
          </div>
        </div>
      </div>

      {/* Saran Penyimpanan */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5 flex items-center gap-1.5">
          <Thermometer size={14} className="text-[#1F5B45]" />
          <span>Saran Suhu Penyimpanan di Toko Koperasi</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {storages.map((st) => (
            <button
              key={st.value}
              type="button"
              onClick={() => onChange('storage', st.value)}
              className={`p-2 rounded-xl border text-center transition-all cursor-pointer text-xs font-accent font-bold ${
                formData.storage === st.value
                  ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-xs'
                  : 'bg-white text-[#5C6F67] border-[#DED5C3] hover:text-[#1F5B45]'
              }`}
            >
              <span className="mr-1">{st.icon}</span>
              <span>{st.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Deskripsi Singkat */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1 flex items-center gap-1.5">
          <Utensils size={14} className="text-[#1F5B45]" />
          <span>Deskripsi Produk & Saran Penyajian</span>
        </label>
        <textarea
          rows={2}
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Jelaskan cita rasa makanan, ukuran porsi, atau kemasan ramah lingkungan..."
          className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#DED5C3] text-xs font-body text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 focus:ring-[#1F5B45]/30"
        />
      </div>
    </Card>
  );
};
