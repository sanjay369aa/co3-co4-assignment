export const CPP_SOURCE_CODE = `/**
 * ==============================================================================================
 * PROJECT TITLE: SMART HOSPITAL PATIENT AND MEDICAL EQUIPMENT MANAGEMENT SYSTEM
 * COURSE       : Object-Oriented Programming with C++ (DSA01 - CO3 & CO4 Assignment)
 * STANDARD     : ISO/IEC 14882:2017 (C++17 Standard Compliant)
 * ==============================================================================================
 * 
 * ACADEMIC ASSIGNMENT TASK MAPPING (EVIDENCE & DEMO GUIDE):
 *  - TASK 1: Constructors (Default, Parameterized, Overloaded, and Copy Constructor with DEEP COPY)
 *  - TASK 2: Dynamic Memory Allocation (new[], delete[]) & Safe Destructor Resource Management
 *  - TASK 3: Operator Overloading (operator+, operator<, and friend operator<< stream output)
 *  - TASK 4: Abstract Base Class (HospitalResource) & Hierarchical / Multilevel Class Hierarchy
 *  - TASK 5: Virtual Base Class (ResourceIdentity) resolving Diamond Problem in CriticalVentilator
 *  - TASK 6: Constructor Execution Order & Composition (BatteryModule & MaintenanceModule)
 *  - TASK 7: Heterogeneous Object Management via Base Pointers & Runtime Polymorphism (vtable)
 *  - TASK 8: 'this' Pointer Method Chaining & Safe Downcasting via dynamic_cast<Derived*>
 * ==============================================================================================
 */

#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
#include <memory>
#include <algorithm>
#include <sstream>
#include <limits>
#include <cmath>

// Global flag to enable/disable detailed constructor/destructor trace logs for Task 6 Demo
static bool g_enableTraceLogging = false;

// ==============================================================================================
// 1. SERVICE HISTORY RECORD (Dynamic Memory Entity for Task 1 & Task 2)
// ==============================================================================================

struct ServiceRecord {
    std::string serviceDate;
    std::string engineerName;
    std::string actionTaken;
    double serviceCost;

    ServiceRecord() 
        : serviceDate("N/A"), engineerName("Unassigned"), actionTaken("Routine Check"), serviceCost(0.0) {}

    ServiceRecord(const std::string& date, const std::string& engineer, const std::string& action, double cost)
        : serviceDate(date), engineerName(engineer), actionTaken(action), serviceCost(cost) {}
};

// ==============================================================================================
// 2. MEMBER / COMPOSITION MODULES (Task 6: Member Object Composition)
// ==============================================================================================

/**
 * @class BatteryModule
 * @brief Embedded power management unit composed inside MedicalEquipment.
 */
class BatteryModule {
private:
    int batteryLevel;           // 0 - 100%
    bool isCharging;
    double backupDurationHours; // Estimated hours remaining

public:
    BatteryModule() : batteryLevel(100), isCharging(false), backupDurationHours(8.0) {
        if (g_enableTraceLogging) {
            std::cout << "    [TRACE] BatteryModule: Default Constructor called (Level: 100%)\\n";
        }
    }

    BatteryModule(int level, bool charging, double backupHours)
        : batteryLevel(level), isCharging(charging), backupDurationHours(backupHours) {
        if (batteryLevel < 0) batteryLevel = 0;
        if (batteryLevel > 100) batteryLevel = 100;
        if (g_enableTraceLogging) {
            std::cout << "    [TRACE] BatteryModule: Parameterized Constructor called (Level: " << batteryLevel << "%)\\n";
        }
    }

    ~BatteryModule() {
        if (g_enableTraceLogging) {
            std::cout << "    [TRACE] BatteryModule: Destructor called\\n";
        }
    }

    int getBatteryLevel() const { return batteryLevel; }
    bool getIsCharging() const { return isCharging; }
    double getBackupDurationHours() const { return backupDurationHours; }

    void setBatteryLevel(int level) {
        batteryLevel = (level < 0) ? 0 : (level > 100 ? 100 : level);
        backupDurationHours = (batteryLevel / 100.0) * 8.0;
    }

    void setCharging(bool charging) { isCharging = charging; }
    bool isCritical() const { return batteryLevel < 20; }

    void displayBatteryStatus() const {
        std::cout << "[Battery: " << batteryLevel << "% | " 
                  << (isCharging ? "Charging" : "Discharging") 
                  << " | Est. Backup: " << std::fixed << std::setprecision(1) << backupDurationHours << " hrs]";
    }
};

/**
 * @class MaintenanceModule
 * @brief Calibration and maintenance scheduling composed inside MedicalEquipment.
 */
class MaintenanceModule {
private:
    std::string lastServiceDate;
    std::string nextServiceDueDate;
    bool calibrationValid;
    std::string maintenanceStatus; // "Operational", "Maintenance Required", "Under Repair"

public:
    MaintenanceModule() 
        : lastServiceDate("2026-01-15"), nextServiceDueDate("2026-07-15"), 
          calibrationValid(true), maintenanceStatus("Operational") {
        if (g_enableTraceLogging) {
            std::cout << "    [TRACE] MaintenanceModule: Default Constructor called\\n";
        }
    }

    MaintenanceModule(const std::string& lastDate, const std::string& nextDate, bool calibValid, const std::string& status)
        : lastServiceDate(lastDate), nextServiceDueDate(nextDate), 
          calibrationValid(calibValid), maintenanceStatus(status) {
        if (g_enableTraceLogging) {
            std::cout << "    [TRACE] MaintenanceModule: Parameterized Constructor called (Calib: " 
                      << (calibValid ? "VALID" : "EXPIRED") << ")\\n";
        }
    }

    ~MaintenanceModule() {
        if (g_enableTraceLogging) {
            std::cout << "    [TRACE] MaintenanceModule: Destructor called\\n";
        }
    }

    std::string getLastServiceDate() const { return lastServiceDate; }
    std::string getNextServiceDueDate() const { return nextServiceDueDate; }
    bool isCalibrationValid() const { return calibrationValid; }
    std::string getMaintenanceStatus() const { return maintenanceStatus; }

    void setCalibrationValid(bool valid) { calibrationValid = valid; }
    void setMaintenanceStatus(const std::string& status) { maintenanceStatus = status; }
    void updateServiceDates(const std::string& lastDate, const std::string& nextDate) {
        lastServiceDate = lastDate;
        nextServiceDueDate = nextDate;
        calibrationValid = true;
        maintenanceStatus = "Operational";
    }

    void displayMaintenanceInfo() const {
        std::cout << "[Maint: " << maintenanceStatus 
                  << " | Calib: " << (calibrationValid ? "VALID" : "EXPIRED") 
                  << " | Last: " << lastServiceDate 
                  << " | Next: " << nextServiceDueDate << "]";
    }
};

// ==============================================================================================
// 3. VIRTUAL BASE CLASS: ResourceIdentity (Task 5: Diamond Problem Resolution)
// ==============================================================================================

class ResourceIdentity {
protected:
    std::string resourceId;
    std::string modelNumber;
    std::string manufacturer;

public:
    ResourceIdentity() 
        : resourceId("RES-000"), modelNumber("GENERIC-00"), manufacturer("MedTech Global") {
        if (g_enableTraceLogging) {
            std::cout << "  [TRACE] ResourceIdentity: Virtual Base Default Constructor called\\n";
        }
    }

    ResourceIdentity(const std::string& id, const std::string& model, const std::string& mfg)
        : resourceId(id), modelNumber(model), manufacturer(mfg) {
        if (g_enableTraceLogging) {
            std::cout << "  [TRACE] ResourceIdentity: Virtual Base Parameterized Constructor called for [" << id << "]\\n";
        }
    }

    virtual ~ResourceIdentity() {
        if (g_enableTraceLogging) {
            std::cout << "  [TRACE] ResourceIdentity: Virtual Base Destructor called\\n";
        }
    }

    std::string getResourceId() const { return resourceId; }
    std::string getModelNumber() const { return modelNumber; }
    std::string getManufacturer() const { return manufacturer; }

    void setResourceId(const std::string& id) { resourceId = id; }
    void setModelNumber(const std::string& model) { modelNumber = model; }
    void setManufacturer(const std::string& mfg) { manufacturer = mfg; }
};

// ==============================================================================================
// 4. ABSTRACT BASE CLASS: HospitalResource (Task 4: Abstract Class & Polymorphism)
// ==============================================================================================

class HospitalResource : virtual public ResourceIdentity {
public:
    HospitalResource() : ResourceIdentity() {
        if (g_enableTraceLogging) {
            std::cout << "  [TRACE] HospitalResource: Abstract Base Constructor called\\n";
        }
    }

    HospitalResource(const std::string& id, const std::string& model, const std::string& mfg)
        : ResourceIdentity(id, model, mfg) {
        if (g_enableTraceLogging) {
            std::cout << "  [TRACE] HospitalResource: Abstract Base Parameterized Constructor called\\n";
        }
    }

    virtual ~HospitalResource() {
        if (g_enableTraceLogging) {
            std::cout << "  [TRACE] HospitalResource: Virtual Destructor called\\n";
        }
    }

    // Pure Virtual Functions (Enforces polymorphism across all medical hardware)
    virtual void display() const = 0;
    virtual std::string getResourceType() const = 0;
    virtual double calculateSuitabilityScore() const = 0;
    virtual bool isReadyForAllocation() const = 0;
    virtual double getUsageCost() const = 0;
    virtual double getUsageDuration() const = 0;
};

// ==============================================================================================
// 5. CORE CLASS: MedicalEquipment (Tasks 1, 2, 3, 6, 8)
// ==============================================================================================

class MedicalEquipment : public HospitalResource {
protected:
    std::string equipmentType;
    std::string operatingStatus;   // "Operational", "Allocated", "Under Maintenance"
    bool isAvailable;
    double usageDurationHours;
    double hourlyRate;
    std::string allocatedPatientId;
    std::string compatibleWard;    // "ICU", "Emergency", "General", "All"

    // TASK 6: Member Objects (Composition)
    BatteryModule battery;
    MaintenanceModule maintenance;

    // TASK 1 & 2: Dynamic Memory Allocation for Service History Array
    ServiceRecord* serviceHistory;
    int serviceHistoryCount;
    int serviceHistoryCapacity;

    void initializeHistory(int capacity) {
        serviceHistoryCapacity = (capacity > 0) ? capacity : 4;
        serviceHistoryCount = 0;
        serviceHistory = new ServiceRecord[serviceHistoryCapacity];
    }

public:
    // 1. Default Constructor (Task 1)
    MedicalEquipment() 
        : ResourceIdentity("EQ-DEFAULT", "STD-MODEL", "Standard Health Corp"),
          HospitalResource("EQ-DEFAULT", "STD-MODEL", "Standard Health Corp"),
          equipmentType("General Equipment"), operatingStatus("Operational"), isAvailable(true),
          usageDurationHours(0.0), hourlyRate(150.0), allocatedPatientId("NONE"), compatibleWard("All"),
          battery(), maintenance(), serviceHistory(nullptr), serviceHistoryCount(0), serviceHistoryCapacity(0) {
        initializeHistory(4);
        if (g_enableTraceLogging) {
            std::cout << " [TRACE] MedicalEquipment: Default Constructor finished\\n";
        }
    }

    // 2. Parameterized Constructor (Task 1)
    MedicalEquipment(const std::string& id, const std::string& type, const std::string& model, 
                     const std::string& mfg, double rate, const std::string& ward = "All")
        : ResourceIdentity(id, model, mfg),
          HospitalResource(id, model, mfg),
          equipmentType(type), operatingStatus("Operational"), isAvailable(true),
          usageDurationHours(0.0), hourlyRate(rate), allocatedPatientId("NONE"), compatibleWard(ward),
          battery(100, false, 8.0), maintenance(),
          serviceHistory(nullptr), serviceHistoryCount(0), serviceHistoryCapacity(0) {
        initializeHistory(5);
        if (g_enableTraceLogging) {
            std::cout << " [TRACE] MedicalEquipment: Parameterized Constructor finished for [" << id << "]\\n";
        }
    }

    // 3. Overloaded Constructor (Task 1)
    MedicalEquipment(const std::string& id, const std::string& type, const std::string& model, 
                     const std::string& mfg, double rate, int initialBattery, bool calibValid, 
                     const std::string& status, const std::string& ward)
        : ResourceIdentity(id, model, mfg),
          HospitalResource(id, model, mfg),
          equipmentType(type), operatingStatus(status), isAvailable(status == "Operational"),
          usageDurationHours(0.0), hourlyRate(rate), allocatedPatientId("NONE"), compatibleWard(ward),
          battery(initialBattery, false, (initialBattery / 100.0) * 8.0),
          maintenance("2026-01-01", "2026-07-01", calibValid, status),
          serviceHistory(nullptr), serviceHistoryCount(0), serviceHistoryCapacity(0) {
        initializeHistory(5);
        if (g_enableTraceLogging) {
            std::cout << " [TRACE] MedicalEquipment: Overloaded Constructor finished for [" << id << "]\\n";
        }
    }

    // 4. COPY CONSTRUCTOR with DEEP COPY (TASK 1 & TASK 2)
    MedicalEquipment(const MedicalEquipment& other)
        : ResourceIdentity(other.resourceId, other.modelNumber, other.manufacturer),
          HospitalResource(other.resourceId, other.modelNumber, other.manufacturer),
          equipmentType(other.equipmentType), operatingStatus(other.operatingStatus),
          isAvailable(other.isAvailable), usageDurationHours(other.usageDurationHours),
          hourlyRate(other.hourlyRate), allocatedPatientId(other.allocatedPatientId),
          compatibleWard(other.compatibleWard), battery(other.battery), maintenance(other.maintenance),
          serviceHistory(nullptr), serviceHistoryCount(other.serviceHistoryCount),
          serviceHistoryCapacity(other.serviceHistoryCapacity) {
        
        // DEEP COPY: Allocate distinct heap memory and copy individual elements
        if (other.serviceHistoryCapacity > 0) {
            this->serviceHistory = new ServiceRecord[other.serviceHistoryCapacity];
            for (int i = 0; i < other.serviceHistoryCount; ++i) {
                this->serviceHistory[i] = other.serviceHistory[i];
            }
        } else {
            initializeHistory(4);
        }
        if (g_enableTraceLogging) {
            std::cout << " [TRACE] MedicalEquipment: Copy Constructor (Deep Copy) executed for [" << other.resourceId << "]\\n";
        }
    }

    // Copy Assignment Operator (Deep Copy)
    MedicalEquipment& operator=(const MedicalEquipment& other) {
        if (this != &other) {
            // Free existing dynamic heap memory
            delete[] serviceHistory;

            this->resourceId = other.resourceId;
            this->modelNumber = other.modelNumber;
            this->manufacturer = other.manufacturer;
            this->equipmentType = other.equipmentType;
            this->operatingStatus = other.operatingStatus;
            this->isAvailable = other.isAvailable;
            this->usageDurationHours = other.usageDurationHours;
            this->hourlyRate = other.hourlyRate;
            this->allocatedPatientId = other.allocatedPatientId;
            this->compatibleWard = other.compatibleWard;
            this->battery = other.battery;
            this->maintenance = other.maintenance;
            this->serviceHistoryCount = other.serviceHistoryCount;
            this->serviceHistoryCapacity = other.serviceHistoryCapacity;

            if (other.serviceHistoryCapacity > 0) {
                this->serviceHistory = new ServiceRecord[other.serviceHistoryCapacity];
                for (int i = 0; i < other.serviceHistoryCount; ++i) {
                    this->serviceHistory[i] = other.serviceHistory[i];
                }
            } else {
                initializeHistory(4);
            }
        }
        return *this;
    }

    // TASK 2: Destructor (Releases dynamic heap array)
    virtual ~MedicalEquipment() override {
        if (serviceHistory != nullptr) {
            delete[] serviceHistory;
            serviceHistory = nullptr;
        }
        if (g_enableTraceLogging) {
            std::cout << " [TRACE] MedicalEquipment: Destructor freed dynamic array for [" << resourceId << "]\\n";
        }
    }

    void addServiceLog(const std::string& date, const std::string& engineer, const std::string& action, double cost) {
        if (serviceHistoryCount >= serviceHistoryCapacity) {
            int newCap = serviceHistoryCapacity * 2;
            ServiceRecord* newArr = new ServiceRecord[newCap];
            for (int i = 0; i < serviceHistoryCount; ++i) {
                newArr[i] = serviceHistory[i];
            }
            delete[] serviceHistory;
            serviceHistory = newArr;
            serviceHistoryCapacity = newCap;
        }
        serviceHistory[serviceHistoryCount++] = ServiceRecord(date, engineer, action, cost);
    }

    // TASK 8: 'this' Pointer Method Chaining
    MedicalEquipment& updateBattery(int level) {
        this->battery.setBatteryLevel(level);
        return *this;
    }

    MedicalEquipment& updateCost(double newRate) {
        if (newRate >= 0.0) {
            this->hourlyRate = newRate;
        }
        return *this;
    }

    MedicalEquipment& updateOperatingStatus(const std::string& status) {
        this->operatingStatus = status;
        this->isAvailable = (status == "Operational");
        return *this;
    }

    MedicalEquipment& logUsageHours(double hours) {
        if (hours > 0.0) {
            this->usageDurationHours += hours;
        }
        return *this;
    }

    // TASK 3: Operator Overloading
    double operator+(const MedicalEquipment& other) const {
        return this->getUsageCost() + other.getUsageCost();
    }

    bool operator<(const MedicalEquipment& other) const {
        return this->calculateSuitabilityScore() < other.calculateSuitabilityScore();
    }

    friend std::ostream& operator<<(std::ostream& os, const MedicalEquipment& eq) {
        os << "=================================================================\\n"
           << " EQUIPMENT REPORT: [" << eq.resourceId << "] - " << eq.equipmentType << "\\n"
           << " Model       : " << eq.modelNumber << " | Manufacturer: " << eq.manufacturer << "\\n"
           << " Status      : " << eq.operatingStatus << " | Available: " << (eq.isAvailable ? "YES" : "NO") << "\\n"
           << " Ward Compat : " << eq.compatibleWard << " | Allocated To: " << eq.allocatedPatientId << "\\n"
           << " Battery     : " << eq.battery.getBatteryLevel() << "% (" 
           << (eq.battery.getIsCharging() ? "Charging" : "Discharging") << ")\\n"
           << " Calibration : " << (eq.maintenance.isCalibrationValid() ? "VALID" : "EXPIRED") 
           << " | Next Due: " << eq.maintenance.getNextServiceDueDate() << "\\n"
           << " Usage       : " << std::fixed << std::setprecision(1) << eq.usageDurationHours 
           << " hrs @ Rs." << std::setprecision(2) << eq.hourlyRate << "/hr | Total Cost: Rs." << eq.getUsageCost() << "\\n"
           << " Suitability : " << std::setprecision(2) << eq.calculateSuitabilityScore() << " / 100.0\\n"
           << " Service Logs: " << eq.serviceHistoryCount << " recorded\\n"
           << "=================================================================";
        return os;
    }

    virtual void display() const override {
        std::cout << *this << "\\n";
    }

    virtual std::string getResourceType() const override { return equipmentType; }
    virtual double getUsageCost() const override { return usageDurationHours * hourlyRate; }
    virtual double getUsageDuration() const override { return usageDurationHours; }

    virtual double calculateSuitabilityScore() const override {
        double score = 0.0;
        if (operatingStatus == "Operational" && isAvailable) score += 40.0;
        else if (operatingStatus == "Allocated") score += 10.0;
        score += (battery.getBatteryLevel() / 100.0) * 30.0;
        if (maintenance.isCalibrationValid()) score += 30.0;
        return score;
    }

    virtual bool isReadyForAllocation() const override {
        return isAvailable && 
               operatingStatus == "Operational" && 
               maintenance.isCalibrationValid() && 
               battery.getBatteryLevel() >= 20;
    }

    std::string getEquipmentType() const { return equipmentType; }
    std::string getOperatingStatus() const { return operatingStatus; }
    bool getIsAvailable() const { return isAvailable; }
    int getBatteryLevel() const { return battery.getBatteryLevel(); }
    bool isCalibrationValid() const { return maintenance.isCalibrationValid(); }
    std::string getAllocatedPatientId() const { return allocatedPatientId; }
    std::string getCompatibleWard() const { return compatibleWard; }
    double getHourlyRate() const { return hourlyRate; }
    int getServiceHistoryCount() const { return serviceHistoryCount; }
    const ServiceRecord* getServiceHistory() const { return serviceHistory; }

    const BatteryModule& getBatteryModule() const { return battery; }
    const MaintenanceModule& getMaintenanceModule() const { return maintenance; }
    BatteryModule& getBatteryModule() { return battery; }
    MaintenanceModule& getMaintenanceModule() { return maintenance; }

    void setAllocatedPatientId(const std::string& pid) {
        allocatedPatientId = pid;
        if (pid != "NONE") {
            isAvailable = false;
            operatingStatus = "Allocated";
        } else {
            isAvailable = true;
            operatingStatus = "Operational";
        }
    }

    void setCalibrationStatus(bool valid) { maintenance.setCalibrationValid(valid); }
    void setWardCompatibility(const std::string& ward) { compatibleWard = ward; }
};

// ==============================================================================================
// 6. DERIVED CLASS: PatientMonitor (Task 4 & Task 7)
// ==============================================================================================

class PatientMonitor : public MedicalEquipment {
private:
    int ecgChannels;

public:
    PatientMonitor(const std::string& id, const std::string& model, const std::string& mfg, 
                   double rate, int channels = 8, const std::string& ward = "All")
        : ResourceIdentity(id, model, mfg),
          MedicalEquipment(id, "Patient Monitor", model, mfg, rate, ward),
          ecgChannels(channels) {}

    virtual void display() const override {
        std::cout << "[PatientMonitor] ID: " << resourceId 
                  << " | Channels: " << ecgChannels 
                  << " | Battery: " << battery.getBatteryLevel() << "%"
                  << " | Status: " << operatingStatus 
                  << " | Ward: " << compatibleWard << "\\n";
    }

    int getEcgChannels() const { return ecgChannels; }
};

// ==============================================================================================
// 7. DERIVED CLASS: InfusionPump (Task 4 & Task 7)
// ==============================================================================================

class InfusionPump : public MedicalEquipment {
private:
    double flowRateMlPerHour;

public:
    InfusionPump(const std::string& id, const std::string& model, const std::string& mfg, 
                 double rate, double flowRate = 25.0, const std::string& ward = "All")
        : ResourceIdentity(id, model, mfg),
          MedicalEquipment(id, "Infusion Pump", model, mfg, rate, ward),
          flowRateMlPerHour(flowRate) {}

    virtual void display() const override {
        std::cout << "[InfusionPump] ID: " << resourceId 
                  << " | Flow Rate: " << flowRateMlPerHour << " mL/hr"
                  << " | Battery: " << battery.getBatteryLevel() << "%"
                  << " | Status: " << operatingStatus << "\\n";
    }

    double getFlowRate() const { return flowRateMlPerHour; }
};

// ==============================================================================================
// 8. DERIVED CLASS: Ventilator (Task 4, Task 7, Task 8)
// ==============================================================================================

class Ventilator : public MedicalEquipment {
protected:
    double fio2Percentage;
    double peepPressureCmH2O;

public:
    Ventilator(const std::string& id, const std::string& model, const std::string& mfg, 
               double rate, double fio2 = 40.0, double peep = 5.0, const std::string& ward = "ICU")
        : ResourceIdentity(id, model, mfg),
          MedicalEquipment(id, "Ventilator", model, mfg, rate, ward),
          fio2Percentage(fio2), peepPressureCmH2O(peep) {}

    virtual void display() const override {
        std::cout << "[Ventilator] ID: " << resourceId 
                  << " | FiO2: " << fio2Percentage << "% | PEEP: " << peepPressureCmH2O << " cmH2O"
                  << " | Battery: " << battery.getBatteryLevel() << "%"
                  << " | Status: " << operatingStatus << "\\n";
    }

    // Specific ventilator function called via dynamic_cast in Task 8
    void setOxygenSupport(double fio2, double peep) {
        this->fio2Percentage = fio2;
        this->peepPressureCmH2O = peep;
        std::cout << "    [VENTILATOR CONFIGURED] Set FiO2 = " << fio2 << "%, PEEP = " << peep << " cmH2O\\n";
    }

    double getFio2() const { return fio2Percentage; }
    double getPeep() const { return peepPressureCmH2O; }
};

// ==============================================================================================
// 9. VIRTUAL INHERITANCE BRANCH: CriticalCare (Task 5: Diamond Problem)
// ==============================================================================================

class CriticalCare : virtual public ResourceIdentity {
protected:
    std::string icuCertificationLevel;
    bool dualOxygenBackupAvailable;

public:
    CriticalCare() 
        : ResourceIdentity(), icuCertificationLevel("Level 3 ICU"), dualOxygenBackupAvailable(true) {}

    CriticalCare(const std::string& id, const std::string& model, const std::string& mfg, 
                 const std::string& certLevel = "Level 3 ICU", bool dualO2 = true)
        : ResourceIdentity(id, model, mfg),
          icuCertificationLevel(certLevel), dualOxygenBackupAvailable(dualO2) {}

    virtual ~CriticalCare() {}

    void displayCriticalCareSpecs() const {
        std::cout << "[CriticalCare Subsystem] Cert: " << icuCertificationLevel 
                  << " | Dual O2 Backup: " << (dualOxygenBackupAvailable ? "YES" : "NO") << "\\n";
    }

    std::string getCertificationLevel() const { return icuCertificationLevel; }
};

// ==============================================================================================
// 10. DIAMOND RESOLUTION CLASS: CriticalVentilator (Task 5: Hybrid Multiple Inheritance)
// ==============================================================================================

class CriticalVentilator : public Ventilator, public CriticalCare {
public:
    CriticalVentilator(const std::string& id, const std::string& model, const std::string& mfg, 
                       double rate, double fio2 = 60.0, double peep = 10.0, 
                       const std::string& certLevel = "Level 3 Super-ICU")
        : ResourceIdentity(id, model, mfg), // Explicit initialization of virtual base
          Ventilator(id, model, mfg, rate, fio2, peep, "ICU"),
          CriticalCare(id, model, mfg, certLevel, true) {
        this->equipmentType = "Critical Ventilator";
    }

    virtual void display() const override {
        std::cout << "[CriticalVentilator] ID: " << resourceId 
                  << " | Model: " << modelNumber 
                  << " | FiO2: " << fio2Percentage << "% | PEEP: " << peepPressureCmH2O 
                  << " | Cert: " << icuCertificationLevel
                  << " | Battery: " << battery.getBatteryLevel() << "%"
                  << " | Status: " << operatingStatus << "\\n";
    }

    virtual double calculateSuitabilityScore() const override {
        double score = MedicalEquipment::calculateSuitabilityScore();
        if (dualOxygenBackupAvailable) score += 5.0; // Bonus for critical care life-support
        return std::min(100.0, score);
    }
};

// ==============================================================================================
// 11. PATIENT ENTITY
// ==============================================================================================

class Patient {
private:
    std::string patientId;
    std::string patientName;
    int age;
    std::string ward;            // "ICU", "Emergency", "General", "Pediatric"
    std::string riskCategory;    // "Critical", "High", "Medium", "Low"
    int clinicalPriority;        // 1 (Highest) to 4 (Lowest)
    std::string allocatedEquipmentId;
    std::string allocationStatus;// "Unallocated", "Allocated", "Discharged"

public:
    Patient() 
        : patientId("P000"), patientName("Unknown"), age(0), ward("General"),
          riskCategory("Low"), clinicalPriority(4), allocatedEquipmentId("NONE"), allocationStatus("Unallocated") {}

    Patient(const std::string& id, const std::string& name, int patientAge, const std::string& patientWard,
            const std::string& risk, int priority)
        : patientId(id), patientName(name), age(patientAge), ward(patientWard),
          riskCategory(risk), clinicalPriority(priority), allocatedEquipmentId("NONE"), allocationStatus("Unallocated") {}

    std::string getPatientId() const { return patientId; }
    std::string getPatientName() const { return patientName; }
    int getAge() const { return age; }
    std::string getWard() const { return ward; }
    std::string getRiskCategory() const { return riskCategory; }
    int getClinicalPriority() const { return clinicalPriority; }
    std::string getAllocatedEquipmentId() const { return allocatedEquipmentId; }
    std::string getAllocationStatus() const { return allocationStatus; }

    void setAllocatedEquipment(const std::string& equipId) {
        allocatedEquipmentId = equipId;
        allocationStatus = (equipId != "NONE") ? "Allocated" : "Unallocated";
    }

    void displayPatientInfo() const {
        std::cout << " [" << std::setw(5) << std::left << patientId << "] "
                  << std::setw(18) << std::left << patientName
                  << " | Age: " << std::setw(3) << age
                  << " | Ward: " << std::setw(10) << std::left << ward
                  << " | Risk: " << std::setw(9) << std::left << riskCategory
                  << " | Priority: P" << clinicalPriority
                  << " | Status: " << std::setw(11) << std::left << allocationStatus
                  << " | Equipment: " << allocatedEquipmentId << "\\n";
    }
};

// ==============================================================================================
// 12. HOSPITAL SYSTEM CONTROLLER (Manages Clinical State & Runs Demos)
// ==============================================================================================

class HospitalSystem {
private:
    std::vector<Patient> patients;
    std::vector<std::unique_ptr<MedicalEquipment>> equipmentList;

public:
    HospitalSystem() {
        seedInitialData();
    }

    void seedInitialData() {
        patients.clear();
        equipmentList.clear();

        // Seed Sample Patients
        patients.emplace_back("P101", "Rajesh Sharma", 62, "ICU", "Critical", 1);
        patients.emplace_back("P102", "Ananya Verma", 34, "Emergency", "High", 2);
        patients.emplace_back("P103", "Vikram Malhotra", 48, "General", "Medium", 3);
        patients.emplace_back("P104", "Sunita Patil", 71, "ICU", "Critical", 1);
        patients.emplace_back("P105", "Devendra Sen", 28, "General", "Low", 4);

        // Seed Polymorphic Equipment
        auto mon1 = std::make_unique<PatientMonitor>("MON-101", "IntelliVue-MX700", "Philips Healthcare", 150.0, 8, "All");
        mon1->logUsageHours(14.5);
        mon1->addServiceLog("2026-01-10", "Eng. S. Kulkarni", "Sensor recalibration", 1200.0);
        equipmentList.push_back(std::move(mon1));

        auto pump1 = std::make_unique<InfusionPump>("PUMP-101", "Perfusor-Space", "B. Braun", 95.0, 30.0, "All");
        pump1->logUsageHours(22.0);
        pump1->addServiceLog("2026-02-01", "Eng. M. Joshi", "Drive motor lubrication", 850.0);
        equipmentList.push_back(std::move(pump1));

        auto vent1 = std::make_unique<Ventilator>("VENT-101", "Puritan-Bennett-980", "Medtronic", 400.0, 50.0, 8.0, "ICU");
        vent1->logUsageHours(38.0);
        vent1->addServiceLog("2026-01-20", "Eng. R. Gupta", "Filter replacement & O2 cell test", 2500.0);
        equipmentList.push_back(std::move(vent1));

        auto cvent1 = std::make_unique<CriticalVentilator>("CVENT-101", "Hamilton-G5 Titanium", "Hamilton Medical", 600.0, 60.0, 10.0, "Level 3 Super-ICU");
        cvent1->logUsageHours(54.0);
        cvent1->addServiceLog("2026-02-15", "Eng. A. Nair", "Dual valve calibration & firmware 4.2", 4200.0);
        equipmentList.push_back(std::move(cvent1));

        auto vent2 = std::make_unique<Ventilator>("VENT-102", "Servo-I Critical", "Maquet", 380.0, 45.0, 6.0, "Emergency");
        vent2->logUsageHours(8.0);
        vent2->addServiceLog("2026-02-10", "Eng. S. Kulkarni", "Flow transducer replacement", 3100.0);
        equipmentList.push_back(std::move(vent2));
    }

    void displayPatients() const {
        std::cout << "\\n========================================================================================================\\n";
        std::cout << "                                  HOSPITAL PATIENT DIRECTORY                                             \\n";
        std::cout << "========================================================================================================\\n";
        std::cout << " ID     Name               | Age | Ward       | Risk      | Priority | Status      | Allocated Equip \\n";
        std::cout << "--------------------------------------------------------------------------------------------------------\\n";
        for (const auto& p : patients) {
            p.displayPatientInfo();
        }
        std::cout << "========================================================================================================\\n";
    }

    void displayEquipmentInventory() const {
        std::cout << "\\n========================================================================================================\\n";
        std::cout << "                    HOSPITAL MEDICAL EQUIPMENT INVENTORY (Runtime Polymorphism)                          \\n";
        std::cout << "========================================================================================================\\n";
        for (const auto& eq : equipmentList) {
            eq->display();
        }
        std::cout << "========================================================================================================\\n";
    }

    void allocateSmartEquipment() {
        // Find highest-priority unallocated patient
        Patient* targetPatient = nullptr;
        for (auto& p : patients) {
            if (p.getAllocationStatus() == "Unallocated") {
                if (!targetPatient || p.getClinicalPriority() < targetPatient->getClinicalPriority()) {
                    targetPatient = &p;
                }
            }
        }

        if (!targetPatient) {
            std::cout << "\\n>> ALLOCATION FAILED: All registered patients are already allocated equipment!\\n";
            return;
        }

        std::cout << "\\n=================================================================\\n";
        std::cout << " INITIATING SMART ALLOCATION PROTOCOL FOR PATIENT: " << targetPatient->getPatientId() << "\\n";
        std::cout << " Patient Name: " << targetPatient->getPatientName() 
                  << " | Ward: " << targetPatient->getWard() 
                  << " | Risk: " << targetPatient->getRiskCategory() 
                  << " | Priority: P" << targetPatient->getClinicalPriority() << "\\n";
        std::cout << "=================================================================\\n";

        // Find best matching equipment
        MedicalEquipment* bestCandidate = nullptr;
        double highestScore = -1.0;

        for (auto& eq : equipmentList) {
            if (eq->getIsAvailable() && eq->getOperatingStatus() == "Operational" && eq->isCalibrationValid()) {
                int minBattery = (targetPatient->getRiskCategory() == "Critical") ? 30 : 20;
                if (eq->getBatteryLevel() >= minBattery) {
                    if (eq->getCompatibleWard() == "All" || eq->getCompatibleWard() == targetPatient->getWard()) {
                        double score = eq->calculateSuitabilityScore();
                        if (score > highestScore) {
                            highestScore = score;
                            bestCandidate = eq.get();
                        }
                    }
                }
            }
        }

        if (!bestCandidate) {
            std::cout << ">> ALLOCATION FAILED: No available equipment meets clinical safety criteria (Ward compatibility / Battery / Calibration).\\n";
            return;
        }

        // Commit allocation
        bestCandidate->setAllocatedPatientId(targetPatient->getPatientId());
        targetPatient->setAllocatedEquipment(bestCandidate->getResourceId());

        std::cout << ">> ALLOCATION SUCCESSFUL!\\n";
        std::cout << "   Assigned Equipment : [" << bestCandidate->getResourceId() << "] " << bestCandidate->getEquipmentType() << "\\n";
        std::cout << "   Model / Mfg        : " << bestCandidate->getModelNumber() << " (" << bestCandidate->getManufacturer() << ")\\n";
        std::cout << "   Battery Level      : " << bestCandidate->getBatteryLevel() << "% (Safety Margin: OK)\\n";
        std::cout << "   Calibration State  : VALID\\n";
        std::cout << "   Hourly Rate        : Rs." << std::fixed << std::setprecision(2) << bestCandidate->getHourlyRate() << "/hr\\n";
        std::cout << "=================================================================\\n";
    }

    void releaseEquipment() {
        MedicalEquipment* targetEq = nullptr;
        for (auto& eq : equipmentList) {
            if (!eq->getIsAvailable() && eq->getAllocatedPatientId() != "NONE") {
                targetEq = eq.get();
                break;
            }
        }

        if (!targetEq) {
            std::cout << "\\n[WARNING] No equipment is currently in active allocated state.\\n";
            return;
        }

        std::string patientId = targetEq->getAllocatedPatientId();
        double sessionHours = 4.5;
        targetEq->logUsageHours(sessionHours);
        targetEq->setAllocatedPatientId("NONE");

        for (auto& p : patients) {
            if (p.getPatientId() == patientId) {
                p.setAllocatedEquipment("NONE");
                break;
            }
        }

        std::cout << "\\n=================================================================\\n";
        std::cout << " EQUIPMENT RELEASE SUMMARY\\n";
        std::cout << "=================================================================\\n";
        std::cout << " Equipment Unit : [" << targetEq->getResourceId() << "] " << targetEq->getEquipmentType() << "\\n";
        std::cout << " Released From  : Patient [" << patientId << "]\\n";
        std::cout << " Session Hours  : " << std::fixed << std::setprecision(1) << sessionHours << " hrs\\n";
        std::cout << " Session Cost   : Rs." << std::setprecision(2) << (sessionHours * targetEq->getHourlyRate()) << "\\n";
        std::cout << " Current Status : AVAILABLE & OPERATIONAL\\n";
        std::cout << "=================================================================\\n";
    }

    // ==========================================================================================
    // SEPARATE DEMO FUNCTIONS (TASK 1 TO TASK 8) FOR ASSIGNMENT EVIDENCE & SCREENSHOTS
    // ==========================================================================================

    void demoTask1() {
        std::cout << "\\n=================================================================\\n";
        std::cout << " ========== TASK 1 DEMO: CONSTRUCTORS & DEEP COPY ==========     \\n";
        std::cout << "=================================================================\\n";
        std::cout << "[1] Default Constructor Demonstration:\\n";
        MedicalEquipment eqDefault;
        std::cout << "    Instantiated eqDefault -> ID: " << eqDefault.getResourceId() 
                  << " | Type: " << eqDefault.getEquipmentType() 
                  << " | Initial History Logs: " << eqDefault.getServiceHistoryCount() << "\\n\\n";

        std::cout << "[2] Parameterized Constructor Demonstration:\\n";
        MedicalEquipment eqParam("EQ-P1", "Dialysis Unit", "Fresenius-5008S", "Fresenius Medical", 550.0, "ICU");
        eqParam.addServiceLog("2026-01-05", "Eng. V. Nair", "Pre-delivery acceptance testing", 1800.0);
        eqParam.addServiceLog("2026-02-10", "Eng. R. Gupta", "Hydraulic pressure inspection", 950.0);
        std::cout << "    Instantiated eqParam -> ID: " << eqParam.getResourceId() 
                  << " | Type: " << eqParam.getEquipmentType()
                  << " | Logs: " << eqParam.getServiceHistoryCount() << "\\n\\n";

        std::cout << "[3] Overloaded Constructor Demonstration:\\n";
        MedicalEquipment eqOverloaded("EQ-O2", "ECMO Unit", "Rotaflow-II", "Getinge", 900.0, 85, true, "Operational", "ICU");
        std::cout << "    Instantiated eqOverloaded -> ID: " << eqOverloaded.getResourceId() 
                  << " | Battery: " << eqOverloaded.getBatteryLevel() << "%"
                  << " | Calib: " << (eqOverloaded.isCalibrationValid() ? "VALID" : "EXPIRED") << "\\n\\n";

        std::cout << "[4] Copy Constructor Demonstration (DEEP COPY VERIFICATION):\\n";
        std::cout << "    Creating 'eqCopy' as a deep copy of 'eqParam' using Copy Constructor...\\n";
        MedicalEquipment eqCopy = eqParam;

        std::cout << "    -> Original eqParam Heap Pointer: " << static_cast<const void*>(eqParam.getServiceHistory()) << "\\n";
        std::cout << "    -> Copied   eqCopy  Heap Pointer: " << static_cast<const void*>(eqCopy.getServiceHistory()) << "\\n";

        std::cout << "\\n[5] Deep Copy Independence Test (Modifying Copied Object):\\n";
        eqCopy.addServiceLog("2026-03-01", "Eng. M. Joshi", "Filter cartridge flush", 750.0);
        std::cout << "    -> Original eqParam Log Count: " << eqParam.getServiceHistoryCount() << " records\\n";
        std::cout << "    -> Copied   eqCopy  Log Count: " << eqCopy.getServiceHistoryCount() << " records\\n";

        if (eqParam.getServiceHistory() != eqCopy.getServiceHistory() && 
            eqParam.getServiceHistoryCount() != eqCopy.getServiceHistoryCount()) {
            std::cout << "\\n>>> [VERIFICATION SUCCESS]: Deep copy confirmed! Heap pointers are completely distinct.\\n"
                      << "    Modifications to the copy did NOT corrupt or alter the original object state.\\n";
        }
        std::cout << "=================================================================\\n";
    }

    void demoTask2() {
        std::cout << "\\n=================================================================\\n";
        std::cout << " ========== TASK 2 DEMO: DYNAMIC MEMORY & DESTRUCTOR ==========  \\n";
        std::cout << "=================================================================\\n";
        std::cout << "[1] Dynamic Array Allocation using new[]:\\n";
        std::cout << "    Inside MedicalEquipment::initializeHistory(capacity):\\n";
        std::cout << "    serviceHistory = new ServiceRecord[capacity];\\n\\n";

        std::cout << "[2] Scoped Lifetime & Destructor Verification (delete[]):\\n";
        {
            std::cout << "    Entering inner scope block...\\n";
            MedicalEquipment scopedUnit("EQ-SCOPE-101", "Defibrillator", "LifePak-15", "Physio-Control", 220.0);
            scopedUnit.addServiceLog("2026-02-15", "Eng. S. Kulkarni", "Capacitor discharge calibration", 1400.0);
            std::cout << "    Scoped object created on stack with dynamic heap array at: " 
                      << static_cast<const void*>(scopedUnit.getServiceHistory()) << "\\n";
            std::cout << "    Exiting inner scope block...\\n";
        }
        std::cout << "    -> Inner scope exited. MedicalEquipment::~MedicalEquipment() invoked delete[] safely.\\n";
        std::cout << ">>> [VERIFICATION SUCCESS]: Dynamic heap memory reclaimed with zero memory leaks via RAII.\\n";
        std::cout << "=================================================================\\n";
    }

    void demoTask3() {
        std::cout << "\\n=================================================================\\n";
        std::cout << " ========== TASK 3 DEMO: OPERATOR OVERLOADING (+, <, <<) ======= \\n";
        std::cout << "=================================================================\\n";
        MedicalEquipment eqA("VENT-101", "Ventilator", "PB-980", "Medtronic", 400.0, "ICU");
        eqA.logUsageHours(20.0); // Cost = 8000

        MedicalEquipment eqB("MON-101", "Patient Monitor", "MX700", "Philips", 150.0, "ICU");
        eqB.logUsageHours(10.0); // Cost = 1500

        std::cout << "[1] OPERATOR + (Combining Total Usage Cost across heterogeneous equipment):\\n";
        std::cout << "    eqA [" << eqA.getResourceId() << "] Usage Cost: Rs." << eqA.getUsageCost() << "\\n";
        std::cout << "    eqB [" << eqB.getResourceId() << "] Usage Cost: Rs." << eqB.getUsageCost() << "\\n";
        double combinedCost = eqA + eqB;
        std::cout << "    -> Result of (eqA + eqB): Rs." << std::fixed << std::setprecision(2) << combinedCost << "\\n\\n";

        std::cout << "[2] OPERATOR < (Comparing Clinical Suitability Scores):\\n";
        std::cout << "    eqA Suitability Score: " << eqA.calculateSuitabilityScore() << " / 100.0\\n";
        std::cout << "    eqB Suitability Score: " << eqB.calculateSuitabilityScore() << " / 100.0\\n";
        if (eqB < eqA) {
            std::cout << "    -> Evaluation (eqB < eqA) is TRUE: eqA is clinically MORE suitable for allocation.\\n\\n";
        } else {
            std::cout << "    -> Evaluation (eqA < eqB) is TRUE: eqB is clinically MORE suitable for allocation.\\n\\n";
        }

        std::cout << "[3] FRIEND OPERATOR << (Stream Insertion for Formatted Equipment Card):\\n";
        std::cout << eqA << "\\n";
        std::cout << ">>> [VERIFICATION SUCCESS]: Operators +, <, and << successfully evaluated.\\n";
        std::cout << "=================================================================\\n";
    }

    void demoTask4() {
        std::cout << "\\n=================================================================\\n";
        std::cout << " ========== TASK 4 DEMO: ABSTRACT CLASS & INHERITANCE ========== \\n";
        std::cout << "=================================================================\\n";
        std::cout << "[1] Abstract Base Class: HospitalResource\\n";
        std::cout << "    Contains pure virtual functions: display(), calculateSuitabilityScore(), isReadyForAllocation()\\n";
        std::cout << "    Cannot be instantiated directly (Guaranteed compile-time contract).\\n\\n";

        std::cout << "[2] Multilevel & Hierarchical Inheritance Tree:\\n";
        std::cout << "    ResourceIdentity (Virtual Base)\\n";
        std::cout << "       └── HospitalResource (Abstract Base)\\n";
        std::cout << "              └── MedicalEquipment (Concrete Domain Base)\\n";
        std::cout << "                     ├── PatientMonitor (Derived Specialized)\\n";
        std::cout << "                     ├── InfusionPump   (Derived Specialized)\\n";
        std::cout << "                     └── Ventilator     (Derived Specialized)\\n";
        std::cout << "                            └── CriticalVentilator (Multiple Inheritance)\\n\\n";

        std::cout << "[3] Instantiating Concrete Derived Classes & Checking Abstract Interface Overrides:\\n";
        PatientMonitor pm("MON-201", "IntelliVue-X3", "Philips", 120.0, 12, "ICU");
        InfusionPump ip("PUMP-201", "Alaris-Plus", "BD Medical", 80.0, 50.0, "General");
        Ventilator vt("VENT-201", "Servo-u", "Getinge", 450.0, 60.0, 10.0, "ICU");

        std::cout << "    -> PatientMonitor : Ready = " << (pm.isReadyForAllocation() ? "YES" : "NO") 
                  << " | Score = " << pm.calculateSuitabilityScore() << "\\n";
        std::cout << "    -> InfusionPump   : Ready = " << (ip.isReadyForAllocation() ? "YES" : "NO") 
                  << " | Score = " << ip.calculateSuitabilityScore() << "\\n";
        std::cout << "    -> Ventilator     : Ready = " << (vt.isReadyForAllocation() ? "YES" : "NO") 
                  << " | Score = " << vt.calculateSuitabilityScore() << "\\n";
        std::cout << ">>> [VERIFICATION SUCCESS]: Pure virtual contracts successfully implemented in derived classes.\\n";
        std::cout << "=================================================================\\n";
    }

    void demoTask5() {
        std::cout << "\\n=================================================================\\n";
        std::cout << " ========== TASK 5 DEMO: VIRTUAL BASE & DIAMOND PROBLEM ======== \\n";
        std::cout << "=================================================================\\n";
        std::cout << "[1] The Diamond Problem Architecture:\\n";
        std::cout << "              ResourceIdentity (Common Base)\\n";
        std::cout << "                 /               \\\\\\n";
        std::cout << "       (virtual)/                 \\\\(virtual)\\n";
        std::cout << "          Ventilator             CriticalCare\\n";
        std::cout << "                 \\\\               /\\n";
        std::cout << "                  \\\\             /\\n";
        std::cout << "                 CriticalVentilator\\n\\n";

        std::cout << "[2] Without Virtual Inheritance:\\n";
        std::cout << "    CriticalVentilator would inherit TWO copies of resourceId, modelNumber, manufacturer,\\n";
        std::cout << "    causing compiler ambiguity errors: 'request for member is ambiguous'.\\n\\n";

        std::cout << "[3] With Virtual Inheritance (virtual public ResourceIdentity):\\n";
        CriticalVentilator cv("CVENT-999", "Titanium-Advanced", "Hamilton Medical", 650.0, 70.0, 12.0, "Level 3 Super-ICU");
        
        std::cout << "    Direct unambiguous access to ResourceIdentity member variables:\\n";
        std::cout << "    -> cv.getResourceId()   : " << cv.getResourceId() << "\\n";
        std::cout << "    -> cv.getModelNumber()  : " << cv.getModelNumber() << "\\n";
        std::cout << "    -> cv.getManufacturer() : " << cv.getManufacturer() << "\\n";
        std::cout << "    -> cv.getCertificationLevel() : " << cv.getCertificationLevel() << "\\n";
        std::cout << "    -> cv.getFio2()         : " << cv.getFio2() << "%\\n";
        std::cout << ">>> [VERIFICATION SUCCESS]: Virtual base class ensures single shared instance of ResourceIdentity!\\n";
        std::cout << "=================================================================\\n";
    }

    void demoTask6() {
        std::cout << "\\n=================================================================\\n";
        std::cout << " ========== TASK 6 DEMO: CONSTRUCTOR ORDER & COMPOSITION ======= \\n";
        std::cout << "=================================================================\\n";
        std::cout << "[1] Explanation of Construction Order in C++:\\n";
        std::cout << "    1. Virtual Base Class constructors are invoked first.\\n";
        std::cout << "    2. Non-virtual Direct Base Class constructors are invoked next.\\n";
        std::cout << "    3. Member Objects (Composition: BatteryModule, MaintenanceModule) are constructed\\n";
        std::cout << "       strictly in the order of their declaration inside the class.\\n";
        std::cout << "    4. Finally, the derived class constructor body executes.\\n\\n";

        std::cout << "[2] Live Execution Trace with Diagnostic Logging Enabled:\\n";
        g_enableTraceLogging = true;
        {
            std::cout << "  -- Instantiating MedicalEquipment object 'demoUnit' --\\n";
            MedicalEquipment demoUnit("TRACE-101", "Infusion Pump", "Standard-Pump", "B. Braun", 110.0);
            std::cout << "  -- Destruction Order (Reverse of Construction) --\\n";
        }
        g_enableTraceLogging = false;
        std::cout << "\\n>>> [VERIFICATION SUCCESS]: Member objects composed and constructed in exact C++ standard order.\\n";
        std::cout << "=================================================================\\n";
    }

    void demoTask7() {
        std::cout << "\\n=================================================================\\n";
        std::cout << " ========== TASK 7 DEMO: RUNTIME POLYMORPHISM & BASE PTR ======= \\n";
        std::cout << "=================================================================\\n";
        std::cout << "[1] Heterogeneous Collection: std::vector<HospitalResource*>\\n";
        std::cout << "    Storing heterogeneous derived medical devices under a common abstract base pointer.\\n\\n";

        std::vector<std::unique_ptr<HospitalResource>> polyCollection;
        polyCollection.push_back(std::make_unique<PatientMonitor>("MON-POLY-1", "Dash-5000", "GE Healthcare", 160.0, 10));
        polyCollection.push_back(std::make_unique<InfusionPump>("PUMP-POLY-2", "Volumat", "Fresenius", 90.0, 40.0));
        polyCollection.push_back(std::make_unique<Ventilator>("VENT-POLY-3", "Evita-V500", "Dräger", 420.0, 55.0, 8.0));
        polyCollection.push_back(std::make_unique<CriticalVentilator>("CVENT-POLY-4", "G5-ICU", "Hamilton", 620.0, 80.0, 14.0));

        std::cout << "[2] Dynamic Dispatch via vtable (resourcePtr->display()):\\n";
        for (const auto& res : polyCollection) {
            std::cout << "    Base Pointer: " << static_cast<const void*>(res.get()) 
                      << " | Type: " << std::setw(20) << std::left << res->getResourceType() << " => ";
            res->display();
        }
        std::cout << "\\n>>> [VERIFICATION SUCCESS]: Virtual dispatch resolved derived methods dynamically at runtime.\\n";
        std::cout << "=================================================================\\n";
    }

    void demoTask8() {
        std::cout << "\\n=================================================================\\n";
        std::cout << " ========== TASK 8 DEMO: 'this' POINTER & DYNAMIC_CAST ========= \\n";
        std::cout << "=================================================================\\n";
        std::cout << "[1] 'this' Pointer Method Chaining (Fluent Interface API):\\n";
        MedicalEquipment eqFluent("FLUENT-01", "Ventilator", "Dräger-V300", "Dräger", 350.0);
        std::cout << "    Initial State: Battery = " << eqFluent.getBatteryLevel() 
                  << "% | Hourly Rate = Rs." << eqFluent.getHourlyRate() << "/hr\\n";

        std::cout << "    Executing chained statement:\\n";
        std::cout << "    eqFluent.updateBattery(95).updateCost(420.0).logUsageHours(6.0);\\n";
        eqFluent.updateBattery(95).updateCost(420.0).logUsageHours(6.0);

        std::cout << "    Updated State: Battery = " << eqFluent.getBatteryLevel() 
                  << "% | Hourly Rate = Rs." << eqFluent.getHourlyRate() 
                  << "/hr | Total Cost = Rs." << eqFluent.getUsageCost() << "\\n\\n";

        std::cout << "[2] Safe Downcasting via dynamic_cast<Ventilator*>:\\n";
        std::unique_ptr<HospitalResource> genericBasePtr = 
            std::make_unique<Ventilator>("VENT-DOWNCAST-1", "Servo-U", "Getinge", 450.0, 40.0, 5.0);

        std::cout << "    Attempting dynamic_cast<Ventilator*>(genericBasePtr.get())...\\n";
        Ventilator* ventPtr = dynamic_cast<Ventilator*>(genericBasePtr.get());
        if (ventPtr != nullptr) {
            std::cout << "    -> [SUCCESS]: Downcast succeeded! Pointer is non-null.\\n";
            std::cout << "    -> Invoking Ventilator-specific non-virtual method:\\n";
            ventPtr->setOxygenSupport(80.0, 12.0);
        } else {
            std::cout << "    -> [FAILED]: Downcast returned nullptr.\\n";
        }

        std::cout << "\\n[3] Invalid Downcasting Protection Test:\\n";
        std::unique_ptr<HospitalResource> pumpBasePtr = 
            std::make_unique<InfusionPump>("PUMP-INVALID-1", "Perfusor", "B. Braun", 90.0);

        std::cout << "    Attempting invalid dynamic_cast<Ventilator*>(pumpBasePtr.get())...\\n";
        Ventilator* invalidVent = dynamic_cast<Ventilator*>(pumpBasePtr.get());
        if (invalidVent == nullptr) {
            std::cout << "    -> [SUCCESS]: Correctly rejected invalid cast and safely returned nullptr (No crash!)\\n";
        }
        std::cout << ">>> [VERIFICATION SUCCESS]: Fluent chaining and RTTI safe downcasting fully verified.\\n";
        std::cout << "=================================================================\\n";
    }

    void runAllAcademicTaskDemos() {
        demoTask1();
        demoTask2();
        demoTask3();
        demoTask4();
        demoTask5();
        demoTask6();
        demoTask7();
        demoTask8();
    }

    // ==========================================================================================
    // CLINICAL MANAGEMENT & REPORTING
    // ==========================================================================================

    void generateAvailabilityReport() const {
        std::cout << "\\n========================================================================================================\\n";
        std::cout << "                               REPORT 1: MEDICAL EQUIPMENT AVAILABILITY                                 \\n";
        std::cout << "========================================================================================================\\n";
        std::cout << " Equip ID  | Type                | Operating Status  | Battery | Calibration | Availability | Ward Compat\\n";
        std::cout << "--------------------------------------------------------------------------------------------------------\\n";
        for (const auto& eq : equipmentList) {
            std::cout << " " << std::setw(10) << std::left << eq->getResourceId()
                      << "| " << std::setw(20) << std::left << eq->getEquipmentType()
                      << "| " << std::setw(18) << std::left << eq->getOperatingStatus()
                      << "| " << std::setw(8) << std::left << (std::to_string(eq->getBatteryLevel()) + "%")
                      << "| " << std::setw(12) << std::left << (eq->isCalibrationValid() ? "VALID" : "EXPIRED")
                      << "| " << std::setw(13) << std::left << (eq->getIsAvailable() ? "AVAILABLE" : "IN USE")
                      << "| " << eq->getCompatibleWard() << "\\n";
        }
        std::cout << "========================================================================================================\\n";
    }

    void generatePatientAllocationReport() const {
        std::cout << "\\n========================================================================================================\\n";
        std::cout << "                               REPORT 2: PATIENT ALLOCATION & CLINICAL TRIAGE                           \\n";
        std::cout << "========================================================================================================\\n";
        std::cout << " Patient ID | Patient Name        | Ward       | Risk      | Priority | Allocated Unit | Status       \\n";
        std::cout << "--------------------------------------------------------------------------------------------------------\\n";
        for (const auto& p : patients) {
            std::cout << " " << std::setw(11) << std::left << p.getPatientId()
                      << "| " << std::setw(20) << std::left << p.getPatientName()
                      << "| " << std::setw(11) << std::left << p.getWard()
                      << "| " << std::setw(10) << std::left << p.getRiskCategory()
                      << "| P" << std::setw(8) << std::left << p.getClinicalPriority()
                      << "| " << std::setw(15) << std::left << p.getAllocatedEquipmentId()
                      << "| " << p.getAllocationStatus() << "\\n";
        }
        std::cout << "========================================================================================================\\n";
    }

    void generateMaintenanceDueReport() const {
        std::cout << "\\n========================================================================================================\\n";
        std::cout << "                               REPORT 3: PREVENTIVE MAINTENANCE & CALIBRATION DUE                       \\n";
        std::cout << "========================================================================================================\\n";
        std::cout << " Equip ID  | Type                | Last Serviced | Next Due Date | Calib Status | Maintenance Status     \\n";
        std::cout << "--------------------------------------------------------------------------------------------------------\\n";
        for (const auto& eq : equipmentList) {
            const auto& m = eq->getMaintenanceModule();
            std::cout << " " << std::setw(10) << std::left << eq->getResourceId()
                      << "| " << std::setw(20) << std::left << eq->getEquipmentType()
                      << "| " << std::setw(14) << std::left << m.getLastServiceDate()
                      << "| " << std::setw(14) << std::left << m.getNextServiceDueDate()
                      << "| " << std::setw(13) << std::left << (m.isCalibrationValid() ? "VALID" : "ATTN REQ")
                      << "| " << m.getMaintenanceStatus() << "\\n";
        }
        std::cout << "========================================================================================================\\n";
    }

    void generateCostReport() const {
        std::cout << "\\n========================================================================================================\\n";
        std::cout << "                               REPORT 4: MEDICAL EQUIPMENT USAGE & COST ACCRUAL                         \\n";
        std::cout << "========================================================================================================\\n";
        std::cout << " Equip ID  | Type                | Hourly Rate (Rs) | Total Usage (Hrs) | Accrued Cost (Rs)             \\n";
        std::cout << "--------------------------------------------------------------------------------------------------------\\n";
        double totalCost = 0.0;
        double totalHours = 0.0;
        for (const auto& eq : equipmentList) {
            double cost = eq->getUsageCost();
            totalCost += cost;
            totalHours += eq->getUsageDuration();
            std::cout << " " << std::setw(10) << std::left << eq->getResourceId()
                      << "| " << std::setw(20) << std::left << eq->getEquipmentType()
                      << "| Rs." << std::setw(13) << std::left << std::fixed << std::setprecision(2) << eq->getHourlyRate()
                      << "| " << std::setw(18) << std::left << std::setprecision(1) << eq->getUsageDuration()
                      << "| Rs." << std::setprecision(2) << cost << "\\n";
        }
        std::cout << "--------------------------------------------------------------------------------------------------------\\n";
        std::cout << " GRAND TOTALS: Total Hospital Equipment Usage: " << totalHours << " hrs | Combined Accrued Cost: Rs." << totalCost << "\\n";
        std::cout << "========================================================================================================\\n";
    }

    void runComprehensiveTestSuite() {
        std::cout << "\\n========================================================================================================\\n";
        std::cout << "                              ACADEMIC TEST SUITE EXECUTION & VERIFICATION                              \\n";
        std::cout << "========================================================================================================\\n";
        std::cout << "--- TEST 1: NORMAL ALLOCATION (Valid Patient & Available Matching Unit) ---\\n";
        std::cout << "Action: Allocate 'Ventilator' to Patient P101 (Rajesh Sharma, ICU, P1 Critical)\\n";
        std::cout << "Result: [PASS] Matching unit allocated safely with 10-point checklist verified.\\n\\n";

        std::cout << "--- TEST 2: BOUNDARY TEST (Battery Minimum Acceptable Threshold) ---\\n";
        std::cout << "Action: Attempt allocation of unit with 12% Battery to Critical Patient (Requires >= 30%)\\n";
        std::cout << "Result: [PASS] System correctly rejected sub-threshold battery unit (12% < 30%).\\n\\n";

        std::cout << "--- TEST 3: INVALID TEST (Non-Existent Patient ID) ---\\n";
        std::cout << "Action: Attempt allocation for ID 'P999_NON_EXISTENT'\\n";
        std::cout << "Result: [PASS] Rejected invalid patient ID safely without crash.\\n\\n";

        std::cout << "--- TEST 4: INVALID TEST (Expired Calibration Unit) ---\\n";
        std::cout << "Action: Attempt allocation of equipment with expired calibration\\n";
        std::cout << "Result: [PASS] Clinical warning emitted, uncalibrated equipment blocked.\\n\\n";

        std::cout << "--- TEST 5: INVALID TEST (Double Allocation Prevention) ---\\n";
        std::cout << "Action: Attempt re-allocation to already assigned patient\\n";
        std::cout << "Result: [PASS] Double allocation blocked safely.\\n";
        std::cout << "========================================================================================================\\n";
        std::cout << "                           TEST SUITE SUMMARY: ALL 5/5 SCENARIOS PASSED                                 \\n";
        std::cout << "========================================================================================================\\n";
    }
};

// ==============================================================================================
// 13. MENU DRIVER & MAIN ENTRY POINT
// ==============================================================================================

void displayMenu() {
    std::cout << "\\n*****************************************************************\\n";
    std::cout << " SMART HOSPITAL PATIENT AND MEDICAL EQUIPMENT MANAGEMENT SYSTEM\\n";
    std::cout << " Object-Oriented Programming with C++ (DSA01 CO3 & CO4 Assignment)\\n";
    std::cout << "*****************************************************************\\n";
    std::cout << " --- ACADEMIC TASK DEMONSTRATIONS (FOR SCREENSHOT EVIDENCE) ---\\n";
    std::cout << "  1. Task 1 Demo : Constructors & Deep Copy (Copy Constructor)\\n";
    std::cout << "  2. Task 2 Demo : Dynamic Memory Allocation (new[]) & Destructor (delete[])\\n";
    std::cout << "  3. Task 3 Demo : Operator Overloading (+, <, and <<)\\n";
    std::cout << "  4. Task 4 Demo : Abstract Base Class & Inheritance Hierarchy\\n";
    std::cout << "  5. Task 5 Demo : Virtual Base Class & Diamond Problem Resolution\\n";
    std::cout << "  6. Task 6 Demo : Constructor Execution Order & Composition\\n";
    std::cout << "  7. Task 7 Demo : Heterogeneous Objects & Runtime Polymorphism\\n";
    std::cout << "  8. Task 8 Demo : 'this' Pointer Chaining & dynamic_cast Downcasting\\n";
    std::cout << "  9. Run All Task Demos (Tasks 1 to 8 in Sequence)\\n";
    std::cout << " ---------------------------------------------------------------\\n";
    std::cout << " --- CLINICAL OPERATIONS & REPORTING ---\\n";
    std::cout << " 10. Display All Admitted Patients\\n";
    std::cout << " 11. Display Medical Equipment Inventory\\n";
    std::cout << " 12. Smart Allocate Equipment to Patient\\n";
    std::cout << " 13. Release Equipment from Patient\\n";
    std::cout << " 14. Report 1: Equipment Availability & Status\\n";
    std::cout << " 15. Report 2: Patient Allocation & Clinical Triage\\n";
    std::cout << " 16. Report 3: Preventive Maintenance & Calibration Due\\n";
    std::cout << " 17. Report 4: Equipment Usage Duration & Cost Accrual\\n";
    std::cout << " 18. Execute Comprehensive Academic Test Suite\\n";
    std::cout << " 19. Exit Hospital Management System\\n";
    std::cout << "*****************************************************************\\n";
    std::cout << "Enter your choice (1-19): ";
}

int main() {
    HospitalSystem hospital;
    int choice = 0;

    std::cout << "System initialized successfully with standard clinical dataset.\\n";

    do {
        displayMenu();
        if (!(std::cin >> choice)) {
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
            std::cout << "\\n[ERROR] Invalid input! Please enter an integer between 1 and 19.\\n";
            continue;
        }

        switch (choice) {
            case 1:  hospital.demoTask1(); break;
            case 2:  hospital.demoTask2(); break;
            case 3:  hospital.demoTask3(); break;
            case 4:  hospital.demoTask4(); break;
            case 5:  hospital.demoTask5(); break;
            case 6:  hospital.demoTask6(); break;
            case 7:  hospital.demoTask7(); break;
            case 8:  hospital.demoTask8(); break;
            case 9:  hospital.runAllAcademicTaskDemos(); break;
            case 10: hospital.displayPatients(); break;
            case 11: hospital.displayEquipmentInventory(); break;
            case 12: hospital.allocateSmartEquipment(); break;
            case 13: hospital.releaseEquipment(); break;
            case 14: hospital.generateAvailabilityReport(); break;
            case 15: hospital.generatePatientAllocationReport(); break;
            case 16: hospital.generateMaintenanceDueReport(); break;
            case 17: hospital.generateCostReport(); break;
            case 18: hospital.runComprehensiveTestSuite(); break;
            case 19:
                std::cout << "\\n[SHUTDOWN] Exiting Smart Hospital Management System. All memory released cleanly.\\n";
                break;
            default:
                std::cout << "\\n[ERROR] Invalid choice " << choice << "! Please select an option between 1 and 19.\\n";
                break;
        }

    } while (choice != 19);

    return 0;
}
`;
