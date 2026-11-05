export type UserRoleLevel = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3';

export type PortalId = 'PORTAL_FARM' | 'PORTAL_TRANSPORT' | 'PORTAL_GOVERNANCE' | 'PORTAL_VENTURES';

export interface UserSession {
  id: string;
  name: string;
  role: UserRoleLevel;
  roleTitle: string;
  department: string;
}

// ==========================================
// DIVISION 1: INTEGRATED LIVESTOCK FARM
// ==========================================
export type LivestockSection = 'CATTLE' | 'RAMS' | 'GOATS' | 'RABBITS' | 'POULTRY' | 'WATERFOWL' | 'SHEEP';

export type LivestockBatchStatus = 'HEALTHY' | 'MONITORING' | 'QUARANTINE' | 'QUARANTINED';

export type LivestockPurpose = 'FATTENING' | 'REPRODUCTION' | 'GENERAL';

export interface LivestockBatch {
  id: string;
  section: LivestockSection;
  tagOrFlock: string;
  subType: string;
  headCount: number;
  locationPen: string;
  purpose?: LivestockPurpose;
  costPerHead?: number;
  genderRatio?: string; // e.g. "320 Ewes, 100 Rams"
  ageCohort?: string;   // e.g. "Week 24 Layers" or "18 Months Steers"
  weightAvgKg?: number; // e.g. 2.4kg or 410kg
  status: LivestockBatchStatus;
  dailyProduction?: string; // e.g. "68 Crates / Day" or "140L Milk / Day"
  dateRegistered: string;
}

export type AnimalProductionUnitCode = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface AnimalProductionLedgerRow {
  id: string;
  unitCode: AnimalProductionUnitCode;
  unitName: string; // e.g. "A. CATTLE UNIT", "B. RAMS UNIT", "C. GOATS UNIT", "D. RABBITS UNIT", "E. POULTRY UNIT (CHICKENS)", "F. WATERFOWL UNIT (DUCKS & GEESE)"
  section: LivestockSection;
  breedOrProduct: string; // e.g. "Local Cattle (Fattening / Pertaining)"
  purpose: LivestockPurpose;
  liveCount: number;
  casualties: number;
  costPerHead: number;
  transportationCost: number;
  feedingCost: number;
  medicationCost: number;
  salaries: number;
  otherExpenses: number;
  totalUnitCost: number;
  totalExpenses: number;
  totalIncomeRevenue: number;
  netProfitLoss: number;
  notes?: string;
}

export interface FarmFeedingRecord {
  id: string;
  timestamp: string;
  section: LivestockSection;
  penLocation: string;
  feedType: string;
  quantityBags: number;
  costTotal?: number;
  loggedBy: string;
  userRole: UserRoleLevel;
  status?: 'ACTIVE' | 'QUARANTINED';
}

export type YieldType = 'EGGS_CRATES' | 'MILK_LITERS' | 'MEAT_LIVEWEIGHT' | 'MANURE_BAGS';

export interface ProductionYieldRecord {
  id: string;
  date: string;
  section: LivestockSection;
  batchOrPen: string;
  yieldType: YieldType;
  quantity: number;
  feedConsumedBags: number;
  calculatedFCR: number; // Feed Conversion Ratio
  qualityGrade: 'GRADE_A' | 'GRADE_B' | 'PREMIUM';
  loggedBy: string;
  status?: 'ACTIVE' | 'QUARANTINED';
}

export interface LivestockSalesRecord {
  id: string;
  date: string;
  section: LivestockSection;
  description: string; // e.g. "40 Live Balami Rams" or "120 Crates Farm Eggs"
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  customerName: string;
  paymentStatus: 'PAID' | 'CREDIT_PENDING_L3';
  authorizedBy?: string;
  status?: 'ACTIVE' | 'QUARANTINED';
}

export interface FarmMedicalRecord {
  id: string;
  timestamp: string;
  section: LivestockSection;
  targetBatch: string;
  type: 'VACCINATION' | 'TREATMENT' | 'ROUTINE_CHECK' | 'MORTALITY';
  diagnosisOrEvent: string;
  treatment: string;
  withdrawalPeriodDays?: number;
  mortalityCount: number;
  necropsyNotes?: string;
  vetName: string;
  cost: number;
  loggedBy: string;
  status?: 'ACTIVE' | 'QUARANTINED';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'FEED' | 'MEDICATION' | 'PRODUCE' | 'EQUIPMENT' | 'FUEL_RESERVE' | 'SPARE_PARTS' | 'PACKAGING_STOCK' | 'CROP_INPUTS';
  division: 'LIVESTOCK_FARM' | 'TRANSPORT_SERVICES' | 'WATER_FACTORY' | 'CASH_CROPS' | 'CENTRAL';
  currentStock: number;
  unit: string;
  reorderPoint: number;
  unitCost: number;
}

