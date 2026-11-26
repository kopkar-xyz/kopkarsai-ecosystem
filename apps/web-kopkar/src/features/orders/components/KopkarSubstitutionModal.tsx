import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { KopkarOrderItem } from '../data/kopkarOrdersData';

interface KopkarSubstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  item: KopkarOrderItem | null;
  onConfirmSubstitution: (orderId: string, itemId: string, note: string) => void;
}

export const KopkarSubstitutionModal: React.FC<KopkarSubstitutionModalProps> = ({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const note =
      resolutionType === 'SUBSTITUTE'
        ? `Substitusi: ${replacementName || 'Menu alternatif'} (${noteText || 'Disepakati'})`
        : `Refund Rp ${(item.price * item.quantity).toLocaleString('id-ID')} (${noteText || 'Kasir'})`;
    onConfirmSubstitution(orderId, item.id, note);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn select-none"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[420px] max-h-[90dvh] overflow-y-auto bg-white border border-[#EAE4D3] rounded-3xl shadow-2xl p-5 sm:p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-[18px] font-semibold text-[#18221D]">Informasi Stok Habis</h2>
            <p className="text-[12px] text-[#7A867E] mt-0.5">
              Catat kesepakatan penggantian produk atau refund dengan pembeli.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7EE] border border-[#EAE4D3] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded-2xl bg-[#FAF8F2] border border-[#EAE4D3] flex items-center justify-between gap-3 text-[12px]">
          <div>
            <div className="font-semibold text-[#18221D]">
              {item.quantity} × {item.name}
            </div>
            <div className="text-[11px] text-[#7A867E]">Stok fisik rak kosong</div>
          </div>
          <span className="font-semibold tabular-nums">
            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {(
            [
              { key: 'SUBSTITUTE', title: 'Ganti Produk', desc: 'Menu pengganti setara' },
              { key: 'REFUND', title: 'Refund Tunai', desc: 'Kembalikan dana item' },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setResolutionType(opt.key)}
              className={`p-3 rounded-2xl text-left border cursor-pointer ${
                resolutionType === opt.key
                  ? 'border-[#165239] bg-[#EAF4EE]/45'
                  : 'border-[#EAE4D3] bg-white'
              }`}
            >
              <div className="text-[12.5px] font-semibold text-[#18221D]">{opt.title}</div>
              <div className="text-[11px] text-[#7A867E] mt-0.5">{opt.desc}</div>
            </button>
          ))}
        </div>

        {resolutionType === 'SUBSTITUTE' && (
          <div>
            <label className="block text-[12px] font-medium text-[#18221D] mb-1">
              Nama Menu Pengganti
            </label>
            <input
              type="text"
              value={replacementName}
              onChange={(e) => setReplacementName(e.target.value)}
              placeholder="cth: Snack Box Lemper"
              className="w-full h-10 px-3 rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] text-[12.5px]"
            />
          </div>
        )}

        <div>
          <label className="block text-[12px] font-medium text-[#18221D] mb-1">
            Catatan Konfirmasi Pembeli
          </label>
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="cth: Sudah dikonfirmasi via WA"
            className="w-full h-10 px-3 rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] text-[12.5px]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-[#165239] hover:bg-[#11402c] text-white text-[13px] font-semibold cursor-pointer"
        >
          Simpan Penyesuaian Stok
        </button>
      </form>
    </div>
  );
};
