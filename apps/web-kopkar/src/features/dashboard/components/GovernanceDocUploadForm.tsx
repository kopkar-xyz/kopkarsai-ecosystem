import React, { useRef, useState } from 'react';
import { Link2, Upload } from 'lucide-react';
import type { GovernanceDocItem } from './GovernanceDocumentsDrawer';

const MAX_PDF_BYTES = 3 * 1024 * 1024;

interface GovernanceDocUploadFormProps {
  uploaderName: string;
  onSave: (doc: GovernanceDocItem) => void;
}

export const GovernanceDocUploadForm: React.FC<GovernanceDocUploadFormProps> = ({
  uploaderName,
  onSave,
}) => {
  const [sourceType, setSourceType] = useState<'PDF' | 'LINK'>('PDF');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [version, setVersion] = useState('v2026.2');
  const [externalUrl, setExternalUrl] = useState('');
  const [pendingPdf, setPendingPdf] = useState<{
    name: string;
    size: string;
    url: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePdfPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMsg('Format file wajib PDF (.pdf).');
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      setErrorMsg('Ukuran file PDF maksimal 3 MB.');
      return;
    }
    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = () => {
      const kb = file.size / 1024;
      setPendingPdf({
        name: file.name,
        size: kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`,
        url: typeof reader.result === 'string' ? reader.result : '',
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Judul dan keterangan pedoman wajib diisi.');
      return;
    }
    if (sourceType === 'PDF' && !pendingPdf) {
      setErrorMsg('Silakan pilih file PDF terlebih dahulu.');
      return;
    }
    if (sourceType === 'LINK' && !externalUrl.trim()) {
      setErrorMsg('Silakan masukkan tautan URL pedoman.');
      return;
    }
    const today = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    onSave({
      id: `gov-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      sourceType,
      version: version.trim() || 'v1.0',
      updatedAt: today,
      fileName: sourceType === 'PDF' ? pendingPdf?.name : undefined,
      fileSize: sourceType === 'PDF' ? pendingPdf?.size : undefined,
      fileUrl: sourceType === 'PDF' ? pendingPdf?.url : undefined,
      externalUrl: sourceType === 'LINK' ? externalUrl.trim() : undefined,
      uploadedBy: uploaderName,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#FAF7EE] border border-[#EAE4D3]">
        {(['PDF', 'LINK'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setSourceType(t);
              setErrorMsg(null);
            }}
            className={`py-2 rounded-lg text-[12px] font-medium inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
              sourceType === t ? 'bg-[#165239] text-white' : 'text-[#526058]'
            }`}
          >
            {t === 'PDF' ? <Upload className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
            <span>{t === 'PDF' ? 'Upload PDF' : 'Tautan Link'}</span>
          </button>
        ))}
      </div>

      <div>
        <label className="block text-[12px] font-medium text-[#18221D] mb-1">Judul Dokumen *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="cth: SOP Kemitraan UMKM 2026"
          className="w-full px-3 py-2 rounded-xl border border-[#EAE4D3] text-[13px] focus:outline-none focus:border-[#165239]"
        />
      </div>

      <div>
        <label className="block text-[12px] font-medium text-[#18221D] mb-1">
          Keterangan Pedoman *
        </label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Jelaskan isi singkat pedoman ini..."
          className="w-full px-3 py-2 rounded-xl border border-[#EAE4D3] text-[13px] focus:outline-none focus:border-[#165239]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[12px] font-medium text-[#18221D] mb-1">Versi</label>
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="v2026.2"
            className="w-full px-3 py-2 rounded-xl border border-[#EAE4D3] text-[13px] focus:outline-none focus:border-[#165239]"
          />
        </div>

        {sourceType === 'LINK' && (
          <div>
            <label className="block text-[12px] font-medium text-[#18221D] mb-1">
              URL Dokumen *
            </label>
            <input
              type="url"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl border border-[#EAE4D3] text-[13px] focus:outline-none focus:border-[#165239]"
            />
          </div>
        )}
      </div>

      {sourceType === 'PDF' && (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handlePdfPick}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full p-4 rounded-2xl border border-dashed border-[#165239]/40 bg-[#FAF8F2] hover:bg-[#EAF4EE]/60 text-center cursor-pointer transition-colors"
          >
            <Upload className="w-5 h-5 text-[#165239] mx-auto mb-1" />
            <div className="text-[12.5px] font-medium text-[#18221D]">
              {pendingPdf ? pendingPdf.name : 'Pilih File PDF (maks. 3 MB)'}
            </div>
            {pendingPdf && <div className="text-[11px] text-[#7A867E] mt-0.5">{pendingPdf.size}</div>}
          </button>
        </div>
      )}

      {errorMsg && (
        <p className="text-[12px] text-[#B45309] bg-[#FEF3C7] px-3 py-2 rounded-xl">{errorMsg}</p>
      )}

      <button
        type="submit"
        className="w-full py-2.5 rounded-xl bg-[#165239] hover:bg-[#12422E] text-white text-[13px] font-semibold cursor-pointer"
      >
        Simpan &amp; Publikasikan Pedoman
      </button>
    </form>
  );
};
