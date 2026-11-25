import React from 'react';
import type { SampleTest } from '../../../types/kopkarSupplier';
import { computeSampleChecklistScore } from '../../../lib/kopkarsaiMath';

interface SampleInspectionCardProps {
  sample: SampleTest;
  localChecklist: SampleTest['checklist'];
  noteInput: string;
  onChecklistChange: (key: keyof SampleTest['checklist'], val: boolean) => void;
  onNoteChange: (note: string) => void;
  onEvaluate: (decision: 'Lulus' | 'Perlu Revisi') => void;
}

export const SampleInspectionCard: React.FC<SampleInspectionCardProps> = ({
  sample,
  localChecklist,
  noteInput,
  onChecklistChange,
  onNoteChange,
  onEvaluate,
}) => {
  const score = computeSampleChecklistScore(localChecklist);
  const scoreFive = (score / 20).toFixed(1);

  return (
    <div className="bg-white rounded-2xl border border-[#EAE4D3] p-4 sm:p-6 space-y-5 shadow-xs">
      <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#F0EBDC]">
        <div>
          <h2 className="text-[17px] font-semibold text-[#18221D]">{sample.productName}</h2>
          <p className="text-[12px] text-[#7A867E] mt-0.5 font-sans">
            {sample.supplier} · {sample.category} · {sample.batchCode}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[11px] text-[#7A867E]">Skor Uji</div>
          <div className="font-geist font-normal text-[24px] text-[#1F5B45] tabular-nums leading-tight">
            {score}/100
          </div>
          <div className="text-[11.5px] font-medium text-[#5C6F67] tabular-nums">
            ({scoreFive}/5)
          </div>
        </div>
      </div>

      {/* 3-Date Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 p-3.5 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] tabular-nums font-sans">
        <div>
          <div className="text-[11px] text-[#7A867E]">Drop Fisik</div>
          <div className="text-[12.5px] font-semibold text-[#18221D] mt-0.5">
            {sample.dropDateLabel ?? sample.submittedDate}
          </div>
        </div>
        <div>
          <div className="text-[11px] text-[#7A867E]">Uji Rasa</div>
          <div className="text-[12.5px] font-semibold text-[#18221D] mt-0.5">
            {sample.testDateLabel ?? 'Kamis, 26 Nov'}
          </div>
        </div>
        <div>
          <div className="text-[11px] text-[#7A867E]">Pengumuman</div>
          <div className="text-[12.5px] font-semibold text-[#18221D] mt-0.5">
            {sample.announcementDateLabel ?? 'Jumat, 27 Nov'}
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(
          [
            ['rasa', 'Rasa & Aroma (30%)'],
            ['kemasan', 'Kebersihan Kemasan (25%)'],
            ['suhu', 'Ketahanan Suhu (25%)'],
            ['porsi', 'Akurasi Porsi (20%)'],
          ] as const
        ).map(([key, label]) => (
          <label
            key={key}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] cursor-pointer text-[13px] font-sans"
          >
            <input
              type="checkbox"
              checked={localChecklist[key]}
              onChange={(e) => onChecklistChange(key, e.target.checked)}
              className="accent-[#1F5B45] w-4 h-4 cursor-pointer"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <div className="px-3.5 py-2.5 rounded-xl bg-[#EAF4EE]/60 border border-[#D4E7DA] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-[12px] font-sans">
        <span className="text-[#5C6F67]">Validasi Finansial (Margin Koperasi min. 20%)</span>
        <span className="font-semibold text-[#15803D] tabular-nums">
          Margin {sample.financialMarginPct ?? 20}% · Sesuai Standar
        </span>
      </div>

      <div>
        <label htmlFor="inspector-note" className="block text-[12.5px] font-medium text-[#5C6F67] mb-1.5 font-sans">
          Catatan Tim Kurasi
        </label>
        <textarea
          id="inspector-note"
          rows={3}
          value={noteInput}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Catatan singkat kualitas sampel atau instruksi revisi..."
          className="w-full bg-[#FAF7EE] border border-[#EAE4D3] rounded-xl p-3 text-[13px] font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5B45]"
        />
      </div>

      <div className="flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={() => onEvaluate('Perlu Revisi')}
          className="px-4 py-2 rounded-xl border border-[#FCA5A5] text-[#B91C1C] hover:bg-[#FEF2F2] text-[13px] font-medium cursor-pointer transition-colors"
        >
          Minta Revisi
        </button>
        <button
          type="button"
          onClick={() => onEvaluate('Lulus')}
          className="px-5 py-2 rounded-xl bg-[#1F5B45] hover:bg-[#174736] text-white text-[13px] font-medium cursor-pointer shadow-xs transition-colors"
        >
          Luluskan Sampel
        </button>
      </div>
    </div>
  );
};
