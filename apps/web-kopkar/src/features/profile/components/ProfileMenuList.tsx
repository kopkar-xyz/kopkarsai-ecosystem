import React, { useState } from 'react';
import {
  History,
  MessageCircle,
  ShoppingBag,
  FileText,
  LogOut,
  ChevronRight,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';

interface ProfileMenuListProps {
  onOpenMarketplace: () => void;
  onOpenRevisionLog: () => void;
}

export const ProfileMenuList: React.FC<ProfileMenuListProps> = ({
  onOpenMarketplace,
  onOpenRevisionLog,
}) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    {
      id: 'revisions',
      title: 'Riwayat Pengajuan & Log Revisi',
      desc: 'Pelacakan catatan kurasi produk supplier (KK-SCR-009)',
      icon: History,
      action: onOpenRevisionLog,
    },
    {
      id: 'marketplace',
      title: 'Portal Belanja Marketplace Toko',
      desc: 'Katalog belanja barang toko fisik & katering H-1',
      icon: ShoppingBag,
      action: onOpenMarketplace,
    },
    {
      id: 'contact',
      title: 'WhatsApp Resmi Pengurus Koperasi',
      desc: '0811-3330-2500 (Senin - Jumat 08:00 - 16:30 WIB)',
      icon: MessageCircle,
      externalUrl: 'https://wa.me/6281133302500',
    },
    {
      id: 'rules',
      title: 'AD/ART & Kebijakan Simpan Pinjam',
      desc: 'Pedoman hak & kewajiban anggota resmi',
      icon: FileText,
      action: () => alert('Buku Panduan AD/ART KOPKARSAI v1.2 (PDF) telah tersimpan.'),
    },
  ];

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-xs font-extrabold text-kopkar-dark uppercase tracking-wider px-1">
          Menu & Pengaturan
        </h3>

        <div className="rounded-3xl bg-white border border-slate-200/80 shadow-bento divide-y divide-slate-100 overflow-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const handleClick = () => {
              if (item.externalUrl) {
                window.open(item.externalUrl, '_blank');
              } else if (item.action) {
                item.action();
              }
            };

            return (
              <div
                key={item.id}
                onClick={handleClick}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors active:bg-slate-100/70"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-kopkar-mint text-kopkar-primary flex items-center justify-center shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400 shrink-0 ml-2">
                  {item.externalUrl ? <ExternalLink size={14} /> : <ChevronRight size={16} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="pt-2">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setIsLogoutModalOpen(true)}
            className="text-rose-600 border-rose-200 hover:bg-rose-50"
          >
            <LogOut size={14} />
            <span>Keluar Sesi Akun (Logout)</span>
          </Button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Konfirmasi Keluar"
        subtitle="Apakah Anda yakin ingin mengakhiri sesi pada perangkat ini?"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Anda harus memasukkan kembali Nomor Induk Karyawan (NIK) dan kata sandi untuk login ke portal KOPKARSAI.
          </p>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setIsLogoutModalOpen(false);
                alert('Sesi berhasil keluar. Mengalihkan ke login gateway.');
              }}
            >
              Ya, Keluar Akun
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
