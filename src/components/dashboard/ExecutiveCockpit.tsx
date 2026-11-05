'use client';

import React from 'react';
import { UserRoleLevel, LivestockBatch, FleetVehicle, DailyRemittanceRecord, PendingApprovalItem } from '@/types';
import {
  TrendingUp,
  AlertTriangle,
  FileCheck,
  Wheat,
  Truck,
  ArrowUpRight,
  ShieldAlert,
  Coins,
  ChevronRight,
  Plus
} from 'lucide-react';

interface ExecutiveCockpitProps {
  currentRole: UserRoleLevel;
  livestock: LivestockBatch[];
  fleet: FleetVehicle[];
  remittances: DailyRemittanceRecord[];
  pendingApprovals: PendingApprovalItem[];
  onNavigateTab: (tab: string) => void;
  onOpenFeedModal: () => void;
  onOpenRemittanceModal: () => void;
}

export const ExecutiveCockpit: React.FC<ExecutiveCockpitProps> = ({
  currentRole,
  livestock,
  fleet,
  remittances,
  pendingApprovals,
  onNavigateTab,
  onOpenFeedModal,
  onOpenRemittanceModal,
}) => {
  const totalLivestockHead = livestock.reduce((acc, curr) => acc + curr.headCount, 0);
  const totalFleetMarketValue = fleet.reduce((acc, curr) => acc + curr.presentMarketValue, 0);
  const todayRemitted = remittances.reduce((acc, curr) => acc + curr.remittedAmount, 0);
  const todayTarget = remittances.reduce((acc, curr) => acc + curr.targetAmount, 0);
  const totalArrears = Math.max(0, todayTarget - todayRemitted);

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Executive Management Cockpit</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-medium">
              Consolidated P&L
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time cross-venture monitoring for NJIPP KONSULT LTD: Livestock herds, transport asset valuations, and fiscal approvals.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenFeedModal}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record Feeding</span>
          </button>
          <button
            onClick={onOpenRemittanceModal}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Log Driver Return</span>
          </button>
        </div>
      </div>

      {/* 4 HIGH IMPACT KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Livestock Total */}
        <div
          onClick={() => onNavigateTab('farm')}
          className="glass-panel p-5 rounded-2xl relative overflow-hidden border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium flex items-center gap-1.5">
              <Wheat className="w-3.5 h-3.5 text-emerald-400" />
              Livestock Population
            </span>
            <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px]">
              98.6% Healthy
            </span>
          </div>
          <div className="text-2xl font-bold font-mono-num text-white mt-2">
            {totalLivestockHead.toLocaleString()}{' '}
            <span className="text-xs text-slate-400 font-normal">Head</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex-wrap">
            <span>🐔 3,500 Poultry</span>
            <span>🐑 420 Sheep</span>
            <span>🐐 680 Goats</span>
            <span>🐂 260 Cattle</span>
          </div>
        </div>

        {/* Card 2: Fleet Market Valuation */}
        <div
          onClick={() => onNavigateTab('transport')}
          className="glass-panel p-5 rounded-2xl relative overflow-hidden border border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-400" />
              Fleet Market Value
            </span>
            <span className="text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full text-[10px]">
              38 Assets Tracked
            </span>
          </div>
          <div className="text-2xl font-bold font-mono-num text-white mt-2">
            ₦{totalFleetMarketValue.toLocaleString()}
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span>18 Bikes (₦14.4M)</span>
            <span>8 Buses (₦41.6M)</span>
            <span>12 Trikes (₦12.4M)</span>
          </div>
        </div>

        {/* Card 3: Fleet Daily Remittances */}
        <div
          onClick={() => onNavigateTab('transport')}
          className="glass-panel p-5 rounded-2xl relative overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              Today Remittances
            </span>
            <span className="text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full text-[10px]">
              {Math.round((todayRemitted / (todayTarget || 1)) * 100)}% Target
            </span>
          </div>
          <div className="text-2xl font-bold font-mono-num text-emerald-400 mt-2">
            ₦{todayRemitted.toLocaleString()}{' '}
            <span className="text-xs text-slate-400 font-normal font-sans">
              / ₦{todayTarget.toLocaleString()}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span className="text-amber-400 font-medium">
              ⚠️ ₦{totalArrears.toLocaleString()} Arrears Pending
            </span>
            <span className="text-slate-400">Cash & Transfer</span>
          </div>
        </div>

        {/* Card 4: Governance & Approval Gate */}
        <div
          onClick={() => onNavigateTab('approvals')}
          className="glass-panel p-5 rounded-2xl relative overflow-hidden border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
              Governance & Debt Gate
            </span>
            <span className="text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-full text-[10px]">
              Level 3 Gate
            </span>
          </div>
          <div className="text-2xl font-bold font-mono-num text-white mt-2">
            {pendingApprovals.length} Pending
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span className="text-slate-300">2 Purchase Orders</span>
            <span className="text-rose-400 font-semibold">1 Debt Request</span>
          </div>
        </div>
      </div>

      {/* DUAL STREAM PANELS: INTEGRATED FARM + FLEET RADAR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Farm Operations Summary */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Integrated Farm: Daily Production & Feeding
              </h3>
              <p className="text-xs text-slate-400">
                Poultry, Sheep, Goats & Cattle biological updates
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('farm')}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              <span>Explore Farm</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {livestock.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span>{item.tagOrFlock}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono">
                      {item.section}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    {item.locationPen} • {item.subType}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono-num text-emerald-400 font-bold">
                    {item.headCount.toLocaleString()} Head
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {item.dailyProduction || 'Nominal Vitals'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Transport Returns Radar */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Transport Fleet: Remittances & Market Valuation
              </h3>
              <p className="text-xs text-slate-400">
                Motorcycles, Commercial Buses & Tricycles
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('transport')}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
            >
              <span>Manage Fleet</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {fleet.map((veh) => (
              <div
                key={veh.id}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 text-lg">
                    {veh.type === 'MOTORCYCLE' ? '🏍️' : veh.type === 'BUS' ? '🚌' : '🛺'}
                  </div>
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span>{veh.plateNumber}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {veh.type}
                      </span>
                    </div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      Driver: {veh.driver.fullName} • Market Value: ₦{veh.presentMarketValue.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono-num text-white font-bold">
                    ₦{veh.dailyTargetAmount.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    Target Set
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
