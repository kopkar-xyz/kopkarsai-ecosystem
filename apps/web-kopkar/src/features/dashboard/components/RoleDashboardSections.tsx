import React from 'react';
import {
  ArrowRight,
  Award,
  CreditCard,
  FlaskConical,
  History,
  PackagePlus,
  ShoppingBag,
  TrendingUp,
  UserCheck,
  Wallet,
} from 'lucide-react';
import { KpiStatCard } from '../../../components/ui/KpiStatCard';
import { useRouter } from '../../../app/router';
import { IncomingOrdersCard } from './IncomingOrdersCard';

export const MemberDashboardSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiStatCard
          label="Simpanan Aktif"
          value="Rp 4.800.000"
          pill="Pokok + Wajib Payroll"
          icon={Wallet}
        />
        <KpiStatCard
          label="Sisa Plafon SinJam"
          value="Rp 35.000.000"
          pill="Maksimal Rp 50 jt"
          icon={CreditCard}
        />
        <KpiStatCard
          label="Poin SHU Berjalan"
          value="1.420"
          unit="poin"
          pill="Estimasi pembagian tahunan"
          icon={Award}
        />
        <KpiStatCard
          label="Status Keanggotaan"
          value="Aktif Ber-SK"
          pill="Diskon Marketplace 13% aktif"
          icon={UserCheck}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="p-5 rounded-2xl bg-white border border-[#EAE4D3] hover:border-[#165239]/40 transition-colors text-left flex items-center justify-between gap-4 cursor-pointer"
        >
          <div>
            <div className="text-[15px] font-semibold text-[#18221D]">
              Akun &amp; E-Card Digital Saya
            </div>
            <p className="text-[12.5px] text-[#7A867E] mt-1">
              Tampilkan QR Kasir untuk verifikasi diskon anggota di toko internal.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#165239] shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/financial')}
          className="p-5 rounded-2xl bg-white border border-[#EAE4D3] hover:border-[#165239]/40 transition-colors text-left flex items-center justify-between gap-4 cursor-pointer"
        >
          <div>
            <div className="text-[15px] font-semibold text-[#18221D]">
              Simulasi &amp; Ajukan Pinjaman SinJam
            </div>
            <p className="text-[12.5px] text-[#7A867E] mt-1">
              Hitung cicilan transparan dengan jasa 0,8% dan pemotongan payroll.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#165239] shrink-0" />
        </button>
      </div>
    </div>
  );
};

export const SupplierDashboardSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiStatCard
          label="Pesanan & PO Masuk"
          value={3}
          unit="antrean"
          pill="1 PO Katering · 2 Harian"
          pillTone="warning"
          icon={ShoppingBag}
        />
        <KpiStatCard
          label="Jadwal Uji Sampel"
          value={2}
          unit="produk"
          pill="Menunggu kurasi fisik"
          pillTone="warning"
          icon={FlaskConical}
        />
        <KpiStatCard
          label="Perlu Revisi"
          value={1}
          unit="produk"
          pill="Tindak lanjut perbaikan mitra"
          pillTone="warning"
          icon={History}
        />
        <KpiStatCard
          label="Omzet Minggu Ini"
          value="Rp 1.480.000"
          pill="Settlement H+1"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => navigate('/products/new')}
          className="p-4 rounded-2xl bg-white border border-[#EAE4D3] hover:border-[#165239]/40 transition-colors text-left flex items-center justify-between gap-3 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
              <PackagePlus className="w-4 h-4" />
            </span>
            <div>
              <div className="text-[13.5px] font-semibold text-[#18221D]">
                Ajukan Produk Baru
              </div>
              <div className="text-[11.5px] text-[#7A867E]">Input HPP &amp; jadwal kurasi</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#165239] shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/supplier/samples')}
          className="p-4 rounded-2xl bg-white border border-[#EAE4D3] hover:border-[#165239]/40 transition-colors text-left flex items-center justify-between gap-3 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
              <FlaskConical className="w-4 h-4" />
            </span>
            <div>
              <div className="text-[13.5px] font-semibold text-[#18221D]">
                Cek Jadwal Uji Sampel
              </div>
              <div className="text-[11.5px] text-[#7A867E]">Drop fisik ke tim kurasi</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#165239] shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/supplier/revisions')}
          className="p-4 rounded-2xl bg-white border border-[#EAE4D3] hover:border-[#165239]/40 transition-colors text-left flex items-center justify-between gap-3 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
              <History className="w-4 h-4" />
            </span>
            <div>
              <div className="text-[13.5px] font-semibold text-[#18221D]">
                Log Siklus Revisi
              </div>
              <div className="text-[11.5px] text-[#7A867E]">Ajukan revisi &amp; pantau HPP</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#165239] shrink-0" />
        </button>
      </div>

      <IncomingOrdersCard />
    </div>
  );
};
