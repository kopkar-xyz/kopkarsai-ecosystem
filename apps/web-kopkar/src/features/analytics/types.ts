export interface DailySalesData {
  day: string;
  shortDay: string;
  date: string;
  revenue: number;
  ordersCount: number;
}

export interface CategoryShare {
  name: string;
  category: string;
  percentage: number;
  totalAmount: number;
  color: string;
}

export interface TopProductMetric {
  id: string;
  name: string;
  category: string;
  soldUnits: number;
  totalRevenue: number;
  growthPercentage: number;
}

export interface AnalyticsSummaryKPI {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  fulfillmentRate: number;
  activeMemberRate: number;
}

export interface AnalyticsData {
  timeframe: '7D' | '30D' | 'QUARTER';
  kpi: AnalyticsSummaryKPI;
  dailyTrends: DailySalesData[];
  categoryDistribution: CategoryShare[];
  topProducts: TopProductMetric[];
  liquidity: {
    totalSavings: number;
    disbursedLoans: number;
    liquidReserve: number;
    healthRatio: number;
  };
}
