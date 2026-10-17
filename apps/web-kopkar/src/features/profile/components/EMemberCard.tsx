import React from 'react';
import { QrCode, ShieldCheck, Sparkles, Cpu } from 'lucide-react';
import { KopkarLogo } from '../../../components/ui/KopkarLogo';

interface EMemberCardProps {
  name: string;
  nik: string;
  unit: string;
  status: string;
}

export const EMemberCard: React.FC<EMemberCardProps> = ({
  name,
  nik,
  unit,
  status,
}) => {
  return (
    <div className="relative w-full aspect-[1.58/1] rounded-3xl bg-gradient-to-tr from-kopkar-dock via-kopkar-primary to-emerald-800 text-white p-5 shadow-2xl border border-emerald-500/30 overflow-hidden flex flex-col justify-between">
      {/* Background Watermark Pattern */}
      <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-15">
        <KopkarLogo size={180} variant="watermark" />
      </div>

      {/* Hologram / Foil Accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none" />

      {/* Top Card Row */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-2">
          <KopkarLogo size={32} showText={true} textColor="text-white" />
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-kopkar-gold/20 border border-kopkar-gold/40 text-[10px] font-bold text-kopkar-gold backdrop-blur-xs">
          <ShieldCheck size={12} className="text-kopkar-gold" />
          <span>{status}</span>
        </div>
      </div>

      {/* Smart Chip & Contactless Symbol */}
      <div className="flex items-center gap-3 relative z-10 my-auto pt-2">
        {/* Golden Metallic Chip */}
        <div className="w-10 h-7 rounded-lg bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 border border-amber-600/50 shadow-inner flex items-center justify-center relative overflow-hidden">
          <div className="w-full h-0.5 bg-amber-700/40 absolute top-2" />
          <div className="w-full h-0.5 bg-amber-700/40 absolute bottom-2" />
          <div className="h-full w-0.5 bg-amber-700/40 absolute left-3" />
        </div>

        {/* Contactless waves */}
        <span className="text-emerald-300/80 font-mono text-xs font-bold">
          RFID • DUAL-AUTH
        </span>
      </div>

      {/* Bottom Card Row: Member Info & QR Code */}
      <div className="flex items-end justify-between relative z-10 pt-2">
        <div>
          <span className="text-[9px] text-emerald-300 font-medium tracking-wider uppercase block">
            Nama Anggota Karyawan
          </span>
          <h3 className="text-base font-extrabold tracking-wide text-white uppercase mt-0.5">
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1 font-mono text-xs text-kopkar-gold font-bold">
            <span>{nik}</span>
            <span className="text-white/40">•</span>
            <span className="text-emerald-200 font-sans text-[11px] font-semibold">{unit}</span>
          </div>
        </div>

        {/* QR Code Graphic Box */}
        <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-md flex items-center justify-center shrink-0">
          <QrCode size={40} className="text-kopkar-dock" />
        </div>
      </div>
    </div>
  );
};
