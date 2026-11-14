import React from 'react';
import { DollarSign, ShoppingCart, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR } from '../../../lib/utils';
import type { AnalyticsSummaryKPI } from '../types';

interface AnalyticsMetricCardsProps {
  kpi: AnalyticsSummaryKPI;
}

export const AnalyticsMetricCards: React.FC<AnalyticsMetricCardsProps> = ({ kpi }) => {
  const metrics = [
    {
      label: 'Total Omset (GMV)',
      value: formatCurrencyIDR(kpi.totalRevenue),
      growth: `+${kpi.revenueGrowth}% vs lalu`,
      icon: DollarSign,
      color: 'text-[#1F5B45]',
      bg: 'bg-[#EAF4EE]',
      border: 'border-[#A9C3A2]/60',
    },
    {
      label: 'Volume Transaksi',
      value: `${kpi.totalOrders.toLocaleString('id-ID')} Pesanan`,
      growth: `+${kpi.ordersGrowth}% vs lalu`,
      icon: ShoppingCart,
      color: 'text-[#2F6F56]',
      bg: 'bg-[#EAF4EE]',
      border: 'border-[#A9C3A2]/60',
    },
    {
      label: 'Tingkat Pemenuhan PO',
      value: `${kpi.fulfillmentRate}%`,
      growth: 'Kurasi & Kirim Tepat',
      icon: CheckCircle,
      color: 'text-[#1F5B45]',
      bg: 'bg-[#EAF4EE]',
      border: 'border-[#A9C3A2]/60',
    },
    {
      label: 'Partisipasi Anggota',
      value: `${kpi.activeMemberRate}%`,
      growth: 'Anggota Aktif Belanja',
      icon: Users,
      color: 'text-[#2F6F56]',
      bg: 'bg-[#EAF4EE]',
      border: 'border-[#A9C3A2]/60',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {metrics.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card
            key={idx}
            padding="sm"
            className="flex flex-col justify-between hover:shadow-bento-hover transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-accent font-semibold text-[#5C6F67] truncate">
                {item.label}
              </span>
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${item.bg} ${item.border} border flex items-center justify-center flex-shrink-0`}
              >
                <Icon size={16} className={item.color} />
              </div>
            </div>

            <div>
              <p className="text-base sm:text-xl font-heading font-extrabold text-[#1A2421] tracking-tight">
                {item.value}
              </p>
              <div className="flex items-center gap-1 mt-1 text-[11px] font-accent font-bold text-[#1F5B45]">
                <TrendingUp size={12} className="text-[#2F6F56]" />
                <span>{item.growth}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
