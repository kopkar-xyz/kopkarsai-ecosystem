import React from 'react';
import { DigitalMemberCard } from '../features/profile/components/DigitalMemberCard';
import { MemberPreferencesForm } from '../features/profile/components/MemberPreferencesForm';

/**
 * ProfileView (Profil & E-Card Anggota) — KK-SCR-013
 * Slicing 1:1 Presisi Gambar 3 Referensi:
 * - Kolom Kiri: E-Card Digital Anggota PT SAI, Tombol QR Kasir, Simpanan Aktif, Limit Kredit
 * - Kolom Kanan: Preferensi Layanan Anggota (Nama, Email, No WA, Titik Pengantaran, Metode Bayar)
 * Budget: < 200 LOC.
 */
export const ProfileView: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-5 max-w-[1240px] mx-auto pb-12 animate-fadeIn select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* Kolom Kiri: Kartu Anggota Digital & Info Saldo/Limit */}
        <div className="lg:col-span-5 w-full">
          <DigitalMemberCard
            name="Alexander Agung"
            roleDescription="Production · Anggota & Operator"
            nik="SAI-2024-001"
            shuPoints="1.420"
            activeSavings="Rp 4.800.000"
            creditLimit="Rp 35.000.000"
          />
        </div>

        {/* Kolom Kanan: Formulir Pengaturan Preferensi */}
        <div className="lg:col-span-7 w-full">
          <MemberPreferencesForm />
        </div>
      </div>
    </div>
  );
};
