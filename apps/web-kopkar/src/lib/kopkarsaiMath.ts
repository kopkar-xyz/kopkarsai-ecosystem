import type { DailyOrder } from '../types/kopkarOrders';

export function calculateLoanInstallment(
  principal: number,
  tenorMonths: number,
  monthlyRatePct = 0.85
): {
  monthlyInstallment: number;
  totalInterest: number;
  totalPayable: number;
} {
  if (principal <= 0 || tenorMonths <= 0) {
    return { monthlyInstallment: 0, totalInterest: 0, totalPayable: 0 };
  }
  const totalInterest = Math.round(principal * (monthlyRatePct / 100) * tenorMonths);
  const totalPayable = Math.round(principal + totalInterest);
  const monthlyInstallment = Math.round(totalPayable / tenorMonths);
  return { monthlyInstallment, totalInterest, totalPayable };
}

export function calculateThpLoadRatio(
  monthlyInstallment: number,
  monthlyTakeHomePay = 6650000
): { percent: number; isSafe: boolean } {
  if (monthlyInstallment <= 0 || monthlyTakeHomePay <= 0) {
    return { percent: 0, isSafe: true };
  }
  const percent = Math.round((monthlyInstallment / monthlyTakeHomePay) * 100);
  return { percent, isSafe: percent < 30 };
}

export function filterDailyOrders(
  orders: ReadonlyArray<DailyOrder>,
  dateKey: string,
  statusFilter: 'Semua' | 'Menunggu' | 'Diterima',
  unitFilter: 'Semua' | 'SAI-B' | 'SAI-T' = 'Semua'
): DailyOrder[] {
  return orders.filter((o) => {
    if (o.dateKey !== dateKey) return false;
    if (statusFilter !== 'Semua' && o.status !== statusFilter) return false;
    if (unitFilter !== 'Semua' && o.unitCode !== unitFilter) return false;
    return true;
  });
}

export function computeSampleChecklistScore(checklist: {
  rasa: boolean;
  kemasan: boolean;
  suhu: boolean;
  porsi: boolean;
}): number {
  const weights = [
    checklist.rasa ? 30 : 0,
    checklist.kemasan ? 25 : 0,
    checklist.suhu ? 25 : 0,
    checklist.porsi ? 20 : 0,
  ];
  return weights.reduce((acc, v) => acc + v, 0);
}

export function calculateMarginMetrics(
  hppPrice: number,
  sellingPrice: number,
  qtyPerBatch: number
): {
  marginValue: number;
  marginPercent: number;
  isHealthyMargin: boolean;
  grossBatchIncome: number;
} {
  const safeHpp = Number.isFinite(hppPrice) && hppPrice > 0 ? hppPrice : 0;
  const safeSell = Number.isFinite(sellingPrice) && sellingPrice > 0 ? sellingPrice : 0;
  const safeQty = Number.isFinite(qtyPerBatch) && qtyPerBatch > 0 ? Math.floor(qtyPerBatch) : 0;

  if (safeSell <= 0 || safeHpp <= 0 || safeSell <= safeHpp) {
    return {
      marginValue: Math.max(0, safeSell - safeHpp),
      marginPercent: 0,
      isHealthyMargin: false,
      grossBatchIncome: safeHpp * safeQty,
    };
  }

  const marginValue = Math.round(safeSell - safeHpp);
  const marginPercent = Math.round((marginValue / safeSell) * 100);
  const isHealthyMargin = marginPercent >= 10 && marginPercent <= 35;

  return { marginValue, marginPercent, isHealthyMargin, grossBatchIncome: safeHpp * safeQty };
}
