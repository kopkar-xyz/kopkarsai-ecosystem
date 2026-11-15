import type { OperationalStatus, UserProfile } from '../../types';

export type CompanyFilter = 'ALL' | 'SAI-B' | 'SAI-T';
export type CompanyUnit = 'SAI-B' | 'SAI-T';

export interface ProductOrder {
  id: string;
  orderNumber: string;
  productName: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  companyUnit: CompanyUnit;
  orderTime: string;
  orderDate: string; // YYYY-MM-DD
  status: OperationalStatus;
  notes?: string;
  supplier?: string;
}

export interface DailySummaryMetrics {
  totalOrdersToday: number;
  pendingOrdersCount: number;
  totalAmountToday: number;
  totalItemsCountToday: number;
}

export interface DashboardMetrics {
  totalOrdersToday: number;
  pendingOrdersCount: number;
  totalSpentThisMonth?: number;
  activePreOrdersCount?: number;
}

export interface DashboardData {
  user: UserProfile;
  metrics: DashboardMetrics;
  productOrders: ProductOrder[];
}
