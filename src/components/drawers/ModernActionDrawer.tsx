'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Wheat,
  Coins,
  Stethoscope,
  FilePlus2,
  BarChart3,
  DollarSign,
  Receipt,
  AlertCircle,
  CheckCircle2,
  Package,
  Truck,
  Fuel,
  Wrench,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import {
  UserRoleLevel,
  LivestockSection,
  LivestockPurpose,
  ExpenseCategory,
  InventoryItem,
  FleetVehicle,
  VehicleType,
  MaintenanceClassification,
  YieldType
} from '@/types';

export const BREED_PRESETS: Record<string, { name: string; purpose: LivestockPurpose; defaultCost: number }[]> = {
  CATTLE: [
    { name: 'Local Cattle (Fattening / Pertaining)', purpose: 'FATTENING', defaultCost: 320000 },
    { name: 'Local Cattle (Reproduction)', purpose: 'REPRODUCTION', defaultCost: 350000 },
    { name: 'Bokolo / Sokoto Gudali Cattle (Reproduction)', purpose: 'REPRODUCTION', defaultCost: 480000 },
    { name: 'Bokolo / Sokoto Gudali Cattle (Fattening / Pertaining)', purpose: 'FATTENING', defaultCost: 450000 },
  ],
  RAMS: [
    { name: 'Sudanese Rams (Reproduction)', purpose: 'REPRODUCTION', defaultCost: 95000 },
    { name: 'Sudanese Rams (Fattening / Pertaining)', purpose: 'FATTENING', defaultCost: 88000 },
    { name: 'Balami Rams (Reproduction)', purpose: 'REPRODUCTION', defaultCost: 140000 },
    { name: 'Balami Rams (Fattening / Pertaining)', purpose: 'FATTENING', defaultCost: 135000 },
    { name: 'Local and Uda Rams (Reproduction)', purpose: 'REPRODUCTION', defaultCost: 75000 },
    { name: 'Local and Uda Rams (Fattening / Pertaining)', purpose: 'FATTENING', defaultCost: 70000 },
  ],
  SHEEP: [
    { name: 'Sudanese Rams (Reproduction)', purpose: 'REPRODUCTION', defaultCost: 95000 },
    { name: 'Sudanese Rams (Fattening / Pertaining)', purpose: 'FATTENING', defaultCost: 88000 },
    { name: 'Balami Rams (Reproduction)', purpose: 'REPRODUCTION', defaultCost: 140000 },
    { name: 'Balami Rams (Fattening / Pertaining)', purpose: 'FATTENING', defaultCost: 135000 },
    { name: 'Local and Uda Rams (Reproduction)', purpose: 'REPRODUCTION', defaultCost: 75000 },
    { name: 'Local and Uda Rams (Fattening / Pertaining)', purpose: 'FATTENING', defaultCost: 70000 },
  ],
  GOATS: [
    { name: 'Local Goats (Reproduction)', purpose: 'REPRODUCTION', defaultCost: 32000 },
    { name: 'Local Goats (Fattening / Pertaining)', purpose: 'FATTENING', defaultCost: 28000 },
  ],
  RABBITS: [
    { name: 'New Zealand Rabbits (Fattening / Pertaining)', purpose: 'FATTENING', defaultCost: 6500 },
    { name: 'New Zealand Rabbits (Reproduction)', purpose: 'REPRODUCTION', defaultCost: 8000 },
    { name: 'Local Rabbits', purpose: 'GENERAL', defaultCost: 4000 },
  ],
  POULTRY: [
    { name: 'Brama Breeds', purpose: 'GENERAL', defaultCost: 12000 },
    { name: 'Nuwelas', purpose: 'GENERAL', defaultCost: 3500 },
    { name: 'Layers', purpose: 'REPRODUCTION', defaultCost: 2800 },
    { name: 'Cocks', purpose: 'FATTENING', defaultCost: 3800 },
    { name: 'Local Chickens', purpose: 'GENERAL', defaultCost: 2200 },
    { name: 'Broilers', purpose: 'FATTENING', defaultCost: 1400 },
  ],
  WATERFOWL: [
    { name: 'Local Water Ducks', purpose: 'GENERAL', defaultCost: 4500 },
    { name: 'Geese (Giggs)', purpose: 'GENERAL', defaultCost: 15000 },
    { name: 'Local Ducks', purpose: 'GENERAL', defaultCost: 4000 },
    { name: 'Other Breeds', purpose: 'GENERAL', defaultCost: 5000 },
  ],
};

interface ActionDrawerProps {
  currentRole: UserRoleLevel;
  activeDrawer: string | null;
  initialSection?: LivestockSection | null;
  onClose: () => void;
  inventory: InventoryItem[];
  fleet: FleetVehicle[];
  onAddFeedLog: (data: { section: LivestockSection; pen: string; feedType: string; bags: number }) => void;
  onAddRemittance: (data: { vehiclePlate: string; driverName: string; target: number; remitted: number; paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'POS'; periodType?: 'DAILY' | 'WEEKLY' }) => void;
  onAddMedical: (data: {
    section: LivestockSection;
    targetBatch: string;
    type: any;
    diagnosis: string;
    treatment: string;
    withdrawalPeriodDays: number;
    mortality: number;
    necropsyNotes: string;
    vetName: string;
    cost: number;
  }) => void;
  onAddRequisition: (data: { category: any; title: string; description: string; amount: number; terms: string; vendorName?: string }) => void;
  onAddYield: (data: { section: LivestockSection; batchOrPen: string; yieldType: YieldType; quantity: number; feedBags: number }) => void;
  onAddSale: (data: { section: LivestockSection; description: string; quantity: number; unitPrice: number; customer: string; paymentStatus: any }) => void;
  onAddExpense: (data: { division: any; category: ExpenseCategory; description: string; amount: number; vendor: string; section?: LivestockSection }) => void;
  onAddFuelMaintenance?: (data: {
    vehiclePlate: string;
    vehicleType: VehicleType;
    recordType: 'FUEL' | 'MAINTENANCE';
    maintenanceType?: MaintenanceClassification;
    details: string;
    litersDispensed?: number;
    mileageKm: number;
    costTotal: number;
    vendorName: string;
    partsReplaced?: string;
    nextServiceMileageKm?: number;
    isAbnormalFuelFlag?: boolean;
  }) => void;
  onRegisterLivestock?: (data: {
    section: LivestockSection;
    tagOrFlock: string;
    subType: string;
    headCount: number;
    locationPen: string;
    genderRatio: string;
    ageCohort: string;
    weightAvgKg: number;
    dailyProduction: string;
    purpose?: LivestockPurpose;
    costPerHead?: number;
    transportationCost?: number;
    feedingCost?: number;
    medicationCost?: number;
  }) => void;
  onStockInProcurement?: (data: {
    itemId: string;
    itemName: string;
    quantity: number;
    unitCost: number;
    supplier: string;
    referenceDoc: string;
  }) => void;
}

