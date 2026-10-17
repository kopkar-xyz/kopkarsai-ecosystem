import React, { useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import { PreOrderConfirmation } from './components/PreOrderConfirmation';
import { SampleStatusStepper } from './components/SampleStatusStepper';
import { SupplyAnalyticsCard } from './components/SupplyAnalyticsCard';
import { ProductSubmissionModal } from './components/ProductSubmissionModal';
import { Button } from '../../components/ui/Button';

export const SupplierHubView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleSubmissionSuccess = (productName: string) => {
    setSuccessToast(`Pengajuan "${productName}" berhasil dikirim! Silakan siapkan sampel fisik.`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="px-5 space-y-5 animate-fade-in">
      {/* Top Header & CTA */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
            KK-SCR-010 • Supplier Portal
          </span>
          <h2 className="text-xl font-extrabold text-kopkar-dark leading-tight">
            Hub Usaha Anggota
          </h2>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="shadow-sm font-bold"
        >
          <Plus size={14} strokeWidth={2.5} />
          <span>Ajukan Produk</span>
        </Button>
      </div>

      {/* Success Submission Toast */}
      {successToast && (
        <div className="p-3 bg-emerald-800 text-white rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-lg animate-fade-in border border-emerald-600">
          <CheckCircle2 size={16} className="text-kopkar-gold shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* 1. Pre-Order PO Confirmation Section */}
      <PreOrderConfirmation />

      {/* 2. Sample Status Stepper (Uji Kelayakan) */}
      <SampleStatusStepper />

      {/* 3. Daily Supply Recommendation Card */}
      <SupplyAnalyticsCard />

      {/* Modal Form Submission */}
      <ProductSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleSubmissionSuccess}
      />
    </div>
  );
};
