import React from 'react';
import { Eye } from 'lucide-react';
import type { SampleTest } from '../../../types/kopkarSupplier';

interface SampleInspectionCardProps {
  sample: SampleTest;
  scoreInput: number;
  noteInput: string;
  isReadOnly?: boolean;
  onScoreChange: (score: number) => void;
  onNoteChange: (note: string) => void;
  onEvaluate: (decision: 'Lulus' | 'Perlu Revisi') => void;
}

export const SampleInspectionCard: React.FC<SampleInspectionCardProps> = ({
  sample,
  scoreInput,
  noteInput,
  isReadOnly = false,
  onScoreChange,
  onNoteChange,
  onEvaluate,
}) => {
  const safeScore = Math.max(0, Math.min(100, Number.isFinite(scoreInput) ? scoreInput : 0));
  const scoreFive = (safeScore / 20).toFixed(1);

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
            {safeScore}/100
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

      {isReadOnly ? (
        <div className="rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] p-4 space-y-2 text-[12.5px]">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#165239]">
            <Eye className="w-3.5 h-3.5" />
            <span>Ringkasan Hasil Uji (Monitoring)</span>
          </div>
          <p className="text-[#526058] leading-relaxed">
            {noteInput || sample.inspectorNote || 'Belum ada catatan evaluasi dari tim kurasi toko.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="manual-score"
                className="block text-[12.5px] font-medium text-[#5C6F67] mb-1.5 font-sans"
              >
                Nilai Sampel (0–100)
              </label>
              <input
                id="manual-score"
                type="number"
                min={0}
                max={100}
                value={safeScore}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onScoreChange(Math.max(0, Math.min(100, Number.isNaN(val) ? 0 : val)));
                }}
                className="w-full h-11 px-3.5 bg-[#FAF7EE] border border-[#EAE4D3] rounded-xl text-[14px] font-semibold text-[#18221D] tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5B45]"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="inspector-note"
                className="block text-[12.5px] font-medium text-[#5C6F67] mb-1.5 font-sans"
              >
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
        </>
      )}
    </div>
  );
};
