'use client';

import React, { useState, useEffect } from 'react';
import {
  PortalId,
  UserRoleLevel,
  LivestockBatch,
  FarmFeedingRecord,
  ProductionYieldRecord,
  LivestockSalesRecord,
  FarmMedicalRecord,
  InventoryItem,
  InventoryMovement,
  FleetVehicle,
  DailyRemittanceRecord,
  FuelAndMaintenanceRecord,
  CategorizedExpenseRecord,
  PurchaseOrderRecord,
  DebtAgingRecord,
  PendingApprovalItem,
  AuditTrailEntry,
  LivestockSection,
  ExpenseCategory,
  VehicleType,
  MaintenanceClassification,
  YieldType,
  ViewingCentreMatchEvent,
  CashCropsPlotRecord,
  TableWaterBatchRun,
  ForestryNurseryBed,
  UserSession,
  AnimalProductionLedgerRow,
  VehicleCategoryLedgerRow,
  LivestockPurpose
} from '@/types';
import {
  initialLivestock,
  initialAnimalLedger,
  initialVehicleLedger,
  initialFarmInventory,
  initialInventoryMovements,
  initialFeedLogs,
  initialYields,
  initialSales,
  initialMedicalLogs,
  initialFleet,
  initialRemittances,
  initialFuelLogs,
  initialExpenses,
  initialPurchaseOrders,
  initialDebtAging,
  initialPendingApprovals,
  initialAuditTrail,
  initialMatches,
  initialPlots,
  initialWaterBatches,
  initialNurseryBeds
} from '@/lib/initialData';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { ModernFarmWorkspace } from '@/components/farm/ModernFarmWorkspace';
import { ModernTransportWorkspace } from '@/components/transport/ModernTransportWorkspace';
import { ModernGovernanceWorkspace } from '@/components/governance/ModernGovernanceWorkspace';
import { ModernVenturesWorkspace } from '@/components/ventures/ModernVenturesWorkspace';
import { ModernActionDrawer } from '@/components/drawers/ModernActionDrawer';
import { Level1FieldTerminal } from '@/components/terminals/Level1FieldTerminal';
import { Level2SupervisorDesk } from '@/components/desks/Level2SupervisorDesk';
import { LoginPage } from '@/components/auth/LoginPage';

