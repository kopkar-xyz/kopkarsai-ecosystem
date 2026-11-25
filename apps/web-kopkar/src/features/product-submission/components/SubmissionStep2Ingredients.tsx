import React, { useState } from 'react';
import { Upload, Plus, X } from 'lucide-react';
import type { CompleteSubmissionFormData } from '../types';

interface SubmissionStep2IngredientsProps {
  formData: CompleteSubmissionFormData;
  onChange: <K extends keyof CompleteSubmissionFormData>(field: K, value: CompleteSubmissionFormData[K]) => void;
  onAddIngredient: (ing: string) => boolean;
  onRemoveIngredient: (idx: number) => void;
  onImageSelect: (file: File) => boolean;
}

/**
 * SubmissionStep2Ingredients — Sub-bagian B Langkah 2: Foto Kemasan & Komposisi Bahan
 * Slicing 1:1 Presisi Gambar 6 Referensi Pengguna.
 * Budget: < 200 LOC.
 */
export const SubmissionStep2Ingredients: React.FC<SubmissionStep2IngredientsProps> = ({
  formData,
  onChange,
  onAddIngredient,
  onRemoveIngredient,
  onImageSelect,
}) => {
  const [ingInput, setIngInput] = useState('');

  const handleAddIng = () => {
    if (ingInput.trim()) {
      onAddIngredient(ingInput.trim());
      setIngInput('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-5 pt-4 border-t border-[#F0EAE1]">
      <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[#5C6F67] block">
        B. FOTO KEMASAN & KOMPOSISI BAHAN
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Upload Foto */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <label className="font-sans font-medium text-[#1A2421]">Foto Produk / Kemasan</label>
            <span className="text-[11px] font-sans text-[#5C6F67]">Maks. 3 MB</span>
          </div>
          <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#E9E2D2] hover:border-[#1F5B45] rounded-2xl bg-[#FAF7F2] cursor-pointer transition-colors group h-44">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E9E2D2] flex items-center justify-center text-[#5C6F67] group-hover:text-[#1F5B45] group-hover:border-[#1F5B45] mb-2.5 shadow-2xs transition-colors">
              <Upload size={18} />
            </div>
            <span className="text-xs font-sans font-semibold text-[#1A2421]">Unggah 1 foto kemasan</span>
            <span className="text-[11px] font-sans text-[#5C6F67] mt-0.5">JPG, PNG, atau WEBP</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Komposisi Bahan Tag Input */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <label className="font-sans font-medium text-[#1A2421]">Komposisi Bahan Utama *</label>
            <span className="text-[11px] font-sans text-[#5C6F67]">{formData.ingredients.length} bahan</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E9E2D2] space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={ingInput}
                onChange={(e) => setIngInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddIng())}
                placeholder="Ketik bahan lalu Enter (cth: Ayam Fillet)"
                className="flex-1 h-10 px-3.5 rounded-xl bg-white border border-[#E9E2D2] text-xs font-sans text-[#1A2421] placeholder:text-[#8C827A] focus:outline-none focus:border-[#1F5B45] transition-colors"
              />
              <button
                type="button"
                onClick={handleAddIng}
                className="h-10 px-4 rounded-xl bg-[#1F5B45] hover:bg-[#174736] text-white text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
              >
                <Plus size={14} /> <span>Tambah</span>
              </button>
            </div>
            {/* Tag List */}
            <div className="flex flex-wrap gap-2 pt-1">
              {formData.ingredients.map((ing, idx) => (
                <span
                  key={ing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E9E2D2] text-xs font-sans text-[#1A2421] shadow-2xs"
                >
                  <span>{ing}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveIngredient(idx)}
                    className="text-[#5C6F67] hover:text-[#B91C1C] transition-colors cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Catatan Alergen */}
      <div className="space-y-1.5 pt-4 border-t border-[#F0EAE1]">
        <label className="text-xs font-mono uppercase tracking-wider font-semibold text-[#5C6F67] block">
          C. Catatan Penyimpanan / Alergen (Opsional)
        </label>
        <input
          type="text"
          value={formData.additionalNotes}
          onChange={(e) => onChange('additionalNotes', e.target.value)}
          placeholder="cth: Simpan di showcase pendingin, mengandung kacang/susu"
          className="w-full h-11 px-4 rounded-xl bg-[#FAF7F2] border border-[#E9E2D2] text-xs font-sans text-[#1A2421] placeholder:text-[#8C827A] focus:outline-none focus:border-[#1F5B45] transition-colors"
        />
      </div>
    </div>
  );
};

