import React from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { formatDateID } from '../../../lib/utils';
import type { UserProfile } from '../../../types';

interface HeaderDateWidgetProps {
  user: UserProfile;
}

export const HeaderDateWidget: React.FC<HeaderDateWidgetProps> = ({ user }) => {
  const dateInfo = formatDateID();

  return (
    <div className="w-full bg-gradient-to-r from-[#1F5B45] via-[#2F6F56] to-[#1F5B45] text-white rounded-2xl p-5 sm:p-7 shadow-bento relative overflow-hidden border border-[#2F6F56]">
      {/* Decorative Japanese pattern background watermark */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-4">
        <span className="font-kanji text-8xl font-black select-none text-white">
          協同
        </span>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Greeting & Member status */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-accent font-semibold text-[#A9C3A2] border border-white/20">
            <Sparkles size={13} className="text-[#F6CE2C]" />
            <span>Koperasi Digital Karyawan</span>
            <span className="text-white/60">•</span>
            <span className="font-kanji">{dateInfo.kanjiEraDate}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
            {user.fullName}
          </h1>

          <p className="text-xs sm:text-sm text-[#F3ECDD]/90 font-body flex items-center gap-2">
            <span>NIK: {user.nik}</span>
            <span>•</span>
            <span className="font-accent font-bold text-[#A9C3A2]">{user.unit}</span>
            <span>•</span>
            <span>{user.division}</span>
          </p>
        </div>

        {/* Right: Date pill & Live clock */}
        <div className="flex flex-wrap items-center gap-2.5 bg-black/20 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/10 self-start md:self-auto">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-heading font-bold text-white px-2">
            <Calendar size={16} className="text-[#F6CE2C]" />
            <span>{dateInfo.fullDate}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#F3ECDD]/90 font-body pl-2 border-l border-white/20">
            <Clock size={14} className="text-[#A9C3A2]" />
            <span>{dateInfo.timeFormatted}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
