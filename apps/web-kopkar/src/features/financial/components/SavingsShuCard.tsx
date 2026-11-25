import React from 'react';
import { PiggyBank } from 'lucide-react';
import { formatCurrencyIDR } from '../../../lib/utils';

interface SavingsShuCardProps {
  simpananPokok?: number;
  simpananWajib?: number;
  simpananSukarela?: number;
  estimasiShu?: number;
}

/**
 * SavingsShuCard — Saldo Simpanan & Estimasi SHU Tahunan
 * Slicing 1:1 Presisi aistudio-src SinJamPage:
 * - Header: font-okashi text-[19px] text-[#18221D]
 * - Container: rounded-2xl border border-[#EAE4D3] bg-white p-6
 * - Kotak rincian: rounded-xl bg-[#FAF7EE] border border-[#EAE4D3]
 * Budget: < 200 LOC.
 */
export const SavingsShuCard: React.FC<SavingsShuCardProps> = ({
  simpananPokok = 100000,
  simpananWajib = 1200000,
  simpananSukarela = 3500000,
  estimasiShu = 425000,
}) => {
  const totalActiveSavings = simpananPokok + simpananWajib + simpananSukarela;

  return (
    <div className="bg-white border border-[#EAE4D3] rounded-2xl p-6 space-y-4 select-none">
      {/* Header Saldo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EBDC] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#EAF4EE] text-[#165239] flex items-center justify-center">
            <PiggyBank size={18} />
          </div>
          <h2 className="font-okashi text-[19px] text-[#18221D]">
            Saldo Simpanan & Estimasi SHU Tahunan
          </h2>
        </div>
        <span className="text-[12.5px] text-[#526058]">
          Total Saldo Aktif:{' '}
          <strong className="text-[#18221D] font-semibold tabular-nums">
            {formatCurrencyIDR(totalActiveSavings)}
          </strong>
        </span>
      </div>

      {/* Grid 4 Kotak Simpanan & SHU */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#FAF7EE] rounded-xl p-3.5 border border-[#EAE4D3]">
          <span className="text-[11.5px] text-[#7A867E] block">
            Simpanan Pokok:
          </span>
          <span className="text-[14px] font-semibold text-[#18221D] block mt-1 tabular-nums">
            {formatCurrencyIDR(simpananPokok)}
          </span>
        </div>

        <div className="bg-[#FAF7EE] rounded-xl p-3.5 border border-[#EAE4D3]">
          <span className="text-[11.5px] text-[#7A867E] block">
            Simpanan Wajib:
          </span>
          <span className="text-[14px] font-semibold text-[#18221D] block mt-1 tabular-nums">
            {formatCurrencyIDR(simpananWajib)}
          </span>
        </div>

        <div className="bg-[#FAF7EE] rounded-xl p-3.5 border border-[#EAE4D3]">
          <span className="text-[11.5px] text-[#7A867E] block">
            Simpanan Sukarela:
          </span>
          <span className="text-[14px] font-semibold text-[#18221D] block mt-1 tabular-nums">
            {formatCurrencyIDR(simpananSukarela)}
          </span>
        </div>

        <div className="bg-[#EAF4EE] rounded-xl p-3.5 border border-[#B7DFC7] text-[#165239]">
          <span className="text-[11.5px] text-[#15803D] block font-medium">
            Estimasi SHU Tahun Ini:
          </span>
          <span className="text-[14px] font-semibold text-[#165239] block mt-1 tabular-nums">
            {formatCurrencyIDR(estimasiShu)}
          </span>
        </div>
      </div>
    </div>
  );
};
