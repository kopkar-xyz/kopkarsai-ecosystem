import React, { useState } from 'react';
import { MobileFrame } from './components/layout/MobileFrame';
import { TopHeader } from './components/layout/TopHeader';
import { FloatingDock } from './components/layout/FloatingDock';
import { DashboardView } from './features/dashboard/DashboardView';
import { FinancialView } from './features/financial/FinancialView';
import { SupplierHubView } from './features/supplier-hub/SupplierHubView';
import { ProfileView } from './features/profile/ProfileView';
import { Modal } from './components/ui/Modal';
import { Button } from './components/ui/Button';
import { StatusBadge } from './components/ui/StatusBadge';
import { NavTabId, UserProfile } from './types';
import { ShoppingBag, ArrowRight, Search, Clock, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import { formatCurrencyIDR } from './lib/utils';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTabId>('home');
  const [isMarketplaceModalOpen, setIsMarketplaceModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Active User Data
  const [currentUser] = useState<UserProfile>({
    name: 'Sandra Maharani',
    nik: 'SAI-88219',
    unit: 'Unit SAI B',
    division: 'Produksi & Logistik',
    role: 'ANGGOTA_KARYAWAN',
    email: 'sandra.maharani@sai.local',
    phone: '+62 812-3456-7890',
    joinDate: '12 Januari 2024',
    avatarUrl: '',
    savings: {
      total: 14850000,
      pokok: 100000,
      wajib: 1650000,
      sukarela: 13100000,
      estimasiShu: 820000,
    },
  });

  // Mock Marketplace Products for Modal Preview
  const marketplaceItems = [
    {
      id: 1,
      name: 'Nasi Kotak Ayam Bakar Madu SAI',
      category: 'KATERING_H1',
      price: 22000,
      supplier: 'Dapur Bunda Ani (Unit SAI B)',
      typeLabel: 'Pre-Order H-1',
      badgeColor: 'bg-amber-100 text-amber-900',
    },
    {
      id: 2,
      name: 'Kopi Susu Gula Aren Toko KopKar (Cold)',
      category: 'TOKO_SAMEDAY',
      price: 12000,
      supplier: 'Barista Toko Koperasi',
      typeLabel: 'Same-Day (Checklist Kasir)',
      badgeColor: 'bg-emerald-100 text-emerald-900',
    },
    {
      id: 3,
      name: 'Air Mineral SAI Botol 600ml (Dus 24)',
      category: 'TOKO_SAMEDAY',
      price: 45000,
      supplier: 'Stok Gudang Koperasi',
      typeLabel: 'Same-Day (Prioritas GA)',
      badgeColor: 'bg-blue-100 text-blue-900',
    },
  ];

  return (
    <MobileFrame>
      {/* 1. Sticky Top Navigation Header */}
      <TopHeader
        onProfileClick={() => setActiveTab('profile')}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* 2. Main Tab View Router */}
      <main className="mt-3">
        {activeTab === 'home' && (
          <DashboardView
            totalSavings={currentUser.savings.total}
            estimatedShu={currentUser.savings.estimasiShu}
            onNavigateToFinancial={() => setActiveTab('financial')}
            onNavigateToSupplier={() => setActiveTab('supplier')}
            onOpenMarketplace={() => setIsMarketplaceModalOpen(true)}
          />
        )}

        {activeTab === 'financial' && <FinancialView />}

        {activeTab === 'supplier' && <SupplierHubView />}

        {activeTab === 'profile' && (
          <ProfileView
            user={currentUser}
            onOpenMarketplace={() => setIsMarketplaceModalOpen(true)}
          />
        )}
      </main>

      {/* 3. Floating Bottom Dock Navigation */}
      <FloatingDock
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingPoCount={2}
      />

      {/* Modal Pintasan Marketplace Koperasi */}
      <Modal
        isOpen={isMarketplaceModalOpen}
        onClose={() => setIsMarketplaceModalOpen(false)}
        title="Marketplace Internal Karyawan"
        subtitle="Ekosistem belanja online khusus anggota KOPKARSAI"
      >
        <div className="space-y-4">
          <div className="p-3 bg-kopkar-mint rounded-2xl border border-emerald-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-kopkar-primary shrink-0" />
              <div>
                <span className="font-bold text-kopkar-dark block">Katalog Gabungan</span>
                <span className="text-[10px] text-slate-500">Same-Day Kasir & Katering PO H-1</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full shadow-2xs">
              Potong Gaji / QRIS
            </span>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-kopkar-dark uppercase tracking-wider">
              Menu Terpopuler Hari Ini
            </h4>

            {marketplaceItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-slate-100/70 transition-colors"
              >
                <div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block ${item.badgeColor}`}>
                    {item.typeLabel}
                  </span>
                  <h5 className="text-xs font-bold text-slate-800 mt-1">{item.name}</h5>
                  <span className="text-[10px] text-slate-400 block">{item.supplier}</span>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className="font-mono font-extrabold text-kopkar-primary text-xs block">
                    {formatCurrencyIDR(item.price)}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold cursor-pointer hover:underline">
                    + Keranjang
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Button
              variant="gold"
              fullWidth
              size="md"
              onClick={() => {
                alert('Membuka aplikasi web Marketplace Karyawan (apps/web-marketplace)');
                setIsMarketplaceModalOpen(false);
              }}
              className="text-kopkar-dock"
            >
              <span>Buka Marketplace Lengkap</span>
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal Dialog Pencarian Cepat */}
      <Modal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="Pencarian Cepat KOPKARSAI"
        subtitle="Cari produk katering, simulasi pinjaman, atau jadwal operasional"
      >
        <div className="space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Ketik kata kunci (misal: pinjaman, nasi bakar, RAT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-kopkar-primary focus:outline-none"
              autoFocus
            />
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              Pintasan Populer:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Kalkulator Pinjaman Flat', tab: 'financial' as NavTabId },
                { label: 'Konfirmasi PO H-1', tab: 'supplier' as NavTabId },
                { label: 'Kartu Anggota E-Member', tab: 'profile' as NavTabId },
                { label: 'Jadwal Drop Sampel', tab: 'home' as NavTabId },
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveTab(p.tab);
                    setIsSearchOpen(false);
                  }}
                  className="px-3 py-1 rounded-full bg-slate-100 hover:bg-kopkar-mint hover:text-kopkar-primary text-slate-600 text-[11px] font-medium transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </MobileFrame>
  );
};
