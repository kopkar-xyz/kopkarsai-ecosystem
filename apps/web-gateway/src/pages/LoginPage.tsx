import React, { useState } from 'react';
import { ArrowRight, Lock, LogIn, ShieldAlert } from 'lucide-react';
import { GatewayShell } from '../components/layout/GatewayShell';
import { GatewayAuthCard } from '../components/auth/GatewayAuthCard';
import {
  LoginRoleSelector,
  ROLE_OPTIONS,
  type RoleType,
} from '../components/auth/LoginRoleSelector';
import { useGatewayRouter } from '../router';
import { useDesignVersion } from '../context/DesignVersionContext';

type TargetApp = 'kopkar' | 'marketplace';

export const LoginPage: React.FC = () => {
  const { navigate } = useGatewayRouter();
  const { version } = useDesignVersion();
  const isV2 = version === 'v2';
  const isV3 = version === 'v3';

  const [selectedRole, setSelectedRole] = useState<RoleType>('ANGGOTA');
  const [targetApp, setTargetApp] = useState<TargetApp>('kopkar');
  const [nik, setNik] = useState('SAI-2024-001');
  const [password, setPassword] = useState('••••••••');
  const [showBlockedAlert, setShowBlockedAlert] = useState(false);

  const kopkarUrl = import.meta.env.VITE_KOPKARSAI_SYSTEM_URL || 'http://localhost:5173';
  const marketplaceUrl = import.meta.env.VITE_KOPKARSAI_MARKETPLACE_URL || 'http://localhost:5174';

  const handleRoleChange = (role: RoleType) => {
    setSelectedRole(role);
    setShowBlockedAlert(false);
    const matched = ROLE_OPTIONS.find((r) => r.id === role);
    if (matched) setNik(matched.sampleNik);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'PENDING_USER') {
      setShowBlockedAlert(true);
      return;
    }
    if (targetApp === 'marketplace') {
      window.location.href = marketplaceUrl;
      return;
    }
    const hashByRole: Record<Exclude<RoleType, 'PENDING_USER'>, string> = {
      ANGGOTA: '#/',
      ADMIN_TOKO: '#/admin/verification',
      KEPALA_KOPERASI: '#/admin/approval',
      SUPPLIER: '#/products',
    };
    window.location.href = `${kopkarUrl}/${hashByRole[selectedRole]}`;
  };

  return (
    <GatewayShell>
      <GatewayAuthCard
        title="Login SSO Terpadu"
        subtitle="Satu identitas NIK untuk Sistem Koperasi & Marketplace PT SAI"
        maxWidthClass="max-w-md"
        centeredHeader
      >
        <LoginRoleSelector selectedRole={selectedRole} onSelectRole={handleRoleChange} />

        {showBlockedAlert && (
          <div className="p-3.5 rounded-2xl bg-[#FDF2F4] border border-[#DC4C70]/35 text-xs space-y-1.5 text-[#B3261E]">
            <div className="flex items-center gap-2 font-bold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Akses Login Ditolak (Bypass Terkunci)</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Sesuai kebijakan <strong>KK-DEC-001</strong>, akun berstatus{' '}
              <code className="bg-white px-1 py-0.5 rounded font-mono">
                PENDING_ADMIN_VERIFICATION
              </code>{' '}
              belum dapat login sebelum lolos verifikasi Admin Toko &amp; Kepala Koperasi.
            </p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#18221D] mb-1.5">
              NIK Karyawan
            </label>
            <input
              type="text"
              required
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-white text-xs text-[#18221D] focus:outline-none focus:border-[#165239] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#18221D] mb-1.5">
              Password / PIN
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 px-3.5 pr-10 rounded-xl border border-stone-200 bg-white text-xs text-[#18221D] focus:outline-none focus:border-[#165239] transition-colors"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <span className="block text-xs font-semibold text-[#18221D] mb-1.5">
              Tujuan Portal Setelah Masuk
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: 'kopkar', label: 'KopKar Portal' },
                  { id: 'marketplace', label: 'Marketplace' },
                ] as const
              ).map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => setTargetApp(app.id)}
                  className={`h-9 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${
                    targetApp === app.id
                      ? isV3
                        ? 'bg-[#FEF6DC] border-[#F5C02E] text-[#111814]'
                        : isV2
                        ? 'bg-[#FDF0F3] border-[#83273B] text-[#83273B]'
                        : 'bg-[#EAF4EE] border-[#165239] text-[#165239]'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {app.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full h-10 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              isV3
                ? 'bg-[#F5C02E] hover:bg-[#E5AE19] text-[#111814]'
                : isV2
                ? 'bg-[#83273B] hover:bg-[#650F26] text-white'
                : 'bg-[#065C2B] hover:bg-[#043D1D] text-white font-bold shadow-sm'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk Sebagai {selectedRole.replace('_', ' ')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div
          className={`pt-2 border-t text-center text-xs ${
            isV3 ? 'border-[#E5E7EB] text-[#6B7280]' : isV2 ? 'border-[#F3EDE0] text-[#665E60]' : 'border-pink-100 text-[#4A5D52]'
          }`}
        >
          Belum terdaftar sebagai anggota?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className={`font-semibold hover:underline cursor-pointer ${
              isV3 ? 'text-[#111814]' : isV2 ? 'text-[#83273B]' : 'font-bold text-[#BD3A53]'
            }`}
          >
            Registrasi Mandiri
          </button>
        </div>
      </GatewayAuthCard>
    </GatewayShell>
  );
};
