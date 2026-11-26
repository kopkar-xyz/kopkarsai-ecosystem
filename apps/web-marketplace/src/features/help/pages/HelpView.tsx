import React, { useState, useEffect } from 'react';
import { Search, Plus, Minus, MessageCircle } from 'lucide-react';
import { FaqItem, getStoredFaqs } from '../../../data/mockFaq';

interface FaqCategory {
  title: string;
  items: { q: string; a: string }[];
}

/**
 * HelpView — Halaman Pusat Bantuan & Tanya Jawab Interaktif
 * Budget: < 200 LOC.
 */
export const HelpView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>(() => getStoredFaqs());

  useEffect(() => {
    const handleStorage = () => setFaqs(getStoredFaqs());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const relevantFaqs = faqs.filter(
    (f) => f.targetRole === 'CUSTOMER' || f.targetRole === 'ALL' || !f.targetRole
  );

  const categoryOrder: Array<FaqItem['category']> = ['Memesan', 'Pembayaran', 'Pengambilan'];

  const otherCategories = Array.from(new Set(relevantFaqs.map((f) => f.category)))
    .filter((c) => !categoryOrder.includes(c));

  const allCategoryTitles = [...categoryOrder, ...otherCategories];

  const categories: FaqCategory[] = allCategoryTitles
    .map((catTitle) => ({
      title: catTitle,
      items: relevantFaqs
        .filter((f) => f.category === catTitle)
        .map((f) => ({ q: f.question, a: f.answer })),
    }))
    .filter((cat) => cat.items.length > 0);

  const toggleFaq = (question: string) => {
    setExpandedFaq(expandedFaq === question ? null : question);
  };

  return (
    <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 select-none animate-fadeIn">
      {/* 1. Header Bantuan */}
      <div className="mb-6">
        <h1 className="font-brush text-2xl sm:text-3xl text-[#83273B] font-semibold leading-tight">Bantuan</h1>
        <p className="text-xs text-[#665E60] mt-0.5">Jawaban cepat untuk pertanyaan yang sering muncul.</p>
      </div>

      {/* 2. Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Search & FAQ Accordions */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C827A] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari pertanyaan"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-white border border-[#EAE3D5] rounded-xl text-xs text-[#1A1615] placeholder:text-[#8C827A] focus:outline-none focus:border-[#83273B] shadow-2xs transition-colors"
            />
          </div>

          <div className="space-y-4">
            {categories.map((cat) => {
              const filteredItems = cat.items.filter(
                (it) => it.q.toLowerCase().includes(searchQuery.toLowerCase()) || it.a.toLowerCase().includes(searchQuery.toLowerCase())
              );
              if (filteredItems.length === 0) return null;

              return (
                <div key={cat.title} className="bg-white border border-[#EAE3D5] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-3">
                  <h3 className="font-sans font-bold text-xs text-[#83273B] tracking-wide uppercase px-0.5">
                    {cat.title}
                  </h3>
                  <div className="divide-y divide-[#EAE3D5]">
                    {filteredItems.map((item) => {
                      const isOpen = expandedFaq === item.q;
                      return (
                        <div key={item.q} className="py-3 first:pt-1 last:pb-1">
                          <button
                            type="button"
                            onClick={() => toggleFaq(item.q)}
                            className="w-full flex items-center justify-between text-left gap-3 text-xs sm:text-sm font-medium text-[#1A1615] hover:text-[#83273B] transition-colors cursor-pointer"
                          >
                            <span>{item.q}</span>
                            <span className="text-[#8C827A] shrink-0">
                              {isOpen ? <Minus className="w-4 h-4 text-[#83273B]" /> : <Plus className="w-4 h-4" />}
                            </span>
                          </button>
                          {isOpen && (
                            <div className="mt-2 text-xs text-[#665E60] leading-relaxed bg-[#FAF6F0] p-3 rounded-xl border border-[#EAE3D5]/60 animate-fadeIn">
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: WhatsApp Direct Contact Card */}
        <div className="lg:col-span-4 bg-white border border-[#EAE3D5] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div>
            <h2 className="font-heading font-bold text-sm sm:text-base text-[#1A1615]">Butuh bantuan langsung?</h2>
            <p className="text-xs text-[#665E60] mt-1 leading-relaxed">Hubungi admin piket koperasi pada jam layanan.</p>
          </div>

          <div className="space-y-2.5 text-xs border-t border-b border-[#EAE3D5]/70 py-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[#8C827A]">Jam layanan</span>
              <span className="font-semibold text-[#1A1615]">07:00 – 17:00 WIB</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8C827A]">WhatsApp</span>
              <span className="font-semibold text-[#1A1615] tabular-nums">0812-3456-7890</span>
            </div>
          </div>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-[#83273B] hover:bg-[#6e1e2f] active:scale-98 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs no-underline"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hubungi lewat WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
