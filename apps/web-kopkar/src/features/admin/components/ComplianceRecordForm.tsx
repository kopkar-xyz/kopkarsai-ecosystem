import React, { useState } from 'react';
import type { ComplianceRecord } from '../../../types/kopkarAdmin';

interface ComplianceRecordFormProps {
  onSubmit: (entityName: string, issue: string, severity: ComplianceRecord['severity']) => void;
}

export const ComplianceRecordForm: React.FC<ComplianceRecordFormProps> = ({ onSubmit }) => {
  const [entityName, setEntityName] = useState('');
  const [issue, setIssue] = useState('');
  const [severity, setSeverity] = useState<ComplianceRecord['severity']>('Teguran 1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entityName.trim() || !issue.trim()) return;
    onSubmit(entityName, issue, severity);
    setEntityName('');
    setIssue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-[#EAE4D3] p-5 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end shadow-xs"
    >
      <div>
        <label className="block text-[12px] text-[#526058] mb-1.5 font-medium">
          Nama Mitra / Produk
        </label>
        <input
          type="text"
          required
          value={entityName}
          onChange={(e) => setEntityName(e.target.value)}
          placeholder="Mis. Kedai Kopi Sahabat"
          className="w-full bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl px-3.5 py-2 text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#165239]"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-[12px] text-[#526058] mb-1.5 font-medium">
          Temuan Cacat Mutu / SLA
        </label>
        <input
          type="text"
          required
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Mis. Kemasan bocor atau keterlambatan kirim"
          className="w-full bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl px-3.5 py-2 text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#165239]"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value as ComplianceRecord['severity'])}
          className="flex-1 bg-[#FAF8F2] border border-[#EAE4D3] rounded-xl px-3 py-2 text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#165239]"
        >
          <option value="Teguran 1">Teguran Tertulis</option>
          <option value="Teguran 2">Teguran 2</option>
          <option value="Skorsing 7-30 Hari">Skorsing 7–30 Hari</option>
          <option value="Blacklist Produk">Blacklist Produk</option>
          <option value="Suspend">Blacklist Supplier</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-[#165239] hover:bg-[#12422E] text-white text-[13px] font-medium cursor-pointer shrink-0 transition-colors"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};
