import React, { useEffect, useRef } from 'react';
import { SlidersHorizontal, MapPin, Utensils, RotateCcw, X, Check } from 'lucide-react';

export type ProductPlaceFilter = 'ALL' | 'SAI-B' | 'SAI-T';
export type ProductTypeFilter = 'ALL' | 'Makanan Basah' | 'Makanan Kering' | 'Minuman';

interface ProductFilterPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlace: ProductPlaceFilter;
  onSelectPlace: (place: ProductPlaceFilter) => void;
  selectedType: ProductTypeFilter;
  onSelectType: (type: ProductTypeFilter) => void;
  onReset: () => void;
  className?: string;
}

const PLACE_OPTIONS: { value: ProductPlaceFilter; label: string }[] = [
  { value: 'ALL', label: 'Semua' },
  { value: 'SAI-B', label: 'SAI-B' },
  { value: 'SAI-T', label: 'SAI-T' },
];

const TYPE_OPTIONS: { value: ProductTypeFilter; label: string }[] = [
  { value: 'ALL', label: 'Semua Jenis' },
  { value: 'Makanan Basah', label: 'Makanan Basah' },
  { value: 'Makanan Kering', label: 'Makanan Kering' },
  { value: 'Minuman', label: 'Minuman' },
];

/**
 * ProductFilterPopover — Popover Filter Produk Berdasarkan Tempat & Jenis
 * Budget: < 200 LOC.
 */
export const ProductFilterPopover: React.FC<ProductFilterPopoverProps> = ({
  isOpen,
  onClose,
  selectedPlace,
  onSelectPlace,
  selectedType,
  onSelectType,
  onReset,
  className = '',
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) onClose();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasActiveFilters = selectedPlace !== 'ALL' || selectedType !== 'ALL';

  return (
    <div
      ref={popoverRef}
      className={`absolute right-0 top-full mt-2 z-50 w-72 sm:w-80 bg-white rounded-2xl border border-[#DED5C3] shadow-xl p-4 space-y-4 animate-in fade-in zoom-in-95 duration-150 select-none ${className}`}
    >
      {/* Header Popover */}
      <div className="flex items-center justify-between pb-2 border-b border-[#DED5C3]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-[#1F5B45]" />
          <h3 className="text-sm font-heading font-extrabold text-[#1A2421]">
            Filter Produk
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1 text-[11px] font-accent font-bold text-[#854D0E] hover:underline cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup filter"
            className="w-6 h-6 rounded-lg text-[#5C6F67] hover:bg-[#F3ECDD] flex items-center justify-center cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* 1. Filter Berdasarkan Tempat */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-heading font-bold text-[#1A2421]">
          <MapPin size={13} className="text-[#1F5B45]" />
          <span>Berdasarkan Tempat</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {PLACE_OPTIONS.map((opt) => {
            const isSelected = selectedPlace === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => onSelectPlace(opt.value)}
                className={`py-1.5 px-2 rounded-xl text-xs font-accent font-bold transition-all text-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F5B45] text-white shadow-xs scale-102 ring-1 ring-[#1F5B45]'
                    : 'bg-white text-[#5C6F67] hover:bg-[#EAF4EE] hover:text-[#1F5B45] border border-[#DED5C3]'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Filter Berdasarkan Jenis Produk */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-heading font-bold text-[#1A2421]">
          <Utensils size={13} className="text-[#1F5B45]" />
          <span>Berdasarkan Jenis Produk</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {TYPE_OPTIONS.map((opt) => {
            const isSelected = selectedType === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => onSelectType(opt.value)}
                className={`py-2 px-2.5 rounded-xl text-xs font-accent font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F5B45] text-white shadow-xs ring-1 ring-[#1F5B45]'
                    : 'bg-white text-[#5C6F67] hover:bg-[#EAF4EE] hover:text-[#1F5B45] border border-[#DED5C3]'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check size={12} className="text-[#F6CE2C] flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer / Apply */}
      <div className="pt-2 border-t border-[#DED5C3] flex items-center justify-between">
        <span className="text-[11px] font-accent text-[#5C6F67]">
          {hasActiveFilters ? 'Filter aktif diterapkan' : 'Semua produk ditampilkan'}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1.5 rounded-xl bg-[#1F5B45] hover:bg-[#2F6F56] text-white text-xs font-heading font-bold transition-all cursor-pointer shadow-xs active:scale-95"
        >
          Selesai
        </button>
      </div>
    </div>
  );
};
