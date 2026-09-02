import React, { useState } from 'react';
import { 
  Terminal, FileCode2, Layers, FileText, BookOpen, 
  HeartPulse, ShieldCheck, Activity, Cpu, CheckCircle2, Download
} from 'lucide-react';
import { TerminalView } from './components/TerminalView';
import { CodeViewer } from './components/CodeViewer';
import { ArchitectureView } from './components/ArchitectureView';
import { ReportsView } from './components/ReportsView';
import { AcademicDocView } from './components/AcademicDocView';
import { PatientModel, MedicalEquipmentModel } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'code' | 'arch' | 'reports' | 'docs'>('terminal');

  // Initial Sample Clinical Dataset matching main.cpp
  const [patients, setPatients] = useState<PatientModel[]>([
    { patientId: 'P101', patientName: 'Rajesh Sharma', age: 62, ward: 'ICU', riskCategory: 'Critical', clinicalPriority: 1, allocatedEquipmentId: 'NONE', allocationStatus: 'Unallocated' },
    { patientId: 'P102', patientName: 'Ananya Verma', age: 34, ward: 'Emergency', riskCategory: 'High', clinicalPriority: 2, allocatedEquipmentId: 'NONE', allocationStatus: 'Unallocated' },
    { patientId: 'P103', patientName: 'Vikram Malhotra', age: 48, ward: 'General', riskCategory: 'Medium', clinicalPriority: 3, allocatedEquipmentId: 'NONE', allocationStatus: 'Unallocated' },
    { patientId: 'P104', patientName: 'Sunita Patil', age: 71, ward: 'ICU', riskCategory: 'Critical', clinicalPriority: 1, allocatedEquipmentId: 'NONE', allocationStatus: 'Unallocated' },
    { patientId: 'P105', patientName: 'Devendra Sen', age: 28, ward: 'General', riskCategory: 'Low', clinicalPriority: 4, allocatedEquipmentId: 'NONE', allocationStatus: 'Unallocated' }
  ]);

  const [equipment, setEquipment] = useState<MedicalEquipmentModel[]>([
    {
      resourceId: 'MON-101',
      modelNumber: 'IntelliVue-MX700',
      manufacturer: 'Philips Healthcare',
      equipmentType: 'Patient Monitor',
      operatingStatus: 'Operational',
      isAvailable: true,
      usageDurationHours: 14.5,
      hourlyRate: 150.0,
      allocatedPatientId: 'NONE',
      compatibleWard: 'All',
      battery: { batteryLevel: 95, isCharging: false, backupDurationHours: 7.6 },
      maintenance: { lastServiceDate: '2026-01-10', nextServiceDueDate: '2026-07-10', calibrationValid: true, maintenanceStatus: 'Operational' },
      serviceHistory: [{ serviceDate: '2026-01-10', engineerName: 'Eng. S. Kulkarni', actionTaken: 'Sensor recalibration', serviceCost: 1200.0 }],
      ecgChannels: 8
    },
    {
      resourceId: 'PUMP-101',
      modelNumber: 'Perfusor-Space',
      manufacturer: 'B. Braun',
      equipmentType: 'Infusion Pump',
      operatingStatus: 'Operational',
      isAvailable: true,
      usageDurationHours: 22.0,
      hourlyRate: 95.0,
      allocatedPatientId: 'NONE',
      compatibleWard: 'All',
      battery: { batteryLevel: 88, isCharging: false, backupDurationHours: 7.0 },
      maintenance: { lastServiceDate: '2026-02-01', nextServiceDueDate: '2026-08-01', calibrationValid: true, maintenanceStatus: 'Operational' },
      serviceHistory: [{ serviceDate: '2026-02-01', engineerName: 'Eng. M. Joshi', actionTaken: 'Drive motor lubrication', serviceCost: 850.0 }],
      flowRateMlPerHour: 30.0
    },
    {
      resourceId: 'VENT-101',
      modelNumber: 'Puritan-Bennett-980',
      manufacturer: 'Medtronic',
      equipmentType: 'Ventilator',
      operatingStatus: 'Operational',
      isAvailable: true,
      usageDurationHours: 38.0,
      hourlyRate: 400.0,
      allocatedPatientId: 'NONE',
      compatibleWard: 'ICU',
      battery: { batteryLevel: 92, isCharging: false, backupDurationHours: 7.3 },
      maintenance: { lastServiceDate: '2026-01-20', nextServiceDueDate: '2026-07-20', calibrationValid: true, maintenanceStatus: 'Operational' },
      serviceHistory: [{ serviceDate: '2026-01-20', engineerName: 'Eng. R. Gupta', actionTaken: 'Filter replacement & O2 cell test', serviceCost: 2500.0 }],
      fio2Percentage: 50.0,
      peepPressureCmH2O: 8.0
    },
    {
      resourceId: 'CVENT-101',
      modelNumber: 'Hamilton-G5 Titanium',
      manufacturer: 'Hamilton Medical',
      equipmentType: 'Critical Ventilator',
      operatingStatus: 'Operational',
      isAvailable: true,
      usageDurationHours: 54.0,
      hourlyRate: 600.0,
      allocatedPatientId: 'NONE',
      compatibleWard: 'ICU',
      battery: { batteryLevel: 100, isCharging: true, backupDurationHours: 8.0 },
      maintenance: { lastServiceDate: '2026-02-15', nextServiceDueDate: '2026-08-15', calibrationValid: true, maintenanceStatus: 'Operational' },
      serviceHistory: [{ serviceDate: '2026-02-15', engineerName: 'Eng. A. Nair', actionTaken: 'Dual valve calibration & firmware 4.2', serviceCost: 4200.0 }],
      icuCertificationLevel: 'Level 3 Super-ICU',
      dualOxygenBackupAvailable: true
    },
    {
      resourceId: 'VENT-102',
      modelNumber: 'Servo-I Critical',
      manufacturer: 'Maquet',
      equipmentType: 'Ventilator',
      operatingStatus: 'Operational',
      isAvailable: true,
      usageDurationHours: 8.0,
      hourlyRate: 380.0,
      allocatedPatientId: 'NONE',
      compatibleWard: 'ICU',
      battery: { batteryLevel: 12, isCharging: false, backupDurationHours: 0.9 }, // Low battery boundary test
      maintenance: { lastServiceDate: '2026-01-05', nextServiceDueDate: '2026-07-05', calibrationValid: true, maintenanceStatus: 'Operational' },
      serviceHistory: [{ serviceDate: '2026-01-05', engineerName: 'Eng. S. Roy', actionTaken: 'Expiratory cassette check', serviceCost: 1100.0 }],
      fio2Percentage: 40.0,
      peepPressureCmH2O: 6.0
    },
    {
      resourceId: 'MON-102',
      modelNumber: 'Dash-4000',
      manufacturer: 'GE Healthcare',
      equipmentType: 'Patient Monitor',
      operatingStatus: 'Operational',
      isAvailable: true,
      usageDurationHours: 5.0,
      hourlyRate: 130.0,
      allocatedPatientId: 'NONE',
      compatibleWard: 'General',
      battery: { batteryLevel: 80, isCharging: false, backupDurationHours: 6.4 },
      maintenance: { lastServiceDate: '2025-06-10', nextServiceDueDate: '2025-12-10', calibrationValid: false, maintenanceStatus: 'Maintenance Required' }, // Expired calibration invalid test
      serviceHistory: [{ serviceDate: '2025-06-10', engineerName: 'Eng. P. Sen', actionTaken: 'Annual safety audit', serviceCost: 800.0 }],
      ecgChannels: 5
    }
  ]);

  const allocatedCount = equipment.filter(e => !e.isAvailable).length;
  const availableCount = equipment.filter(e => e.isAvailable && e.operatingStatus === 'Operational' && e.maintenance.calibrationValid).length;

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 font-sans select-none overflow-hidden">
      {/* Top Application Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-5 py-3 shrink-0 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shadow-inner">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-100 tracking-tight">
                SMART HOSPITAL PATIENT & MEDICAL EQUIPMENT SYSTEM
              </h1>
              <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800/60 px-2 py-0.5 rounded font-semibold">
                DSA01 CO3 & CO4
              </span>
            </div>
            <p className="text-xs text-slate-400">
              C++17 Object-Oriented Project | Virtual Base Class • Diamond Problem • Dynamic Deep Copy • Polymorphism
            </p>
          </div>
        </div>

        {/* System Metric Badges */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Patients:</span>
            <span className="font-bold text-slate-200">{patients.length}</span>
          </div>

          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Ready Units:</span>
            <span className="font-bold text-emerald-400">{availableCount}</span>
          </div>

          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Active Alloc:</span>
            <span className="font-bold text-amber-400">{allocatedCount}</span>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <nav className="bg-slate-900/60 border-b border-slate-800 px-5 flex items-center gap-1 shrink-0 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-all ${
            activeTab === 'terminal' 
              ? 'border-indigo-500 text-indigo-300 bg-slate-800/50 font-semibold' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Terminal className="w-4 h-4" />
          Interactive Terminal (Menu 1-17)
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-all ${
            activeTab === 'code' 
              ? 'border-indigo-500 text-indigo-300 bg-slate-800/50 font-semibold' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <FileCode2 className="w-4 h-4" />
          C++ Source Code (main.cpp)
        </button>

        <button
          onClick={() => setActiveTab('arch')}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-all ${
            activeTab === 'arch' 
              ? 'border-indigo-500 text-indigo-300 bg-slate-800/50 font-semibold' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <Layers className="w-4 h-4" />
          Architecture & Diamond Hierarchy
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-all ${
            activeTab === 'reports' 
              ? 'border-indigo-500 text-indigo-300 bg-slate-800/50 font-semibold' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <FileText className="w-4 h-4" />
          Live 4-Report Suite
        </button>

        <button
          onClick={() => setActiveTab('docs')}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-all ${
            activeTab === 'docs' 
              ? 'border-indigo-500 text-indigo-300 bg-slate-800/50 font-semibold' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Academic Submission & SDG
        </button>
      </nav>

      {/* Main Workspace Area */}
      <main className="flex-1 p-4 overflow-hidden">
        {activeTab === 'terminal' && (
          <TerminalView 
            patients={patients} 
            setPatients={setPatients} 
            equipment={equipment} 
            setEquipment={setEquipment} 
          />
        )}
        {activeTab === 'code' && <CodeViewer />}
        {activeTab === 'arch' && <ArchitectureView />}
        {activeTab === 'reports' && <ReportsView patients={patients} equipment={equipment} />}
        {activeTab === 'docs' && <AcademicDocView />}
      </main>
    </div>
  );
}
