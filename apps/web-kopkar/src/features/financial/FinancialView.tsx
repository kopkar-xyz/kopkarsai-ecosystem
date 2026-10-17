import React, { useState } from 'react';
import { Calculator, PiggyBank } from 'lucide-react';
import { LoanSimulator } from './components/LoanSimulator';
import { SavingsProjection } from './components/SavingsProjection';

export const FinancialView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'loan' | 'savings'>('loan');

  return (
    <div className="px-5 space-y-4 animate-fade-in">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
            KK-SCR-012 • Financial Module
          </span>
          <h2 className="text-xl font-extrabold text-kopkar-dark leading-tight">
            Simpan Pinjam & Finansial
          </h2>
        </div>
      </div>

      {/* Sub-tab Toggle Bar */}
      <div className="p-1.5 bg-white rounded-3xl border border-slate-200/80 shadow-2xs grid grid-cols-2 gap-1.5">
        <button
          onClick={() => setActiveSubTab('loan')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-2xl text-xs font-bold transition-all ${activeSubTab === 'loan'
              ? 'bg-kopkar-primary text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
            }`}
        >
          <Calculator size={14} />
          <span>Simulasi Pinjaman</span>
        </button>

        <button
          onClick={() => setActiveSubTab('savings')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-2xl text-xs font-bold transition-all ${activeSubTab === 'savings'
              ? 'bg-kopkar-primary text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
            }`}
        >
          <PiggyBank size={14} />
          <span>Proyeksi Simpanan</span>
        </button>
      </div>

      {/* Content Rendering */}
      {activeSubTab === 'loan' ? <LoanSimulator /> : <SavingsProjection />}
    </div>
  );
};
