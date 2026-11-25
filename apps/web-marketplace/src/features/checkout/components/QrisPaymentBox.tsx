import React from 'react';
import { Download } from 'lucide-react';

interface QrisPaymentBoxProps {
  totalAmount: number;
}

/**
 * QrisPaymentBox — QRIS Display & Fitur Unduh QRIS
 * Sesuai Gambar 2 (media_1795490727216_14d5f6a7.png). Budget: < 200 LOC.
 */
export const QrisPaymentBox: React.FC<QrisPaymentBoxProps> = ({ totalAmount }) => {
  const handleDownloadQris = () => {
    const svgEl = document.getElementById('marketplace-qris-svg');
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `QRIS-KOPKAR-SAI-${totalAmount}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-2 flex flex-col items-center justify-center space-y-3 animate-fadeIn">
      <div className="p-3 bg-white border border-[#EAE3D5] rounded-2xl shadow-xs">
        <svg
          id="marketplace-qris-svg"
          viewBox="0 0 160 160"
          className="w-40 h-40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="160" height="160" fill="white" />
          {/* Corner Finder Top-Left */}
          <rect x="12" y="12" width="36" height="36" rx="4" fill="#1A1615" />
          <rect x="18" y="18" width="24" height="24" rx="2" fill="white" />
          <rect x="24" y="24" width="12" height="12" rx="1" fill="#1A1615" />
          {/* Corner Finder Top-Right */}
          <rect x="112" y="12" width="36" height="36" rx="4" fill="#1A1615" />
          <rect x="118" y="18" width="24" height="24" rx="2" fill="white" />
          <rect x="124" y="24" width="12" height="12" rx="1" fill="#1A1615" />
          {/* Corner Finder Bottom-Left */}
          <rect x="12" y="112" width="36" height="36" rx="4" fill="#1A1615" />
          <rect x="18" y="118" width="24" height="24" rx="2" fill="white" />
          <rect x="24" y="124" width="12" height="12" rx="1" fill="#1A1615" />
          {/* QR Data Pattern */}
          <path
            d="M56 16h8v8h-8zM72 16h16v8H72zM96 16h8v8h-8zM56 32h16v8H56zM80 32h8v8h-8zM96 32h8v8h-8zM56 48h8v16h-8zM72 48h24v8H72zM104 48h16v8h-16zM16 56h16v8H16zM40 56h8v8h-8zM128 56h8v16h-8zM144 56h8v8h-8zM24 72h8v16h-8zM40 72h16v8H40zM64 72h32v8H64zM104 72h16v8h-16zM16 88h8v8h-8zM32 88h16v16H32zM56 88h8v8h-8zM72 88h16v8H72zM96 88h8v16h-8zM112 88h16v8h-16zM136 88h16v8h-16zM56 104h16v8H56zM80 104h8v8h-8zM104 104h8v8h-8zM128 104h16v16h-16zM56 120h8v16h-8zM72 120h24v8H72zM104 120h8v8h-8zM120 120h8v8h-8zM64 136h16v8H64zM88 136h16v8H88zM112 136h8v8h-8zM128 136h16v8h-16z"
            fill="#1A1615"
          />
        </svg>
      </div>
      <p className="text-xs text-[#665E60] text-center max-w-xs">
        Scan dengan mobile banking atau e-wallet. Nominal Rp {totalAmount.toLocaleString('id-ID')}.
      </p>
      <button
        type="button"
        onClick={handleDownloadQris}
        className="px-3.5 py-1.5 rounded-xl border border-[#83273B] text-[#83273B] hover:bg-[#83273B] hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Unduh QRIS</span>
      </button>
    </div>
  );
};
