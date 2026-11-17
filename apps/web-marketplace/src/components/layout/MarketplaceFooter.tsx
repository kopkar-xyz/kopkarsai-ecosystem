import React from 'react';
import { ShieldCheck, Phone, MessageSquare, MapPin } from 'lucide-react';

interface MarketplaceFooterProps {
  isDetailOpen?: boolean;
}

/**
 * MarketplaceFooter — 4-Column Footer Autentik KopKar SAI Sakura Kitchen
 * Budget: < 200 LOC.
 */
export const MarketplaceFooter: React.FC<MarketplaceFooterProps> = ({ isDetailOpen = false }) => {
  return (
    <footer
      className={`w-full bg-[#F7F3ED] text-[#1A1615] pt-12 pb-24 xl:pb-12 border-t border-[#EAE3D5]/80 mt-auto select-none ${
        isDetailOpen ? 'hidden lg:block' : 'block'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-brush text-xl text-[#83273B] font-bold">KOPKARSAI</span>
              <span className="font-kanji text-lg text-[#83273B] font-semibold">和食</span>
            </div>
            <p className="text-xs text-[#665E60] leading-relaxed">
              Sakura Kyoto Kitchen menghadirkan aneka jajanan pasar, roti, camilan, dan santapan harian higienis dengan kehangatan wabi-sabi khas Kyoto untuk seluruh anggota dan karyawan PT SAI.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#2E6B4F]/10 text-[#2E6B4F] text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Halal Certified
              </span>
            </div>
          </div>

          {/* Col 2: Jam Operasional */}
          <div>
            <h4 className="text-sm font-bold text-[#1A1615] mb-3 font-heading">Jam Operasional Kantin</h4>
            <ul className="space-y-1.5 text-xs text-[#665E60]">
              <li>Senin - Jumat: 07:30 - 19:30 WIB</li>
              <li>Sabtu (Shift Khusus): 08:00 - 15:00 WIB</li>
              <li>Minggu & Libur Nasional: Tutup</li>
              <li className="pt-1 text-[#83273B] font-semibold font-heading">*Sesi Bento Siang: Pesan s/d 10:30 WIB</li>
            </ul>
          </div>

          {/* Col 3: Layanan Pelanggan */}
          <div>
            <h4 className="text-sm font-bold text-[#1A1615] mb-3 font-heading">Layanan Pelanggan</h4>
            <ul className="space-y-2 text-xs text-[#665E60]">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#665E60] shrink-0" />
                <span>Ext. Kantin: #4421 / (021) 8983-KOP</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#665E60] shrink-0" />
                <span>Helpdesk WhatsApp Anggota</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#665E60] shrink-0" />
                <span>Lantai 2 Gedung Serbaguna SAI</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Inisiatif Koperasi */}
          <div>
            <h4 className="text-sm font-bold text-[#1A1615] mb-3 font-heading">Inisiatif Koperasi</h4>
            <p className="text-xs text-[#665E60] leading-relaxed">
              Pemberdayaan UMKM lokal dan pasokan bahan segar higienis untuk menunjang produktivitas dan kesejahteraan bersama seluruh karyawan.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[#EAE3D5] text-xs text-[#665E60] gap-3">
          <p>© 2026 KOPKARSAI 和食 - Sakura Kyoto Kitchen. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-[#1A1615] cursor-pointer">Ketentuan Pemesanan</span>
            <span>•</span>
            <span className="hover:text-[#1A1615] cursor-pointer">Kebijakan Higienis</span>
            <span>•</span>
            <span className="hover:text-[#1A1615] cursor-pointer">FAQ Kantin</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

