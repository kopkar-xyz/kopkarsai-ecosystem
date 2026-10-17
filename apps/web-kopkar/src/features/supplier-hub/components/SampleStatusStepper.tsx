import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { StatusBadge } from '../../../components/ui/StatusBadge';

export const SampleStatusStepper: React.FC = () => {
  const steps = [
    { num: 1, label: 'Form Pengajuan', desc: 'Selesai (14 Okt)', done: true },
    { num: 2, label: 'Drop Sampel Fisik', desc: 'Rabu Shift A (16 Okt)', done: true },
    { num: 3, label: 'Uji Kelayakan', desc: 'Kamis (Hari Ini)', current: true },
    { num: 4, label: 'Keputusan Kurasi', desc: 'Jumat (Besok)', done: false },
  ];

  return (
    <Card variant="white" padding="md" className="space-y-4 border-slate-200/80 shadow-bento">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-kopkar-primary bg-kopkar-mint px-2 py-0.5 rounded-full">
            Siklus Uji Sampel (KK-DEC-003)
          </span>
          <h4 className="text-xs sm:text-sm font-extrabold text-kopkar-dark mt-1">
            Puding Susu Karamel SAI (Cup 150ml)
          </h4>
        </div>
        <StatusBadge status="IN_REVIEW" label="Sedang Diuji" size="sm" />
      </div>

      {/* Stepper Steps Row */}
      <div className="relative pt-1 pb-2">
        <div className="flex items-center justify-between relative z-10">
          {steps.map((st, idx) => {
            return (
              <div key={st.num} className="flex flex-col items-center text-center flex-1">
                {/* Step Circle */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${st.done
                      ? 'bg-kopkar-primary text-white shadow-xs'
                      : st.current
                        ? 'bg-kopkar-gold text-kopkar-dock ring-4 ring-kopkar-gold-light font-black animate-pulse'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                >
                  {st.done ? <Check size={13} strokeWidth={3} /> : st.num}
                </div>

                {/* Step Label */}
                <span
                  className={`text-[10px] mt-2 font-bold leading-tight ${st.current ? 'text-kopkar-dark' : st.done ? 'text-kopkar-primary' : 'text-slate-400'
                    }`}
                >
                  {st.label}
                </span>

                <span className="text-[8px] text-slate-400 mt-0.5 leading-none">
                  {st.desc}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step connecting lines */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0">
          <div className="h-full bg-kopkar-primary w-2/3" />
        </div>
      </div>

      <div className="p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-2">
        <Clock size={14} className="text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-snug">
          Pengujian organoleptik rasa & ketahanan sedang diproses oleh tim kurator. Hasil akhir diumumkan hari <strong>Jumat pukul 15:00 WIB</strong> di dasbor ini.
        </p>
      </div>
    </Card>
  );
};
