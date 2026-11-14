import type { IncomingOrder, UserProfile } from '../../types';

export interface DashboardMetrics {
  totalOrdersToday: number;
  pendingOrdersCount: number;
  totalSpentThisMonth: number;
  activePreOrdersCount: number;
}

export interface DashboardData {
  user: UserProfile;
  metrics: DashboardMetrics;
  incomingOrders: IncomingOrder[];
}
