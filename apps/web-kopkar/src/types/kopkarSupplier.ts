export interface SampleTest {
  id: string;
  productId?: string;
  productName: string;
  supplier: string;
  category: string;
  batchCode: string;
  submittedDate: string;
  dropDateLabel?: string;
  testDateLabel?: string;
  announcementDateLabel?: string;
  image?: string;
  status: 'Menunggu Uji' | 'Lulus' | 'Perlu Revisi';
  stageBadge?: 'SCHEDULED' | 'IN_TESTING' | 'APPROVED' | 'REVISION_NEEDED';
  financialMarginPct?: number;
  score?: number;
  inspectorNote?: string;
  checklist: {
    rasa: boolean;
    kemasan: boolean;
    suhu: boolean;
    porsi: boolean;
  };
}

export interface RevisionLog {
  id: string;
  sampleId: string;
  productName: string;
  supplier: string;
  cycle: number;
  date: string;
  issueSummary: string;
  supplierAction: string;
  status: 'Dalam Perbaikan' | 'Siap Uji Ulang' | 'Selesai';
}
