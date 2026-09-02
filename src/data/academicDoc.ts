export const ACADEMIC_DOC = {
  pseudocode: `
// =========================================================================
// PSEUDOCODE: SMART HOSPITAL PATIENT & MEDICAL EQUIPMENT MANAGEMENT SYSTEM
// =========================================================================

PROGRAM SmartHospitalSystem:
    INITIALIZE patientsList WITH default clinical records
    INITIALIZE equipmentList (Heterogeneous HospitalResource pointers) WITH:
        - PatientMonitor, InfusionPump, Ventilator, CriticalVentilator
        
    FUNCTION MainMenu():
        LOOP:
            DISPLAY menu options (1 to 19)
            READ userChoice
            
            SWITCH userChoice:
                // --- SEPARATE ACADEMIC TASK DEMONSTRATIONS (FOR EVIDENCE & SCREENSHOTS) ---
                CASE 1: RunTask1Demo()  // Constructors (Default, Parameterized, Overloaded) & Deep Copy
                CASE 2: RunTask2Demo()  // Dynamic Memory Allocation (new[]) & Destructor (delete[])
                CASE 3: RunTask3Demo()  // Operator Overloading (+, <, <<)
                CASE 4: RunTask4Demo()  // Abstract Base Class & Inheritance Hierarchy
                CASE 5: RunTask5Demo()  // Virtual Base Class & Diamond Problem Resolution
                CASE 6: RunTask6Demo()  // Constructor Execution Order & Member Composition
                CASE 7: RunTask7Demo()  // Heterogeneous Objects & Runtime Polymorphism (vtable)
                CASE 8: RunTask8Demo()  // 'this' Pointer Chaining & dynamic_cast Downcasting
                CASE 9: RunAllTaskDemos() // Runs Tasks 1 to 8 in sequence
                
                // --- CLINICAL OPERATIONS & REPORTS ---
                CASE 10: DisplayPatients()
                CASE 11: DisplayEquipmentInventory() (Calls virtual display() polymorphically)
                CASE 12: SmartAllocateEquipment()
                CASE 13: ReleaseEquipment()
                CASE 14: GenerateEquipmentAvailabilityReport()
                CASE 15: GeneratePatientAllocationReport()
                CASE 16: GenerateMaintenanceDueReport()
                CASE 17: GenerateEquipmentCostReport()
                CASE 18: RunComprehensiveTestSuite()
                CASE 19: Release all dynamic resources cleanly and EXIT
                DEFAULT: DISPLAY "Invalid Choice"
        END LOOP

    FUNCTION SmartAllocateEquipment(patientId, reqType):
        IF patientId NOT FOUND IN patientsList THEN:
            RETURN FAILURE("Patient does not exist")
        IF patient.isAlreadyAllocated THEN:
            RETURN FAILURE("Patient already holds equipment")
            
        candidates = FILTER equipmentList WHERE type == reqType OR reqType == "ANY"
        IF candidates IS EMPTY THEN:
            RETURN FAILURE("No equipment of requested type in inventory")
            
        bestCandidate = NULL
        FOR EACH eq IN candidates:
            IF NOT eq.isAvailable THEN CONTINUE
            IF eq.operatingStatus != "Operational" THEN CONTINUE
            
            minBattery = (patient.risk == "Critical") ? 30 : 20
            IF eq.batteryLevel < minBattery THEN CONTINUE
            
            IF NOT eq.isCalibrationValid THEN CONTINUE
            IF eq.compatibleWard != "All" AND eq.compatibleWard != patient.ward THEN CONTINUE
            
            // TASK 3: Operator < used for suitability ranking
            IF bestCandidate == NULL OR (*bestCandidate < *eq) THEN:
                bestCandidate = eq
        
        IF bestCandidate != NULL THEN:
            bestCandidate.allocatedPatientId = patient.id
            bestCandidate.isAvailable = FALSE
            bestCandidate.operatingStatus = "Allocated"
            patient.allocatedEquipmentId = bestCandidate.id
            patient.allocationStatus = "Allocated"
            RETURN SUCCESS("Allocation Successful")
        ELSE:
            RETURN FAILURE("No equipment satisfied all 10 clinical safety criteria")
  `,

  classDiagramText: `
========================================================================================
                          CLASS & INHERITANCE ARCHITECTURE
========================================================================================

                                +--------------------+
                                |  ResourceIdentity  |  <--- [VIRTUAL BASE CLASS]
                                +--------------------+       (Resource ID, Model, Mfg)
                                      /          \\
                  virtual public     /            \\    virtual public
                                    v              v
                        +------------------+    +----------------+
                        | HospitalResource |    |  CriticalCare  | (ICU Certification,
                        +------------------+    +----------------+  Dual O2 Backup)
                        | [ABSTRACT BASE]  |            |
                        | + display() = 0  |            |
                        | + getSuitability |            |
                        +------------------+            |
                                 |                      |
                                 v                      |
                        +------------------+            |
                        | MedicalEquipment |            |
                        +------------------+            |
                         /       |        \\             |
                        /        |         \\            |
                       v         v          v           |
              +---------+ +----------+ +------------+   |
              | Patient | | Infusion | | Ventilator |   |
              | Monitor | |   Pump   | +------------+   |
              +---------+ +----------+        \\         /
                                               \\       /
                                                v     v
                                        +--------------------+
                                        | CriticalVentilator | <--- [HYBRID MULTIPLE INHERITANCE]
                                        +--------------------+      (Diamond Resolved via virtual base)

========================================================================================
                          COMPOSITION / MEMBER CLASS DIAGRAM
========================================================================================

+--------------------------------------------------------------------------------------+
|                                   MedicalEquipment                                   |
+--------------------------------------------------------------------------------------+
| - resourceId, modelNumber, manufacturer (from virtual ResourceIdentity)              |
| - equipmentType, operatingStatus, isAvailable, hourlyRate, usageDurationHours        |
| - allocatedPatientId, compatibleWard                                                 |
|                                                                                      |
| [MEMBER COMPOSITION OBJECTS]:                                                        |
|   +-- BatteryModule      : { batteryLevel: int, isCharging: bool, backupHours: double }|
|   +-- MaintenanceModule  : { lastService: string, nextDue: string, calibValid: bool }|
|   +-- ServiceRecord*     : Dynamically allocated heap array [new[] / delete[]]       |
+--------------------------------------------------------------------------------------+
  `,

  classExplanations: [
    {
      name: "ResourceIdentity",
      role: "Virtual Base Class (Task 5)",
      description: "Serves as the root entity for all hospital assets. Stores common fields (resourceId, modelNumber, manufacturer). Declared as a virtual base class (`virtual public ResourceIdentity`) to ensure that in hybrid multiple inheritance (CriticalVentilator), only one unique instance of ResourceIdentity is constructed, solving the classic C++ Diamond Problem."
    },
    {
      name: "HospitalResource",
      role: "Abstract Base Class (Task 4)",
      description: "Defines the universal polymorphic interface for all hospital clinical resources. Declares pure virtual methods (`virtual void display() const = 0;`, `calculateSuitabilityScore()`, `isReadyForAllocation()`). Enforces a strict contract across all derived monitoring, infusion, and life-support assets."
    },
    {
      name: "BatteryModule",
      role: "Member / Composition Class (Task 6)",
      description: "Encapsulates battery telemetry (0–100% capacity, charging state, estimated runtime hours remaining). Included as a member instance inside MedicalEquipment to demonstrate Object Composition and member initialization lists."
    },
    {
      name: "MaintenanceModule",
      role: "Member / Composition Class (Task 6)",
      description: "Manages calibration validity, preventive maintenance scheduling, and operational certification. Embedded as a composed object inside MedicalEquipment."
    },
    {
      name: "MedicalEquipment",
      role: "Core Class (Tasks 1, 2, 3, 6, 8)",
      description: "The primary operational entity representing hospital equipment. Implements default, parameterized, overloaded, and deep-copy copy constructors. Manages dynamic heap memory (`ServiceRecord* serviceHistory`) using `new[]` and `delete[]`. Overloads `operator+`, `operator<`, and `operator<<`. Implements chainable member functions returning `*this`."
    },
    {
      name: "PatientMonitor",
      role: "Hierarchical Derived Class (Task 4)",
      description: "Specialized vital-signs monitor inheriting from MedicalEquipment. Adds telemetry attributes (ECG channel count, SpO2, NIBP status) and provides a concrete implementation of the virtual `display()` method."
    },
    {
      name: "InfusionPump",
      role: "Hierarchical Derived Class (Task 4)",
      description: "Micro-infusion device for controlled intravenous drug delivery. Adds flow rate (mL/hr) settings, bolus limits, and safety occlusion alerts."
    },
    {
      name: "Ventilator",
      role: "Multilevel Derived Class (Task 4 & Task 8)",
      description: "Mechanical lung ventilator inheriting from MedicalEquipment. Adds clinical respiratory parameters (FiO2 percentage, PEEP pressure, ventilation modes). Used as the target for `dynamic_cast<Ventilator*>` to demonstrate derived-pointer specific operations."
    },
    {
      name: "CriticalCare",
      role: "Intermediate Virtual Base (Task 5)",
      description: "Defines tertiary ICU standards, dual oxygen line fail-safes, and resuscitation synchronization. Virtually inherits from ResourceIdentity."
    },
    {
      name: "CriticalVentilator",
      role: "Hybrid Multiple Inheritance Class (Task 5)",
      description: "Advanced ICU life-support ventilator inheriting jointly from `Ventilator` and `CriticalCare`. Demonstrates virtual base class diamond problem resolution and high-frequency oscillatory ventilation (HFOV)."
    },
    {
      name: "Patient",
      role: "Clinical Domain Entity (Section 3)",
      description: "Encapsulates patient demographic and triage information (ID, name, age, ward, risk category, clinical priority P1–P4, allocated equipment ID, and allocation status)."
    }
  ],

  taskMapping: [
    {
      task: "Task 1: Constructors & Deep Copy",
      description: "Default, Parameterized, Overloaded, and Copy Constructor with Deep Copy in MedicalEquipment.",
      codeSnippet: `MedicalEquipment(const MedicalEquipment& other) {
    this->serviceHistory = new ServiceRecord[other.serviceHistoryCapacity];
    for (int i = 0; i < other.serviceHistoryCount; ++i) {
        this->serviceHistory[i] = other.serviceHistory[i]; // Deep copy
    }
}`,
      verification: "Verified in Menu Option 1 / demoTask1(): Heading '========== TASK 1 DEMO: CONSTRUCTORS & DEEP COPY =========='. Heap pointers are distinct."
    },
    {
      task: "Task 2: Dynamic Memory & Destructors",
      description: "Dynamic array allocation via new[], reallocation on expansion, and safe cleanup in ~MedicalEquipment() via delete[].",
      codeSnippet: `virtual ~MedicalEquipment() override {
    if (serviceHistory != nullptr) {
        delete[] serviceHistory; // delete[]
        serviceHistory = nullptr;
    }
}`,
      verification: "Verified in Menu Option 2 / demoTask2(): Heading '========== TASK 2 DEMO: DYNAMIC MEMORY & DESTRUCTOR =========='. Scoped deletion confirmed."
    },
    {
      task: "Task 3: Operator Overloading",
      description: "Overloaded operator+ (combines usage cost), operator< (evaluates suitability), and operator<< (formatted stream output).",
      codeSnippet: `double operator+(const MedicalEquipment& other) const { return this->getUsageCost() + other.getUsageCost(); }
bool operator<(const MedicalEquipment& other) const { return this->calculateSuitabilityScore() < other.calculateSuitabilityScore(); }
friend std::ostream& operator<<(std::ostream& os, const MedicalEquipment& eq);`,
      verification: "Verified in Menu Option 3 / demoTask3(): Heading '========== TASK 3 DEMO: OPERATOR OVERLOADING (+, <, <<) =========='."
    },
    {
      task: "Task 4: Abstract Class & Inheritance",
      description: "HospitalResource contains pure virtual functions (virtual void display() const = 0;). Hierarchical and multilevel derived classes implemented.",
      codeSnippet: `class HospitalResource : virtual public ResourceIdentity {
    virtual void display() const = 0; // Pure virtual
};`,
      verification: "Verified in Menu Option 4 / demoTask4(): Heading '========== TASK 4 DEMO: ABSTRACT CLASS & INHERITANCE =========='."
    },
    {
      task: "Task 5: Virtual Base Class (Diamond Problem)",
      description: "ResourceIdentity virtually inherited by HospitalResource and CriticalCare. Resolved in CriticalVentilator.",
      codeSnippet: `class HospitalResource : virtual public ResourceIdentity { ... };
class CriticalCare : virtual public ResourceIdentity { ... };
class CriticalVentilator : public Ventilator, public CriticalCare { ... };`,
      verification: "Verified in Menu Option 5 / demoTask5(): Heading '========== TASK 5 DEMO: VIRTUAL BASE & DIAMOND PROBLEM ========'."
    },
    {
      task: "Task 6: Constructor Order & Composition",
      description: "BatteryModule and MaintenanceModule member objects initialized via constructor initializer list.",
      codeSnippet: `MedicalEquipment(...) : ResourceIdentity(...), HospitalResource(...),
    battery(initialBattery, false, backupHrs),
    maintenance(lastDate, nextDate, calibValid, status) { ... }`,
      verification: "Verified in Menu Option 6 / demoTask6(): Heading '========== TASK 6 DEMO: CONSTRUCTOR ORDER & COMPOSITION ========'. Diagnostic trace output."
    },
    {
      task: "Task 7: Heterogeneous Polymorphism",
      description: "Managed via std::vector<HospitalResource*> base-class pointers with runtime dynamic dispatch.",
      codeSnippet: `std::vector<std::unique_ptr<HospitalResource>> resources;
for (const auto& res : resources) { res->display(); } // Dynamic dispatch`,
      verification: "Verified in Menu Option 7 / demoTask7(): Heading '========== TASK 7 DEMO: RUNTIME POLYMORPHISM & BASE PTR ========'."
    },
    {
      task: "Task 8: 'this' Pointer & Derived Pointer",
      description: "Method chaining returning *this (updateBattery().updateCost()) and safe downcasting via dynamic_cast<Ventilator*>.",
      codeSnippet: `MedicalEquipment& updateBattery(int level) { this->battery.setBatteryLevel(level); return *this; }
Ventilator* ventPtr = dynamic_cast<Ventilator*>(basePtr);
if (ventPtr) ventPtr->setOxygenSupport(75.0, 12.0);`,
      verification: "Verified in Menu Option 8 / demoTask8(): Heading '========== TASK 8 DEMO: 'this' POINTER & DYNAMIC_CAST =========='."
    }
  ],

  reflection: {
    title: "Academic Project Reflection (DSA01 CO3 & CO4)",
    content: `
1. Why the Chosen Class Design Was Used:
The biomedical hospital domain inherently features heterogeneous equipment with both shared properties (IDs, manufacturers, operating status, batteries) and specialized capabilities (ECG leads for monitors, infusion flow rates for pumps, FiO2/PEEP for ventilators). By structuring an abstract base class (HospitalResource) and a comprehensive intermediate class (MedicalEquipment) composed of modular subcomponents (BatteryModule, MaintenanceModule), the design achieves high cohesion and loose coupling.

2. Why Abstract Classes & Inheritance Are Crucial:
The abstract class HospitalResource establishes a non-negotiable interface contract. No generic, uninstantiated resource can exist in the system without fulfilling pure virtual functions like display() and calculateSuitabilityScore(). Hierarchical and multilevel inheritance enable clean code reuse while honoring the Open/Closed Principle.

3. Why Virtual Inheritance Solved the Diamond Problem:
Critical-care equipment such as CriticalVentilator requires both mechanical ventilation features (from Ventilator -> MedicalEquipment) and tertiary trauma certifications (from CriticalCare). Without virtual inheritance, CriticalVentilator would inherit two separate instances of ResourceIdentity, causing compiler ambiguity for resourceId and modelNumber. Declaring 'virtual public ResourceIdentity' ensures that the most-derived class constructs exactly one shared ResourceIdentity instance.

4. Deep Copy vs. Shallow Copy & Memory Safety:
When classes manage dynamically allocated heap memory (such as ServiceRecord*), the default compiler-generated copy constructor performs a memberwise shallow copy. This causes two objects to point to the exact same memory address. When one object is destroyed, its destructor frees the memory, leaving the other object with a dangling pointer and causing a fatal runtime double-free exception. Implementing an explicit Deep Copy allocates new heap buffers and duplicates data element-by-element, guaranteeing independent memory ownership.

5. How the System Improves Patient Safety:
In real-world hospitals, allocating low-battery or uncalibrated life-support equipment to an ICU patient can result in catastrophic clinical failure. The 10-point Smart Equipment Allocation algorithm strictly checks availability, operational state, minimum battery thresholds (e.g. >=30% for Critical P1 patients), calibration dates, and ward compatibility before completing an allocation.
    `
  },

  sdgRelevance: [
    {
      sdg: "SDG 3: Good Health and Well-Being",
      points: [
        "Eliminates equipment failure risks by ensuring only calibrated, fully operational life-support equipment is assigned to critical patients.",
        "Clinical priority-based triage ensures patients in cardiac or respiratory arrest (P1 Critical) receive immediate allocation over non-urgent cases.",
        "Real-time battery telemetry prevents ventilator shutoff during intra-hospital transfers or power grid disruptions."
      ]
    },
    {
      sdg: "SDG 9: Industry, Innovation, and Infrastructure",
      points: [
        "Replaces fragmented manual equipment logbooks with digital, automated biomedical asset management.",
        "Implements scalable object-oriented software engineering suitable for integration into smart hospital IoT gateways and hospital information systems (HIS).",
        "Provides modular expansion capabilities for emerging medical technologies like robotic surgery consoles and ECMO circuits."
      ]
    },
    {
      sdg: "SDG 12: Responsible Consumption and Production",
      points: [
        "Preventive maintenance scheduling extends the operational lifespan of multi-million dollar clinical hardware.",
        "Accurate usage hour and cost accrual tracking prevents premature equipment obsolescence and optimizes hospital capital allocation.",
        "Reduces e-waste by detecting and servicing degraded battery modules before total device retirement."
      ]
    }
  ]
};
