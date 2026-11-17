import React from 'react';
import { HelpCircle, X, Phone, MessageSquare, MapPin } from 'lucide-react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * HelpSupportModal — Dialog Pusat Bantuan Kantin & Koperasi
 * Budget: < 200 LOC.
 */
export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-[#EAE3D5] overflow-hidden animate-in fade-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#781B2E] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#FFD967]" />
            <div>
              <h3 className="font-heading font-bold text-sm">Pusat Bantuan Kantin</h3>
              <p className="text-[10px] text-white/75 font-kanji">和食 サポートデスク</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer border-none"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-3.5 text-xs text-[#1A1615]">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF6F0] border border-[#EAE3D5]">
            <Phone className="w-4 h-4 text-[#83273B] shrink-0 mt-0.5" />
            <div>
              <p className="font-heading font-bold text-[#83273B]">Ext. Kantin & Telepon</p>
              <p className="text-[#665E60] mt-0.5">#4421 / (021) 8983-KOP</p>
              <p className="text-[10px] text-[#665E60] mt-0.5">Senin - Jumat: 07:30 - 19:30 WIB</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF6F0] border border-[#EAE3D5]">
            <MessageSquare className="w-4 h-4 text-[#2E6B4F] shrink-0 mt-0.5" />
            <div>
              <p className="font-heading font-bold text-[#2E6B4F]">WhatsApp Helpdesk Anggota</p>
              <p className="text-[#665E60] mt-0.5">+62 812-3456-7890 (KopKar Care)</p>
              <p className="text-[10px] text-[#665E60] mt-0.5">Respon cepat untuk pertanyaan menu & pesanan</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF6F0] border border-[#EAE3D5]">
            <MapPin className="w-4 h-4 text-[#83273B] shrink-0 mt-0.5" />
            <div>
              <p className="font-heading font-bold text-[#83273B]">Lokasi Counter Kantin</p>
              <p className="text-[#665E60] mt-0.5">Lantai 2 Gedung Serbaguna PT SAI</p>
              <p className="text-[10px] text-[#665E60] mt-0.5">Ambil pesanan atau makan di tempat</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#FDF0F3] border border-[#FCE4E9] text-[11px] text-[#83273B]">
            <p className="font-heading font-bold">Ketentuan Pemesanan Kantin:</p>
            <p className="text-[#665E60] mt-0.5">Pemesanan jajanan dan katering dapat diambil langsung di counter kasir lantai 2 menggunakan sistem checklist kasir.</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[#FAF6F0] border-t border-[#EAE3D5] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#83273B] text-white font-heading font-bold text-xs hover:bg-[#6e1e2f] transition-colors cursor-pointer border-none"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

