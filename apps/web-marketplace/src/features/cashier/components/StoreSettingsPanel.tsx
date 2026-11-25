import React, { useState } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { StoreSettingsSidebar, SettingsTab } from './StoreSettingsSidebar';
import { StoreFaqSettingsTab } from './StoreFaqSettingsTab';

/**
 * StoreSettingsPanel — Pengaturan Toko & Konfigurasi Operasional Kasir
 * Layout 2 kolom selaras dengan halaman Pesanan Saya (media_1795492128962_a7f3bfb8.jpg).
 * Budget: < 200 LOC.
 */
export const StoreSettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('JENIS_TOKO');
  const [bankName, setBankName] = useState('Bank Mandiri');
  const [accountNumber, setAccountNumber] = useState('123-00-4567890-1');
  const [accountHolder, setAccountHolder] = useState('Koperasi Karyawan PT SAI');
  const [poQuotaThreshold, setPoQuotaThreshold] = useState('20');
  const [poCutoffTime, setPoCutoffTime] = useState('15:00');
  const [openingTime, setOpeningTime] = useState('07:00');
  const [closingTime, setClosingTime] = useState('17:00');
  const [piketPhone, setPiketPhone] = useState('0812-3456-7890');
  const [counterLocation, setCounterLocation] = useState('Counter Lantai 2, Gedung Serbaguna SAI');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="w-full max-w-[1140px] mx-auto select-none space-y-5 animate-fadeIn">
      {/* 1. Header Pengaturan Toko (Font Size Sesuai Pesanan Saya) */}
      <div className="pb-1">
        <h1 className="font-brush text-2xl sm:text-3xl text-[#83273B] font-semibold leading-tight">
          Pengaturan toko
        </h1>
        <p className="text-xs text-[#665E60] mt-0.5">
          Perubahan langsung dipakai di halaman pembayaran dan instruksi pembeli.
        </p>
      </div>

      {/* 2. Dual-Column Layout seperti Pesanan Saya */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-7 items-start">
        <StoreSettingsSidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Sisi Kanan: Form Konten Pengaturan */}
        <main className="flex-1 min-w-0 space-y-4">
          {activeTab === 'JENIS_TOKO' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white border border-[#EAE3D5] rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-2xs">
                <h2 className="font-semibold text-xs text-[#1A1615]">Jam layanan kasir</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="text-[#665E60] block mb-1">Jam buka kasir</label>
                    <div className="relative">
                      <input type="text" value={openingTime} onChange={(e) => setOpeningTime(e.target.value)} className="w-full h-10 px-3.5 pr-9 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B]" />
                      <Clock className="w-4 h-4 text-[#8C827A] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[#665E60] block mb-1">Jam tutup kasir</label>
                    <div className="relative">
                      <input type="text" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} className="w-full h-10 px-3.5 pr-9 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B]" />
                      <Clock className="w-4 h-4 text-[#8C827A] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#EAE3D5] rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-2xs">
                <h2 className="font-semibold text-xs text-[#1A1615]">Pengaturan Pre-order H-1</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="text-[#665E60] block mb-1">Ambang kuota PO (pcs)</label>
                    <input
                      type="text"
                      value={poQuotaThreshold}
                      onChange={(e) => setPoQuotaThreshold(e.target.value)}
                      className="w-full h-10 px-3.5 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B]"
                    />
                  </div>
                  <div>
                    <label className="text-[#665E60] block mb-1">Batas cut-off pesan PO H-1</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={poCutoffTime}
                        onChange={(e) => setPoCutoffTime(e.target.value)}
                        className="w-full h-10 px-3.5 pr-9 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B]"
                      />
                      <Clock className="w-4 h-4 text-[#8C827A] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'REKENING' && (
            <div className="bg-white border border-[#EAE3D5] rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-2xs animate-fadeIn">
              <h2 className="font-semibold text-xs text-[#1A1615]">Rekening kasir & penampungan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="text-[#665E60] block mb-1">Nama bank</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full h-10 px-3.5 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B]"
                  />
                </div>
                <div>
                  <label className="text-[#665E60] block mb-1">Nomor rekening</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full h-10 px-3.5 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B]"
                  />
                </div>
              </div>
              <div className="text-xs">
                <label className="text-[#665E60] block mb-1">Atas nama rekening</label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  className="w-full h-10 px-3.5 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B]"
                />
              </div>
            </div>
          )}

          {activeTab === 'KONTAK' && (
            <div className="bg-white border border-[#EAE3D5] rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-2xs animate-fadeIn">
              <h2 className="font-semibold text-xs text-[#1A1615]">Informasi kontak & lokasi toko</h2>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[#665E60] block mb-1">WhatsApp admin piket</label>
                  <input
                    type="text"
                    value={piketPhone}
                    onChange={(e) => setPiketPhone(e.target.value)}
                    className="w-full h-10 px-3.5 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B]"
                  />
                </div>
                <div>
                  <label className="text-[#665E60] block mb-1">Lokasi counter pengambilan</label>
                  <input
                    type="text"
                    value={counterLocation}
                    onChange={(e) => setCounterLocation(e.target.value)}
                    className="w-full h-10 px-3.5 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'FAQ' && <StoreFaqSettingsTab />}

          {/* Tombol Simpan Pengaturan untuk tab operasional */}
          {activeTab !== 'FAQ' && (
            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#83273B] hover:bg-[#6e1e2f] active:scale-98 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center gap-2"
              >
                {savedSuccess && <CheckCircle2 className="w-4 h-4 text-[#FFD967]" />}
                <span>{savedSuccess ? 'Pengaturan disimpan!' : 'Simpan pengaturan'}</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </form>
  );
};
