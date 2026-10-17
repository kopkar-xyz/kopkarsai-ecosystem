# Frontend Feature Module Templates (React + TypeScript)

Gunakan template acuan di bawah ini saat menyusun modul fitur antarmuka baru.

---

## 1. `types.ts` (TypeScript Domain Contracts)

```typescript
export type SubmissionStatus = 'PROPOSED' | 'SAMPLE_SCHEDULED' | 'APPROVED' | 'REJECTED';

export interface ProductSubmission {
  id: number;
  supplierId: number;
  productName: str;
  productType: 'CATERING' | 'STORE';
  costPrice: number;
  proposedSalePrice: number;
  status: SubmissionStatus;
  photoUrl?: string;
  createdAt: string;
}

export interface CreateSubmissionPayload {
  productName: string;
  productType: 'CATERING' | 'STORE';
  costPrice: number;
  proposedSalePrice: number;
  photoS3Key?: string;
}
```

---

## 2. `api/<domain>-api.ts` (API Client)

```typescript
import { apiClient } from '@/lib/api-client';
import { ProductSubmission, CreateSubmissionPayload } from '../types';

export const productSubmissionsApi = {
  async getSubmissions(): Promise<ProductSubmission[]> {
    const { data } = await apiClient.get<ProductSubmission[]>('/api/v1/products/submissions');
    return data;
  },

  async createSubmission(payload: CreateSubmissionPayload): Promise<ProductSubmission> {
    const { data } = await apiClient.post<ProductSubmission>('/api/v1/products/submissions', payload);
    return data;
  },
};
```

---

## 3. `hooks/use<Domain>.ts` (Custom Orchestration Hook)

```typescript
import { useState, useEffect, useCallback } from 'react';
import { productSubmissionsApi } from '../api/submissions-api';
import { ProductSubmission, CreateSubmissionPayload } from '../types';

export function useProductSubmissions() {
  const [submissions, setSubmissions] = useState<ProductSubmission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchSubmissions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productSubmissionsApi.getSubmissions();
      setSubmissions(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Gagal memuat data pengajuan produk');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const submitProduct = async (payload: CreateSubmissionPayload): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      await productSubmissionsApi.createSubmission(payload);
      await fetchSubmissions();
      return true;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Gagal mengajukan produk');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submissions,
    isLoading,
    error,
    isSubmitting,
    submitProduct,
    refresh: fetchSubmissions,
  };
}
```

---

## 4. `components/<Domain>Table.tsx` (Feature Component)

```tsx
import React from 'react';
import { ProductSubmission } from '../types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatCurrencyIDR, formatDate } from '@/lib/utils';

interface SubmissionsTableProps {
  items: ProductSubmission[];
  isLoading: boolean;
  onSelect?: (item: ProductSubmission) => void;
}

export const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ items, isLoading, onSelect }) => {
  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Memuat data pengajuan...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 border border-dashed rounded-xl">
        Belum ada pengajuan produk yang terdaftar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
          <tr>
            <th className="py-3 px-4">Nama Produk</th>
            <th className="py-3 px-4">Kategori</th>
            <th className="py-3 px-4">HPP</th>
            <th className="py-3 px-4">Usulan Harga</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Tanggal Pengajuan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((sub) => (
            <tr
              key={sub.id}
              onClick={() => onSelect?.(sub)}
              className="hover:bg-slate-50/75 cursor-pointer transition-colors"
            >
              <td className="py-3 px-4 font-medium text-slate-900">{sub.productName}</td>
              <td className="py-3 px-4">{sub.productType === 'CATERING' ? 'Katering Basah' : 'Produk Toko'}</td>
              <td className="py-3 px-4 font-mono">{formatCurrencyIDR(sub.costPrice)}</td>
              <td className="py-3 px-4 font-mono text-emerald-700 font-semibold">{formatCurrencyIDR(sub.proposedSalePrice)}</td>
              <td className="py-3 px-4">
                <StatusBadge status={sub.status} />
              </td>
              <td className="py-3 px-4 text-slate-400">{formatDate(sub.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

---

## 5. `src/pages/<Domain>View.tsx` (Thin Page View < 200 LOC)

```tsx
import React, { useState } from 'react';
import { useProductSubmissions } from '@/features/supplier-submissions/hooks/useProductSubmissions';
import { SubmissionsTable } from '@/features/supplier-submissions/components/SubmissionsTable';
import { SubmissionFormModal } from '@/features/supplier-submissions/components/SubmissionFormModal';
import { Button } from '@/components/ui/Button';

export const SupplierSubmissionsView: React.FC = () => {
  const { submissions, isLoading, isSubmitting, submitProduct, refresh } = useProductSubmissions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase">KK-SCR-007</span>
          <h1 className="text-2xl font-bold text-slate-900">Pengajuan Produk Supplier</h1>
          <p className="text-sm text-slate-500 mt-1">Daftarkan produk makanan/minuman untuk uji kelayakan sampel koperasi.</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Ajukan Produk Baru
        </Button>
      </div>

      {/* Main Feature Content */}
      <SubmissionsTable items={submissions} isLoading={isLoading} />

      {/* Submission Modal */}
      <SubmissionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (payload) => {
          const ok = await submitProduct(payload);
          if (ok) setIsModalOpen(false);
        }}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
```
