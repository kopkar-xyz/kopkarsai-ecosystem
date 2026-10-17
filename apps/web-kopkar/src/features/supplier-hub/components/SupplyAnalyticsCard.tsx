import React from 'react';
import { TrendingUp, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';

export const SupplyAnalyticsCard: React.FC = () => {
  return (
    <Card variant="mint" padding="md" className="space-y-3.5 border-emerald-200/80 shadow-bento">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-kopkar-primary" />
          <h3 className="text-xs font-bold text-kopkar-dark uppercase tracking-wider">
            Analitik Rekomendasi Suplai Harian
          </h3>
        </div>
        <span className="text-[10px] font-bold text-kopkar-primary bg-white px-2 py-0.5 rounded-full shadow-2xs">
          AI Store Predictor
        </span>
      </div>

      <p className="text-[11px] text-slate-600 leading-relaxed">
        Kalkulasi otomatis berbasis data transaksi kasir toko & pesanan online 7 hari terakhir guna mencegah kelebihan pasokan (*zero food waste*).
      </p>

      {/* Recommended Qty Metric Box */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 rounded-2xl bg-white border border-emerald-100 shadow-2xs">
          <span className="text-[10px] text-slate-500 block">Nasi Bakar Cakalang:</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-extrabold text-kopkar-primary font-mono">
              25 - 30
            </span>
            <span className="text-[10px] text-slate-400">porsi</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[9px] text-emerald-700 font-bold mt-1">
            <TrendingUp size={11} />
            <span>Permintaan Tinggi</span>
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-emerald-100 shadow-2xs">
          <span className="text-[10px] text-slate-500 block">Risoles Mayo Daging:</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-extrabold text-kopkar-primary font-mono">
              40 - 50
            </span>
            <span className="text-[10px] text-slate-400">pcs</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[9px] text-emerald-700 font-bold mt-1">
            <CheckCircle2 size={11} />
            <span>Stok Cepat Habis</span>
          </span>
        </div>
      </div>

      {/* Rule Notice */}
      <div className="text-[10px] text-slate-500 pt-1 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-kopkar-gold" />
        <span>Katering basah yang tidak habis di hari-H dikembalikan kepada supplier pada jam 16:30.</span>
      </div>
    </Card>
  );
};
