import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { BrandLogo } from '../../../components/brand/BrandLogo';

interface DigitalMemberCardProps {
  name?: string;
  roleDescription?: string;
  nik?: string;
  shuPoints?: string;
  activeSavings?: string;
  creditLimit?: string;
  subtitle?: string;
  statusLabel?: string;
  rightMetricLabel?: string;
  rightMetricValue?: string;
  showControlsAndStats?: boolean;
}

// 21x21 QR pattern generator from official template
const QR_GRID = (() => {
  let s = 7;
  const os = [[0, 0], [14, 0], [0, 14]], rects: [number, number][] = [];
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      const o = os.find(([ox, oy]) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7);
      const on = o
        ? (x - o[0] === 0 || x - o[0] === 6 || y - o[1] === 0 || y - o[1] === 6 || (x - o[0] >= 2 && x - o[0] <= 4 && y - o[1] >= 2 && y - o[1] <= 4))
        : rnd() > 0.52;
      if (on) rects.push([x, y]);
    }
  }
  return rects;
})();

const CARD_SURFACE_STYLE = {
  boxShadow: '0 26px 50px -16px rgba(8,40,26,.55), 0 0 0 1px rgba(232,196,110,.35) inset',
  background: 'radial-gradient(120% 90% at 85% -10%,#3f9a72 0%,transparent 55%), radial-gradient(90% 80% at 0% 110%,#0c2a1d 0%,transparent 60%), linear-gradient(145deg,#1f6b4d,#143d2c 60%,#0e2c20)',
};

/**
 * DigitalMemberCard — Kartu Anggota Digital 3D Flip KOPKARSAI
 * Dilengkapi Logo Kopkar Kuning (BrandLogo) di samping teks KOPKARSAI (< 200 LOC).
 */
