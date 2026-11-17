import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#EAE3D5] py-6 px-4 text-center text-xs text-[#665E60] mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© 2026 KopKar SAI • Layanan Marketplace & Kantin Terpadu Karyawan PT SAI</p>
        <div className="flex items-center gap-4 text-[11px]">
          <span>One Contract — Two Applications</span>
          <span>•</span>
          <span className="font-serif">和食 Sakura Kyoto Style</span>
        </div>
      </div>
    </footer>
  );
};

