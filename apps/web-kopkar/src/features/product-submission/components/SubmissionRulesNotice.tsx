import React, { useState } from 'react';
import { ShieldCheck, Calendar, DollarSign, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../../../components/ui/Card';

/**
 * SubmissionRulesNotice — Ketentuan Baku Pengajuan Produk (Project Knowledge)
 * Mengacu pada KK-REQ-002, KK-BR-002, KK-BR-003, KK-BR-004, dan SH-NFR-001.
 */
export const SubmissionRulesNotice: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      variant="ivory"
      padding="md"
      className="border-[#DED5C3] bg-gradient-to-br from-[#F8F4EC] to-[#F3ECDD]/60"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1F5B45] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Info size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-heading font-extrabold text-[#1A2421]">
                Ketentuan & Alur Pengajuan Produk Mitra Supplier
              </h2>
              <span className="text-[10px] font-accent font-bold px-2 py-0.5 rounded-full bg-[#EAF4EE] text-[#1F5B45] border border-[#A9C3A2]">
                KK-SCR-007
              </span>
            </div>
            <p className="text-xs font-body text-[#5C6F67]">
              Siklus seleksi mutu mingguan: Drop Selasa/Rabu • Uji Kamis • Pengumuman Jumat
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-accent font-bold text-[#1F5B45] hover:text-[#2F6F56] flex items-center gap-1 cursor-pointer flex-shrink-0 py-1"
        >
          <span>{isExpanded ? 'Sembunyikan' : 'Rincian Aturan'}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Highlights Grid (Selalu Tampak) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-[#DED5C3]/70">
        <div className="flex items-start gap-2.5 bg-white/80 p-2.5 rounded-xl border border-[#DED5C3]/60">
          <Calendar size={18} className="text-[#1F5B45] flex-shrink-0 mt-0.5" />
          <div className="text-xs font-body">
            <p className="font-heading font-bold text-[#1A2421]">Jadwal Uji Sampel (KK-BR-004)</p>
            <p className="text-[#5C6F67] text-[11px]">
              Penyerahan sampel fisik hanya hari <strong>Selasa / Rabu</strong> (Shift A atau B).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 bg-white/80 p-2.5 rounded-xl border border-[#DED5C3]/60">
          <DollarSign size={18} className="text-[#1F5B45] flex-shrink-0 mt-0.5" />
          <div className="text-xs font-body">
            <p className="font-heading font-bold text-[#1A2421]">Struktur Harga (KK-BR-003)</p>
            <p className="text-[#5C6F67] text-[11px]">
              Wajib mencantumkan HPP supplier & usulan harga jual untuk evaluasi margin koperasi.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 bg-white/80 p-2.5 rounded-xl border border-[#DED5C3]/60">
          <ShieldCheck size={18} className="text-[#1F5B45] flex-shrink-0 mt-0.5" />
          <div className="text-xs font-body">
            <p className="font-heading font-bold text-[#1A2421]">Integritas Berkas (SH-NFR-001)</p>
            <p className="text-[#5C6F67] text-[11px]">
              Foto produk maks. <strong>3.0 MB</strong> (JPG/PNG/WEBP), disimpan aman di S3.
            </p>
          </div>
        </div>
      </div>

      {/* Expanded Accordion: Detail Seluruh Invariant */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-[#DED5C3] text-xs font-body text-[#24332F] space-y-2.5 bg-white/90 p-4 rounded-2xl border border-[#DED5C3]">
          <div className="flex items-start gap-2">
            <span className="font-accent font-bold text-[#1F5B45] bg-[#EAF4EE] px-1.5 py-0.5 rounded text-[10px]">
              KK-BR-002
            </span>
            <p>
              <strong>Syarat Mitra:</strong> Hanya anggota koperasi aktif terverifikasi (Dual-Approval) yang berhak mendaftar sebagai supplier dan mengajukan produk jualan makanan/minuman.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="font-accent font-bold text-[#1F5B45] bg-[#EAF4EE] px-1.5 py-0.5 rounded text-[10px]">
              KK-DEC-003
            </span>
            <p>
              <strong>Siklus Mingguan Baku:</strong> Penyerahan sampel Selasa/Rabu di Pabrik SAI B atau SAI T. Uji organoleptik/rasa & kemasan dilakukan hari Kamis. Pengumuman status ACC / Revisi / Ditolak diterbitkan resmi setiap hari Jumat.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="font-accent font-bold text-[#1F5B45] bg-[#EAF4EE] px-1.5 py-0.5 rounded text-[10px]">
              KK-BR-007
            </span>
            <p>
              <strong>Tanggung Jawab Barang:</strong> Makanan basah titipan yang rusak/kedaluwarsa sepenuhnya menjadi tanggungan finansial supplier dan wajib diambil kembali atau dimusnahkan sesuai SOP.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="font-accent font-bold text-[#1F5B45] bg-[#EAF4EE] px-1.5 py-0.5 rounded text-[10px]">
              KK-BR-005
            </span>
            <p>
              <strong>Histori & Revisi:</strong> Apabila pengajuan berstatus "Revisi", catatan perbaikan kurator tersimpan permanen. Anda dapat memperbarui foto/resep tanpa membuat pendaftaran baru.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};
