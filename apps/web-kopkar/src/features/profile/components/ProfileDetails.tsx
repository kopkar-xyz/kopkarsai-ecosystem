import React from 'react';
import { User, Phone, Mail, Building2, Calendar, ShieldCheck } from 'lucide-react';
import { Card } from '../../../components/ui/Card';

interface ProfileDetailsProps {
  user: {
    name: string;
    nik: string;
    unit: string;
    division: string;
    email: string;
    phone: string;
    joinDate: string;
  };
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  const fields = [
    { label: 'Nomor Induk Karyawan (NIK)', value: user.nik, icon: User },
    { label: 'Divisi / Unit Kerja', value: `${user.unit} • ${user.division}`, icon: Building2 },
    { label: 'Nomor WhatsApp', value: user.phone, icon: Phone, verified: true },
    { label: 'Email Perusahaan', value: user.email, icon: Mail },
    { label: 'Tanggal Bergabung Koperasi', value: user.joinDate, icon: Calendar },
  ];

  return (
    <Card variant="white" padding="md" className="space-y-3.5 border-slate-200/80 shadow-bento">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-xs font-extrabold text-kopkar-dark uppercase tracking-wider">
          Data Kepegawaian & Kontak
        </h3>
        <span className="text-[10px] text-emerald-700 font-bold bg-kopkar-mint px-2 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck size={11} />
          <span>Terverifikasi HRD</span>
        </span>
      </div>

      <div className="space-y-2.5 text-xs">
        {fields.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-white text-kopkar-primary flex items-center justify-center shadow-2xs">
                  <Icon size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-medium">{f.label}</span>
                  <span className="font-bold text-slate-800 text-[11px]">{f.value}</span>
                </div>
              </div>

              {f.verified && (
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
