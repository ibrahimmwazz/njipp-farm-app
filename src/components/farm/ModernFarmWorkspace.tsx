'use client';

import React, { useState } from 'react';
import {
  Wheat,
  Plus,
  Stethoscope,
  Package,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Filter,
  BarChart3,
  TrendingUp,
  DollarSign,
  ChevronRight,
  TrendingDown,
  Layers,
  ArrowRight,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Truck,
  FileSpreadsheet
} from 'lucide-react';
import {
  UserRoleLevel,
  LivestockBatch,
  FarmFeedingRecord,
  ProductionYieldRecord,
  LivestockSalesRecord,
  FarmMedicalRecord,
  InventoryItem,
  InventoryMovement,
  LivestockSection,
  AnimalProductionLedgerRow
} from '@/types';
import { ModernMetricCard } from '@/components/ui/ModernMetricCard';
import { AnimalProductionLedger } from './AnimalProductionLedger';
import { AnimalUnitsDashboard } from './AnimalUnitsDashboard';
import { initialAnimalLedger } from '@/lib/initialData';

interface ModernFarmProps {
  currentRole: UserRoleLevel;
  livestock: LivestockBatch[];
  feedLogs: FarmFeedingRecord[];
  yields: ProductionYieldRecord[];
  sales: LivestockSalesRecord[];
  medicalLogs: FarmMedicalRecord[];
  inventory: InventoryItem[];
  inventoryMovements?: InventoryMovement[];
  ledgerRows?: AnimalProductionLedgerRow[];
  onUpdateLedgerRow?: (updatedRow: AnimalProductionLedgerRow) => void;
  onOpenFeedDrawer: () => void;
  onOpenYieldDrawer: () => void;
  onOpenSaleDrawer: () => void;
  onOpenMedDrawer: () => void;
  onOpenRegisterDrawer?: () => void;
  onOpenStockInDrawer?: () => void;
  onDeleteRecord: (id: string, type: string) => void;
}

