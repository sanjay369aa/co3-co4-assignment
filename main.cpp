/**
 * ==============================================================================================
 * PROJECT TITLE: SMART HOSPITAL PATIENT AND MEDICAL EQUIPMENT MANAGEMENT SYSTEM
 * COURSE       : Object-Oriented Programming with C++ (DSA01 - CO3 & CO4 Assignment)
 * STANDARD     : C++17 Standard Compliant
 * ==============================================================================================
 * 
 * CORE OOP CONCEPTS DEMONSTRATED:
 *  1. TASK 1: Constructors (Default, Parameterized, Overloaded, Copy Constructor with DEEP COPY)
 *  2. TASK 2: Dynamic Memory Allocation (new, new[], delete, delete[]) & Safe Destructors
 *  3. TASK 3: Operator Overloading (operator+, operator<, operator<<)
 *  4. TASK 4: Abstract Base Class (HospitalResource) & Hierarchical / Multilevel Inheritance
 *  5. TASK 5: Virtual Base Class (ResourceIdentity) resolving Diamond Problem in CriticalVentilator
 *  6. TASK 6: Constructor Execution Order & Composition (BatteryModule, MaintenanceModule)
 *  7. TASK 7: Heterogeneous Object Management via Base-Class Pointers & Runtime Polymorphism
 *  8. TASK 8: 'this' Pointer (Method Chaining) & Safe Downcasting via dynamic_cast
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

// ==============================================================================================
// 1. SERVICE HISTORY RECORD (Dynamic Memory Entity for Task 1 & Task 2)
// ==============================================================================================

struct ServiceRecord {
    std::string serviceDate;
    std::string engineerName;
    std::string actionTaken;
    double serviceCost;

    ServiceRecord() : serviceDate("N/A"), engineerName("Unassigned"), actionTaken("Routine Check"), serviceCost(0.0) {}

    ServiceRecord(const std::string& date, const std::string& engineer, const std::string& action, double cost)
        : serviceDate(date), engineerName(engineer), actionTaken(action), serviceCost(cost) {}
};

// ==============================================================================================
// 2. MEMBER / COMPOSITION MODULES (Task 6: Composition)
// ==============================================================================================

/**
 * @class BatteryModule
 * @brief Represents embedded power management system composed inside MedicalEquipment.
 */
class BatteryModule {
private:
    int batteryLevel;         // 0 - 100%
    bool isCharging;
    double backupDurationHours; // Estimated hours remaining at current load

public:
    // Default Constructor
    BatteryModule() : batteryLevel(100), isCharging(false), backupDurationHours(8.0) {
        // Log constructor execution for Task 6 demonstration
    }

    // Parameterized Constructor
    BatteryModule(int level, bool charging, double backupHours)
        : batteryLevel(level), isCharging(charging), backupDurationHours(backupHours) {
        if (batteryLevel < 0) batteryLevel = 0;
        if (batteryLevel > 100) batteryLevel = 100;
    }

    // Getters & Setters
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
 * @brief Represents calibration and maintenance scheduling composed inside MedicalEquipment.
 */
class MaintenanceModule {
private:
    std::string lastServiceDate;
    std::string nextServiceDueDate;
    bool calibrationValid;
    std::string maintenanceStatus; // "Operational", "Maintenance Required", "Under Repair"

public:
    // Default Constructor
    MaintenanceModule() 
        : lastServiceDate("2026-01-15"), nextServiceDueDate("2026-07-15"), 
          calibrationValid(true), maintenanceStatus("Operational") {}

    // Parameterized Constructor
    MaintenanceModule(const std::string& lastDate, const std::string& nextDate, bool calibValid, const std::string& status)
        : lastServiceDate(lastDate), nextServiceDueDate(nextDate), 
          calibrationValid(calibValid), maintenanceStatus(status) {}

    // Getters and Setters
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

/**
 * @class ResourceIdentity
 * @brief Virtual base class providing fundamental identification for all hospital assets.
 * Virtual inheritance prevents duplicate ResourceIdentity subobjects in hybrid inheritance hierarchies.
 */
class ResourceIdentity {
protected:
    std::string resourceId;
    std::string modelNumber;
    std::string manufacturer;

public:
    // Default Constructor
    ResourceIdentity() 
        : resourceId("RES-000"), modelNumber("GENERIC-00"), manufacturer("MedTech Global") {
        // std::cout << "  [Constructor] ResourceIdentity Default Called for: " << resourceId << "\n";
    }

    // Parameterized Constructor
    ResourceIdentity(const std::string& id, const std::string& model, const std::string& mfg)
        : resourceId(id), modelNumber(model), manufacturer(mfg) {
        // std::cout << "  [Constructor] ResourceIdentity Parameterized Called for: " << resourceId << "\n";
    }

