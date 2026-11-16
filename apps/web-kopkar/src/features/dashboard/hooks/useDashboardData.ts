import { useState, useMemo } from 'react';
import type { CompanyFilter, CompanyUnit, ProductOrder, DailySummaryMetrics } from '../types';
import type { DateItem } from '../components/HorizontalDateSelector';
import { INITIAL_PRODUCT_ORDERS } from '../mockData';

function generateMonthDates(year: number, monthIndex: number, orderDates: Set<string>): DateItem[] {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const fullDayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  const result: DateItem[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, monthIndex, d);
    const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    result.push({
      dateStr,
      dayName: dayNames[dateObj.getDay()],
      dateNum: d,
      fullLabel: `${fullDayNames[dateObj.getDay()]}, ${String(d).padStart(2, '0')} ${monthNamesShort[monthIndex]}`,
      isToday: dateStr === '2026-11-14',
      hasOrders: orderDates.has(dateStr),
    });
  }
  return result;
}

export function useDashboardData() {
  const [productOrders, setProductOrders] = useState<ProductOrder[]>(INITIAL_PRODUCT_ORDERS);
  const [companyFilter, setCompanyFilter] = useState<CompanyFilter>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-14');

  const filteredOrders = useMemo(() => {
    return productOrders.filter((order) => {
      const matchCompany = companyFilter === 'ALL' || order.companyUnit === companyFilter;
      const matchDate = !selectedDate || order.orderDate === selectedDate;
      return matchCompany && matchDate;
    });
  }, [productOrders, companyFilter, selectedDate]);

  const dailySummaryOrders = useMemo(() => {
    return productOrders.filter((order) => {
      const matchDate = order.orderDate === selectedDate;
      const matchCompany = companyFilter === 'ALL' || order.companyUnit === companyFilter;
      return matchDate && matchCompany;
    });
  }, [productOrders, selectedDate, companyFilter]);

  const metrics: DailySummaryMetrics = useMemo(() => {
    const totalOrdersToday = dailySummaryOrders.length;
    const totalItemsCountToday = dailySummaryOrders.reduce((sum, ord) => sum + ord.quantity, 0);
    const totalAmountToday = dailySummaryOrders.reduce((sum, ord) => sum + ord.totalPrice, 0);
    const pendingOrdersCount = dailySummaryOrders.filter(
      (ord) => ord.status === 'PENDING' || ord.status === 'IN_REVIEW'
    ).length;

    return {
      totalOrdersToday,
      pendingOrdersCount,
      totalAmountToday,
      totalItemsCountToday,
    };
  }, [dailySummaryOrders]);

  const dateRange = useMemo(() => {
    const parts = (selectedDate || '2026-11-14').split('-');
    const year = parseInt(parts[0], 10) || 2026;
    const monthIndex = (parseInt(parts[1], 10) || 11) - 1;
    const orderDates = new Set(
      productOrders.map((ord) => ord.orderDate).filter((d): d is string => Boolean(d))
    );
    return generateMonthDates(year, monthIndex, orderDates);
  }, [selectedDate, productOrders]);

  const placeProductOrder = (newOrder: {
    productName: string;
    category: string;
    quantity: number;
    unitPrice: number;
    companyUnit: CompanyUnit;
    supplier?: string;
    notes?: string;
  }) => {
    const dateStamp = selectedDate || '2026-11-14';
    const randId = Math.floor(100 + Math.random() * 900);
    const createdOrder: ProductOrder = {
      id: `pord-${Date.now()}`,
      orderNumber: `#ORD-${dateStamp.replace(/-/g, '')}-${randId}`,
      productName: newOrder.productName,
      category: newOrder.category,
      quantity: newOrder.quantity,
      unitPrice: newOrder.unitPrice,
      totalPrice: newOrder.quantity * newOrder.unitPrice,
      companyUnit: newOrder.companyUnit,
      orderTime: 'Baru saja',
      orderDate: dateStamp,
      status: 'PENDING',
      supplier: newOrder.supplier || 'Produksi Sendiri',
      notes: newOrder.notes,
    };

    setProductOrders((prev) => [createdOrder, ...prev]);
  };

  const reorderProduct = (orderId: string) => {
    const existing = productOrders.find((ord) => ord.id === orderId);
    if (!existing) return;
    placeProductOrder({
      productName: existing.productName,
      category: existing.category,
      quantity: existing.quantity,
      unitPrice: existing.unitPrice,
      companyUnit: existing.companyUnit,
      supplier: existing.supplier,
      notes: existing.notes ? `Pesan ulang: ${existing.notes}` : undefined,
    });
  };

  return {
    orders: filteredOrders,
    dailySummaryOrders,
    metrics,
    companyFilter,
    setCompanyFilter,
    selectedDate,
    setSelectedDate,
    dateRange,
    placeProductOrder,
    reorderProduct,
  };
}
