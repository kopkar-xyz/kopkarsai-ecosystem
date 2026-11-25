import React from 'react';
import { Clock, Package, UtensilsCrossed } from 'lucide-react';
import { KpiStatCard } from '../../../components/ui/KpiStatCard';
import { formatRupiah } from '../../../lib/kopkarsaiFormatters';

interface OrdersMetricCardsProps {
  pendingConfirmationCount?: number;
  pendingSubtitle?: string;
  dailyProductsCount?: number;
  dailyItemsSubtitle?: string;
  accumulatedDailyTotal?: number;
  accumulatedSubtitle?: string;
}

export const OrdersMetricCards: React.FC<OrdersMetricCardsProps> = ({
  pendingConfirmationCount = 3,
  pendingSubtitle = '1 PO katering · 2 pesanan',
  dailyProductsCount = 5,
  dailyItemsSubtitle = '9 item dipesan',
  accumulatedDailyTotal = 121000,
  accumulatedSubtitle = '3 sudah diterima',
}) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <KpiStatCard
        label="Perlu konfirmasi"
        value={pendingConfirmationCount}
        pill={pendingSubtitle}
        pillTone="warning"
        icon={Clock}
      />
      <KpiStatCard
        label="Pesanan harian"
        value={dailyProductsCount}
        unit="produk"
        pill={dailyItemsSubtitle}
        icon={Package}
      />
      <KpiStatCard
        label="Akumulasi harian"
        value={formatRupiah(accumulatedDailyTotal)}
        pill={accumulatedSubtitle}
        icon={UtensilsCrossed}
      />
    </section>
  );
};
