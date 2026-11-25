import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useRouter, type RoutePath } from '../router';
import { NAV_GROUPS } from './navConfig';

interface MobileMenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({ open, onClose }) => {
  const { currentPath, navigate } = useRouter();

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSelect = (path: RoutePath) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="md:hidden fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        aria-label="Menu Navigasi Mobile"
        className="relative z-10 w-72 max-w-[85vw] h-full bg-[#165239] text-white flex flex-col justify-between shadow-2xl overflow-y-auto"
      >
        <div className="px-5 pt-4 pb-3.5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F2C94C] flex items-center justify-center shrink-0 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#165239]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7" />
              </svg>
            </div>
            <div>
              <div className="font-okashi text-[18px] leading-tight tracking-wide text-white">
                KOPKARSAI
              </div>
              <div className="text-[11px] text-white/65 leading-tight mt-0.5">
                Ekosistem Koperasi PT SAI
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu navigasi"
            className="p-1.5 rounded-lg text-white/80 hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-3.5 overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.groupTitle} className="space-y-1">
              <div className="px-3 mb-1 text-[10px] font-semibold tracking-[0.08em] text-white/45 uppercase">
                {group.groupTitle}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    currentPath === item.path ||
                    (item.path === '/products' && currentPath.startsWith('/products'));

                  return (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => handleSelect(item.path)}
                      className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-2xl text-[13px] transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#FAF7EE] text-[#154A33] font-semibold shadow-sm'
                          : 'text-white/85 hover:text-white hover:bg-white/10 font-normal'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-[#165239]' : 'text-white/65'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </span>
                      {item.badge && (
                        <span className="w-5 h-5 rounded-full bg-[#F2C94C] text-[#154A33] text-[11px] font-bold flex items-center justify-center shrink-0 tabular-nums">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            type="button"
            onClick={() => handleSelect('/profile')}
            className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#F2C94C] text-[#154A33] font-bold text-xs flex items-center justify-center shrink-0">
              AA
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-semibold text-white truncate">
                Alexander Agung
              </div>
              <div className="text-[10.5px] text-white/60 truncate">
                NIK: SAI-2024-001
              </div>
            </div>
          </button>
        </div>
      </aside>
    </div>
  );
};
