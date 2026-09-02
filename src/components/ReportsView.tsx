import React, { useState } from 'react';
import { FileText, Battery, Calendar, DollarSign, CheckCircle2, AlertCircle, Clock, ShieldAlert } from 'lucide-react';
import { PatientModel, MedicalEquipmentModel } from '../types';

interface ReportsViewProps {
  patients: PatientModel[];
  equipment: MedicalEquipmentModel[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ patients, equipment }) => {
  const [activeTab, setActiveTab] = useState<'avail' | 'alloc' | 'maint' | 'cost'>('avail');

  const totalCost = equipment.reduce((acc, eq) => acc + (eq.usageDurationHours * eq.hourlyRate), 0);
  const totalHours = equipment.reduce((acc, eq) => acc + eq.usageDurationHours, 0);

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Reports Navigation Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Hospital Operational Reports</h3>
            <p className="text-[11px] text-slate-400">Live Biomedical Telemetry & Resource Audit</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('avail')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'avail' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Availability
          </button>
          <button
            onClick={() => setActiveTab('alloc')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'alloc' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Patient Allocation
          </button>
          <button
            onClick={() => setActiveTab('maint')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'maint' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Maintenance Due
          </button>
          <button
            onClick={() => setActiveTab('cost')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'cost' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Cost Report
          </button>
        </div>
      </div>

      {/* Report Content Container */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* REPORT 1: EQUIPMENT AVAILABILITY */}
        {activeTab === 'avail' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-100 font-mono">REPORT 1: MEDICAL EQUIPMENT AVAILABILITY REPORT</h4>
                <p className="text-xs text-slate-400">Auditing operating condition, battery state of charge, calibration and ward compatibility.</p>
              </div>
              <span className="text-xs font-mono bg-slate-900 text-indigo-300 px-3 py-1 rounded border border-slate-800">
                Total Units: {equipment.length}
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900 text-slate-400 font-mono">
                  <tr>
                    <th className="py-2.5 px-3">Equip ID</th>
                    <th className="py-2.5 px-3">Equipment Type</th>
                    <th className="py-2.5 px-3">Operating Status</th>
                    <th className="py-2.5 px-3">Battery Level</th>
                    <th className="py-2.5 px-3">Calibration</th>
                    <th className="py-2.5 px-3">Availability</th>
                    <th className="py-2.5 px-3">Ward Compat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  {equipment.map(eq => (
                    <tr key={eq.resourceId} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-indigo-300">{eq.resourceId}</td>
                      <td className="py-3 px-3 font-sans text-slate-200">{eq.equipmentType}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          eq.operatingStatus === 'Operational' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40' :
                          eq.operatingStatus === 'Allocated' ? 'bg-sky-950/80 text-sky-300 border border-sky-800/40' :
                          'bg-amber-950/80 text-amber-300 border border-amber-800/40'
                        }`}>
                          {eq.operatingStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <Battery className={`w-3.5 h-3.5 ${eq.battery.batteryLevel < 20 ? 'text-rose-400' : 'text-emerald-400'}`} />
                          <span className={eq.battery.batteryLevel < 20 ? 'text-rose-400 font-bold' : ''}>
                            {eq.battery.batteryLevel}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          eq.maintenance.calibrationValid ? 'text-emerald-400 bg-emerald-950/40' : 'text-rose-400 bg-rose-950/40 font-bold'
                        }`}>
                          {eq.maintenance.calibrationValid ? 'VALID' : 'EXPIRED'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`font-semibold ${eq.isAvailable ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {eq.isAvailable ? 'AVAILABLE' : 'IN USE'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">{eq.compatibleWard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REPORT 2: PATIENT ALLOCATION */}
        {activeTab === 'alloc' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-100 font-mono">REPORT 2: PATIENT ALLOCATION & CLINICAL TRIAGE</h4>
                <p className="text-xs text-slate-400">Admitted patient roster, risk priority scoring and attached biomedical units.</p>
              </div>
              <span className="text-xs font-mono bg-slate-900 text-indigo-300 px-3 py-1 rounded border border-slate-800">
                Patients: {patients.length}
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900 text-slate-400 font-mono">
                  <tr>
                    <th className="py-2.5 px-3">Patient ID</th>
                    <th className="py-2.5 px-3">Patient Name</th>
                    <th className="py-2.5 px-3">Ward</th>
                    <th className="py-2.5 px-3">Risk Category</th>
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3">Allocated Unit</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  {patients.map(p => (
                    <tr key={p.patientId} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-indigo-300">{p.patientId}</td>
                      <td className="py-3 px-3 font-sans text-slate-200 font-medium">{p.patientName}</td>
                      <td className="py-3 px-3">{p.ward}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          p.riskCategory === 'Critical' ? 'bg-rose-950/80 text-rose-300 border border-rose-800/40 font-bold' :
                          p.riskCategory === 'High' ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40' :
                          'bg-slate-800 text-slate-300'
                        }`}>
                          {p.riskCategory}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-indigo-400">P{p.clinicalPriority}</td>
                      <td className="py-3 px-3 text-cyan-300">{p.allocatedEquipmentId}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          p.allocationStatus === 'Allocated' ? 'text-emerald-400 bg-emerald-950/50' : 'text-slate-400 bg-slate-800/50'
                        }`}>
                          {p.allocationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REPORT 3: MAINTENANCE DUE */}
        {activeTab === 'maint' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-100 font-mono">REPORT 3: PREVENTIVE MAINTENANCE & CALIBRATION DUE</h4>
                <p className="text-xs text-slate-400">Scheduled service deadlines and biomedical safety checks.</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900 text-slate-400 font-mono">
                  <tr>
                    <th className="py-2.5 px-3">Equip ID</th>
                    <th className="py-2.5 px-3">Equipment Type</th>
                    <th className="py-2.5 px-3">Last Serviced</th>
                    <th className="py-2.5 px-3">Next Due Date</th>
                    <th className="py-2.5 px-3">Calibration Status</th>
                    <th className="py-2.5 px-3">Maintenance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  {equipment.map(eq => (
                    <tr key={eq.resourceId} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-indigo-300">{eq.resourceId}</td>
                      <td className="py-3 px-3 font-sans text-slate-200">{eq.equipmentType}</td>
                      <td className="py-3 px-3 text-slate-400">{eq.maintenance.lastServiceDate}</td>
                      <td className="py-3 px-3 text-slate-300">{eq.maintenance.nextServiceDueDate}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          eq.maintenance.calibrationValid ? 'text-emerald-400 bg-emerald-950/40' : 'text-rose-400 bg-rose-950/40 font-bold'
                        }`}>
                          {eq.maintenance.calibrationValid ? 'VALID' : 'ATTN REQUIRED'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300">{eq.maintenance.maintenanceStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REPORT 4: EQUIPMENT COST REPORT */}
        {activeTab === 'cost' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-100 font-mono">REPORT 4: MEDICAL EQUIPMENT USAGE & COST ACCRUAL</h4>
                <p className="text-xs text-slate-400">Total active operational hours and financial billing breakdown.</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900 text-slate-400 font-mono">
                  <tr>
                    <th className="py-2.5 px-3">Equip ID</th>
                    <th className="py-2.5 px-3">Equipment Type</th>
                    <th className="py-2.5 px-3">Hourly Rate</th>
                    <th className="py-2.5 px-3">Total Usage Hours</th>
                    <th className="py-2.5 px-3 text-right">Accrued Cost (Rs.)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  {equipment.map(eq => {
                    const cost = eq.usageDurationHours * eq.hourlyRate;
                    return (
                      <tr key={eq.resourceId} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-indigo-300">{eq.resourceId}</td>
                        <td className="py-3 px-3 font-sans text-slate-200">{eq.equipmentType}</td>
                        <td className="py-3 px-3">Rs.{eq.hourlyRate.toFixed(2)}/hr</td>
                        <td className="py-3 px-3">{eq.usageDurationHours.toFixed(1)} hrs</td>
                        <td className="py-3 px-3 text-right font-semibold text-emerald-400">Rs.{cost.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-900 font-mono text-slate-200 font-bold border-t border-slate-700">
                  <tr>
                    <td colSpan={3} className="py-3 px-3 text-indigo-300">GRAND TOTALS:</td>
                    <td className="py-3 px-3 text-slate-200">{totalHours.toFixed(1)} Total Hrs</td>
                    <td className="py-3 px-3 text-right text-emerald-400 text-sm">Rs.{totalCost.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
