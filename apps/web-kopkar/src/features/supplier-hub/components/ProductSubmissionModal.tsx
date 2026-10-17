import React, { useState } from 'react';
import { Camera, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { formatCurrencyIDR } from '../../../lib/utils';

interface ProductSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (productName: string) => void;
}

export const ProductSubmissionModal: React.FC<ProductSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState<'KATERING' | 'TOKO'>('KATERING');
  const [origin, setOrigin] = useState<'PRODUKSI_SENDIRI' | 'RESELLER'>('PRODUKSI_SENDIRI');
  const [costPrice, setCostPrice] = useState<number>(12000); // HPP
  const [salePrice, setSalePrice] = useState<number>(15000); // Usulan
  const [dropDay, setDropDay] = useState('RABU_SHIFT_A');
  const [dropLoc, setDropLoc] = useState('SAI_B');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto calculate profit margin
  const marginNominal = salePrice - costPrice;
  const marginPercent = costPrice > 0 ? Math.round((marginNominal / costPrice) * 100) : 0;
  const isMarginValid = marginNominal > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || !isMarginValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(productName);
      onClose();
      // Reset form
      setProductName('');
      setCostPrice(12000);
      setSalePrice(15000);
    }, 700);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Formulir Pengajuan Produk Baru"
      subtitle="Pendaftaran kurasi sampel makanan/minuman mitra KOPKARSAI"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Nama Produk */}
        <div className="space-y-1">
          <label className="font-bold text-kopkar-dark block">Nama Produk</label>
          <input
            type="text"
            required
            placeholder="Contoh: Pastel Rogout Ayam Premium"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-kopkar-primary focus:outline-none"
          />
        </div>

        {/* Kategori & Asal Barang */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="font-bold text-kopkar-dark block">Kategori Produk</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-kopkar-primary focus:outline-none bg-white"
            >
              <option value="KATERING">Katering Basah (H-1)</option>
              <option value="TOKO">Produk Toko Fisik</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-kopkar-dark block">Asal Barang</label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-kopkar-primary focus:outline-none bg-white"
            >
              <option value="PRODUKSI_SENDIRI">Produksi Sendiri</option>
              <option value="RESELLER">Reseller / Mitra Luar</option>
            </select>
          </div>
        </div>

        {/* HPP vs Usulan Harga Jual */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block text-[11px]">HPP (Biaya Modal):</label>
              <input
                type="number"
                min={1000}
                step={500}
                required
                value={costPrice}
                onChange={(e) => setCostPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs font-bold text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block text-[11px]">Usulan Harga Jual:</label>
              <input
                type="number"
                min={1000}
                step={500}
                required
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs font-bold text-kopkar-primary"
              />
            </div>
          </div>

          {/* Real-time Margin Calculator Result */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px]">
            <span className="text-slate-500">Estimasi Margin Laba:</span>
            <span
              className={`font-mono font-bold ${isMarginValid ? 'text-emerald-700' : 'text-rose-600'
                }`}
            >
              {formatCurrencyIDR(marginNominal)} ({marginPercent}%)
            </span>
          </div>
        </div>

        {/* Jadwal & Lokasi Drop Sampel (KK-DEC-003) */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="font-bold text-kopkar-dark block">Jadwal Drop Sampel</label>
            <select
              value={dropDay}
              onChange={(e) => setDropDay(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-kopkar-primary focus:outline-none bg-white"
            >
              <option value="SELASA_SHIFT_A">Selasa - Shift A</option>
              <option value="SELASA_SHIFT_B">Selasa - Shift B</option>
              <option value="RABU_SHIFT_A">Rabu - Shift A</option>
              <option value="RABU_SHIFT_B">Rabu - Shift B</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-kopkar-dark block">Lokasi Uji</label>
            <select
              value={dropLoc}
              onChange={(e) => setDropLoc(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-kopkar-primary focus:outline-none bg-white"
            >
              <option value="SAI_B">SAI B (Kantin Barat)</option>
              <option value="SAI_T">SAI T (Koperasi Timur)</option>
            </select>
          </div>
        </div>

        {/* Upload Foto Placeholder */}
        <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-1 hover:border-kopkar-primary transition-colors cursor-pointer bg-slate-50/50">
          <Camera size={22} className="mx-auto text-slate-400" />
          <span className="text-[11px] font-bold text-kopkar-dark block">
            Unggah Foto Sampel Produk
          </span>
          <span className="text-[9px] text-slate-400 block">
            Format JPG/PNG, maksimal 3 MB (Disimpan di S3 Biznet NEO)
          </span>
        </div>

        {/* Submit Actions */}
        <div className="pt-2 flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Batal
          </Button>
          <Button
            variant="primary"
            size="md"
            type="submit"
            isLoading={isSubmitting}
            disabled={!productName.trim() || !isMarginValid}
          >
            Kirim Pengajuan Produk
          </Button>
        </div>
      </form>
    </Modal>
  );
};