export interface InventoryMovement {
  id: string;
  timestamp: string;
  itemId: string;
  itemName: string;
  movementType: 'STOCK_IN_PROCUREMENT' | 'STOCK_IN_HARVEST' | 'STOCK_OUT_FEEDING' | 'STOCK_OUT_SALE' | 'ADJUSTMENT';
  quantity: number;
  balanceAfter: number;
  unit: string;
  referenceDoc: string;
  initiatedBy: string;
}

// ==========================================
// DIVISION 2: FLEET & TRANSPORT LOGISTICS
// ==========================================
export type VehicleType = 'MOTORCYCLE' | 'BUS' | 'TRIKE';

export interface FleetVehicle {
  id: string;
  plateNumber: string;
  type: VehicleType;
  makeModel: string;
  engineNumber: string;
  chassisNumber: string;
  acquisitionDate: string;
  purchasePrice: number;
  purchaseYear: number;
  depreciationRateAnnual: number; // e.g. 0.15 for 15%
  presentMarketValue: number;
  dailyTargetAmount: number;
  currentMileageKm: number;
  fuelEfficiencyKmL?: number; // e.g. 8.4 km/L
  operationalStatus: 'ACTIVE' | 'MAINTENANCE' | 'IMPOUNDED';
  driver: DriverBiodata;
}

export interface DriverBiodata {
  id: string;
  fullName: string;
  residentialAddress: string;
  phone: string;
  nationalIdNin: string; // National Identification Number (NIN)
  licenseNumber: string;
  licenseExpiry: string;
  passportPhoto: string;
  nextOfKin: {
    fullName: string;
    relationship: string;
    phone: string;
    address: string;
  };
  contractStatus: 'ACTIVE_HIRE_PURCHASE' | 'COMMISSION_DRIVER' | 'SALARIED';
  hirePurchaseDebtBalance?: number;
  cumulativeArrearsBalance?: number;
  guarantors: {
    name: string;
    phone: string;
    relationship: string;
    address: string;
  }[];
}

export interface DailyRemittanceRecord {
  id: string;
  timestamp: string;
  vehicleId: string;
  plateNumber: string;
  driverName: string;
  targetAmount: number;
  remittedAmount: number;
  deficitSurplus: number;
  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'POS';
  status: 'CLEARED' | 'PARTIAL_ARREARS' | 'DEFAULTED' | 'QUARANTINED';
  receivedBy: string;
}

export type MaintenanceClassification = 'SCHEDULED_PREVENTATIVE' | 'UNSCHEDULED_CORRECTIVE';

export interface FuelAndMaintenanceRecord {
  id: string;
  timestamp: string;
  vehiclePlate: string;
  vehicleType: VehicleType;
  recordType: 'FUEL' | 'MAINTENANCE';
  maintenanceType?: MaintenanceClassification;
  details: string;
  litersDispensed?: number;
  mileageKm: number;
  kmPerLiter?: number;
  isAbnormalFuelFlag?: boolean;
  costTotal: number;
  vendorName: string;
  partsReplaced?: string;
  nextServiceMileageKm?: number;
  receiptAttached: boolean;
  loggedBy: string;
  status?: 'ACTIVE' | 'QUARANTINED';
}

// ==========================================
// DIVISION 3: CENTRAL FINANCIALS & GOVERNANCE
// ==========================================
export type ExpenseCategory =
  | 'FEED_PURCHASE'
  | 'FUEL_LOGISTICS'
  | 'SPARE_PARTS'
  | 'VET_SUPPLIES'
  | 'STAFF_SALARIES'
  | 'UTILITIES_FACILITY'
  | 'WATER_PRODUCTION'
  | 'CROP_FERTILIZER'
  | 'FORESTRY_NURSERY';

