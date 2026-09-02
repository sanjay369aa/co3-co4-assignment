# SMART HOSPITAL PATIENT AND MEDICAL EQUIPMENT MANAGEMENT SYSTEM
### Object-Oriented Programming with C++ (DSA01 - CO3 & CO4 Academic Assignment)

![Language](https://img.shields.io/badge/Language-C%2B%2B17-blue.svg)
![Standard](https://img.shields.io/badge/Standard-ISO%20IEC%2014882%3A2017-brightgreen.svg)
![Paradigm](https://img.shields.io/badge/Paradigm-Object--Oriented%20Programming-orange.svg)
![Academic](https://img.shields.io/badge/Assignment-CO3%20%26%20CO4%20DSA01-purple.svg)

---

## 1. Project Overview & Objective

The **Smart Hospital Patient and Medical Equipment Management System** is a robust, modular, and memory-safe C++17 console-based application designed to solve critical biomedical resource allocation challenges in contemporary healthcare facilities. The system manages patients across various hospital wards (ICU, Emergency, General, Pediatric) and oversees heterogeneous life-support and clinical monitoring equipment (*Patient Monitors, Infusion Pumps, Mechanical Ventilators, and Hybrid Critical-Care Ventilators*).

### Key Clinical Objectives
1. **Intelligent Allocation**: Match clinical patient triage priority (P1–P4) and risk categories (*Critical, High, Medium, Low*) to operational, calibrated, battery-sufficient biomedical equipment.
2. **Resource Tracking**: Maintain accurate usage metrics, battery telemetry, maintenance schedules, and dynamic service history logs.
3. **Automated Auditing**: Generate real-time reports for availability, patient allocation, preventive maintenance, and cumulative equipment usage cost.

---

## 2. Object-Oriented Programming (OOP) Concepts Implemented

| Task # | OOP Concept | Specific Implementation in Project |
| :--- | :--- | :--- |
| **Task 1** | **Constructors & Deep Copy** | Default, Parameterized, Overloaded, and Copy Constructors in `MedicalEquipment`. Copy constructor performs a dynamic heap **deep copy** of `ServiceRecord[]` to eliminate pointer aliasing and double-deletion. |
| **Task 2** | **Dynamic Memory & Destructors** | Explicit use of `new[]` and `delete[]` for resizing and releasing dynamic service history buffers. Virtual destructors guarantee safe polymorphic cleanup. |
| **Task 3** | **Operator Overloading** | Overloaded `operator+` (sums equipment usage costs), `operator<` (evaluates composite clinical suitability score), and `operator<<` (formatted console stream output). |
| **Task 4** | **Abstract Class & Hierarchy** | Abstract base class `HospitalResource` with pure virtual function `virtual void display() const = 0;`. Derived hierarchy: `MedicalEquipment` $\rightarrow$ `PatientMonitor`, `InfusionPump`, `Ventilator`. |
| **Task 5** | **Virtual Base Class (Diamond Problem)** | Virtual inheritance (`virtual public ResourceIdentity`) used across `MedicalEquipment` and `CriticalCare` to resolve ambiguity in the hybrid derived class `CriticalVentilator`. |
| **Task 6** | **Constructor Order & Composition** | Composed member classes `BatteryModule` and `MaintenanceModule` inside `MedicalEquipment`, initialized cleanly via constructor initializer lists. |
| **Task 7** | **Heterogeneous Collection & Polymorphism** | Polymorphic management via base pointers `std::vector<std::unique_ptr<HospitalResource>>`. Dynamic dispatch executes correct derived `display()` functions without object slicing. |
| **Task 8** | **`this` Pointer & Derived Pointers** | Method chaining using `return *this;` (`updateBattery().updateCost()`). Safe downcasting with `dynamic_cast<Ventilator*>` to invoke specialized mechanical ventilation routines. |

---

## 3. Class Hierarchy & Architectural Diagrams

### A. Inheritance Hierarchy (Solving the Diamond Problem)
```
                     +----------------------+
                     |   ResourceIdentity   |  <--- Virtual Base Class
                     +----------------------+
                            /        \
          virtual public   /          \   virtual public
                          v            v
            +------------------+    +----------------+
            | HospitalResource |    |  CriticalCare  |
            +------------------+    +----------------+
                     |                       |
                     v                       |
            +------------------+             |
            | MedicalEquipment |             |
            +------------------+             |
             /       |        \              |
            /        |         \             |
           v         v          v            |
    +---------+ +----------+ +------------+  |
    | Patient | | Infusion | | Ventilator |  |
    | Monitor | |   Pump   | +------------+  |
    +---------+ +----------+        \        /
                                     \      /
                                      v    v
                               +--------------------+
                               | CriticalVentilator |  <--- Hybrid Multiple Inheritance
                               +--------------------+
```

### B. Composition Architecture
```
+-------------------------------------------------------------------+
|                        MedicalEquipment                           |
+-------------------------------------------------------------------+
| - resourceId, modelNumber, manufacturer (from ResourceIdentity)   |
| - equipmentType, operatingStatus, isAvailable, hourlyRate         |
|                                                                   |
| [Composition Members]:                                            |
|   +-- BatteryModule      (batteryLevel, isCharging, backupHours)  |
|   +-- MaintenanceModule  (lastService, nextDue, calibrationValid) |
|   +-- ServiceRecord*     (Dynamically allocated heap array)       |
+-------------------------------------------------------------------+
```

---

## 4. System Reports

1. **Equipment Availability Report**: Real-time audit of equipment type, operating condition, battery state of charge, calibration validity, and ward compatibility.
2. **Patient Allocation Report**: Clinical overview of admitted patients, ward assignments, risk categorization, triage priority, and active equipment links.
3. **Maintenance Due Report**: Engineering audit tracking service intervals, recalibration deadlines, and operational warnings.
4. **Equipment Cost Report**: Financial breakdown displaying accrued operating hours, hourly billing rates, equipment totals, and grand hospital totals.

---

## 5. System Requirements & Compilation

### Requirements
- Standard C++17 compliant compiler (GCC 9+, Clang 10+, MSVC 2019+)
- CMake 3.14+ (optional) or direct terminal compilation

### Compilation Command (GCC / G++)
```bash
g++ -std=c++17 -Wall -Wextra -O2 main.cpp -o hospital_system
```

### Execution Command
```bash
# On Linux / macOS:
./hospital_system

# On Windows:
hospital_system.exe
```

---

## 6. Verification & Test Cases

The system includes a dedicated automated test suite (Menu Option 16) covering:

- **Normal Test Case**: Successful allocation of available `Ventilator` to an ICU Patient with Priority 1.
- **Boundary Test Case**: Verification that low battery (< 30% for Critical patients) triggers safety rejection.
- **Invalid Test Case A**: Rejection of non-existent Patient ID.
- **Invalid Test Case B**: Rejection of equipment with expired calibration.
- **Invalid Test Case C**: Prevention of double-allocation to already occupied patient/equipment.

---

## 7. UN Sustainable Development Goals (SDG) Relevance

- **SDG 3: Good Health and Well-Being**: Ensures zero equipment downtime for critical patients, prevents faulty/uncalibrated equipment usage, and minimizes biomedical failure risks.
- **SDG 9: Industry, Innovation, and Infrastructure**: Demonstrates modern object-oriented software engineering for resilient digital healthcare infrastructure.
- **SDG 12: Responsible Consumption and Production**: Optimizes medical asset utilization, extends equipment lifespan through timely preventive maintenance, and prevents unnecessary capital expenditure.

---

## 8. Author Information

- **Name:** ___________________________
- **Register Number:** ___________________________
- **Department:** Department of Computer Science and Engineering
- **Course:** Object-Oriented Programming with C++ (DSA01 - CO3 & CO4)
- **College:** ___________________________
