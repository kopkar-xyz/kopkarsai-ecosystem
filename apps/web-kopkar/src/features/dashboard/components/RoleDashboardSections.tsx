import React from 'react';
import {
  ArrowRight,
  CreditCard,
  FlaskConical,
  History,
  PackagePlus,
  ShoppingBag,
  Store,
  TrendingUp,
  UserCheck,
  Wallet,
} from 'lucide-react';
import { KpiStatCard } from '../../../components/ui/KpiStatCard';
import { useRouter } from '../../../app/router';
import { useKopkarRole } from '../../../app/auth/RoleContext';
import { IncomingOrdersCard } from './IncomingOrdersCard';

export const MemberDashboardSection: React.FC = () => {
  const { navigate } = useRouter();
  const { currentUser } = useKopkarRole();
  const hasActiveSupplier = Boolean(currentUser.isSupplierActive);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
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
        {/* KPI Status Mitra Supplier dengan CTA langsung ke Form Pengajuan */}
        <div className="rounded-2xl bg-white border border-[#EAE4D3] p-3.5 sm:p-5 shadow-2xs flex flex-col justify-between gap-2 hover:border-[#165239]/40 transition-colors">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11.5px] sm:text-[13px] font-medium text-[#526058] leading-snug">
              Status Mitra Supplier
            </span>
            <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
              <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </div>
          <div className="text-[16px] sm:text-[22px] font-semibold text-[#18221D] tracking-tight leading-tight">
            {hasActiveSupplier ? 'Aktif Mitra' : 'Belum Aktif'}
          </div>
          <div>
            {hasActiveSupplier ? (
              <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-[#EAF4EE] text-[#15803D]">
                {currentUser.supplierBusinessName ?? 'Supplier Terdaftar'}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/products/new')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#165239] hover:bg-[#11402c] text-white text-[10.5px] sm:text-[11.5px] font-medium cursor-pointer transition-colors"
              >
                <span>Ajukan Supplier</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <KpiStatCard
          label="Status Keanggotaan"
          value="Aktif Ber-SK"
          pill={`Diskon 13% · ${currentUser.unit}`}
          icon={UserCheck}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        <button
          type="button"
          onClick={() => navigate('/products/new')}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-[#165239]/30 hover:border-[#165239] transition-colors text-left flex items-center justify-between gap-3 cursor-pointer"
        >
          <div>
            <div className="text-[14px] sm:text-[15px] font-semibold text-[#18221D]">
              Ajukan Jadi Supplier
            </div>
            <p className="text-[12px] text-[#7A867E] mt-1">
              Daftarkan usaha &amp; produk pertama Anda untuk kurasi KopKar.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#165239] shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE4D3] hover:border-[#165239]/40 transition-colors text-left flex items-center justify-between gap-3 cursor-pointer"
        >
          <div>
            <div className="text-[14px] sm:text-[15px] font-semibold text-[#18221D]">
              Akun &amp; E-Card Digital Saya
            </div>
            <p className="text-[12px] text-[#7A867E] mt-1">
              Tampilkan QR Kasir &amp; info unit {currentUser.unit} di toko internal.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#165239] shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/financial')}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE4D3] hover:border-[#165239]/40 transition-colors text-left flex items-center justify-between gap-3 cursor-pointer"
        >
          <div>
            <div className="text-[14px] sm:text-[15px] font-semibold text-[#18221D]">
              Simulasi &amp; Ajukan Pinjaman SinJam
            </div>
            <p className="text-[12px] text-[#7A867E] mt-1">
              Hitung cicilan dengan jasa 0,8% dan batas plafon Rp 50 juta.
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
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
