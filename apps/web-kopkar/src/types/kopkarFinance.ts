export interface LoanRecord {
  id: string;
  date: string;
  type: 'Simpanan Wajib' | 'Simpanan Sukarela' | 'Pinjaman Tunai' | 'Angsuran';
  description: string;
  amount: number;
  tenor?: number;
  status: 'Lunas' | 'Aktif' | 'Menunggu';
}

export interface SupplyRecommendation {
  id: string;
  productName: string;
  supplier: string;
  unitCode?: 'SAI-B' | 'SAI-T';
  currentStock: number;
  predictedDemand7d: number;
  avgDailyQty?: number;
  suggestedPOQty: number;
  deltaPercent?: number;
  signalTag?: string;
  confidencePct?: number;
  unitCost: number;
  urgency: 'Kritis' | 'Disarankan' | 'Aman';
  ordered: boolean;
}
