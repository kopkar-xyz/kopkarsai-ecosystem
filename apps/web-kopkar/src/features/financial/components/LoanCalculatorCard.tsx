import React, { useState } from 'react';
import { Calculator, Download, ArrowRight } from 'lucide-react';
import { formatCurrencyIDR } from '../../../lib/utils';

interface LoanCalculatorCardProps {
  maxLoan?: number;
  initialAmount?: number;
  initialTenor?: number;
  onExportCsv?: () => void;
  onSubmitLoan?: (amount: number, tenor: number, purpose: string) => void;
}

/**
 * LoanCalculatorCard — Kalkulator Simulasi Pinjaman Kesejahteraan
 * Slicing 1:1 Presisi aistudio-src SinJamPage:
 * - Header: font-okashi text-[19px] text-[#18221D]
 * - Slider Nominal: font-okashi text-[20px] text-[#165239] tabular-nums
 * - Pilihan Tenor: rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] text-[13px] font-semibold
 * - Rincian: rounded-xl bg-[#FAF7EE] border border-[#EAE4D3]
 * - Tombol: rounded-xl bg-[#165239] text-white text-[13.5px] font-semibold
 * Budget: < 200 LOC.
 */
export const LoanCalculatorCard: React.FC<LoanCalculatorCardProps> = ({
  maxLoan = 35000000,
  initialAmount = 10000000,
  initialTenor = 12,
  onExportCsv,
  onSubmitLoan,
}) => {
  const [amount, setAmount] = useState(initialAmount);
  const [tenor, setTenor] = useState(initialTenor);
  const [purpose, setPurpose] = useState('Kebutuhan Pendidikan Keluarga');

  const principalPerMonth = Math.round(amount / tenor);
  const interestPerMonth = Math.round(amount * 0.01); // 1% flat
  const totalMonthlyPayroll = principalPerMonth + interestPerMonth;
  const estimatedThpPercent = Math.round((totalMonthlyPayroll / 6500000) * 100);

  const handleExport = () => {
    if (onExportCsv) {
      onExportCsv();
      return;
    }
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Parameter,Nilai\n' +
      `Nominal Pengajuan,${amount}\n` +
      `Tenor Bulan,${tenor}\n` +
      `Angsuran Pokok Bulanan,${principalPerMonth}\n` +
      `Jasa Koperasi (1%),${interestPerMonth}\n` +
      `Total Potong Payroll,${totalMonthlyPayroll}\n` +
      `Keperluan,${purpose}\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `simulasi_pinjaman_${amount}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-[#EAE4D3] rounded-2xl p-4 sm:p-6 space-y-5 select-none">
      {/* Header Kalkulator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#F0EBDC]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
            <Calculator className="w-[18px] h-[18px]" />
          </div>
          <div>
            <h2 className="font-okashi text-[19px] text-[#18221D]">
              Kalkulator Simulasi Pinjaman Kesejahteraan
            </h2>
            <p className="text-[12px] text-[#7A867E]">
              Hitung estimasi potongan payroll bulanan sebelum mengajukan (KK-SCR-012)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#EAE4D3] bg-[#FAF7EE] hover:bg-[#F3EDE0] text-[12.5px] font-medium text-[#18221D] cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-[#526058]" />
          <span>Ekspor Simulasi (.csv)</span>
        </button>
      </div>

      {/* Slider Nominal Pengajuan */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[13px]">
          <span className="text-[#526058]">Nominal Pengajuan:</span>
          <span className="font-okashi text-[20px] text-[#165239] tabular-nums">
            {formatCurrencyIDR(amount)}
          </span>
        </div>
        <input
          type="range"
          min={1000000}
          max={maxLoan}
          step={500000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full accent-[#165239] h-2 bg-[#FAF7EE] rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11.5px] text-[#7A867E]">
          <span>Min Rp 1.000.000</span>
          <span>Max Sisa Plafon: {formatCurrencyIDR(maxLoan)}</span>
        </div>
      </div>

      {/* Pilihan Tenor Angsuran */}
      <div className="space-y-2">
        <span className="block text-[13px] text-[#526058]">Pilihan Tenor Angsuran:</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[3, 6, 12, 24].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTenor(t)}
              className={`py-2.5 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer border ${
                tenor === t
                  ? 'bg-[#165239] text-white border-[#165239]'
                  : 'bg-[#FAF7EE] text-[#526058] border-[#EAE4D3] hover:text-[#18221D]'
              }`}
            >
              {t} Bulan
            </button>
          ))}
        </div>
      </div>

      {/* Rincian Amortisasi Bulanan */}
      <div className="p-4 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <span className="text-[11.5px] text-[#7A867E] block">Angsuran Pokok / Bulan</span>
          <span className="text-[14px] font-semibold text-[#18221D] tabular-nums mt-0.5 block">
            {formatCurrencyIDR(principalPerMonth)}
          </span>
        </div>
        <div>
          <span className="text-[11.5px] text-[#7A867E] block">Jasa Koperasi (1% flat)</span>
          <span className="text-[14px] font-semibold text-[#18221D] tabular-nums mt-0.5 block">
            {formatCurrencyIDR(interestPerMonth)}
          </span>
        </div>
        <div>
          <span className="text-[11.5px] text-[#7A867E] block">Total Potong Payroll</span>
          <span className="text-[14px] font-semibold text-[#165239] tabular-nums mt-0.5 block">
            {formatCurrencyIDR(totalMonthlyPayroll)}
          </span>
          <span className="text-[10.5px] text-[#526058] block mt-0.5">
            Estimasi beban THP: ~{estimatedThpPercent}% (&lt; 30% aman)
          </span>
        </div>
      </div>

      {/* Input Keperluan Pinjaman */}
      <div className="space-y-1.5">
        <label className="block text-[12.5px] font-medium text-[#526058]">Keperluan Pinjaman</label>
        <input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Isi keperluan pinjaman..."
          className="w-full bg-[#FAF7EE] border border-[#EAE4D3] rounded-xl px-3.5 py-2 text-[13px] text-[#18221D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#165239]"
        />
      </div>

      {/* Tombol Ajukan Pinjaman */}
      <button
        type="button"
        onClick={() => onSubmitLoan?.(amount, tenor, purpose)}
        className="w-full py-3 px-4 rounded-xl bg-[#165239] hover:bg-[#11402c] text-white text-[13px] sm:text-[13.5px] font-semibold flex items-center justify-center gap-2 text-center leading-snug transition-colors cursor-pointer"
      >
        <span>Ajukan Pinjaman Kesejahteraan Sebesar {formatCurrencyIDR(amount)}</span>
        <ArrowRight size={15} />
      </button>
    </div>
  );
};
