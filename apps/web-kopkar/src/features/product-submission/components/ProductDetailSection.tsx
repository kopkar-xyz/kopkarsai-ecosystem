import React, { useState } from 'react';
import { Package, Plus, X, Clock, ChefHat, Truck, FileText, Camera, CheckCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import type {
  CompleteSubmissionFormData,
  SubmissionFormErrors,
  ProductKind,
  ItemOrigin,
} from '../types';

interface ProductDetailSectionProps {
  formData: CompleteSubmissionFormData;
  errors: SubmissionFormErrors;
  onChange: <K extends keyof CompleteSubmissionFormData>(
    field: K,
    value: CompleteSubmissionFormData[K]
  ) => void;
  onAddIngredient: (ingredient: string) => boolean;
  onRemoveIngredient: (index: number) => void;
  onImageSelect: (file: File) => boolean;
  onRemoveImage: () => void;
}

export const ProductDetailSection: React.FC<ProductDetailSectionProps> = ({
  formData,
  errors,
  onChange,
  onAddIngredient,
  onRemoveIngredient,
  onImageSelect,
  onRemoveImage,
}) => {
  const [ingredientInput, setIngredientInput] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const productKinds: ProductKind[] = [
    'Gorengan',
    'Jajanan Basah',
    'Jajanan Kering',
    'Keripik / Kerupuk',
    'Jajanan Buah',
    'Minuman (Es)',
    'Minuman (Non Es)',
    'Lain-lain',
  ];

  const origins: { value: ItemOrigin; label: string; desc: string }[] = [
    { value: 'BUAT_SENDIRI', label: 'Buat Sendiri', desc: 'Produksi usaha mandiri / dapur rumahan' },
    { value: 'SUPPLY_ORANG', label: 'Supply dari Orang', desc: 'Mitra reseller / dari produsen luar' },
  ];

  const handleKeyDownIngredient = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (ingredientInput.trim()) {
        const added = onAddIngredient(ingredientInput.trim());
        if (added) setIngredientInput('');
      }
    }
  };

  const handleAddIngredientClick = () => {
    if (ingredientInput.trim()) {
      const added = onAddIngredient(ingredientInput.trim());
      if (added) setIngredientInput('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <Card padding="md" className="space-y-4">
      {/* Header Section */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#DED5C3]">
        <div className="w-8 h-8 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center flex-shrink-0">
          <Package size={18} />
        </div>
        <div>
          <h3 className="text-base font-heading font-extrabold text-[#1A2421]">
            2. Data & Karakteristik Produk
          </h3>
          <p className="text-xs font-body text-[#5C6F67]">
            Identitas barang, kategori titipan, komposisi bahan, dan 1 foto produk
          </p>
        </div>
      </div>

      {/* Jenis Produk yang Dititipkan (Pilih Salah Satu) */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5">
          Jenis Produk yang Dititipkan <span className="text-[#DC4C70]">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {productKinds.map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => onChange('productType', kind)}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer text-xs font-heading font-bold ${
                formData.productType === kind
                  ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-xs'
                  : 'bg-[#F8F4EC] text-[#1A2421] border-[#DED5C3] hover:border-[#1F5B45]/40'
              }`}
            >
              {kind}
            </button>
          ))}
        </div>
      </div>

      {/* Nama Barang & Asal Barang */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nama Barang */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1">
            Nama Barang <span className="text-[#DC4C70]">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="cth: Risoles Rogout Ayam Sayur Gurih"
            className={`w-full px-3.5 py-2 rounded-xl bg-white border text-sm font-body text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 ${
              errors.name
                ? 'border-[#DC4C70] focus:ring-[#DC4C70]/30'
                : 'border-[#DED5C3] focus:ring-[#1F5B45]/30'
            }`}
          />
          {errors.name && <p className="text-[11px] font-body text-[#DC4C70] mt-1">{errors.name}</p>}
        </div>

        {/* Asal Barang (Buat Sendiri vs Supply dari Orang) */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1">
            Asal Barang <span className="text-[#DC4C70]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {origins.map((orig) => (
              <button
                key={orig.value}
                type="button"
                onClick={() => onChange('origin', orig.value)}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  formData.origin === orig.value
                    ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-xs'
                    : 'bg-[#F8F4EC] text-[#1A2421] border-[#DED5C3] hover:border-[#1F5B45]/40'
                }`}
              >
                <p className="text-xs font-heading font-bold">{orig.label}</p>
                <p
                  className={`text-[10px] font-body truncate ${
                    formData.origin === orig.value ? 'text-white/80' : 'text-[#5C6F67]'
                  }`}
                >
                  {orig.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Waktu & Durasi Produksi (Jam Pembuatan, Lama Pembuatan, Rentang Waktu Pengiriman) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
        {/* Jam Pembuatan */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1 flex items-center gap-1.5">
            <Clock size={14} className="text-[#1F5B45]" />
            <span>Jam Pembuatan Produk <span className="text-[#DC4C70]">*</span></span>
          </label>
          <input
            type="time"
            value={formData.productionTime}
            onChange={(e) => onChange('productionTime', e.target.value)}
            className={`w-full px-3 py-2 rounded-xl bg-white border text-sm font-heading font-bold text-[#1A2421] focus:outline-none focus:ring-2 ${
              errors.productionTime
                ? 'border-[#DC4C70] focus:ring-[#DC4C70]/30'
                : 'border-[#DED5C3] focus:ring-[#1F5B45]/30'
            }`}
          />
          {errors.productionTime ? (
            <p className="text-[11px] font-body text-[#DC4C70] mt-1">{errors.productionTime}</p>
          ) : (
            <p className="text-[10px] font-body text-[#5C6F67] mt-1">Waktu produk selesai dimasak</p>
          )}
        </div>

        {/* Lama Pembuatan */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1 flex items-center gap-1.5">
            <ChefHat size={14} className="text-[#1F5B45]" />
            <span>Lama Pembuatan</span>
          </label>
          <input
            type="text"
            value={formData.productionDuration}
            onChange={(e) => onChange('productionDuration', e.target.value)}
            placeholder="cth: 1.5 Jam / 45 Menit"
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#DED5C3] text-sm font-body text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 focus:ring-[#1F5B45]/30"
          />
          <p className="text-[10px] font-body text-[#5C6F67] mt-1">Durasi proses pengolahan</p>
        </div>

        {/* Rentang Waktu Pengiriman */}
        <div>
          <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1 flex items-center gap-1.5">
            <Truck size={14} className="text-[#1F5B45]" />
            <span>Rentang Waktu Kirim</span>
          </label>
          <input
            type="text"
            value={formData.deliveryTimeWindow}
            onChange={(e) => onChange('deliveryTimeWindow', e.target.value)}
            placeholder="cth: 06:00 - 06:45 WIB"
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#DED5C3] text-sm font-body text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 focus:ring-[#1F5B45]/30"
          />
          <p className="text-[10px] font-body text-[#5C6F67] mt-1">Estimasi tiba di toko koperasi</p>
        </div>
      </div>

      {/* Komposisi Barang (Interactive Tag Input: Enter -> List bertambah, 'x' -> berkurang) */}
      <div className="pt-1">
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ChefHat size={14} className="text-[#1F5B45]" />
            <span>Komposisi Barang (Bahan) <span className="text-[#DC4C70]">*</span></span>
          </span>
          <span className="text-[11px] font-body text-[#5C6F67]">
            {formData.ingredients.length} bahan terdaftar
          </span>
        </label>

        {/* Input box + Add Button */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={handleKeyDownIngredient}
              placeholder="Ketik nama bahan lalu tekan Enter (cth: Daging Ayam Fillet, Wortel, Susu)"
              className={`w-full px-3.5 py-2 rounded-xl bg-white border text-sm font-body text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 ${
                errors.ingredientsInput
                  ? 'border-[#DC4C70] focus:ring-[#DC4C70]/30'
                  : 'border-[#DED5C3] focus:ring-[#1F5B45]/30'
              }`}
            />
          </div>
          <button
            type="button"
            onClick={handleAddIngredientClick}
            className="px-3.5 py-2 rounded-xl bg-[#1F5B45] hover:bg-[#2F6F56] text-white text-xs font-heading font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Tambah</span>
          </button>
        </div>

        {errors.ingredientsInput && (
          <p className="text-[11px] font-body text-[#DC4C70] mt-1">{errors.ingredientsInput}</p>
        )}

        {/* Chips / Badges List */}
        <div className="flex flex-wrap gap-2 mt-2.5 min-h-[36px] p-2 bg-[#F8F4EC] rounded-xl border border-[#DED5C3]/70">
          {formData.ingredients.length === 0 ? (
            <span className="text-xs text-[#8FA39A] italic py-0.5 px-1">
              Belum ada komposisi bahan. Ketik bahan di atas lalu tekan Enter.
            </span>
          ) : (
            formData.ingredients.map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#1F5B45] border border-[#A9C3A2] text-xs font-heading font-bold shadow-xs animate-in fade-in"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => onRemoveIngredient(idx)}
                  className="w-4 h-4 rounded-full hover:bg-[#DC4C70]/15 text-[#5C6F67] hover:text-[#DC4C70] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={`Hapus ${item}`}
                >
                  <X size={12} />
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Foto Produk (1 Foto Produk) */}
      <div className="pt-1">
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Camera size={14} className="text-[#1F5B45]" />
            <span>1 Foto Produk / Kemasan</span>
          </span>
          <span className="text-[11px] font-body text-[#5C6F67]">Maks. 3 MB (JPG, PNG, WEBP)</span>
        </label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        {formData.imagePreviewUrl ? (
          <div className="p-3 bg-[#F8F4EC] rounded-2xl border border-[#DED5C3] flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-white border border-[#DED5C3] flex-shrink-0 shadow-xs">
              <img
                src={formData.imagePreviewUrl}
                alt="Preview Produk"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-heading font-bold text-[#1F5B45]">
                <CheckCircle size={15} />
                <span>Foto Berhasil Diunggah</span>
              </div>
              <p className="text-xs font-heading font-bold text-[#1A2421] truncate max-w-xs">
                {formData.imageFile?.name || 'foto-produk.jpg'}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1 rounded-xl bg-white hover:bg-[#F3ECDD] text-xs font-heading font-bold text-[#1F5B45] border border-[#DED5C3] transition-colors cursor-pointer"
                >
                  Ganti Foto
                </button>
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="px-3 py-1 rounded-xl bg-[#DC4C70]/10 hover:bg-[#DC4C70]/20 text-xs font-heading font-bold text-[#DC4C70] border border-[#DC4C70]/30 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <X size={13} />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-4 rounded-2xl border-2 border-dashed border-[#DED5C3] hover:border-[#1F5B45] bg-[#F8F4EC]/60 hover:bg-[#EAF4EE]/30 transition-colors text-center cursor-pointer space-y-1.5"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-[#DED5C3] text-[#1F5B45] flex items-center justify-center mx-auto shadow-xs">
              <Camera size={20} />
            </div>
            <p className="text-xs font-heading font-bold text-[#1A2421]">
              Klik untuk mengunggah 1 foto produk
            </p>
            <p className="text-[11px] font-body text-[#5C6F67]">
              Foto kemasan atau sajian produk yang jelas, pencahayaan baik
            </p>
          </div>
        )}
        {errors.imageFile && (
          <p className="text-[11px] font-body text-[#DC4C70] mt-1">{errors.imageFile}</p>
        )}
      </div>

      {/* Keterangan Tambahan (Textbox) */}
      <div className="pt-1">
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1 flex items-center gap-1.5">
          <FileText size={14} className="text-[#1F5B45]" />
          <span>Keterangan Tambahan</span>
        </label>
        <textarea
          rows={3}
          value={formData.additionalNotes}
          onChange={(e) => onChange('additionalNotes', e.target.value)}
          placeholder="Tuliskan catatan tambahan (cth: petunjuk simpan di chiller/penghangat, informasi alergen kacang/udang, atau saus terpisah)..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DED5C3] text-sm font-body text-[#1A2421] placeholder-[#8FA39A] focus:outline-none focus:ring-2 focus:ring-[#1F5B45]/30 resize-none"
        />
      </div>
    </Card>
  );
};