export const ModernActionDrawer: React.FC<ActionDrawerProps> = ({
  currentRole,
  activeDrawer,
  initialSection,
  onClose,
  inventory,
  fleet,
  onAddFeedLog,
  onAddRemittance,
  onAddMedical,
  onAddRequisition,
  onAddYield,
  onAddSale,
  onAddExpense,
  onAddFuelMaintenance,
  onRegisterLivestock,
  onStockInProcurement
}) => {
  // 1. Feed Log State
  const [feedSection, setFeedSection] = useState<LivestockSection>('POULTRY');
  const [feedPen, setFeedPen] = useState('Pen 1 - North Wing (Layers)');
  const [feedType, setFeedType] = useState('Layer Mash 25kg');
  const [feedBags, setFeedBags] = useState<number>(5);

  // Synchronize drawer default section if opened with a specific initialSection
  useEffect(() => {
    if (activeDrawer === 'REGISTER_LIVESTOCK') {
      setRegTransportationCost(0);
      setRegFeedingCost(0);
      setRegMedicationCost(0);
    }
    if (initialSection) {
      setFeedSection(initialSection);
      setMedSection(initialSection);
      setRegSection(initialSection);
      setSaleSection(initialSection);
      setExpFarmSection(initialSection);
      const presets = BREED_PRESETS[initialSection] || [];
      if (presets.length > 0) {
        setRegSubType(presets[0].name);
        setRegPurpose(presets[0].purpose);
        setRegCostPerHead(presets[0].defaultCost);
      }
    }
  }, [initialSection, activeDrawer]);

  // 2. Remittance State
  const [remitPeriod, setRemitPeriod] = useState<'DAILY' | 'WEEKLY'>('DAILY');
  const [selectedVehicle, setSelectedVehicle] = useState(fleet[0]?.plateNumber || 'KSF-842-XB');
  const matchedVehicle = fleet.find((v) => v.plateNumber === selectedVehicle || v.id === selectedVehicle) || fleet[0];
  const [targetAmount, setTargetAmount] = useState<number>(matchedVehicle ? matchedVehicle.dailyTargetAmount : 20000);
  const [remitAmount, setRemitAmount] = useState<number>(matchedVehicle ? matchedVehicle.dailyTargetAmount : 20000);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'BANK_TRANSFER' | 'POS'>('CASH');

  useEffect(() => {
    if (matchedVehicle) {
      setTargetAmount(matchedVehicle.dailyTargetAmount);
      setRemitAmount(matchedVehicle.dailyTargetAmount);
    }
  }, [selectedVehicle]);

  // 3. Medical State
  const [medSection, setMedSection] = useState<LivestockSection>('CATTLE');
  const [medBatch, setMedBatch] = useState('Cattle Dairy Barn (Bunaji Herd)');
  const [medType, setMedType] = useState<'VACCINATION' | 'TREATMENT' | 'ROUTINE_CHECK' | 'MORTALITY'>('ROUTINE_CHECK');
  const [medDiag, setMedDiag] = useState('Routine Tick Spray / Acaricide Dip');
  const [medTreatment, setMedTreatment] = useState('Applied Flumethrin pour-on 10ml');
  const [medWithdrawalDays, setMedWithdrawalDays] = useState<number>(7);
  const [medMortality, setMedMortality] = useState<number>(0);
  const [medNecropsyNotes, setMedNecropsyNotes] = useState('');
  const [medVetName, setMedVetName] = useState('Dr. Aliyu Mohammed (DVM)');
  const [medCost, setMedCost] = useState<number>(25000);

  // 4. Yield State
  const [ydSection, setYdSection] = useState<LivestockSection>('POULTRY');
  const [ydBatch, setYdBatch] = useState('Pen 1 - North Wing (Layers)');
  const [ydType, setYdType] = useState<YieldType>('EGGS_CRATES');
  const [ydQty, setYdQty] = useState<number>(68);
  const [ydFeedConsumed, setYdFeedConsumed] = useState<number>(14);

  // 5. Sale State
  const [saleSection, setSaleSection] = useState<LivestockSection>('POULTRY');
  const [saleDesc, setSaleDesc] = useState('Wholesale Fresh Farm Eggs (100 Crates)');
  const [saleQty, setSaleQty] = useState<number>(100);
  const [salePrice, setSalePrice] = useState<number>(3800);
  const [saleCustomer, setSaleCustomer] = useState('Royal Confectioneries Ltd');
  const [saleStatus, setSaleStatus] = useState<'PAID' | 'CREDIT_PENDING_L3'>('PAID');

  // 6. Expense State
  const [expDiv, setExpDiv] = useState<'LIVESTOCK_FARM' | 'TRANSPORT_SERVICES' | 'EXECUTIVE_OPS' | 'FUTURE_VENTURES'>('LIVESTOCK_FARM');
  const [expFarmSection, setExpFarmSection] = useState<LivestockSection>('CATTLE');
  const [expCategory, setExpCategory] = useState<ExpenseCategory>('FEED_PURCHASE');
  const [expDesc, setExpDesc] = useState('Bulk Procurement of Starter Mash Bags');
  const [expAmount, setExpAmount] = useState<number>(95000);
  const [expVendor, setExpVendor] = useState('Premier Feed Mills Ltd');

  // 7. Requisition State
  const [reqCategory, setReqCategory] = useState<'PURCHASE_ORDER' | 'DEBT_ASSUMPTION'>('PURCHASE_ORDER');
  const [reqTitle, setReqTitle] = useState('Emergency Safety Stock Replenishment');
  const [reqDesc, setReqDesc] = useState('Bulk procurement approved by supervisor. Required for active production cycle.');
  const [reqAmount, setReqAmount] = useState<number>(180000);
  const [reqTerms, setReqTerms] = useState('Net 14 Days Payment');
  const [reqVendor, setReqVendor] = useState('Premier Feed Mills Ltd');

  // 8. Fuel & Maintenance State
  const [fmVehiclePlate, setFmVehiclePlate] = useState(fleet[0]?.plateNumber || 'KSF-842-XB');
  const matchedFmVehicle = fleet.find((v) => v.plateNumber === fmVehiclePlate || v.id === fmVehiclePlate) || fleet[0];
  const [fmRecordType, setFmRecordType] = useState<'FUEL' | 'MAINTENANCE'>('FUEL');
  const [fmMaintenanceType, setFmMaintenanceType] = useState<MaintenanceClassification>('SCHEDULED_PREVENTATIVE');
  const [fmLiters, setFmLiters] = useState<number>(40);
  const [fmMileage, setFmMileage] = useState<number>(matchedFmVehicle ? matchedFmVehicle.currentMileageKm : 49000);
  const [fmCost, setFmCost] = useState<number>(48000);
  const [fmVendor, setFmVendor] = useState('TotalEnergies Retail Station');
  const [fmDetails, setFmDetails] = useState('Morning commercial fuel top-up');
  const [fmPartsReplaced, setFmPartsReplaced] = useState('Brake pads, engine oil 15W40');
  const [fmNextServiceMileage, setFmNextServiceMileage] = useState<number>(matchedFmVehicle ? matchedFmVehicle.currentMileageKm + 5000 : 54000);

  // 9. Register Livestock State
  const [regSection, setRegSection] = useState<LivestockSection>('CATTLE');
  const [regTag, setRegTag] = useState('');
  const [regSubType, setRegSubType] = useState('Local Cattle (Fattening / Pertaining)');
  const [regPurpose, setRegPurpose] = useState<LivestockPurpose>('FATTENING');
  const [regCostPerHead, setRegCostPerHead] = useState<number>(320000);
  const [regHeadCount, setRegHeadCount] = useState<number>(50);
  const [regPen, setRegPen] = useState('Paddock 1 - East Ranch');
  const [regGenderRatio, setRegGenderRatio] = useState('50% Male, 50% Female');
  const [regAgeCohort, setRegAgeCohort] = useState('18 to 24 Months');
  const [regWeightAvg, setRegWeightAvg] = useState<number>(320);
  const [regDailyProd, setRegDailyProd] = useState('Fattening Regime');
  const [regTransportationCost, setRegTransportationCost] = useState<number>(0);
  const [regFeedingCost, setRegFeedingCost] = useState<number>(0);
  const [regMedicationCost, setRegMedicationCost] = useState<number>(0);

  // 10. Stock-In Procurement State
  const [stockItemKey, setStockItemKey] = useState(inventory[0]?.id || 'INV-01');
  const matchedStockItem = inventory.find((i) => i.id === stockItemKey) || inventory[0];
  const [stockQty, setStockQty] = useState<number>(50);
  const [stockUnitCost, setStockUnitCost] = useState<number>(matchedStockItem ? matchedStockItem.unitCost : 8800);
  const [stockSupplier, setStockSupplier] = useState('Premier Feed Mills Ltd');
  const [stockDocRef, setStockDocRef] = useState('WAYBILL-2026-991');

  useEffect(() => {
    if (matchedStockItem) {
      setStockUnitCost(matchedStockItem.unitCost);
    }
  }, [stockItemKey]);

  if (!activeDrawer) return null;

  // Live calculation widgets
  const matchedFeedInv = inventory.find(
    (i) => i.category === 'FEED' && (i.name.toLowerCase().includes(feedType.toLowerCase()) || feedType.toLowerCase().includes(i.name.toLowerCase()))
  );
  const currentFeedStock = matchedFeedInv ? matchedFeedInv.currentStock : 100;
  const newFeedBalance = Math.max(0, currentFeedStock - (feedBags || 0));

  const deficit = (remitAmount || 0) - (targetAmount || 0);

  // FCR Calculation
  const calculatedFCR =
    ydQty > 0
      ? ydType === 'EGGS_CRATES'
        ? Number(((ydFeedConsumed * 25) / (ydQty * 1.8)).toFixed(2)) // approx 1.8kg eggs per crate
        : Number(((ydFeedConsumed * 25) / ydQty).toFixed(2))
      : 0;

  // Drawer Title and Icon
  const getDrawerMeta = () => {
    switch (activeDrawer) {
      case 'FEED_LOG':
        return { title: 'Record Animal Feeding', icon: Wheat, subtitle: 'Store feed stock will be deducted automatically', color: 'emerald' };
      case 'REMITTANCE':
        return { title: 'Driver Daily Cash Return', icon: Coins, subtitle: 'Record cash brought in by driver vs daily target', color: 'amber' };
      case 'YIELD_LOG':
        return { title: 'Record Milk & Eggs Yield', icon: BarChart3, subtitle: 'Log crates of eggs, liters of milk, or slaughter weights', color: 'blue' };
      case 'EXPENSE_LOG':
        return { title: 'Record Business Expense', icon: Receipt, subtitle: 'Record operational spending and vendor details', color: 'rose' };
      case 'SALE_LOG':
        return { title: 'Sell Farm Products & Animals', icon: DollarSign, subtitle: 'Record cash or credit sales of eggs, milk, or animals', color: 'emerald' };
      case 'REQUISITION':
        return { title: 'Request Funds / Draft PO', icon: FilePlus2, subtitle: 'Submitted to the General Manager for approval', color: 'indigo' };
      case 'FUEL_MAINTENANCE':
        return { title: 'Record Fuel or Vehicle Repair', icon: Fuel, subtitle: 'Record petrol/diesel bought or mechanic repair bill', color: 'cyan' };
      case 'REGISTER_LIVESTOCK':
        return { title: 'Add New Animals (Batch)', icon: Package, subtitle: 'Register new flock or herd and assign to a pen', color: 'emerald' };
      case 'STOCK_IN':
        return { title: 'Receive Stock into Store', icon: Package, subtitle: 'Add feed, medicines, or supplies to store inventory', color: 'blue' };
      case 'MEDICAL_LOG':
      default:
        return { title: 'Sick Animals, Medicine & Deaths', icon: Stethoscope, subtitle: 'Record treatments, medicine withdrawal days, or animal deaths', color: 'rose' };
    }
  };

  const meta = getDrawerMeta();
  const IconComponent = meta.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-slideInRight">
          
          {/* HEADER */}
          <div className="p-6 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">{meta.title}</h2>
                <p className="text-xs text-slate-500">{meta.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* FORM BODY */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* 1. FEED LOG FORM */}
            {activeDrawer === 'FEED_LOG' && (
              <form
                id="feed-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onAddFeedLog({
                    section: feedSection,
                    pen: feedPen,
                    feedType,
                    bags: Number(feedBags),
                  });
                  onClose();
                }}
                className="space-y-4 text-xs"
              >
                {/* Live Inventory Preview Card */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5 text-xs text-emerald-900">
                      <Package className="w-4 h-4 text-emerald-700" />
                      Warehouse Stock Telemetry
                    </span>
                    <span className="text-xs font-mono font-black text-emerald-800 px-2 py-0.5 bg-emerald-200 rounded">
                      Available: {currentFeedStock} Bags
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60 text-[11px]">
                    <span className="text-emerald-800">Remaining Balance Post-Dispense:</span>
                    <span className="font-mono font-black text-slate-900 text-xs">
                      {newFeedBalance} Bags
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Livestock Section</label>
                  <select
                    value={feedSection}
                    onChange={(e) => setFeedSection(e.target.value as LivestockSection)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  >
                    <option value="CATTLE">A. Cattle Unit</option>
                    <option value="RAMS">B. Rams Unit (Sheep)</option>
                    <option value="GOATS">C. Goats Unit</option>
                    <option value="RABBITS">D. Rabbits Unit</option>
                    <option value="POULTRY">E. Poultry Unit (Chickens)</option>
                    <option value="WATERFOWL">F. Waterfowl Unit (Ducks & Geese)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target Pen / Paddock Location</label>
                  <input
                    type="text"
                    value={feedPen}
                    onChange={(e) => setFeedPen(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Feed Ration SKU</label>
                    <select
                      value={feedType}
                      onChange={(e) => setFeedType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    >
                      <option value="Layer Mash 25kg">Layer Mash 25kg</option>
                      <option value="Broiler Finisher 25kg">Broiler Finisher 25kg</option>
                      <option value="Broiler Starter 25kg">Broiler Starter 25kg</option>
                      <option value="Silage Forage & Mineral Licks">Silage Forage & Licks</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Quantity Dispensed (Bags)</label>
                    <input
                      type="number"
                      min={1}
                      max={currentFeedStock}
                      value={feedBags}
                      onChange={(e) => setFeedBags(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* 2. REMITTANCE FORM (DAILY & WEEKLY DRIVER INCOME) */}
            {activeDrawer === 'REMITTANCE' && (
              <form
                id="remit-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onAddRemittance({
                    vehiclePlate: matchedVehicle.plateNumber,
                    driverName: matchedVehicle.driver.fullName,
                    target: Number(targetAmount),
                    remitted: Number(remitAmount),
                    paymentMethod,
                    periodType: remitPeriod,
                  });
                  onClose();
                }}
                className="space-y-4 text-xs"
              >
                {/* Remittance Frequency Selector: Daily vs Weekly Return */}
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setRemitPeriod('DAILY');
                      if (matchedVehicle) {
                        setTargetAmount(matchedVehicle.dailyTargetAmount);
                        setRemitAmount(matchedVehicle.dailyTargetAmount);
                      }
                    }}
                    className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      remitPeriod === 'DAILY'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>📅 Daily Income Return</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRemitPeriod('WEEKLY');
                      if (matchedVehicle) {
                        setTargetAmount(matchedVehicle.dailyTargetAmount * 6);
                        setRemitAmount(matchedVehicle.dailyTargetAmount * 6);
                      }
                    }}
                    className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      remitPeriod === 'WEEKLY'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>📊 Weekly Income Remittance</span>
                  </button>
                </div>
                {/* Live Arrears / Surplus Widget */}
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    deficit < 0
                      ? 'bg-rose-50 border-rose-200 text-rose-950'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5 text-xs">
                      {deficit < 0 ? (
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                      Reconciliation Audit
                    </span>
                    <span
                      className={`text-xs font-mono font-black px-2 py-0.5 rounded ${
                        deficit < 0 ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-900'
                      }`}
                    >
                      {deficit < 0 ? `Arrears Deficit: -₦${Math.abs(deficit).toLocaleString()}` : 'Cleared in Full'}
                    </span>
                  </div>
                  <p className="text-[11px]">
                    {deficit < 0
                      ? 'Deficit balance will automatically be debited to Driver Cumulative Arrears ledger.'
                      : 'Target fully reconciled. Remittance receipt marked CLEARED.'}
                  </p>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Select Transit Vehicle & Driver</label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  >
                    {fleet.map((v) => (
                      <option key={v.id} value={v.plateNumber}>
                        {v.plateNumber} — {v.type} ({v.driver.fullName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Driver Assigned:</span>
                    <strong className="text-slate-900">{matchedVehicle?.driver.fullName}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>NIN Verification:</span>
                    <span className="font-mono text-slate-700">{matchedVehicle?.driver.nationalIdNin}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Contract Status:</span>
                    <span className="font-bold text-slate-800">{matchedVehicle?.driver.contractStatus}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Daily Target (₦)</label>
                    <input
                      type="number"
                      readOnly
                      value={targetAmount}
                      className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-700 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Amount Remitted (₦)</label>
                    <input
                      type="number"
                      value={remitAmount}
                      onChange={(e) => setRemitAmount(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Payment Channel</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['CASH', 'BANK_TRANSFER', 'POS'] as const).map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setPaymentMethod(ch)}
                        className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                          paymentMethod === ch
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {ch.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            )}

            {/* 3. YIELD LOG FORM */}
            {activeDrawer === 'YIELD_LOG' && (
              <form
                id="yield-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onAddYield({
                    section: ydSection,
                    batchOrPen: ydBatch,
                    yieldType: ydType,
                    quantity: Number(ydQty),
                    feedBags: Number(ydFeedConsumed),
                  });
                  onClose();
                }}
                className="space-y-4 text-xs"
              >
                {/* Live FCR Calculator Widget */}
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 space-y-2">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5 text-xs text-blue-900">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      Feed Conversion Ratio (FCR) Engine
                    </span>
                    <span className="text-xs font-mono font-black text-blue-800 px-2 py-0.5 bg-blue-200 rounded">
                      Computed FCR: {calculatedFCR}
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-800">
                    Formula: (Feed Consumed in kg) / Total Output. Standard target: Broilers ~1.6 - 1.8, Layers ~2.0 - 2.2, Dairy ~1.8.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Livestock Section</label>
                    <select
                      value={ydSection}
                      onChange={(e) => setYdSection(e.target.value as LivestockSection)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    >
                      <option value="CATTLE">A. Cattle Unit</option>
                      <option value="RAMS">B. Rams Unit (Sheep)</option>
                      <option value="GOATS">C. Goats Unit</option>
                      <option value="RABBITS">D. Rabbits Unit</option>
                      <option value="POULTRY">E. Poultry Unit (Chickens)</option>
                      <option value="WATERFOWL">F. Waterfowl Unit (Ducks & Geese)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Yield Output Classification</label>
                    <select
                      value={ydType}
                      onChange={(e) => setYdType(e.target.value as YieldType)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    >
                      <option value="EGGS_CRATES">Egg Harvest (Crates of 30)</option>
                      <option value="MILK_LITERS">Raw Dairy Milk (Liters)</option>
                      <option value="MEAT_LIVEWEIGHT">Meat Liveweight (kg)</option>
                      <option value="MANURE_BAGS">Organic Manure (Bags)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Batch / Pen ID</label>
                  <input
                    type="text"
                    value={ydBatch}
                    onChange={(e) => setYdBatch(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      {ydType === 'EGGS_CRATES'
                        ? 'Total Crates Collected'
                        : ydType === 'MILK_LITERS'
                        ? 'Total Liters Collected'
                        : ydType === 'MEAT_LIVEWEIGHT'
                        ? 'Liveweight (kg)'
                        : 'Manure Bags'}
                    </label>
                    <input
                      type="number"
                      value={ydQty}
                      onChange={(e) => setYdQty(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Feed Consumed (25kg Bags)</label>
                    <input
                      type="number"
                      value={ydFeedConsumed}
                      onChange={(e) => setYdFeedConsumed(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold text-base"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* 4. CLINICAL MEDICAL & MORTALITY FORM */}
            {activeDrawer === 'MEDICAL_LOG' && (
              <form
                id="med-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onAddMedical({
                    section: medSection,
                    targetBatch: medBatch,
                    type: medType,
                    diagnosis: medDiag,
                    treatment: medTreatment,
                    withdrawalPeriodDays: Number(medWithdrawalDays),
                    mortality: Number(medMortality),
                    necropsyNotes: medNecropsyNotes,
                    vetName: medVetName,
                    cost: Number(medCost),
                  });
                  onClose();
                }}
                className="space-y-4 text-xs"
              >
                {/* Mortality & Clinical Banner */}
                {medMortality > 0 && (
                  <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-950 space-y-1">
                    <span className="font-bold flex items-center gap-1.5 text-xs text-rose-900">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      Mortality Headcount Deduction Notice
                    </span>
                    <p className="text-[11px] text-rose-800">
                      Submitting mortality count of {medMortality} will immediately reduce live headcount and increment casualties in the Unit Card, Total Dashboard, and Excel Ledger.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Livestock Section</label>
                    <select
                      value={medSection}
                      onChange={(e) => {
                        const sec = e.target.value as LivestockSection;
                        setMedSection(sec);
                        const presets = BREED_PRESETS[sec] || [];
                        if (presets.length > 0) setMedBatch(presets[0].name);
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    >
                      <option value="CATTLE">A. Cattle Unit</option>
                      <option value="RAMS">B. Rams Unit (Sheep)</option>
                      <option value="GOATS">C. Goats Unit</option>
                      <option value="RABBITS">D. Rabbits Unit</option>
                      <option value="POULTRY">E. Poultry Unit (Chickens)</option>
                      <option value="WATERFOWL">F. Waterfowl Unit (Ducks & Geese)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Event Classification</label>
                    <select
                      value={medType}
                      onChange={(e) => setMedType(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    >
                      <option value="MORTALITY">Mortality / Death Event</option>
                      <option value="TREATMENT">Sick Animal / Treatment</option>
                      <option value="ROUTINE_CHECK">Routine Prophylaxis / Dip</option>
                      <option value="VACCINATION">Vaccination Schedule</option>
                    </select>
                  </div>
                </div>

                {/* Casualties / Mortality Count Input Box (PROMINENT) */}
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-950 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-rose-950 font-black text-xs">
                      Number of Deaths / Casualties (Head)
                    </label>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-900">
                      Reduces Live Count
                    </span>
                  </div>
                  <input
                    type="number"
                    min={0}
                    value={medMortality}
                    onChange={(e) => setMedMortality(Number(e.target.value))}
                    required
                    className="w-full bg-white border border-rose-300 rounded-xl p-3 text-rose-900 font-mono font-black text-base"
                    placeholder="Enter number of dead animals (0 if none)"
                  />
                  {medMortality > 0 && (
                    <p className="text-[11px] text-rose-800 font-medium">
                      ⚠️ Deducts <strong>{medMortality} head</strong> from live count and adds to casualties in the Unit card, Total Overall Dashboard, and Excel Ledger.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target Breed / Product Line</label>
                  {BREED_PRESETS[medSection] && BREED_PRESETS[medSection].length > 0 && (
                    <select
                      value={medBatch}
                      onChange={(e) => setMedBatch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium mb-2"
                    >
                      {BREED_PRESETS[medSection].map((p) => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                      ))}
                      <option value="General Pen / Barn Location">Other / General Pen</option>
                    </select>
                  )}
                  <input
                    type="text"
                    value={medBatch}
                    onChange={(e) => setMedBatch(e.target.value)}
                    placeholder="Location / Pen e.g. Pen 1 North Wing"
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Cause of Death / Symptoms / Diagnosis</label>
                  <input
                    type="text"
                    value={medDiag}
                    onChange={(e) => setMedDiag(e.target.value)}
                    placeholder="e.g. Bloat, Pneumonia, Heat stress, or Routine Dip"
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Prescribed Treatment / Isolation / Disposal Notes</label>
                  <textarea
                    rows={2}
                    value={medTreatment}
                    onChange={(e) => setMedTreatment(e.target.value)}
                    placeholder="e.g. Antibiotic injection, isolated in quarantine pen, safe disposal..."
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Medication / Vet Cost (₦)</label>
                    <input
                      type="number"
                      min={0}
                      value={medCost}
                      onChange={(e) => setMedCost(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                    />
                    <span className="text-[10px] text-slate-500">Updates Unit Medication Cost</span>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Withdrawal Period (Days)</label>
                    <input
                      type="number"
                      min={0}
                      value={medWithdrawalDays}
                      onChange={(e) => setMedWithdrawalDays(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                    />
                    <span className="text-[10px] text-slate-500">Days eggs/milk held</span>
                  </div>
                </div>

                {medMortality > 0 && (
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Necropsy Notes & Pathologist Findings</label>
                    <textarea
                      rows={2}
                      value={medNecropsyNotes}
                      onChange={(e) => setMedNecropsyNotes(e.target.value)}
                      placeholder="Gross pathology lesions, organ inspection, suspected etiology..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Attending Vet Officer</label>
                  <input
                    type="text"
                    value={medVetName}
                    onChange={(e) => setMedVetName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>
              </form>
            )}

            {/* 5. SALE LOG FORM */}
            {activeDrawer === 'SALE_LOG' && (
              <form
                id="sale-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onAddSale({
                    section: saleSection,
                    description: saleDesc,
                    quantity: Number(saleQty),
                    unitPrice: Number(salePrice),
                    customer: saleCustomer,
                    paymentStatus: saleStatus,
                  });
                  onClose();
                }}
                className="space-y-4 text-xs"
              >
                {/* Credit Risk Banner */}
                {saleStatus === 'CREDIT_PENDING_L3' && (
                  <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-950 space-y-1">
                    <span className="font-bold flex items-center gap-1.5 text-xs text-amber-900">
                      <ShieldAlert className="w-4 h-4 text-amber-700" />
                      Level 3 Credit Governance Requirement
                    </span>
                    <p className="text-[11px] text-amber-800">
                      Credit sales automatically feed into Accounts Receivable Debt Aging and require Level 3 MD approval.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Division Section</label>
                    <select
                      value={saleSection}
                      onChange={(e) => setSaleSection(e.target.value as LivestockSection)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    >
                      <option value="CATTLE">A. Cattle Unit</option>
                      <option value="RAMS">B. Rams Unit (Sheep)</option>
                      <option value="GOATS">C. Goats Unit</option>
                      <option value="RABBITS">D. Rabbits Unit</option>
                      <option value="POULTRY">E. Poultry Unit (Chickens)</option>
                      <option value="WATERFOWL">F. Waterfowl Unit (Ducks & Geese)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Payment Status</label>
                    <select
                      value={saleStatus}
                      onChange={(e) => setSaleStatus(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    >
                      <option value="PAID">Cash / Instant Wire (PAID)</option>
                      <option value="CREDIT_PENDING_L3">Client Credit Facility (Pending L3)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Description / Item Specifications</label>
                  <input
                    type="text"
                    value={saleDesc}
                    onChange={(e) => setSaleDesc(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Client / Merchant Name</label>
                  <input
                    type="text"
                    value={saleCustomer}
                    onChange={(e) => setSaleCustomer(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Quantity</label>
                    <input
                      type="number"
                      value={saleQty}
                      onChange={(e) => setSaleQty(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Unit Price (₦)</label>
                    <input
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-100 rounded-xl flex justify-between items-center font-bold">
                  <span>Gross Realized:</span>
                  <span className="text-base text-emerald-800 font-mono">
                    ₦{(saleQty * salePrice).toLocaleString()}
                  </span>
                </div>
              </form>
            )}

            {/* 6. EXPENSE LOG FORM */}
            {activeDrawer === 'EXPENSE_LOG' && (
              <form
                id="expense-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onAddExpense({
                    division: expDiv,
                    category: expCategory,
                    description: expDesc,
                    amount: Number(expAmount),
                    vendor: expVendor,
                    section: expDiv === 'LIVESTOCK_FARM' ? expFarmSection : undefined,
                  });
                  onClose();
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Division</label>
                    <select
                      value={expDiv}
                      onChange={(e) => setExpDiv(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    >
                      <option value="LIVESTOCK_FARM">Livestock Farm</option>
                      <option value="TRANSPORT_SERVICES">Transport Services</option>
                      <option value="EXECUTIVE_OPS">Executive Operations</option>
                      <option value="FUTURE_VENTURES">Future Strategic Ventures</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Expense Category</label>
                    <select
                      value={expCategory}
                      onChange={(e) => setExpCategory(e.target.value as ExpenseCategory)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    >
                      <option value="FEED_PURCHASE">Feed Purchase</option>
                      <option value="FUEL_LOGISTICS">Fuel Logistics</option>
                      <option value="SPARE_PARTS">Vehicle / Machine Spare Parts</option>
                      <option value="VET_SUPPLIES">Vet Supplies & Vaccines</option>
                      <option value="STAFF_SALARIES">Staff Salaries / Allowances</option>
                      <option value="UTILITIES_FACILITY">Utilities & Facility Maintenance</option>
                      <option value="WATER_PRODUCTION">Water Factory Packaging</option>
                      <option value="CROP_FERTILIZER">Crops Fertilizer & Seeds</option>
                      <option value="FORESTRY_NURSERY">Forestry Seedlings & Inputs</option>
                    </select>
                  </div>
                </div>

                {/* If Livestock Farm, select specific livestock unit */}
                {expDiv === 'LIVESTOCK_FARM' && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
                    <label className="block text-emerald-950 font-bold text-[11px]">
                      Target Livestock Unit (Allocates to Unit Other Expenses)
                    </label>
                    <select
                      value={expFarmSection}
                      onChange={(e) => setExpFarmSection(e.target.value as LivestockSection)}
                      className="w-full bg-white border border-emerald-300 rounded-xl p-2.5 text-slate-900 font-medium text-xs"
                    >
                      <option value="CATTLE">A. Cattle Ranch & Feedlot</option>
                      <option value="RAMS">B. Rams & Sheep Unit</option>
                      <option value="GOATS">C. Goats Breeding Unit</option>
                      <option value="RABBITS">D. Rabbits Production Unit</option>
                      <option value="POULTRY">E. Poultry Sector (Chickens)</option>
                      <option value="WATERFOWL">F. Waterfowl Unit (Ducks & Geese)</option>
                    </select>
                    <span className="text-[10px] text-emerald-800 block">
                      Directly updates Other Expenses & Net Profit/Loss on that unit's card in Level 2 & 3.
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Expense Purpose / Narrative</label>
                  <input
                    type="text"
                    value={expDesc}
                    onChange={(e) => setExpDesc(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Vendor / Payee</label>
                    <input
                      type="text"
                      value={expVendor}
                      onChange={(e) => setExpVendor(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Amount (₦)</label>
                    <input
                      type="number"
                      value={expAmount}
                      onChange={(e) => setExpAmount(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* 7. REQUISITION / PO DRAFT FORM */}
            {activeDrawer === 'REQUISITION' && (
              <form
                id="req-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  onAddRequisition({
                    category: reqCategory,
                    title: reqTitle,
                    description: reqDesc,
                    amount: Number(reqAmount),
                    terms: reqTerms,
                    vendorName: reqVendor,
                  });
                  onClose();
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Requisition Type</label>
                  <select
                    value={reqCategory}
                    onChange={(e) => setReqCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  >
                    <option value="PURCHASE_ORDER">Purchase Order (PO Disbursement)</option>
                    <option value="DEBT_ASSUMPTION">Debt / Credit Facility Approval</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Requisition Title</label>
                  <input
                    type="text"
                    value={reqTitle}
                    onChange={(e) => setReqTitle(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Vendor / Beneficiary</label>
                  <input
                    type="text"
                    value={reqVendor}
                    onChange={(e) => setReqVendor(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Justification Details</label>
                  <textarea
                    rows={3}
                    value={reqDesc}
                    onChange={(e) => setReqDesc(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Amount Requested (₦)</label>
                    <input
                      type="number"
                      value={reqAmount}
                      onChange={(e) => setReqAmount(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Terms of Settlement</label>
                    <input
                      type="text"
                      value={reqTerms}
                      onChange={(e) => setReqTerms(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* 8. FUEL & WORKSHOP MAINTENANCE FORM */}
            {activeDrawer === 'FUEL_MAINTENANCE' && (
              <form
                id="fuel-maint-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (onAddFuelMaintenance) {
                    onAddFuelMaintenance({
                      vehiclePlate: matchedFmVehicle.plateNumber,
                      vehicleType: matchedFmVehicle.type,
                      recordType: fmRecordType,
                      maintenanceType: fmRecordType === 'MAINTENANCE' ? fmMaintenanceType : undefined,
                      details: fmDetails,
                      litersDispensed: fmRecordType === 'FUEL' ? Number(fmLiters) : undefined,
                      mileageKm: Number(fmMileage),
                      costTotal: Number(fmCost),
                      vendorName: fmVendor,
                      partsReplaced: fmRecordType === 'MAINTENANCE' ? fmPartsReplaced : undefined,
                      nextServiceMileageKm: fmRecordType === 'MAINTENANCE' ? Number(fmNextServiceMileage) : undefined,
                    });
                  }
                  onClose();
                }}
                className="space-y-4 text-xs"
              >
                {/* Mode Selector */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setFmRecordType('FUEL')}
                    className={`py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      fmRecordType === 'FUEL' ? 'bg-white text-cyan-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Fuel className="w-4 h-4" />
                    <span>Fuel Purchase</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFmRecordType('MAINTENANCE')}
                    className={`py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      fmRecordType === 'MAINTENANCE' ? 'bg-white text-indigo-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Workshop Servicing</span>
                  </button>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target Fleet Vehicle</label>
                  <select
                    value={fmVehiclePlate}
                    onChange={(e) => setFmVehiclePlate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  >
                    {fleet.map((v) => (
                      <option key={v.id} value={v.plateNumber}>
                        {v.plateNumber} — {v.type} ({v.makeModel})
                      </option>
                    ))}
                  </select>
                </div>

                {fmRecordType === 'FUEL' ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Fuel Dispensed (Liters)</label>
                        <input
                          type="number"
                          value={fmLiters}
                          onChange={(e) => {
                            const ltr = Number(e.target.value);
                            setFmLiters(ltr);
                            setFmCost(ltr * 1200); // approx N1200/liter
                          }}
                          required
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Current Odometer (KM)</label>
                        <input
                          type="number"
                          value={fmMileage}
                          onChange={(e) => setFmMileage(Number(e.target.value))}
                          required
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Filling Station Vendor</label>
                        <input
                          type="text"
                          value={fmVendor}
                          onChange={(e) => setFmVendor(e.target.value)}
                          required
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Total Fuel Cost (₦)</label>
                        <input
                          type="number"
                          value={fmCost}
                          onChange={(e) => setFmCost(Number(e.target.value))}
                          required
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Maintenance Classification</label>
                        <select
                          value={fmMaintenanceType}
                          onChange={(e) => setFmMaintenanceType(e.target.value as MaintenanceClassification)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                        >
                          <option value="SCHEDULED_PREVENTATIVE">Scheduled Preventative (Oil, Service)</option>
                          <option value="UNSCHEDULED_CORRECTIVE">Unscheduled Corrective (Breakdown / Repair)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Current Odometer (KM)</label>
                        <input
                          type="number"
                          value={fmMileage}
                          onChange={(e) => setFmMileage(Number(e.target.value))}
                          required
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Parts Replaced / Serviced</label>
                      <input
                        type="text"
                        value={fmPartsReplaced}
                        onChange={(e) => setFmPartsReplaced(e.target.value)}
                        placeholder="e.g. Brake pads, engine oil 15W40, clutch cable..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Workshop / Mechanic Vendor</label>
                        <input
                          type="text"
                          value={fmVendor}
                          onChange={(e) => setFmVendor(e.target.value)}
                          required
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Total Servicing Cost (₦)</label>
                        <input
                          type="number"
                          value={fmCost}
                          onChange={(e) => setFmCost(Number(e.target.value))}
                          required
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Next Service Target Mileage (KM)</label>
                      <input
                        type="number"
                        value={fmNextServiceMileage}
                        onChange={(e) => setFmNextServiceMileage(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Operational Notes</label>
                  <input
                    type="text"
                    value={fmDetails}
                    onChange={(e) => setFmDetails(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>
              </form>
            )}

            {/* 9. REGISTER LIVESTOCK BATCH FORM */}
            {activeDrawer === 'REGISTER_LIVESTOCK' && (
              <form
                id="reg-livestock-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (onRegisterLivestock) {
                    onRegisterLivestock({
                      section: regSection,
                      tagOrFlock: regTag,
                      subType: regSubType,
                      headCount: Number(regHeadCount),
                      locationPen: regPen,
                      genderRatio: regGenderRatio,
                      ageCohort: regAgeCohort,
                      weightAvgKg: Number(regWeightAvg),
                      dailyProduction: regDailyProd,
                      purpose: regPurpose,
                      costPerHead: Number(regCostPerHead),
                      transportationCost: Number(regTransportationCost || 0),
                      feedingCost: Number(regFeedingCost || 0),
                      medicationCost: Number(regMedicationCost || 0),
                    });
                  }
                  onClose();
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Livestock Section</label>
                    <select
                      value={regSection}
                      onChange={(e) => {
                        const newSec = e.target.value as LivestockSection;
                        setRegSection(newSec);
                        const presets = BREED_PRESETS[newSec] || [];
                        if (presets.length > 0) {
                          setRegSubType(presets[0].name);
                          setRegPurpose(presets[0].purpose);
                          setRegCostPerHead(presets[0].defaultCost);
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    >
                      <option value="CATTLE">A. Cattle Unit</option>
                      <option value="RAMS">B. Rams Unit (Sheep)</option>
                      <option value="GOATS">C. Goats Unit</option>
                      <option value="RABBITS">D. Rabbits Unit</option>
                      <option value="POULTRY">E. Poultry Unit (Chickens)</option>
                      <option value="WATERFOWL">F. Waterfowl Unit (Ducks & Geese)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Headcount (Live Animals)</label>
                    <input
                      type="number"
                      min={1}
                      value={regHeadCount}
                      onChange={(e) => setRegHeadCount(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                    />
                  </div>
                </div>

                {/* Quick Breed Presets from Excel Ledger */}
                {BREED_PRESETS[regSection] && BREED_PRESETS[regSection].length > 0 && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700">Quick-Pick from Official Inventory Ledger:</span>
                      <span className="text-[10px] text-slate-500 font-medium">Auto-fills Breed, Purpose & Default Cost</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {BREED_PRESETS[regSection].map((preset) => {
                        const isSelected = regSubType === preset.name && regPurpose === preset.purpose;
                        return (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => {
                              setRegSubType(preset.name);
                              setRegPurpose(preset.purpose);
                              setRegCostPerHead(preset.defaultCost);
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left flex items-center gap-1.5 border ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                            }`}
                          >
                            <span>{preset.name}</span>
                            <span className={`text-[10px] font-mono px-1 rounded ${isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-600'}`}>
                              ₦{preset.defaultCost.toLocaleString()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Breed / Lineage</label>
                    <input
                      type="text"
                      value={regSubType}
                      onChange={(e) => setRegSubType(e.target.value)}
                      placeholder="e.g. Sudanese Rams, Local Cattle"
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Production Purpose</label>
                    <select
                      value={regPurpose}
                      onChange={(e) => setRegPurpose(e.target.value as LivestockPurpose)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    >
                      <option value="FATTENING">Fattening / Pertaining</option>
                      <option value="REPRODUCTION">Reproduction / Breeding</option>
                      <option value="GENERAL">General Production</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Cost per Head (₦)</label>
                    <input
                      type="number"
                      min={0}
                      value={regCostPerHead}
                      onChange={(e) => setRegCostPerHead(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Tag / Flock Identifier</label>
                    <input
                      type="text"
                      value={regTag}
                      onChange={(e) => setRegTag(e.target.value)}
                      placeholder="e.g. BATCH-RAM-04 or Cattle Pen 2"
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                {/* 3 OPERATIONAL INTAKE EXPENSES (Transportation, Feeding, Medication) */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-emerald-950 block">
                        Intake Operational Costs (Fed to Level 2 & 3 Ledger)
                      </span>
                      <p className="text-[10px] text-emerald-800">
                        Add initial haulage, feed supply, or veterinary treatment for this new animal intake.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">
                      Live Ledger Sync
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* 1. Transportation Cost */}
                    <div>
                      <label className="block text-slate-800 font-bold mb-1 text-[11px]">
                        Transportation Cost (₦)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={regTransportationCost}
                        onChange={(e) => setRegTransportationCost(Number(e.target.value))}
                        placeholder="₦0"
                        className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono font-bold text-xs"
                      />
                      <span className="text-[10px] text-slate-500">Haulage / Truck delivery</span>
                    </div>

                    {/* 2. Feeding Cost */}
                    <div>
                      <label className="block text-slate-800 font-bold mb-1 text-[11px]">
                        Feeding Cost (₦)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={regFeedingCost}
                        onChange={(e) => setRegFeedingCost(Number(e.target.value))}
                        placeholder="₦0"
                        className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono font-bold text-xs"
                      />
                      <span className="text-[10px] text-slate-500">Initial feed bags cost</span>
                    </div>

                    {/* 3. Medication Cost */}
                    <div>
                      <label className="block text-slate-800 font-bold mb-1 text-[11px]">
                        Medication Cost (₦)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={regMedicationCost}
                        onChange={(e) => setRegMedicationCost(Number(e.target.value))}
                        placeholder="₦0"
                        className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono font-bold text-xs"
                      />
                      <span className="text-[10px] text-slate-500">Vaccines, dips & prophylaxis</span>
                    </div>
                  </div>
                </div>

                {/* Valuation preview */}
                <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-[11px]">Animal Purchase Acquisition:</span>
                    <span className="font-mono text-slate-200">
                      ₦{(Number(regHeadCount || 0) * Number(regCostPerHead || 0)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300 text-[11px]">
                    <span>Intake Transport + Feed + Meds:</span>
                    <span className="font-mono text-slate-200">
                      +₦{(Number(regTransportationCost || 0) + Number(regFeedingCost || 0) + Number(regMedicationCost || 0)).toLocaleString()}
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between">
                    <span className="font-black text-white text-xs">Total Initial Intake Outflow:</span>
                    <span className="font-mono font-black text-sm text-emerald-400">
                      ₦{(
                        Number(regHeadCount || 0) * Number(regCostPerHead || 0) +
                        Number(regTransportationCost || 0) +
                        Number(regFeedingCost || 0) +
                        Number(regMedicationCost || 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Pen / Paddock Assignment</label>
                    <input
                      type="text"
                      value={regPen}
                      onChange={(e) => setRegPen(e.target.value)}
                      placeholder="e.g. Pen 3 West Wing, Paddock 4"
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Age Cohort</label>
                    <input
                      type="text"
                      value={regAgeCohort}
                      onChange={(e) => setRegAgeCohort(e.target.value)}
                      placeholder="e.g. Day 1 Chicks or 18 Months"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Average Weight (kg)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={regWeightAvg}
                      onChange={(e) => setRegWeightAvg(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Gender Ratio</label>
                    <input
                      type="text"
                      value={regGenderRatio}
                      onChange={(e) => setRegGenderRatio(e.target.value)}
                      placeholder="e.g. 90% Does, 10% Bucks"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target Daily Production / Notes</label>
                  <input
                    type="text"
                    value={regDailyProd}
                    onChange={(e) => setRegDailyProd(e.target.value)}
                    placeholder="e.g. 70 Crates / Day or Fattening Regime"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  />
                </div>
              </form>
            )}

            {/* 10. STOCK-IN PROCUREMENT FORM */}
            {activeDrawer === 'STOCK_IN' && (
              <form
                id="stock-in-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (onStockInProcurement) {
                    onStockInProcurement({
                      itemId: matchedStockItem.id,
                      itemName: matchedStockItem.name,
                      quantity: Number(stockQty),
                      unitCost: Number(stockUnitCost),
                      supplier: stockSupplier,
                      referenceDoc: stockDocRef,
                    });
                  }
                  onClose();
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Select Inventory Item SKU</label>
                  <select
                    value={stockItemKey}
                    onChange={(e) => setStockItemKey(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                  >
                    {inventory.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name} ({i.division}) — Current: {i.currentStock} {i.unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Quantity Received ({matchedStockItem?.unit})</label>
                    <input
                      type="number"
                      min={1}
                      value={stockQty}
                      onChange={(e) => setStockQty(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Unit Cost (₦)</label>
                    <input
                      type="number"
                      value={stockUnitCost}
                      onChange={(e) => setStockUnitCost(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Supplier / Vendor</label>
                    <input
                      type="text"
                      value={stockSupplier}
                      onChange={(e) => setStockSupplier(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Waybill / Delivery Note Ref</label>
                    <input
                      type="text"
                      value={stockDocRef}
                      onChange={(e) => setStockDocRef(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-100 rounded-xl flex justify-between items-center font-bold">
                  <span>Total Procurement Valuation:</span>
                  <span className="text-base text-blue-800 font-mono">
                    ₦{(stockQty * stockUnitCost).toLocaleString()}
                  </span>
                </div>
              </form>
            )}

          </div>

          {/* FOOTER ACTION BUTTONS */}
          <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              form={
                activeDrawer === 'FEED_LOG'
                  ? 'feed-form'
                  : activeDrawer === 'REMITTANCE'
                  ? 'remit-form'
                  : activeDrawer === 'YIELD_LOG'
                  ? 'yield-form'
                  : activeDrawer === 'EXPENSE_LOG'
                  ? 'expense-form'
                  : activeDrawer === 'SALE_LOG'
                  ? 'sale-form'
                  : activeDrawer === 'REQUISITION'
                  ? 'req-form'
                  : activeDrawer === 'FUEL_MAINTENANCE'
                  ? 'fuel-maint-form'
                  : activeDrawer === 'REGISTER_LIVESTOCK'
                  ? 'reg-livestock-form'
                  : activeDrawer === 'STOCK_IN'
                  ? 'stock-in-form'
                  : 'med-form'
              }
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <span>Submit Entry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
