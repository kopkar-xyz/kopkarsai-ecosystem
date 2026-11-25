import React from 'react';
import { Layers } from 'lucide-react';
import { useDesignVersion, type GatewayDesignVersion } from '../../context/DesignVersionContext';

const VERSION_OPTIONS: Array<{ id: GatewayDesignVersion; label: string }> = [
  { id: 'v1', label: 'V1' },
  { id: 'v2', label: 'V2' },
  { id: 'v3', label: 'V3' },
];

export const DesignVersionSwitcher: React.FC = () => {
  const { version, setVersion } = useDesignVersion();

  const activeBg =
    version === 'v3'
      ? 'bg-[#111814] text-white'
      : version === 'v2'
      ? 'bg-[#83273B] text-white'
      : 'bg-[#065C2B] text-white';

  return (
    <div
      role="group"
      aria-label="Pilih Versi Desain Web Gateway"
      className="fixed bottom-4 right-4 sm:top-4 sm:bottom-auto z-50 inline-flex items-center gap-1 p-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-[0_8px_24px_-6px_rgba(17,24,20,0.16)] font-geist select-none"
    >
      <span className="hidden sm:inline-flex items-center gap-1 pl-2.5 pr-1 text-[11px] font-medium text-[#6B7280]">
        <Layers className="w-3.5 h-3.5 text-[#111814]" />
        <span>Desain:</span>
      </span>

      {VERSION_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setVersion(opt.id)}
          className={`px-3 py-1 rounded-full text-[11.5px] font-semibold transition-colors cursor-pointer ${
            version === opt.id
              ? `${activeBg} shadow-xs`
              : 'text-[#6B7280] hover:text-[#111814] hover:bg-[#F3F4F6]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
