import React from 'react';
import { Store, CreditCard, Phone, HelpCircle } from 'lucide-react';

export type SettingsTab = 'JENIS_TOKO' | 'REKENING' | 'KONTAK' | 'FAQ';

export const SETTINGS_TABS: { id: SettingsTab; label: string; desc: string; icon: typeof Store }[] = [
  { id: 'JENIS_TOKO', label: 'Jenis & Operasional', desc: 'Jam kasir & batas PO', icon: Store },
  { id: 'REKENING', label: 'Rekening Kasir', desc: 'Akun bank & pembayaran', icon: CreditCard },
  { id: 'KONTAK', label: 'Informasi Kontak', desc: 'WhatsApp & lokasi counter', icon: Phone },
  { id: 'FAQ', label: 'Pengaturan FAQ', desc: 'Panduan tanya jawab', icon: HelpCircle },
];

interface StoreSettingsSidebarProps {
  activeTab: SettingsTab;
  onSelectTab: (tab: SettingsTab) => void;
}

/**
 * StoreSettingsSidebar — Sidebar Menu Kategori Pengaturan Toko
 * Gaya visual, radius, font, dan gap selaras dengan Pesanan Saya. Budget: < 200 LOC.
 */
export const StoreSettingsSidebar: React.FC<StoreSettingsSidebarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <aside className="w-full lg:w-[260px] xl:w-[280px] shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 space-y-0 lg:space-y-4">
      {/* 1. Kategori Pengaturan Card */}
      <div className="bg-white border border-[#EAE3D5] rounded-2xl p-4 shadow-2xs space-y-1.5">
        <h2 className="text-xs font-semibold text-[#8C827A] px-1 py-0.5">
          Menu pengaturan
        </h2>
        <div className="space-y-1">
          {SETTINGS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-[#83273B] text-white font-semibold shadow-xs'
                    : 'text-[#1A1615] font-medium hover:bg-[#FAF6F0]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#8C827A]'}`} />
                <div className="min-w-0">
                  <span className="block font-semibold text-xs leading-tight truncate">{tab.label}</span>
                  <span className={`block text-[11px] mt-0.5 truncate ${isActive ? 'text-white/80' : 'text-[#8C827A]'}`}>
                    {tab.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Status Operasional Toko Card */}
      <div className="bg-white border border-[#EAE3D5] rounded-2xl p-4 shadow-2xs space-y-2">
        <span className="text-[11px] text-[#8C827A] block font-medium">Status operasional</span>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
          <span className="text-xs font-semibold text-[#1A1615]">Toko Aktif (Buka)</span>
        </div>
        <p className="text-[11px] text-[#665E60] leading-relaxed">
          Kantin Lantai 2 menerima pesanan Same-day dan PO H-1.
        </p>
      </div>
    </aside>
  );
};
