import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useRouter } from '../router';
import { useKopkarRole } from '../auth/RoleContext';
import { formatDateID } from '../../lib/utils';
import { getKopkarPageMeta } from './navConfig';

/**
 * DesktopHeader — Header desktop/tablet Kyoto Heritage (hanya tampil >= md).
 * Budget: < 200 LOC.
 */
export const DesktopHeader: React.FC = () => {
  const { currentPath } = useRouter();
  const { currentUser, openRoleModal } = useKopkarRole();
  const dateInfo = formatDateID();
  const [notifOpen, setNotifOpen] = useState(false);

  const headerInfo = getKopkarPageMeta(currentPath);

  return (
    <header className="hidden md:block sticky top-0 z-30 bg-[#FAF7EE]/90 backdrop-blur-md border-b border-[#EAE4D3] px-4 sm:px-7 py-2.5 select-none font-geist">
      <div className="w-full max-w-[1320px] mx-auto flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[16px] sm:text-[17px] font-medium tracking-[-0.015em] leading-snug text-[#18221D] truncate">
            {headerInfo.title}
          </h1>
          <div className="text-[11px] font-normal text-[#7A867E] leading-tight mt-0.5 truncate">
            {headerInfo.kanji}
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="text-right pr-1">
            <div className="text-[12.5px] font-normal text-[#18221D] leading-tight whitespace-nowrap">
              {dateInfo.fullDate}
            </div>
            <div className="text-[11px] font-normal text-[#859089] leading-tight mt-0.5 tabular-nums whitespace-nowrap">
              <span>{dateInfo.kanjiEraDate}</span>
              <span className="mx-1">·</span>
              <span>{dateInfo.timeFormatted}</span>
            </div>
          </div>

          <div className="w-px h-6 bg-[#E5DEC9]" />

          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen((prev) => !prev)}
              aria-label="Notifikasi koperasi"
              className="relative w-9 h-9 rounded-xl bg-white hover:bg-[#F5F0E2]/70 border border-[#EAE4D3] flex items-center justify-center text-[#526058] hover:text-[#18221D] transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4 stroke-[1.75]" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#E8590C]" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-[#EAE4D3] shadow-lg z-30 p-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D3]">
                  <span className="text-[13.5px] font-medium text-[#18221D]">
                    Notifikasi
                  </span>
                  <button
                    type="button"
                    onClick={() => setNotifOpen(false)}
                    className="text-[12px] font-medium text-[#165239] hover:underline cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
                <div className="py-2 text-[12.5px] text-[#526058]">
                  Tidak ada notifikasi baru saat ini.
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={openRoleModal}
            aria-label="Pilih peran akun"
            className="flex items-center gap-2.5 bg-white hover:bg-[#F5F0E2]/70 border border-[#EAE4D3] rounded-full p-1 pl-1.5 pr-3.5 py-1 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-[#165239] text-white text-[11px] font-medium flex items-center justify-center shrink-0">
              {currentUser.initials}
            </div>
            <div className="text-left">
              <div className="text-[12.5px] font-medium text-[#18221D] leading-tight whitespace-nowrap">
                {currentUser.name}
              </div>
              <div className="text-[11px] font-normal text-[#165239] leading-tight whitespace-nowrap">
                {currentUser.roleLabel}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
