import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, Calculator, ArrowRight, Download } from 'lucide-react';
import { Slider } from '../../../components/ui/Slider';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { AmortizationTable } from './AmortizationTable';
import { InterestMethod } from '../../../types';
import { formatCurrencyIDR, calculateLoanSimulation } from '../../../lib/utils';

export const LoanSimulator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(7500000);
  const [tenor, setTenor] = useState<number>(12);
  const [method, setMethod] = useState<InterestMethod>('flat');
  const [showToast, setShowToast] = useState<boolean>(false);

  const simulation = calculateLoanSimulation(principal, tenor, method);

  const handleExport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Toast Notification for Export */}
      {showToast && (
        <div className="p-3 bg-kopkar-primary text-white rounded-2xl text-xs font-semibold flex items-center justify-between shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-kopkar-gold" />
            <span>Jadwal simulasi pinjaman berhasil diekspor (.xlsx)</span>
          </div>
        </div>
      )}

      {/* Main Interactive Form Card */}
      <Card variant="white" padding="md" className="space-y-5 border-slate-200/80">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-kopkar-mint text-kopkar-primary flex items-center justify-center">
              <Calculator size={16} />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-kopkar-dark">Parameter Simulasi</h3>
              <p className="text-[10px] text-slate-400">Plafon khusus anggota KOPKARSAI</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-kopkar-mint px-2 py-0.5 rounded-full">
            Batas Maks. 20 Juta
          </span>
        </div>

        {/* 1. Slider Nominal Pinjaman */}
        <Slider
          label="Plafon Pengajuan Pinjaman"
          value={principal}
          min={1000000}
          max={20000000}
          step={500000}
          onChange={setPrincipal}
          formatValue={formatCurrencyIDR}
          helperText="Kelipatan Rp 500.000"
        />

        {/* 2. Tenor Selection (Bulan) */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-kopkar-dark block">
            Jangka Waktu Tenor (Bulan)
          </span>
          <div className="grid grid-cols-4 gap-2">
            {[3, 6, 12, 24].map((t) => {
              const isSelected = tenor === t;
              return (
                <button
                  key={t}
                  onClick={() => setTenor(t)}
                  className={`py-2 px-1 text-xs font-bold rounded-2xl transition-all duration-150 select-none ${isSelected
                      ? 'bg-kopkar-primary text-white shadow-md scale-102 ring-2 ring-kopkar-gold/50'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                    }`}
                >
                  {t} Bulan
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Interest Method Toggle */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-kopkar-dark block">
            Metode Perhitungan Bunga
          </span>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => setMethod('flat')}
              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all select-none ${method === 'flat'
                  ? 'bg-white text-kopkar-primary shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              Bunga Flat (0.8%/bln)
            </button>
            <button
              onClick={() => setMethod('decreasing')}
              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all select-none ${method === 'decreasing'
                  ? 'bg-white text-kopkar-primary shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              Bunga Menurun (1.2%/bln)
            </button>
          </div>
        </div>
      </Card>

      {/* Result Summary Card (Emerald & Warm Gold) */}
      <div className="rounded-3xl bg-kopkar-primary text-white p-5 shadow-xl space-y-4 border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-kopkar-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div>
          <span className="text-[11px] font-medium text-emerald-200 uppercase tracking-wider block">
            {method === 'flat' ? 'Angsuran Tetap Bulanan' : 'Angsuran Bulan Pertama'}
          </span>
          <div className="text-3xl font-extrabold text-kopkar-gold font-mono mt-1 leading-tight">
            {formatCurrencyIDR(simulation.firstMonthInstalment)}
            <span className="text-xs font-normal text-emerald-200 ml-1">/ bulan</span>
          </div>
          {method === 'decreasing' && (
            <p className="text-[10px] text-emerald-200/90 mt-1">
              *Angsuran akan menurun setiap bulan seiring berkurangnya saldo pokok.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-emerald-800/60 text-xs">
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs">
            <span className="text-[10px] text-emerald-200 block">Total Jasa / Bunga:</span>
            <span className="font-bold text-white font-mono mt-0.5 block">
              {formatCurrencyIDR(simulation.totalInterest)}
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs">
            <span className="text-[10px] text-emerald-200 block">Total Pengembalian:</span>
            <span className="font-bold text-white font-mono mt-0.5 block">
              {formatCurrencyIDR(simulation.totalPayment)}
            </span>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Table Component */}
      <AmortizationTable schedule={simulation.schedule} onExportExcel={handleExport} />

      {/* Official Disclaimer Box (KK-DEC-002 Invariant) */}
      <div className="p-3.5 rounded-2.5xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5 text-[11px] leading-relaxed">
        <ShieldAlert size={16} className="text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">Ketentuan Simulasi Resmi (KK-DEC-002):</span>
          Kalkulator ini merupakan alat simulasi edukatif bagi anggota koperasi. Realisasi pinjaman riil tetap tunduk pada verifikasi berkas, persetujuan pengurus, serta kuota pemotongan gaji (*payroll deduction*) maksimal 30% dari penghasilan bulanan.
        </div>
      </div>
    </div>
  );
};
