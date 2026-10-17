import React, { useState } from 'react';
import { Calculator, Store, ShoppingBag, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { formatCurrencyIDR, calculateLoanSimulation } from '../../../lib/utils';

interface BentoServicesGridProps {
  onOpenFinancial: () => void;
  onOpenSupplier: () => void;
  onOpenMarketplace: () => void;
}

export const BentoServicesGrid: React.FC<BentoServicesGridProps> = ({
  onOpenFinancial,
  onOpenSupplier,
  onOpenMarketplace,
}) => {
  // Quick slider on left card
  const [quickLoanAmount, setQuickLoanAmount] = useState<number>(5000000);
  const simulation = calculateLoanSimulation(quickLoanAmount, 12, 'flat');

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-bold text-kopkar-dark uppercase tracking-wider">
          Layanan Unggulan Anggota
        </h2>
        <span className="text-[11px] text-kopkar-primary font-semibold">Bento Hub</span>
      </div>

      {/* Bento Grid Layout matching Image 1: Tall Card Left + Two Stacked Cards Right */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card Kiri: Tinggi, Warm Cream (Kalkulator Pinjaman Cepat) */}
        <Card
          variant="cream"
          padding="sm"
          className="flex flex-col justify-between border-amber-200/60 shadow-bento group"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                Finansial
              </span>
              <div className="w-7 h-7 rounded-full bg-white text-kopkar-dark flex items-center justify-center shadow-2xs">
                <Calculator size={14} className="text-amber-700" />
              </div>
            </div>

            <h3 className="text-sm font-extrabold text-kopkar-dark mt-2.5 leading-snug">
              Kalkulator Cepat
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Simulasi bunga flat 0.8%/bln
            </p>

            {/* Interactive Quick Slider */}
            <div className="mt-3.5 space-y-1.5 bg-white/70 p-2.5 rounded-2xl border border-amber-100/80">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Plafon:</span>
                <span className="font-bold text-amber-900 font-mono text-xs">
                  {formatCurrencyIDR(quickLoanAmount)}
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={15000000}
                step={500000}
                value={quickLoanAmount}
                onChange={(e) => setQuickLoanAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-amber-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>1 Juta</span>
                <span>15 Juta</span>
              </div>
            </div>

            {/* Cicilan Bulanan Result */}
            <div className="mt-3 p-2.5 rounded-2xl bg-amber-100/50 border border-amber-200/50">
              <span className="text-[10px] text-amber-800 font-medium block">
                Estimasi Cicilan (12 Bulan):
              </span>
              <span className="text-base font-extrabold text-kopkar-dark font-mono mt-0.5 block">
                {formatCurrencyIDR(simulation.firstMonthInstalment)}
                <span className="text-[10px] font-normal text-slate-500">/bln</span>
              </span>
            </div>
          </div>

          {/* Action Link Button */}
          <button
            onClick={onOpenFinancial}
            className="mt-4 w-full py-2 px-3 rounded-full bg-kopkar-dark text-white font-bold text-[11px] flex items-center justify-center gap-1 hover:bg-slate-900 active:scale-95 transition-all shadow-xs"
          >
            <span>Kalkulator Lengkap</span>
            <ArrowUpRight size={13} />
          </button>
        </Card>

        {/* Kolom Kanan: 2 Kartu Ditumpuk */}
        <div className="flex flex-col gap-3">
          {/* Card Kanan Atas: Mint Soft (Hub Supplier UMKM) */}
          <Card
            variant="mint"
            padding="sm"
            interactive
            onClick={onOpenSupplier}
            className="flex-1 flex flex-col justify-between border-emerald-200/60 shadow-bento group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Supplier
                </span>
                <span className="w-2 h-2 rounded-full bg-kopkar-gold animate-pulse" />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-8 rounded-xl bg-white text-kopkar-primary flex items-center justify-center shadow-2xs">
                  <Store size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-kopkar-dark leading-tight">
                    Hub UMKM
                  </h3>
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    2 PO Katering
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-slate-600 mt-1.5 leading-snug">
                Pesanan H-1 menunggu konfirmasi kesanggupan pasokan.
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-kopkar-primary-dark group-hover:text-kopkar-primary">
              <span>Buka Dasbor PO</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Card>

          {/* Card Kanan Bawah: Kuning Aksen (Pintasan Marketplace) */}
          <Card
            variant="gold"
            padding="sm"
            interactive
            onClick={onOpenMarketplace}
            className="flex-1 flex flex-col justify-between shadow-card-gold group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-kopkar-dock bg-white/40 px-2 py-0.5 rounded-full">
                  Marketplace
                </span>
                <div className="w-7 h-7 rounded-full bg-kopkar-dock text-kopkar-gold flex items-center justify-center">
                  <ShoppingBag size={13} />
                </div>
              </div>

              <h3 className="text-xs font-extrabold text-kopkar-dock mt-2 leading-tight">
                Belanja Koperasi
              </h3>
              <p className="text-[10px] text-kopkar-dock/80 mt-1 leading-snug font-medium">
                Katering basah H-1 & produk toko fisik same-day.
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-extrabold text-kopkar-dock">
              <span>Buka Katalog Toko</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
