'use client';

import React, { useState } from 'react';
import {
  UserRoleLevel,
  LivestockBatch,
  FarmFeedingRecord,
  FarmMedicalRecord,
  InventoryItem,
  LivestockSection
} from '@/types';
import {
  Wheat,
  Activity,
  Package,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Stethoscope,
  Filter
} from 'lucide-react';

interface FarmManagementProps {
  currentRole: UserRoleLevel;
  livestock: LivestockBatch[];
  feedLogs: FarmFeedingRecord[];
  medicalLogs: FarmMedicalRecord[];
  inventory: InventoryItem[];
  onOpenFeedModal: () => void;
  onOpenMedModal: () => void;
  onDeleteRecord: (recordId: string, recordType: string) => void;
}

export const FarmManagement: React.FC<FarmManagementProps> = ({
  currentRole,
  livestock,
  feedLogs,
  medicalLogs,
  inventory,
  onOpenFeedModal,
  onOpenMedModal,
  onDeleteRecord,
}) => {
  const [activeFilter, setActiveFilter] = useState<LivestockSection | 'ALL'>('ALL');
  const [activeSubTab, setActiveSubTab] = useState<'FEEDING' | 'MEDICAL' | 'INVENTORY'>('FEEDING');

  const filteredLivestock = activeFilter === 'ALL'
    ? livestock
    : livestock.filter((item) => item.section === activeFilter);

  return (
    <div className="space-y-6">
      {/* HEADER & QUICK ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Integrated Farm Operations</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-medium">
              4 Livestock Divisions
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Poultry, Sheep, Goats & Cattle biological logs, feeding rations coupled to stock deductions, and veterinary records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenFeedModal}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record Feed Log</span>
          </button>
          <button
            onClick={onOpenMedModal}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all"
          >
            <Stethoscope className="w-4 h-4 text-emerald-400" />
            <span>Log Vet Record</span>
          </button>
        </div>
      </div>

      {/* 4 LIVESTOCK SECTION SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Poultry */}
        <div
          onClick={() => setActiveFilter(activeFilter === 'POULTRY' ? 'ALL' : 'POULTRY')}
          className={`glass-panel p-4 rounded-xl border-l-4 border-emerald-500 cursor-pointer transition-all ${
            activeFilter === 'POULTRY' ? 'ring-2 ring-emerald-500 bg-slate-800/80' : 'hover:bg-slate-800/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <span>🐔</span> POULTRY
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
              3,500 Birds
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">Layers & Broilers</div>
          <div className="text-sm font-bold font-mono-num text-white mt-1">
            68 Crates / Day
          </div>
        </div>

        {/* Sheep */}
        <div
          onClick={() => setActiveFilter(activeFilter === 'SHEEP' ? 'ALL' : 'SHEEP')}
          className={`glass-panel p-4 rounded-xl border-l-4 border-amber-500 cursor-pointer transition-all ${
            activeFilter === 'SHEEP' ? 'ring-2 ring-amber-500 bg-slate-800/80' : 'hover:bg-slate-800/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <span>🐑</span> SHEEP
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">
              420 Head
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">Balami & Uda Cross</div>
          <div className="text-sm font-bold font-mono-num text-white mt-1">
            Paddock 1
          </div>
        </div>

        {/* Goats */}
        <div
          onClick={() => setActiveFilter(activeFilter === 'GOATS' ? 'ALL' : 'GOATS')}
          className={`glass-panel p-4 rounded-xl border-l-4 border-purple-500 cursor-pointer transition-all ${
            activeFilter === 'GOATS' ? 'ring-2 ring-purple-500 bg-slate-800/80' : 'hover:bg-slate-800/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <span>🐐</span> GOATS
            </span>
            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-mono">
              680 Head
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">Red Sokoto Herd</div>
          <div className="text-sm font-bold font-mono-num text-white mt-1">
            +14 Kids Born
          </div>
        </div>

        {/* Cattle */}
        <div
          onClick={() => setActiveFilter(activeFilter === 'CATTLE' ? 'ALL' : 'CATTLE')}
          className={`glass-panel p-4 rounded-xl border-l-4 border-blue-500 cursor-pointer transition-all ${
            activeFilter === 'CATTLE' ? 'ring-2 ring-blue-500 bg-slate-800/80' : 'hover:bg-slate-800/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <span>🐂</span> CATTLE
            </span>
            <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono">
              260 Head
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">Bunaji Dairy & Gudali</div>
          <div className="text-sm font-bold font-mono-num text-white mt-1">
            140L Milk / Day
          </div>
        </div>
      </div>

      {/* FILTER INDICATOR */}
      {activeFilter !== 'ALL' && (
        <div className="flex items-center justify-between bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs">
          <span className="text-slate-300">
            Filtered by section: <strong className="text-emerald-400">{activeFilter}</strong>
          </span>
          <button
            onClick={() => setActiveFilter('ALL')}
            className="text-xs text-slate-400 hover:text-white underline"
          >
            Clear Filter (Show All)
          </button>
        </div>
      )}

      {/* SUB-TABS: FEEDING RECORDS | MEDICAL RECORDS | INVENTORY STOCK */}
      <div className="border-b border-slate-800 flex items-center gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('FEEDING')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeSubTab === 'FEEDING'
              ? 'text-emerald-400 border-b-2 border-emerald-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wheat className="w-4 h-4" />
          <span>Daily Feeding & Inventory Logs ({feedLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('MEDICAL')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeSubTab === 'MEDICAL'
              ? 'text-emerald-400 border-b-2 border-emerald-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Veterinary & Medical History ({medicalLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('INVENTORY')}
          className={`pb-3 transition-colors flex items-center gap-2 ${
            activeSubTab === 'INVENTORY'
              ? 'text-emerald-400 border-b-2 border-emerald-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Warehouse Stock Ledger ({inventory.length} SKUs)</span>
        </button>
      </div>

      {/* SUB-TAB CONTENT 1: FEEDING RECORDS */}
      {activeSubTab === 'FEEDING' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div>
              <h3 className="text-sm font-bold text-white">Daily Feeding Rations & Deductions</h3>
              <p className="text-xs text-slate-400">
                Every logged ration is automatically subtracted from warehouse stock.
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Auto-Stock Sync Enabled
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Timestamp / Pen</th>
                  <th className="px-4 py-3">Section</th>
                  <th className="px-4 py-3">Feed Formulation</th>
                  <th className="px-4 py-3">Stock Impact</th>
                  <th className="px-4 py-3">Logged By</th>
                  <th className="px-4 py-3 text-right">Governance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {feedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium text-white">
                      <div>{log.penLocation}</div>
                      <span className="text-[10px] text-slate-500 font-mono-num">{log.timestamp}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px]">
                        {log.section}
                      </span>
                    </td>
                    <td className="px-4 py-3">{log.feedType}</td>
                    <td className="px-4 py-3 font-mono-num text-rose-400 font-semibold">
                      -{log.quantityBags} Bags OUT
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {log.loggedBy} ({log.userRole})
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onDeleteRecord(log.id, 'FEED_LOG')}
                        disabled={currentRole === 'LEVEL_1'}
                        title={
                          currentRole === 'LEVEL_1'
                            ? 'Level 1 Entry accounts cannot delete records'
                            : currentRole === 'LEVEL_2'
                            ? 'Request Level 3 quarantine approval'
                            : 'Permanent purge (Level 3)'
                        }
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                          currentRole === 'LEVEL_1'
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            : currentRole === 'LEVEL_2'
                            ? 'bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-white'
                            : 'bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white'
                        }`}
                      >
                        {currentRole === 'LEVEL_1'
                          ? 'Delete Locked'
                          : currentRole === 'LEVEL_2'
                          ? 'Request Delete'
                          : 'Delete (L3)'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB CONTENT 2: MEDICAL RECORDS */}
      {activeSubTab === 'MEDICAL' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div>
              <h3 className="text-sm font-bold text-white">Veterinary Care, Vaccines & Mortality Audits</h3>
              <p className="text-xs text-slate-400">
                Official clinical logs signed off by certified veterinary personnel.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Date / Batch</th>
                  <th className="px-4 py-3">Section</th>
                  <th className="px-4 py-3">Event / Diagnosis</th>
                  <th className="px-4 py-3">Treatment Given</th>
                  <th className="px-4 py-3">Mortality</th>
                  <th className="px-4 py-3">Vet Doctor / Cost</th>
                  <th className="px-4 py-3 text-right">Governance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {medicalLogs.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium text-white">
                      <div>{med.targetBatch}</div>
                      <span className="text-[10px] text-slate-500 font-mono-num">{med.timestamp}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[11px]">
                        {med.section}
                      </span>
                    </td>
                    <td className="px-4 py-3">{med.diagnosisOrEvent}</td>
                    <td className="px-4 py-3 text-slate-300">{med.treatment}</td>
                    <td className="px-4 py-3 font-mono-num">
                      {med.mortalityCount > 0 ? (
                        <span className="text-rose-400 font-bold">{med.mortalityCount} Dead</span>
                      ) : (
                        <span className="text-emerald-400">0 Mortality</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-white font-medium">{med.vetName}</div>
                      <div className="text-slate-500 font-mono-num">₦{med.cost.toLocaleString()}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onDeleteRecord(med.id, 'MED_LOG')}
                        disabled={currentRole === 'LEVEL_1'}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                          currentRole === 'LEVEL_1'
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            : currentRole === 'LEVEL_2'
                            ? 'bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-white'
                            : 'bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white'
                        }`}
                      >
                        {currentRole === 'LEVEL_1'
                          ? 'Delete Locked'
                          : currentRole === 'LEVEL_2'
                          ? 'Request Delete'
                          : 'Delete (L3)'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB CONTENT 3: INVENTORY */}
      {activeSubTab === 'INVENTORY' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div>
              <h3 className="text-sm font-bold text-white">Central Warehouse Inventory Status</h3>
              <p className="text-xs text-slate-400">
                Live balances, reorder threshold triggers, and unit cost valuations.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Item / SKU</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Current Stock</th>
                  <th className="px-4 py-3">Reorder Point</th>
                  <th className="px-4 py-3">Unit Valuation</th>
                  <th className="px-4 py-3">Inventory Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {inventory.map((inv) => {
                  const isLow = inv.currentStock <= inv.reorderPoint;
                  return (
                    <tr key={inv.id} className="hover:bg-slate-800/30">
                      <td className="px-4 py-3 font-medium text-white">{inv.name}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                          {inv.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono-num font-bold text-white">
                        {inv.currentStock} {inv.unit}
                      </td>
                      <td className="px-4 py-3 font-mono-num text-slate-400">
                        {inv.reorderPoint} {inv.unit}
                      </td>
                      <td className="px-4 py-3 font-mono-num text-slate-200">
                        ₦{inv.unitCost.toLocaleString()} / {inv.unit}
                      </td>
                      <td className="px-4 py-3">
                        {isLow ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-semibold">
                            ⚠️ Low Stock Trigger
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                            Sufficient
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
      )}
    </div>
  );
};
