import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { OrderItem } from '../../../types/order';

interface ProductSubstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  item: OrderItem | null;
  onConfirmSubstitution: (orderId: string, itemId: string, resolutionNote: string) => void;
}

/**
 * ProductSubstitutionModal — Modal Penanganan Stok Habis & Negosiasi Kasir
 * Presisi sesuai media_1795503724067_1c6a562e.png. Budget: < 200 LOC.
 */
export const ProductSubstitutionModal: React.FC<ProductSubstitutionModalProps> = ({
  isOpen,
  onClose,
  orderId,
  item,
  onConfirmSubstitution,
}) => {
  const [resolutionType, setResolutionType] = useState<'SUBSTITUTE' | 'REFUND'>('SUBSTITUTE');
  const [replacementName, setReplacementName] = useState('');
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setResolutionType('SUBSTITUTE');
      setReplacementName('');
      setNoteText('');
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    let finalNote = '';
    if (resolutionType === 'SUBSTITUTE') {
      finalNote = `Substitusi: ${replacementName || 'Menu alternatif'} (${noteText || 'Disepakati'})`;
    } else {
      finalNote = `Refund tunai Rp ${(item.price * item.quantity).toLocaleString('id-ID')} (${noteText || 'Kasir'})`;
    }
    onConfirmSubstitution(orderId, item.id, finalNote);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] bg-[#FFFDF9] border border-[#EAE3D5] rounded-3xl shadow-2xl p-5 sm:p-6 space-y-4 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Tombol Tutup */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-brush text-2xl sm:text-3xl text-[#83273B] font-semibold leading-tight">
              Stok habis
            </h2>
            <p className="text-xs text-[#665E60] mt-1 leading-relaxed">
              Pilih cara menyelesaikannya, lalu catat kesepakatan dengan pembeli.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF6F0] hover:bg-[#EAE3D5] border border-[#EAE3D5] flex items-center justify-center text-[#1A1615] cursor-pointer transition-colors shrink-0"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Barang yang Tidak Tersedia */}
        <div className="bg-[#FAF6F0] rounded-2xl p-3 border border-[#EAE3D5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-11 h-11 rounded-xl object-cover border border-[#EAE3D5] shrink-0"
            />
            <div>
              <span className="font-bold text-xs text-[#1A1615] block">
                {item.quantity} × {item.name}
              </span>
              <span className="text-[11px] text-[#7A716B] block">Tidak tersedia di rak</span>
            </div>
          </div>
          <span className="font-bold text-xs text-[#1A1615] shrink-0 tabular-nums">
            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
          </span>
        </div>

        {/* Pilihan Cara Penanganan (2 Kolom) */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setResolutionType('SUBSTITUTE')}
            className={`p-3 rounded-2xl text-left transition-all cursor-pointer ${
              resolutionType === 'SUBSTITUTE'
                ? 'border-2 border-[#83273B] bg-white shadow-2xs'
                : 'border border-[#EAE3D5] bg-white hover:bg-[#FAF6F0]'
            }`}
          >
            <span className="font-bold text-xs text-[#1A1615] block">Ganti produk</span>
            <span className="text-[11px] text-[#665E60] block mt-0.5">Dengan menu seharga</span>
          </button>

          <button
            type="button"
            onClick={() => setResolutionType('REFUND')}
            className={`p-3 rounded-2xl text-left transition-all cursor-pointer ${
              resolutionType === 'REFUND'
                ? 'border-2 border-[#83273B] bg-white shadow-2xs'
                : 'border border-[#EAE3D5] bg-white hover:bg-[#FAF6F0]'
            }`}
          >
            <span className="font-bold text-xs text-[#1A1615] block">Refund tunai</span>
            <span className="text-[11px] text-[#665E60] block mt-0.5">Dikembalikan di kasir</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleApply} className="space-y-3 pt-1 text-xs">
          {resolutionType === 'SUBSTITUTE' && (
            <div className="space-y-1">
              <label className="font-semibold text-[#1A1615] block">Produk pengganti</label>
              <input
                type="text"
                placeholder="Contoh: Kue cucur"
                value={replacementName}
                onChange={(e) => setReplacementName(e.target.value)}
                className="w-full h-11 px-3.5 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] placeholder:text-[#8C827A] focus:outline-none focus:border-[#83273B]"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="font-semibold text-[#1A1615] block">
              Catatan kesepakatan <span className="text-[#8C827A] font-normal">(opsional)</span>
            </label>
            <input
              type="text"
              placeholder="Mis. sudah dikabari lewat WhatsApp, pembeli setuju"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full h-11 px-3.5 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] placeholder:text-[#8C827A] focus:outline-none focus:border-[#83273B]"
            />
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#83273B] hover:bg-[#681E2E] active:scale-98 text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
            >
              Simpan penanganan
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl bg-white border border-[#EAE3D5] hover:bg-[#FAF6F0] text-xs font-semibold text-[#1A1615] cursor-pointer transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
