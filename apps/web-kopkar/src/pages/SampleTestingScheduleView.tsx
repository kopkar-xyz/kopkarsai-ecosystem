import React, { useState } from 'react';
import { SampleCycleHeader } from '../features/supplier-hub/components/SampleCycleHeader';
import { SampleQueueList } from '../features/supplier-hub/components/SampleQueueList';
import { SampleInspectionCard } from '../features/supplier-hub/components/SampleInspectionCard';
import { INITIAL_SAMPLES } from '../features/supplier-hub/data/supplierMockData';
import type { SampleTest } from '../types/kopkarSupplier';

type FilterType = 'Semua' | 'Menunggu Uji' | 'Lulus' | 'Perlu Revisi';

export const SampleTestingScheduleView: React.FC = () => {
  const [samples, setSamples] = useState<SampleTest[]>(INITIAL_SAMPLES);
  const [filter, setFilter] = useState<FilterType>('Semua');
  const [selectedId, setSelectedId] = useState<string>(INITIAL_SAMPLES[0]?.id ?? '');

  const filtered = samples.filter((s) => (filter === 'Semua' ? true : s.status === filter));
  const activeSample = samples.find((s) => s.id === selectedId) ?? filtered[0] ?? samples[0];

  const [localChecklist, setLocalChecklist] = useState<SampleTest['checklist']>(
    activeSample?.checklist ?? { rasa: true, kemasan: true, suhu: true, porsi: true }
  );
  const [noteInput, setNoteInput] = useState<string>(activeSample?.inspectorNote ?? '');

  const handleSelectSample = (sample: SampleTest) => {
    setSelectedId(sample.id);
    setLocalChecklist(sample.checklist);
    setNoteInput(sample.inspectorNote ?? '');
  };

  const handleChecklistChange = (key: keyof SampleTest['checklist'], val: boolean) => {
    setLocalChecklist((prev) => ({ ...prev, [key]: val }));
  };

  const handleEvaluateSample = (decision: 'Lulus' | 'Perlu Revisi') => {
    if (!activeSample) return;
    setSamples((prev) =>
      prev.map((s) =>
        s.id === activeSample.id
          ? {
              ...s,
              status: decision,
              stageBadge: decision === 'Lulus' ? 'APPROVED' : 'REVISION_NEEDED',
              checklist: localChecklist,
              inspectorNote: noteInput || (decision === 'Lulus' ? 'Memenuhi standar mutu KOPKARSAI.' : 'Perlu revisi kemasan & porsi.'),
            }
          : s
      )
    );
  };

  return (
    <div className="space-y-5 animate-fadeIn select-none">
      {/* 1. Header 3 Siklus Mingguan Kurasi */}
      <SampleCycleHeader />

      {/* 2. Filter Bar */}
      <div className="bg-white rounded-2xl border border-[#EAE4D3] p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {(['Semua', 'Menunggu Uji', 'Lulus', 'Perlu Revisi'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-[12.5px] font-medium cursor-pointer transition-colors whitespace-nowrap font-sans ${
                filter === tab
                  ? 'bg-[#1F5B45] text-white shadow-2xs'
                  : 'bg-[#FAF7EE] text-[#5C6F67] hover:text-[#18221D]'
              }`}
            >
              {tab}
            </button>
          ))}
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
              localChecklist={localChecklist}
              noteInput={noteInput}
              onChecklistChange={handleChecklistChange}
              onNoteChange={setNoteInput}
              onEvaluate={handleEvaluateSample}
            />
          )}
        </div>
      </div>
    </div>
  );
};
