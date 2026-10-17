import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { InterestMethod, LoanSimulationResult, AmortizationScheduleRow } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateLoanSimulation(
  principal: number,
  tenorMonths: number,
  method: InterestMethod = 'flat'
): LoanSimulationResult {
  // Suku bunga acuan KOPKARSAI:
  // Flat: 0.8% per bulan (setara 9.6% per tahun)
  // Menurun: 1.2% per bulan efektif
  const monthlyRate = method === 'flat' ? 0.008 : 0.012;
  const schedule: AmortizationScheduleRow[] = [];
  let currentBalance = principal;
  let totalInterest = 0;

  if (method === 'flat') {
    const monthlyPrincipal = Math.round(principal / tenorMonths);
    const monthlyInterest = Math.round(principal * monthlyRate);
    const fixedInstalment = monthlyPrincipal + monthlyInterest;

    for (let m = 1; m <= tenorMonths; m++) {
      const isLast = m === tenorMonths;
      const pPay = isLast ? currentBalance : monthlyPrincipal;
      const iPay = monthlyInterest;
      const rowTotal = pPay + iPay;
      currentBalance = Math.max(0, currentBalance - pPay);
      totalInterest += iPay;

      schedule.push({
        month: m,
        principalPayment: pPay,
        interestPayment: iPay,
        totalInstalment: rowTotal,
        remainingBalance: currentBalance,
      });
    }

    return {
      principal,
      tenorMonths,
      method,
      interestRateMonthly: monthlyRate,
      monthlyPrincipalAverage: monthlyPrincipal,
      firstMonthInstalment: fixedInstalment,
      totalInterest,
      totalPayment: principal + totalInterest,
      schedule,
    };
  } else {
    // Metode Bunga Menurun / Efektif
    const fixedPrincipal = Math.round(principal / tenorMonths);

    for (let m = 1; m <= tenorMonths; m++) {
      const isLast = m === tenorMonths;
      const pPay = isLast ? currentBalance : fixedPrincipal;
      const iPay = Math.round(currentBalance * monthlyRate);
      const rowTotal = pPay + iPay;
      currentBalance = Math.max(0, currentBalance - pPay);
      totalInterest += iPay;

      schedule.push({
        month: m,
        principalPayment: pPay,
        interestPayment: iPay,
        totalInstalment: rowTotal,
        remainingBalance: currentBalance,
      });
    }

    const firstMonthInstalment = schedule[0]?.totalInstalment ?? 0;

    return {
      principal,
      tenorMonths,
      method,
      interestRateMonthly: monthlyRate,
      monthlyPrincipalAverage: fixedPrincipal,
      firstMonthInstalment,
      totalInterest,
      totalPayment: principal + totalInterest,
      schedule,
    };
  }
}
