'use client';

import React, { useState } from 'react';
import {
  UserRoleLevel,
  LivestockBatch,
  FarmFeedingRecord,
  ProductionYieldRecord,
  LivestockSalesRecord,
  FarmMedicalRecord,
  InventoryItem,
  LivestockSection
} from '@/types';
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
  TrendingDown
} from 'lucide-react';

interface FarmPortalWorkspaceProps {
  subDesk: string;
  currentRole: UserRoleLevel;
  livestock: LivestockBatch[];
  feedLogs: FarmFeedingRecord[];
  yields: ProductionYieldRecord[];
  sales: LivestockSalesRecord[];
  medicalLogs: FarmMedicalRecord[];
  inventory: InventoryItem[];
  onOpenFeedModal: () => void;
  onOpenMedModal: () => void;
  onOpenYieldModal: () => void;
  onOpenSaleModal: () => void;
  onDeleteRecord: (id: string, type: string) => void;
  onSubDeskChange: (desk: string) => void;
}

export const FarmPortalWorkspace: React.FC<FarmPortalWorkspaceProps> = ({
  subDesk,
  currentRole,
  livestock,
  feedLogs,
  yields,
  sales,
  medicalLogs,
  inventory,
  onOpenFeedModal,
  onOpenMedModal,
  onOpenYieldModal,
  onOpenSaleModal,
  onDeleteRecord,
  onSubDeskChange,
}) => {
  const [livestockFilter, setLivestockFilter] = useState<LivestockSection | 'ALL'>('ALL');

  const filteredLivestock = livestockFilter === 'ALL'
    ? livestock
    : livestock.filter((l) => l.section === livestockFilter);

  const totalHead = livestock.reduce((acc, curr) => acc + curr.headCount, 0);
  const totalSalesRevenue = sales.reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* DEPARTMENT HEADER & ACTION RIBBON */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>NJIPP Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-emerald-700 font-semibold">Division 1: Livestock Farm</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 capitalize">
              {subDesk.replace('farm_', '').replace('_', ' ')} Desk
            </span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>Integrated Livestock Farm Management</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold font-mono">
              Poultry • Sheep • Goats • Cattle
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete lifecycle registry, Feed Conversion Ratio (FCR) analytics, clinical vet logs, and direct livestock sales.
          </p>
        </div>

        {/* PRIMARY ACTIONS */}
        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          <button
            onClick={onOpenFeedModal}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record Feed Log</span>
          </button>
          <button
            onClick={onOpenYieldModal}
            className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-2 border border-emerald-300 shadow-sm transition-all"
          >
            <BarChart3 className="w-4 h-4 text-emerald-700" />
            <span>Log Daily Yield</span>
          </button>
          <button
            onClick={onOpenSaleModal}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 border border-slate-300 shadow-sm transition-all"
          >
            <DollarSign className="w-4 h-4 text-slate-600" />
            <span>Post Livestock Sale</span>
          </button>
        </div>
      </div>

      {/* ================= DESK 1: FARM OVERVIEW ================= */}
      {subDesk === 'farm_overview' && (
        <div className="space-y-6">
          {/* 4 HIGH-VISIBILITY SECTOR PANELS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Poultry */}
            <div
              onClick={() => onSubDeskChange('farm_livestock')}
              className="portal-card-interactive p-5 rounded-2xl cursor-pointer border-t-4 border-t-emerald-600"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="text-base">🐔</span> POULTRY SECTION
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  3,500 Birds
                </span>
              </div>
              <div className="text-2xl font-black font-mono-num text-slate-900 mt-3">
                68 Crates <span className="text-xs font-normal text-slate-500 font-sans">/ Day</span>
              </div>
              <div className="mt-2 text-xs text-slate-500 flex justify-between">
                <span>Layers (Pen 1) & Broilers (Pen 2)</span>
                <span className="text-emerald-700 font-bold font-mono">FCR: 2.15</span>
              </div>
            </div>

            {/* Sheep */}
            <div
              onClick={() => onSubDeskChange('farm_livestock')}
              className="portal-card-interactive p-5 rounded-2xl cursor-pointer border-t-4 border-t-amber-500"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="text-base">🐑</span> SHEEP SECTION
                </span>
                <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                  420 Head
                </span>
              </div>
              <div className="text-2xl font-black font-mono-num text-slate-900 mt-3">
                Paddock 1 & 2
              </div>
              <div className="mt-2 text-xs text-slate-500 flex justify-between">
                <span>Balami & Uda crossbreeds</span>
                <span className="text-amber-800 font-bold">Avg: 52kg</span>
              </div>
            </div>

            {/* Goats */}
            <div
              onClick={() => onSubDeskChange('farm_livestock')}
              className="portal-card-interactive p-5 rounded-2xl cursor-pointer border-t-4 border-t-purple-600"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="text-base">🐐</span> GOATS SECTION
                </span>
                <span className="text-[10px] bg-purple-50 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                  680 Head
                </span>
              </div>
              <div className="text-2xl font-black font-mono-num text-emerald-700 mt-3">
                +14 Kids Born
              </div>
              <div className="mt-2 text-xs text-slate-500 flex justify-between">
                <span>Red Sokoto & Sahelian</span>
                <span className="text-purple-800 font-bold">580 Does</span>
              </div>
            </div>

            {/* Cattle */}
            <div
              onClick={() => onSubDeskChange('farm_livestock')}
              className="portal-card-interactive p-5 rounded-2xl cursor-pointer border-t-4 border-t-blue-600"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="text-base">🐂</span> CATTLE SECTION
                </span>
                <span className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                  260 Head
                </span>
              </div>
              <div className="text-2xl font-black font-mono-num text-slate-900 mt-3">
                140L Milk <span className="text-xs font-normal text-slate-500 font-sans">/ Day</span>
              </div>
              <div className="mt-2 text-xs text-slate-500 flex justify-between">
                <span>Bunaji Dairy & Gudali Steers</span>
                <span className="text-blue-800 font-bold font-mono">FCR: 1.85</span>
              </div>
            </div>

          </div>

          {/* SPLIT TABLE PREVIEWS: FCR / PRODUCTION YIELDS + RECENT FEEDING */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Daily Yields & FCR Radar */}
            <div className="portal-card rounded-2xl overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Yield Collection & FCR Performance</h3>
                  <p className="text-xs text-slate-500">Correlates feed consumed with production</p>
                </div>
                <button
                  onClick={() => onSubDeskChange('farm_yields')}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  View Yields Desk →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {yields.map((yd) => (
                  <div key={yd.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/80 transition-colors">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{yd.batchOrPen}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono font-bold">
                          {yd.qualityGrade}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        Feed Consumed: {yd.feedConsumedBags} Bags • {yd.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-num font-black text-slate-900 text-sm">
                        {yd.quantity} {yd.yieldType === 'EGGS_CRATES' ? 'Crates' : yd.yieldType === 'MILK_LITERS' ? 'Liters' : 'Kg Meat'}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                        FCR: {yd.calculatedFCR} (Optimal)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warehouse Feed Balances */}
            <div className="portal-card rounded-2xl overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Warehouse Inventory Balances</h3>
                  <p className="text-xs text-slate-500">Live feed and drug availability</p>
                </div>
                <button
                  onClick={() => onSubDeskChange('farm_inventory')}
                  className="text-xs font-bold text-emerald-700 hover:underline"
                >
                  View Inventory Desk →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {inventory.slice(0, 4).map((inv) => (
                  <div key={inv.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50/80 transition-colors">
                    <div>
                      <div className="font-bold text-slate-900">{inv.name}</div>
                      <div className="text-slate-500 text-[11px]">Category: {inv.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-num font-black text-slate-900">
                        {inv.currentStock} {inv.unit}
                      </div>
                      <span className={`text-[10px] font-semibold ${
                        inv.currentStock <= inv.reorderPoint ? 'text-rose-600 font-bold' : 'text-emerald-700'
                      }`}>
                        {inv.currentStock <= inv.reorderPoint ? '⚠️ Low Stock' : 'In Stock'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= DESK 2: LIVESTOCK REGISTRY ================= */}
      {subDesk === 'farm_livestock' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto text-xs">
            <span className="font-bold text-slate-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter Division:
            </span>
            {(['ALL', 'POULTRY', 'SHEEP', 'GOATS', 'CATTLE'] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => setLivestockFilter(sec)}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  livestockFilter === sec
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {sec === 'ALL' ? `All Livestock (${totalHead} Head)` : sec}
              </button>
            ))}
          </div>

          <div className="portal-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Livestock Herd & Flock Registry</h3>
                <p className="text-xs text-slate-500">Demographic cohorts, gender ratios, average weights, and locations</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {filteredLivestock.length} Batches Registered
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5 font-bold">Flock / Batch Tag</th>
                    <th className="px-5 py-3.5 font-bold">Division</th>
                    <th className="px-5 py-3.5 font-bold">Breed / Variety</th>
                    <th className="px-5 py-3.5 font-bold">Headcount</th>
                    <th className="px-5 py-3.5 font-bold">Age Cohort</th>
                    <th className="px-5 py-3.5 font-bold">Gender Ratio</th>
                    <th className="px-5 py-3.5 font-bold">Pen / Paddock</th>
                    <th className="px-5 py-3.5 font-bold">Daily Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLivestock.map((batch) => (
                    <tr key={batch.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4 font-bold text-slate-900">
                        {batch.tagOrFlock}
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {batch.section}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{batch.subType}</td>
                      <td className="px-5 py-4 font-mono-num font-black text-slate-900 text-sm">
                        {batch.headCount.toLocaleString()} Head
                      </td>
                      <td className="px-5 py-4 text-slate-700 font-medium">{batch.ageCohort || 'Active'}</td>
                      <td className="px-5 py-4 text-slate-500">{batch.genderRatio || 'Standard'}</td>
                      <td className="px-5 py-4 text-slate-600">{batch.locationPen}</td>
                      <td className="px-5 py-4 font-medium text-slate-800">
                        {batch.dailyProduction || 'Standard Growth'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= DESK 3: PRODUCTION YIELDS & FCR ANALYSIS ================= */}
      {subDesk === 'farm_yields' && (
        <div className="space-y-6">
          {/* FCR METRIC OVERVIEW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="portal-card p-5 rounded-2xl border-l-4 border-l-emerald-600">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Broiler Meat FCR</span>
              <div className="text-3xl font-black font-mono-num text-slate-900 mt-2">1.62 <span className="text-xs font-normal text-slate-500">kg feed / kg gain</span></div>
              <p className="text-xs text-emerald-700 font-medium mt-1">High conversion efficiency (Benchmark &lt; 1.8)</p>
            </div>

            <div className="portal-card p-5 rounded-2xl border-l-4 border-l-blue-600">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Layer Egg FCR</span>
              <div className="text-3xl font-black font-mono-num text-slate-900 mt-2">2.15 <span className="text-xs font-normal text-slate-500">kg feed / crate</span></div>
              <p className="text-xs text-blue-700 font-medium mt-1">Laying rate steady at 91.2% flock capacity</p>
            </div>

            <div className="portal-card p-5 rounded-2xl border-l-4 border-l-purple-600">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Sales Realized</span>
              <div className="text-3xl font-black font-mono-num text-slate-900 mt-2">₦{totalSalesRevenue.toLocaleString()}</div>
              <p className="text-xs text-purple-700 font-medium mt-1">Eggs, live festive rams, and raw dairy milk</p>
            </div>
          </div>

          {/* DAILY YIELD COLLECTION TABLE */}
          <div className="portal-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Daily Yield Collection Log</h3>
                <p className="text-xs text-slate-500">Egg counts, dairy milk production, and liveweight progression</p>
              </div>
              <button
                onClick={onOpenYieldModal}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm"
              >
                + Log Yield Batch
              </button>
            </div>

            <table className="w-full text-xs text-left text-slate-700">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5 font-bold">Date / Batch</th>
                  <th className="px-5 py-3.5 font-bold">Division</th>
                  <th className="px-5 py-3.5 font-bold">Yield Quantity</th>
                  <th className="px-5 py-3.5 font-bold">Feed Consumed</th>
                  <th className="px-5 py-3.5 font-bold">FCR Index</th>
                  <th className="px-5 py-3.5 font-bold">Quality Grade</th>
                  <th className="px-5 py-3.5 font-bold">Logged By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {yields.map((yd) => (
                  <tr key={yd.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900">{yd.batchOrPen}</div>
                      <span className="text-[10px] text-slate-400 font-mono-num">{yd.date}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold font-mono text-[10px]">
                        {yd.section}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono-num font-black text-slate-900 text-sm">
                      {yd.quantity} {yd.yieldType === 'EGGS_CRATES' ? 'Crates' : yd.yieldType === 'MILK_LITERS' ? 'Liters' : 'Kg Meat'}
                    </td>
                    <td className="px-5 py-4 font-mono-num text-slate-600">{yd.feedConsumedBags} Bags</td>
                    <td className="px-5 py-4 font-mono-num font-bold text-emerald-700">{yd.calculatedFCR}</td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                        {yd.qualityGrade}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{yd.loggedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* LIVESTOCK SALES LEDGER */}
          <div className="portal-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Direct Livestock & Produce Sales Ledger</h3>
                <p className="text-xs text-slate-500">Live animal sales, wholesale egg orders, and dairy distributions</p>
              </div>
              <button
                onClick={onOpenSaleModal}
                className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm"
              >
                + Record Livestock Sale
              </button>
            </div>

            <table className="w-full text-xs text-left text-slate-700">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5 font-bold">Sale Ref / Date</th>
                  <th className="px-5 py-3.5 font-bold">Description</th>
                  <th className="px-5 py-3.5 font-bold">Customer Name</th>
                  <th className="px-5 py-3.5 font-bold">Quantity</th>
                  <th className="px-5 py-3.5 font-bold">Unit Price</th>
                  <th className="px-5 py-3.5 font-bold">Total Amount</th>
                  <th className="px-5 py-3.5 font-bold">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-mono font-bold text-slate-900">{sale.id}</div>
                      <span className="text-[10px] text-slate-400 font-mono-num">{sale.date}</span>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-800">{sale.description}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">{sale.customerName}</td>
                    <td className="px-5 py-4 font-mono-num font-semibold text-slate-700">{sale.quantity}</td>
                    <td className="px-5 py-4 font-mono-num text-slate-600">₦{sale.unitPrice.toLocaleString()}</td>
                    <td className="px-5 py-4 font-mono-num font-black text-emerald-800 text-sm">
                      ₦{sale.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      {sale.paymentStatus === 'PAID' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Paid
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          Credit (L3 Sanction)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= DESK 4: FEEDING & STOCK OUT ================= */}
      {subDesk === 'farm_feeding' && (
        <div className="space-y-4">
          <div className="portal-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Feeding Rations Ledger & Stock Dispatches</h3>
                <p className="text-xs text-slate-500">
                  Every recorded feed dispatch is automatically subtracted from warehouse stock.
                </p>
              </div>
              <button
                onClick={onOpenFeedModal}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Feeding Entry</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5 font-bold">Timestamp / Date</th>
                    <th className="px-5 py-3.5 font-bold">Pen Location</th>
                    <th className="px-5 py-3.5 font-bold">Division</th>
                    <th className="px-5 py-3.5 font-bold">Feed Formulation</th>
                    <th className="px-5 py-3.5 font-bold">Stock Deduction</th>
                    <th className="px-5 py-3.5 font-bold">Officer</th>
                    <th className="px-5 py-3.5 font-bold text-right">Governance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {feedLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4 font-mono-num text-slate-500">{log.timestamp}</td>
                      <td className="px-5 py-4 font-bold text-slate-900">{log.penLocation}</td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold font-mono text-[10px]">
                          {log.section}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-800 font-medium">{log.feedType}</td>
                      <td className="px-5 py-4 font-mono-num font-black text-rose-600">
                        -{log.quantityBags} Bags OUT
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {log.loggedBy} ({log.userRole})
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => onDeleteRecord(log.id, 'FEED_LOG')}
                          disabled={currentRole === 'LEVEL_1'}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                            currentRole === 'LEVEL_1'
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : currentRole === 'LEVEL_2'
                              ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                              : 'bg-rose-100 hover:bg-rose-200 text-rose-900'
                          }`}
                        >
                          {currentRole === 'LEVEL_1'
                            ? 'Locked'
                            : currentRole === 'LEVEL_2'
                            ? 'Request Delete'
                            : 'Purge (L3)'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= DESK 5: VETERINARY & CLINICAL ================= */}
      {subDesk === 'farm_medical' && (
        <div className="space-y-4">
          <div className="portal-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Veterinary Care, Isolation & Mortality Audits</h3>
                <p className="text-xs text-slate-500">
                  Vaccination schedules, diagnosis records, drug withdrawal periods, and necropsy notes.
                </p>
              </div>
              <button
                onClick={onOpenMedModal}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Log Vet Incident</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5 font-bold">Date / Target Batch</th>
                    <th className="px-5 py-3.5 font-bold">Division</th>
                    <th className="px-5 py-3.5 font-bold">Clinical Event / Diagnosis</th>
                    <th className="px-5 py-3.5 font-bold">Treatment Given</th>
                    <th className="px-5 py-3.5 font-bold">Withdrawal</th>
                    <th className="px-5 py-3.5 font-bold">Mortality</th>
                    <th className="px-5 py-3.5 font-bold">Vet Doctor / Cost</th>
                    <th className="px-5 py-3.5 font-bold text-right">Governance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medicalLogs.map((med) => (
                    <tr key={med.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">{med.targetBatch}</div>
                        <span className="text-[10px] text-slate-400 font-mono-num">{med.timestamp}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold font-mono text-[10px]">
                          {med.section}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-800">{med.diagnosisOrEvent}</td>
                      <td className="px-5 py-4 text-slate-600">{med.treatment}</td>
                      <td className="px-5 py-4 font-mono-num text-slate-700 font-bold">
                        {med.withdrawalPeriodDays ? `${med.withdrawalPeriodDays} Days` : 'None'}
                      </td>
                      <td className="px-5 py-4 font-mono-num">
                        {med.mortalityCount > 0 ? (
                          <div>
                            <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">
                              {med.mortalityCount} Dead
                            </span>
                            {med.necropsyNotes && (
                              <div className="text-[10px] text-slate-500 mt-0.5">{med.necropsyNotes}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-emerald-700 font-semibold">0 Mortality</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">{med.vetName}</div>
                        <span className="text-slate-500 font-mono-num">₦{med.cost.toLocaleString()}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => onDeleteRecord(med.id, 'MED_LOG')}
                          disabled={currentRole === 'LEVEL_1'}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                            currentRole === 'LEVEL_1'
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : currentRole === 'LEVEL_2'
                              ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                              : 'bg-rose-100 hover:bg-rose-200 text-rose-900'
                          }`}
                        >
                          {currentRole === 'LEVEL_1'
                            ? 'Locked'
                            : currentRole === 'LEVEL_2'
                            ? 'Request Delete'
                            : 'Purge (L3)'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= DESK 6: WAREHOUSE INVENTORY ================= */}
      {subDesk === 'farm_inventory' && (
        <div className="space-y-4">
          <div className="portal-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Farm Warehouse Central Stock Ledger</h3>
                <p className="text-xs text-slate-500">Live balances, reorder thresholds, and unit costs</p>
              </div>
              <span className="text-xs text-slate-500">
                {inventory.length} Stock Keeping Units
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5 font-bold">Item Name / SKU</th>
                    <th className="px-5 py-3.5 font-bold">Category</th>
                    <th className="px-5 py-3.5 font-bold">Current Stock</th>
                    <th className="px-5 py-3.5 font-bold">Reorder Threshold</th>
                    <th className="px-5 py-3.5 font-bold">Unit Cost Valuation</th>
                    <th className="px-5 py-3.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.map((inv) => {
                    const isLow = inv.currentStock <= inv.reorderPoint;
                    return (
                      <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4 font-bold text-slate-900">{inv.name}</td>
                        <td className="px-5 py-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                            {inv.category}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-mono-num font-black text-slate-900 text-sm">
                          {inv.currentStock} {inv.unit}
                        </td>
                        <td className="px-5 py-4 font-mono-num text-slate-500">
                          {inv.reorderPoint} {inv.unit}
                        </td>
                        <td className="px-5 py-4 font-mono-num text-slate-700 font-semibold">
                          ₦{inv.unitCost.toLocaleString()}
                        </td>
                        <td className="px-5 py-4">
                          {isLow ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                              Low Stock Trigger
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Adequate Buffer
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
        </div>
      )}

    </div>
  );
};
