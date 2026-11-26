import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Download,
  ShieldCheck,
  Upload,
} from 'lucide-react';
import { useKopkarRole } from '../../../app/auth/RoleContext';
import { SlideOverDrawer } from '../../../components/ui/SlideOverDrawer';

interface GovernanceDoc {
  title: string;
  version: string;
  updatedAt: string;
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  summary: string;
  keyPoints: string[];
  fileUrl?: string;
}

const STORAGE_KEY = 'kopkar_governance_doc_v1';
const MAX_FILE_BYTES = 3 * 1024 * 1024;

const DEFAULT_DOC: GovernanceDoc = {
  title: 'Pedoman Tata Kelola & AD/ART KOPKAR PT SAI',
  version: 'v2026.1',
  updatedAt: '20 Nov 2026',
  fileName: 'AD_ART_Pedoman_KOPKAR_SAI_2026.pdf',
  fileSize: '1.4 MB',
  uploadedBy: 'H. Hendra Wijaya (Kepala Koperasi)',
  summary:
    'Dokumen resmi tata kelola Koperasi Karyawan PT SAI mencakup AD/ART, prosedur Dual-Approval keanggotaan, ketentuan simpan pinjam (SinJam), dan SLA kemitraan supplier.',
  keyPoints: [
    'Simpanan Pokok Rp 50.000 (1x) & Simpanan Wajib Rp 25.000/bulan via payroll.',
    'Registrasi anggota wajib Dual-Approval (Admin Toko → Kepala Koperasi) sebelum login.',
    'Plafon maksimal SinJam Rp 50.000.000 per anggota aktif.',
    'Mitra supplier wajib uji sampel fisik & mengambil sisa produk harian pukul 16:00–17:00 WIB.',
  ],
};

function loadSavedDoc(): GovernanceDoc {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as GovernanceDoc;
  } catch {
    // ignore storage errors
  }
  return DEFAULT_DOC;
}

