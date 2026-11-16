import React from 'react';
import { Bell } from 'lucide-react';
import { BrandLogo } from '../../components/brand/BrandLogo';
import { useRouter } from '../router';

export const MobileHeader: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // Hilangkan header pada mobile di beranda, pesanan, produk, produk baru/detail, dan sinjam
  if (
    currentPath === '/' ||
    currentPath === '/orders' ||
    currentPath === '/products' ||
    currentPath === '/products/new' ||
    currentPath === '/products/detail' ||
    currentPath === '/financial'
  ) {
    return null;
  }

  return (
    <header className="md:hidden sticky top-0 z-30 w-full bg-[#F8F4EC]/95 backdrop-blur-md border-b border-[#DED5C3] px-4 py-3 shadow-xs">
      <div className="flex items-center justify-between">
        {/* Brand identity */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-transform select-none"
        >
          <div className="w-8 h-8 rounded-xl bg-[#1F5B45] border border-[#2F6F56] flex items-center justify-center p-0.5 shadow-xs">
            <BrandLogo size={24} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-base text-[#1F5B45] tracking-tight">
                Koperasi App
              </span>
              <span className="text-[9px] font-accent font-bold text-[#2F6F56] bg-[#A9C3A2]/25 px-1.5 py-0.2 rounded-full border border-[#A9C3A2]/50">
                PT SAI
              </span>
            </div>
            <span className="text-[10px] text-[#5C6F67] font-body block -mt-0.5">
              UI Style Direction
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Pusat Notifikasi"
            className="relative p-2 rounded-xl bg-[#F3ECDD] text-[#1F5B45] border border-[#DED5C3] active:scale-90 transition-transform"
          >
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#DC4C70]" />
          </button>

          <button
            onClick={() => navigate('/profile')}
            aria-label="Profil Saya"
            className="w-8 h-8 rounded-full bg-[#1F5B45] text-white font-heading font-bold text-xs flex items-center justify-center ring-2 ring-[#A9C3A2] active:scale-90 transition-transform"
          >
            AA
          </button>
        </div>
      </div>
    </header>
  );
};
