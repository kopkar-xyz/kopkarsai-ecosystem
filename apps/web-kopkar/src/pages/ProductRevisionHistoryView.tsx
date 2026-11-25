import React, { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useRouter } from '../app/router';
import { KpiStatCard } from '../components/ui/KpiStatCard';
import { INITIAL_FORM_DATA } from '../features/product-submission/hooks/useProductSubmission';
import { useProductStore } from '../features/product-submission/context/ProductStoreContext';
import { RevisionProductList } from '../features/supplier-hub/components/RevisionProductList';
import { RevisionTimelineCard } from '../features/supplier-hub/components/RevisionTimelineCard';
import {
  INITIAL_UNIFIED_REVISION_LOGS,
  type LogFilterType,
  type UnifiedLogItem,
} from '../features/supplier-hub/data/revisionLogData';

export const ProductRevisionHistoryView: React.FC = () => {
  const { navigate } = useRouter();
  const { setSelectedProductId, setSelectedRevisionData } = useProductStore();

  const [items, setItems] = useState<UnifiedLogItem[]>(INITIAL_UNIFIED_REVISION_LOGS);
  const [filter, setFilter] = useState<LogFilterType>('Semua');
  const [search, setSearch] = useState('');
  const [drawerKey, setDrawerKey] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      all: items.length,
      revisi: items.filter((i) => i.filterBucket === 'Perlu Revisi').length,
      uji: items.filter((i) => i.filterBucket === 'Menunggu Uji').length,
      aktif: items.filter((i) => i.filterBucket === 'Aktif Etalase').length,
    }),
    [items]
  );

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchFilter = filter === 'Semua' ? true : item.filterBucket === filter;
      const matchSearch =
        !q ||
        item.productName.toLowerCase().includes(q) ||
        item.supplier.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [items, filter, search]);

  const activeDrawerItem = drawerKey
    ? items.find((i) => i.key === drawerKey) ?? null
    : null;

  const handleAdvanceRevision = (key: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.key !== key || !item.revisionStatus) return item;
        const nextStatus =
          item.revisionStatus === 'Dalam Perbaikan' ? 'Siap Uji Ulang' : 'Selesai';
        return {
          ...item,
          revisionStatus: nextStatus,
          statusBadge: nextStatus,
          filterBucket: nextStatus === 'Selesai' ? 'Aktif Etalase' : 'Menunggu Uji',
          entries: item.entries.map((entry, idx) =>
            idx === 0 ? { ...entry, statusLabel: nextStatus } : entry
          ),
        };
      })
    );
  };

  const handleOpenRevisionForm = (item: UnifiedLogItem) => {
    setSelectedRevisionData({
      ...INITIAL_FORM_DATA,
      id: item.detailProductId,
      name: item.productName,
      costPrice: item.hppPrice ?? INITIAL_FORM_DATA.costPrice,
      sellingPrice: item.sellingPrice ?? INITIAL_FORM_DATA.sellingPrice,
      qtyKirim: item.qtyPerBatch ?? INITIAL_FORM_DATA.qtyKirim,
      ingredients: item.ingredients ?? INITIAL_FORM_DATA.ingredients,
      additionalNotes: item.specialNotes ?? '',
      imagePreviewUrl: item.image ?? '',
    });
    navigate('/products/new');
  };

  const handleSelectProduct = (detailProductId: string) => {
    setSelectedProductId(detailProductId);
    navigate('/products/detail');
  };

  return (
    <div className="space-y-5 animate-fadeIn select-none">
      {/* 1. 3 Kartu KPI Ringkasan (Gaya Beranda) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiStatCard
          label="Perlu Revisi"
          value={counts.revisi}
          unit="produk"
          pill="Menunggu perbaikan mitra"
          pillTone="warning"
          icon={AlertCircle}
        />
        <KpiStatCard
          label="Menunggu Uji Ulang"
          value={counts.uji}
          unit="produk"
          pill="Antrean kurasi koperasi"
          pillTone="warning"
          icon={Clock}
        />
        <KpiStatCard
          label="Aktif di Etalase"
          value={counts.aktif}
          unit="produk"
          pill="Kurasi lolos & HPP terkunci"
          icon={CheckCircle2}
        />
      </div>

      {/* 2. Tabel Riwayat Revisi & Versi Produk */}
      <RevisionProductList
        items={filteredItems}
        counts={counts}
        filter={filter}
        search={search}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
        onOpenDrawer={(item) => setDrawerKey(item.key)}
      />

      {/* 3. Slide-Over Drawer Linimasa Revisi & Kurasi */}
      <RevisionTimelineCard
        item={activeDrawerItem}
        onClose={() => setDrawerKey(null)}
        onAdvanceRevision={handleAdvanceRevision}
        onOpenRevisionForm={handleOpenRevisionForm}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
};
