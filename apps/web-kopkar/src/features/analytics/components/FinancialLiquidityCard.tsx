import React from 'react';
import { ShieldCheck, Wallet, ArrowUpRight } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR } from '../../../lib/utils';
import { useRouter } from '../../../app/router';

interface FinancialLiquidityCardProps {
  liquidity: {
    totalSavings: number;
    disbursedLoans: number;
    liquidReserve: number;
    healthRatio: number;
  };
}

export const FinancialLiquidityCard: React.FC<FinancialLiquidityCardProps> = ({
  liquidity,
}) => {
  const { navigate } = useRouter();

  return (
    <Card variant="forest" padding="md" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#2F6F56]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-[#A9C3A2]">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-heading font-extrabold text-white">
              Kesehatan Likuiditas & Simpan Pinjam
            </h2>
            <p className="text-xs font-body text-[#F3ECDD]/80">
              Rasio dana kas koperasi terhadap pinjaman aktif anggota
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/financial')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-[#1F5B45] hover:bg-[#F3ECDD] text-xs font-heading font-bold shadow-sm transition-all cursor-pointer self-start sm:self-auto active:scale-95"
        >
          <span>Detail SinJam</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-2xl bg-black/20 border border-white/10">
          <span className="text-[11px] font-accent text-[#A9C3A2]">Total Simpanan Anggota</span>
          <p className="text-base sm:text-lg font-heading font-extrabold text-white mt-0.5">
            {formatCurrencyIDR(liquidity.totalSavings)}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-black/20 border border-white/10">
          <span className="text-[11px] font-accent text-[#A9C3A2]">Pinjaman Tersalurkan</span>
          <p className="text-base sm:text-lg font-heading font-extrabold text-[#F3ECDD] mt-0.5">
            {formatCurrencyIDR(liquidity.disbursedLoans)}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-black/20 border border-white/10">
          <span className="text-[11px] font-accent text-[#A9C3A2]">Cadangan Kas Likuid</span>
          <p className="text-base sm:text-lg font-heading font-extrabold text-white mt-0.5">
            {formatCurrencyIDR(liquidity.liquidReserve)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-body text-[#F3ECDD]/85 pt-1">
        <span className="flex items-center gap-1.5">
          <Wallet size={14} className="text-[#A9C3A2]" />
          <span>Indeks Likuiditas Aman: Mandiri & Bebas Risiko Gagal Bayar</span>
        </span>
        <span className="font-accent font-bold text-[#A9C3A2]">
          Rasio: {liquidity.healthRatio}% (Sehat)
        </span>
      </div>
    </Card>
  );
};
