import React from 'react';
import { ShoppingBag, Clock, Utensils, TrendingUp } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { DashboardMetrics } from '../types';

interface DailySummaryCardProps {
  metrics: DashboardMetrics;
}

export const DailySummaryCard: React.FC<DailySummaryCardProps> = ({ metrics }) => {
  const statItems = [
    {
      label: 'Pesanan Hari Ini',
      value: `${metrics.totalOrdersToday} Pesanan`,
      subtext: 'Same-Day & PO Masuk',
      icon: ShoppingBag,
      color: 'text-[#1F5B45]',
      bg: 'bg-[#EAF4EE]',
      border: 'border-[#A9C3A2]/60',
    },
    {
      label: 'Menunggu Verifikasi',
      value: `${metrics.pendingOrdersCount} Pesanan`,
      subtext: 'Butuh respons kasir',
      icon: Clock,
      color: 'text-[#B45309]',
      bg: 'bg-[#FEF6DC]',
      border: 'border-[#FDE68A]',
    },
    {
      label: 'PO Katering H-1',
      value: `${metrics.activePreOrdersCount} Menu`,
      subtext: 'Siap kirim esok hari',
      icon: Utensils,
      color: 'text-[#2F6F56]',
      bg: 'bg-[#EAF4EE]',
      border: 'border-[#A9C3A2]/60',
    },
    {
      label: 'Belanja Bulan Ini',
      value: formatCurrencyIDR(metrics.totalSpentThisMonth),
      subtext: 'Akumulasi belanja toko',
      icon: TrendingUp,
      color: 'text-[#1F5B45]',
      bg: 'bg-[#EAF4EE]',
      border: 'border-[#A9C3A2]/60',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statItems.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card
            key={idx}
            padding="sm"
            className="flex flex-col justify-between hover:shadow-bento-hover transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-accent font-semibold text-[#5C6F67] truncate">
                {stat.label}
              </span>
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${stat.bg} ${stat.border} border flex items-center justify-center flex-shrink-0`}
              >
                <Icon size={16} className={stat.color} />
              </div>
            </div>

            <div>
              <p className="text-base sm:text-xl font-heading font-extrabold text-[#1A2421] tracking-tight">
                {stat.value}
              </p>
              <p className="text-[11px] font-body text-[#5C6F67] mt-0.5 truncate">
                {stat.subtext}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
