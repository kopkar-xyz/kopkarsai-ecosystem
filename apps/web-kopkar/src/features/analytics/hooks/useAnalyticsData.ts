import { useState } from 'react';
import type { AnalyticsData } from '../types';

const MOCK_ANALYTICS: Record<'7D' | '30D' | 'QUARTER', AnalyticsData> = {
  '7D': {
    timeframe: '7D',
    kpi: {
      totalRevenue: 48650000,
      revenueGrowth: 14.2,
      totalOrders: 1284,
      ordersGrowth: 8.6,
      fulfillmentRate: 98.4,
      activeMemberRate: 84.6,
    },
    dailyTrends: [
      { day: 'Senin', shortDay: 'Sen', date: '09 Nov', revenue: 6200000, ordersCount: 165 },
      { day: 'Selasa', shortDay: 'Sel', date: '10 Nov', revenue: 7450000, ordersCount: 198 },
      { day: 'Rabu', shortDay: 'Rab', date: '11 Nov', revenue: 6900000, ordersCount: 182 },
      { day: 'Kamis', shortDay: 'Kam', date: '12 Nov', revenue: 8100000, ordersCount: 215 },
      { day: 'Jumat', shortDay: 'Jum', date: '13 Nov', revenue: 9350000, ordersCount: 248 },
      { day: 'Sabtu', shortDay: 'Sab', date: '14 Nov', revenue: 5850000, ordersCount: 154 },
      { day: 'Minggu', shortDay: 'Min', date: '15 Nov', revenue: 4800000, ordersCount: 122 },
    ],
    categoryDistribution: [
      { name: 'Makanan Basah', category: 'Katering & Nasi', percentage: 54, totalAmount: 26271000, color: '#1F5B45' },
      { name: 'Makanan Ringan', category: 'Snack & Roti', percentage: 31, totalAmount: 15081500, color: '#2F6F56' },
      { name: 'Minuman', category: 'Kopi & Susu', percentage: 15, totalAmount: 7297500, color: '#4F8A67' },
    ],
    topProducts: [
      { id: 'tp-1', name: 'Nasi Kotak Ayam Bakar Madu', category: 'Makanan Basah', soldUnits: 342, totalRevenue: 8550000, growthPercentage: 18.5 },
      { id: 'tp-2', name: 'Roti Gandum Serat Tinggi', category: 'Makanan Ringan', soldUnits: 285, totalRevenue: 3990000, growthPercentage: 12.3 },
      { id: 'tp-3', name: 'Snack Box Rapat GA Unit B', category: 'Makanan Ringan', soldUnits: 190, totalRevenue: 2850000, growthPercentage: 24.1 },
      { id: 'tp-4', name: 'Susu UHT Full Cream 250ml', category: 'Minuman', soldUnits: 240, totalRevenue: 2040000, growthPercentage: 7.8 },
      { id: 'tp-5', name: 'Kopi Susu Gula Aren Botol', category: 'Minuman', soldUnits: 175, totalRevenue: 2625000, growthPercentage: 15.2 },
    ],
    liquidity: {
      totalSavings: 425000000,
      disbursedLoans: 310000000,
      liquidReserve: 115000000,
      healthRatio: 94.2,
    },
  },
  '30D': {
    timeframe: '30D',
    kpi: {
      totalRevenue: 194200000,
      revenueGrowth: 11.8,
      totalOrders: 5120,
      ordersGrowth: 9.4,
      fulfillmentRate: 97.9,
      activeMemberRate: 88.2,
    },
    dailyTrends: [
      { day: 'Minggu 1', shortDay: 'W1', date: '01-07 Nov', revenue: 44500000, ordersCount: 1180 },
      { day: 'Minggu 2', shortDay: 'W2', date: '08-14 Nov', revenue: 48650000, ordersCount: 1284 },
      { day: 'Minggu 3', shortDay: 'W3', date: '15-21 Nov', revenue: 51200000, ordersCount: 1350 },
      { day: 'Minggu 4', shortDay: 'W4', date: '22-28 Nov', revenue: 49850000, ordersCount: 1306 },
    ],
    categoryDistribution: [
      { name: 'Makanan Basah', category: 'Katering & Nasi', percentage: 52, totalAmount: 100984000, color: '#1F5B45' },
      { name: 'Makanan Ringan', category: 'Snack & Roti', percentage: 33, totalAmount: 64086000, color: '#2F6F56' },
      { name: 'Minuman', category: 'Kopi & Susu', percentage: 15, totalAmount: 29130000, color: '#4F8A67' },
    ],
    topProducts: [
      { id: 'tp-1', name: 'Nasi Kotak Ayam Bakar Madu', category: 'Makanan Basah', soldUnits: 1420, totalRevenue: 35500000, growthPercentage: 16.2 },
      { id: 'tp-2', name: 'Roti Gandum Serat Tinggi', category: 'Makanan Ringan', soldUnits: 1120, totalRevenue: 15680000, growthPercentage: 10.4 },
      { id: 'tp-3', name: 'Snack Box Rapat GA Unit B', category: 'Makanan Ringan', soldUnits: 780, totalRevenue: 11700000, growthPercentage: 21.0 },
      { id: 'tp-4', name: 'Susu UHT Full Cream 250ml', category: 'Minuman', soldUnits: 980, totalRevenue: 8330000, growthPercentage: 8.5 },
      { id: 'tp-5', name: 'Kopi Susu Gula Aren Botol', category: 'Minuman', soldUnits: 710, totalRevenue: 10650000, growthPercentage: 14.0 },
    ],
    liquidity: {
      totalSavings: 425000000,
      disbursedLoans: 310000000,
      liquidReserve: 115000000,
      healthRatio: 94.2,
    },
  },
  'QUARTER': {
    timeframe: 'QUARTER',
    kpi: {
      totalRevenue: 568400000,
      revenueGrowth: 15.6,
      totalOrders: 15420,
      ordersGrowth: 12.1,
      fulfillmentRate: 98.1,
      activeMemberRate: 91.5,
    },
    dailyTrends: [
      { day: 'Bulan 1', shortDay: 'B1', date: 'September', revenue: 178200000, ordersCount: 4890 },
      { day: 'Bulan 2', shortDay: 'B2', date: 'Oktober', revenue: 196000000, ordersCount: 5410 },
      { day: 'Bulan 3', shortDay: 'B3', date: 'November', revenue: 194200000, ordersCount: 5120 },
    ],
    categoryDistribution: [
      { name: 'Makanan Basah', category: 'Katering & Nasi', percentage: 55, totalAmount: 312620000, color: '#1F5B45' },
      { name: 'Makanan Ringan', category: 'Snack & Roti', percentage: 30, totalAmount: 170520000, color: '#2F6F56' },
      { name: 'Minuman', category: 'Kopi & Susu', percentage: 15, totalAmount: 85260000, color: '#4F8A67' },
    ],
    topProducts: [
      { id: 'tp-1', name: 'Nasi Kotak Ayam Bakar Madu', category: 'Makanan Basah', soldUnits: 4200, totalRevenue: 105000000, growthPercentage: 17.0 },
      { id: 'tp-2', name: 'Roti Gandum Serat Tinggi', category: 'Makanan Ringan', soldUnits: 3400, totalRevenue: 47600000, growthPercentage: 11.2 },
      { id: 'tp-3', name: 'Snack Box Rapat GA Unit B', category: 'Makanan Ringan', soldUnits: 2350, totalRevenue: 35250000, growthPercentage: 22.5 },
      { id: 'tp-4', name: 'Susu UHT Full Cream 250ml', category: 'Minuman', soldUnits: 2950, totalRevenue: 25075000, growthPercentage: 9.1 },
      { id: 'tp-5', name: 'Kopi Susu Gula Aren Botol', category: 'Minuman', soldUnits: 2150, totalRevenue: 32250000, growthPercentage: 13.8 },
    ],
    liquidity: {
      totalSavings: 425000000,
      disbursedLoans: 310000000,
      liquidReserve: 115000000,
      healthRatio: 94.2,
    },
  },
};

export function useAnalyticsData() {
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | 'QUARTER'>('7D');
  const data = MOCK_ANALYTICS[timeframe];

  return {
    timeframe,
    setTimeframe,
    data,
  };
}
