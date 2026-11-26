import React, { useState } from 'react';
import { Download, ExternalLink, FileText, Link2, Plus, Trash2 } from 'lucide-react';
import { useKopkarRole } from '../../../app/auth/RoleContext';
import { SlideOverDrawer } from '../../../components/ui/SlideOverDrawer';
import { GovernanceDocUploadForm } from './GovernanceDocUploadForm';

export interface GovernanceDocItem {
  id: string;
  title: string;
  description: string;
  sourceType: 'PDF' | 'LINK';
  version: string;
  updatedAt: string;
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
  externalUrl?: string;
  uploadedBy: string;
}

const STORAGE_KEY = 'kopkar_governance_docs_v2';

const DEFAULT_DOCS: GovernanceDocItem[] = [
  {
    id: 'gov-adart',
    title: 'AD/ART KOPKAR PT SAI',
    description: 'Anggaran Dasar & Rumah Tangga resmi Koperasi Karyawan PT SAI.',
    sourceType: 'PDF',
    version: 'v2026.1',
    updatedAt: '20 Nov 2026',
    fileName: 'AD_ART_KOPKAR_SAI_2026.pdf',
    fileSize: '1.4 MB',
    uploadedBy: 'H. Hendra Wijaya',
  },
  {
    id: 'gov-sinjam',
    title: 'Pedoman SinJam & Keanggotaan',
    description: 'Aturan Dual-Approval anggota, plafon pinjaman maks. Rp 50 jt & jasa 0,8%.',
    sourceType: 'PDF',
    version: 'v1.4',
    updatedAt: '15 Nov 2026',
    fileName: 'Pedoman_SinJam_Keanggotaan_2026.pdf',
    fileSize: '820 KB',
    uploadedBy: 'H. Hendra Wijaya',
  },
  {
    id: 'gov-supplier',
    title: 'Panduan Mitra Supplier & Kurasi',
    description: 'Standar kurasi sampel awal, HPP, jadwal dropping pagi & retur sore.',
    sourceType: 'LINK',
    version: 'v2.0',
    updatedAt: '22 Nov 2026',
    externalUrl: 'https://kopkarsai.id/panduan-mitra',
    uploadedBy: 'H. Hendra Wijaya',
  },
];

export function loadGovernanceDocs(): GovernanceDocItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GovernanceDocItem[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore storage read error
  }
  return DEFAULT_DOCS;
}

function triggerPdfDownload(doc: GovernanceDocItem) {
  const filename = doc.fileName || `${doc.title.replace(/\s+/g, '_')}.pdf`;
  if (doc.fileUrl) {
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }
  const content = `${doc.title} (${doc.version})\nDiperbarui: ${doc.updatedAt}\n\n${doc.description}\nDiunggah oleh: ${doc.uploadedBy}`;
  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

interface GovernanceDocumentsDrawerProps {
  open: boolean;
  onClose: () => void;
  docs: GovernanceDocItem[];
  onDocsChange: (docs: GovernanceDocItem[]) => void;
}

export const GovernanceDocumentsDrawer: React.FC<GovernanceDocumentsDrawerProps> = ({
  open,
  onClose,
  docs,
  onDocsChange,
}) => {
  const { currentUser } = useKopkarRole();
  const canManage = currentUser.role === 'KEPALA_KOPERASI';
  const [showAddForm, setShowAddForm] = useState(false);

  const persistDocs = (next: GovernanceDocItem[]) => {
    onDocsChange(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  };

  return (
    <SlideOverDrawer
      open={open}
      onClose={onClose}
      maxWidthClass="sm:max-w-[480px]"
      closeAriaLabel="Tutup pedoman tata kelola"
      header={
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#EAF4EE] text-[#165239] text-[11px] font-medium">
            {docs.length} Dokumen Resmi
          </span>
          <h3 className="text-[18px] font-semibold text-[#18221D] mt-1.5 leading-snug">
            Dokumen &amp; Pedoman Tata Kelola
          </h3>
          <p className="text-[12px] text-[#7A867E] mt-0.5">
            Klik PDF untuk unduh otomatis atau Link untuk membuka panduan.
          </p>
        </div>
      }
      footer={
        <div className="flex items-center justify-between gap-2">
          {canManage ? (
            <button
              type="button"
              onClick={() => setShowAddForm((prev) => !prev)}
              className="px-3.5 py-2 rounded-xl border border-[#165239] text-[#165239] hover:bg-[#EAF4EE] text-[12.5px] font-medium inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Lihat Daftar' : 'Tambah Dokumen'}</span>
            </button>
          ) : (
            <span className="text-[11.5px] text-[#7A867E]">Dikelola oleh Kepala Koperasi</span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#165239] hover:bg-[#12422E] text-white text-[12.5px] font-medium cursor-pointer"
          >
            Tutup
          </button>
        </div>
      }
    >
      {canManage && showAddForm ? (
        <GovernanceDocUploadForm
          uploaderName={currentUser.name}
          onSave={(newDoc) => {
            persistDocs([newDoc, ...docs]);
            setShowAddForm(false);
          }}
        />
      ) : (
        <div className="space-y-3">
          {docs.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#EAE4D3] bg-[#FAF8F2]/80 p-3.5 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#EAE4D3] text-[#165239] flex items-center justify-center shrink-0">
                  {item.sourceType === 'PDF' ? <FileText className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-1.5 py-0.5 rounded bg-white border border-[#EAE4D3] text-[10px] font-semibold text-[#165239]">
                      {item.sourceType}
                    </span>
                    <span className="text-[11px] text-[#7A867E] tabular-nums">{item.version} · {item.updatedAt}</span>
                  </div>
                  <h4 className="text-[13.5px] font-semibold text-[#18221D] mt-1 leading-snug">{item.title}</h4>
                  <p className="text-[12px] text-[#526058] mt-0.5 leading-relaxed">{item.description}</p>
                  {item.fileName && (
                    <p className="text-[11px] text-[#7A867E] mt-1 truncate">
                      {item.fileName} {item.fileSize ? `(${item.fileSize})` : ''}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                {item.sourceType === 'PDF' ? (
                  <button
                    type="button"
                    onClick={() => triggerPdfDownload(item)}
                    className="px-3 py-1.5 rounded-xl bg-[#165239] hover:bg-[#12422E] text-white text-[11.5px] font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh</span>
                  </button>
                ) : (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#EAE4D3] hover:bg-[#EAF4EE] text-[#165239] text-[11.5px] font-medium inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka</span>
                  </a>
                )}
                {canManage && docs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => persistDocs(docs.filter((d) => d.id !== item.id))}
                    className="p-1.5 rounded-lg text-[#7A867E] hover:text-[#B91C1C] hover:bg-[#FEF2F2] cursor-pointer"
                    aria-label={`Hapus ${item.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SlideOverDrawer>
  );
};