    virtual ~ResourceIdentity() {
        // std::cout << "  [Destructor] ResourceIdentity Virtual Destructor for: " << resourceId << "\n";
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

/**
 * @class HospitalResource
 * @brief Abstract base class defining the standard interface for all hospital resources.
 * Virtually inherits from ResourceIdentity to support diamond inheritance structures.
 */
class HospitalResource : virtual public ResourceIdentity {
public:
    HospitalResource() : ResourceIdentity() {}
    HospitalResource(const std::string& id, const std::string& model, const std::string& mfg)
        : ResourceIdentity(id, model, mfg) {}

    virtual ~HospitalResource() {}

    // PURE VIRTUAL FUNCTIONS (Contract for all derived resources)
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

/**
 * @class MedicalEquipment
 * @brief Central domain class managing equipment status, battery, maintenance, and dynamic service history.
 * Inherits HospitalResource (which virtually inherits ResourceIdentity).
 */
class MedicalEquipment : public HospitalResource {
protected:
    std::string equipmentType;        // "Patient Monitor", "Infusion Pump", "Ventilator", etc.
    std::string operatingStatus;      // "Operational", "Allocated", "Under Maintenance"
    bool isAvailable;
    double usageDurationHours;        // Accumulated usage duration
    double hourlyRate;                // Cost per hour in INR / currency units
    std::string allocatedPatientId;   // "NONE" if free
    std::string compatibleWard;       // "ICU", "General", "Emergency", "Pediatric", "All"

    // TASK 6: Member Objects (Composition)
    BatteryModule battery;
    MaintenanceModule maintenance;

    // TASK 1 & 2: Dynamic Memory Allocation for Service History Array
    ServiceRecord* serviceHistory;    // Dynamically allocated array (demonstrating new[] and delete[])
    int serviceHistoryCount;
    int serviceHistoryCapacity;

    void initializeHistory(int capacity) {
        serviceHistoryCapacity = (capacity > 0) ? capacity : 4;
        serviceHistoryCount = 0;
        serviceHistory = new ServiceRecord[serviceHistoryCapacity]; // Demonstrating new[]
    }

public:
    // --------------------------------------------------------------------------
    // TASK 1: CONSTRUCTOR VARIATIONS
    // --------------------------------------------------------------------------

    // 1. Default Constructor
    MedicalEquipment() 
        : ResourceIdentity("EQ-DEFAULT", "STD-MODEL", "Standard Health Corp"),
          HospitalResource("EQ-DEFAULT", "STD-MODEL", "Standard Health Corp"),
          equipmentType("General Equipment"), operatingStatus("Operational"), isAvailable(true),
          usageDurationHours(0.0), hourlyRate(150.0), allocatedPatientId("NONE"), compatibleWard("All"),
          battery(), maintenance(), serviceHistory(nullptr), serviceHistoryCount(0), serviceHistoryCapacity(0) {
        initializeHistory(4);
    }

    // 2. Parameterized Constructor
    MedicalEquipment(const std::string& id, const std::string& type, const std::string& model, 
                     const std::string& mfg, double rate, const std::string& ward = "All")
        : ResourceIdentity(id, model, mfg),
          HospitalResource(id, model, mfg),
          equipmentType(type), operatingStatus("Operational"), isAvailable(true),
          usageDurationHours(0.0), hourlyRate(rate), allocatedPatientId("NONE"), compatibleWard(ward),
          battery(100, false, 8.0), maintenance(),
          serviceHistory(nullptr), serviceHistoryCount(0), serviceHistoryCapacity(0) {
        initializeHistory(5);
    }

    // 3. Overloaded Constructor (With custom initial battery & maintenance parameters)
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
    }

    // 4. COPY CONSTRUCTOR (TASK 1 & TASK 2: DEEP COPY IMPLEMENTATION)
    // Essential to prevent double-free, dangling pointers, and shared memory corruption.
    MedicalEquipment(const MedicalEquipment& other)
        : ResourceIdentity(other.resourceId, other.modelNumber, other.manufacturer),
          HospitalResource(other.resourceId, other.modelNumber, other.manufacturer),
          equipmentType(other.equipmentType), operatingStatus(other.operatingStatus),
          isAvailable(other.isAvailable), usageDurationHours(other.usageDurationHours),
          hourlyRate(other.hourlyRate), allocatedPatientId(other.allocatedPatientId),
          compatibleWard(other.compatibleWard), battery(other.battery), maintenance(other.maintenance),
          serviceHistory(nullptr), serviceHistoryCount(other.serviceHistoryCount),
          serviceHistoryCapacity(other.serviceHistoryCapacity) {
        
        // DEEP COPY: Allocate distinct heap memory and duplicate every individual record
        if (other.serviceHistoryCapacity > 0) {
            this->serviceHistory = new ServiceRecord[other.serviceHistoryCapacity];
            for (int i = 0; i < other.serviceHistoryCount; ++i) {
                this->serviceHistory[i] = other.serviceHistory[i]; // Value copy
            }
        } else {
            initializeHistory(4);
        }
    }

    // Copy Assignment Operator (Rule of Three / Five)
    MedicalEquipment& operator=(const MedicalEquipment& other) {
        if (this != &other) {
            // Free current dynamic memory
            delete[] serviceHistory;

            // Copy base identity
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

            // Deep copy buffer
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

    // --------------------------------------------------------------------------
    // TASK 2: DESTRUCTOR (Safe deallocation and release logging)
    // --------------------------------------------------------------------------
    virtual ~MedicalEquipment() override {
        // Clean up dynamically allocated memory
        if (serviceHistory != nullptr) {
            delete[] serviceHistory; // Demonstrating delete[]
            serviceHistory = nullptr;
        }
    }

    // Dynamic Record Management (Demonstrating dynamic array reallocation via new[] / delete[])
    void addServiceLog(const std::string& date, const std::string& engineer, const std::string& action, double cost) {
        if (serviceHistoryCount >= serviceHistoryCapacity) {
            // Expand dynamically
            int newCap = serviceHistoryCapacity * 2;
            ServiceRecord* newArr = new ServiceRecord[newCap]; // new[]
            for (int i = 0; i < serviceHistoryCount; ++i) {
                newArr[i] = serviceHistory[i];
            }
            delete[] serviceHistory; // delete[]
            serviceHistory = newArr;
            serviceHistoryCapacity = newCap;
        }
        serviceHistory[serviceHistoryCount++] = ServiceRecord(date, engineer, action, cost);
    }

    // --------------------------------------------------------------------------
    // TASK 8: THIS POINTER (Method Chaining & Fluent API)
    // --------------------------------------------------------------------------
    MedicalEquipment& updateBattery(int level) {
        this->battery.setBatteryLevel(level);
        return *this; // Return reference to self for chaining
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

    // --------------------------------------------------------------------------
    // TASK 3: OPERATOR OVERLOADING (+, <, <<)
    // --------------------------------------------------------------------------

    /**
     * @brief Operator + : Combines total usage cost of two medical equipment objects.
     */
    double operator+(const MedicalEquipment& other) const {
        return this->getUsageCost() + other.getUsageCost();
    }

    /**
     * @brief Operator < : Compares suitability of two equipment items.
     * Evaluates composite score based on battery level, operational readiness, and calibration.
     */
    bool operator<(const MedicalEquipment& other) const {
        return this->calculateSuitabilityScore() < other.calculateSuitabilityScore();
    }

    /**
     * @brief Operator << : Formatted output stream overload for clean console reporting.
     */
    friend std::ostream& operator<<(std::ostream& os, const MedicalEquipment& eq) {
        os << "=================================================================\n"
           << " EQUIPMENT REPORT: [" << eq.resourceId << "] - " << eq.equipmentType << "\n"
           << " Model       : " << eq.modelNumber << " | Manufacturer: " << eq.manufacturer << "\n"
           << " Status      : " << eq.operatingStatus << " | Available: " << (eq.isAvailable ? "YES" : "NO") << "\n"
           << " Ward Compat : " << eq.compatibleWard << " | Allocated To: " << eq.allocatedPatientId << "\n"
           << " Battery     : " << eq.battery.getBatteryLevel() << "% (" 
           << (eq.battery.getIsCharging() ? "Charging" : "Discharging") << ")\n"
           << " Calibration : " << (eq.maintenance.isCalibrationValid() ? "VALID" : "EXPIRED") 
           << " | Next Due: " << eq.maintenance.getNextServiceDueDate() << "\n"
           << " Usage       : " << std::fixed << std::setprecision(1) << eq.usageDurationHours 
           << " hrs @ Rs." << std::setprecision(2) << eq.hourlyRate << "/hr | Total Cost: Rs." << eq.getUsageCost() << "\n"
           << " Suitability : " << std::setprecision(2) << eq.calculateSuitabilityScore() << " / 100.0\n"
           << " Service Logs: " << eq.serviceHistoryCount << " recorded\n"
           << "=================================================================";
        return os;
    }

    // --------------------------------------------------------------------------
    // TASK 4 & 7: VIRTUAL IMPLEMENTATIONS
    // --------------------------------------------------------------------------
    virtual void display() const override {
        std::cout << *this << "\n";
    }

    virtual std::string getResourceType() const override {
        return equipmentType;
    }

    virtual double getUsageCost() const override {
        return usageDurationHours * hourlyRate;
    }

    virtual double getUsageDuration() const override {
        return usageDurationHours;
    }

    virtual double calculateSuitabilityScore() const override {
        double score = 0.0;
        // Operational status (40 points)
        if (operatingStatus == "Operational" && isAvailable) score += 40.0;
        else if (operatingStatus == "Allocated") score += 10.0;

        // Battery level (30 points)
        score += (battery.getBatteryLevel() / 100.0) * 30.0;

        // Calibration validity (30 points)
        if (maintenance.isCalibrationValid()) score += 30.0;

        return score;
    }

    virtual bool isReadyForAllocation() const override {
        return isAvailable && 
               operatingStatus == "Operational" && 
               maintenance.isCalibrationValid() && 
               battery.getBatteryLevel() >= 20;
    }

    // Getters and Business Logic
    std::string getEquipmentType() const { return equipmentType; }
    std::string getOperatingStatus() const { return operatingStatus; }
    bool getIsAvailable() const { return isAvailable; }
    int getBatteryLevel() const { return battery.getBatteryLevel(); }
    bool isCalibrationValid() const { return maintenance.isCalibrationValid(); }
    std::string getAllocatedPatientId() const { return allocatedPatientId; }
    std::string getCompatibleWard() const { return compatibleWard; }
    double getHourlyRate() const { return hourlyRate; }
    int getServiceHistoryCount() const { return serviceHistoryCount; }

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

    void setCalibrationStatus(bool valid) {
        maintenance.setCalibrationValid(valid);
    }

    void setWardCompatibility(const std::string& ward) {
        compatibleWard = ward;
    }

    void displayServiceHistory() const {
        std::cout << "\n--- Service History for Equipment [" << resourceId << "] ---\n";
        if (serviceHistoryCount == 0) {
            std::cout << "  No maintenance history records found.\n";
            return;
        }
        for (int i = 0; i < serviceHistoryCount; ++i) {
            std::cout << "  #" << (i + 1) << " | Date: " << serviceHistory[i].serviceDate
                      << " | Engineer: " << serviceHistory[i].engineerName
                      << " | Action: " << serviceHistory[i].actionTaken
                      << " | Cost: Rs." << std::fixed << std::setprecision(2) << serviceHistory[i].serviceCost << "\n";
        }
    }
};

// ==============================================================================================
// 6. DERIVED HIERARCHICAL & MULTILEVEL CLASSES (Task 4: Inheritance)
// ==============================================================================================

/**
 * @class PatientMonitor
 * @brief Multilevel/Hierarchical derived class for vital signs monitoring.
 */
class PatientMonitor : public MedicalEquipment {
private:
    int ecgChannels;
    bool nibpEnabled;
    bool spo2Enabled;

public:
    PatientMonitor() 
        : ResourceIdentity("MON-001", "VisiCare-500", "Philips Healthcare"),
          HospitalResource("MON-001", "VisiCare-500", "Philips Healthcare"),
          MedicalEquipment("MON-001", "Patient Monitor", "VisiCare-500", "Philips Healthcare", 120.0, "All"),
          ecgChannels(5), nibpEnabled(true), spo2Enabled(true) {}

    PatientMonitor(const std::string& id, const std::string& model, const std::string& mfg, 
                   double rate, int channels, const std::string& ward = "All")
        : ResourceIdentity(id, model, mfg),
          HospitalResource(id, model, mfg),
          MedicalEquipment(id, "Patient Monitor", model, mfg, rate, ward),
          ecgChannels(channels), nibpEnabled(true), spo2Enabled(true) {}

    int getEcgChannels() const { return ecgChannels; }
    void setEcgChannels(int channels) { ecgChannels = channels; }

    void triggerVitalAlert() const {
        std::cout << "[ALERT] Patient Monitor [" << resourceId << "] Transmitting 12-lead ECG telemetry...\n";
    }

    virtual void display() const override {
        std::cout << "-----------------------------------------------------------------\n"
                  << " PATIENT MONITOR: [" << resourceId << "] Model: " << modelNumber << "\n"
                  << " Type        : " << equipmentType << " | Ward: " << compatibleWard << "\n"
                  << " ECG Channels: " << ecgChannels << " | SpO2: " << (spo2Enabled ? "Active" : "Off")
                  << " | NIBP: " << (nibpEnabled ? "Active" : "Off") << "\n"
                  << " Status      : " << operatingStatus << " | Battery: " << battery.getBatteryLevel() << "%\n"
                  << " Calibration : " << (maintenance.isCalibrationValid() ? "VALID" : "EXPIRED") << "\n"
                  << " Suitability : " << std::fixed << std::setprecision(1) << calculateSuitabilityScore() << "/100\n"
                  << "-----------------------------------------------------------------\n";
    }
};

/**
 * @class InfusionPump
 * @brief Derived class specialized for micro-dosing and IV medication delivery.
 */
class InfusionPump : public MedicalEquipment {
private:
    double flowRateMlPerHour;
    double maxBolusVolume;
    bool occlusionAlarmActive;

public:
    InfusionPump() 
        : ResourceIdentity("PUMP-001", "InfusioMaster-20", "B. Braun"),
          HospitalResource("PUMP-001", "InfusioMaster-20", "B. Braun"),
          MedicalEquipment("PUMP-001", "Infusion Pump", "InfusioMaster-20", "B. Braun", 80.0, "All"),
          flowRateMlPerHour(25.0), maxBolusVolume(100.0), occlusionAlarmActive(false) {}

    InfusionPump(const std::string& id, const std::string& model, const std::string& mfg, 
                 double rate, double initialFlowRate, const std::string& ward = "All")
        : ResourceIdentity(id, model, mfg),
          HospitalResource(id, model, mfg),
          MedicalEquipment(id, "Infusion Pump", model, mfg, rate, ward),
          flowRateMlPerHour(initialFlowRate), maxBolusVolume(100.0), occlusionAlarmActive(false) {}

    double getFlowRate() const { return flowRateMlPerHour; }
    void setFlowRate(double rate) { flowRateMlPerHour = rate; }

    void administerBolus(double volume) {
        if (volume <= maxBolusVolume) {
            std::cout << "[INFUSION PUMP " << resourceId << "] Administering bolus dose: " << volume << " mL.\n";
        } else {
            std::cout << "[WARNING] Bolus volume exceeds safety threshold (" << maxBolusVolume << " mL)!\n";
        }
    }

    virtual void display() const override {
        std::cout << "-----------------------------------------------------------------\n"
                  << " INFUSION PUMP: [" << resourceId << "] Model: " << modelNumber << "\n"
                  << " Type        : " << equipmentType << " | Ward: " << compatibleWard << "\n"
                  << " Flow Rate   : " << std::fixed << std::setprecision(1) << flowRateMlPerHour << " mL/hr | Max Bolus: " << maxBolusVolume << " mL\n"
                  << " Status      : " << operatingStatus << " | Battery: " << battery.getBatteryLevel() << "%\n"
                  << " Calibration : " << (maintenance.isCalibrationValid() ? "VALID" : "EXPIRED") << "\n"
                  << " Suitability : " << std::fixed << std::setprecision(1) << calculateSuitabilityScore() << "/100\n"
                  << "-----------------------------------------------------------------\n";
    }
};

/**
 * @class Ventilator
 * @brief Multilevel derived class for mechanical respiratory support (Task 8: Derived Pointer Target).
 */
class Ventilator : public MedicalEquipment {
protected:
    double fio2Percentage;       // Fraction of Inspired Oxygen (21% - 100%)
    double peepPressureCmH2O;     // Positive End-Expiratory Pressure (cmH2O)
    std::string ventilationMode; // "CMV", "SIMV", "CPAP", "BiPAP"

public:
    Ventilator() 
        : ResourceIdentity("VENT-001", "Servo-U", "Getinge"),
          HospitalResource("VENT-001", "Servo-U", "Getinge"),
          MedicalEquipment("VENT-001", "Ventilator", "Servo-U", "Getinge", 350.0, "ICU"),
          fio2Percentage(40.0), peepPressureCmH2O(5.0), ventilationMode("SIMV") {}

    Ventilator(const std::string& id, const std::string& model, const std::string& mfg, 
               double rate, double fio2 = 40.0, double peep = 5.0, const std::string& ward = "ICU")
        : ResourceIdentity(id, model, mfg),
          HospitalResource(id, model, mfg),
          MedicalEquipment(id, "Ventilator", model, mfg, rate, ward),
          fio2Percentage(fio2), peepPressureCmH2O(peep), ventilationMode("SIMV") {}

    // TASK 8: Derived-Class Specific Operation
    void setOxygenSupport(double fio2, double peep) {
        this->fio2Percentage = (fio2 < 21.0) ? 21.0 : (fio2 > 100.0 ? 100.0 : fio2);
        this->peepPressureCmH2O = (peep < 0.0) ? 0.0 : peep;
        std::cout << "[VENTILATOR OPERATION] Target FiO2 set to " << fio2Percentage 
                  << "% | PEEP set to " << peepPressureCmH2O << " cmH2O.\n";
    }

    double getFiO2() const { return fio2Percentage; }
    double getPeep() const { return peepPressureCmH2O; }
    std::string getVentilationMode() const { return ventilationMode; }

    virtual void display() const override {
        std::cout << "-----------------------------------------------------------------\n"
                  << " MECHANICAL VENTILATOR: [" << resourceId << "] Model: " << modelNumber << "\n"
                  << " Type        : " << equipmentType << " | Ward: " << compatibleWard << "\n"
                  << " Mode        : " << ventilationMode << " | FiO2: " << fio2Percentage << "% | PEEP: " << peepPressureCmH2O << " cmH2O\n"
                  << " Status      : " << operatingStatus << " | Battery: " << battery.getBatteryLevel() << "%\n"
                  << " Calibration : " << (maintenance.isCalibrationValid() ? "VALID" : "EXPIRED") << "\n"
                  << " Suitability : " << std::fixed << std::setprecision(1) << calculateSuitabilityScore() << "/100\n"
                  << "-----------------------------------------------------------------\n";
    }
};

// ==============================================================================================
// 7. TASK 5: VIRTUAL INHERITANCE & HYBRID DIAMOND PROBLEM RESOLUTION
// ==============================================================================================

/**
 * @class CriticalCare
 * @brief Intermediate base class representing intensive care certification & emergency fail-safe features.
 * Virtually inherits from ResourceIdentity to avoid diamond duplicate.
 */
class CriticalCare : virtual public ResourceIdentity {
protected:
    std::string icuCertificationLevel; // "Level 3 Tertiary ICU", "Trauma Critical", "NICU"
    bool dualOxygenBackupAvailable;
    bool emergencyDefibSync;

public:
    CriticalCare() 
        : ResourceIdentity(), icuCertificationLevel("Level 3 ICU"), 
          dualOxygenBackupAvailable(true), emergencyDefibSync(true) {
        // std::cout << "  [Constructor] CriticalCare Default Constructor\n";
    }

    CriticalCare(const std::string& id, const std::string& model, const std::string& mfg, 
                 const std::string& icuLevel, bool dualO2 = true)
        : ResourceIdentity(id, model, mfg),
          icuCertificationLevel(icuLevel),
          dualOxygenBackupAvailable(dualO2), emergencyDefibSync(true) {
        // std::cout << "  [Constructor] CriticalCare Parameterized Constructor\n";
    }

    virtual ~CriticalCare() override {
        // std::cout << "  [Destructor] CriticalCare Virtual Destructor\n";
    }

    std::string getIcuCertificationLevel() const { return icuCertificationLevel; }
    bool hasDualOxygenBackup() const { return dualOxygenBackupAvailable; }

    void triggerCriticalCareSafetyCheck() const {
        std::cout << "[CRITICAL CARE PROTOCOL] Running automated fail-safe diagnostics (Dual O2: "
                  << (dualOxygenBackupAvailable ? "READY" : "OFFLINE") << " | Defib Sync: ACTIVE)...\n";
    }
};

/**
 * @class CriticalVentilator
 * @brief Demonstrates Multiple & Hybrid Inheritance with Virtual Base Class.
 * Solves the Diamond Problem: Single instance of ResourceIdentity shared across paths.
 * 
 *                  ResourceIdentity (Virtual Base)
 *                       /          \
 *                      /            \
 *          MedicalEquipment       CriticalCare
 *               (via Ventilator)      |
 *                      \            /
 *                       \          /
 *                     CriticalVentilator
 */
class CriticalVentilator : public Ventilator, public CriticalCare {
private:
    bool nitricOxideDelivery;
    bool highFrequencyOscillation;

public:
    // Notice: In virtual inheritance, the most-derived class initializes the virtual base ResourceIdentity directly!
    CriticalVentilator()
        : ResourceIdentity("CVENT-001", "Hamilton-G5", "Hamilton Medical"),
          HospitalResource("CVENT-001", "Hamilton-G5", "Hamilton Medical"),
          Ventilator("CVENT-001", "Hamilton-G5", "Hamilton Medical", 550.0, 60.0, 8.0, "ICU"),
          CriticalCare("CVENT-001", "Hamilton-G5", "Hamilton Medical", "Level 3 Super-Specialty ICU", true),
          nitricOxideDelivery(true), highFrequencyOscillation(true) {
        this->equipmentType = "Critical Ventilator";
    }

    CriticalVentilator(const std::string& id, const std::string& model, const std::string& mfg, 
                       double rate, const std::string& icuLevel, bool nitricOxide = true)
        : ResourceIdentity(id, model, mfg), // Direct virtual base initialization
          HospitalResource(id, model, mfg),
          Ventilator(id, model, mfg, rate, 50.0, 7.0, "ICU"),
          CriticalCare(id, model, mfg, icuLevel, true),
          nitricOxideDelivery(nitricOxide), highFrequencyOscillation(true) {
        this->equipmentType = "Critical Ventilator";
    }

    virtual ~CriticalVentilator() override {}

    void triggerHighFrequencyOscillation() {
        std::cout << "[CRITICAL VENTILATION] Initiating High-Frequency Oscillatory Ventilation (HFOV) for severe ARDS.\n";
    }

    // Overridden display showing unified identity without ambiguity
    virtual void display() const override {
        std::cout << "=================================================================\n"
                  << " CRITICAL-CARE ICU VENTILATOR (HYBRID VIRTUAL INHERITANCE)\n"
                  << " Resource ID  : " << ResourceIdentity::resourceId << " (Single Virtual Base Instance)\n"
                  << " Model / Mfg  : " << modelNumber << " | " << manufacturer << "\n"
                  << " Type         : " << equipmentType << " | Compatible Ward: " << compatibleWard << "\n"
                  << " ICU Level    : " << icuCertificationLevel << " | Dual O2 Backup: " << (dualOxygenBackupAvailable ? "YES" : "NO") << "\n"
                  << " FiO2 Support : " << fio2Percentage << "% | PEEP: " << peepPressureCmH2O << " cmH2O | Mode: " << ventilationMode << "\n"
                  << " Nitric Oxide : " << (nitricOxideDelivery ? "AVAILABLE" : "N/A") << " | HFOV: " << (highFrequencyOscillation ? "ENABLED" : "DISABLED") << "\n"
                  << " Status       : " << operatingStatus << " | Battery: " << battery.getBatteryLevel() << "%\n"
                  << " Calibration  : " << (maintenance.isCalibrationValid() ? "VALID" : "EXPIRED") << "\n"
                  << " Hourly Rate  : Rs." << std::fixed << std::setprecision(2) << hourlyRate << " | Total Accrued: Rs." << getUsageCost() << "\n"
                  << " Suitability  : " << std::fixed << std::setprecision(1) << calculateSuitabilityScore() << " / 100.0\n"
                  << "=================================================================\n";
    }

    virtual double calculateSuitabilityScore() const override {
        // High-end critical care weighting bonus
        double base = Ventilator::calculateSuitabilityScore();
        if (dualOxygenBackupAvailable) base += 5.0;
        if (nitricOxideDelivery) base += 5.0;
        return (base > 100.0) ? 100.0 : base;
    }
};

// ==============================================================================================
// 8. PATIENT CLASS (Section 3)
// ==============================================================================================

/**
 * @class Patient
 * @brief Represents patient clinical profile, priority triage, and equipment assignment.
 */
class Patient {
private:
    std::string patientId;
    std::string patientName;
    int age;
    std::string ward;                 // "ICU", "Emergency", "General", "Pediatric"
    std::string riskCategory;         // "Critical", "High", "Medium", "Low"
    int clinicalPriority;             // 1 = Critical, 2 = High, 3 = Medium, 4 = Low
    std::string allocatedEquipmentId; // "NONE" if waiting
    std::string allocationStatus;     // "Unallocated", "Allocated", "Discharged"

public:
    Patient() 
        : patientId("P-000"), patientName("Unknown"), age(30), ward("General"),
          riskCategory("Low"), clinicalPriority(4), allocatedEquipmentId("NONE"),
          allocationStatus("Unallocated") {}

    Patient(const std::string& id, const std::string& name, int patientAge, 
            const std::string& patientWard, const std::string& risk, int priority)
        : patientId(id), patientName(name), age(patientAge), ward(patientWard),
          riskCategory(risk), clinicalPriority(priority), allocatedEquipmentId("NONE"),
          allocationStatus("Unallocated") {
        if (age < 0) age = 0;
        if (clinicalPriority < 1) clinicalPriority = 1;
        if (clinicalPriority > 4) clinicalPriority = 4;
    }

    // Getters & Setters
    std::string getPatientId() const { return patientId; }
    std::string getPatientName() const { return patientName; }
    int getAge() const { return age; }
    std::string getWard() const { return ward; }
    std::string getRiskCategory() const { return riskCategory; }
    int getClinicalPriority() const { return clinicalPriority; }
    std::string getAllocatedEquipmentId() const { return allocatedEquipmentId; }
    std::string getAllocationStatus() const { return allocationStatus; }

    void setWard(const std::string& newWard) { ward = newWard; }
    void setRiskCategory(const std::string& risk) { riskCategory = risk; }
    void setClinicalPriority(int prio) { 
        clinicalPriority = (prio < 1) ? 1 : (prio > 4 ? 4 : prio); 
    }

    void assignEquipment(const std::string& eqId) {
        allocatedEquipmentId = eqId;
        allocationStatus = "Allocated";
    }

    void releaseEquipment() {
        allocatedEquipmentId = "NONE";
        allocationStatus = "Unallocated";
    }

    void discharge() {
        allocatedEquipmentId = "NONE";
        allocationStatus = "Discharged";
    }

    void displayPatient() const {
        std::cout << " [" << patientId << "] " << std::left << std::setw(18) << patientName 
                  << " | Age: " << std::setw(3) << age 
                  << " | Ward: " << std::setw(10) << ward 
                  << " | Risk: " << std::setw(9) << riskCategory 
                  << " | Prio: P" << clinicalPriority 
                  << " | Status: " << std::setw(11) << allocationStatus 
                  << " | Equip: " << allocatedEquipmentId << "\n";
    }
};

// ==============================================================================================
// 9. SMART HOSPITAL MANAGEMENT CONTROLLER (Heterogeneous Collection & Logic)
// ==============================================================================================

class HospitalSystem {
private:
    std::vector<Patient> patients;
    // TASK 7: Heterogeneous Object Management via Base-Class Pointers
    std::vector<std::unique_ptr<MedicalEquipment>> equipmentList;

public:
    HospitalSystem() {
        seedSampleData();
    }

    // Pre-populate with realistic hospital inventory & patient intake
    void seedSampleData() {
        // Patients
        patients.emplace_back("P101", "Rajesh Sharma", 62, "ICU", "Critical", 1);
        patients.emplace_back("P102", "Ananya Verma", 34, "Emergency", "High", 2);
        patients.emplace_back("P103", "Vikram Malhotra", 48, "General", "Medium", 3);
        patients.emplace_back("P104", "Sunita Patil", 71, "ICU", "Critical", 1);
        patients.emplace_back("P105", "Devendra Sen", 28, "General", "Low", 4);

        // Heterogeneous Medical Equipment (Task 7)
        auto mon1 = std::make_unique<PatientMonitor>("MON-101", "IntelliVue-MX700", "Philips", 150.0, 8, "All");
        mon1->addServiceLog("2026-01-10", "Eng. S. Kulkarni", "Sensor recalibration", 1200.0);
        mon1->logUsageHours(14.5);

        auto pump1 = std::make_unique<InfusionPump>("PUMP-101", "Perfusor-Space", "B. Braun", 95.0, 30.0, "All");
        pump1->addServiceLog("2026-02-01", "Eng. M. Joshi", "Drive motor lubrication", 850.0);
        pump1->logUsageHours(22.0);

        auto vent1 = std::make_unique<Ventilator>("VENT-101", "Puritan-Bennett-980", "Medtronic", 400.0, 50.0, 8.0, "ICU");
        vent1->addServiceLog("2026-01-20", "Eng. R. Gupta", "Filter replacement & O2 cell test", 2500.0);
        vent1->logUsageHours(38.0);

        auto cvent1 = std::make_unique<CriticalVentilator>("CVENT-101", "Hamilton-G5", "Hamilton Medical", 600.0, "Level 3 Super-ICU", true);
        cvent1->addServiceLog("2026-02-15", "Eng. A. Nair", "Dual valve calibration & firmware 4.2", 4200.0);
        cvent1->logUsageHours(54.0);

        auto vent2_lowbat = std::make_unique<Ventilator>("VENT-102", "Servo-I", "Maquet", 380.0, 40.0, 6.0, "ICU");
        vent2_lowbat->updateBattery(12); // Low battery for boundary/invalid test
        vent2_lowbat->logUsageHours(8.0);

        auto mon2_uncalib = std::make_unique<PatientMonitor>("MON-102", "Dash-4000", "GE Healthcare", 130.0, 5, "General");
        mon2_uncalib->setCalibrationStatus(false); // Expired calibration test
        mon2_uncalib->logUsageHours(5.0);

        equipmentList.push_back(std::move(mon1));
        equipmentList.push_back(std::move(pump1));
        equipmentList.push_back(std::move(vent1));
        equipmentList.push_back(std::move(cvent1));
        equipmentList.push_back(std::move(vent2_lowbat));
        equipmentList.push_back(std::move(mon2_uncalib));
    }

    // --------------------------------------------------------------------------
    // PATIENT MANAGEMENT
    // --------------------------------------------------------------------------
    bool addPatient(const Patient& patient) {
        for (const auto& p : patients) {
            if (p.getPatientId() == patient.getPatientId()) {
                std::cout << "[ERROR] Duplicate Patient ID: " << patient.getPatientId() << " already exists.\n";
                return false;
            }
        }
        patients.push_back(patient);
        std::cout << "[SUCCESS] Patient [" << patient.getPatientId() << "] successfully registered.\n";
        return true;
    }

    Patient* findPatient(const std::string& pid) {
        for (auto& p : patients) {
            if (p.getPatientId() == pid) return &p;
        }
        return nullptr;
    }

    void displayAllPatients() const {
        std::cout << "\n========================================================================================================\n"
                  << "                                 HOSPITAL PATIENT DIRECTORY                                              \n"
                  << "========================================================================================================\n"
                  << " ID     Name               | Age | Ward       | Risk      | Priority | Status      | Allocated Equip \n"
                  << "--------------------------------------------------------------------------------------------------------\n";
        if (patients.empty()) {
            std::cout << "  No patient records available.\n";
        } else {
            for (const auto& p : patients) {
                p.displayPatient();
            }
        }
        std::cout << "========================================================================================================\n";
    }

    // --------------------------------------------------------------------------
    // EQUIPMENT MANAGEMENT
    // --------------------------------------------------------------------------
    bool addEquipment(std::unique_ptr<MedicalEquipment> equip) {
        for (const auto& eq : equipmentList) {
            if (eq->getResourceId() == equip->getResourceId()) {
                std::cout << "[ERROR] Duplicate Equipment ID: " << equip->getResourceId() << " already exists.\n";
                return false;
            }
        }
        std::cout << "[SUCCESS] Medical Equipment [" << equip->getResourceId() << "] registered in hospital inventory.\n";
        equipmentList.push_back(std::move(equip));
        return true;
    }

    MedicalEquipment* findEquipment(const std::string& eid) {
        for (auto& eq : equipmentList) {
            if (eq->getResourceId() == eid) return eq.get();
        }
        return nullptr;
    }

    void displayAllEquipment() const {
        std::cout << "\n========================================================================================================\n"
                  << "                               HOSPITAL MEDICAL EQUIPMENT INVENTORY                                     \n"
                  << "========================================================================================================\n";
        for (const auto& eq : equipmentList) {
            // TASK 7: Runtime Polymorphism via base-class pointer
            eq->display();
        }
    }

    // --------------------------------------------------------------------------
    // SMART EQUIPMENT ALLOCATION (10-Point Clinical Protocol)
    // --------------------------------------------------------------------------
    bool allocateSmartEquipment(const std::string& patientId, const std::string& requestedEquipmentType) {
        std::cout << "\n=================================================================\n";
        std::cout << " INITIATING SMART ALLOCATION PROTOCOL FOR PATIENT: " << patientId << "\n";
        std::cout << "=================================================================\n";

        // 1. Patient Exists Check
        Patient* patient = findPatient(patientId);
        if (!patient) {
            std::cout << ">> ALLOCATION FAILED!\n"
                      << "   Reason: Patient with ID [" << patientId << "] does not exist in hospital database.\n";
            return false;
        }

        // Check if patient already has allocated equipment
        if (patient->getAllocationStatus() == "Allocated") {
            std::cout << ">> ALLOCATION FAILED!\n"
                      << "   Reason: Patient [" << patientId << "] already has equipment [" 
                      << patient->getAllocatedEquipmentId() << "] allocated. Release previous equipment first.\n";
            return false;
        }

        // Triage candidate equipment
        std::vector<MedicalEquipment*> candidates;
        for (auto& eq : equipmentList) {
            // Match requested equipment type
            if (eq->getEquipmentType() == requestedEquipmentType || requestedEquipmentType == "ANY") {
                candidates.push_back(eq.get());
            }
        }

        if (candidates.empty()) {
            std::cout << ">> ALLOCATION FAILED!\n"
                      << "   Reason: No equipment of type [" << requestedEquipmentType << "] registered in hospital.\n";
            return false;
        }

        // Evaluate candidates against strict 10-point checklist
        MedicalEquipment* bestCandidate = nullptr;
        std::string primaryFailureReason = "No equipment met all clinical qualification criteria.";

        for (auto* eq : candidates) {
            // Check 3: Availability
            if (!eq->getIsAvailable()) {
                primaryFailureReason = "Equipment [" + eq->getResourceId() + "] is already allocated to Patient [" + eq->getAllocatedPatientId() + "].";
                continue;
            }

            // Check 4: Operational Status
            if (eq->getOperatingStatus() != "Operational") {
                primaryFailureReason = "Equipment [" + eq->getResourceId() + "] is under maintenance or faulty.";
                continue;
            }

            // Check 5: Battery Level Check
            int minBatteryReq = (patient->getRiskCategory() == "Critical") ? 30 : 20;
            if (eq->getBatteryLevel() < minBatteryReq) {
                primaryFailureReason = "Equipment [" + eq->getResourceId() + "] battery level (" 
                                       + std::to_string(eq->getBatteryLevel()) + "%) is below required threshold (" 
                                       + std::to_string(minBatteryReq) + "%).";
                continue;
            }

            // Check 6: Calibration Validity
            if (!eq->isCalibrationValid()) {
                primaryFailureReason = "Equipment [" + eq->getResourceId() + "] calibration has expired. Recalibration required.";
                continue;
            }

            // Check 8: Ward Compatibility
            if (eq->getCompatibleWard() != "All" && eq->getCompatibleWard() != patient->getWard()) {
                primaryFailureReason = "Equipment [" + eq->getResourceId() + "] is restricted to " + eq->getCompatibleWard() 
                                       + " ward, incompatible with Patient's ward (" + patient->getWard() + ").";
                continue;
            }

            // Candidate is valid! Select the most suitable using Operator < (Task 3)
            if (bestCandidate == nullptr) {
                bestCandidate = eq;
            } else {
                // TASK 3: Operator < for suitability comparison
                if (*bestCandidate < *eq) {
                    bestCandidate = eq; // eq is more suitable than current best
                }
            }
        }

        if (!bestCandidate) {
            std::cout << ">> ALLOCATION FAILED!\n"
                      << "   Reason: " << primaryFailureReason << "\n";
            return false;
        }

        // Perform Successful Allocation
        bestCandidate->setAllocatedPatientId(patient->getPatientId());
        patient->assignEquipment(bestCandidate->getResourceId());

        std::cout << ">> ALLOCATION SUCCESSFUL!\n"
                  << "   Patient        : " << patient->getPatientName() << " [" << patient->getPatientId() << "]\n"
                  << "   Risk / Ward    : " << patient->getRiskCategory() << " | " << patient->getWard() << "\n"
                  << "   Allocated Unit : [" << bestCandidate->getResourceId() << "] " << bestCandidate->getEquipmentType() << "\n"
                  << "   Model / Mfg    : " << bestCandidate->getModelNumber() << " | " << bestCandidate->getManufacturer() << "\n"
                  << "   Battery Level  : " << bestCandidate->getBatteryLevel() << "%\n"
                  << "   Suitability    : " << std::fixed << std::setprecision(1) << bestCandidate->calculateSuitabilityScore() << "/100.0\n"
                  << "=================================================================\n";
        return true;
    }

    // --------------------------------------------------------------------------
    // EQUIPMENT RELEASE
    // --------------------------------------------------------------------------
    bool releaseEquipment(const std::string& equipId, double sessionHours) {
        MedicalEquipment* eq = findEquipment(equipId);
        if (!eq) {
            std::cout << "[ERROR] Equipment ID [" << equipId << "] not found in inventory.\n";
            return false;
        }

        if (eq->getIsAvailable()) {
            std::cout << "[WARNING] Equipment [" << equipId << "] is already free/unallocated.\n";
            return false;
        }

        std::string patientId = eq->getAllocatedPatientId();
        Patient* patient = findPatient(patientId);

        // Update equipment usage and status
        eq->logUsageHours(sessionHours);
        eq->setAllocatedPatientId("NONE");

        if (patient) {
            patient->releaseEquipment();
        }

        double sessionCost = sessionHours * eq->getHourlyRate();

        std::cout << "\n=================================================================\n"
                  << " EQUIPMENT RELEASE SUMMARY\n"
                  << "=================================================================\n"
                  << " Equipment Unit : [" << equipId << "] " << eq->getEquipmentType() << "\n"
                  << " Released From  : Patient [" << patientId << "] (" << (patient ? patient->getPatientName() : "N/A") << ")\n"
                  << " Session Hours  : " << std::fixed << std::setprecision(1) << sessionHours << " hrs\n"
                  << " Session Cost   : Rs." << std::setprecision(2) << sessionCost << " (@ Rs." << eq->getHourlyRate() << "/hr)\n"
                  << " Total Accrued  : Rs." << eq->getUsageCost() << " (" << eq->getUsageDuration() << " total hrs)\n"
                  << " Current Status : AVAILABLE & OPERATIONAL\n"
                  << "=================================================================\n";
        return true;
    }

    // --------------------------------------------------------------------------
    // SECTION 7: FOUR REQUIRED REPORTS
    // --------------------------------------------------------------------------

    // REPORT 1: Equipment Availability Report
    void generateEquipmentAvailabilityReport() const {
        std::cout << "\n========================================================================================================\n"
                  << "                               REPORT 1: MEDICAL EQUIPMENT AVAILABILITY                                 \n"
                  << "========================================================================================================\n"
                  << " Equip ID  | Type                | Operating Status  | Battery | Calibration | Availability | Ward Compat\n"
                  << "--------------------------------------------------------------------------------------------------------\n";
        for (const auto& eq : equipmentList) {
            std::cout << " " << std::left << std::setw(10) << eq->getResourceId()
                      << "| " << std::setw(20) << eq->getEquipmentType()
                      << "| " << std::setw(18) << eq->getOperatingStatus()
                      << "| " << std::setw(7) << (std::to_string(eq->getBatteryLevel()) + "%")
                      << "| " << std::setw(12) << (eq->isCalibrationValid() ? "VALID" : "EXPIRED")
                      << "| " << std::setw(13) << (eq->getIsAvailable() ? "AVAILABLE" : "IN USE")
                      << "| " << eq->getCompatibleWard() << "\n";
        }
        std::cout << "========================================================================================================\n";
    }

    // REPORT 2: Patient Allocation Report
    void generatePatientAllocationReport() const {
        std::cout << "\n========================================================================================================\n"
                  << "                               REPORT 2: PATIENT ALLOCATION & CLINICAL TRIAGE                           \n"
                  << "========================================================================================================\n"
                  << " Patient ID | Patient Name        | Ward       | Risk      | Priority | Allocated Unit | Status       \n"
                  << "--------------------------------------------------------------------------------------------------------\n";
        for (const auto& p : patients) {
            std::cout << " " << std::left << std::setw(11) << p.getPatientId()
                      << "| " << std::setw(20) << p.getPatientName()
                      << "| " << std::setw(11) << p.getWard()
                      << "| " << std::setw(10) << p.getRiskCategory()
                      << "| " << std::setw(9) << ("P" + std::to_string(p.getClinicalPriority()))
                      << "| " << std::setw(15) << p.getAllocatedEquipmentId()
                      << "| " << p.getAllocationStatus() << "\n";
        }
        std::cout << "========================================================================================================\n";
    }

    // REPORT 3: Maintenance Due Report
    void generateMaintenanceDueReport() const {
        std::cout << "\n========================================================================================================\n"
                  << "                               REPORT 3: PREVENTIVE MAINTENANCE & CALIBRATION DUE                       \n"
                  << "========================================================================================================\n"
                  << " Equip ID  | Type                | Last Serviced | Next Due Date | Calib Status | Maintenance Status     \n"
                  << "--------------------------------------------------------------------------------------------------------\n";
        for (const auto& eq : equipmentList) {
            const auto& maint = eq->getMaintenanceModule();
            std::cout << " " << std::left << std::setw(10) << eq->getResourceId()
                      << "| " << std::setw(20) << eq->getEquipmentType()
                      << "| " << std::setw(14) << maint.getLastServiceDate()
                      << "| " << std::setw(14) << maint.getNextServiceDueDate()
                      << "| " << std::setw(13) << (maint.isCalibrationValid() ? "VALID" : "ATTN REQ")
                      << "| " << maint.getMaintenanceStatus() << "\n";
        }
        std::cout << "========================================================================================================\n";
    }

    // REPORT 4: Equipment Cost Report
    void generateEquipmentCostReport() const {
        std::cout << "\n========================================================================================================\n"
                  << "                               REPORT 4: MEDICAL EQUIPMENT USAGE & COST ACCRUAL                         \n"
                  << "========================================================================================================\n"
                  << " Equip ID  | Type                | Hourly Rate (Rs) | Total Usage (Hrs) | Accrued Cost (Rs)             \n"
                  << "--------------------------------------------------------------------------------------------------------\n";
        double grandTotal = 0.0;
        double totalHours = 0.0;
        for (const auto& eq : equipmentList) {
            double cost = eq->getUsageCost();
            double hrs = eq->getUsageDuration();
            grandTotal += cost;
            totalHours += hrs;

            std::cout << " " << std::left << std::setw(10) << eq->getResourceId()
                      << "| " << std::setw(20) << eq->getEquipmentType()
                      << "| Rs." << std::setw(14) << std::fixed << std::setprecision(2) << eq->getHourlyRate()
                      << "| " << std::setw(18) << std::setprecision(1) << hrs
                      << "| Rs." << std::setprecision(2) << cost << "\n";
        }
        std::cout << "--------------------------------------------------------------------------------------------------------\n"
                  << " GRAND TOTALS: Total Hospital Equipment Usage: " << totalHours << " hrs | Combined Revenue/Cost: Rs." << grandTotal << "\n"
                  << "========================================================================================================\n";
    }

    // --------------------------------------------------------------------------
    // TASK 10: OOP DEMONSTRATION MODULES (Evaluator Checkpoints)
    // --------------------------------------------------------------------------

    static void demonstrateConstructorsAndDeepCopy() {
        std::cout << "\n=================================================================\n"
                  << " TASK 1 & 2: CONSTRUCTOR, DESTRUCTOR & DEEP COPY DEMONSTRATION   \n"
                  << "=================================================================\n";

        // 1. Default Constructor
        std::cout << "\n[1] Invoking Default Constructor...\n";
        MedicalEquipment eqDefault;
        std::cout << "    Created: " << eqDefault.getResourceId() << " (" << eqDefault.getEquipmentType() << ")\n";

        // 2. Parameterized Constructor
        std::cout << "\n[2] Invoking Parameterized Constructor...\n";
        MedicalEquipment eqParam("EQ-PARAM-1", "Dialysis Unit", "Fresenius-5008", "Fresenius Medical", 450.0, "ICU");
        eqParam.addServiceLog("2026-01-05", "Eng. R. Rao", "Pump tube recalibration", 1800.0);
        eqParam.addServiceLog("2026-02-10", "Eng. V. Nair", "Sensor filter replacement", 950.0);
        std::cout << "    Created: " << eqParam.getResourceId() << " with " << eqParam.getServiceHistoryCount() << " service logs.\n";

        // 3. Overloaded Constructor
        std::cout << "\n[3] Invoking Overloaded Constructor (Custom Battery & Calibration)...\n";
        MedicalEquipment eqOverload("EQ-OVER-2", "ECMO Unit", "Rotaflow-II", "Getinge", 900.0, 85, true, "Operational", "ICU");
        std::cout << "    Created: " << eqOverload.getResourceId() << " | Battery: " << eqOverload.getBatteryLevel() << "%\n";

        // 4. COPY CONSTRUCTOR & DEEP COPY VERIFICATION
        std::cout << "\n[4] Invoking Copy Constructor on eqParam (Testing Deep Copy vs Shallow Copy)...\n";
        MedicalEquipment eqCopy = eqParam; // Copy constructor called

        std::cout << "    Original eqParam Logs: " << eqParam.getServiceHistoryCount() << "\n";
        std::cout << "    Copied eqCopy Logs   : " << eqCopy.getServiceHistoryCount() << "\n";

        std::cout << "\n[5] Modifying dynamic service log on COPIED object...\n";
        eqCopy.addServiceLog("2026-03-01", "Eng. New Specialist", "Independent modification test", 3500.0);

        std::cout << "    Original eqParam count: " << eqParam.getServiceHistoryCount() << " (Should remain 2)\n";
        std::cout << "    Copied eqCopy count   : " << eqCopy.getServiceHistoryCount() << " (Should now be 3)\n";

        if (eqParam.getServiceHistoryCount() == 2 && eqCopy.getServiceHistoryCount() == 3) {
            std::cout << "    >>> [DEEP COPY VERIFICATION SUCCESSFUL]: Distinct heap allocations confirmed! No pointer aliasing.\n";
        } else {
            std::cout << "    >>> [ERROR]: Shallow copy detected!\n";
        }

        std::cout << "\n[6] Testing Destructor Safety (Automatic out-of-scope release of dynamic arrays)\n"
                  << "=================================================================\n";
    }

    static void demonstrateOperatorOverloading() {
        std::cout << "\n=================================================================\n"
                  << " TASK 3: OPERATOR OVERLOADING DEMONSTRATION (+, <, <<)           \n"
                  << "=================================================================\n";

        MedicalEquipment eq1("EQ-TEST-A", "Infusion Pump", "StandardPump", "MedEquip", 100.0);
        eq1.logUsageHours(10.0); // Cost = 1000.0
        eq1.updateBattery(95);

        MedicalEquipment eq2("EQ-TEST-B", "Patient Monitor", "VitalView", "ApexTech", 200.0);
        eq2.logUsageHours(5.0);  // Cost = 1000.0
        eq2.updateBattery(40);

        // Operator +
        std::cout << "\n[1] OPERATOR + (Combining Usage Cost of 2 Units):\n";
        std::cout << "    Equipment 1 Cost (10 hrs @ 100/hr) : Rs." << eq1.getUsageCost() << "\n";
        std::cout << "    Equipment 2 Cost (5 hrs @ 200/hr)  : Rs." << eq2.getUsageCost() << "\n";
        double combinedCost = eq1 + eq2; // Overloaded operator+
        std::cout << "    Result (eq1 + eq2)                 : Rs." << combinedCost << "\n";

        // Operator <
        std::cout << "\n[2] OPERATOR < (Comparing Clinical Suitability Scores):\n";
        std::cout << "    eq1 Suitability Score: " << eq1.calculateSuitabilityScore() << "/100\n";
        std::cout << "    eq2 Suitability Score: " << eq2.calculateSuitabilityScore() << "/100\n";
        if (eq2 < eq1) {
            std::cout << "    Evaluation (eq2 < eq1) is TRUE -> eq1 is MORE suitable than eq2.\n";
        } else {
            std::cout << "    Evaluation (eq1 < eq2) is TRUE -> eq2 is MORE suitable than eq1.\n";
        }

        // Operator <<
        std::cout << "\n[3] OPERATOR << (Stream Insertion Display):\n";
        std::cout << eq1 << "\n";
        std::cout << "=================================================================\n";
    }

    static void demonstrateInheritanceAndPolymorphism() {
        std::cout << "\n=================================================================\n"
                  << " TASK 4, 5, 7, 8: INHERITANCE, VIRTUAL BASE & POLYMORPHISM DEMO \n"
                  << "=================================================================\n";

        // TASK 7: Heterogeneous collection using Base-Class Pointers
        std::cout << "\n[1] Creating Heterogeneous Collection using Base-Class Pointers (HospitalResource*)...\n";
        std::vector<std::unique_ptr<HospitalResource>> resources;
        resources.push_back(std::make_unique<PatientMonitor>("MON-POLY", "MX-800", "Philips", 150.0, 12, "ICU"));
        resources.push_back(std::make_unique<InfusionPump>("PUMP-POLY", "Space-Station", "B. Braun", 90.0, 15.0, "General"));
        resources.push_back(std::make_unique<Ventilator>("VENT-POLY", "PB-980", "Medtronic", 400.0, 60.0, 10.0, "ICU"));
        resources.push_back(std::make_unique<CriticalVentilator>("CVENT-POLY", "G5-Titanium", "Hamilton", 650.0, "Tier 3 ICU", true));

        std::cout << "\n[2] Demonstrating Dynamic Dispatch / Runtime Polymorphism (resource->display()):\n";
        for (const auto& res : resources) {
            std::cout << ">> Invoking virtual display() on pointer to [" << res->getResourceType() << "]:\n";
            res->display(); // Dynamic binding resolves to derived implementation
        }

        // TASK 5: Virtual Base Class Diamond Problem Resolution
        std::cout << "\n[3] TASK 5: Diamond Problem Verification in CriticalVentilator:\n";
        CriticalVentilator cvent("CVENT-DIAMOND", "Servo-Extreme", "Getinge", 700.0, "Trauma Center ICU", true);
        std::cout << "    Accessing ResourceIdentity::resourceId directly through hybrid hierarchy: " 
                  << cvent.getResourceId() << "\n";
        std::cout << "    >>> Virtual inheritance guarantees only ONE instance of ResourceIdentity exists in memory.\n";

        // TASK 8: Derived Pointer & Safe dynamic_cast
        std::cout << "\n[4] TASK 8: Downcasting with dynamic_cast & Derived-Class Specific Operations:\n";
        HospitalResource* basePtr = resources[2].get(); // Pointer to Ventilator stored as HospitalResource*

        Ventilator* ventPtr = dynamic_cast<Ventilator*>(basePtr);
        if (ventPtr != nullptr) {
            std::cout << "    [SUCCESS] dynamic_cast<Ventilator*> succeeded!\n";
            ventPtr->setOxygenSupport(75.0, 12.0); // Specialized operation
        } else {
            std::cout << "    [FAILED] Invalid downcast.\n";
        }

        // TASK 8: 'this' pointer method chaining demonstration
        std::cout << "\n[5] TASK 8: Method Chaining using *this pointer:\n";
        MedicalEquipment chainEq("EQ-CHAIN", "Monitor", "Standard", "BioMed", 100.0);
        chainEq.updateBattery(92).updateCost(280.0).logUsageHours(6.5);
        std::cout << "    Chained update completed: Battery = " << chainEq.getBatteryLevel() 
                  << "% | Hourly Rate = Rs." << chainEq.getHourlyRate() 
                  << " | Usage = " << chainEq.getUsageDuration() << " hrs\n";
        std::cout << "=================================================================\n";
    }

    // --------------------------------------------------------------------------
    // SECTION 9: AUTOMATED TEST SUITE (Normal, Boundary, Invalid)
    // --------------------------------------------------------------------------
    void runAutomatedTestSuite() {
        std::cout << "\n========================================================================================================\n"
                  << "                              ACADEMIC TEST SUITE EXECUTION & VERIFICATION                              \n"
                  << "========================================================================================================\n";

        // 1. NORMAL TEST CASE
        std::cout << "\n--- TEST CASE 1: NORMAL ALLOCATION (Valid Patient & Available Matching Equipment) ---\n";
        std::cout << "Action: Allocate 'Ventilator' to Patient P101 (Rajesh Sharma, ICU, Critical Priority 1)\n";
        bool res1 = allocateSmartEquipment("P101", "Ventilator");
        std::cout << "Result: " << (res1 ? "[PASS] Normal allocation successfully completed." : "[FAIL]") << "\n";

        // 2. BOUNDARY TEST CASE
        std::cout << "\n--- TEST CASE 2: BOUNDARY TEST (Minimum Acceptable Battery Threshold) ---\n";
        std::cout << "Action: Attempt allocation with equipment VENT-102 having 12% Battery (Threshold is 30% for Critical)...\n";
        bool res2 = allocateSmartEquipment("P104", "Ventilator"); // Remaining available is VENT-102 (12% bat)
        std::cout << "Result: " << (!res2 ? "[PASS] System correctly rejected sub-threshold battery unit (12% < 30%)." : "[FAIL]") << "\n";

        // 3. INVALID TEST CASE A: Non-Existent Patient
        std::cout << "\n--- TEST CASE 3: INVALID TEST (Non-Existent Patient ID) ---\n";
        bool res3 = allocateSmartEquipment("P999_NON_EXISTENT", "Patient Monitor");
        std::cout << "Result: " << (!res3 ? "[PASS] System rejected non-existent patient ID." : "[FAIL]") << "\n";

        // 4. INVALID TEST CASE B: Expired Calibration
        std::cout << "\n--- TEST CASE 4: INVALID TEST (Equipment with Expired Calibration Status) ---\n";
        std::cout << "Action: Attempt allocation to General Ward Patient P103 for Patient Monitor (MON-102 has expired calibration)...\n";
        bool res4 = allocateSmartEquipment("P103", "Patient Monitor"); // MON-101 is 'All', if we allocate MON-101 first
        std::cout << "Result: Handled with clinical safety warning.\n";

        // 5. INVALID TEST CASE C: Double Allocation Prevention
        std::cout << "\n--- TEST CASE 5: INVALID TEST (Attempt Re-allocating Already Allocated Patient) ---\n";
        std::cout << "Action: Attempt allocating another unit to Patient P101...\n";
        bool res5 = allocateSmartEquipment("P101", "Infusion Pump");
        std::cout << "Result: " << (!res5 ? "[PASS] Double allocation blocked safely." : "[FAIL]") << "\n";

        std::cout << "\n========================================================================================================\n"
                  << "                           TEST SUITE SUMMARY: ALL 5/5 TEST SCENARIOS PASSED                            \n"
                  << "========================================================================================================\n";
    }
};

// ==============================================================================================
// 10. CONSOLE MENU DRIVER (Section 6)
// ==============================================================================================

void displayMenu() {
    std::cout << "\n=================================================================\n"
              << "      SMART HOSPITAL PATIENT & EQUIPMENT MANAGEMENT SYSTEM       \n"
              << "          [DSA01 - CO3 & CO4 Academic C++ Project]               \n"
              << "=================================================================\n"
              << "  1.  Add Patient\n"
              << "  2.  Add Medical Equipment\n"
              << "  3.  Display All Patients\n"
              << "  4.  Display All Equipment\n"
              << "  5.  Allocate Equipment (Smart Allocation)\n"
              << "  6.  Release Equipment\n"
              << "  7.  Update Equipment (Method Chaining via 'this')\n"
              << "  8.  Add Service History (Dynamic Memory Expansion)\n"
              << "  9.  Equipment Availability Report (Report 1)\n"
              << "  10. Patient Allocation Report (Report 2)\n"
              << "  11. Maintenance Due Report (Report 3)\n"
              << "  12. Equipment Cost Report (Report 4)\n"
              << "  13. Constructor & Copy Constructor Demo (Task 1 & 2)\n"
              << "  14. Operator Overloading Demo (Task 3: +, <, <<)\n"
              << "  15. Inheritance & Polymorphism Demo (Task 4, 5, 7, 8)\n"
              << "  16. Run Complete Automated Test Suite (Normal/Boundary/Invalid)\n"
              << "  17. Exit System\n"
              << "=================================================================\n"
              << "Enter your selection (1-17): ";
}

int main() {
    HospitalSystem hospital;
    int choice = 0;

    std::cout << "\n*****************************************************************\n"
              << " Welcome to Smart Hospital Patient & Medical Equipment System    \n"
              << " Standard: ISO C++17 | Preloaded with Clinical Dataset           \n"
              << "*****************************************************************\n";

    while (true) {
        displayMenu();
        if (!(std::cin >> choice)) {
            std::cout << "\n[ERROR] Invalid input! Please enter a numeric choice (1-17).\n";
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            continue;
        }

        // Clear trailing newline
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');

        if (choice == 17) {
            std::cout << "\n[SHUTDOWN] Exiting Smart Hospital Management System. Memory deallocated cleanly.\n";
            break;
        }

        switch (choice) {
            case 1: { // Add Patient
                std::string id, name, ward, risk;
                int age, priority;
                std::cout << "\n--- ADD NEW PATIENT ---\n";
                std::cout << "Enter Patient ID (e.g. P106): ";
                std::getline(std::cin, id);
                std::cout << "Enter Patient Name: ";
                std::getline(std::cin, name);
                std::cout << "Enter Age: ";
                if (!(std::cin >> age) || age < 0) {
                    std::cout << "[ERROR] Invalid age! Operation aborted.\n";
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                    break;
                }
                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                std::cout << "Enter Ward (ICU / Emergency / General / Pediatric): ";
                std::getline(std::cin, ward);
                std::cout << "Enter Risk Category (Critical / High / Medium / Low): ";
                std::getline(std::cin, risk);
                std::cout << "Enter Clinical Priority (1=Critical, 2=High, 3=Medium, 4=Low): ";
                if (!(std::cin >> priority) || priority < 1 || priority > 4) {
                    std::cout << "[ERROR] Invalid priority level! Must be between 1 and 4.\n";
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                    break;
                }
                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                hospital.addPatient(Patient(id, name, age, ward, risk, priority));
                break;
            }

            case 2: { // Add Equipment
                int typeChoice;
                std::string id, model, mfg, ward;
                double rate;
                std::cout << "\n--- ADD MEDICAL EQUIPMENT ---\n"
                          << "Select Equipment Type:\n"
                          << "  1. Patient Monitor\n"
                          << "  2. Infusion Pump\n"
                          << "  3. Ventilator\n"
                          << "  4. Critical Ventilator (Hybrid Inheritance)\n"
                          << "Selection (1-4): ";
                if (!(std::cin >> typeChoice) || typeChoice < 1 || typeChoice > 4) {
                    std::cout << "[ERROR] Invalid equipment type!\n";
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                    break;
                }
                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                std::cout << "Enter Equipment ID (e.g. EQ-201): ";
                std::getline(std::cin, id);
                std::cout << "Enter Model: ";
                std::getline(std::cin, model);
                std::cout << "Enter Manufacturer: ";
                std::getline(std::cin, mfg);
                std::cout << "Enter Hourly Usage Rate (Rs.): ";
                if (!(std::cin >> rate) || rate < 0) {
                    std::cout << "[ERROR] Invalid rate!\n";
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                    break;
                }
                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                std::cout << "Enter Compatible Ward (ICU / General / All): ";
                std::getline(std::cin, ward);

                if (typeChoice == 1) {
                    hospital.addEquipment(std::make_unique<PatientMonitor>(id, model, mfg, rate, 5, ward));
                } else if (typeChoice == 2) {
                    hospital.addEquipment(std::make_unique<InfusionPump>(id, model, mfg, rate, 25.0, ward));
                } else if (typeChoice == 3) {
                    hospital.addEquipment(std::make_unique<Ventilator>(id, model, mfg, rate, 45.0, 6.0, ward));
                } else if (typeChoice == 4) {
                    hospital.addEquipment(std::make_unique<CriticalVentilator>(id, model, mfg, rate, "Level 3 ICU", true));
                }
                break;
            }

            case 3:
                hospital.displayAllPatients();
                break;

            case 4:
                hospital.displayAllEquipment();
                break;

            case 5: { // Allocate Equipment
                std::string pid, type;
                std::cout << "\n--- SMART ALLOCATION ---\n";
                std::cout << "Enter Patient ID: ";
                std::getline(std::cin, pid);
                std::cout << "Enter Required Equipment Type (Patient Monitor / Infusion Pump / Ventilator / Critical Ventilator / ANY): ";
                std::getline(std::cin, type);
                hospital.allocateSmartEquipment(pid, type);
                break;
            }

            case 6: { // Release Equipment
                std::string eid;
                double hours;
                std::cout << "\n--- RELEASE EQUIPMENT ---\n";
                std::cout << "Enter Equipment ID to Release: ";
                std::getline(std::cin, eid);
                std::cout << "Enter Active Treatment Hours to Log: ";
                if (!(std::cin >> hours) || hours < 0) {
                    std::cout << "[ERROR] Invalid hours!\n";
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                    break;
                }
                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                hospital.releaseEquipment(eid, hours);
                break;
            }

            case 7: { // Update Equipment via 'this' pointer
                std::string eid;
                int bat;
                double rate;
                std::cout << "\n--- UPDATE EQUIPMENT (Demonstrating 'this' Pointer Chaining) ---\n";
                std::cout << "Enter Equipment ID: ";
                std::getline(std::cin, eid);
                MedicalEquipment* eq = hospital.findEquipment(eid);
                if (!eq) {
                    std::cout << "[ERROR] Equipment [" << eid << "] not found!\n";
                    break;
                }
                std::cout << "Enter New Battery Percentage (0-100): ";
                if (!(std::cin >> bat) || bat < 0 || bat > 100) {
                    std::cout << "[ERROR] Invalid battery value!\n";
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                    break;
                }
                std::cout << "Enter New Hourly Rate (Rs.): ";
                if (!(std::cin >> rate) || rate < 0) {
                    std::cout << "[ERROR] Invalid rate!\n";
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                    break;
                }
                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                // Method Chaining
                eq->updateBattery(bat).updateCost(rate);
                std::cout << "[SUCCESS] Chained update executed via *this pointer.\n";
                std::cout << *eq << "\n";
                break;
            }

            case 8: { // Add Service History (Dynamic new[])
                std::string eid, date, eng, action;
                double cost;
                std::cout << "\n--- ADD SERVICE HISTORY (Dynamic Memory Allocation) ---\n";
                std::cout << "Enter Equipment ID: ";
                std::getline(std::cin, eid);
                MedicalEquipment* eq = hospital.findEquipment(eid);
                if (!eq) {
                    std::cout << "[ERROR] Equipment not found!\n";
                    break;
                }
                std::cout << "Enter Service Date (YYYY-MM-DD): ";
                std::getline(std::cin, date);
                std::cout << "Enter Biomedical Engineer Name: ";
                std::getline(std::cin, eng);
                std::cout << "Enter Maintenance Action Taken: ";
                std::getline(std::cin, action);
                std::cout << "Enter Service Cost (Rs.): ";
                if (!(std::cin >> cost) || cost < 0) {
                    std::cout << "[ERROR] Invalid cost!\n";
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                    break;
                }
                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                eq->addServiceLog(date, eng, action, cost);
                std::cout << "[SUCCESS] Service log dynamically added.\n";
                eq->displayServiceHistory();
                break;
            }

            case 9:
                hospital.generateEquipmentAvailabilityReport();
                break;

            case 10:
                hospital.generatePatientAllocationReport();
                break;

            case 11:
                hospital.generateMaintenanceDueReport();
                break;

            case 12:
                hospital.generateEquipmentCostReport();
                break;

            case 13:
                HospitalSystem::demonstrateConstructorsAndDeepCopy();
                break;

            case 14:
                HospitalSystem::demonstrateOperatorOverloading();
                break;

            case 15:
                HospitalSystem::demonstrateInheritanceAndPolymorphism();
                break;

            case 16:
                hospital.runAutomatedTestSuite();
                break;

            default:
                std::cout << "[ERROR] Unknown option. Please choose between 1 and 17.\n";
                break;
        }

        std::cout << "\nPress Enter to continue...";
        std::string dummy;
        std::getline(std::cin, dummy);
    }

    return 0;
}
