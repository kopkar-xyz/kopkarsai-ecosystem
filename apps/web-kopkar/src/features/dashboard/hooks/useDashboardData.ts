import { useState } from 'react';
import type { DashboardData } from '../types';
import type { DateItem } from '../components/HorizontalDateSelector';

const DATE_RANGE: DateItem[] = [
  { dateStr: '2026-11-09', dayName: 'Sen', dateNum: 9, fullLabel: 'Senin, 09 Nov', hasOrders: false },
  { dateStr: '2026-11-10', dayName: 'Sel', dateNum: 10, fullLabel: 'Selasa, 10 Nov', hasOrders: true },
  { dateStr: '2026-11-11', dayName: 'Rab', dateNum: 11, fullLabel: 'Rabu, 11 Nov', hasOrders: false },
  { dateStr: '2026-11-12', dayName: 'Kam', dateNum: 12, fullLabel: 'Kamis, 12 Nov', hasOrders: true },
  { dateStr: '2026-11-13', dayName: 'Jum', dateNum: 13, fullLabel: 'Jumat, 13 Nov', hasOrders: true },
  { dateStr: '2026-11-14', dayName: 'Sab', dateNum: 14, fullLabel: 'Sabtu, 14 Nov', isToday: true, hasOrders: true },
  { dateStr: '2026-11-15', dayName: 'Min', dateNum: 15, fullLabel: 'Minggu, 15 Nov', hasOrders: true },
  { dateStr: '2026-11-16', dayName: 'Sen', dateNum: 16, fullLabel: 'Senin, 16 Nov', hasOrders: true },
  { dateStr: '2026-11-17', dayName: 'Sel', dateNum: 17, fullLabel: 'Selasa, 17 Nov', hasOrders: false },
  { dateStr: '2026-11-18', dayName: 'Rab', dateNum: 18, fullLabel: 'Rabu, 18 Nov', hasOrders: false },
  { dateStr: '2026-11-19', dayName: 'Kam', dateNum: 19, fullLabel: 'Kamis, 19 Nov', hasOrders: false },
];

const INITIAL_MOCK_DATA: DashboardData = {
  user: {
    id: 'usr-001',
    nik: 'SAI-2024-001',
    fullName: 'Alexander Agung',
    division: 'Quality Assurance & Toko',
    unit: 'Unit SAI B',
    role: 'ANGGOTA',
    status: 'ACTIVE',
    joinedDate: '12 Januari 2022',
  },
  metrics: {
    totalOrdersToday: 6,
    pendingOrdersCount: 2,
    totalSpentThisMonth: 420000,
    activePreOrdersCount: 3,
  },
  incomingOrders: [
    {
      id: 'ord-101',
      orderNumber: '#PO-20261114-01',
      customerName: 'Budi Santoso',
      customerNik: 'SAI-2023-089',
      unit: 'Unit SAI B',
      orderType: 'PO_H1',
      items: [
        { id: 'it-1', name: 'Nasi Kotak Ayam Bakar Madu', quantity: 2, unitPrice: 25000 },
        { id: 'it-2', name: 'Es Teh Manis Melati', quantity: 2, unitPrice: 5000 },
      ],
      totalAmount: 60000,
      status: 'PENDING',
      orderTime: '11:15 WIB',
      orderDate: '2026-11-14',
      notes: 'Antar sebelum jam istirahat siang (11:45).',
    },
    {
      id: 'ord-102',
      orderNumber: '#PO-20261114-02',
      customerName: 'Siti Rahmawati',
      customerNik: 'SAI-2022-045',
      unit: 'Unit SAI B',
      orderType: 'SAME_DAY',
      items: [
        { id: 'it-3', name: 'Roti Gandum Cokelat', quantity: 1, unitPrice: 14000 },
        { id: 'it-4', name: 'Susu UHT Full Cream 250ml', quantity: 2, unitPrice: 8500 },
      ],
      totalAmount: 31000,
      status: 'IN_REVIEW',
      orderTime: '10:45 WIB',
      orderDate: '2026-11-14',
    },
    {
      id: 'ord-103',
      orderNumber: '#PO-20261113-03',
      customerName: 'Hendra Wijaya',
      customerNik: 'SAI-2021-012',
      unit: 'Unit SAI T',
      orderType: 'PO_H1',
      items: [
        { id: 'it-5', name: 'Snack Box Rapat Divisi GA', quantity: 10, unitPrice: 15000 },
      ],
      totalAmount: 150000,
      status: 'ACCEPTED',
      orderTime: '09:30 WIB',
      orderDate: '2026-11-13',
      notes: 'Pesanan prioritas GA untuk evaluasi vendor.',
    },
    {
      id: 'ord-104',
      orderNumber: '#PO-20261115-04',
      customerName: 'Dewi Lestari',
      customerNik: 'SAI-2024-033',
      unit: 'Unit SAI B',
      orderType: 'SAME_DAY',
      items: [
        { id: 'it-6', name: 'Air Mineral 600ml', quantity: 3, unitPrice: 3500 },
        { id: 'it-7', name: 'Biskuit Malkist Keju', quantity: 1, unitPrice: 9500 },
      ],
      totalAmount: 20000,
      status: 'ACTIVE',
      orderTime: '08:50 WIB',
      orderDate: '2026-11-15',
    },
    {
      id: 'ord-105',
      orderNumber: '#PO-20261112-05',
      customerName: 'Ahmad Fauzi',
      customerNik: 'SAI-2023-019',
      unit: 'Unit SAI B',
      orderType: 'PO_H1',
      items: [
        { id: 'it-8', name: 'Bento Ayam Teriyaki', quantity: 4, unitPrice: 22000 },
      ],
      totalAmount: 88000,
      status: 'ACCEPTED',
      orderTime: '12:00 WIB',
      orderDate: '2026-11-12',
    },
  ],
};

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>(INITIAL_MOCK_DATA);
  const [filterType, setFilterType] = useState<'ALL' | 'SAME_DAY' | 'PO_H1'>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-14');

  const filteredOrders = data.incomingOrders.filter((order) => {
    const matchType = filterType === 'ALL' || order.orderType === filterType;
    const matchDate = !selectedDate || order.orderDate === selectedDate;
    return matchType && matchDate;
  });

  const selectedDateOrders = data.incomingOrders.filter((order) => order.orderDate === selectedDate);
  const selectedDateTotalAmount = selectedDateOrders.reduce((sum, ord) => sum + ord.totalAmount, 0);

  const updateOrderStatus = (orderId: string, newStatus: DashboardData['incomingOrders'][0]['status']) => {
    setData((prev) => ({
      ...prev,
      incomingOrders: prev.incomingOrders.map((ord) =>
        ord.id === orderId ? { ...ord, status: newStatus } : ord
      ),
    }));
  };

  return {
    user: data.user,
    metrics: data.metrics,
    orders: filteredOrders,
    allOrdersCount: data.incomingOrders.length,
    selectedDateOrdersCount: selectedDateOrders.length,
    selectedDateTotalAmount,
    filterType,
    setFilterType,
    selectedDate,
    setSelectedDate,
    dateRange: DATE_RANGE,
    updateOrderStatus,
  };
}
