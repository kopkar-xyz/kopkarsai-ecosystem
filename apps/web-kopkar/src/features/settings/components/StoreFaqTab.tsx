import React, { useState } from 'react';
import { Pencil, Plus, RotateCcw, Search, Trash2 } from 'lucide-react';
import { FilterCountPill } from '../../../components/ui/FilterCountPill';
import {
  INITIAL_STORE_FAQS,
  loadStoreFaqs,
  saveStoreFaqs,
  type StoreFaqItem,
} from '../data/storeSettingsData';

const FAQ_CATS = ['ALL', 'Memesan', 'Pembayaran', 'Pengambilan', 'Kasir'] as const;

export const StoreFaqTab: React.FC = () => {
  const [faqs, setFaqs] = useState<StoreFaqItem[]>(loadStoreFaqs);
  const [catFilter, setCatFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [editing, setEditing] = useState<StoreFaqItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState<StoreFaqItem['category']>('Memesan');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const openNew = () => {
    setEditing(null);
    setCategory('Memesan');
    setQuestion('');
    setAnswer('');
    setShowForm(true);
  };

  const openEdit = (item: StoreFaqItem) => {
    setEditing(item);
    setCategory(item.category);
    setQuestion(item.question);
    setAnswer(item.answer);
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    const item: StoreFaqItem = {
      id: editing?.id ?? `faq-${Date.now()}`,
      category,
      question: question.trim(),
      answer: answer.trim(),
      targetRole: editing?.targetRole ?? 'ALL',
    };
    const next = editing ? faqs.map((f) => (f.id === editing.id ? item : f)) : [item, ...faqs];
    setFaqs(next);
    saveStoreFaqs(next);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    const next = faqs.filter((f) => f.id !== id);
    setFaqs(next);
    saveStoreFaqs(next);
  };

  const handleReset = () => {
    setFaqs(INITIAL_STORE_FAQS);
    saveStoreFaqs(INITIAL_STORE_FAQS);
  };

  const filtered = faqs.filter((f) => {
    const matchCat = catFilter === 'ALL' || f.category === catFilter;
    const q = searchQuery.trim().toLowerCase();
    return matchCat && (!q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  });

  return (
    <div className="bg-white border border-[#EAE4D3] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F0EBDC]">
        <div>
          <h2 className="text-[15px] font-semibold text-[#18221D]">Pengaturan FAQ Toko &amp; Kasir</h2>
          <p className="text-[12px] text-[#7A867E]">Kelola tanya jawab bantuan pembeli &amp; petugas toko.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="h-9 px-3 rounded-xl border border-[#EAE4D3] text-[#526058] hover:bg-[#FAF7EE] text-[12px] font-medium inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={openNew}
            className="h-9 px-3.5 rounded-xl bg-[#165239] hover:bg-[#11402c] text-white text-[12px] font-semibold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah FAQ</span>
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#EAE4D3] space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as StoreFaqItem['category'])}
              className="h-10 px-3 rounded-xl bg-white border border-[#EAE4D3] text-[12.5px]"
            >
              {(['Memesan', 'Pembayaran', 'Pengambilan', 'Kasir'] as const).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Pertanyaan..."
              className="sm:col-span-2 h-10 px-3 rounded-xl bg-white border border-[#EAE4D3] text-[12.5px]"
            />
          </div>
          <textarea
            rows={2}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Jawaban lengkap..."
            className="w-full p-3 rounded-xl bg-white border border-[#EAE4D3] text-[12.5px]"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-3.5 py-1.5 rounded-xl border border-[#EAE4D3] text-[12px] cursor-pointer">
              Batal
            </button>
            <button type="submit" className="px-4 py-1.5 rounded-xl bg-[#165239] text-white text-[12px] font-semibold cursor-pointer">
              Simpan FAQ
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {FAQ_CATS.map((c) => {
            const active = catFilter === c;
            const count = c === 'ALL' ? faqs.length : faqs.filter((f) => f.category === c).length;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCatFilter(c)}
                className={`px-3 py-1.5 rounded-xl text-[11.5px] font-medium cursor-pointer inline-flex items-center ${
                  active ? 'bg-[#165239] text-white' : 'bg-[#FAF7EE] text-[#526058]'
                }`}
              >
                <span>{c === 'ALL' ? 'Semua' : c}</span>
                <FilterCountPill count={count} active={active} />
              </button>
            );
          })}
        </div>
        <div className="relative w-full sm:w-52">
          <Search className="w-3.5 h-3.5 text-[#7A867E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari FAQ..."
            className="w-full h-9 pl-8 pr-3 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3] text-[12px]"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        {filtered.map((faq) => (
          <div key={faq.id} className="p-3.5 rounded-xl bg-[#FAF8F2] border border-[#EAE4D3] flex items-start justify-between gap-3">
            <div>
              <span className="px-2 py-0.5 rounded bg-[#EAF4EE] text-[#165239] text-[10px] font-semibold">
                {faq.category}
              </span>
              <h4 className="text-[13px] font-semibold text-[#18221D] mt-1">{faq.question}</h4>
              <p className="text-[12px] text-[#526058] mt-0.5">{faq.answer}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button type="button" onClick={() => openEdit(faq)} className="p-1.5 rounded-lg text-[#526058] hover:bg-white cursor-pointer" aria-label="Edit FAQ">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => handleDelete(faq.id)} className="p-1.5 rounded-lg text-[#526058] hover:text-[#B91C1C] hover:bg-white cursor-pointer" aria-label="Hapus FAQ">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