export const DigitalMemberCard: React.FC<DigitalMemberCardProps> = ({
  name = 'Alexander Agung',
  roleDescription = 'Production · Anggota & Operator',
  nik = 'SAI-2024-001',
  shuPoints = '1.420',
  activeSavings = 'Rp 4.800.000',
  creditLimit = 'Rp 35.000.000',
  subtitle = 'Kartu Anggota Digital PT SAI',
  statusLabel = 'Aktif',
  rightMetricLabel = 'Poin SHU',
  rightMetricValue,
  showControlsAndStats = true,
}) => {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
  const displayRightMetric = rightMetricValue ?? shuPoints;
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 70, my: 10 });
  const [isLive, setIsLive] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    setIsLive(true);
    setTilt({
      rx: parseFloat(((0.5 - y) * 12).toFixed(1)),
      ry: parseFloat(((x - 0.5) * 16).toFixed(1)),
      mx: parseFloat(((isFlipped ? 1 - x : x) * 100).toFixed(0)),
      my: parseFloat((y * 100).toFixed(0)),
    });
  };

  return (
    <div className="space-y-3.5 select-none w-full">
      {/* 1. Stage Perspektif 3D Flip Card */}
      <div
        className="w-full [perspective:1100px] cursor-pointer"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => { setIsLive(false); setTilt((p) => ({ ...p, rx: 0, ry: 0 })); }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`w-full aspect-[1.586] [transform-style:preserve-3d] ${isLive ? '' : 'transition-transform duration-300 ease-out'}`}
          style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
        >
          <div
            className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* SISI DEPAN KARTU */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] text-[#f3efe2] p-5 sm:p-6 flex flex-col"
              style={CARD_SURFACE_STYLE}
            >
              {/* Motif Seigaiha Halus & Kilau Lembut */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.08]"
                style={{
                  background: 'radial-gradient(circle at 50% 100%, transparent 38%, rgba(255,255,255,0.25) 39%, rgba(255,255,255,0.25) 41%, transparent 42%, transparent 54%, rgba(255,255,255,0.25) 55%, rgba(255,255,255,0.25) 57%, transparent 58%) 0 0 / 46px 23px',
                  WebkitMaskImage: 'linear-gradient(120deg, transparent 25%, #000 100%)',
                  maskImage: 'linear-gradient(120deg, transparent 25%, #000 100%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-soft-light"
                style={{
                  background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,.5), rgba(255,255,255,0) 50%)`,
                }}
              />
              <div aria-hidden="true" className="absolute right-[-4px] bottom-[-32px] font-kanji font-black text-[135px] sm:text-[150px] leading-none text-[#e8c46e] opacity-[0.07] tracking-[-8px] pointer-events-none [writing-mode:vertical-rl]">
                組合
              </div>

              {/* Baris Atas: Brand KOPKARSAI dengan Logo Kuning & Badge Status Aktif */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <BrandLogo size={28} className="shrink-0 drop-shadow-sm" />
                  <div>
                    <b className="block text-base sm:text-lg font-bold tracking-[0.14em] text-white leading-tight">KOPKARSAI</b>
                    <small className="block text-[10.5px] opacity-70 mt-0.5 text-white">{subtitle}</small>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#e8c46e]/15 text-[#f6d98a] shadow-[0_0_0_1px_rgba(232,196,110,0.4)_inset]">
                  <i className="w-1.5 h-1.5 rounded-full bg-[#7ff0b0] animate-pulse" />
                  <span>{statusLabel}</span>
                </div>
              </div>

              {/* Baris Tengah/Bawah: Avatar & Nama Anggota (mt-auto mepet garis line) */}
              <div className="relative z-10 mt-auto flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#f8f3e4] text-[#1f5a43] font-bold text-sm sm:text-base flex items-center justify-center shrink-0 shadow-[0_0_0_2px_#e8c46e]">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-[21px] font-semibold text-white truncate leading-tight">{name}</h2>
                  <p className="text-[11.5px] text-white/75 mt-0.5 truncate">{roleDescription}</p>
                </div>
              </div>

              {/* Baris Bawah: Garis Pembatas Halus & Info NIK / Poin SHU */}
              <div className="relative z-10 mt-3 pt-2 border-t border-[#e8c46e]/30 flex justify-between items-end">
                <div>
                  <span className="block text-[10px] opacity-65 text-white uppercase tracking-wider mb-0.5">Nomor Induk Karyawan</span>
                  <div className="font-mono text-xs sm:text-[14px] font-medium tracking-[0.12em] text-white leading-none">{nik}</div>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] opacity-65 text-white uppercase tracking-wider mb-0.5">{rightMetricLabel}</span>
                  <strong className="block text-xl sm:text-2xl font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#fff0b8] to-[#e0a830] tabular-nums">
                    {displayRightMetric}
                  </strong>
                </div>
              </div>
            </div>

            {/* SISI BELAKANG KARTU (QR KASIR) */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] text-[#f3efe2] p-5 sm:p-6 flex flex-col items-center justify-center text-center gap-2"
              style={CARD_SURFACE_STYLE}
            >
              <div aria-hidden="true" className="absolute right-[-4px] bottom-[-32px] font-kanji font-black text-[135px] sm:text-[150px] leading-none text-[#e8c46e] opacity-[0.07] tracking-[-8px] pointer-events-none [writing-mode:vertical-rl]">
                組合
              </div>
              <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 bg-[#f8f3e4] rounded-xl p-2.5 shadow-[0_0_0_3px_#e8c46e] flex items-center justify-center">
                <svg viewBox="0 0 21 21" className="w-full h-full" shapeRendering="crispEdges">
                  {QR_GRID.map(([x, y], i) => (
                    <rect key={i} x={x} y={y} width="1" height="1" fill="#143d2c" />
                  ))}
                </svg>
              </div>
              <b className="relative z-10 text-xs sm:text-sm tracking-widest text-[#f6d98a] uppercase mt-1">QR KASIR</b>
              <p className="relative z-10 text-[11px] sm:text-xs opacity-80 text-white">Tunjukkan ke kasir · {nik}</p>
            </div>
          </div>
        </div>
      </div>

      {showControlsAndStats && (
        <>
          {/* 2. Tombol Aksi Flip Card */}
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-10 rounded-xl bg-white border border-[#E9E2D2] hover:bg-[#FAF7F2] text-xs font-sans text-[#1A2421] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-98"
          >
            <RotateCw size={13} className="text-[#5C6F67]" />
            <span>{isFlipped ? 'Kembali ke Kartu Depan' : 'Tampilkan QR Kasir'}</span>
          </button>

          {/* 3. Dua Kotak Metrik: Simpanan Aktif & Limit Kredit */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#E9E2D2] rounded-2xl p-4 shadow-xs space-y-1">
              <span className="text-xs font-sans text-[#5C6F67] block">Simpanan Aktif</span>
              <span className="text-base sm:text-lg font-heading font-medium text-[#1A2421] block tabular-nums">{activeSavings}</span>
            </div>
            <div className="bg-white border border-[#E9E2D2] rounded-2xl p-4 shadow-xs space-y-1">
              <span className="text-xs font-sans text-[#5C6F67] block">Limit Kredit</span>
              <span className="text-base sm:text-lg font-heading font-medium text-[#1A2421] block tabular-nums">{creditLimit}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
