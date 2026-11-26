import React from 'react';
import { ArrowRight, ShieldCheck, Store, User } from 'lucide-react';
import { useKopkarRole } from '../app/auth/RoleContext';
import { useRouter } from '../app/router';
import { useAnalyticsData } from '../features/analytics/hooks/useAnalyticsData';
import { PromoDiscountBanner } from '../features/dashboard/components/PromoDiscountBanner';
import { DashboardKpiGrid } from '../features/dashboard/components/DashboardKpiGrid';
import { IncomingOrdersCard } from '../features/dashboard/components/IncomingOrdersCard';
import { RevenueTrendChart } from '../features/analytics/components/RevenueTrendChart';
import { TopProductsTableCard } from '../features/dashboard/components/TopProductsTableCard';
import { ProfitTrendChart } from '../features/analytics/components/ProfitTrendChart';
import { GovernanceDocumentsCard } from '../features/dashboard/components/GovernanceDocumentsCard';
import {
  MemberDashboardSection,
  SupplierDashboardSection,
} from '../features/dashboard/components/RoleDashboardSections';

/**
 * DashboardView (Beranda Koperasi) — KK-SCR-004 & KK-SCR-014
 * Pusat Informasi & Operasional KOPKAR SAI yang otomatis menyesuaikan konten
 * berdasarkan peran aktif (Anggota, Mitra Supplier, Admin Toko, Kepala Koperasi).
 */
export const DashboardView: React.FC = () => {
  const { currentUser } = useKopkarRole();
  const { navigate } = useRouter();
  const { timeframe, setTimeframe, data } = useAnalyticsData();

  const isMember = currentUser.role === 'ANGGOTA';
  const isSupplier = currentUser.role === 'SUPPLIER';
  const isAdminOrHead =
    currentUser.role === 'ADMIN_TOKO' || currentUser.role === 'KEPALA_KOPERASI';

  const RoleIcon = isMember ? User : isSupplier ? Store : ShieldCheck;
  const roleSubtitle = isMember
    ? 'Simpanan, SinJam & E-Card'
    : isSupplier
      ? 'Pesanan H-1, Sampel & Revisi'
      : 'Operasional & Otorisasi';

  return (
    <div className="space-y-4 sm:space-y-5 animate-fadeIn">
      {/* Compact Role Header Card */}
      <div className="bg-white rounded-2xl border border-[#EAE4D3] p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
            <RoleIcon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#18221D] tracking-tight leading-snug truncate">
              Halo, {currentUser.name}
            </h2>
            <div className="flex items-center gap-1.5 text-[11.5px] text-[#7A867E] mt-0.5 truncate">
              <span className="font-medium text-[#165239]">{currentUser.roleLabel}</span>
              <span>·</span>
              <span className="truncate">{roleSubtitle}</span>
            </div>
          </div>
        </div>

        {isAdminOrHead && (
          <button
            type="button"
            onClick={() =>
              navigate(
                currentUser.role === 'KEPALA_KOPERASI'
                  ? '/admin/approval'
                  : '/admin/verification'
              )
            }
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-[#FAF8F2] hover:bg-[#EAF4EE] border border-[#EAE4D3] hover:border-[#165239]/40 text-[#165239] text-[12.5px] font-medium inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors shrink-0"
          >
            <span>
              {currentUser.role === 'KEPALA_KOPERASI'
                ? 'Tinjau Persetujuan Final'
                : 'Cek Verifikasi Anggota'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Top Promo Banner */}
      <PromoDiscountBanner />

      {/* Compact Single Governance Document & Head Upload Management */}
      <GovernanceDocumentsCard />

      {isMember && <MemberDashboardSection />}

      {isSupplier && <SupplierDashboardSection />}

      {isAdminOrHead && (
        <>
          <DashboardKpiGrid
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            <div className="xl:col-span-7 flex flex-col">
              <IncomingOrdersCard className="h-full" />
            </div>
            <div className="xl:col-span-5 flex flex-col">
              <RevenueTrendChart data={data.dailyTrends} className="h-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            <div className="xl:col-span-5 flex flex-col">
              <TopProductsTableCard products={data.topProducts} className="h-full" />
            </div>
            <div className="xl:col-span-7 flex flex-col">
              <ProfitTrendChart className="h-full" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
