import React, { useEffect, useState } from 'react';
import { useKopkarRole } from '../app/auth/RoleContext';
import { DigitalMemberCard } from '../features/profile/components/DigitalMemberCard';
import { MemberPreferencesForm } from '../features/profile/components/MemberPreferencesForm';

export const ProfileView: React.FC = () => {
  const { currentUser } = useKopkarRole();
  const [plantUnit, setPlantUnit] = useState<'SAI-B' | 'SAI-T'>(currentUser.unit);

  useEffect(() => {
    setPlantUnit(currentUser.unit);
  }, [currentUser.id, currentUser.unit]);

  return (
    <div className="space-y-4 sm:space-y-5 max-w-[1240px] mx-auto pb-12 animate-fadeIn select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* Kolom Kiri: Kartu Anggota Digital & Info Saldo/Limit */}
        <div className="lg:col-span-5 w-full">
          <DigitalMemberCard
            name={currentUser.name}
            roleDescription={`${currentUser.department} · ${currentUser.roleLabel}`}
            nik={currentUser.nik}
            rightMetricLabel="Unit Pabrik"
            rightMetricValue={plantUnit}
            subtitle={`Kartu Anggota Digital PT SAI (${plantUnit})`}
            activeSavings="Rp 4.800.000"
            creditLimit="Rp 35.000.000"
          />
        </div>

        {/* Kolom Kanan: Formulir Pengaturan Preferensi */}
        <div className="lg:col-span-7 w-full">
          <MemberPreferencesForm
            plantUnit={plantUnit}
            onPlantUnitChange={setPlantUnit}
            initialName={currentUser.name}
          />
        </div>
      </div>
    </div>
  );
};
