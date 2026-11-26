import React, { useState } from 'react';
import { useKopkarRole } from '../app/auth/RoleContext';
import { ComplianceKpiCards } from '../features/admin/components/ComplianceKpiCards';
import { ComplianceRecordForm } from '../features/admin/components/ComplianceRecordForm';
import { ComplianceRecordList } from '../features/admin/components/ComplianceRecordList';
import { ComplianceSanctionPanel } from '../features/admin/components/ComplianceSanctionPanel';
import { INITIAL_COMPLIANCE } from '../features/admin/data/adminMockData';
import type { ComplianceRecord } from '../types/kopkarAdmin';

export const SupplierMonitoringView: React.FC = () => {
  const { currentUser } = useKopkarRole();
  const isReadOnly = currentUser.role === 'KEPALA_KOPERASI';
  const [records, setRecords] = useState<ComplianceRecord[]>(INITIAL_COMPLIANCE);
  const [activeTab, setActiveTab] = useState<'defect' | 'inactivity'>('defect');
  const [selectedId, setSelectedId] = useState<string>(INITIAL_COMPLIANCE[0]?.id ?? '');
  const [showForm, setShowForm] = useState(false);

  const defectRecords = records.filter((r) => !r.inactiveDays);
  const inactivityRecords = records.filter((r) => typeof r.inactiveDays === 'number');

  const displayedRecords = activeTab === 'defect' ? defectRecords : inactivityRecords;
  const activeRecord = records.find((r) => r.id === selectedId) ?? displayedRecords[0] ?? records[0];

  const handleCreateRecord = (
    entityName: string,
    issue: string,
    severity: ComplianceRecord['severity']
  ) => {
    const newRecord: ComplianceRecord = {
      id: `MON-${Date.now()}`,
      ticketId: `DEF-2026-${Math.floor(100 + Math.random() * 900)}`,
      entityName,
      entityType: 'Mitra Supplier',
      departmentOrUnit: 'Gerai Koperasi',
      issue,
      severity,
      slaScore: 85,
      date: '24 Nov 2026',
    };
    setRecords((prev) => [newRecord, ...prev]);
    setSelectedId(newRecord.id);
    setShowForm(false);
  };

  const handleApplySanction = (id: string, severity: ComplianceRecord['severity']) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, severity } : r))
    );
  };

  return (
    <div className="space-y-5 animate-fadeIn select-none">
      {/* 1. 4 Kartu KPI Ringkasan */}
      <ComplianceKpiCards
        defectActiveCount={defectRecords.filter((r) => r.severity !== 'Normal').length}
        inactivityCount={inactivityRecords.filter((r) => (r.inactiveDays ?? 0) >= 23).length}
        showForm={showForm}
        isReadOnly={isReadOnly}
        onToggleForm={() => setShowForm((v) => !v)}
      />

      {/* 2. Formulir Temuan Baru (Toggleable) */}
      {!isReadOnly && showForm && <ComplianceRecordForm onSubmit={handleCreateRecord} />}

      {/* 3. Master-Detail Workspace: Daftar Tiket & Panel Sanksi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-6">
          <ComplianceRecordList
            records={displayedRecords}
            activeTab={activeTab}
            selectedId={activeRecord?.id ?? ''}
            defectCount={defectRecords.length}
            inactivityCount={inactivityRecords.length}
            onTabChange={setActiveTab}
            onSelect={(rec) => setSelectedId(rec.id)}
          />
        </div>
        <div className="lg:col-span-6">
          {activeRecord && (
            <ComplianceSanctionPanel
              record={activeRecord}
              isReadOnly={isReadOnly}
              onApplySanction={handleApplySanction}
            />
          )}
        </div>
      </div>
    </div>
  );
};
