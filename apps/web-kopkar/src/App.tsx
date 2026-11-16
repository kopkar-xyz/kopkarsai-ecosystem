import React from 'react';
import { useRouter } from './app/router';
import { AppLayout } from './app/layout/AppLayout';
import { DashboardView } from './pages/DashboardView';
import { OrdersView } from './pages/OrdersView';
import { ProductsView } from './pages/ProductsView';
import { ProductSubmissionView } from './pages/ProductSubmissionView';
import { ProductDetailView } from './pages/ProductDetailView';
import { FinancialView } from './pages/FinancialView';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';

export const App: React.FC = () => {
  const { currentPath, navigate } = useRouter();

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
      case '/financial':
        return <FinancialView />;
      case '/profile':
        return (
          <Card padding="lg" className="max-w-xl mx-auto text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#1F5B45] text-white font-heading font-extrabold text-2xl flex items-center justify-center mx-auto ring-4 ring-[#A9C3A2]">
              AA
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-[#1A2421]">
                Alexander Agung
              </h2>
              <p className="text-xs font-accent font-semibold text-[#2F6F56]">
                NIK: SAI-2024-001 • Unit SAI B (Anggota Aktif)
              </p>
              <p className="text-xs font-body text-[#5C6F67] mt-1">
                Quality Assurance & Toko Koperasi
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              Kembali ke Beranda
            </Button>
          </Card>
        );
      default:
        return <DashboardView />;
    }
  };

  return <AppLayout>{renderActiveView()}</AppLayout>;
};
