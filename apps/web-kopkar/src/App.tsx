import React from 'react';
import { useRouter } from './app/router';
import { AppLayout } from './app/layout/AppLayout';
import { DashboardView } from './pages/DashboardView';
import { OrdersView } from './pages/OrdersView';
import { ProductsView } from './pages/ProductsView';
import { ProductSubmissionView } from './pages/ProductSubmissionView';
import { ProductDetailView } from './pages/ProductDetailView';
import { FinancialView } from './pages/FinancialView';
import { ProfileView } from './pages/ProfileView';
import { AdminMemberVerificationView } from './pages/AdminMemberVerificationView';
import { HeadApprovalView } from './pages/HeadApprovalView';
import { SupplierMonitoringView } from './pages/SupplierMonitoringView';
import { SampleTestingScheduleView } from './pages/SampleTestingScheduleView';
import { ProductRevisionHistoryView } from './pages/ProductRevisionHistoryView';
import { SupplyAnalyticsView } from './pages/SupplyAnalyticsView';

/**
 * App — Root View Orchestrator aplikasi KOPKAR (Portal Gateway, Login, & Registrasi berada di web-gateway).
 * Budget: < 200 LOC.
 */
export const App: React.FC = () => {
  const { currentPath } = useRouter();

  const renderActiveView = () => {
    switch (currentPath) {
      case '/':
        return <DashboardView />;
      case '/orders':
        return <OrdersView />;
      case '/products':
        return <ProductsView />;
      case '/products/new':
        return <ProductSubmissionView />;
      case '/products/detail':
        return <ProductDetailView />;
      case '/supplier/samples':
        return <SampleTestingScheduleView />;
      case '/supplier/revisions':
        return <ProductRevisionHistoryView />;
      case '/admin/verification':
        return <AdminMemberVerificationView />;
      case '/admin/approval':
        return <HeadApprovalView />;
      case '/admin/suppliers':
        return <SupplierMonitoringView />;
      case '/financial':
        return <FinancialView />;
      case '/profile':
        return <ProfileView />;
      case '/analytics':
        return <SupplyAnalyticsView />;
      default:
        return <DashboardView />;
    }
  };

  return <AppLayout>{renderActiveView()}</AppLayout>;
};
