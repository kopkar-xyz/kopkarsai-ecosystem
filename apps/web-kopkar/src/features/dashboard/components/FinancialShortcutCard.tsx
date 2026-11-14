import React from 'react';
import { Wallet, ArrowRight, ShieldCheck, PiggyBank } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useRouter } from '../../../app/router';

export const FinancialShortcutCard: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <Card
      variant="sage"
      padding="md"
      className="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#A9C3A2]"
    >
      <div className="space-y-1.5 z-10 max-w-xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1F5B45]/15 text-[#1F5B45] text-xs font-accent font-bold">
          <ShieldCheck size={14} className="text-[#2F6F56]" />
          <span>Solusi Kesejahteraan Anggota</span>
          <span className="text-[#5C6F67]">•</span>
          <span className="font-heading">Koperasi Digital</span>
        </div>

        <h3 className="text-lg sm:text-xl font-heading font-extrabold text-[#1A2421]">
          Layanan Simpan Pinjam Terpadu
        </h3>

        <p className="text-xs sm:text-sm font-body text-[#5C6F67]">
          Layanan simpanan sukarela, simpanan pokok, dan pengajuan pinjaman darurat & kesejahteraan dikelola secara terpusat pada halaman khusus.
        </p>

        <div className="flex items-center gap-3 pt-1 text-xs font-accent font-semibold text-[#1F5B45]">
          <span className="flex items-center gap-1">
            <PiggyBank size={14} className="text-[#2F6F56]" /> Saldo Tabungan
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Wallet size={14} className="text-[#2F6F56]" /> Plafon Pinjaman s.d. Rp 15 Juta
          </span>
        </div>
      </div>

      <div className="z-10 flex-shrink-0">
        <Button
          variant="primary"
          onClick={() => navigate('/financial')}
          className="w-full sm:w-auto shadow-md"
          icon={<ArrowRight size={16} />}
        >
          Buka Simpan Pinjam
        </Button>
      </div>
    </Card>
  );
};
