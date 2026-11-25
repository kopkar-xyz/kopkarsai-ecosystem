import React from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Check, CreditCard, X } from 'lucide-react';
import { useRouter } from '../../app/router';
import { PRESET_KOPKAR_USERS, useKopkarRole } from '../../app/auth/RoleContext';

/**
 * KopkarRoleModal — Popup Akun & E-Card Saya + Pilih Peran Akun (Mode Demo)
 * Mengikuti konsep ProfileModal di web-marketplace dengan palet Kyoto Heritage KopKar.
 */
export const KopkarRoleModal: React.FC = () => {
  const { navigate } = useRouter();
  const { currentUser, selectUser, isRoleModalOpen, closeRoleModal } = useKopkarRole();

  if (!isRoleModalOpen) return null;

  const handleOpenProfile = () => {
    closeRoleModal();
    navigate('/profile');
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn select-none"
      onClick={closeRoleModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-[380px] sm:max-w-[400px] bg-white border border-[#EAE4D3] rounded-3xl p-6 shadow-2xl relative space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[20px] font-semibold text-[#18221D] tracking-tight leading-tight">
              Akun &amp; Pilih Peran
            </h2>
            <p className="text-[12px] text-[#7A867E] mt-1 leading-relaxed">
              Buka halaman Akun &amp; E-Card Saya atau ganti peran demo.
            </p>
          </div>
          <button
            type="button"
            onClick={closeRoleModal}
            aria-label="Tutup"
            className="w-8 h-8 rounded-full bg-[#FAF7EE] hover:bg-[#EAE4D3] flex items-center justify-center text-[#18221D] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleOpenProfile}
          className="w-full px-4 py-3 rounded-2xl bg-[#165239] hover:bg-[#12422E] text-white flex items-center justify-between gap-3 cursor-pointer transition-colors shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-4 h-4 text-[#F2C94C] shrink-0" />
            <div className="text-left">
              <div className="text-[13px] font-semibold leading-tight">
                Buka Akun &amp; E-Card Saya
              </div>
              <div className="text-[11px] text-white/75 mt-0.5">
                Profil, kartu digital QR kasir &amp; data keanggotaan
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>

        <div className="space-y-2.5">
          {PRESET_KOPKAR_USERS.map((usr) => {
            const isSelected = usr.id === currentUser.id;
            return (
              <button
                key={usr.id}
                type="button"
                onClick={() => selectUser(usr)}
                className={`w-full text-left flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#165239] bg-[#EAF4EE]/30 shadow-2xs'
                    : 'border border-[#EAE4D3] hover:border-[#165239]/40 bg-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-[#165239] text-[#F2C94C] text-[13px] font-bold flex items-center justify-center shrink-0">
                    {usr.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[13.5px] text-[#18221D] truncate leading-tight">
                      {usr.name}
                    </div>
                    <div className="text-[11px] text-[#7A867E] truncate mt-0.5 tabular-nums">
                      {usr.department} · {usr.nik}
                    </div>
                    <span
                      className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-medium leading-none ${usr.badgeClass}`}
                    >
                      {usr.roleLabel}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <span className="w-6 h-6 rounded-full bg-[#165239] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
};
