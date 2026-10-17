import React from 'react';
import { Sparkles, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { KopkarLogo } from '../../../components/ui/KopkarLogo';
import { formatCurrencyIDR } from '../../../lib/utils';

interface HeroFinancialCardProps {
  totalSavings: number;
  estimatedShu: number;
  onSimulateClick: () => void;
  onShopClick: () => void;
}

export const HeroFinancialCard: React.FC<HeroFinancialCardProps> = ({
  totalSavings,
  estimatedShu,
  onSimulateClick,
  onShopClick,
}) => {
  return (
    <div className="relative rounded-3xl bg-kopkar-primary text-white p-5 sm:p-6 shadow-xl overflow-hidden border border-emerald-800/40">
      {/* Background Golden Umbrella Watermark Ornament */}
      <div className="absolute -right-12 -top-12 pointer-events-none">
        <KopkarLogo size={220} variant="watermark" />
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/30 via-transparent to-kopkar-dock/60 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 space-y-4">
        {/* Top Mini Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-kopkar-gold border border-white/10">
            <Sparkles size={12} className="text-kopkar-gold" />
            <span>KOPKARSAI Digital Portal</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-200">
            <ShieldCheck size={14} className="text-kopkar-gold" />
            <span>Dual-Approval ACC</span>
          </div>
        </div>

        {/* Financial Numbers */}
        <div className="pt-1">
          <span className="text-xs font-medium text-emerald-200 tracking-wide uppercase">
            Total Simpanan Anggota
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono mt-0.5">
            {formatCurrencyIDR(totalSavings)}
          </div>

          {/* Sub item: Estimasi SHU */}
          <div className="mt-2.5 flex items-center justify-between p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs">
            <div className="flex flex-col">
              <span className="text-[10px] text-emerald-200 uppercase font-semibold">
                Estimasi SHU Berjalan 2026
              </span>
              <span className="font-bold text-kopkar-gold font-mono text-sm">
                + {formatCurrencyIDR(estimatedShu)}
              </span>
            </div>
            <span className="text-[10px] text-emerald-300 font-medium bg-emerald-900/60 px-2 py-0.5 rounded-full">
              Porsi Jasa Modal & Usaha
            </span>
          </div>
        </div>

        {/* Quick Shortcut Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={onSimulateClick}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-kopkar-gold text-kopkar-dock font-bold text-xs hover:bg-kopkar-gold-hover transition-all active:scale-95 shadow-sm"
          >
            <span>Simulasi Pinjaman</span>
            <ArrowRight size={13} strokeWidth={2.5} />
          </button>

          <button
            onClick={onShopClick}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-white/15 text-white hover:bg-white/25 border border-white/20 font-semibold text-xs transition-all active:scale-95 backdrop-blur-xs"
          >
            <ShoppingBag size={13} className="text-kopkar-gold" />
            <span>Belanja Toko</span>
          </button>
        </div>
      </div>
    </div>
  );
};
