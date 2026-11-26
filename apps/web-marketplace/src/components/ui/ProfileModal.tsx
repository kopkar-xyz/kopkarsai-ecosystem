import React from 'react';
import { X, Check } from 'lucide-react';
import { UserProfile, PRESET_USERS } from '../../types/auth';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
}

/**
 * ProfileModal — Popup Pilih Peran Akun (Mode Demo)
 * Slicing 1:1 presisi sesuai media_1795409514467_3afac9a6.png.
 * Budget: < 200 LOC.
 */
export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-[360px] sm:max-w-[380px] bg-white border border-[#EAE3D5] rounded-[28px] p-6 sm:p-7 shadow-2xl relative animate-scaleUp space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Header with Brush Font Title & Close Button */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-brush text-2xl sm:text-[26px] text-[#83273B] font-semibold tracking-tight leading-tight">
              Pilih peran akun
            </h2>
            <p className="text-xs text-[#665E60] mt-1 leading-relaxed">
              Mode demo. Pilih akun untuk melihat tampilan tiap peran.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="w-8 h-8 rounded-full bg-[#FAF6F0] hover:bg-[#EAE3D5] flex items-center justify-center text-[#1A1615] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Account List Cards */}
        <div className="space-y-3">
          {PRESET_USERS.map((usr) => {
            const isSelected = usr.id === currentUser.id;
            const roleBadge =
              usr.role === 'ANGGOTA'
                ? { label: 'Anggota biasa', style: 'bg-[#E5F3EB] text-[#2E6B4F]' }
                : { label: 'GA Officer', style: 'bg-[#FCEBA7] text-[#8A5A00]' };

            return (
              <div
                key={usr.id}
                onClick={() => onSelectUser(usr)}
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-[20px] transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#781D32] bg-white shadow-2xs'
                    : 'border border-[#EAE3D5] hover:border-[#83273B]/40 bg-white'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={usr.avatarUrl}
                    alt={usr.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#EAE3D5]"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-[14px] text-[#1A1615] truncate leading-tight mb-1.5">
                      {usr.name}
                    </h3>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium leading-none ${roleBadge.style}`}>
                      {roleBadge.label}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#781D32] text-white flex items-center justify-center shrink-0 ml-2 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 3. Bottom CTA Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 sm:py-3 rounded-[14px] border border-[#781D32] bg-white hover:bg-[#FAF6F0] active:scale-[0.98] text-[#781D32] text-xs sm:text-[13px] font-semibold text-center transition-all cursor-pointer shadow-2xs"
        >
          Selesai
        </button>
      </div>
    </div>
  );
};
