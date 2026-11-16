import React from 'react';
import { Truck, Clock, Hourglass, AlertCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import type {
  CompleteSubmissionFormData,
  SubmissionFormErrors,
  SupplyLocation,
  SupplyScheduleTime,
  ShelfLifeDuration,
} from '../types';

interface ProductSupplyRuleSectionProps {
  formData: CompleteSubmissionFormData;
  errors: SubmissionFormErrors;
  onChange: <K extends keyof CompleteSubmissionFormData>(
    field: K,
    value: CompleteSubmissionFormData[K]
  ) => void;
}

export const ProductSupplyRuleSection: React.FC<ProductSupplyRuleSectionProps> = ({
  formData,
  errors,
  onChange,
}) => {
  const supplyLocations: { value: SupplyLocation; label: string; desc: string }[] = [
    { value: 'SAI-B', label: 'Unit SAI-B', desc: 'Kantin & Toko Koperasi Gedung B' },
    { value: 'SAI-T', label: 'Unit SAI-T', desc: 'Kantin & Toko Koperasi Gedung T' },
  ];

  const supplySchedules: { value: SupplyScheduleTime; label: string; sub: string }[] = [
    { value: 'Shift A', label: 'Shift A', sub: 'Pagi s/d Siang' },
    { value: 'Shift B', label: 'Shift B', sub: 'Sore s/d Malam' },
    { value: 'Setiap Pagi', label: 'Setiap Pagi', sub: 'Awal jam operasional' },
    { value: 'Setiap Malam', label: 'Setiap Malam', sub: 'Menjelang shift malam' },
    { value: 'Tunggu Barang Habis', label: 'Tunggu Barang Habis', sub: 'Restock saat etalase kosong' },
  ];

  const shelfLifeOptions: { value: ShelfLifeDuration; label: string; desc: string }[] = [
    { value: 'Setiap Akhir Shift', label: 'Setiap Akhir Shift', desc: 'Ditarik di penghujung shift' },
    { value: 'Setiap 2 Shift', label: 'Setiap 2 Shift', desc: 'Tahan selama 2 putaran shift' },
    { value: 'Jangka Waktu Tertentu', label: 'Jangka Waktu Tertentu', desc: 'Masa simpan terukur hari' },
  ];

  const isFood = !formData.productType.startsWith('Minuman');

  return (
    <Card padding="md" className="space-y-4">
      {/* Header Section */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#DED5C3]">
        <div className="w-8 h-8 rounded-xl bg-[#EAF4EE] text-[#1F5B45] flex items-center justify-center flex-shrink-0">
          <Truck size={18} />
        </div>
        <div>
          <h3 className="text-base font-heading font-extrabold text-[#1A2421]">
            3. Lokasi & Jadwal Pasokan Rutin
          </h3>
          <p className="text-xs font-body text-[#5C6F67]">
            Tentukan unit penempatan supply, jadwal pengiriman rutin, dan daya tahan produk
          </p>
        </div>
      </div>

      {/* 1. Di supply dimana (SAI-T atau SAI-B) */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5 flex items-center gap-1.5">
          <Truck size={14} className="text-[#1F5B45]" />
          <span>Di Supply Dimana <span className="text-[#DC4C70]">*</span></span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {supplyLocations.map((loc) => (
            <button
              key={loc.value}
              type="button"
              onClick={() => onChange('supplyLocation', loc.value)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                formData.supplyLocation === loc.value
                  ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-xs'
                  : 'bg-[#F8F4EC] text-[#1A2421] border-[#DED5C3] hover:border-[#1F5B45]/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-heading font-bold">{loc.label}</span>
                <span
                  className={`text-[10px] font-accent font-bold px-2 py-0.5 rounded-full ${
                    formData.supplyLocation === loc.value
                      ? 'bg-white/20 text-white'
                      : 'bg-white text-[#1F5B45] border border-[#DED5C3]'
                  }`}
                >
                  Pabrik
                </span>
              </div>
              <p
                className={`text-xs font-body mt-0.5 ${
                  formData.supplyLocation === loc.value ? 'text-white/80' : 'text-[#5C6F67]'
                }`}
              >
                {loc.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Kapan supply nya (Hanya bisa pilih satu) */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5 flex items-center gap-1.5">
          <Clock size={14} className="text-[#1F5B45]" />
          <span>Kapan Supply-nya (Pilih Satu) <span className="text-[#DC4C70]">*</span></span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {supplySchedules.map((sch) => (
            <button
              key={sch.value}
              type="button"
              onClick={() => onChange('supplySchedule', sch.value)}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                formData.supplySchedule === sch.value
                  ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-xs'
                  : 'bg-[#F8F4EC] text-[#1A2421] border-[#DED5C3] hover:border-[#1F5B45]/40'
              }`}
            >
              <p className="text-xs font-heading font-bold">{sch.label}</p>
              <p
                className={`text-[10px] font-body mt-0.5 truncate ${
                  formData.supplySchedule === sch.value ? 'text-white/80' : 'text-[#5C6F67]'
                }`}
              >
                {sch.sub}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Jangka waktu habis barang (Durasi Simpan) */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1A2421] mb-1.5 flex items-center gap-1.5">
          <Hourglass size={14} className="text-[#1F5B45]" />
          <span>Jangka Waktu Habis Barang <span className="text-[#DC4C70]">*</span></span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {shelfLifeOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange('shelfLife', opt.value)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                formData.shelfLife === opt.value
                  ? 'bg-[#1F5B45] text-white border-[#1F5B45] shadow-xs'
                  : 'bg-[#F8F4EC] text-[#1A2421] border-[#DED5C3] hover:border-[#1F5B45]/40'
              }`}
            >
              <p className="text-xs font-heading font-bold">{opt.label}</p>
              <p
                className={`text-[11px] font-body mt-0.5 ${
                  formData.shelfLife === opt.value ? 'text-white/80' : 'text-[#5C6F67]'
                }`}
              >
                {opt.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Input & Keterangan Khusus jika memilih 'Jangka Waktu Tertentu' */}
        {formData.shelfLife === 'Jangka Waktu Tertentu' && (
          <div className="mt-3 p-3 bg-white rounded-xl border border-[#DED5C3] space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="text-xs font-heading font-bold text-[#1A2421]">
                Batas Masa Simpan:
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={formData.customShelfLifeDays || 1}
                  onChange={(e) => onChange('customShelfLifeDays', Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl bg-[#F8F4EC] border border-[#DED5C3] text-xs font-heading font-bold text-[#1A2421] focus:outline-none focus:ring-2 focus:ring-[#1F5B45]/30 cursor-pointer"
                >
                  <option value={1}>1 Hari</option>
                  <option value={2}>2 Hari</option>
                  <option value={3}>3 Hari (Maksimal untuk Makanan)</option>
                  {!isFood && <option value={5}>5 Hari</option>}
                  {!isFood && <option value={7}>7 Hari (1 Minggu)</option>}
                  {!isFood && <option value={14}>14 Hari</option>}
                  {!isFood && <option value={30}>30 Hari (1 Bulan)</option>}
                </select>
                <span className="text-xs font-body text-[#5C6F67]">setelah waktu pembuatan</span>
              </div>
            </div>

            {/* Catatan khusus untuk barang makanan */}
            <div className="flex items-start gap-2 pt-1 text-[11px] font-body text-[#801A38] bg-[#FDF0F3] p-2 rounded-lg border border-[#DC4C70]/30">
              <AlertCircle size={15} className="text-[#DC4C70] flex-shrink-0 mt-0.5" />
              <p>
                <strong>Ketentuan Mutu Koperasi:</strong> Khusus barang kategori makanan (gorengan,
                jajanan basah, kue, buah), batas waktu simpan maksimal adalah <strong>3 hari</strong>{' '}
                guna menjamin kualitas konsumsi dan kesehatan karyawan.
              </p>
            </div>
          </div>
        )}

        {errors.shelfLife && (
          <p className="text-[11px] font-body text-[#DC4C70] mt-1">{errors.shelfLife}</p>
        )}
      </div>
    </Card>
  );
};