export default function EnterprisePortal() {
  // Authenticated User Session & Role State
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [activePortal, setActivePortal] = useState<PortalId>('PORTAL_FARM');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [drawerSection, setDrawerSection] = useState<LivestockSection | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'warning' | 'danger' } | null>(null);

  const currentRole: UserRoleLevel = userSession?.role || 'LEVEL_1';

  // Departmental Enterprise State
  const [livestock, setLivestock] = useState<LivestockBatch[]>(initialLivestock);
  const [animalLedger, setAnimalLedger] = useState<AnimalProductionLedgerRow[]>(initialAnimalLedger);
  const [vehicleLedger, setVehicleLedger] = useState<VehicleCategoryLedgerRow[]>(initialVehicleLedger);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialFarmInventory);
  const [inventoryMovements, setInventoryMovements] = useState<InventoryMovement[]>(initialInventoryMovements);
  const [feedLogs, setFeedLogs] = useState<FarmFeedingRecord[]>(initialFeedLogs);
  const [yields, setYields] = useState<ProductionYieldRecord[]>(initialYields);
  const [sales, setSales] = useState<LivestockSalesRecord[]>(initialSales);
  const [medicalLogs, setMedicalLogs] = useState<FarmMedicalRecord[]>(initialMedicalLogs);
  const [fleet, setFleet] = useState<FleetVehicle[]>(initialFleet);
  const [remittances, setRemittances] = useState<DailyRemittanceRecord[]>(initialRemittances);
  const [fuelLogs, setFuelLogs] = useState<FuelAndMaintenanceRecord[]>(initialFuelLogs);
  const [expenses, setExpenses] = useState<CategorizedExpenseRecord[]>(initialExpenses);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrderRecord[]>(initialPurchaseOrders);
  const [debtAging, setDebtAging] = useState<DebtAgingRecord[]>(initialDebtAging);
  const [pendingApprovals, setPendingApprovals] = useState<PendingApprovalItem[]>(initialPendingApprovals);
  const [auditTrail, setAuditTrail] = useState<AuditTrailEntry[]>(initialAuditTrail);

  // Future Strategic Ventures State
  const [matches, setMatches] = useState<ViewingCentreMatchEvent[]>(initialMatches);
  const [plots, setPlots] = useState<CashCropsPlotRecord[]>(initialPlots);
  const [waterBatches, setWaterBatches] = useState<TableWaterBatchRun[]>(initialWaterBatches);
  const [nurseryBeds, setNurseryBeds] = useState<ForestryNurseryBed[]>(initialNurseryBeds);

  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Hydrate state from browser localStorage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('njipp_bms_state_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.livestock) setLivestock(parsed.livestock);
        if (parsed.animalLedger) setAnimalLedger(parsed.animalLedger);
        if (parsed.vehicleLedger) setVehicleLedger(parsed.vehicleLedger);
        if (parsed.inventory) setInventory(parsed.inventory);
        if (parsed.inventoryMovements) setInventoryMovements(parsed.inventoryMovements);
        if (parsed.feedLogs) setFeedLogs(parsed.feedLogs);
        if (parsed.yields) setYields(parsed.yields);
        if (parsed.sales) setSales(parsed.sales);
        if (parsed.medicalLogs) setMedicalLogs(parsed.medicalLogs);
        if (parsed.fleet) setFleet(parsed.fleet);
        if (parsed.remittances) setRemittances(parsed.remittances);
        if (parsed.fuelLogs) setFuelLogs(parsed.fuelLogs);
        if (parsed.expenses) setExpenses(parsed.expenses);
        if (parsed.purchaseOrders) setPurchaseOrders(parsed.purchaseOrders);
        if (parsed.debtAging) setDebtAging(parsed.debtAging);
        if (parsed.pendingApprovals) setPendingApprovals(parsed.pendingApprovals);
        if (parsed.auditTrail) setAuditTrail(parsed.auditTrail);
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    setIsHydrated(true);
  }, []);

  // 2. Synchronize changes to localStorage once hydrated
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const payload = {
        livestock,
        animalLedger,
        vehicleLedger,
        inventory,
        inventoryMovements,
        feedLogs,
        yields,
        sales,
        medicalLogs,
        fleet,
        remittances,
        fuelLogs,
        expenses,
        purchaseOrders,
        debtAging,
        pendingApprovals,
        auditTrail,
      };
      localStorage.setItem('njipp_bms_state_v2', JSON.stringify(payload));
    } catch (e) {
      console.warn('Could not persist to localStorage:', e);
    }
  }, [
    isHydrated,
    livestock,
    animalLedger,
    vehicleLedger,
    inventory,
    inventoryMovements,
    feedLogs,
    yields,
    sales,
    medicalLogs,
    fleet,
    remittances,
    fuelLogs,
    expenses,
    purchaseOrders,
    debtAging,
    pendingApprovals,
    auditTrail,
  ]);

  // 3. Reset All Data to Factory Defaults
  const handleResetDemo = () => {
    try {
      localStorage.removeItem('njipp_bms_state_v2');
    } catch (e) {
      console.warn(e);
    }
    setLivestock(initialLivestock);
    setAnimalLedger(initialAnimalLedger);
    setVehicleLedger(initialVehicleLedger);
    setInventory(initialFarmInventory);
    setInventoryMovements(initialInventoryMovements);
    setFeedLogs(initialFeedLogs);
    setYields(initialYields);
    setSales(initialSales);
    setMedicalLogs(initialMedicalLogs);
    setFleet(initialFleet);
    setRemittances(initialRemittances);
    setFuelLogs(initialFuelLogs);
    setExpenses(initialExpenses);
    setPurchaseOrders(initialPurchaseOrders);
    setDebtAging(initialDebtAging);
    setPendingApprovals(initialPendingApprovals);
    setAuditTrail(initialAuditTrail);
    showToast('🔄 Demo data reset to official factory defaults.', 'success');
  };

  // Toast Notification Trigger
  const showToast = (text: string, type: 'success' | 'warning' | 'danger' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Switch Portal
  const handlePortalChange = (portal: PortalId) => {
    setActivePortal(portal);
  };

  // 1. Feed Log with Automatic Inventory Deduction & Movement Record
  const handleAddFeedLog = (data: {
    section: LivestockSection;
    pen: string;
    feedType: string;
    bags: number;
  }) => {
    const newLog: FarmFeedingRecord = {
      id: `FEED-LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Today, Just Now',
      section: data.section,
      penLocation: data.pen,
      feedType: data.feedType,
      quantityBags: data.bags,
      loggedBy: currentRole === 'LEVEL_1' ? 'Operator (L1)' : currentRole === 'LEVEL_2' ? 'Supervisor (L2)' : 'Executive (L3)',
      userRole: currentRole,
    };

    setFeedLogs((prev) => [newLog, ...prev]);

    // Automatically deduct from matching warehouse stock and log inventory movement
    let newBalance = 0;
    setInventory((prev) =>
      prev.map((item) => {
        if (
          item.category === 'FEED' &&
          (item.name.toLowerCase().includes(data.feedType.toLowerCase()) ||
            data.feedType.toLowerCase().includes(item.name.toLowerCase()))
        ) {
          newBalance = Math.max(0, item.currentStock - data.bags);
          return { ...item, currentStock: newBalance };
        }
        return item;
      })
    );

    const movement: InventoryMovement = {
      id: `MOV-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString(),
      itemId: 'INV-FEED',
      itemName: data.feedType,
      movementType: 'STOCK_OUT_FEEDING',
      quantity: data.bags,
      balanceAfter: newBalance,
      unit: 'Bags',
      referenceDoc: `${newLog.id} (${data.pen})`,
      initiatedBy: `${currentRole} Officer`,
    };
    setInventoryMovements((prev) => [movement, ...prev]);

    // Update feeding cost in the Animal Production Ledger
    const estimatedFeedCost = data.bags * 12500;
    setAnimalLedger((prev) => {
      let updated = false;
      return prev.map((row) => {
        if (!updated && row.section === data.section) {
          updated = true;
          const newFeedCost = (row.feedingCost || 0) + estimatedFeedCost;
          const totalExpenses =
            (row.liveCount + row.casualties) * row.costPerHead +
            row.transportationCost +
            newFeedCost +
            row.medicationCost +
            row.salaries +
            row.otherExpenses;
          const totalUnitCost = row.liveCount > 0 ? Math.round(totalExpenses / row.liveCount) : 0;
          const netProfitLoss = row.totalIncomeRevenue - totalExpenses;
          return {
            ...row,
            feedingCost: newFeedCost,
            totalExpenses,
            totalUnitCost,
            netProfitLoss,
          };
        }
        return row;
      });
    });

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'FARM_FEED_DISPATCH_AND_STOCK_DEDUCTED',
      performedBy: `User (${currentRole})`,
      userId: `USR-${Date.now().toString().slice(-3)}`,
      roleLevel: currentRole,
      details: `Dispensed ${data.bags} bags of ${data.feedType} to ${data.pen}. Inventory balance updated to ${newBalance}.`,
      ipAddress: '192.168.1.42 (Farm Terminal)',
      hash: `SHA256:${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(`🌾 Feed Log Recorded: -${data.bags} bags automatically deducted from Warehouse Inventory.`, 'success');
  };

  // 2. Driver Remittance with Arrears Accounting & Fleet Category P&L Sync
  const handleAddRemittance = (data: {
    vehiclePlate: string;
    driverName: string;
    target: number;
    remitted: number;
    paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'POS';
    periodType?: 'DAILY' | 'WEEKLY';
  }) => {
    const deficit = data.remitted - data.target;
    const newRemit: DailyRemittanceRecord = {
      id: `REMIT-${Date.now().toString().slice(-4)}`,
      timestamp: 'Today, Just Now',
      vehicleId: data.vehiclePlate,
      plateNumber: data.vehiclePlate,
      driverName: data.driverName,
      targetAmount: data.target,
      remittedAmount: data.remitted,
      deficitSurplus: deficit,
      paymentMethod: data.paymentMethod,
      periodType: data.periodType || 'DAILY',
      status: deficit < 0 ? 'PARTIAL_ARREARS' : 'CLEARED',
      receivedBy: `${currentRole} Cashier`,
    };

    setRemittances((prev) => [newRemit, ...prev]);

    // If deficit < 0, debit the driver's cumulative arrears
    if (deficit < 0) {
      setFleet((prev) =>
        prev.map((v) => {
          if (v.plateNumber === data.vehiclePlate || v.driver.fullName === data.driverName) {
            return {
              ...v,
              driver: {
                ...v.driver,
                cumulativeArrearsBalance: (v.driver.cumulativeArrearsBalance || 0) + Math.abs(deficit),
              },
            };
          }
          return v;
        })
      );
    }

    // REACTIVE LINK FLEET: Update vehicle category ledger income & net profit/loss
    const matchedVehicle = fleet.find((v) => v.plateNumber === data.vehiclePlate);
    const vType = matchedVehicle ? matchedVehicle.type : 'BUS';
    setVehicleLedger((prev) =>
      prev.map((row) => {
        if (row.category === vType) {
          const dailyWeeklyIncome = (row.dailyWeeklyIncome || 0) + data.remitted;
          const netProfitLoss = dailyWeeklyIncome - row.totalExpenses;
          return {
            ...row,
            dailyWeeklyIncome,
            netProfitLoss,
          };
        }
        return row;
      })
    );

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'DAILY_REMITTANCE_COLLECTED',
      performedBy: `User (${currentRole})`,
      userId: `USR-${Date.now().toString().slice(-3)}`,
      roleLevel: currentRole,
      details: `${data.driverName} (${data.vehiclePlate}) remitted ₦${data.remitted.toLocaleString()} against target ₦${data.target.toLocaleString()} (${data.periodType || 'DAILY'}). Deficit: ₦${deficit.toLocaleString()}. Fleet category ledger updated.`,
      ipAddress: '192.168.1.18 (Cashier Desk)',
      hash: `SHA256:${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(
      deficit < 0
        ? `⚠️ Remittance posted with ₦${Math.abs(deficit).toLocaleString()} deficit recorded as driver arrears.`
        : `✅ Remittance of ₦${data.remitted.toLocaleString()} (${data.periodType || 'DAILY'}) cleared in full!`,
      deficit < 0 ? 'warning' : 'success'
    );
  };

  // 3. Veterinary Medical Record (Decrements live headcount on mortality, logs withdrawal hold)
  const handleAddMedical = (data: {
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
  }) => {
    const newMed: FarmMedicalRecord = {
      id: `MED-LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().split('T')[0],
      section: data.section,
      targetBatch: data.targetBatch,
      type: data.type,
      diagnosisOrEvent: data.diagnosis,
      treatment: data.treatment,
      withdrawalPeriodDays: data.withdrawalPeriodDays,
      mortalityCount: data.mortality,
      necropsyNotes: data.necropsyNotes,
      vetName: data.vetName || 'Dr. Aliyu Mohammed (DVM)',
      cost: data.cost,
      loggedBy: `${currentRole} Officer`,
    };

    setMedicalLogs((prev) => [newMed, ...prev]);

    // REACTIVE LINK 1: If mortality > 0, decrement live animal headcount and increment casualties in Animal Production Ledger
    if (data.mortality > 0 || data.cost > 0) {
      setAnimalLedger((prev) => {
        let matched = false;
        // First try to match row by section and targetBatch/breed name
        const next = prev.map((row) => {
          if (!matched && row.section === data.section && row.liveCount > 0) {
            const isNameMatch =
              !data.targetBatch ||
              row.breedOrProduct.toLowerCase().includes(data.targetBatch.toLowerCase()) ||
              data.targetBatch.toLowerCase().includes(row.breedOrProduct.toLowerCase());
            if (isNameMatch) {
              matched = true;
              const newLiveCount = Math.max(0, row.liveCount - data.mortality);
              const newCasualties = row.casualties + data.mortality;
              const newMedCost = row.medicationCost + (data.cost || 0);
              const totalExpenses =
                (newLiveCount + newCasualties) * row.costPerHead +
                row.transportationCost +
                row.feedingCost +
                newMedCost +
                row.salaries +
                row.otherExpenses;
              const totalUnitCost = newLiveCount > 0 ? Math.round(totalExpenses / newLiveCount) : 0;
              const netProfitLoss = row.totalIncomeRevenue - totalExpenses;
              return {
                ...row,
                liveCount: newLiveCount,
                casualties: newCasualties,
                medicationCost: newMedCost,
                totalExpenses,
                totalUnitCost,
                netProfitLoss,
              };
            }
          }
          return row;
        });

        // If no specific row matched by name, decrement from the first row in that section with live animals
        if (!matched && data.mortality > 0) {
          let fallbackMatched = false;
          return prev.map((row) => {
            if (!fallbackMatched && row.section === data.section && row.liveCount > 0) {
              fallbackMatched = true;
              const newLiveCount = Math.max(0, row.liveCount - data.mortality);
              const newCasualties = row.casualties + data.mortality;
              const newMedCost = row.medicationCost + (data.cost || 0);
              const totalExpenses =
                (newLiveCount + newCasualties) * row.costPerHead +
                row.transportationCost +
                row.feedingCost +
                newMedCost +
                row.salaries +
                row.otherExpenses;
              const totalUnitCost = newLiveCount > 0 ? Math.round(totalExpenses / newLiveCount) : 0;
              const netProfitLoss = row.totalIncomeRevenue - totalExpenses;
              return {
                ...row,
                liveCount: newLiveCount,
                casualties: newCasualties,
                medicationCost: newMedCost,
                totalExpenses,
                totalUnitCost,
                netProfitLoss,
              };
            }
            return row;
          });
        }
        return next;
      });
    }

    // REACTIVE LINK 2: Also decrement live animal headcount in matching batch in Livestock registry
    if (data.mortality > 0) {
      setLivestock((prev) => {
        let deducted = false;
        const next = prev.map((batch) => {
          if (
            !deducted &&
            batch.section === data.section &&
            batch.headCount > 0 &&
            (batch.tagOrFlock.toLowerCase().includes(data.targetBatch.toLowerCase()) ||
              data.targetBatch.toLowerCase().includes(batch.tagOrFlock.toLowerCase()) ||
              batch.subType.toLowerCase().includes(data.targetBatch.toLowerCase()) ||
              data.targetBatch.toLowerCase().includes(batch.subType.toLowerCase()))
          ) {
            deducted = true;
            return {
              ...batch,
              headCount: Math.max(0, batch.headCount - data.mortality),
            };
          }
          return batch;
        });

        if (!deducted) {
          let fallback = false;
          return prev.map((batch) => {
            if (!fallback && batch.section === data.section && batch.headCount > 0) {
              fallback = true;
              return {
                ...batch,
                headCount: Math.max(0, batch.headCount - data.mortality),
              };
            }
            return batch;
          });
        }
        return next;
      });
    }

    // REACTIVE LINK 2: If treatment has financial cost, automatically record outflow in Central Expenses
    if (data.cost > 0) {
      const vetExpense: CategorizedExpenseRecord = {
        id: `EXP-VET-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().split('T')[0],
        division: 'LIVESTOCK_FARM',
        category: 'VET_SUPPLIES',
        description: `Clinical Vet Treatment: ${data.diagnosis} (${data.targetBatch})`,
        amount: data.cost,
        vendorName: 'Vet Care Pharmaceuticals Ltd',
        receiptAttached: true,
        loggedBy: `${currentRole} Vet Officer`,
        approvedBy: currentRole === 'LEVEL_3' ? 'MD Executive' : undefined,
      };
      setExpenses((prev) => [vetExpense, ...prev]);
    }

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'VET_CLINICAL_EVENT_LOGGED',
      performedBy: `User (${currentRole})`,
      userId: `USR-${Date.now().toString().slice(-3)}`,
      roleLevel: currentRole,
      details: `Clinical vet event for ${data.targetBatch}: ${data.diagnosis}. Mortality: ${data.mortality}. Withdrawal: ${data.withdrawalPeriodDays}d. Cost: ₦${data.cost.toLocaleString()}.`,
      ipAddress: '192.168.1.44 (Vet Mobile)',
      hash: `SHA256:${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(
      data.mortality > 0
        ? `⚠️ Mortality recorded! -${data.mortality} head deducted from Live Animal Registry.`
        : `✅ Veterinary intervention logged. Drug withdrawal period set to ${data.withdrawalPeriodDays} days.`,
      data.mortality > 0 ? 'warning' : 'success'
    );
  };

  // 4. Yield Collection Log with FCR & Store Inventory Sync
  const handleAddYield = (data: {
    section: LivestockSection;
    batchOrPen: string;
    yieldType: YieldType;
    quantity: number;
    feedBags: number;
  }) => {
    const calculatedFCR =
      data.quantity > 0
        ? data.yieldType === 'EGGS_CRATES'
          ? Number(((data.feedBags * 25) / (data.quantity * 1.8)).toFixed(2))
          : Number(((data.feedBags * 25) / data.quantity).toFixed(2))
        : 0;

    const newYield: ProductionYieldRecord = {
      id: `YLD-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString().slice(0, 5),
      section: data.section,
      batchOrPen: data.batchOrPen,
      yieldType: data.yieldType,
      quantity: data.quantity,
      feedConsumedBags: data.feedBags,
      calculatedFCR: calculatedFCR,
      qualityGrade: 'GRADE_A',
      loggedBy: `${currentRole} Yield Officer`,
    };

    setYields((prev) => [newYield, ...prev]);

    // REACTIVE LINK HARVEST: If eggs gathered, automatically add crates to INV-07 warehouse inventory
    if (data.yieldType === 'EGGS_CRATES') {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === 'INV-07' ? { ...item, currentStock: item.currentStock + data.quantity } : item
        )
      );

      const moveEntry: InventoryMovement = {
        id: `MOV-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString().slice(0, 5),
        itemId: 'INV-07',
        itemName: 'Harvested Fresh Eggs',
        movementType: 'STOCK_IN_HARVEST',
        quantity: data.quantity,
        balanceAfter: (inventory.find((i) => i.id === 'INV-07')?.currentStock || 124) + data.quantity,
        unit: 'Crates',
        referenceDoc: `DAILY-HARVEST-${data.batchOrPen}`,
        initiatedBy: `${currentRole} Yield Officer`,
      };
      setInventoryMovements((prev) => [moveEntry, ...prev]);
    }

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'PRODUCTION_YIELD_AND_FCR_LOGGED',
      performedBy: `User (${currentRole})`,
      userId: `USR-${Date.now().toString().slice(-3)}`,
      roleLevel: currentRole,
      details: `Logged ${data.quantity} units for ${data.batchOrPen}. FCR computed at ${calculatedFCR}. Store stock incremented.`,
      ipAddress: '192.168.1.42 (Egg Processing Terminal)',
      hash: `SHA256:${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(`🥚 Yield logged: +${data.quantity} crates added to Warehouse Inventory with FCR ${calculatedFCR}.`, 'success');
  };

  // 5. Livestock & Produce Sales Log (Deducts Live Headcount or Egg Inventory, feeds Credit Debt)
  const handleAddSale = (data: {
    section: LivestockSection;
    description: string;
    quantity: number;
    unitPrice: number;
    customer: string;
    paymentStatus: any;
  }) => {
    const totalAmount = data.quantity * data.unitPrice;
    const newSale: LivestockSalesRecord = {
      id: `SALE-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString().slice(0, 5),
      section: data.section,
      description: data.description,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
      totalAmount,
      customerName: data.customer,
      paymentStatus: data.paymentStatus,
      authorizedBy: `${currentRole} Commercial Lead`,
    };

    setSales((prev) => [newSale, ...prev]);

    // REACTIVE LINK 3: If sale is on Credit, automatically post to Accounts Receivable Debt Aging
    if (data.paymentStatus === 'CREDIT_PENDING_L3') {
      const newDebtItem: DebtAgingRecord = {
        id: `DEBT-AR-${Date.now().toString().slice(-4)}`,
        accountType: 'RECEIVABLE_CLIENT_DEBT',
        partyName: data.customer,
        contractRef: `SALES-CREDIT-REF-${Date.now().toString().slice(-4)}`,
        principalAmount: totalAmount,
        balanceRemaining: totalAmount,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        agingBracket: 'CURRENT',
        status: currentRole === 'LEVEL_3' ? 'ACTIVE_AMORTIZING' : 'PENDING_L3_SANCTION',
        approvedByLevel3: currentRole === 'LEVEL_3' ? 'MD Executive' : 'Pending L3 Approval',
        notes: `Credit purchase of ${data.quantity} units (${data.description}).`,
      };
      setDebtAging((prev) => [newDebtItem, ...prev]);

      // Automatically queue a Level 3 authorization ticket if logged by L1 or L2
      if (currentRole !== 'LEVEL_3') {
        const debtTicket: PendingApprovalItem = {
          id: `REQ-DEBT-${Date.now().toString().slice(-4)}`,
          timestamp: new Date().toLocaleTimeString(),
          category: 'DEBT_ASSUMPTION',
          title: `Credit Facility Request: ${data.customer}`,
          description: `Customer requested credit terms for ${data.description}. Total debt: ₦${totalAmount.toLocaleString()}.`,
          department: 'Commercial Livestock Sales',
          amount: totalAmount,
          repaymentTerms: 'Net 14 Days',
          initiatedBy: `Staff (${currentRole})`,
          initiatorLevel: currentRole,
          status: 'PENDING',
        };
        setPendingApprovals((prev) => [debtTicket, ...prev]);
      }
    }

    const isEggs =
      data.description.toLowerCase().includes('egg') ||
      data.description.toLowerCase().includes('crate');
    const isMilk =
      data.description.toLowerCase().includes('milk') ||
      data.description.toLowerCase().includes('liter');

    if (isEggs) {
      // Deduct sold egg crates from INV-07 warehouse inventory
      setInventory((prev) =>
        prev.map((item) => {
          if (item.id === 'INV-07') {
            const currentStock = Math.max(0, item.currentStock - data.quantity);
            return { ...item, currentStock };
          }
          return item;
        })
      );
      setInventoryMovements((prev) => [
        {
          id: `MOV-${Date.now().toString().slice(-4)}`,
          timestamp: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString().slice(0, 5),
          itemId: 'INV-07',
          itemName: 'Harvested Fresh Eggs',
          movementType: 'STOCK_OUT_SALE',
          quantity: data.quantity,
          balanceAfter: Math.max(0, (inventory.find((i) => i.id === 'INV-07')?.currentStock || 124) - data.quantity),
          unit: 'Crates',
          referenceDoc: `SALE-${data.customer}`,
          initiatedBy: `${currentRole} Commercial Lead`,
        },
        ...prev,
      ]);
    } else if (!isMilk) {
      // REACTIVE LINK LIVE ANIMALS: Deduct sold headcount from Live Animals in animalLedger
      setAnimalLedger((prev) => {
        let matched = false;
        return prev.map((row) => {
          if (!matched && row.section === data.section && row.liveCount > 0) {
            const isNameMatch =
              !data.description ||
              row.breedOrProduct.toLowerCase().includes(data.description.toLowerCase()) ||
              data.description.toLowerCase().includes(row.breedOrProduct.toLowerCase());
            if (isNameMatch || row.section === data.section) {
              matched = true;
              const newLiveCount = Math.max(0, row.liveCount - data.quantity);
              const totalExpenses =
                (newLiveCount + row.casualties) * row.costPerHead +
                row.transportationCost +
                row.feedingCost +
                row.medicationCost +
                row.salaries +
                row.otherExpenses;
              const totalUnitCost = newLiveCount > 0 ? Math.round(totalExpenses / newLiveCount) : 0;
              const newRevenue = (row.totalIncomeRevenue || 0) + totalAmount;
              const netProfitLoss = newRevenue - totalExpenses;
              return {
                ...row,
                liveCount: newLiveCount,
                totalExpenses,
                totalUnitCost,
                totalIncomeRevenue: newRevenue,
                netProfitLoss,
              };
            }
          }
          return row;
        });
      });

      // Also deduct from live headcount in Livestock batch registry
      setLivestock((prev) => {
        let deducted = false;
        return prev.map((batch) => {
          if (!deducted && batch.section === data.section && batch.headCount > 0) {
            deducted = true;
            return {
              ...batch,
              headCount: Math.max(0, batch.headCount - data.quantity),
            };
          }
          return batch;
        });
      });
    }

    // Always update revenue if produce was sold
    if (isEggs || isMilk) {
      setAnimalLedger((prev) => {
        let updated = false;
        return prev.map((row) => {
          if (!updated && row.section === data.section) {
            updated = true;
            const newRevenue = (row.totalIncomeRevenue || 0) + totalAmount;
            const netProfitLoss = newRevenue - row.totalExpenses;
            return {
              ...row,
              totalIncomeRevenue: newRevenue,
              netProfitLoss,
            };
          }
          return row;
        });
      });
    }

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'LIVESTOCK_PRODUCE_SALE_RECORDED',
      performedBy: `User (${currentRole})`,
      userId: `USR-${Date.now().toString().slice(-3)}`,
      roleLevel: currentRole,
      details: `Sold ${data.quantity} items to ${data.customer} for ₦${totalAmount.toLocaleString()} (${data.paymentStatus}). Stock/Headcount deducted.`,
      ipAddress: '192.168.1.18 (Sales Desk)',
      hash: `SHA256:${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(
      data.paymentStatus === 'CREDIT_PENDING_L3'
        ? `📋 Credit sale posted! ₦${totalAmount.toLocaleString()} automatically fed into Accounts Receivable Debt Aging.`
        : `💰 Livestock sale of ₦${totalAmount.toLocaleString()} recorded. Headcount/Inventory updated.`,
      'success'
    );
  };

  // 6. Operational Field Expense Log with Unit "Other Expenses" Link
  const handleAddExpense = (data: {
    division: any;
    category: ExpenseCategory;
    description: string;
    amount: number;
    vendor: string;
    section?: LivestockSection;
  }) => {
    const newExpense: CategorizedExpenseRecord = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      division: data.division,
      category: data.category,
      description: data.description,
      amount: data.amount,
      vendorName: data.vendor,
      receiptAttached: true,
      loggedBy: `${currentRole} Field Agent`,
      approvedBy: currentRole === 'LEVEL_3' ? 'MD Executive' : undefined,
    };

    setExpenses((prev) => [newExpense, ...prev]);

    // REACTIVE LINK: Allocate expense to specific livestock unit's "Other Expenses" in animalLedger
    if (data.section || data.division === 'LIVESTOCK_FARM') {
      const targetSec = data.section || 'CATTLE';
      setAnimalLedger((prev) => {
        let matched = false;
        return prev.map((row) => {
          if (!matched && row.section === targetSec) {
            matched = true;
            const newOther = (row.otherExpenses || 0) + data.amount;
            const totalExpenses =
              (row.liveCount + row.casualties) * row.costPerHead +
              row.transportationCost +
              row.feedingCost +
              row.medicationCost +
              row.salaries +
              newOther;
            const totalUnitCost = row.liveCount > 0 ? Math.round(totalExpenses / row.liveCount) : 0;
            const netProfitLoss = (row.totalIncomeRevenue || 0) - totalExpenses;
            return {
              ...row,
              otherExpenses: newOther,
              totalExpenses,
              totalUnitCost,
              netProfitLoss,
            };
          }
          return row;
        });
      });
    }

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'OPERATIONAL_EXPENSE_SUBMITTED_WITH_RECEIPT',
      performedBy: `User (${currentRole})`,
      userId: `USR-${Date.now().toString().slice(-3)}`,
      roleLevel: currentRole,
      details: `Disbursed ₦${data.amount.toLocaleString()} for ${data.category} (${data.vendor}). Unit: ${data.section || 'General'}. Receipt scanned.`,
      ipAddress: '192.168.1.10 (Operations Office)',
      hash: `SHA256:${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(`🧾 Expense of ₦${data.amount.toLocaleString()} logged with receipt attached.`, 'success');
  };

  // 7. Fuel & Maintenance Voucher Log
  const handleAddFuelMaintenance = (data: {
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
  }) => {
    // Calculate efficiency if fuel
    const benchmarkKmL = data.vehicleType === 'MOTORCYCLE' ? 34.5 : data.vehicleType === 'TRIKE' ? 18.2 : 8.4;
    const computedEfficiency = data.litersDispensed && data.litersDispensed > 0 ? Number((100 / data.litersDispensed).toFixed(1)) : benchmarkKmL;
    const isAbnormal = computedEfficiency < benchmarkKmL * 0.7;

    const newLog: FuelAndMaintenanceRecord = {
      id: `FL-${Date.now().toString().slice(-4)}`,
      timestamp: 'Today, Just Now',
      vehiclePlate: data.vehiclePlate,
      vehicleType: data.vehicleType,
      recordType: data.recordType,
      maintenanceType: data.maintenanceType,
      details: data.details,
      litersDispensed: data.litersDispensed,
      mileageKm: data.mileageKm,
      kmPerLiter: data.recordType === 'FUEL' ? computedEfficiency : undefined,
      isAbnormalFuelFlag: isAbnormal,
      costTotal: data.costTotal,
      vendorName: data.vendorName,
      partsReplaced: data.partsReplaced,
      nextServiceMileageKm: data.nextServiceMileageKm,
      receiptAttached: true,
      loggedBy: `${currentRole} Transport Officer`,
    };

    setFuelLogs((prev) => [newLog, ...prev]);

    // Automatically post outflow to central expenses
    const newExpense: CategorizedExpenseRecord = {
      id: `EXP-LOGIS-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      division: 'TRANSPORT_SERVICES',
      category: data.recordType === 'FUEL' ? 'FUEL_LOGISTICS' : 'SPARE_PARTS',
      description: `${data.recordType === 'FUEL' ? 'Fuel Refill' : 'Workshop Service'}: ${data.vehiclePlate} (${data.details})`,
      amount: data.costTotal,
      vendorName: data.vendorName,
      receiptAttached: true,
      loggedBy: `${currentRole} Fleet Agent`,
    };
    setExpenses((prev) => [newExpense, ...prev]);

    // Update current vehicle mileage
    setFleet((prev) =>
      prev.map((v) => (v.plateNumber === data.vehiclePlate ? { ...v, currentMileageKm: data.mileageKm } : v))
    );

    // REACTIVE LINK FLEET: Update vehicle category ledger expenses & net profit
    setVehicleLedger((prev) =>
      prev.map((row) => {
        if (row.category === data.vehicleType) {
          const fuelTransitCost =
            data.recordType === 'FUEL' ? (row.fuelTransitCost || 0) + data.costTotal : row.fuelTransitCost;
          const maintenanceCost =
            data.recordType === 'MAINTENANCE' ? (row.maintenanceCost || 0) + data.costTotal : row.maintenanceCost;
          const totalExpenses =
            fuelTransitCost + maintenanceCost + (row.driverSalary || 0) + (row.otherExpenses || 0);
          const netProfitLoss = (row.dailyWeeklyIncome || 0) - totalExpenses;
          return {
            ...row,
            fuelTransitCost,
            maintenanceCost,
            totalExpenses,
            netProfitLoss,
          };
        }
        return row;
      })
    );

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: data.recordType === 'FUEL' ? 'FLEET_FUEL_VOUCHER_POSTED' : 'FLEET_WORKSHOP_SERVICING_POSTED',
      performedBy: `User (${currentRole})`,
      userId: `USR-${Date.now().toString().slice(-3)}`,
      roleLevel: currentRole,
      details: `${data.vehiclePlate} (${data.vehicleType}): ₦${data.costTotal.toLocaleString()} for ${data.details}. Odometer: ${data.mileageKm}km.`,
      ipAddress: '192.168.1.12 (Fleet Depot Terminal)',
      hash: `SHA256:${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(
      isAbnormal
        ? `⚠️ Abnormal fuel consumption detected! Anomaly radar flagged for Level 2 Supervisor audit.`
        : `✅ Fleet ${data.recordType.toLowerCase()} voucher recorded and auto-posted to Central Expenses.`,
      isAbnormal ? 'warning' : 'success'
    );
  };

  // 8. Register New Livestock Batch
  const handleRegisterLivestock = (data: {
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
  }) => {
    const costPerHead = data.costPerHead || 0;
    const purpose: LivestockPurpose = data.purpose || 'GENERAL';
    const addTransport = data.transportationCost || 0;
    const addFeed = data.feedingCost || 0;
    const addMed = data.medicationCost || 0;

    const newBatch: LivestockBatch = {
      id: `BATCH-${data.section.slice(0, 3)}-${Date.now().toString().slice(-3)}`,
      section: data.section,
      tagOrFlock: data.tagOrFlock,
      subType: data.subType,
      headCount: data.headCount,
      locationPen: data.locationPen,
      genderRatio: data.genderRatio,
      ageCohort: data.ageCohort,
      weightAvgKg: data.weightAvgKg,
      dailyProduction: data.dailyProduction,
      purpose,
      costPerHead,
      status: 'HEALTHY',
      dateRegistered: new Date().toISOString().split('T')[0],
    };

    setLivestock((prev) => [newBatch, ...prev]);

    // Synchronize directly into Animal Production Inventory & Financial Ledger
    setAnimalLedger((prev) => {
      const matchIndex = prev.findIndex(
        (r) =>
          r.section === data.section &&
          (r.breedOrProduct.toLowerCase() === data.subType.toLowerCase() ||
            (data.purpose && r.purpose === data.purpose))
      );

      if (matchIndex >= 0) {
        const row = prev[matchIndex];
        const newLiveCount = row.liveCount + data.headCount;
        const newCostPerHead = costPerHead > 0 ? costPerHead : row.costPerHead;
        const newTransport = (row.transportationCost || 0) + addTransport;
        const newFeed = (row.feedingCost || 0) + addFeed;
        const newMed = (row.medicationCost || 0) + addMed;
        const totalExpenses =
          (newLiveCount + row.casualties) * newCostPerHead +
          newTransport +
          newFeed +
          newMed +
          row.salaries +
          row.otherExpenses;
        const totalUnitCost = newLiveCount > 0 ? Math.round(totalExpenses / newLiveCount) : 0;
        const netProfitLoss = row.totalIncomeRevenue - totalExpenses;

        const updatedRow: AnimalProductionLedgerRow = {
          ...row,
          liveCount: newLiveCount,
          costPerHead: newCostPerHead,
          transportationCost: newTransport,
          feedingCost: newFeed,
          medicationCost: newMed,
          totalExpenses,
          totalUnitCost,
          netProfitLoss,
        };

        const next = [...prev];
        next[matchIndex] = updatedRow;
        return next;
      } else {
        const unitMap: Record<LivestockSection, { code: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'; name: string }> = {
          CATTLE: { code: 'A', name: 'A. CATTLE UNIT' },
          RAMS: { code: 'B', name: 'B. RAMS UNIT' },
          SHEEP: { code: 'B', name: 'B. RAMS UNIT' },
          GOATS: { code: 'C', name: 'C. GOATS UNIT' },
          RABBITS: { code: 'D', name: 'D. RABBITS UNIT' },
          POULTRY: { code: 'E', name: 'E. POULTRY UNIT (CHICKENS)' },
          WATERFOWL: { code: 'F', name: 'F. WATERFOWL UNIT (DUCKS & GEESE)' },
        };
        const unit = unitMap[data.section] || { code: 'A' as const, name: 'A. CATTLE UNIT' };
        const totalExpenses = (data.headCount * costPerHead) + addTransport + addFeed + addMed;
        const totalUnitCost = data.headCount > 0 ? Math.round(totalExpenses / data.headCount) : costPerHead;

        const newRow: AnimalProductionLedgerRow = {
          id: `LEDGER-GEN-${Date.now().toString().slice(-4)}`,
          unitCode: unit.code,
          unitName: unit.name,
          section: data.section,
          breedOrProduct: data.subType,
          purpose,
          liveCount: data.headCount,
          casualties: 0,
          costPerHead,
          transportationCost: addTransport,
          feedingCost: addFeed,
          medicationCost: addMed,
          salaries: 0,
          otherExpenses: 0,
          totalUnitCost,
          totalExpenses,
          totalIncomeRevenue: 0,
          netProfitLoss: -totalExpenses,
        };
        return [...prev, newRow];
      }
    });

    // Auto-record central expenses for haulage, feed, and vet if allocated
    if (addTransport > 0) {
      setExpenses((prev) => [
        {
          id: `EXP-TRP-${Date.now().toString().slice(-4)}`,
          date: new Date().toISOString().split('T')[0],
          division: 'LIVESTOCK_FARM',
          category: 'FUEL_LOGISTICS',
          description: `Intake Haulage / Transportation: ${data.subType} (${data.headCount} head)`,
          amount: addTransport,
          vendorName: 'Livestock Transit Logistics',
          receiptAttached: true,
          loggedBy: `${currentRole} Field Agent`,
        },
        ...prev,
      ]);
    }
    if (addFeed > 0) {
      setExpenses((prev) => [
        {
          id: `EXP-FD-${Date.now().toString().slice(-4)}`,
          date: new Date().toISOString().split('T')[0],
          division: 'LIVESTOCK_FARM',
          category: 'FEED_PURCHASE',
          description: `Initial Feed Supply Allotment: ${data.subType}`,
          amount: addFeed,
          vendorName: 'Premier Feed Mills Ltd',
          receiptAttached: true,
          loggedBy: `${currentRole} Field Agent`,
        },
        ...prev,
      ]);
    }
    if (addMed > 0) {
      setExpenses((prev) => [
        {
          id: `EXP-MED-${Date.now().toString().slice(-4)}`,
          date: new Date().toISOString().split('T')[0],
          division: 'LIVESTOCK_FARM',
          category: 'VET_SUPPLIES',
          description: `Intake Vaccination & Prophylaxis: ${data.subType}`,
          amount: addMed,
          vendorName: 'Vet Care Pharmaceuticals Ltd',
          receiptAttached: true,
          loggedBy: `${currentRole} Vet Officer`,
        },
        ...prev,
      ]);
    }

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'LIVESTOCK_BATCH_REGISTERED',
      performedBy: `User (${currentRole})`,
      userId: `USR-${Date.now().toString().slice(-3)}`,
      roleLevel: currentRole,
      details: `Registered ${data.headCount} ${data.subType} in ${data.locationPen}. Cost per head: ₦${costPerHead.toLocaleString()}. Transport: ₦${addTransport.toLocaleString()}, Feed: ₦${addFeed.toLocaleString()}, Meds: ₦${addMed.toLocaleString()}. Synced to L2/L3 ledger.`,
      ipAddress: '192.168.1.42 (Farm Terminal)',
      hash: `SHA256:${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    const totalOps = addTransport + addFeed + addMed;
    showToast(
      totalOps > 0
        ? `✅ Intake registered! +${data.headCount} animals added. Transport (₦${addTransport.toLocaleString()}), Feed (₦${addFeed.toLocaleString()}), and Meds (₦${addMed.toLocaleString()}) updated across Level 2 and Level 3!`
        : `✅ New livestock batch registered: +${data.headCount} head added to official inventory!`,
      'success'
    );
  };

  // 9. Stock-In Procurement Receipt
  const handleStockInProcurement = (data: {
    itemId: string;
    itemName: string;
    quantity: number;
    unitCost: number;
    supplier: string;
    referenceDoc: string;
  }) => {
    let balanceAfter = 0;
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === data.itemId) {
          balanceAfter = item.currentStock + data.quantity;
          return { ...item, currentStock: balanceAfter, unitCost: data.unitCost };
        }
        return item;
      })
    );

    const movement: InventoryMovement = {
      id: `MOV-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString(),
      itemId: data.itemId,
      itemName: data.itemName,
      movementType: 'STOCK_IN_PROCUREMENT',
      quantity: data.quantity,
      balanceAfter,
      unit: 'Units',
      referenceDoc: `${data.referenceDoc} (${data.supplier})`,
      initiatedBy: `${currentRole} Warehouse Lead`,
    };
    setInventoryMovements((prev) => [movement, ...prev]);

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'WAREHOUSE_STOCK_IN_RECEIVED',
      performedBy: `User (${currentRole})`,
      userId: `USR-${Date.now().toString().slice(-3)}`,
      roleLevel: currentRole,
      details: `Received +${data.quantity} units of ${data.itemName} from ${data.supplier} (Ref: ${data.referenceDoc}).`,
      ipAddress: '192.168.1.50 (Warehouse Terminal)',
      hash: `SHA256:${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(`📦 Received +${data.quantity} units of ${data.itemName} into Warehouse Inventory!`, 'success');
  };

  // 10. Requisition & Purchase Order Draft
  const handleAddRequisition = (data: {
    category: any;
    title: string;
    description: string;
    amount: number;
    terms: string;
    vendorName?: string;
  }) => {
    const newReq: PendingApprovalItem = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      timestamp: 'Today, Just Now',
      category: data.category,
      title: data.title,
      description: data.description,
      department: 'Central Operations',
      amount: data.amount,
      repaymentTerms: data.terms,
      vendorName: data.vendorName || 'Corporate Vendor',
      initiatedBy: `Staff Officer (${currentRole})`,
      initiatorLevel: currentRole,
      status: 'PENDING',
    };

    setPendingApprovals((prev) => [newReq, ...prev]);

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'PURCHASE_REQUISITION_DRAFTED',
      performedBy: `User (${currentRole})`,
      userId: `USR-${Date.now().toString().slice(-3)}`,
      roleLevel: currentRole,
      details: `Drafted ${data.category} "${data.title}" for ₦${data.amount.toLocaleString()}. Queued for Level 3 MD review.`,
      ipAddress: '192.168.1.10 (Admin Office)',
      hash: `SHA256:${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(`📋 Requisition drafted! ₦${data.amount.toLocaleString()} queued for Level 3 Executive sanction.`, 'success');
  };

  // 11. Level 3 Executive Approval & PO Generation
  const handleApproveItem = (id: string, name: string) => {
    if (currentRole !== 'LEVEL_3') {
      showToast('⛔ ACCESS DENIED: Only Level 3 Executive accounts have financial approval authority.', 'danger');
      return;
    }

    const item = pendingApprovals.find((i) => i.id === id);
    if (!item) return;

    // If it's a Purchase Order requisition, generate the formal PO record & expense!
    if (item.category === 'PURCHASE_ORDER' && item.amount) {
      const newPO: PurchaseOrderRecord = {
        id: `PO-2026-${Date.now().toString().slice(-4)}`,
        requisitionRef: item.id,
        dateIssued: new Date().toISOString().split('T')[0],
        vendorName: item.vendorName || 'Premier Agro Supplies Ltd',
        department: item.department || 'Central Farm Operations',
        lineItems: [
          {
            id: `LI-01`,
            itemDescription: item.title,
            quantity: 1,
            unit: 'Bulk Order',
            unitPrice: item.amount,
            totalPrice: item.amount,
          },
        ],
        subTotal: item.amount,
        taxAmount: 0,
        grandTotal: item.amount,
        deliveryTerms: 'Central Enterprise Warehouse Offloading Bay',
        paymentTerms: item.repaymentTerms || 'Net 14 Days',
        approvedByL3: 'Ibrahim J. (Managing Director)',
        status: 'PENDING_DELIVERY',
      };
      setPurchaseOrders((prev) => [newPO, ...prev]);

      // Post expense voucher
      const poExpense: CategorizedExpenseRecord = {
        id: `EXP-PO-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().split('T')[0],
        division: 'LIVESTOCK_FARM',
        category: 'FEED_PURCHASE',
        description: `Disbursement under approved PO: ${newPO.id} (${item.title})`,
        amount: item.amount,
        vendorName: item.vendorName || 'Premier Agro Supplies Ltd',
        receiptAttached: true,
        approvedBy: 'Executive MD (Level 3)',
        loggedBy: 'Executive Finance',
      };
      setExpenses((prev) => [poExpense, ...prev]);
    }

    // If it's a Debt Assumption ticket, activate the debt in debtAging
    if (item.category === 'DEBT_ASSUMPTION') {
      setDebtAging((prev) =>
        prev.map((d) => (d.partyName.includes(item.title) ? { ...d, status: 'ACTIVE_AMORTIZING' } : d))
      );
    }

    // If it's a Quarantine Deletion confirmation, permanently purge the targeted record
    if (item.category === 'DELETION_QUARANTINE' && item.targetRecordId) {
      const recId = item.targetRecordId;
      setFeedLogs((prev) => prev.filter((r) => r.id !== recId));
      setMedicalLogs((prev) => prev.filter((r) => r.id !== recId));
      setRemittances((prev) => prev.filter((r) => r.id !== recId));
      setYields((prev) => prev.filter((r) => r.id !== recId));
      setSales((prev) => prev.filter((r) => r.id !== recId));
      setExpenses((prev) => prev.filter((r) => r.id !== recId));
      setFuelLogs((prev) => prev.filter((r) => r.id !== recId));
    }

    setPendingApprovals((prev) => prev.filter((item) => item.id !== id));

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'EXECUTIVE_LEVEL_3_APPROVAL_AND_SANCTION',
      performedBy: 'Executive MD (Level 3)',
      userId: 'USR-L3-MD',
      roleLevel: 'LEVEL_3',
      details: `Officially sanctioned: "${name}". Purchase Order generated and ledger updated.`,
      ipAddress: '192.168.1.1 (Boardroom Executive Terminal)',
      hash: `SHA256:AUTH-${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(`✅ Sanctioned! "${name}" approved by Level 3 authority. Purchase Order issued.`, 'success');
  };

  // 12. Level 3 Executive Rejection
  const handleRejectItem = (id: string, name: string) => {
    if (currentRole !== 'LEVEL_3') {
      showToast('⛔ ACCESS DENIED: Only Level 3 Executive accounts can formally reject tickets.', 'danger');
      return;
    }

    setPendingApprovals((prev) => prev.filter((item) => item.id !== id));

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'EXECUTIVE_LEVEL_3_REJECTION',
      performedBy: 'Executive MD (Level 3)',
      userId: 'USR-L3-MD',
      roleLevel: 'LEVEL_3',
      details: `Requisition "${name}" formally rejected by Level 3 authority.`,
      ipAddress: '192.168.1.1 (Boardroom Executive Terminal)',
      hash: `SHA256:REJ-${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(`❌ Requisition "${name}" was rejected.`, 'warning');
  };

  // 13. Settle Debt Action
  const handleSettleDebt = (id: string, amount: number) => {
    if (currentRole !== 'LEVEL_3') {
      showToast('⛔ ACCESS DENIED: Only Level 3 can authorize debt clearance.', 'danger');
      return;
    }

    setDebtAging((prev) =>
      prev.map((d) => (d.id === id ? { ...d, balanceRemaining: 0, status: 'CLEARED' } : d))
    );

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'DEBT_OBLIGATION_SETTLED',
      performedBy: 'Executive MD (Level 3)',
      userId: 'USR-L3-MD',
      roleLevel: 'LEVEL_3',
      details: `Cleared ₦${amount.toLocaleString()} on debt account ${id}. Marked CLEARED.`,
      ipAddress: '192.168.1.1 (Boardroom Executive Terminal)',
      hash: `SHA256:DEBT-CLEAR-${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(`💰 Debt account ${id} marked CLEARED in full!`, 'success');
  };

  // 14. 3-Tier Governance: Record Deletion Rule
  const handleDeleteRecord = (recordId: string, recordType: string) => {
    if (currentRole === 'LEVEL_1') {
      showToast('⛔ ACCESS DENIED: Level 1 Entry accounts do not have deletion privileges.', 'danger');
      return;
    }

    if (currentRole === 'LEVEL_2') {
      const reason = window.prompt(
        `Level 2 Supervisor Action:\nPlease enter the mandatory operational justification for requesting deletion of record ${recordId}:`,
        'Entry error during shift handover'
      );

      if (!reason) return;

      const quarantineItem: PendingApprovalItem = {
        id: `DEL-REQ-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toLocaleTimeString(),
        category: 'DELETION_QUARANTINE',
        title: `Quarantine Deletion Request: ${recordType} (${recordId})`,
        description: `Supervisor Justification: "${reason}". Forwarded to Level 3 Executive under two-person audit rule.`,
        department: 'Operational Auditing',
        initiatedBy: 'Supervisor (Level 2)',
        initiatorLevel: 'LEVEL_2',
        status: 'PENDING',
        targetRecordId: recordId,
        targetRecordType: recordType,
      };

      setPendingApprovals((prev) => [quarantineItem, ...prev]);

      const auditEntry: AuditTrailEntry = {
        id: `AUD-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toLocaleTimeString(),
        action: 'DELETION_SENT_TO_QUARANTINE',
        performedBy: 'Supervisor (Level 2)',
        userId: 'USR-L2-SUP',
        roleLevel: 'LEVEL_2',
        details: `Requested deletion of ${recordId}. Reason: ${reason}. Awaiting Level 3 approval.`,
        ipAddress: '192.168.1.10 (Fleet Office)',
        hash: `SHA256:DEL-PEND-${Math.random().toString(36).substring(2)}${Date.now()}`,
      };
      setAuditTrail((prev) => [auditEntry, ...prev]);

      showToast(`🛡️ Record placed in "Deletion Quarantine". Dispatched to Level 3 Executive queue.`, 'warning');
      return;
    }

    // LEVEL 3: Permanent purge
    const confirmed = window.confirm(
      `Level 3 Executive Action:\nAre you sure you want to permanently purge record ${recordId}? An unalterable audit hash will be logged in the permanent ledger.`
    );

    if (!confirmed) return;

    if (recordType === 'FEED_LOG') {
      setFeedLogs((prev) => prev.filter((r) => r.id !== recordId));
    } else if (recordType === 'MED_LOG') {
      setMedicalLogs((prev) => prev.filter((r) => r.id !== recordId));
    } else if (recordType === 'REMITTANCE') {
      setRemittances((prev) => prev.filter((r) => r.id !== recordId));
    } else if (recordType === 'YIELD_LOG') {
      setYields((prev) => prev.filter((r) => r.id !== recordId));
    } else if (recordType === 'SALE_LOG') {
      setSales((prev) => prev.filter((r) => r.id !== recordId));
    } else if (recordType === 'EXPENSE_LOG') {
      setExpenses((prev) => prev.filter((r) => r.id !== recordId));
    } else if (recordType === 'FUEL') {
      setFuelLogs((prev) => prev.filter((r) => r.id !== recordId));
    }

    const auditEntry: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: 'PERMANENT_RECORD_PURGED',
      performedBy: 'Executive MD (Level 3)',
      userId: 'USR-L3-MD',
      roleLevel: 'LEVEL_3',
      details: `Permanently purged ${recordType} (${recordId}) under Level 3 executive prerogative.`,
      ipAddress: '192.168.1.1 (Boardroom Terminal)',
      hash: `SHA256:PURGE-${Math.random().toString(36).substring(2)}${Date.now()}`,
    };
    setAuditTrail((prev) => [auditEntry, ...prev]);

    showToast(`🗑️ Record ${recordId} permanently purged. Cryptographic hash recorded.`, 'danger');
  };

  if (!userSession) {
    return (
      <>
        {toastMessage && (
          <div
            className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-3 border transition-all animate-bounce ${
              toastMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : toastMessage.type === 'warning'
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-rose-50 text-rose-900 border-rose-300'
            }`}
          >
            <span>{toastMessage.text}</span>
            <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-slate-700 font-bold p-1">✕</button>
          </div>
        )}
        <LoginPage
          onLogin={(session) => {
            setUserSession(session);
            if (session.role === 'LEVEL_1') {
              setActivePortal('PORTAL_FARM');
            } else if (session.role === 'LEVEL_2') {
              setActivePortal('PORTAL_GOVERNANCE');
            } else {
              setActivePortal('PORTAL_FARM');
            }
            showToast(`Welcome back, ${session.name} (${session.roleTitle})`, 'success');
          }}
        />
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50/70 text-slate-900 font-sans">
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-3 border transition-all animate-bounce ${
            toastMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : toastMessage.type === 'warning'
              ? 'bg-amber-50 text-amber-900 border-amber-300'
              : 'bg-rose-50 text-rose-900 border-rose-300'
          }`}
        >
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-slate-700 font-bold p-1">✕</button>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <Sidebar
        activePortal={activePortal}
        onPortalChange={(p) => {
          handlePortalChange(p);
          setIsMobileMenuOpen(false);
        }}
        userSession={userSession}
        onLogout={() => {
          setUserSession(null);
          showToast('Signed out of session safely.', 'success');
        }}
        onResetDemo={handleResetDemo}
        pendingApprovalsCount={pendingApprovals.length}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* RIGHT MAIN WORKSPACE CANVAS */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* MOBILE SLIM HEADER */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl cursor-pointer"
          >
            <span className="text-sm">☰</span>
            <span>Menu</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-900">NJIPP KONSULT</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {userSession.role.replace('_', ' ')}
            </span>
          </div>
        </header>

        {/* MAIN CONTENT CANVAS */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* LEVEL 1: STREAMLINED FIELD PUNCH-IN TERMINAL */}
        {currentRole === 'LEVEL_1' ? (
          <Level1FieldTerminal
            onOpenFeedDrawer={(sec) => {
              if (sec) setDrawerSection(sec);
              setActiveDrawer('FEED_LOG');
            }}
            onOpenYieldDrawer={() => setActiveDrawer('YIELD_LOG')}
            onOpenRemittanceDrawer={() => setActiveDrawer('REMITTANCE')}
            onOpenFuelDrawer={() => setActiveDrawer('FUEL_MAINTENANCE')}
            onOpenMedDrawer={(sec) => {
              if (sec) setDrawerSection(sec);
              setActiveDrawer('MEDICAL_LOG');
            }}
            onOpenSaleDrawer={(sec) => {
              if (sec) setDrawerSection(sec);
              setActiveDrawer('SALE_LOG');
            }}
            onOpenRegisterDrawer={(sec) => {
              if (sec) setDrawerSection(sec);
              setActiveDrawer('REGISTER_LIVESTOCK');
            }}
            ledgerRows={animalLedger}
            livestock={livestock}
            feedLogs={feedLogs}
            yields={yields}
            medicalLogs={medicalLogs}
            sales={sales}
            remittances={remittances}
            fuelLogs={fuelLogs}
            recentLogsCount={feedLogs.length + remittances.length + yields.length + sales.length}
          />
        ) : currentRole === 'LEVEL_2' && activePortal === 'PORTAL_GOVERNANCE' ? (
          /* LEVEL 2: SUPERVISORY ANOMALY RADAR & VERIFICATION QUEUE */
          <Level2SupervisorDesk
            quarantineRequests={pendingApprovals.filter((i) => i.category === 'DELETION_QUARANTINE')}
            abnormalFuelLogs={fuelLogs.filter((f) => f.isAbnormalFuelFlag)}
            remittanceArrears={remittances.filter((r) => r.deficitSurplus < 0)}
            yields={yields}
            medicalLogs={medicalLogs}
            inventory={inventory}
            ledgerRows={animalLedger}
            vehicleRows={vehicleLedger}
            onRequestQuarantineDelete={handleDeleteRecord}
            onClearAnomalyFlag={(id) => {
              setFuelLogs((prev) =>
                prev.map((f) => (f.id === id ? { ...f, isAbnormalFuelFlag: false } : f))
              );
              showToast('✅ Supervisor audit complete: Flag cleared with verification note.', 'success');
            }}
          />
        ) : (
          <>
            {/* 1. FARM PORTAL */}
            {activePortal === 'PORTAL_FARM' && (
              <ModernFarmWorkspace
                currentRole={currentRole}
                livestock={livestock}
                feedLogs={feedLogs}
                yields={yields}
                sales={sales}
                medicalLogs={medicalLogs}
                inventory={inventory}
                inventoryMovements={inventoryMovements}
                ledgerRows={animalLedger}
                onUpdateLedgerRow={(updated) =>
                  setAnimalLedger((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
                }
                onOpenFeedDrawer={() => setActiveDrawer('FEED_LOG')}
                onOpenYieldDrawer={() => setActiveDrawer('YIELD_LOG')}
                onOpenSaleDrawer={() => setActiveDrawer('SALE_LOG')}
                onOpenMedDrawer={() => setActiveDrawer('MEDICAL_LOG')}
                onOpenRegisterDrawer={() => setActiveDrawer('REGISTER_LIVESTOCK')}
                onOpenStockInDrawer={() => setActiveDrawer('STOCK_IN')}
                onDeleteRecord={handleDeleteRecord}
              />
            )}

            {/* 2. TRANSPORT FLEET PORTAL */}
            {activePortal === 'PORTAL_TRANSPORT' && (
              <ModernTransportWorkspace
                currentRole={currentRole}
                fleet={fleet}
                remittances={remittances}
                fuelLogs={fuelLogs}
                vehicleRows={vehicleLedger}
                onOpenRemittanceDrawer={() => setActiveDrawer('REMITTANCE')}
                onOpenFuelDrawer={() => setActiveDrawer('FUEL_MAINTENANCE')}
                onDeleteRecord={handleDeleteRecord}
              />
            )}

            {/* 3. GOVERNANCE & APPROVALS PORTAL */}
            {activePortal === 'PORTAL_GOVERNANCE' && (
              <ModernGovernanceWorkspace
                currentRole={currentRole}
                pendingApprovals={pendingApprovals}
                expenses={expenses}
                debtAging={debtAging}
                purchaseOrders={purchaseOrders}
                auditTrail={auditTrail}
                onApproveItem={handleApproveItem}
                onRejectItem={handleRejectItem}
                onOpenDraftDrawer={() => setActiveDrawer('REQUISITION')}
                onOpenExpenseDrawer={() => setActiveDrawer('EXPENSE_LOG')}
                onSettleDebt={handleSettleDebt}
              />
            )}

            {/* 4. FUTURE VENTURES PORTAL */}
            {activePortal === 'PORTAL_VENTURES' && (
              <ModernVenturesWorkspace
                matches={matches}
                plots={plots}
                waterBatches={waterBatches}
                nurseryBeds={nurseryBeds}
                onSellTicket={(matchId, tier) => {
                  setMatches((prev) =>
                    prev.map((m) => {
                      if (m.id === matchId) {
                        const isVip = tier === 'VIP';
                        const addIncome = isVip ? 1500 : m.ticketPrice;
                        return {
                          ...m,
                          ticketsSoldVIP: isVip ? m.ticketsSoldVIP + 1 : m.ticketsSoldVIP,
                          ticketsSoldRegular: !isVip ? m.ticketsSoldRegular + 1 : m.ticketsSoldRegular,
                          gateIncomeTotal: m.gateIncomeTotal + addIncome,
                        };
                      }
                      return m;
                    })
                  );
                }}
                onRecordConcession={(matchId, amount) => {
                  setMatches((prev) =>
                    prev.map((m) => (m.id === matchId ? { ...m, concessionsRevenue: m.concessionsRevenue + amount } : m))
                  );
                }}
                onApplyCropInput={(plotId, bags) => {
                  setPlots((prev) =>
                    prev.map((p) => (p.id === plotId ? { ...p, fertilizerBagsApplied: p.fertilizerBagsApplied + bags } : p))
                  );
                }}
                onRecordWaterBatch={(productLine, units) => {
                  setWaterBatches((prev) =>
                    prev.map((w) => (w.productLine === productLine ? { ...w, unitsProduced: w.unitsProduced + units } : w))
                  );
                }}
                onTransplantNursery={(bedId, count) => {
                  setNurseryBeds((prev) =>
                    prev.map((b) => (b.id === bedId ? { ...b, seedlingsGerminated: Math.max(0, b.seedlingsGerminated - count) } : b))
                  );
                }}
                onNotify={(msg) => showToast(msg, 'success')}
              />
            )}
          </>
        )}
        </main>
      </div>

      {/* MODERN SLIDE-OVER CONTEXTUAL DRAWER (10 FORMS) */}
      <ModernActionDrawer
        currentRole={currentRole}
        activeDrawer={activeDrawer}
        initialSection={drawerSection}
        onClose={() => {
          setActiveDrawer(null);
          setDrawerSection(null);
        }}
        inventory={inventory}
        fleet={fleet}
        onAddFeedLog={handleAddFeedLog}
        onAddRemittance={handleAddRemittance}
        onAddMedical={handleAddMedical}
        onAddRequisition={handleAddRequisition}
        onAddYield={handleAddYield}
        onAddSale={handleAddSale}
        onAddExpense={handleAddExpense}
        onAddFuelMaintenance={handleAddFuelMaintenance}
        onRegisterLivestock={handleRegisterLivestock}
        onStockInProcurement={handleStockInProcurement}
      />
    </div>
  );
}
