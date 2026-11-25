import React from 'react';
import { FlaskConical } from 'lucide-react';
import type { SampleTest } from '../../../types/kopkarSupplier';
import { computeSampleChecklistScore } from '../../../lib/kopkarsaiMath';

interface SampleQueueListProps {
  samples: SampleTest[];
  selectedId: string;
  onSelect: (sample: SampleTest) => void;
}

export const SampleQueueList: React.FC<SampleQueueListProps> = ({
  samples,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EAE4D3] p-5 space-y-3 shadow-xs">
      <h2 className="font-okashi text-[18px] text-[#18221D]">Antrean Uji Sampel</h2>
      <div className="space-y-2.5">
        {samples.map((s) => {
          const isSelected = selectedId === s.id;
          const itemScore = s.score ?? computeSampleChecklistScore(s.checklist);
          const itemScoreFive = (itemScore / 20).toFixed(1);

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s)}
              className={`w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer space-y-2.5 ${
                isSelected
                  ? 'bg-[#FAF7EE] border-[#1F5B45]/50'
                  : 'bg-white border-[#EAE4D3] hover:bg-[#FAF7EE]/60'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.productName}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#EAE4D3]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center shrink-0">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-semibold text-[13.5px] text-[#18221D] truncate">
                      {s.productName}
                    </div>
                    <div className="text-[11.5px] text-[#7A867E] truncate">
                      {s.supplier} · {s.batchCode}
                    </div>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-lg text-[11.5px] font-medium shrink-0 tabular-nums ${
                    s.status === 'Lulus'
                      ? 'bg-[#EAF4EE] text-[#15803D]'
                      : s.status === 'Perlu Revisi'
                      ? 'bg-[#FEF2F2] text-[#B91C1C]'
                      : 'bg-[#FEF3C7] text-[#B45309]'
                  }`}
                >
                  {s.status === 'Lulus'
                    ? `Lulus · ${itemScoreFive}/5`
                    : s.status === 'Perlu Revisi'
                    ? 'Perlu Revisi'
                    : s.stageBadge === 'IN_TESTING'
                    ? 'Sedang Diuji'
                    : 'Dijadwalkan'}
                </span>
              </div>

              {/* 3-Date Mini Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 pt-2 border-t border-[#F0EBDC] text-[11px] tabular-nums font-sans">
                <div>
                  <span className="text-[#7A867E]">Drop: </span>
                  <span className="font-medium text-[#18221D]">
                    {s.dropDateLabel ?? s.submittedDate}
                  </span>
                </div>
                <div>
                  <span className="text-[#7A867E]">Uji: </span>
                  <span className="font-medium text-[#18221D]">
                    {s.testDateLabel ?? 'Kamis'}
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[#7A867E]">Hasil: </span>
                  <span className="font-medium text-[#18221D]">
                    {s.announcementDateLabel ?? 'Jumat'}
                  </span>
                </div>
              </div>

              {s.inspectorNote && (
                <div className="px-2.5 py-1.5 rounded-lg bg-[#EAF4EE]/70 text-[11.5px] text-[#1F5B45] truncate font-sans">
                  <span className="font-semibold">Catatan Tim Kurasi:</span> {s.inspectorNote}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
