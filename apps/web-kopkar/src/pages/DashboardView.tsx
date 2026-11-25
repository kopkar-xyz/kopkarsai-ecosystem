import React from 'react';
import { useKopkarRole } from '../app/auth/RoleContext';
import { useAnalyticsData } from '../features/analytics/hooks/useAnalyticsData';
import { PromoDiscountBanner } from '../features/dashboard/components/PromoDiscountBanner';
import { DashboardKpiGrid } from '../features/dashboard/components/DashboardKpiGrid';
import { IncomingOrdersCard } from '../features/dashboard/components/IncomingOrdersCard';
import { RevenueTrendChart } from '../features/analytics/components/RevenueTrendChart';
import { TopProductsTableCard } from '../features/dashboard/components/TopProductsTableCard';
import { ProfitTrendChart } from '../features/analytics/components/ProfitTrendChart';
import {
  MemberDashboardSection,
  SupplierDashboardSection,
} from '../features/dashboard/components/RoleDashboardSections';

/**
 * DashboardView (Beranda Koperasi) — KK-SCR-004 & KK-SCR-014
 * Otomatis menyesuaikan tampilan beranda berdasarkan peran aktif dari RoleContext
 * (Anggota, Mitra Supplier, Admin Toko, Kepala Koperasi).
 */
export const DashboardView: React.FC = () => {
  const { currentUser, openRoleModal } = useKopkarRole();
  const { timeframe, setTimeframe, data } = useAnalyticsData();

  const isMember = currentUser.role === 'ANGGOTA';
  const isSupplier = currentUser.role === 'SUPPLIER';
  const isAdminOrHead =
    currentUser.role === 'ADMIN_TOKO' || currentUser.role === 'KEPALA_KOPERASI';

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Active Role Info Banner + Quick Switch Trigger */}
      <div className="bg-white rounded-2xl border border-[#EAE4D3] px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`px-2.5 py-1 rounded-lg text-[11.5px] font-semibold shrink-0 ${currentUser.badgeClass}`}
          >
            {currentUser.roleLabel}
          </span>
          <span className="text-[12.5px] text-[#526058]">
            Menampilkan beranda &amp; menu khusus peran{' '}
            <strong className="text-[#18221D]">{currentUser.name}</strong>.
          </span>
        </div>

        <button
          type="button"
          onClick={openRoleModal}
          className="px-3.5 py-1.5 rounded-xl bg-[#FAF7EE] hover:bg-[#F3EFE2] border border-[#EAE4D3] text-[12px] font-medium text-[#165239] cursor-pointer transition-colors self-start sm:self-auto shrink-0"
        >
          Ganti Peran Demo
        </button>
      </div>

      {/* Top Promo Banner */}
      <PromoDiscountBanner />

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
