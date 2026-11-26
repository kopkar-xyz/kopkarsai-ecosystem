import React, { useState } from 'react';
import { useKopkarRole } from '../app/auth/RoleContext';
import { FilterCountPill } from '../components/ui/FilterCountPill';
import { SampleCycleHeader } from '../features/supplier-hub/components/SampleCycleHeader';
import { SampleQueueList } from '../features/supplier-hub/components/SampleQueueList';
import { SampleInspectionCard } from '../features/supplier-hub/components/SampleInspectionCard';
import { INITIAL_SAMPLES } from '../features/supplier-hub/data/supplierMockData';
import { computeSampleChecklistScore } from '../lib/kopkarsaiMath';
import type { SampleTest } from '../types/kopkarSupplier';

type FilterType = 'Semua' | 'Menunggu Uji' | 'Lulus' | 'Perlu Revisi';

export const SampleTestingScheduleView: React.FC = () => {
  const { currentUser } = useKopkarRole();
  const isReadOnly = currentUser.role === 'KEPALA_KOPERASI';

  const [samples, setSamples] = useState<SampleTest[]>(INITIAL_SAMPLES);
  const [filter, setFilter] = useState<FilterType>('Semua');
  const [selectedId, setSelectedId] = useState<string>(INITIAL_SAMPLES[0]?.id ?? '');

  const filtered = samples.filter((s) => (filter === 'Semua' ? true : s.status === filter));
  const activeSample = samples.find((s) => s.id === selectedId) ?? filtered[0] ?? samples[0];

  const getSampleScore = (s?: SampleTest) =>
    s ? (s.score ?? computeSampleChecklistScore(s.checklist)) : 80;

  const [scoreInput, setScoreInput] = useState<number>(getSampleScore(activeSample));
  const [noteInput, setNoteInput] = useState<string>(activeSample?.inspectorNote ?? '');

  const handleSelectSample = (sample: SampleTest) => {
    setSelectedId(sample.id);
    setScoreInput(getSampleScore(sample));
    setNoteInput(sample.inspectorNote ?? '');
  };

  const handleEvaluateSample = (decision: 'Lulus' | 'Perlu Revisi') => {
    if (!activeSample || isReadOnly) return;
    const clampedScore = Math.max(0, Math.min(100, Number.isFinite(scoreInput) ? scoreInput : 0));
    setSamples((prev) =>
      prev.map((s) =>
        s.id === activeSample.id
          ? {
              ...s,
              status: decision,
              stageBadge: decision === 'Lulus' ? 'APPROVED' : 'REVISION_NEEDED',
              score: clampedScore,
              inspectorNote:
                noteInput ||
                (decision === 'Lulus'
                  ? 'Memenuhi standar mutu KOPKARSAI.'
                  : 'Perlu revisi kemasan & porsi.'),
            }
          : s
      )
    );
  };

  const tabs: Array<{ key: FilterType; count: number }> = [
    { key: 'Semua', count: samples.length },
    { key: 'Menunggu Uji', count: samples.filter((s) => s.status === 'Menunggu Uji').length },
    { key: 'Lulus', count: samples.filter((s) => s.status === 'Lulus').length },
    { key: 'Perlu Revisi', count: samples.filter((s) => s.status === 'Perlu Revisi').length },
  ];

  return (
    <div className="space-y-5 animate-fadeIn select-none">
      {/* 1. Header 3 Siklus Mingguan Kurasi */}
      <SampleCycleHeader />

      {/* 2. Filter Bar */}
      <div className="bg-white rounded-2xl border border-[#EAE4D3] p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map(({ key, count }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`px-3.5 py-1.5 rounded-xl text-[12.5px] font-medium cursor-pointer transition-colors whitespace-nowrap font-sans inline-flex items-center ${
                  active
                    ? 'bg-[#1F5B45] text-white shadow-2xs'
                    : 'bg-[#FAF7EE] text-[#5C6F67] hover:text-[#18221D]'
                }`}
              >
                <span>{key}</span>
                <FilterCountPill count={count} active={active} />
              </button>
            );
          })}
        </div>
        <div className="text-[12.5px] text-[#7A867E] tabular-nums font-sans">
          {samples.filter((s) => s.status === 'Menunggu Uji').length} sampel menunggu uji fisik
        </div>
      </div>

      {/* 3. Master-Detail Workspace: Antrean & Evaluator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-6">
          <SampleQueueList
            samples={filtered}
            selectedId={activeSample?.id ?? ''}
            onSelect={handleSelectSample}
          />
        </div>
        <div className="lg:col-span-6">
          {activeSample && (
            <SampleInspectionCard
              sample={activeSample}
              scoreInput={scoreInput}
              noteInput={noteInput}
              isReadOnly={isReadOnly}
              onScoreChange={setScoreInput}
              onNoteChange={setNoteInput}
              onEvaluate={handleEvaluateSample}
            />
          )}
        </div>
      </div>
    </div>
  );
};
