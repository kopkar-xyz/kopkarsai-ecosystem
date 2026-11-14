import type { LoanSummary, SavingsSummary, OperationalStatus } from '../../types';

export interface LoanTransactionItem {
  id: string;
  type: 'DISBURSEMENT' | 'REPAYMENT';
  title: string;
  amount: number;
  date: string;
  status: OperationalStatus;
  refNumber: string;
  notes?: string;
}

export interface FinancialData {
  savings: SavingsSummary;
  loans: LoanSummary;
  transactions?: LoanTransactionItem[];
}
