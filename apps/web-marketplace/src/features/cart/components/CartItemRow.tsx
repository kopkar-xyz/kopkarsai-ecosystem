import React, { useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface CartItemRowProps {
  item: CartItem;
  note?: string;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onSaveNote: (productId: string, noteText: string) => void;
}

/**
 * CartItemRow — Baris Item Keranjang Belanja
 * Slicing 1:1 persis referensi media_1795408088697_91b46b01.png
 * Foto terkunci 56x56 px (w-14 h-14), tipografi bersih, no-overflow.
 * Budget: < 200 LOC.
 */
export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  note,
  onUpdateQuantity,
  onSaveNote,
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [draftNote, setDraftNote] = useState(note || '');

  const formatPrice = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const handleSave = () => {
    onSaveNote(item.product.id, draftNote);
    setIsEditingNote(false);
  };

  return (
    <div className="pb-4 border-b border-[#EAE3D5] flex gap-3.5 items-start select-none w-full">
      {/* Gambar Produk: Ukuran Terkunci 56x56 px */}
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-14 h-14 min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-xl object-cover bg-[#FAF6F0] border border-[#EAE3D5] shrink-0 shadow-2xs"
        loading="lazy"
      />

      <div className="flex-1 min-w-0 space-y-2">
        {/* Judul & Harga Total */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-semibold text-xs sm:text-[13px] text-[#1A1615] truncate">
              {item.product.name}
            </h4>
            <p className="text-[11px] text-[#8C827A] mt-0.5">
              {formatPrice(item.product.price)} per pcs
            </p>
          </div>
          <span className="font-semibold text-xs sm:text-[13px] text-[#1A1615] tabular-nums shrink-0 pt-0.5">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>

        {/* Stepper & Hapus Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center border border-[#EAE3D5] rounded-xl bg-white px-2 py-0.5 gap-2.5 shadow-2xs">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.product.id, -1)}
              className="w-5 h-5 flex items-center justify-center text-[#1A1615] hover:text-[#83273B] cursor-pointer active:scale-90 transition-all"
              aria-label="Kurangi jumlah"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-semibold text-xs text-[#1A1615] tabular-nums min-w-3 text-center">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.product.id, 1)}
              className="w-5 h-5 flex items-center justify-center text-[#1A1615] hover:text-[#83273B] cursor-pointer active:scale-90 transition-all"
              aria-label="Tambah jumlah"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onUpdateQuantity(item.product.id, -item.quantity)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl border border-[#EAE3D5] bg-white hover:bg-[#FDF0F3] text-[#83273B] text-[11px] font-medium transition-colors cursor-pointer shadow-2xs active:scale-95"
          >
            <Trash2 className="w-3 h-3 text-[#83273B]" />
            <span>Hapus</span>
          </button>
        </div>

        {/* Input Catatan Khusus */}
        <div className="pt-0.5">
          {isEditingNote ? (
            <div className="space-y-2 pt-1">
              <input
                type="text"
                placeholder="Catatan, mis. tanpa sambal"
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                autoFocus
                className="w-full text-xs px-3.5 py-2 bg-white border border-[#83273B] rounded-xl text-[#1A1615] placeholder:text-[#8C827A] focus:outline-none focus:ring-1 focus:ring-[#83273B] transition-all"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-1.5 rounded-xl bg-[#781D32] hover:bg-[#631427] active:scale-95 text-white text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingNote(false)}
                  className="px-4 py-1.5 rounded-xl border border-[#EAE3D5] bg-white hover:bg-[#FAF6F0] active:scale-95 text-[#1A1615] text-xs font-medium transition-all cursor-pointer shadow-2xs"
                >
                  Batal
                </button>
              </div>
            </div>
          ) : note ? (
            <div className="bg-[#FAF6F0] rounded-xl px-3.5 py-2 flex items-center justify-between gap-2 text-xs">
              <span className="text-[#665E60] truncate">Catatan: {note}</span>
              <button
                type="button"
                onClick={() => { setDraftNote(note); setIsEditingNote(true); }}
                className="text-[#83273B] font-semibold shrink-0 hover:underline cursor-pointer"
              >
                Ubah
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => { setDraftNote(''); setIsEditingNote(true); }}
              className="text-xs font-semibold text-[#83273B] hover:underline cursor-pointer transition-colors"
            >
              + Tambah catatan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
