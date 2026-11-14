import React, { useRef } from 'react';
import { Camera, UploadCloud, X, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { Card } from '../../../components/ui/Card';

interface ProductImageUploadSectionProps {
  imagePreviewUrl: string;
  imageFile: File | null;
  error?: string;
  onSelect: (file: File) => boolean;
  onRemove: () => void;
}

export const ProductImageUploadSection: React.FC<ProductImageUploadSectionProps> = ({
  imagePreviewUrl,
  imageFile,
  error,
  onSelect,
  onRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <Card padding="md" className="space-y-3">
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#DED5C3]">
        <div className="w-8 h-8 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center flex-shrink-0">
          <Camera size={18} />
        </div>
        <div>
          <h3 className="text-base font-heading font-extrabold text-[#1A2421]">
            4. Unggah Foto Sampel / Kemasan Produk
          </h3>
          <p className="text-xs font-body text-[#5C6F67]">
            Sesuai SH-NFR-001: Foto wajib jelas, maks. 3.0 MB (format JPG, PNG, atau WEBP)
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {imagePreviewUrl ? (
        <div className="relative rounded-2xl overflow-hidden border border-[#DED5C3] bg-[#F8F4EC] p-3 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-36 h-36 rounded-xl overflow-hidden bg-white border border-[#DED5C3] shadow-xs flex-shrink-0">
            <img
              src={imagePreviewUrl}
              alt="Preview Sampel Produk"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-heading font-bold text-[#1F5B45]">
              <CheckCircle size={15} />
              <span>Foto Berhasil Diunggah</span>
            </div>
            <p className="text-xs font-heading font-bold text-[#1A2421] truncate max-w-xs">
              {imageFile?.name || 'sampel-produk.jpg'}
            </p>
            <p className="text-[11px] font-accent text-[#5C6F67]">
              Ukuran berkas: {imageFile ? `${(imageFile.size / 1024).toFixed(0)} KB` : 'Tervalidasi'} • S3 Storage Ready
            </p>

            <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#F3ECDD] text-xs font-heading font-bold text-[#1F5B45] border border-[#DED5C3] cursor-pointer transition-colors"
              >
                Ganti Foto
              </button>
              <button
                type="button"
                onClick={onRemove}
                className="px-3 py-1.5 rounded-xl bg-[#DC4C70]/10 hover:bg-[#DC4C70]/20 text-xs font-heading font-bold text-[#DC4C70] border border-[#DC4C70]/30 cursor-pointer transition-colors flex items-center gap-1"
              >
                <X size={14} />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            error
              ? 'border-[#DC4C70] bg-[#DC4C70]/5'
              : 'border-[#DED5C3] bg-[#F8F4EC]/60 hover:bg-[#F8F4EC] hover:border-[#1F5B45]/50'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#DED5C3] flex items-center justify-center mx-auto mb-2 text-[#1F5B45] shadow-xs">
            <UploadCloud size={24} />
          </div>
          <p className="text-xs sm:text-sm font-heading font-bold text-[#1A2421]">
            Pilih atau Tarik Berkas Foto ke Sini
          </p>
          <p className="text-[11px] font-body text-[#5C6F67] mt-0.5">
            Format yang didukung: JPG, PNG, atau WEBP • Maksimal 3.0 MB
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#DED5C3] text-xs font-heading font-bold text-[#1F5B45] shadow-2xs">
            <ImageIcon size={14} />
            <span>Pilih Foto dari Galeri / Kamera</span>
          </div>
        </div>
      )}

      {error && <p className="text-[11px] font-body text-[#DC4C70] mt-1">{error}</p>}
    </Card>
  );
};
