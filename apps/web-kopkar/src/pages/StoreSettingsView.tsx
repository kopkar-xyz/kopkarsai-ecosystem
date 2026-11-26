import React, { useState } from 'react';
import { CheckCircle2, Clock, CreditCard, HelpCircle, Phone, Store } from 'lucide-react';
import {
  loadStoreConfig,
  saveStoreConfig,
  type StoreOperationalConfig,
} from '../features/settings/data/storeSettingsData';
import { StoreFaqTab } from '../features/settings/components/StoreFaqTab';

type SettingsTab = 'OPERASIONAL' | 'REKENING' | 'KONTAK' | 'FAQ';

const TABS: Array<{ id: SettingsTab; label: string; desc: string; icon: typeof Store }> = [
  { id: 'OPERASIONAL', label: 'Operasional & PO', desc: 'Jam kasir & batas PO', icon: Store },
  { id: 'REKENING', label: 'Rekening Kasir', desc: 'Akun bank penampungan', icon: CreditCard },
  { id: 'KONTAK', label: 'Kontak & Counter', desc: 'WhatsApp & lokasi ambil', icon: Phone },
  { id: 'FAQ', label: 'Pengaturan FAQ', desc: 'Panduan tanya jawab', icon: HelpCircle },
];

export const StoreSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('OPERASIONAL');
  const [cfg, setCfg] = useState<StoreOperationalConfig>(loadStoreConfig);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const updateField = <K extends keyof StoreOperationalConfig>(k: K, val: StoreOperationalConfig[K]) => {
    setCfg((prev) => ({ ...prev, [k]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoreConfig(cfg);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-5 animate-fadeIn select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Sidebar Menu Kategori Pengaturan */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-4">
          <div className="bg-white border border-[#EAE4D3] rounded-2xl p-3.5 space-y-1 shadow-xs">
            <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#7A867E]">
              Pengaturan Toko
            </div>
            {TABS.map((t) => {
              const active = activeTab === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-colors ${
                    active ? 'bg-[#165239] text-white' : 'text-[#18221D] hover:bg-[#FAF7EE]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-[#7A867E]'}`} />
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-semibold truncate">{t.label}</div>
                    <div className={`text-[11px] truncate ${active ? 'text-white/80' : 'text-[#7A867E]'}`}>
                      {t.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-white border border-[#EAE4D3] rounded-2xl p-4 shadow-xs space-y-1.5">
            <span className="text-[11px] text-[#7A867E] font-medium block">Status Operasional</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="text-[13px] font-semibold text-[#18221D]">Toko Aktif (Buka)</span>
            </div>
            <p className="text-[11.5px] text-[#526058]">
              Menerima pesanan Same-Day &amp; PO Katering.
            </p>
          </div>
        </aside>

        {/* Konten Pengaturan */}
        <div className="lg:col-span-8 xl:col-span-9">
          {activeTab === 'FAQ' ? (
            <StoreFaqTab />
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              {activeTab === 'OPERASIONAL' && (
                <>
                  <div className="bg-white border border-[#EAE4D3] rounded-2xl p-5 space-y-4 shadow-xs">
                    <h2 className="text-[14.5px] font-semibold text-[#18221D]">Jam Layanan Kasir</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[12px] text-[#526058] block mb-1">Jam Buka Kasir</label>
                        <div className="relative">
                          <input type="text" value={cfg.openingTime} onChange={(e) => updateField('openingTime', e.target.value)} className="w-full h-10 px-3.5 pr-9 bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl text-[13px]" />
                          <Clock className="w-4 h-4 text-[#7A867E] absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[12px] text-[#526058] block mb-1">Jam Tutup Kasir</label>
                        <div className="relative">
                          <input type="text" value={cfg.closingTime} onChange={(e) => updateField('closingTime', e.target.value)} className="w-full h-10 px-3.5 pr-9 bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl text-[13px]" />
                          <Clock className="w-4 h-4 text-[#7A867E] absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#EAE4D3] rounded-2xl p-5 space-y-4 shadow-xs">
                    <h2 className="text-[14.5px] font-semibold text-[#18221D]">Pengaturan Pre-Order (PO)</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[12px] text-[#526058] block mb-1">Ambang Kuota PO (pcs)</label>
                        <input type="text" value={cfg.poQuotaThreshold} onChange={(e) => updateField('poQuotaThreshold', e.target.value)} className="w-full h-10 px-3.5 bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl text-[13px]" />
                      </div>
                      <div>
                        <label className="text-[12px] text-[#526058] block mb-1">Batas Cut-off PO</label>
                        <input type="text" value={cfg.poCutoffTime} onChange={(e) => updateField('poCutoffTime', e.target.value)} className="w-full h-10 px-3.5 bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl text-[13px]" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'REKENING' && (
                <div className="bg-white border border-[#EAE4D3] rounded-2xl p-5 space-y-3.5 shadow-xs">
                  <h2 className="text-[14.5px] font-semibold text-[#18221D]">Rekening Kasir &amp; Penampungan</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[12px] text-[#526058] block mb-1">Nama Bank</label>
                      <input type="text" value={cfg.bankName} onChange={(e) => updateField('bankName', e.target.value)} className="w-full h-10 px-3.5 bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl text-[13px]" />
                    </div>
                    <div>
                      <label className="text-[12px] text-[#526058] block mb-1">Nomor Rekening</label>
                      <input type="text" value={cfg.accountNumber} onChange={(e) => updateField('accountNumber', e.target.value)} className="w-full h-10 px-3.5 bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl text-[13px]" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] text-[#526058] block mb-1">Atas Nama Rekening</label>
                    <input type="text" value={cfg.accountHolder} onChange={(e) => updateField('accountHolder', e.target.value)} className="w-full h-10 px-3.5 bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl text-[13px]" />
                  </div>
                </div>
              )}

              {activeTab === 'KONTAK' && (
                <div className="bg-white border border-[#EAE4D3] rounded-2xl p-5 space-y-3.5 shadow-xs">
                  <h2 className="text-[14.5px] font-semibold text-[#18221D]">Informasi Kontak &amp; Counter Pengambilan</h2>
                  <div>
                    <label className="text-[12px] text-[#526058] block mb-1">WhatsApp Admin Piket</label>
                    <input type="text" value={cfg.piketPhone} onChange={(e) => updateField('piketPhone', e.target.value)} className="w-full h-10 px-3.5 bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl text-[13px]" />
                  </div>
                  <div>
                    <label className="text-[12px] text-[#526058] block mb-1">Lokasi Counter Pengambilan</label>
                    <input type="text" value={cfg.counterLocation} onChange={(e) => updateField('counterLocation', e.target.value)} className="w-full h-10 px-3.5 bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl text-[13px]" />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#165239] hover:bg-[#11402c] text-white text-[12.5px] font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                {savedSuccess && <CheckCircle2 className="w-4 h-4" />}
                <span>{savedSuccess ? 'Pengaturan Disimpan!' : 'Simpan Pengaturan'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
