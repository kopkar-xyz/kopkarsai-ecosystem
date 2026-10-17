import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Info } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface ScheduleDay {
  dayName: string;
  dateNum: number;
  badgeDot?: boolean;
  title: string;
  desc: string;
  time: string;
  location: string;
  isToday?: boolean;
}

export const HorizontalSchedule: React.FC = () => {
  const scheduleDays: ScheduleDay[] = [
    {
      dayName: 'Sen',
      dateNum: 20,
      badgeDot: false,
      title: 'Layanan Kasir & Administrasi',
      desc: 'Buka transaksi kasir toko fisik dan konsultasi simpanan anggota.',
      time: '08:00 - 16:30 WIB',
      location: 'Koperasi SAI Kantor',
    },
    {
      dayName: 'Sel',
      dateNum: 21,
      badgeDot: true,
      title: 'Drop Sampel Supplier (Shift A)',
      desc: 'Penyerahan sampel makanan basah/katering calon mitra supplier.',
      time: '09:00 - 11:30 WIB',
      location: 'SAI B & SAI T',
    },
    {
      dayName: 'Rab',
      dateNum: 22,
      badgeDot: true,
      title: 'Batas Drop Sampel (Shift B)',
      desc: 'Batas akhir penyerahan sampel revisi atau produk makanan baru.',
      time: '13:30 - 15:30 WIB',
      location: 'SAI B & SAI T',
      isToday: true,
    },
    {
      dayName: 'Kam',
      dateNum: 23,
      badgeDot: true,
      title: 'Uji Kelayakan Sampel Makanan',
      desc: 'Pengujian organoleptik rasa, ketahanan, dan kelayakan higienitas.',
      time: '10:00 - 14:00 WIB',
      location: 'Dapur Kurasi KopKar',
    },
    {
      dayName: 'Jum',
      dateNum: 24,
      badgeDot: true,
      title: 'Pengumuman Hasil Kurasi Produk',
      desc: 'Penerbitan status ACC/Revisi. Produk ACC langsung tampil di Marketplace.',
      time: '15:00 WIB',
      location: 'Portal KOPKARSAI',
    },
  ];

  // Default selected: Wednesday (Rab 22 - isToday)
  const [selectedIdx, setSelectedIdx] = useState<number>(2);
  const selected = scheduleDays[selectedIdx];

  return (
    <div className="space-y-3">
      {/* Title & Section Label */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-kopkar-primary" />
          <h2 className="text-xs font-bold text-kopkar-dark uppercase tracking-wider">
            Siklus Operasional Mingguan
          </h2>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Oktober 2026</span>
      </div>

      {/* Horizontal Pill Row matching Image 1 wireframe */}
      <div className="flex items-center justify-between gap-1.5 p-1 bg-white rounded-3xl border border-slate-100 shadow-2xs">
        {scheduleDays.map((item, idx) => {
          const isSelected = selectedIdx === idx;

          return (
            <button
              key={item.dayName}
              onClick={() => setSelectedIdx(idx)}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl transition-all duration-200 select-none relative',
                isSelected
                  ? 'bg-kopkar-dock text-white shadow-md scale-102 font-bold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              )}
            >
              {/* Dot indicator if has action */}
              {item.badgeDot && (
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full mb-0.5',
                    isSelected ? 'bg-kopkar-gold' : 'bg-kopkar-primary/70'
                  )}
                />
              )}

              <span className={cn('text-[11px] font-medium leading-none', isSelected && 'text-slate-200')}>
                {item.dayName}
              </span>
              <span className="text-sm font-extrabold mt-1 leading-none font-mono">
                {item.dateNum}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Agenda Box */}
      <div className="p-3.5 rounded-2.5xl bg-kopkar-mint/70 border border-emerald-100 text-kopkar-dark flex items-start gap-3 animate-fade-in">
        <div className="p-2 rounded-xl bg-kopkar-primary text-white shrink-0 mt-0.5 shadow-2xs">
          <Info size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-bold text-kopkar-primary-dark truncate">
              {selected.dayName}, {selected.dateNum} Okt — {selected.title}
            </h4>
            {selected.isToday && (
              <span className="text-[9px] font-extrabold bg-kopkar-gold text-kopkar-dock px-2 py-0.5 rounded-full uppercase">
                Hari Ini
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
            {selected.desc}
          </p>
          <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Clock size={11} className="text-kopkar-primary" />
              {selected.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-kopkar-primary" />
              {selected.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