export interface CategorizedExpenseRecord {
  id: string;
  date: string;
  division: 'LIVESTOCK_FARM' | 'TRANSPORT_SERVICES' | 'EXECUTIVE_OPS' | 'FUTURE_VENTURES';
  category: ExpenseCategory;
  description: string;
  amount: number;
  vendorName: string;
  receiptUrl?: string;
  receiptAttached: boolean;
  approvedBy?: string;
  loggedBy: string;
  status?: 'ACTIVE' | 'QUARANTINED';
}

export interface POLineItem {
  id: string;
  itemDescription: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

export interface PurchaseOrderRecord {
  id: string; // PO-2026-XXXX
  requisitionRef: string;
  dateIssued: string;
  vendorName: string;
  department: string;
  lineItems: POLineItem[];
  subTotal: number;
  taxAmount: number;
  grandTotal: number;
  deliveryTerms: string;
  paymentTerms: string;
  approvedByL3: string;
  status: 'PENDING_DELIVERY' | 'DELIVERED_STOCKED' | 'CANCELLED';
}

export type DebtAgingBracket = 'CURRENT' | '1_30_DAYS' | '31_60_DAYS' | '61_90_DAYS' | 'OVER_90_DAYS';

export interface DebtAgingRecord {
  id: string;
  accountType: 'RECEIVABLE_CLIENT_DEBT' | 'PAYABLE_VENDOR_LIABILITY';
  partyName: string;
  contractRef: string;
  principalAmount: number;
  balanceRemaining: number;
  dueDate: string;
  agingBracket: DebtAgingBracket;
  status: 'PENDING_L3_SANCTION' | 'ACTIVE_AMORTIZING' | 'CLEARED' | 'DEFAULT_FLAG';
  approvedByLevel3: string;
  notes: string;
}

export type ApprovalCategory = 'PURCHASE_ORDER' | 'DEBT_ASSUMPTION' | 'DELETION_QUARANTINE';

export interface PendingApprovalItem {
  id: string;
  timestamp: string;
  category: ApprovalCategory;
  title: string;
  description: string;
  department: string;
  amount?: number;
  repaymentTerms?: string;
  vendorName?: string;
  initiatedBy: string;
  initiatorLevel: UserRoleLevel;
  supervisorEndorsement?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  targetRecordId?: string;
  targetRecordType?: string;
}

export interface AuditTrailEntry {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  userId?: string;
  roleLevel: UserRoleLevel;
  details: string;
  ipAddress: string;
  hash: string;
}

// ==========================================
// DIVISION 4: FUTURE EXPANSION ARCHITECTURE
// ==========================================
export interface ViewingCentreMatchEvent {
  id: string;
  fixtureTitle: string;
  tournament: string;
  startTime: string;
  ticketPrice: number;
  totalCapacity: number;
  ticketsSoldVIP: number;
  ticketsSoldRegular: number;
  gateIncomeTotal: number;
  concessionsRevenue: number;
  broadcastStatus: 'SCHEDULED' | 'LIVE_BROADCAST' | 'CONCLUDED';
}

export interface CashCropsPlotRecord {
  id: string;
  plotCode: string; // e.g. PLOT-NORTH-25HA
  cropName: 'Yellow Maize' | 'Soybeans' | 'Tuber Cassava';
  hectares: number;
  soilMoisturePercent: number;
  fertilizerBagsApplied: number;
  growthStage: string;
  expectedYieldTonnes: number;
  status: 'LAND_PREP' | 'VEGETATIVE_GROWTH' | 'HARVEST_READY';
}

export interface TableWaterBatchRun {
  id: string;
  batchCode: string; // e.g. TW-2026-092
  productLine: 'SACHET_50CL' | 'BOTTLE_50CL' | 'BOTTLE_75CL' | 'DISPENSER_19L';
  unitsProduced: number;
  targetUnits: number;
  phTelemetry: number;
  tdsTelemetry: number;
  nafdacCertStamped: boolean;
  packagingFilmConsumedKg: number;
  preformsConsumed: number;
  bottlingStatus: 'ACTIVE_RUN' | 'LAB_RELEASED' | 'DISPATCHED_TO_DISTRIBUTORS';
}

export interface ForestryNurseryBed {
  id: string;
  bedCode: string;
  speciesName: 'Teak (Tectona grandis)' | 'Gmelina arborea' | 'Oil Palm (Tenera)' | 'Sweet Citrus';
  seedlingsGerminated: number;
  targetSeedlings: number;
  germinationRatePercent: number;
  stage: 'GERMINATION' | 'HARDENING' | 'READY_TRANSPLANT';
  estimatedCommercialValuation: number;
}
