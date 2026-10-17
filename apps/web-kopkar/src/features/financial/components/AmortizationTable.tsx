import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileSpreadsheet } from 'lucide-react';
import { AmortizationScheduleRow } from '../../../types';
import { formatCurrencyIDR } from '../../../lib/utils';
import { Button } from '../../../components/ui/Button';

interface AmortizationTableProps {
  schedule: AmortizationScheduleRow[];
  onExportExcel: () => void;
}

export const AmortizationTable: React.FC<AmortizationTableProps> = ({ schedule, onExportExcel }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-4 shadow-bento space-y-3">
      {/* Header with expand toggle */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div>
          <h4 className="text-xs font-bold text-kopkar-dark">
            Rincian Amortisasi Bulanan ({schedule.length} Bulan)
          </h4>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Jadwal angsuran pokok, jasa bunga, dan sisa pokok
          </p>
        </div>
        <button className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Collapsible Table Content */}
      {isExpanded && (
        <div className="space-y-3 pt-2 border-t border-slate-100 animate-fade-in">
          <div className="max-h-64 overflow-y-auto rounded-2xl border border-slate-100 no-scrollbar">
            <table className="w-full text-left text-[11px] text-slate-600">
              <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 sticky top-0 border-b border-slate-200 z-10">
                <tr>
                  <th className="py-2 px-2.5">Bln</th>
                  <th className="py-2 px-2">Pokok</th>
                  <th className="py-2 px-2">Bunga</th>
                  <th className="py-2 px-2 text-right">Total Cicilan</th>
                  <th className="py-2 px-2.5 text-right">Sisa Pokok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {schedule.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/60">
                    <td className="py-2 px-2.5 font-bold text-slate-800">{row.month}</td>
                    <td className="py-2 px-2">{formatCurrencyIDR(row.principalPayment)}</td>
                    <td className="py-2 px-2 text-amber-700">{formatCurrencyIDR(row.interestPayment)}</td>
                    <td className="py-2 px-2 text-right font-extrabold text-kopkar-primary">
                      {formatCurrencyIDR(row.totalInstalment)}
                    </td>
                    <td className="py-2 px-2.5 text-right text-slate-400">
                      {formatCurrencyIDR(row.remainingBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={onExportExcel}
            className="border-emerald-200 text-kopkar-primary hover:bg-kopkar-mint/50"
          >
            <FileSpreadsheet size={14} className="text-emerald-600" />
            <span>Ekspor Jadwal ke Excel (.xlsx)</span>
          </Button>
        </div>
      )}
    </div>
  );
};
