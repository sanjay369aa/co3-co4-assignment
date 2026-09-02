import React from 'react';
import { Layers, Shield, Cpu, Database, CheckCircle2, GitFork, ArrowDown, Box } from 'lucide-react';
import { ACADEMIC_DOC } from '../data/academicDoc';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6 overflow-y-auto h-full pr-1">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 p-5 rounded-xl border border-indigo-800/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">C++ Object-Oriented Architecture</h2>
            <p className="text-xs text-slate-400">
              Demonstrating Hybrid Inheritance, Virtual Base Classes (Diamond Problem Resolution), Composition, and Polymorphism.
            </p>
          </div>
        </div>
      </div>

      {/* DIAMOND PROBLEM & HYBRID INHERITANCE VISUAL CARD */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-lg">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-semibold text-slate-100 font-mono">Task 5: Virtual Base Class & Diamond Problem Resolution</h3>
          </div>
          <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2.5 py-0.5 rounded-full font-mono">
            Ambiguity Resolved (Single Subobject)
          </span>
        </div>

        {/* Text Diagram Box */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 font-mono text-xs text-indigo-200 overflow-x-auto">
          <pre className="text-[11px] leading-relaxed text-slate-300">
            {ACADEMIC_DOC.classDiagramText}
          </pre>
        </div>

        <div className="mt-4 p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
          <p className="font-semibold text-indigo-300 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" /> Why Virtual Inheritance is Essential here:
          </p>
          <p className="text-slate-400 leading-relaxed">
            In standard multiple inheritance, <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">CriticalVentilator</code> would inherit <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">ResourceIdentity</code> twice: once via <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">Ventilator &rarr; MedicalEquipment &rarr; HospitalResource</code>, and once via <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">CriticalCare</code>. This creates ambiguity when accessing <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">resourceId</code>.
          </p>
          <p className="text-slate-400 leading-relaxed">
            By declaring <code className="text-emerald-400 bg-slate-800 px-1.5 py-0.5 rounded">virtual public ResourceIdentity</code>, C++ ensures only ONE unified <code className="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded">ResourceIdentity</code> subobject is constructed by the most-derived class, eliminating duplicate storage and runtime member ambiguity.
          </p>
        </div>
      </div>

      {/* COMPOSITION & MEMBER CLASSES (TASK 6) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-semibold text-slate-100 font-mono">Task 6: Member Object (BatteryModule)</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Composed as a direct member object inside <code className="text-cyan-300 font-mono">MedicalEquipment</code>. Encapsulates 0-100% capacity monitoring, charging states, and runtime hours estimations.
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300">
              class MedicalEquipment &#123;<br/>
              &nbsp;&nbsp;BatteryModule battery;<br/>
              &nbsp;&nbsp;MaintenanceModule maintenance;<br/>
              &#125;;
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Initializer List Binding</span>
            <span className="text-emerald-400 font-medium">Constructed Before Enclosing Body</span>
          </div>
        </div>

        <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-semibold text-slate-100 font-mono">Task 1 & 2: Dynamic Heap Memory (new[] / delete[])</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              <code className="text-amber-300 font-mono">ServiceRecord* serviceHistory</code> is managed on the dynamic heap. The copy constructor executes an element-by-element DEEP COPY to prevent pointer aliasing.
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-amber-300">
              this-&gt;serviceHistory = new ServiceRecord[capacity];<br/>
              for(int i=0; i&lt;count; ++i) &#123; ... &#125; // Deep copy<br/>
              ~MedicalEquipment() &#123; delete[] serviceHistory; &#125;
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Memory Leak Protection</span>
            <span className="text-emerald-400 font-medium">RAII & Safe Destructor</span>
          </div>
        </div>
      </div>

      {/* TASK-BY-TASK ACADEMIC MAPPING TABLE */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-lg">
        <h3 className="text-sm font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          DSA01 CO3 & CO4 Task Compliance Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Task ID & Concept</th>
                <th className="py-2.5 px-3">C++ Mechanism</th>
                <th className="py-2.5 px-3">Verification Location</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {ACADEMIC_DOC.taskMapping.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-200">
                    {t.task}
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">
                    {t.description}
                  </td>
                  <td className="py-3 px-3 text-indigo-300 font-mono text-[11px]">
                    {t.verification}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      <CheckCircle2 className="w-3 h-3" /> PASS
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