export const ModernFarmWorkspace: React.FC<ModernFarmProps> = ({
  currentRole,
  livestock,
  feedLogs,
  yields,
  sales,
  medicalLogs,
  inventory,
  inventoryMovements = [],
  ledgerRows,
  onUpdateLedgerRow,
  onOpenFeedDrawer,
  onOpenYieldDrawer,
  onOpenSaleDrawer,
  onOpenMedDrawer,
  onOpenRegisterDrawer,
  onOpenStockInDrawer,
  onDeleteRecord,
}) => {
  // Horizontal Tab Navigation
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'LEDGER' | 'REGISTRY' | 'YIELDS' | 'FEEDING' | 'CLINIC' | 'INVENTORY'>('OVERVIEW');
  const [livestockFilter, setLivestockFilter] = useState<LivestockSection | 'ALL'>('ALL');
  const [localLedger, setLocalLedger] = useState<AnimalProductionLedgerRow[]>(ledgerRows || initialAnimalLedger);

  // Keep local ledger updated if parent prop changes
  const activeLedger = ledgerRows || localLedger;

  const handleLedgerUpdate = (updatedRow: AnimalProductionLedgerRow) => {
    setLocalLedger((prev) => prev.map((r) => (r.id === updatedRow.id ? updatedRow : r)));
    if (onUpdateLedgerRow) {
      onUpdateLedgerRow(updatedRow);
    }
  };

  const filteredLivestock =
    livestockFilter === 'ALL'
      ? livestock
      : livestock.filter((l) => {
          if (livestockFilter === 'RAMS') return l.section === 'RAMS' || (l.section as string) === 'SHEEP';
          return l.section === livestockFilter;
        });

  const totalHead = livestock.reduce((acc, curr) => acc + curr.headCount, 0);
  const totalSalesRevenue = sales.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalBagsDispensed = feedLogs.reduce((acc, curr) => acc + curr.quantityBags, 0);
  const totalMortality = medicalLogs.reduce((acc, curr) => acc + curr.mortalityCount, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. TOP HEADER & QUICK ACTION BAR */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Livestock Farm
            </span>
            <span className="text-xs font-bold text-slate-500">• Cattle • Rams • Goats • Rabbits • Poultry • Waterfowl</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Livestock Farm Management
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl font-medium">
            Track total animal headcount, record daily animal feeding, collect eggs and milk yields, monitor animal health, and track complete production & financial cost ledgers.
          </p>
        </div>

        {/* Role-Based Action Bar: Daily typing locked to Level 1, Review/P&L on Level 2 & 3 */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          {currentRole === 'LEVEL_1' ? (
            <>
              {onOpenRegisterDrawer && (
                <button
                  onClick={onOpenRegisterDrawer}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Animals (Batch)</span>
                </button>
              )}
              <button
                onClick={onOpenFeedDrawer}
                className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all hover:shadow-md cursor-pointer"
              >
                <Wheat className="w-4 h-4" />
                <span>Record Feeding</span>
              </button>
              <button
                onClick={onOpenYieldDrawer}
                className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-2 border border-emerald-200 transition-all cursor-pointer"
              >
                <BarChart3 className="w-4 h-4 text-emerald-700" />
                <span>Record Milk / Eggs</span>
              </button>
              <button
                onClick={onOpenSaleDrawer}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 border border-slate-300 transition-all cursor-pointer"
              >
                <DollarSign className="w-4 h-4 text-slate-600" />
                <span>Sell Animals / Eggs</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-700 font-medium shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {currentRole === 'LEVEL_2'
                  ? 'Supervisor Station Active • Routine field entries punched exclusively by Level 1 staff'
                  : 'Executive Console Active • Field punches recorded by Level 1 staff. Full P&L & ledger active.'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. TAB NAVIGATION BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'OVERVIEW', label: 'Farm Overview', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'LEDGER', label: 'Production & Financial Ledger (Excel)', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-600" />, badge: 'Excel Mirror' },
          { id: 'REGISTRY', label: 'Animals List', icon: <Layers className="w-4 h-4" />, count: livestock.length },
          { id: 'YIELDS', label: 'Egg & Milk Yields', icon: <TrendingUp className="w-4 h-4" />, count: yields.length + sales.length },
          { id: 'FEEDING', label: 'Feed Records', icon: <Wheat className="w-4 h-4" />, count: feedLogs.length },
          { id: 'CLINIC', label: 'Animal Health & Clinic', icon: <Stethoscope className="w-4 h-4" />, count: medicalLogs.length },
          { id: 'INVENTORY', label: 'Store & Warehouse Stock', icon: <Package className="w-4 h-4" />, count: inventory.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-emerald-100 text-emerald-800">
                {tab.badge}
              </span>
            )}
            {tab.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeTab === tab.id ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 3. TAB CONTENT */}

      {/* ================= TAB 1: EXECUTIVE OVERVIEW (TOTAL DASHBOARD & ALL 6 UNITS) ================= */}
      {activeTab === 'OVERVIEW' && (
        <AnimalUnitsDashboard
          ledgerRows={activeLedger}
          onOpenLedgerTab={() => setActiveTab('LEDGER')}
        />
      )}

      {/* ================= TAB 2: ANIMAL PRODUCTION INVENTORY & FINANCIAL LEDGER ================= */}
      {activeTab === 'LEDGER' && (
        <AnimalProductionLedger
          ledgerRows={activeLedger}
          onUpdateRow={handleLedgerUpdate}
        />
      )}

      {/* ================= TAB 2: HERD & FLOCK REGISTRY ================= */}
      {activeTab === 'REGISTRY' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-2xl shadow-xs self-start overflow-x-auto max-w-full">
              {[
                { id: 'ALL', label: 'All Units' },
                { id: 'CATTLE', label: 'Cattle' },
                { id: 'RAMS', label: 'Rams' },
                { id: 'GOATS', label: 'Goats' },
                { id: 'RABBITS', label: 'Rabbits' },
                { id: 'POULTRY', label: 'Poultry' },
                { id: 'WATERFOWL', label: 'Waterfowl' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setLivestockFilter(filter.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    livestockFilter === filter.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Showing <strong>{filteredLivestock.length}</strong> batches
              </span>
              {onOpenRegisterDrawer && (
                <button
                  onClick={onOpenRegisterDrawer}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register Flock/Herd</span>
                </button>
              )}
            </div>
          </div>

          {/* Livestock Table */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Tag / Flock Name</th>
                    <th className="px-6 py-4">Section</th>
                    <th className="px-6 py-4">Breed Lineage</th>
                    <th className="px-6 py-4">Headcount</th>
                    <th className="px-6 py-4">Avg Weight</th>
                    <th className="px-6 py-4">Age Cohort</th>
                    <th className="px-6 py-4">Gender Ratio</th>
                    <th className="px-6 py-4">Pen Location</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLivestock.map((batch) => (
                    <tr key={batch.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {batch.tagOrFlock}
                        <span className="block text-[10px] text-slate-400 font-mono font-normal">{batch.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {batch.section}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{batch.subType}</td>
                      <td className="px-6 py-4 font-mono-num font-black text-slate-900 text-sm">
                        {batch.headCount.toLocaleString()} Head
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-800 font-bold">
                        {batch.weightAvgKg ? `${batch.weightAvgKg} kg` : '—'}
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-medium">{batch.ageCohort || 'Active'}</td>
                      <td className="px-6 py-4 text-slate-500">{batch.genderRatio || 'Standard'}</td>
                      <td className="px-6 py-4 text-slate-600">{batch.locationPen}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                            batch.status === 'HEALTHY'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : batch.status === 'MONITORING'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}
                        >
                          {batch.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: YIELDS, FCR & SALES LEDGER ================= */}
      {activeTab === 'YIELDS' && (
        <div className="space-y-8">
          
          {/* SECTION A: PRODUCTION YIELDS & FCR */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-700" />
                  <span>Daily Production Yields & FCR Engine</span>
                </h3>
                <p className="text-xs text-slate-500">Egg counts, dairy yields, slaughter liveweight, and conversion ratios</p>
              </div>
              <button
                onClick={onOpenYieldDrawer}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs self-start sm:self-auto"
              >
                + Log Yield Batch
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Date / Batch</th>
                    <th className="px-6 py-4">Division</th>
                    <th className="px-6 py-4">Yield Type</th>
                    <th className="px-6 py-4">Quantity Produced</th>
                    <th className="px-6 py-4">Feed Consumed</th>
                    <th className="px-6 py-4">FCR Metric</th>
                    <th className="px-6 py-4">Quality Grade</th>
                    <th className="px-6 py-4">Yield Officer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yields.map((yd) => (
                    <tr key={yd.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{yd.batchOrPen}</div>
                        <span className="text-[10px] text-slate-400 font-mono-num">{yd.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold font-mono text-[10px]">
                          {yd.section}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {yd.yieldType.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 font-mono-num font-black text-slate-900 text-sm">
                        {yd.quantity}{' '}
                        {yd.yieldType === 'EGGS_CRATES'
                          ? 'Crates'
                          : yd.yieldType === 'MILK_LITERS'
                          ? 'Liters'
                          : yd.yieldType === 'MANURE_BAGS'
                          ? 'Bags'
                          : 'Kg'}
                      </td>
                      <td className="px-6 py-4 font-mono-num text-slate-600 font-medium">
                        {yd.feedConsumedBags} Bags (25kg)
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-md font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          FCR: {yd.calculatedFCR}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">{yd.qualityGrade}</td>
                      <td className="px-6 py-4 text-slate-500">{yd.loggedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION B: LIVESTOCK & PRODUCE SALES LEDGER (PREVIOUSLY MISSING FROM UI!) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-700" />
                  <span>Commercial Livestock & Produce Sales Ledger</span>
                </h3>
                <p className="text-xs text-slate-500">Direct sales receipts, client credit facilities, and cross-ledger synchronization</p>
              </div>
              <button
                onClick={onOpenSaleDrawer}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs self-start sm:self-auto"
              >
                + Post Livestock / Produce Sale
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Sale Ref / Date</th>
                    <th className="px-6 py-4">Section</th>
                    <th className="px-6 py-4">Item Description</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Unit Price (₦)</th>
                    <th className="px-6 py-4">Total Amount (₦)</th>
                    <th className="px-6 py-4">Customer Name</th>
                    <th className="px-6 py-4">Settlement Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sales.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-slate-400">
                        No sales transactions recorded yet.
                      </td>
                    </tr>
                  ) : (
                    sales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-slate-900">
                          {sale.id}
                          <span className="block text-[10px] text-slate-400 font-sans">{sale.date}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-slate-700">
                            {sale.section}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800">{sale.description}</td>
                        <td className="px-6 py-4 font-mono font-bold text-slate-900">{sale.quantity}</td>
                        <td className="px-6 py-4 font-mono text-slate-600">₦{sale.unitPrice.toLocaleString()}</td>
                        <td className="px-6 py-4 font-mono-num font-black text-emerald-800 text-sm">
                          ₦{sale.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-800">{sale.customerName}</td>
                        <td className="px-6 py-4">
                          {sale.paymentStatus === 'PAID' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              PAID (Instant Wire/Cash)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                              CREDIT (Pending L3)
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 4: FEEDING & STOCK OUT ================= */}
      {activeTab === 'FEEDING' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">Feed Stock-Out & Feeding Logs</h3>
                <p className="text-xs text-slate-500">Every feed dispatch automatically decrements warehouse stock and calculates feeding costs</p>
              </div>
              <button
                onClick={onOpenFeedDrawer}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
              >
                + Record Feed Dispatch
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Log ID / Time</th>
                    <th className="px-6 py-4">Division</th>
                    <th className="px-6 py-4">Target Pen</th>
                    <th className="px-6 py-4">Feed Formulation</th>
                    <th className="px-6 py-4">Quantity Dispensed</th>
                    <th className="px-6 py-4">Logged By</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {feedLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-800">
                        {log.id}
                        <span className="block text-[10px] text-slate-400 font-sans">{log.timestamp}</span>
                      </td>
                      <td className="px-6 py-4 font-bold">{log.section}</td>
                      <td className="px-6 py-4 text-slate-700">{log.penLocation}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{log.feedType}</td>
                      <td className="px-6 py-4 font-mono-num font-black text-emerald-800 text-sm">
                        {log.quantityBags} Bags
                      </td>
                      <td className="px-6 py-4 text-slate-500">{log.loggedBy}</td>
                      <td className="px-6 py-4">
                        {currentRole !== 'LEVEL_1' && (
                          <button
                            onClick={() => onDeleteRecord(log.id, 'FEED_LOG')}
                            className="text-rose-600 hover:underline font-bold text-[11px]"
                          >
                            {currentRole === 'LEVEL_2' ? 'Quarantine Delete' : 'Purge'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: VETERINARY & MORTALITY ================= */}
      {activeTab === 'CLINIC' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-rose-700" />
                  <span>Veterinary Clinical Registry & Mortality Audit</span>
                </h3>
                <p className="text-xs text-slate-500">Vaccine schedules, drug withdrawal quarantine tracking, necropsy notes, and vet verification</p>
              </div>
              <button
                onClick={onOpenMedDrawer}
                className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs self-start sm:self-auto"
              >
                + Log Vet / Mortality Event
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Event ID / Date</th>
                    <th className="px-6 py-4">Section / Batch</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Diagnosis / Details</th>
                    <th className="px-6 py-4">Treatment & Necropsy</th>
                    <th className="px-6 py-4">Withdrawal Status</th>
                    <th className="px-6 py-4">Attending Vet</th>
                    <th className="px-6 py-4">Cost (₦)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medicalLogs.map((med) => (
                    <tr key={med.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-800">
                        {med.id}
                        <span className="block text-[10px] text-slate-400 font-sans">{med.timestamp}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{med.targetBatch}</div>
                        <span className="text-[10px] text-slate-500">{med.section}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                            med.type === 'MORTALITY'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : med.type === 'VACCINATION'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {med.type}
                        </span>
                        {med.mortalityCount > 0 && (
                          <span className="block text-[10px] text-rose-600 font-bold mt-0.5">
                            -{med.mortalityCount} Head
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-800 font-medium">{med.diagnosisOrEvent}</td>
                      <td className="px-6 py-4 text-slate-600 max-w-xs">
                        <div>{med.treatment}</div>
                        {med.necropsyNotes && (
                          <div className="mt-1 text-[11px] text-rose-700 bg-rose-50 p-1.5 rounded-lg border border-rose-200">
                            <strong>Necropsy:</strong> {med.necropsyNotes}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {med.withdrawalPeriodDays && med.withdrawalPeriodDays > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono font-bold text-[10px] bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" />
                            {med.withdrawalPeriodDays} Days Hold
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal">None (Cleared)</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800">{med.vetName || 'Resident Vet'}</td>
                      <td className="px-6 py-4 font-mono-num font-bold text-slate-900">
                        ₦{med.cost.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 6: WAREHOUSE INVENTORY ================= */}
      {activeTab === 'INVENTORY' && (
        <div className="space-y-8">
          
          {/* INVENTORY BALANCES TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Central Warehouse Stock Ledger</h3>
                <p className="text-xs text-slate-500">Live inventory balances, safety stock triggers, and unit valuations</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  {inventory.length} SKUs Managed
                </span>
                {onOpenStockInDrawer && (
                  <button
                    onClick={onOpenStockInDrawer}
                    className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs"
                  >
                    + Receive Stock-In
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Item Name / SKU</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Division</th>
                    <th className="px-6 py-4">Current Stock</th>
                    <th className="px-6 py-4">Reorder Point</th>
                    <th className="px-6 py-4">Unit Cost Valuation</th>
                    <th className="px-6 py-4">Stock Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.map((inv) => {
                    const isLow = inv.currentStock <= inv.reorderPoint;
                    return (
                      <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {inv.name}
                          <span className="block text-[10px] text-slate-400 font-mono font-normal">{inv.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 text-slate-700">
                            {inv.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-medium">
                          {inv.division || 'LIVESTOCK_FARM'}
                        </td>
                        <td className="px-6 py-4 font-mono-num font-black text-slate-900 text-sm">
                          {inv.currentStock.toLocaleString()} {inv.unit}
                        </td>
                        <td className="px-6 py-4 font-mono-num text-slate-500">
                          {inv.reorderPoint.toLocaleString()} {inv.unit}
                        </td>
                        <td className="px-6 py-4 font-mono-num text-slate-700 font-semibold">
                          ₦{inv.unitCost.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          {isLow ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                              Low Stock Trigger
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Adequate Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* INVENTORY MOVEMENTS AUDIT TRAIL */}
          {inventoryMovements.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
              <div className="p-6 bg-slate-50/70 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-700" />
                  <span>Stock Transaction Movement History</span>
                </h3>
                <p className="text-xs text-slate-500">Immutable audit record of every Stock-In, Stock-Out, and Dispense operation</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Movement ID / Time</th>
                      <th className="px-6 py-4">SKU / Item Name</th>
                      <th className="px-6 py-4">Movement Type</th>
                      <th className="px-6 py-4">Quantity Changed</th>
                      <th className="px-6 py-4">Balance After</th>
                      <th className="px-6 py-4">Reference Document</th>
                      <th className="px-6 py-4">Initiated By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inventoryMovements.map((mov) => (
                      <tr key={mov.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-slate-900">
                          {mov.id}
                          <span className="block text-[10px] text-slate-400 font-sans">{mov.timestamp}</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800">{mov.itemName}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                              mov.movementType.includes('STOCK_IN')
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {mov.movementType.replace('STOCK_', '')}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono font-black text-slate-900">
                          {mov.movementType.includes('STOCK_IN') ? '+' : '-'}
                          {mov.quantity} {mov.unit}
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-slate-700">
                          {mov.balanceAfter} {mov.unit}
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-medium">{mov.referenceDoc}</td>
                        <td className="px-6 py-4 text-slate-500">{mov.initiatedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
