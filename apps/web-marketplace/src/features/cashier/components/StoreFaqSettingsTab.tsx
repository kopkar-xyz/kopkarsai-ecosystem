import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search, RotateCcw, HelpCircle } from 'lucide-react';
import { FaqItem, getStoredFaqs, saveStoredFaqs, resetStoredFaqs } from '../../../data/mockFaq';
import { FaqFormModal } from './FaqFormModal';

/**
 * StoreFaqSettingsTab — Tab Pengaturan CRUD FAQ Kasir
 * Menampilkan seluruh daftar FAQ selaras dengan halaman Bantuan. Budget: < 200 LOC.
 */
export const StoreFaqSettingsTab: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>(() => getStoredFaqs());
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleSaveFaq = (saved: FaqItem) => {
    const existingIndex = faqs.findIndex((f) => f.id === saved.id);
    const updated = existingIndex >= 0
      ? faqs.map((f, i) => (i === existingIndex ? saved : f))
      : [saved, ...faqs];
    showAlert(existingIndex >= 0 ? 'Pertanyaan berhasil diperbarui.' : 'Pertanyaan baru ditambahkan.');
    setFaqs(updated);
    saveStoredFaqs(updated);
  };

  const handleDeleteFaq = (id: string, q: string) => {
    if (window.confirm(`Hapus pertanyaan "${q}"?`)) {
      const updated = faqs.filter((f) => f.id !== id);
      setFaqs(updated);
      saveStoredFaqs(updated);
      showAlert('Pertanyaan berhasil dihapus.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Kembalikan semua daftar FAQ ke pengaturan awal?')) {
      const initial = resetStoredFaqs();
      setFaqs(initial);
      showAlert('Daftar FAQ berhasil direset ke bawaan.');
    }
  };

  const categories = ['ALL', 'Memesan', 'Pembayaran', 'Pengambilan', 'Kasir'];
  const filteredFaqs = faqs.filter((f) => {
    const matchCat = selectedCategory === 'ALL' || f.category === selectedCategory;
    const matchQuery = !searchQuery ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="bg-white border border-[#EAE3D5] rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs animate-fadeIn">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#EAE3D5]/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-xs sm:text-sm text-[#1A1615]">Pengaturan Pertanyaan Umum (FAQ)</h2>
            <span className="px-2 py-0.5 rounded-full bg-[#FAF6F0] text-[10px] font-mono text-[#83273B] font-bold border border-[#EAE3D5]">
              {faqs.length} Total
            </span>
          </div>
          <p className="text-[11px] text-[#665E60] mt-0.5">Kelola dan perbarui tanya jawab pusat bantuan.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleReset} title="Reset ke FAQ bawaan" className="h-8 px-2.5 rounded-xl border border-[#EAE3D5] text-[#665E60] hover:bg-[#FAF6F0] text-[11px] font-medium flex items-center gap-1.5 cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" /><span className="hidden sm:inline">Reset</span>
          </button>
          <button type="button" onClick={() => { setEditingFaq(null); setIsModalOpen(true); }} className="h-8 px-3 rounded-xl bg-[#83273B] hover:bg-[#681E2E] active:scale-98 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer">
            <Plus className="w-3.5 h-3.5" /><span>Tambah FAQ</span>
          </button>
        </div>
      </div>

      {alertMessage && (
        <div className="p-2.5 bg-[#FAF6F0] border border-[#2E6B4F]/30 rounded-xl text-xs text-[#2E6B4F] font-medium flex items-center gap-2">
          <HelpCircle className="w-4 h-4 shrink-0" /><span>{alertMessage}</span>
        </div>
      )}

      {/* 2. Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-xl text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${selectedCategory === cat ? 'bg-[#83273B] text-white shadow-2xs font-semibold' : 'bg-[#FAF6F0] text-[#665E60] hover:bg-[#EAE3D5]/50'}`}>
              {cat === 'ALL' ? 'Semua' : cat}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-48 sm:ml-auto">
          <Search className="w-3.5 h-3.5 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Cari FAQ..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-8 pl-8 pr-3 bg-[#FAF6F0] border border-[#EAE3D5] rounded-xl text-[11px] text-[#1A1615] focus:outline-none focus:border-[#83273B]" />
        </div>
      </div>

      {/* 3. Daftar Kartu FAQ */}
      <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-[#8C827A] text-xs">Tidak ada pertanyaan yang sesuai dengan filter.</div>
        ) : (
          filteredFaqs.map((faq) => (
            <div key={faq.id} className="p-3.5 bg-[#FAF6F0] hover:bg-[#FDF9F5] border border-[#EAE3D5] rounded-xl transition-all space-y-2 group">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-[#83273B]/10 text-[#83273B] text-[10px] font-bold">{faq.category}</span>
                    {faq.targetRole && faq.targetRole !== 'ALL' && (
                      <span className="px-1.5 py-0.5 rounded-md bg-[#8C827A]/15 text-[#665E60] text-[10px] font-medium">
                        {faq.targetRole === 'CASHIER' ? 'Kasir' : 'Pembeli'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-xs text-[#1A1615] leading-snug">{faq.question}</h3>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button type="button" onClick={() => { setEditingFaq(faq); setIsModalOpen(true); }} className="p-1.5 rounded-lg text-[#665E60] hover:text-[#83273B] hover:bg-white border border-transparent hover:border-[#EAE3D5] transition-colors cursor-pointer" title="Edit pertanyaan">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" onClick={() => handleDeleteFaq(faq.id, faq.question)} className="p-1.5 rounded-lg text-[#665E60] hover:text-red-600 hover:bg-white border border-transparent hover:border-red-200 transition-colors cursor-pointer" title="Hapus pertanyaan">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-[#665E60] leading-relaxed pl-0.5">{faq.answer}</p>
            </div>
          ))
        )}
      </div>

      <FaqFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveFaq} initialData={editingFaq} />
    </div>
  );
};
