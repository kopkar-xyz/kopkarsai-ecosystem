import React from 'react';
import { Megaphone, Award, ExternalLink, MessageCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';

export const AnnouncementBanner: React.FC = () => {
  return (
    <Card
      variant="white"
      padding="sm"
      className="border border-emerald-100/80 bg-gradient-to-r from-emerald-50/60 via-white to-amber-50/50"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-kopkar-primary text-kopkar-gold flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <Award size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              Agenda Resmi RAT 2026
            </span>
            <span className="text-[10px] text-slate-400 font-medium">19 Feb 2026</span>
          </div>

          <h3 className="text-xs sm:text-sm font-extrabold text-kopkar-dark mt-1 leading-snug">
            Lomba Konten Kreatif Rapat Anggota Tahunan (RAT)
          </h3>

          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
            Abadikan momen partisipasi Anda di RAT KOPKARSAI. Raih hadiah jutaan rupiah & doorprize menarik khusus anggota koperasi!
          </p>

          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-[10px]">
            <span className="text-slate-400 italic font-serif">
              "Modern Koperasi: Dari Anggota Oleh Profesional untuk Anggota"
            </span>

            <a
              href="https://wa.me/6281133302500"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800"
            >
              <MessageCircle size={12} />
              <span>Info Pengurus</span>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};
