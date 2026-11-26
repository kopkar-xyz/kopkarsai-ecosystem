import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

interface MemberPreferencesFormProps {
  initialName?: string;
  plantUnit?: 'SAI-B' | 'SAI-T';
  onPlantUnitChange?: (unit: 'SAI-B' | 'SAI-T') => void;
  onSave?: (data: {
    fullName: string;
    email: string;
    phone: string;
    plantUnit: 'SAI-B' | 'SAI-T';
    deliveryLocation: string;
    paymentMethod: string;
  }) => void;
}

export const MemberPreferencesForm: React.FC<MemberPreferencesFormProps> = ({
  initialName = 'Alexander Agung',
  plantUnit = 'SAI-B',
  onPlantUnitChange,
  onSave,
}) => {
  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState('alexander.agung@ptsai.co.id');
  const [phone, setPhone] = useState('0812-8890-4412');
  const [selectedUnit, setSelectedUnit] = useState<'SAI-B' | 'SAI-T'>(plantUnit);
  const [deliveryLocation, setDeliveryLocation] = useState('Gedung Produksi Line B');
  const [paymentMethod, setPaymentMethod] = useState('Potong Gaji Otomatis');
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    setFullName(initialName);
    setSelectedUnit(plantUnit);
  }, [initialName, plantUnit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlantUnitChange?.(selectedUnit);
    onSave?.({ fullName, email, phone, plantUnit: selectedUnit, deliveryLocation, paymentMethod });
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[#E9E2D2] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 select-none"
    >
      {/* Header Formulir */}
      <div className="pb-1 border-b border-[#E9E2D2]/60">
        <h2 className="text-base font-heading font-medium text-[#14261E]">
          Preferensi Layanan Anggota
        </h2>
        <p className="text-xs font-sans text-[#5C6F67] mt-0.5">
          Atur titik pengantaran internal dan metode pembayaran default
        </p>
      </div>

      {/* Baris 1: Nama Lengkap & Email Perusahaan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1">
          <label className="block text-xs font-sans text-[#1A2421]">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-10 px-3.5 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2]/60 text-xs font-sans text-[#1A2421] focus:outline-none focus:border-[#1F5B45] transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-sans text-[#1A2421]">
            Email Perusahaan
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-3.5 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2]/60 text-xs font-sans text-[#1A2421] focus:outline-none focus:border-[#1F5B45] transition-colors"
          />
        </div>
      </div>

      {/* Baris 2: Nomor WhatsApp & Titik Pengantaran Internal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1">
          <label className="block text-xs font-sans text-[#1A2421]">
            Nomor WhatsApp
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-10 px-3.5 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2]/60 text-xs font-sans text-[#1A2421] focus:outline-none focus:border-[#1F5B45] transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-sans text-[#1A2421]">
            Titik Pengantaran Internal
          </label>
          <input
            type="text"
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            className="w-full h-10 px-3.5 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2]/60 text-xs font-sans text-[#1A2421] focus:outline-none focus:border-[#1F5B45] transition-colors"
          />
        </div>
      </div>

      {/* Baris 3: Unit Pabrik (SAI-B / SAI-T) & Metode Pembayaran Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1">
          <label className="block text-xs font-sans text-[#1A2421]">
            Unit Lokasi Pabrik (SAI-B / SAI-T)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['SAI-B', 'SAI-T'] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => {
                  setSelectedUnit(u);
                  onPlantUnitChange?.(u);
                }}
                className={`h-10 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  selectedUnit === u
                    ? 'bg-[#1F5B45] border-[#1F5B45] text-white'
                    : 'bg-[#FAF7F2] border-[#E9E2D2]/80 text-[#1A2421] hover:bg-[#EAF4EE]'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-sans text-[#1A2421]">
            Metode Pembayaran Utama
          </label>
          <div className="relative">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full h-10 px-3.5 pr-8 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2]/60 text-xs font-sans text-[#1A2421] focus:outline-none focus:border-[#1F5B45] transition-colors appearance-none cursor-pointer"
            >
              <option value="Potong Gaji Otomatis">Potong Gaji Otomatis</option>
              <option value="Saldo Simpanan Sukarela">Saldo Simpanan Sukarela</option>
              <option value="QRIS Mandiri Kasir">QRIS Mandiri Kasir</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6F67] pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Tombol Simpan & Status Notifikasi */}
      <div className="pt-2 flex items-center justify-between">
        {isSuccess ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-sans text-[#1F5B45]">
            <CheckCircle2 size={14} />
            <span>Perubahan berhasil disimpan!</span>
          </span>
        ) : (
          <span />
        )}

        <button
          type="submit"
          className="h-10 px-5 rounded-xl bg-[#1F5B45] hover:bg-[#174736] text-white text-xs font-heading font-medium shadow-xs transition-colors cursor-pointer active:scale-95"
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
};
