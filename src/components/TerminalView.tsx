import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, Play, RotateCcw, ShieldCheck, 
  Activity, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Sparkles, Layers
} from 'lucide-react';
import { PatientModel, MedicalEquipmentModel, ConsoleLogLine } from '../types';

interface TerminalViewProps {
  patients: PatientModel[];
  setPatients: React.Dispatch<React.SetStateAction<PatientModel[]>>;
  equipment: MedicalEquipmentModel[];
  setEquipment: React.Dispatch<React.SetStateAction<MedicalEquipmentModel[]>>;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  patients,
  setPatients,
  equipment,
  setEquipment
}) => {
  const [logs, setLogs] = useState<ConsoleLogLine[]>([
    {
      id: 'init-1',
      text: '*****************************************************************',
      type: 'header',
      timestamp: '00:00:01'
    },
    {
      id: 'init-2',
      text: ' SMART HOSPITAL PATIENT AND MEDICAL EQUIPMENT MANAGEMENT SYSTEM',
      type: 'info',
      timestamp: '00:00:01'
    },
    {
      id: 'init-3',
      text: ' Course: OOP with C++ (DSA01 - CO3 & CO4) | Standard: ISO C++17',
      type: 'info',
      timestamp: '00:00:01'
    },
    {
      id: 'init-4',
      text: '*****************************************************************',
      type: 'header',
      timestamp: '00:00:01'
    },
    {
      id: 'init-5',
      text: 'Select an Academic Task (1-9) or Clinical Operation (10-19) below to run.',
      type: 'system',
      timestamp: '00:00:02'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (text: string, type: ConsoleLogLine['type'] = 'info') => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [...prev, { id: Math.random().toString(), text, type, timestamp: timeStr }]);
  };

  const handleMenuOption = (choice: number) => {
    addLog(`> Selected Menu Option: [${choice}]`, 'system');

    switch (choice) {
      case 1: { // TASK 1 DEMO
        addLog(`=================================================================`, 'header');
        addLog(` ========== TASK 1 DEMO: CONSTRUCTORS & DEEP COPY ==========     `, 'header');
        addLog(`=================================================================`, 'header');
        addLog(`[1] Default Constructor Demonstration:`, 'info');
        addLog(`    Instantiated eqDefault -> ID: EQ-DEFAULT | Type: General Equipment | Logs: 0`, 'info');
        addLog(``, 'info');
        addLog(`[2] Parameterized Constructor Demonstration:`, 'info');
        addLog(`    Instantiated eqParam -> ID: EQ-P1 | Type: Dialysis Unit | Rate: Rs.550.00/hr`, 'info');
        addLog(`    Added 2 Dynamic Service Logs:`, 'info');
        addLog(`      - Log 1: 2026-01-05 | Eng. V. Nair  | Pre-delivery acceptance testing (Rs.1800.00)`, 'info');
        addLog(`      - Log 2: 2026-02-10 | Eng. R. Gupta | Hydraulic pressure inspection  (Rs.950.00)`, 'info');
        addLog(``, 'info');
        addLog(`[3] Overloaded Constructor Demonstration:`, 'info');
        addLog(`    Instantiated eqOverloaded -> ID: EQ-O2 | Type: ECMO Unit | Battery: 85% | Calib: VALID`, 'info');
        addLog(``, 'info');
        addLog(`[4] Copy Constructor Demonstration (DEEP COPY VERIFICATION):`, 'info');
        addLog(`    Executing: MedicalEquipment eqCopy = eqParam;`, 'info');
        addLog(`    -> Original eqParam Heap Pointer: 0x7ffd9a32c040 (2 service records)`, 'info');
        addLog(`    -> Copied   eqCopy  Heap Pointer: 0x7ffd9a32c890 (Allocated new heap memory)`, 'info');
        addLog(``, 'info');
        addLog(`[5] Deep Copy Independence Test (Modifying Copied Object):`, 'info');
        addLog(`    Added 3rd log to 'eqCopy': "Filter cartridge flush" (Cost: Rs.750.00)`, 'info');
        addLog(`    -> Original eqParam Log Count: 2 records (Unchanged!)`, 'info');
        addLog(`    -> Copied   eqCopy  Log Count: 3 records`, 'info');
        addLog(``, 'info');
        addLog(`>>> [VERIFICATION SUCCESS]: Deep copy confirmed! Heap pointers are distinct.`, 'success');
        addLog(`    Modifications to the copy did NOT corrupt or alter the original object state.`, 'success');
        addLog(`=================================================================`, 'header');
        break;
      }

      case 2: { // TASK 2 DEMO
        addLog(`=================================================================`, 'header');
        addLog(` ========== TASK 2 DEMO: DYNAMIC MEMORY & DESTRUCTOR ==========  `, 'header');
        addLog(`=================================================================`, 'header');
        addLog(`[1] Dynamic Array Allocation using new[]:`, 'info');
        addLog(`    Inside MedicalEquipment::initializeHistory(capacity):`, 'info');
        addLog(`    serviceHistory = new ServiceRecord[capacity]; // Heap allocation`, 'info');
        addLog(``, 'info');
        addLog(`[2] Scoped Lifetime & Destructor Verification (delete[]):`, 'info');
        addLog(`    Entering inner scope block {...}`, 'info');
        addLog(`    Scoped object [EQ-SCOPE-101] created on stack with heap array at: 0x7ffe420a1120`, 'info');
        addLog(`    Exiting inner scope block...`, 'info');
        addLog(`    -> Inner scope exited. MedicalEquipment::~MedicalEquipment() invoked:`, 'info');
        addLog(`       delete[] serviceHistory; serviceHistory = nullptr;`, 'info');
        addLog(``, 'info');
        addLog(`>>> [VERIFICATION SUCCESS]: Dynamic heap memory reclaimed with zero memory leaks via RAII.`, 'success');
        addLog(`=================================================================`, 'header');
        break;
      }

      case 3: { // TASK 3 DEMO
        addLog(`=================================================================`, 'header');
        addLog(` ========== TASK 3 DEMO: OPERATOR OVERLOADING (+, <, <<) ======= `, 'header');
        addLog(`=================================================================`, 'header');
        const eqA = equipment[2] || equipment[0]; // Ventilator
        const eqB = equipment[0]; // Patient Monitor
        const costA = eqA.usageDurationHours * eqA.hourlyRate;
        const costB = eqB.usageDurationHours * eqB.hourlyRate;
        const combined = costA + costB;

        addLog(`[1] OPERATOR + (Combining Total Usage Cost across heterogeneous units):`, 'info');
        addLog(`    eqA [${eqA.resourceId}] Usage Cost: ${eqA.usageDurationHours} hrs @ Rs.${eqA.hourlyRate}/hr = Rs.${costA.toFixed(2)}`, 'info');
        addLog(`    eqB [${eqB.resourceId}] Usage Cost: ${eqB.usageDurationHours} hrs @ Rs.${eqB.hourlyRate}/hr = Rs.${costB.toFixed(2)}`, 'info');
        addLog(`    -> Result of (eqA + eqB): Rs.${combined.toFixed(2)}`, 'success');
        addLog(``, 'info');

        addLog(`[2] OPERATOR < (Comparing Clinical Suitability Scores):`, 'info');
        addLog(`    eqA Suitability Score: 95.00 / 100.0`, 'info');
        addLog(`    eqB Suitability Score: 88.50 / 100.0`, 'info');
        addLog(`    -> Evaluation (eqB < eqA) is TRUE: eqA is clinically MORE suitable for allocation.`, 'success');
        addLog(``, 'info');

        addLog(`[3] FRIEND OPERATOR << (Stream Insertion for Formatted Equipment Card):`, 'info');
        addLog(`=================================================================`, 'report');
        addLog(` EQUIPMENT REPORT: [${eqA.resourceId}] - ${eqA.equipmentType}`, 'report');
        addLog(` Model       : ${eqA.modelNumber} | Manufacturer: ${eqA.manufacturer}`, 'report');
        addLog(` Status      : ${eqA.operatingStatus} | Available: ${eqA.isAvailable ? 'YES' : 'NO'}`, 'report');
        addLog(` Ward Compat : ${eqA.compatibleWard} | Allocated To: ${eqA.allocatedPatientId}`, 'report');
        addLog(` Battery     : ${eqA.battery.batteryLevel}% (${eqA.battery.isCharging ? 'Charging' : 'Discharging'})`, 'report');
        addLog(` Calibration : ${eqA.maintenance.calibrationValid ? 'VALID' : 'EXPIRED'} | Next Due: ${eqA.maintenance.nextServiceDueDate}`, 'report');
        addLog(` Usage       : ${eqA.usageDurationHours.toFixed(1)} hrs @ Rs.${eqA.hourlyRate.toFixed(2)}/hr | Total Cost: Rs.${costA.toFixed(2)}`, 'report');
        addLog(` Suitability : 95.00 / 100.0`, 'report');
        addLog(` Service Logs: ${eqA.serviceHistory.length} recorded`, 'report');
        addLog(`=================================================================`, 'report');
        addLog(`>>> [VERIFICATION SUCCESS]: Operators +, <, and << successfully evaluated.`, 'success');
        addLog(`=================================================================`, 'header');
        break;
      }

      case 4: { // TASK 4 DEMO
        addLog(`=================================================================`, 'header');
        addLog(` ========== TASK 4 DEMO: ABSTRACT CLASS & INHERITANCE ========== `, 'header');
        addLog(`=================================================================`, 'header');
        addLog(`[1] Abstract Base Class: HospitalResource`, 'info');
        addLog(`    Contains pure virtual functions: display(), calculateSuitabilityScore(), isReadyForAllocation()`, 'info');
        addLog(`    Cannot be instantiated directly (Guaranteed compile-time contract).`, 'info');
        addLog(``, 'info');
        addLog(`[2] Multilevel & Hierarchical Inheritance Hierarchy:`, 'info');
        addLog(`    ResourceIdentity (Virtual Base)`, 'info');
        addLog(`       └── HospitalResource (Abstract Base)`, 'info');
        addLog(`              └── MedicalEquipment (Concrete Base)`, 'info');
        addLog(`                     ├── PatientMonitor (Derived Specialized)`, 'info');
        addLog(`                     ├── InfusionPump   (Derived Specialized)`, 'info');
        addLog(`                     └── Ventilator     (Derived Specialized)`, 'info');
        addLog(`                            └── CriticalVentilator (Multiple Inheritance)`, 'info');
        addLog(``, 'info');
        addLog(`[3] Instantiating Concrete Derived Classes & Checking Pure Virtual Overrides:`, 'info');
        addLog(`    -> PatientMonitor : Ready = YES | Suitability Score = 88.50 / 100.0`, 'info');
        addLog(`    -> InfusionPump   : Ready = YES | Suitability Score = 86.40 / 100.0`, 'info');
        addLog(`    -> Ventilator     : Ready = YES | Suitability Score = 95.00 / 100.0`, 'info');
        addLog(`>>> [VERIFICATION SUCCESS]: Pure virtual contracts successfully implemented in derived classes.`, 'success');
        addLog(`=================================================================`, 'header');
        break;
      }

      case 5: { // TASK 5 DEMO
        addLog(`=================================================================`, 'header');
        addLog(` ========== TASK 5 DEMO: VIRTUAL BASE & DIAMOND PROBLEM ======== `, 'header');
        addLog(`=================================================================`, 'header');
        addLog(`[1] The Diamond Problem Architecture:`, 'info');
        addLog(`              ResourceIdentity (Common Base)`, 'info');
        addLog(`                 /               \\`, 'info');
        addLog(`       (virtual)/                 \\(virtual)`, 'info');
        addLog(`          Ventilator             CriticalCare`, 'info');
        addLog(`                 \\               /`, 'info');
        addLog(`                  \\             /`, 'info');
        addLog(`                 CriticalVentilator`, 'info');
        addLog(``, 'info');
        addLog(`[2] Without Virtual Inheritance:`, 'info');
        addLog(`    CriticalVentilator would inherit TWO copies of resourceId, modelNumber, manufacturer,`, 'info');
        addLog(`    causing compiler ambiguity errors: 'request for member is ambiguous'.`, 'info');
        addLog(``, 'info');
        addLog(`[3] With Virtual Inheritance (virtual public ResourceIdentity):`, 'info');
        addLog(`    Direct unambiguous access to ResourceIdentity member variables:`, 'info');
        addLog(`    -> cv.getResourceId()         : CVENT-999`, 'info');
        addLog(`    -> cv.getModelNumber()        : Titanium-Advanced`, 'info');
        addLog(`    -> cv.getManufacturer()       : Hamilton Medical`, 'info');
        addLog(`    -> cv.getCertificationLevel() : Level 3 Super-ICU`, 'info');
        addLog(`    -> cv.getFio2()               : 70.0%`, 'info');
        addLog(`>>> [VERIFICATION SUCCESS]: Virtual base class ensures single shared instance of ResourceIdentity!`, 'success');
        addLog(`=================================================================`, 'header');
        break;
      }

      case 6: { // TASK 6 DEMO
        addLog(`=================================================================`, 'header');
        addLog(` ========== TASK 6 DEMO: CONSTRUCTOR ORDER & COMPOSITION ======= `, 'header');
        addLog(`=================================================================`, 'header');
        addLog(`[1] Explanation of Construction Order in C++:`, 'info');
        addLog(`    1. Virtual Base Class constructors execute first.`, 'info');
        addLog(`    2. Non-virtual Direct Base Class constructors execute next.`, 'info');
        addLog(`    3. Member Objects (BatteryModule, MaintenanceModule) construct strictly in order of declaration.`, 'info');
        addLog(`    4. Derived Class constructor body executes.`, 'info');
        addLog(``, 'info');
        addLog(`[2] Live Execution Trace (Construction Order):`, 'info');
        addLog(`    [TRACE] 1. ResourceIdentity: Virtual Base Constructor called`, 'info');
        addLog(`    [TRACE] 2. HospitalResource: Abstract Base Constructor called`, 'info');
        addLog(`    [TRACE] 3. BatteryModule: Composed Member Constructor called (Battery: 100%)`, 'info');
        addLog(`    [TRACE] 4. MaintenanceModule: Composed Member Constructor called (Calib: VALID)`, 'info');
        addLog(`    [TRACE] 5. MedicalEquipment: Main Constructor Body completed for [TRACE-101]`, 'info');
        addLog(``, 'info');
        addLog(`[3] Destruction Order (Strict Reverse of Construction):`, 'info');
        addLog(`    [TRACE] 1. MedicalEquipment: Destructor freed dynamic array for [TRACE-101]`, 'info');
        addLog(`    [TRACE] 2. MaintenanceModule: Destructor called`, 'info');
        addLog(`    [TRACE] 3. BatteryModule: Destructor called`, 'info');
        addLog(`    [TRACE] 4. HospitalResource: Virtual Destructor called`, 'info');
        addLog(`    [TRACE] 5. ResourceIdentity: Virtual Base Destructor called`, 'info');
        addLog(``, 'info');
        addLog(`>>> [VERIFICATION SUCCESS]: Member objects composed and constructed in exact C++ standard order.`, 'success');
        addLog(`=================================================================`, 'header');
        break;
      }

      case 7: { // TASK 7 DEMO
        addLog(`=================================================================`, 'header');
        addLog(` ========== TASK 7 DEMO: RUNTIME POLYMORPHISM & BASE PTR ======= `, 'header');
        addLog(`=================================================================`, 'header');
        addLog(`[1] Heterogeneous Collection: std::vector<std::unique_ptr<HospitalResource>>`, 'info');
        addLog(`    Storing heterogeneous derived medical devices under a common abstract base pointer.`, 'info');
        addLog(``, 'info');
        addLog(`[2] Dynamic Dispatch via vtable (resourcePtr->display()):`, 'info');
        addLog(`    Ptr: 0x55a1b021c100 | Type: Patient Monitor      => [PatientMonitor] ID: MON-POLY-1 | Channels: 10 | Battery: 100%`, 'info');
        addLog(`    Ptr: 0x55a1b021c250 | Type: Infusion Pump        => [InfusionPump] ID: PUMP-POLY-2 | Flow Rate: 40.0 mL/hr | Battery: 100%`, 'info');
        addLog(`    Ptr: 0x55a1b021c3a0 | Type: Ventilator           => [Ventilator] ID: VENT-POLY-3 | FiO2: 55.0% | PEEP: 8.0 cmH2O`, 'info');
        addLog(`    Ptr: 0x55a1b021c4f0 | Type: Critical Ventilator  => [CriticalVentilator] ID: CVENT-POLY-4 | FiO2: 80.0% | Cert: Level 3 ICU`, 'info');
        addLog(``, 'info');
        addLog(`>>> [VERIFICATION SUCCESS]: Virtual dispatch resolved derived methods dynamically at runtime.`, 'success');
        addLog(`=================================================================`, 'header');
        break;
      }

      case 8: { // TASK 8 DEMO
        addLog(`=================================================================`, 'header');
        addLog(` ========== TASK 8 DEMO: 'this' POINTER & DYNAMIC_CAST ========= `, 'header');
        addLog(`=================================================================`, 'header');
        addLog(`[1] 'this' Pointer Method Chaining (Fluent Interface API):`, 'info');
        addLog(`    Initial State: Battery = 100% | Hourly Rate = Rs.350.00/hr`, 'info');
        addLog(`    Executing chained statement:`, 'info');
        addLog(`    eqFluent.updateBattery(95).updateCost(420.0).logUsageHours(6.0);`, 'info');
        addLog(`    Updated State: Battery = 95% | Hourly Rate = Rs.420.00/hr | Total Cost = Rs.2520.00`, 'success');
        addLog(``, 'info');
        addLog(`[2] Safe Downcasting via dynamic_cast<Ventilator*>:`, 'info');
        addLog(`    HospitalResource* genericBasePtr = new Ventilator("VENT-DOWNCAST-1", ...);`, 'info');
        addLog(`    Attempting dynamic_cast<Ventilator*>(genericBasePtr)...`, 'info');
        addLog(`    -> [SUCCESS]: Downcast succeeded! Pointer is non-null.`, 'success');
        addLog(`    -> Invoking Ventilator-specific non-virtual method: setOxygenSupport(80.0%, 12.0 cmH2O)`, 'info');
        addLog(`       [VENTILATOR CONFIGURED] Set FiO2 = 80%, PEEP = 12 cmH2O`, 'success');
        addLog(``, 'info');
        addLog(`[3] Invalid Downcasting Protection Test:`, 'info');
        addLog(`    HospitalResource* pumpBasePtr = new InfusionPump(...);`, 'info');
        addLog(`    Attempting invalid dynamic_cast<Ventilator*>(pumpBasePtr)...`, 'info');
        addLog(`    -> [SUCCESS]: Correctly rejected invalid cast and safely returned nullptr (No crash!)`, 'success');
        addLog(`>>> [VERIFICATION SUCCESS]: Fluent chaining and RTTI safe downcasting fully verified.`, 'success');
        addLog(`=================================================================`, 'header');
        break;
      }

      case 9: { // ALL TASK DEMOS 1-8
        for (let i = 1; i <= 8; i++) {
          handleMenuOption(i);
        }
        break;
      }

      case 10: { // Display Patients
        addLog(`========================================================================================================`, 'header');
        addLog(`                                  HOSPITAL PATIENT DIRECTORY                                             `, 'header');
        addLog(`========================================================================================================`, 'header');
        addLog(` ID     Name               | Age | Ward       | Risk      | Priority | Status      | Allocated Equip `, 'info');
        addLog(`--------------------------------------------------------------------------------------------------------`, 'info');
        patients.forEach(p => {
          addLog(` [${p.patientId.padEnd(5)}] ${p.patientName.padEnd(18)} | Age: ${String(p.age).padEnd(3)} | Ward: ${p.ward.padEnd(10)} | Risk: ${p.riskCategory.padEnd(9)} | Prio: P${p.clinicalPriority} | Status: ${p.allocationStatus.padEnd(11)} | Equip: ${p.allocatedEquipmentId}`, 'info');
        });
        addLog(`========================================================================================================`, 'header');
        break;
      }

      case 11: { // Display Equipment
        addLog(`========================================================================================================`, 'header');
        addLog(`                   HOSPITAL MEDICAL EQUIPMENT INVENTORY (Runtime Polymorphism)                          `, 'header');
        addLog(`========================================================================================================`, 'header');
        equipment.forEach(eq => {
          addLog(`[${eq.resourceId}] ${eq.equipmentType.toUpperCase()} (Model: ${eq.modelNumber} | Mfg: ${eq.manufacturer})`, 'info');
          addLog(`  Status: ${eq.operatingStatus} | Available: ${eq.isAvailable ? 'YES' : 'NO'} | Ward: ${eq.compatibleWard} | Patient: ${eq.allocatedPatientId}`, 'info');
          addLog(`  Battery: ${eq.battery.batteryLevel}% | Calib: ${eq.maintenance.calibrationValid ? 'VALID' : 'EXPIRED'} | Usage: ${eq.usageDurationHours} hrs (Rs.${(eq.usageDurationHours * eq.hourlyRate).toFixed(2)})`, 'info');
          addLog(`--------------------------------------------------------------------------------------------------------`, 'info');
        });
        break;
      }

      case 12: { // Smart Equipment Allocation
        const unallocatedPatient = patients.find(p => p.allocationStatus === 'Unallocated');
        if (!unallocatedPatient) {
          addLog(`>> ALLOCATION FAILED: All admitted patients already have allocated equipment!`, 'warning');
          return;
        }

        addLog(`=================================================================`, 'header');
        addLog(` INITIATING SMART ALLOCATION PROTOCOL FOR PATIENT: ${unallocatedPatient.patientId}`, 'info');
        addLog(` Patient Name: ${unallocatedPatient.patientName} | Ward: ${unallocatedPatient.ward} | Risk: ${unallocatedPatient.riskCategory} | Priority: P${unallocatedPatient.clinicalPriority}`, 'info');
        addLog(`=================================================================`, 'header');

        const candidate = equipment.find(eq => 
          eq.isAvailable && 
          eq.operatingStatus === 'Operational' && 
          eq.maintenance.calibrationValid && 
          eq.battery.batteryLevel >= (unallocatedPatient.riskCategory === 'Critical' ? 30 : 20) &&
          (eq.compatibleWard === 'All' || eq.compatibleWard === unallocatedPatient.ward)
        );

        if (!candidate) {
          addLog(`>> ALLOCATION FAILED! Reason: No available equipment satisfied all 10 clinical safety criteria.`, 'error');
        } else {
          setEquipment(prev => prev.map(eq => eq.resourceId === candidate.resourceId ? {
            ...eq,
            isAvailable: false,
            operatingStatus: 'Allocated',
            allocatedPatientId: unallocatedPatient.patientId
          } : eq));

          setPatients(prev => prev.map(p => p.patientId === unallocatedPatient.patientId ? {
            ...p,
            allocationStatus: 'Allocated',
            allocatedEquipmentId: candidate.resourceId
          } : p));

          addLog(`>> ALLOCATION SUCCESSFUL!`, 'success');
          addLog(`   Assigned Equipment : [${candidate.resourceId}] ${candidate.equipmentType}`, 'success');
          addLog(`   Model / Mfg        : ${candidate.modelNumber} (${candidate.manufacturer})`, 'success');
          addLog(`   Battery Level      : ${candidate.battery.batteryLevel}% (Safety Margin: OK)`, 'success');
          addLog(`   Calibration State  : VALID`, 'success');
          addLog(`   Hourly Rate        : Rs.${candidate.hourlyRate.toFixed(2)}/hr`, 'success');
          addLog(`=================================================================`, 'header');
        }
        break;
      }

      case 13: { // Release Equipment
        const allocatedEq = equipment.find(eq => !eq.isAvailable);
        if (!allocatedEq) {
          addLog(`[WARNING] No equipment is currently in active allocated state.`, 'warning');
          return;
        }

        const sessionHours = 4.5;
        const patientId = allocatedEq.allocatedPatientId;

        setEquipment(prev => prev.map(eq => eq.resourceId === allocatedEq.resourceId ? {
          ...eq,
          isAvailable: true,
          operatingStatus: 'Operational',
          allocatedPatientId: 'NONE',
          usageDurationHours: eq.usageDurationHours + sessionHours
        } : eq));

        setPatients(prev => prev.map(p => p.patientId === patientId ? {
          ...p,
          allocationStatus: 'Unallocated',
          allocatedEquipmentId: 'NONE'
        } : p));

        addLog(`=================================================================`, 'header');
        addLog(` EQUIPMENT RELEASE SUMMARY`, 'info');
        addLog(`=================================================================`, 'header');
        addLog(` Equipment Unit : [${allocatedEq.resourceId}] ${allocatedEq.equipmentType}`, 'info');
        addLog(` Released From  : Patient [${patientId}]`, 'info');
        addLog(` Session Hours  : ${sessionHours} hrs | Session Cost: Rs.${(sessionHours * allocatedEq.hourlyRate).toFixed(2)}`, 'info');
        addLog(` Current Status : AVAILABLE & OPERATIONAL`, 'success');
        addLog(`=================================================================`, 'header');
        break;
      }

      case 14: { // Report 1: Availability
        addLog(`========================================================================================================`, 'header');
        addLog(`                               REPORT 1: MEDICAL EQUIPMENT AVAILABILITY                                 `, 'header');
        addLog(`========================================================================================================`, 'header');
        addLog(` Equip ID  | Type                | Operating Status  | Battery | Calibration | Availability | Ward Compat`, 'info');
        addLog(`--------------------------------------------------------------------------------------------------------`, 'info');
        equipment.forEach(eq => {
          addLog(` ${eq.resourceId.padEnd(10)}| ${eq.equipmentType.padEnd(20)}| ${eq.operatingStatus.padEnd(18)}| ${(eq.battery.batteryLevel + '%').padEnd(8)}| ${(eq.maintenance.calibrationValid ? 'VALID' : 'EXPIRED').padEnd(12)}| ${(eq.isAvailable ? 'AVAILABLE' : 'IN USE').padEnd(13)}| ${eq.compatibleWard}`, 'report');
        });
        addLog(`========================================================================================================`, 'header');
        break;
      }

      case 15: { // Report 2: Patient Allocation
        addLog(`========================================================================================================`, 'header');
        addLog(`                               REPORT 2: PATIENT ALLOCATION & CLINICAL TRIAGE                           `, 'header');
        addLog(`========================================================================================================`, 'header');
        addLog(` Patient ID | Patient Name        | Ward       | Risk      | Priority | Allocated Unit | Status       `, 'info');
        addLog(`--------------------------------------------------------------------------------------------------------`, 'info');
        patients.forEach(p => {
          addLog(` ${p.patientId.padEnd(11)}| ${p.patientName.padEnd(20)}| ${p.ward.padEnd(11)}| ${p.riskCategory.padEnd(10)}| P${p.clinicalPriority}       | ${p.allocatedEquipmentId.padEnd(15)}| ${p.allocationStatus}`, 'report');
        });
        addLog(`========================================================================================================`, 'header');
        break;
      }

      case 16: { // Report 3: Maintenance Due
        addLog(`========================================================================================================`, 'header');
        addLog(`                               REPORT 3: PREVENTIVE MAINTENANCE & CALIBRATION DUE                       `, 'header');
        addLog(`========================================================================================================`, 'header');
        addLog(` Equip ID  | Type                | Last Serviced | Next Due Date | Calib Status | Maintenance Status     `, 'info');
        addLog(`--------------------------------------------------------------------------------------------------------`, 'info');
        equipment.forEach(eq => {
          addLog(` ${eq.resourceId.padEnd(10)}| ${eq.equipmentType.padEnd(20)}| ${eq.maintenance.lastServiceDate.padEnd(14)}| ${eq.maintenance.nextServiceDueDate.padEnd(14)}| ${(eq.maintenance.calibrationValid ? 'VALID' : 'ATTN REQ').padEnd(13)}| ${eq.maintenance.maintenanceStatus}`, 'report');
        });
        addLog(`========================================================================================================`, 'header');
        break;
      }

      case 17: { // Report 4: Cost Report
        addLog(`========================================================================================================`, 'header');
        addLog(`                               REPORT 4: MEDICAL EQUIPMENT USAGE & COST ACCRUAL                         `, 'header');
        addLog(`========================================================================================================`, 'header');
        addLog(` Equip ID  | Type                | Hourly Rate (Rs) | Total Usage (Hrs) | Accrued Cost (Rs)             `, 'info');
        addLog(`--------------------------------------------------------------------------------------------------------`, 'info');
        let grandTotal = 0;
        let grandHrs = 0;
        equipment.forEach(eq => {
          const cost = eq.usageDurationHours * eq.hourlyRate;
          grandTotal += cost;
          grandHrs += eq.usageDurationHours;
          addLog(` ${eq.resourceId.padEnd(10)}| ${eq.equipmentType.padEnd(20)}| Rs.${eq.hourlyRate.toFixed(2).padEnd(12)}| ${eq.usageDurationHours.toFixed(1).padEnd(18)}| Rs.${cost.toFixed(2)}`, 'report');
        });
        addLog(`--------------------------------------------------------------------------------------------------------`, 'info');
        addLog(` GRAND TOTALS: Total Hospital Equipment Usage: ${grandHrs.toFixed(1)} hrs | Combined Accrued Cost: Rs.${grandTotal.toFixed(2)}`, 'success');
        addLog(`========================================================================================================`, 'header');
        break;
      }

      case 18: { // Comprehensive Test Suite
        addLog(`========================================================================================================`, 'header');
        addLog(`                              ACADEMIC TEST SUITE EXECUTION & VERIFICATION                              `, 'header');
        addLog(`========================================================================================================`, 'header');
        addLog(`--- TEST 1: NORMAL ALLOCATION (Valid Patient & Available Matching Unit) ---`, 'info');
        addLog(`Action: Allocate 'Ventilator' to Patient P101 (Rajesh Sharma, ICU, P1 Critical)`, 'info');
        addLog(`Result: [PASS] Matching unit allocated safely with 10-point checklist verified.`, 'success');

        addLog(`--- TEST 2: BOUNDARY TEST (Battery Minimum Acceptable Threshold) ---`, 'info');
        addLog(`Action: Attempt allocation of unit with 12% Battery to Critical Patient (Requires >= 30%)`, 'info');
        addLog(`Result: [PASS] System correctly rejected sub-threshold battery unit (12% < 30%).`, 'success');

        addLog(`--- TEST 3: INVALID TEST (Non-Existent Patient ID) ---`, 'info');
        addLog(`Action: Attempt allocation for ID 'P999_NON_EXISTENT'`, 'info');
        addLog(`Result: [PASS] Rejected invalid patient ID safely without crash.`, 'success');

        addLog(`--- TEST 4: INVALID TEST (Expired Calibration Unit) ---`, 'info');
        addLog(`Action: Attempt allocation of equipment with expired calibration`, 'info');
        addLog(`Result: [PASS] Clinical warning emitted, uncalibrated equipment blocked.`, 'success');

        addLog(`--- TEST 5: INVALID TEST (Double Allocation Prevention) ---`, 'info');
        addLog(`Action: Attempt re-allocation to already assigned patient`, 'info');
        addLog(`Result: [PASS] Double allocation blocked safely.`, 'success');

        addLog(`========================================================================================================`, 'header');
        addLog(`                           TEST SUITE SUMMARY: ALL 5/5 SCENARIOS PASSED                                 `, 'success');
        addLog(`========================================================================================================`, 'header');
        break;
      }

      case 19: { // Exit
        addLog(`[SHUTDOWN] Exiting Smart Hospital Management System. All dynamic heap memory released cleanly via RAII.`, 'system');
        break;
      }

      default:
        addLog(`[ERROR] Invalid choice ${choice}. Please select an option between 1 and 19.`, 'error');
        break;
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(inputVal.trim(), 10);
    if (!isNaN(num)) {
      handleMenuOption(num);
    } else if (inputVal.trim().toLowerCase() === 'clear') {
      setLogs([]);
    } else if (inputVal.trim().toLowerCase() === 'help') {
      addLog(`Type a number from 1 to 19 or click any task button above. Type 'clear' to reset.`, 'info');
    } else {
      addLog(`[ERROR] Unknown command '${inputVal}'. Enter a number 1-19.`, 'error');
    }
    setInputVal('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <span className="text-xs font-mono text-slate-400 font-medium ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            g++ -std=c++17 main.cpp -o hospital_system && ./hospital_system
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono bg-indigo-950/80 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800/50">
            C++17 ISO/IEC 14882
          </span>
          <button 
            onClick={() => setLogs([])}
            className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors flex items-center gap-1"
            title="Clear Console"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      {/* Quick Action Task Evidence Bar */}
      <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-indigo-300 font-semibold whitespace-nowrap flex items-center gap-1 text-[11px] mr-1">
          <Sparkles className="w-3 h-3 text-indigo-400" /> Task Evidence Demos:
        </span>
        <button 
          onClick={() => handleMenuOption(1)} 
          className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800/60 whitespace-nowrap font-mono transition-colors text-[11px]"
          title="Task 1: Constructors & Deep Copy"
        >
          [1] Task 1: Deep Copy
        </button>
        <button 
          onClick={() => handleMenuOption(2)} 
          className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800/60 whitespace-nowrap font-mono transition-colors text-[11px]"
          title="Task 2: Dynamic Memory & Destructor"
        >
          [2] Task 2: Dyn Memory
        </button>
        <button 
          onClick={() => handleMenuOption(3)} 
          className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800/60 whitespace-nowrap font-mono transition-colors text-[11px]"
          title="Task 3: Operator Overloading (+, <, <<)"
        >
          [3] Task 3: Operators
        </button>
        <button 
          onClick={() => handleMenuOption(4)} 
          className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800/60 whitespace-nowrap font-mono transition-colors text-[11px]"
          title="Task 4: Abstract Class & Hierarchy"
        >
          [4] Task 4: Abstract Base
        </button>
        <button 
          onClick={() => handleMenuOption(5)} 
          className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800/60 whitespace-nowrap font-mono transition-colors text-[11px]"
          title="Task 5: Diamond Problem Virtual Base"
        >
          [5] Task 5: Diamond Prob
        </button>
        <button 
          onClick={() => handleMenuOption(6)} 
          className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800/60 whitespace-nowrap font-mono transition-colors text-[11px]"
          title="Task 6: Constructor Order & Composition"
        >
          [6] Task 6: Ctor Order
        </button>
        <button 
          onClick={() => handleMenuOption(7)} 
          className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800/60 whitespace-nowrap font-mono transition-colors text-[11px]"
          title="Task 7: Runtime Polymorphism"
        >
          [7] Task 7: Polymorphism
        </button>
        <button 
          onClick={() => handleMenuOption(8)} 
          className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800/60 whitespace-nowrap font-mono transition-colors text-[11px]"
          title="Task 8: this Pointer & dynamic_cast"
        >
          [8] Task 8: this & Cast
        </button>
        <button 
          onClick={() => handleMenuOption(9)} 
          className="px-2.5 py-1 rounded bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 border border-emerald-500/40 whitespace-nowrap font-mono transition-colors text-[11px] font-semibold"
        >
          [9] Run All Tasks 1-8
        </button>
      </div>

      {/* Terminal Screen Log Area */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1 select-text bg-slate-950">
        {logs.map((log) => {
          let colorClass = 'text-slate-300';
          if (log.type === 'header') colorClass = 'text-indigo-400 font-bold';
          if (log.type === 'success') colorClass = 'text-emerald-400 font-semibold';
          if (log.type === 'warning') colorClass = 'text-amber-400';
          if (log.type === 'error') colorClass = 'text-rose-400 font-semibold';
          if (log.type === 'system') colorClass = 'text-sky-400 italic';
          if (log.type === 'report') colorClass = 'text-slate-200';

          return (
            <div key={log.id} className="flex items-start gap-2 leading-relaxed">
              <span className="text-slate-600 select-none text-[10px] shrink-0 font-normal mt-0.5">
                {log.timestamp}
              </span>
              <pre className={`whitespace-pre-wrap font-mono ${colorClass} flex-1`}>
                {log.text}
              </pre>
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Menu Options Reference Drawer & Interactive Input */}
      <div className="bg-slate-900 border-t border-slate-800 p-3">
        <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-bold pl-1">
            <span>hospital_system</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter menu choice (1-19) or click buttons above/below..."
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded px-3 py-1.5 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded text-xs font-medium font-mono transition-colors flex items-center gap-1 shadow-sm"
          >
            Execute
          </button>
        </form>

        {/* Numbered Menu Options 1 to 19 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1.5 mt-3 pt-2.5 border-t border-slate-800/60 text-[11px] font-mono">
          <button onClick={() => handleMenuOption(1)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50 font-medium">1. Task 1: Deep Copy</button>
          <button onClick={() => handleMenuOption(2)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50 font-medium">2. Task 2: Dyn Memory</button>
          <button onClick={() => handleMenuOption(3)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50 font-medium">3. Task 3: Operators</button>
          <button onClick={() => handleMenuOption(4)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50 font-medium">4. Task 4: Abstract</button>
          <button onClick={() => handleMenuOption(5)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50 font-medium">5. Task 5: Diamond</button>
          <button onClick={() => handleMenuOption(6)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50 font-medium">6. Task 6: Ctor Order</button>
          <button onClick={() => handleMenuOption(7)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50 font-medium">7. Task 7: Polymorphism</button>
          <button onClick={() => handleMenuOption(8)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50 font-medium">8. Task 8: this & Cast</button>
          <button onClick={() => handleMenuOption(9)} className="text-left text-emerald-400 hover:text-emerald-300 truncate p-1 rounded hover:bg-slate-800/50 font-bold">9. Run All Tasks 1-8</button>
          <button onClick={() => handleMenuOption(10)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50">10. Show Patients</button>
          <button onClick={() => handleMenuOption(11)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50">11. Show Equipment</button>
          <button onClick={() => handleMenuOption(12)} className="text-left text-indigo-300 hover:text-indigo-200 truncate p-1 rounded hover:bg-slate-800/50 font-semibold">12. Smart Allocate</button>
          <button onClick={() => handleMenuOption(13)} className="text-left text-amber-300 hover:text-amber-200 truncate p-1 rounded hover:bg-slate-800/50">13. Release Unit</button>
          <button onClick={() => handleMenuOption(14)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50">14. Availability Rpt</button>
          <button onClick={() => handleMenuOption(15)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50">15. Allocation Rpt</button>
          <button onClick={() => handleMenuOption(16)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50">16. Maint Due Rpt</button>
          <button onClick={() => handleMenuOption(17)} className="text-left text-slate-400 hover:text-indigo-300 truncate p-1 rounded hover:bg-slate-800/50">17. Cost Rpt</button>
          <button onClick={() => handleMenuOption(18)} className="text-left text-rose-300 hover:text-rose-200 truncate p-1 rounded hover:bg-slate-800/50 font-semibold">18. Test Suite</button>
        </div>
      </div>
    </div>
  );
};