export const GovernanceDocumentsCard: React.FC = () => {
  const { currentUser } = useKopkarRole();
  const canUpload = currentUser.role === 'KEPALA_KOPERASI';

  const [doc, setDoc] = useState<GovernanceDoc>(loadSavedDoc);
  const [drawerMode, setDrawerMode] = useState<'read' | 'upload' | null>(null);
  const [titleInput, setTitleInput] = useState(doc.title);
  const [versionInput, setVersionInput] = useState(doc.version);
  const [pendingFile, setPendingFile] = useState<{
    name: string;
    size: string;
    url: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openUploadDrawer = () => {
    setTitleInput(doc.title);
    setVersionInput(doc.version);
    setPendingFile(null);
    setErrorMsg(null);
    setDrawerMode('upload');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setErrorMsg('Ukuran file maksimal 3 MB.');
      return;
    }
    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = () => {
      const sizeKb = file.size / 1024;
      const sizeLabel =
        sizeKb >= 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${Math.round(sizeKb)} KB`;
      setPendingFile({
        name: file.name,
        size: sizeLabel,
        url: typeof reader.result === 'string' ? reader.result : '',
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) {
      setErrorMsg('Judul dokumen wajib diisi.');
      return;
    }
    const today = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const nextDoc: GovernanceDoc = {
      ...doc,
      title: titleInput.trim(),
      version: versionInput.trim() || doc.version,
      updatedAt: today,
      fileName: pendingFile?.name ?? doc.fileName,
      fileSize: pendingFile?.size ?? doc.fileSize,
      fileUrl: pendingFile?.url ?? doc.fileUrl,
      uploadedBy: `${currentUser.name} (${currentUser.roleLabel})`,
    };
    setDoc(nextDoc);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDoc));
    } catch {
      // ignore quota exceeded
    }
    setDrawerMode(null);
  };

  return (
    <section className="bg-white rounded-2xl border border-[#EAE4D3] p-4 sm:px-5 sm:py-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] text-[#165239] flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[14px] sm:text-[15px] font-semibold text-[#18221D] truncate">
              {doc.title}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#FAF7EE] border border-[#EAE4D3] text-[10.5px] font-medium text-[#526058] tabular-nums shrink-0">
              {doc.version}
            </span>
          </div>
          <p className="text-[11.5px] text-[#7A867E] mt-0.5 truncate tabular-nums">
            {doc.fileName} · {doc.fileSize} · Diperbarui {doc.updatedAt}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setDrawerMode('read')}
        className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-[#FAF8F2] hover:bg-[#EAF4EE] border border-[#EAE4D3] hover:border-[#165239]/40 text-[#165239] text-[12.5px] font-medium inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors shrink-0"
      >
        <span>{canUpload ? 'Baca & Kelola Dokumen' : 'Baca Dokumen'}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      <SlideOverDrawer
        open={drawerMode !== null}
        onClose={() => setDrawerMode(null)}
        maxWidthClass="sm:max-w-[440px]"
        closeAriaLabel="Tutup panel dokumen tata kelola"
        header={
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EAF4EE] text-[#165239] text-[11px] font-medium">
              {drawerMode === 'upload' ? 'Manajemen Dokumen · Kepala Koperasi' : `Dokumen Resmi · ${doc.version}`}
            </span>
            <h3 className="text-[17px] font-semibold text-[#18221D] mt-1.5 leading-snug">
              {drawerMode === 'upload' ? 'Upload / Perbarui Dokumen Tata Kelola' : doc.title}
            </h3>
          </div>
        }
        footer={
          drawerMode === 'read' ? (
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                {doc.fileUrl ? (
                  <a
                    href={doc.fileUrl}
                    download={doc.fileName}
                    className="px-3.5 py-2 rounded-xl border border-[#EAE4D3] bg-[#FAF8F2] hover:bg-[#EAF4EE] text-[#165239] text-[12.5px] font-medium inline-flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh File</span>
                  </a>
                ) : (
                  <span className="text-[11.5px] text-[#7A867E]">Oleh {doc.uploadedBy}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {canUpload && (
                  <button
                    type="button"
                    onClick={openUploadDrawer}
                    className="px-3.5 py-2 rounded-xl border border-[#EAE4D3] bg-[#FAF8F2] hover:bg-[#EAF4EE] text-[#165239] text-[12.5px] font-medium inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDrawerMode(null)}
                  className="px-4 py-2 rounded-xl bg-[#165239] hover:bg-[#12422E] text-white text-[12.5px] font-medium cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : undefined
        }
      >
        {drawerMode === 'read' ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-[#EAE4D3] bg-[#FAF8F2] p-4 text-[12.5px] text-[#526058] leading-relaxed">
              {doc.summary}
            </div>
            <div className="rounded-2xl border border-[#EAE4D3] bg-white p-4 space-y-2.5">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em] text-[#165239] uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Poin Ketentuan Utama</span>
              </div>
              <ul className="space-y-2 text-[12.5px] text-[#18221D] list-disc list-inside leading-relaxed">
                {doc.keyPoints.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveUpload} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#18221D] mb-1">
                Judul Dokumen
              </label>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EAE4D3] text-[13px] focus:outline-none focus:border-[#165239]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#18221D] mb-1">
                Versi Dokumen
              </label>
              <input
                type="text"
                value={versionInput}
                onChange={(e) => setVersionInput(e.target.value)}
                placeholder="v2026.2"
                className="w-full px-3 py-2 rounded-xl border border-[#EAE4D3] text-[13px] focus:outline-none focus:border-[#165239]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#18221D] mb-1.5">
                File Dokumen (PDF / DOC / DOCX, maks. 3 MB)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-4 rounded-2xl border border-dashed border-[#165239]/40 bg-[#FAF8F2] hover:bg-[#EAF4EE]/60 text-center cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-[#165239] mx-auto mb-1.5" />
                <div className="text-[12.5px] font-medium text-[#18221D]">
                  {pendingFile ? pendingFile.name : 'Pilih file dari perangkat'}
                </div>
                <div className="text-[11px] text-[#7A867E] mt-0.5">
                  {pendingFile
                    ? `Siap diunggah (${pendingFile.size})`
                    : `Saat ini: ${doc.fileName} (${doc.fileSize})`}
                </div>
              </button>
            </div>

            {errorMsg && (
              <p className="text-[12px] text-[#B45309] bg-[#FEF3C7] px-3 py-2 rounded-xl">
                {errorMsg}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDrawerMode(null)}
                className="px-4 py-2 rounded-xl border border-[#EAE4D3] text-[12.5px] font-medium text-[#526058] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#165239] hover:bg-[#12422E] text-white text-[12.5px] font-medium cursor-pointer"
              >
                Simpan Dokumen
              </button>
            </div>
          </form>
        )}
      </SlideOverDrawer>
    </section>
  );
};
