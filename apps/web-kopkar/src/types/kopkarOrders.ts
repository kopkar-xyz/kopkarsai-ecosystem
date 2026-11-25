export interface CateringPO {
  id: string;
  dateKey: string;
  productName: string;
  requester: string;
  department: string;
  portions: number;
  deliveryTime: string;
  deliveryDateLabel: string;
  cutoffTime: string;
  unitTotal: number;
  status: 'Menunggu' | 'Disanggupi' | 'Berhalangan';
  note?: string;
}

export interface DailyOrder {
  id: string;
  dateKey: string;
  productName: string;
  supplierName: string;
  unitCode: 'SAI-B' | 'SAI-T';
  qty: number;
  unitPrice: number;
  memberName: string;
  department: string;
  orderTime: string;
  status: 'Menunggu' | 'Diterima';
  paymentMethod: 'Potong Gaji' | 'Tunai' | 'Saldo SinJam';
}

export interface WeekDayItem {
  key: string;
  dayShort: string;
  dateLabel: string;
  isToday?: boolean;
}
