import React, { useState } from 'react';
import { Bell, Search, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface TopHeaderProps {
  onProfileClick?: () => void;
  onSearchClick?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onProfileClick, onSearchClick }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600 bg-emerald-50',
      title: 'Verifikasi Anggota Selesai',
      desc: 'Kepala Koperasi telah menyetujui akun Anda. Selamat menikmati akses penuh KOPKARSAI!',
      time: '10 menit lalu',
    },
    {
      id: 2,
      type: 'warning',
      icon: AlertCircle,
      iconColor: 'text-amber-600 bg-amber-50',
      title: 'Pesanan PO Katering Masuk',
      desc: 'Ada 2 pesanan pre-order H-1 (Nasi Bakar & Risoles) menunggu konfirmasi pasokan Anda.',
      time: '1 jam lalu',
    },
    {
      id: 3,
      type: 'info',
      icon: Calendar,
      iconColor: 'text-blue-600 bg-blue-50',
      title: 'Jadwal Drop Sampel Uji Makanan',
      desc: 'Pengumpulan sampel makanan basah berlangsung hari Rabu, Shift A di SAI B.',
      time: 'Kemarin',
    },
  ];

  return (
    <>
      <header className="px-5 pt-3 pb-2 flex items-center justify-between">
        {/* Left: User Avatar & Greeting */}
        <div className="flex items-center gap-3">
          <div
            onClick={onProfileClick}
            className="relative cursor-pointer group transition-transform active:scale-95"
          >
            {/* Avatar container */}
            <div className="w-11 h-11 rounded-full ring-2 ring-kopkar-primary/20 p-0.5 bg-gradient-to-tr from-kopkar-primary to-kopkar-gold">
              <div className="w-full h-full rounded-full bg-emerald-950 flex items-center justify-center text-kopkar-gold font-bold text-sm shadow-inner overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80"
                  alt="Sandra Maharani"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to text avatar if image fails to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-xs font-bold text-kopkar-gold">SM</span>
              </div>
            </div>
            {/* Green active dot */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold text-kopkar-dark leading-tight">
                Halo, Sandra
              </h1>
              <span className="text-xs">👋</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-kopkar-mint text-kopkar-primary-dark rounded-full border border-emerald-200/50">
                Unit SAI B
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Karyawan</span>
            </div>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <button
            onClick={onSearchClick}
            className="w-9 h-9 rounded-full bg-white border border-slate-200/80 text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-2xs active:scale-95"
            aria-label="Pencarian"
          >
            <Search size={16} strokeWidth={2.2} />
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative w-9 h-9 rounded-full bg-white border border-slate-200/80 text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-2xs active:scale-95"
            aria-label="Notifikasi"
          >
            <Bell size={16} strokeWidth={2.2} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-0.5 w-4 h-4 bg-rose-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center shadow-xs animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Notification Center Modal */}
      <Modal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        title="Pusat Notifikasi Anggota"
        subtitle="Pemberitahuan resmi dan alur operasional KOPKARSAI"
      >
        <div className="space-y-3">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 hover:bg-slate-100/60 transition-colors"
              >
                <div className={`p-2 rounded-xl shrink-0 ${n.iconColor}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{n.title}</h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.desc}</p>
                </div>
              </div>
            );
          })}

          <div className="pt-2 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setUnreadCount(0);
                setIsNotifOpen(false);
              }}
            >
              Tandai Semua Sudah Dibaca
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
