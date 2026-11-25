import React, { useState, useEffect } from 'react';
import { X, HelpCircle, Save } from 'lucide-react';
import { FaqItem } from '../../../data/mockFaq';

interface FaqFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (faq: FaqItem) => void;
  initialData?: FaqItem | null;
}

const CATEGORIES: Array<FaqItem['category']> = ['Memesan', 'Pembayaran', 'Pengambilan', 'Kasir'];

/**
 * FaqFormModal — Modal Dialog CRUD (Tambah & Edit) Pertanyaan Umum Toko
 * Budget: < 200 LOC.
 */
export const FaqFormModal: React.FC<FaqFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [category, setCategory] = useState<FaqItem['category']>('Memesan');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [targetRole, setTargetRole] = useState<'ALL' | 'CUSTOMER' | 'CASHIER'>('ALL');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category);
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
      setTargetRole(initialData.targetRole || 'ALL');
      setErrorMsg('');
    } else {
      setCategory('Memesan');
      setQuestion('');
      setAnswer('');
      setTargetRole('ALL');
      setErrorMsg('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setErrorMsg('Pertanyaan wajib diisi.');
      return;
    }
    if (!answer.trim()) {
      setErrorMsg('Jawaban wajib diisi.');
      return;
    }

    const payload: FaqItem = {
      id: initialData?.id || `faq-${Date.now()}`,
      category,
      question: question.trim(),
      answer: answer.trim(),
      targetRole,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[500px] bg-white border border-[#EAE3D5] rounded-3xl shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="bg-[#83273B] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-[#FFD967]" />
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base">
                {initialData ? 'Edit Pertanyaan (FAQ)' : 'Tambah Pertanyaan (FAQ)'}
              </h3>
              <p className="text-[11px] text-white/80">
                Informasi ini otomatis tampil di halaman Bantuan pembeli & kasir
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-2.5 bg-[#FDF0F3] border border-[#F7BAC7] rounded-xl text-xs text-[#83273B] font-medium">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-[#665E60] font-semibold block mb-1">Kategori FAQ</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as FaqItem['category'])}
                className="w-full h-10 px-3 bg-[#FAF6F0] border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#665E60] font-semibold block mb-1">Ditujukan Untuk</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value as 'ALL' | 'CUSTOMER' | 'CASHIER')}
                className="w-full h-10 px-3 bg-[#FAF6F0] border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B]"
              >
                <option value="ALL">Semua Pengguna</option>
                <option value="CUSTOMER">Pembeli (Anggota / GA)</option>
                <option value="CASHIER">Kasir & Toko</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[#665E60] font-semibold block mb-1">Pertanyaan</label>
            <input
              type="text"
              placeholder="Contoh: Bagaimana cara melakukan pemesanan?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full h-10 px-3.5 bg-[#FAF6F0] border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B]"
            />
          </div>

          <div>
            <label className="text-[#665E60] font-semibold block mb-1">Jawaban Lengkap</label>
            <textarea
              rows={4}
              placeholder="Tuliskan penjelasan yang rinci dan mudah dimengerti..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 bg-[#FAF6F0] border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:border-[#83273B] leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#EAE3D5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#EAE3D5] text-[#665E60] hover:bg-[#FAF6F0] text-xs font-semibold cursor-pointer transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#83273B] hover:bg-[#681E2E] active:scale-98 text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{initialData ? 'Simpan Perubahan' : 'Tambah Pertanyaan'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
