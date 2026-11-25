import React, { useState } from 'react';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { GatewayShell } from '../components/layout/GatewayShell';
import { GatewayAuthCard } from '../components/auth/GatewayAuthCard';
import { RegisterKtpAndTerms } from '../components/auth/RegisterKtpAndTerms';
import { RegisterSuccessCard } from '../components/auth/RegisterSuccessCard';
import { useGatewayRouter } from '../router';
import { useDesignVersion } from '../context/DesignVersionContext';

const MAX_FILE_BYTES = 3 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const RegisterPage: React.FC = () => {
  const { navigate } = useGatewayRouter();
  const { version } = useDesignVersion();
  const isV2 = version === 'v2';
  const isV3 = version === 'v3';

  const [formData, setFormData] = useState({
    nik: '',
    fullName: '',
    division: 'Unit SAI B',
    whatsapp: '',
    email: '',
    agreed: false,
  });
  const [ktpFileName, setKtpFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError('Format berkas wajib JPEG, PNG, atau WebP.');
      setKtpFileName(null);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError('Ukuran berkas maksimal 3 MB.');
      setKtpFileName(null);
      return;
    }
    setFileError('');
    setKtpFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nik || !formData.fullName || !ktpFileName || !formData.agreed) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <GatewayShell>
        <div className="w-full max-w-2xl mx-auto space-y-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className={`inline-flex items-center gap-2 text-xs font-semibold rounded-full px-3.5 py-1.5 cursor-pointer transition-colors border ${
              isV2
                ? 'bg-white hover:bg-[#F3EDE0] border-[#EAE4D3] text-[#18221D]'
                : 'bg-white/85 backdrop-blur-sm border-pink-100 text-[#065C2B] hover:text-[#043D1D] shadow-sm'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Portal Gateway</span>
          </button>
          <RegisterSuccessCard nik={formData.nik} fullName={formData.fullName} />
        </div>
      </GatewayShell>
    );
  }

  return (
    <GatewayShell>
      <GatewayAuthCard
        title="Registrasi Mandiri Anggota Karyawan"
        subtitle="Formulir pendaftaran resmi Koperasi Karyawan PT SAI (KK-SCR-002)"
        maxWidthClass="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#18221D] mb-1.5">
                NIK Karyawan PT SAI *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: SAI-2024-001"
                value={formData.nik}
                onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-white text-xs text-[#18221D] focus:outline-none focus:border-[#165239]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#18221D] mb-1.5">
                Nama Lengkap Sesuai KTP *
              </label>
              <input
                type="text"
                required
                placeholder="Nama lengkap"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-white text-xs text-[#18221D] focus:outline-none focus:border-[#165239]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#18221D] mb-1.5">Unit / Divisi</label>
              <select
                value={formData.division}
                onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white text-xs text-[#18221D] focus:outline-none focus:border-[#165239]"
              >
                <option value="Unit SAI A">Unit SAI A</option>
                <option value="Unit SAI B">Unit SAI B</option>
                <option value="Produksi">Produksi</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="General Affairs">General Affairs</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#18221D] mb-1.5">WhatsApp</label>
              <input
                type="tel"
                placeholder="0812xxxx"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-white text-xs text-[#18221D] focus:outline-none focus:border-[#165239]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#18221D] mb-1.5">Email</label>
              <input
                type="email"
                placeholder="nama@ptsai.co.id"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-white text-xs text-[#18221D] focus:outline-none focus:border-[#165239]"
              />
            </div>
          </div>

          <RegisterKtpAndTerms
            ktpFileName={ktpFileName}
            fileError={fileError}
            agreed={formData.agreed}
            onFileChange={handleFileChange}
            onAgreedChange={(agreed) => setFormData({ ...formData, agreed })}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className={`text-xs font-semibold hover:underline cursor-pointer text-left ${
                isV3 ? 'text-[#111814]' : isV2 ? 'text-[#83273B]' : 'text-[#BD3A53]'
              }`}
            >
              Sudah punya akun? Login SSO
            </button>
            <button
              type="submit"
              className={`h-10 px-5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                isV3
                  ? 'bg-[#F5C02E] hover:bg-[#E5AE19] text-[#111814]'
                  : isV2
                  ? 'bg-[#83273B] hover:bg-[#650F26] text-white'
                  : 'bg-[#065C2B] hover:bg-[#043D1D] text-white font-bold shadow-sm'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Kirim Berkas Pendaftaran</span>
            </button>
          </div>
        </form>
      </GatewayAuthCard>
    </GatewayShell>
  );
};
