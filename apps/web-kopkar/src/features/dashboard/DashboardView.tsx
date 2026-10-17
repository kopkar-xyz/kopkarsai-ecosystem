import React from 'react';
import { HeroFinancialCard } from './components/HeroFinancialCard';
import { HorizontalSchedule } from './components/HorizontalSchedule';
import { BentoServicesGrid } from './components/BentoServicesGrid';
import { AnnouncementBanner } from './components/AnnouncementBanner';

interface DashboardViewProps {
  totalSavings: number;
  estimatedShu: number;
  onNavigateToFinancial: () => void;
  onNavigateToSupplier: () => void;
  onOpenMarketplace: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  totalSavings,
  estimatedShu,
  onNavigateToFinancial,
  onNavigateToSupplier,
  onOpenMarketplace,
}) => {
  return (
    <div className="px-5 space-y-5 animate-fade-in">
      {/* 1. Hero Bento Card (Financial Summary & Quick Shortcuts) */}
      <HeroFinancialCard
        totalSavings={totalSavings}
        estimatedShu={estimatedShu}
        onSimulateClick={onNavigateToFinancial}
        onShopClick={onOpenMarketplace}
      />

      {/* 2. Horizontal Operational Schedule Strip */}
      <HorizontalSchedule />

      {/* 3. Bento Services Grid (Kalkulator, Supplier Hub, Marketplace) */}
      <BentoServicesGrid
        onOpenFinancial={onNavigateToFinancial}
        onOpenSupplier={onNavigateToSupplier}
        onOpenMarketplace={onOpenMarketplace}
      />

      {/* 4. Event & Official Announcement Banner */}
      <AnnouncementBanner />
    </div>
  );
};
