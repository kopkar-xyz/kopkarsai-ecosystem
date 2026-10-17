import React, { useState } from 'react';
import { PiggyBank, TrendingUp, Sparkles, HelpCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Slider } from '../../../components/ui/Slider';
import { formatCurrencyIDR } from '../../../lib/utils';

export const SavingsProjection: React.FC = () => {
  const [voluntaryMonthly, setVoluntaryMonthly] = useState<number>(300000);
  const [horizonYears, setHorizonYears] = useState<number>(3);

  const pokok = 100000;
  const wajibMonthly = 50000;
  const totalMonths = horizonYears * 12;

  const totalWajib = wajibMonthly * totalMonths;
  const totalSukarela = voluntaryMonthly * totalMonths;
  const totalSimpananPokokPlusRutin = pokok + totalWajib + totalSukarela;

  // Asumsi rata-rata dividen SHU Jasa Modal tahunan: 8.5%
  // Kalkulasi kumulatif sederhana
  const estimatedShuReturn = Math.round(totalSimpananPokokPlusRutin * 0.085 * (horizonYears / 2));
  const grandTotal = totalSimpananPokokPlusRutin + estimatedShuReturn;

  return (
    <div className="space-y-4">
      <Card variant="white" padding="md" className="space-y-4 border-slate-200/80">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <div className="w-8 h-8 rounded-full bg-kopkar-mint text-kopkar-primary flex items-center justify-center">
            <PiggyBank size={16} />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-kopkar-dark">Struktur Simpanan Koperasi</h3>
            <p className="text-[10px] text-slate-400">Aturan AD/ART KOPKARSAI</p>
          </div>
        </div>

        {/* Fixed breakdown info */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-500 block">Simpanan Pokok:</span>
            <span className="font-bold text-slate-800 font-mono text-sm mt-0.5 block">
              Rp 100.000
            </span>
            <span className="text-[9px] text-slate-400 mt-1 block">Dibayar 1x saat awal daftar</span>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-500 block">Simpanan Wajib:</span>
            <span className="font-bold text-kopkar-primary font-mono text-sm mt-0.5 block">
              Rp 50.000 / bln
            </span>
            <span className="text-[9px] text-slate-400 mt-1 block">Potong gaji otomatis rutin</span>
          </div>
        </div>

        {/* Voluntary Slider */}
        <div className="pt-2">
          <Slider
            label="Simpanan Sukarela Tambahan (Per Bulan)"
            value={voluntaryMonthly}
            min={50000}
            max={2000000}
            step={50000}
            onChange={setVoluntaryMonthly}
            formatValue={formatCurrencyIDR}
            helperText="Dapat diubah kapan saja"
          />
        </div>

        {/* Horizon Years */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-semibold text-kopkar-dark block">
            Jangka Waktu Proyeksi
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[1, 3, 5].map((y) => {
              const isSelected = horizonYears === y;
              return (
                <button
                  key={y}
                  onClick={() => setHorizonYears(y)}
                  className={`py-2 px-2 text-xs font-bold rounded-2xl transition-all ${isSelected
                      ? 'bg-kopkar-primary text-white shadow-md ring-2 ring-kopkar-gold/40'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                    }`}
                >
                  {y} Tahun ({y * 12} Bln)
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Projection Summary Card */}
      <div className="rounded-3xl bg-gradient-to-br from-kopkar-primary to-kopkar-dock text-white p-5 shadow-xl space-y-4">
        <div>
          <span className="text-[10px] font-bold text-kopkar-gold uppercase tracking-wider block">
            Estimasi Akumulasi Simpanan + SHU ({horizonYears} Tahun)
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
            {formatCurrencyIDR(grandTotal)}
          </div>
          <p className="text-[10px] text-emerald-200 mt-1">
            Total simpanan pokok Anda bertambah dan menghasilkan dividen sisa hasil usaha tahunan.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-800 text-xs">
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs">
            <span className="text-[10px] text-emerald-200 block">Total Pokok Tersimpan:</span>
            <span className="font-bold text-white font-mono mt-0.5 block">
              {formatCurrencyIDR(totalSimpananPokokPlusRutin)}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs">
            <span className="text-[10px] text-kopkar-gold block">Estimasi SHU Modal:</span>
            <span className="font-bold text-kopkar-gold font-mono mt-0.5 block">
              + {formatCurrencyIDR(estimatedShuReturn)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
