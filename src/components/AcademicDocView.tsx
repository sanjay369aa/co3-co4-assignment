import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle2, ShieldCheck, HeartPulse, Globe2, FileText, Code2 } from 'lucide-react';
import { ACADEMIC_DOC } from '../data/academicDoc';

export const AcademicDocView: React.FC = () => {
  const [subTab, setSubTab] = useState<'classes' | 'pseudo' | 'tests' | 'reflection' | 'sdg'>('classes');

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Top Academic Sub-navigation */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Academic Project Documentation</h3>
            <p className="text-[11px] text-slate-400">DSA01 Object-Oriented Programming (CO3 & CO4)</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setSubTab('classes')}
            className={`px-3 py-1 rounded transition-colors ${
              subTab === 'classes' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Class Glossary
          </button>
          <button
            onClick={() => setSubTab('pseudo')}
            className={`px-3 py-1 rounded transition-colors ${
              subTab === 'pseudo' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pseudocode
          </button>
          <button
            onClick={() => setSubTab('tests')}
            className={`px-3 py-1 rounded transition-colors ${
              subTab === 'tests' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Test Cases
          </button>
          <button
            onClick={() => setSubTab('reflection')}
            className={`px-3 py-1 rounded transition-colors ${
              subTab === 'reflection' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Academic Reflection
          </button>
          <button
            onClick={() => setSubTab('sdg')}
            className={`px-3 py-1 rounded transition-colors ${
              subTab === 'sdg' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            UN SDG Impact
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* SUBTAB 1: CLASS EXPLANATIONS */}
        {subTab === 'classes' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-100 font-mono">SECTION D: EXPLANATION OF EVERY CLASS</h4>
              <p className="text-xs text-slate-400">Detailed functional roles and OOP design decisions for each class entity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACADEMIC_DOC.classExplanations.map((cls, idx) => (
                <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-bold text-indigo-300">{cls.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                        {cls.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {cls.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 2: PSEUDOCODE */}
        {subTab === 'pseudo' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-100 font-mono">SECTION B: PSEUDOCODE SPECIFICATION</h4>
              <p className="text-xs text-slate-400">High-level procedural logic for the 10-point Smart Allocation algorithm and main driver loop.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto select-text">
              <pre className="leading-relaxed">
                {ACADEMIC_DOC.pseudocode}
              </pre>
            </div>
          </div>
        )}

        {/* SUBTAB 3: TEST CASES */}
        {subTab === 'tests' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-100 font-mono">SECTIONS G, H, I: COMPREHENSIVE TEST SUITE ANALYSIS</h4>
              <p className="text-xs text-slate-400">Formal test scenarios demonstrating verification of normal conditions, boundary states, and invalid requests.</p>
            </div>

            <div className="space-y-3">
              {/* Normal Test */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> TEST CASE 1: NORMAL ALLOCATION SCENARIO
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    EXPECTED: PASS
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-2">
                  <strong>Input:</strong> Allocate 'Ventilator' to Patient P101 (Rajesh Sharma, ICU Ward, Priority 1 Critical). Available unit: VENT-101 (100% battery, valid calibration).
                </p>
                <div className="bg-slate-950 p-2.5 rounded font-mono text-[11px] text-emerald-300 border border-slate-800">
                  &gt;&gt; Result: PASS. Patient allocated to VENT-101. Operating status switched to 'Allocated'.
                </div>
              </div>

              {/* Boundary Test */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> TEST CASE 2: BOUNDARY TEST (Battery Minimum Safety Threshold)
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    EXPECTED: REJECT / PASS
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-2">
                  <strong>Input:</strong> Critical Priority P1 patient requires life-support. Only remaining candidate has 12% battery (Safety threshold requires &ge; 30% for Critical).
                </p>
                <div className="bg-slate-950 p-2.5 rounded font-mono text-[11px] text-amber-300 border border-slate-800">
                  &gt;&gt; Result: PASS. Allocation rejected with explicit reason: "Equipment battery level (12%) is below required threshold (30%)."
                </div>
              </div>

              {/* Invalid Tests */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> TEST CASE 3: INVALID INPUT & SAFETY REJECTIONS
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    EXPECTED: SAFETY TRIPPED
                  </span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
                  <li><strong>Non-Existent Patient ID:</strong> Rejects ID 'P999' with informative error message without program crash.</li>
                  <li><strong>Expired Calibration:</strong> Blocks MON-102 (calibration expired) from allocation to prevent clinical misdiagnosis.</li>
                  <li><strong>Double Allocation:</strong> Prevents an already allocated patient or in-use equipment from being duplicated.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: REFLECTION */}
        {subTab === 'reflection' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-100 font-mono">SECTION K: ACADEMIC PROJECT REFLECTION</h4>
              <p className="text-xs text-slate-400">Architectural analysis, memory safety guarantees, and engineering takeaways.</p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 text-xs text-slate-300 font-sans space-y-4 leading-relaxed">
              <div className="p-3 bg-indigo-950/40 rounded-lg border border-indigo-800/40">
                <h5 className="font-bold text-indigo-300 mb-1 text-xs">1. Class Architecture & Cohesion</h5>
                <p className="text-slate-300">
                  The choice to separate asset identification (<code className="text-indigo-300">ResourceIdentity</code>), abstract clinical interfaces (<code className="text-indigo-300">HospitalResource</code>), modular hardware telemetry (<code className="text-indigo-300">BatteryModule</code>, <code className="text-indigo-300">MaintenanceModule</code>), and concrete devices (<code className="text-indigo-300">Ventilator</code>, <code className="text-indigo-300">CriticalVentilator</code>) ensures each class has a single, well-defined responsibility.
                </p>
              </div>

              <div className="p-3 bg-indigo-950/40 rounded-lg border border-indigo-800/40">
                <h5 className="font-bold text-indigo-300 mb-1 text-xs">2. Diamond Problem Resolution via Virtual Inheritance</h5>
                <p className="text-slate-300">
                  Hybrid multiple inheritance in <code className="text-indigo-300">CriticalVentilator</code> would create duplicated <code className="text-indigo-300">ResourceIdentity</code> instances under standard inheritance. Using <code className="text-emerald-400">virtual public ResourceIdentity</code> instructs the compiler to share a single subobject, resolving runtime data ambiguity and ensuring memory efficiency.
                </p>
              </div>

              <div className="p-3 bg-indigo-950/40 rounded-lg border border-indigo-800/40">
                <h5 className="font-bold text-indigo-300 mb-1 text-xs">3. Dynamic Memory Safety & Deep Copy</h5>
                <p className="text-slate-300">
                  To prevent double-deletion and pointer aliasing when managing dynamically allocated <code className="text-indigo-300">ServiceRecord*</code> arrays, an explicit deep-copy Copy Constructor and Assignment Operator allocate isolated heap blocks and copy records individually. Destructors safely call <code className="text-amber-400">delete[]</code> to eliminate memory leaks.
                </p>
              </div>

              <div className="p-3 bg-indigo-950/40 rounded-lg border border-indigo-800/40">
                <h5 className="font-bold text-indigo-300 mb-1 text-xs">4. Clinical Patient Safety</h5>
                <p className="text-slate-300">
                  The automated 10-point allocation protocol ensures that patients in respiratory distress are never assigned uncalibrated devices, discharged batteries, or incompatible hardware.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: SDG RELEVANCE */}
        {subTab === 'sdg' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-100 font-mono">SECTION L: UN SUSTAINABLE DEVELOPMENT GOALS (SDG) ALIGNMENT</h4>
              <p className="text-xs text-slate-400">Societal and global impact on healthcare resilience, digital infrastructure, and sustainable asset usage.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ACADEMIC_DOC.sdgRelevance.map((item, idx) => (
                <div key={idx} className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Globe2 className="w-5 h-5 text-indigo-400" />
                      <h5 className="text-xs font-bold text-slate-100 font-mono">{item.sdg}</h5>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {item.points.map((pt, pidx) => (
                        <li key={pidx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
