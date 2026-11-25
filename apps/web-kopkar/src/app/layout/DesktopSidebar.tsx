import React from 'react';
import { BrandLogo } from '../../components/brand/BrandLogo';
import { useRouter } from '../router';
import { getNavGroupsForRole, useKopkarRole } from '../auth/RoleContext';

/**
 * DesktopSidebar — Slicing 1:1 Presisi aistudio-src LayoutShell.
 * Budget: < 200 LOC.
 */
export const DesktopSidebar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { currentUser } = useKopkarRole();
  const navGroups = getNavGroupsForRole(currentUser.role);

  return (
    <aside
      aria-label="Sidebar Utama Desktop"
      className="hidden md:flex flex-col justify-between w-60 lg:w-64 h-screen sticky top-0 z-30 bg-[#165239] text-white border-r border-white/10 shadow-md flex-shrink-0 select-none overflow-y-auto"
    >
      {/* 1. Brand Identity Header */}
      <div className="px-5 pt-4 pb-3.5 border-b border-white/10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C] rounded-lg cursor-pointer"
        >
          <BrandLogo size={36} className="shrink-0 drop-shadow-sm" />
          <div>
            <div className="font-okashi text-[18px] leading-tight tracking-wide text-white">
              KOPKARSAI
            </div>
            <div className="text-[11px] text-white/65 leading-tight mt-0.5 font-normal">
              Ekosistem Koperasi PT SAI
            </div>
          </div>
        </button>
      </div>

      {/* 2. Categorized Navigation Groups (Filtered by Active Role) */}
      <nav className="flex-1 px-3 py-3 space-y-3.5 overflow-y-auto">
        {navGroups.map((group) => (
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
                    onClick={() => navigate(item.path)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-2xl text-[12.5px] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C] ${
                      isActive
                        ? 'bg-[#FAF7EE] text-[#154A33] font-semibold shadow-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10 font-normal'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-[#165239]' : 'text-white/65'
                        }`}
                      />
                      <span className="truncate whitespace-nowrap">{item.label}</span>
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
    </aside>
  );
};
