export interface ServiceRecordModel {
  serviceDate: string;
  engineerName: string;
  actionTaken: string;
  serviceCost: number;
}

export interface BatteryModuleModel {
  batteryLevel: number;
  isCharging: boolean;
  backupDurationHours: number;
}

export interface MaintenanceModuleModel {
  lastServiceDate: string;
  nextServiceDueDate: string;
  calibrationValid: boolean;
  maintenanceStatus: 'Operational' | 'Maintenance Required' | 'Under Repair';
}

export interface MedicalEquipmentModel {
  resourceId: string;
  modelNumber: string;
  manufacturer: string;
  equipmentType: 'Patient Monitor' | 'Infusion Pump' | 'Ventilator' | 'Critical Ventilator';
  operatingStatus: 'Operational' | 'Allocated' | 'Under Maintenance';
  isAvailable: boolean;
  usageDurationHours: number;
  hourlyRate: number;
  allocatedPatientId: string;
  compatibleWard: 'ICU' | 'Emergency' | 'General' | 'Pediatric' | 'All';
  battery: BatteryModuleModel;
  maintenance: MaintenanceModuleModel;
  serviceHistory: ServiceRecordModel[];
  // Derived specific props
  ecgChannels?: number;
  flowRateMlPerHour?: number;
  fio2Percentage?: number;
  peepPressureCmH2O?: number;
  icuCertificationLevel?: string;
  dualOxygenBackupAvailable?: boolean;
}

export interface PatientModel {
  patientId: string;
  patientName: string;
  age: number;
  ward: 'ICU' | 'Emergency' | 'General' | 'Pediatric';
  riskCategory: 'Critical' | 'High' | 'Medium' | 'Low';
  clinicalPriority: 1 | 2 | 3 | 4;
  allocatedEquipmentId: string;
  allocationStatus: 'Unallocated' | 'Allocated' | 'Discharged';
}

export interface ConsoleLogLine {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'header' | 'system' | 'report';
  timestamp: string;
}
