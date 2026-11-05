'use client';

import React from 'react';
import {
  Wheat,
  Truck,
  Plus,
  Coins,
  Fuel,
  BarChart3,
  Stethoscope,
  CheckCircle2,
  Clock,
  ShieldCheck,
  DollarSign,
  ClipboardCheck,
  FilePlus2,
  Sparkles,
  ArrowRight,
  Layers,
  Activity
} from 'lucide-react';
import {
  LivestockBatch,
  LivestockSection,
  AnimalProductionLedgerRow,
  FarmFeedingRecord,
  ProductionYieldRecord,
  LivestockSalesRecord,
  FarmMedicalRecord,
  DailyRemittanceRecord,
  FuelAndMaintenanceRecord
} from '@/types';

interface Level1TerminalProps {
  onOpenFeedDrawer: (section?: LivestockSection) => void;
  onOpenYieldDrawer: () => void;
  onOpenRemittanceDrawer: () => void;
  onOpenFuelDrawer: () => void;
  onOpenMedDrawer: (section?: LivestockSection) => void;
  onOpenSaleDrawer?: (section?: LivestockSection) => void;
  onOpenRegisterDrawer?: (section?: LivestockSection) => void;
  ledgerRows?: AnimalProductionLedgerRow[];
  livestock?: LivestockBatch[];
  feedLogs?: FarmFeedingRecord[];
  yields?: ProductionYieldRecord[];
  medicalLogs?: FarmMedicalRecord[];
  sales?: LivestockSalesRecord[];
  remittances?: DailyRemittanceRecord[];
  fuelLogs?: FuelAndMaintenanceRecord[];
  recentLogsCount: number;
}

export const Level1FieldTerminal: React.FC<Level1TerminalProps> = ({
  onOpenFeedDrawer,
  onOpenYieldDrawer,
  onOpenRemittanceDrawer,
  onOpenFuelDrawer,
  onOpenMedDrawer,
  onOpenSaleDrawer,
  onOpenRegisterDrawer,
  ledgerRows = [],
  livestock = [],
  feedLogs = [],
  yields = [],
  medicalLogs = [],
  sales = [],
  remittances = [],
  fuelLogs = [],
  recentLogsCount,
}) => {
  // Aggregate live counts and casualties for the 6 official units
  const unitConfigs = [
    {
      code: 'A' as const,
      name: 'A. Cattle Unit',
      section: 'CATTLE',
      colorBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      accentBorder: 'hover:border-emerald-400',
      bgHover: 'hover:bg-emerald-50/40',
      description: 'Local Cattle, Bokolo & Sokoto Gudali (Fattening & Breeding)',
    },
    {
      code: 'B' as const,
      name: 'B. Rams Unit (Sheep)',
      section: 'RAMS',
      colorBadge: 'bg-blue-50 text-blue-800 border-blue-200',
      accentBorder: 'hover:border-blue-400',
      bgHover: 'hover:bg-blue-50/40',
      description: 'Sudanese, Balami, Local & Uda Rams (Fattening & Reproduction)',
    },
    {
      code: 'C' as const,
      name: 'C. Goats Unit',
      section: 'GOATS',
      colorBadge: 'bg-amber-50 text-amber-800 border-amber-200',
      accentBorder: 'hover:border-amber-400',
      bgHover: 'hover:bg-amber-50/40',
      description: 'Local Goats (Reproduction & Fattening)',
    },
    {
      code: 'D' as const,
      name: 'D. Rabbits Unit',
      section: 'RABBITS',
      colorBadge: 'bg-purple-50 text-purple-800 border-purple-200',
      accentBorder: 'hover:border-purple-400',
      bgHover: 'hover:bg-purple-50/40',
      description: 'New Zealand Rabbits & Local Breeds (Breeding & Fattening)',
    },
    {
      code: 'E' as const,
      name: 'E. Poultry Unit (Chickens)',
      section: 'POULTRY',
      colorBadge: 'bg-rose-50 text-rose-800 border-rose-200',
      accentBorder: 'hover:border-rose-400',
      bgHover: 'hover:bg-rose-50/40',
      description: 'Layers, Broilers, Brama Breeds, Nuwelas, Cocks & Local Chickens',
    },
    {
      code: 'F' as const,
      name: 'F. Waterfowl Unit (Ducks & Geese)',
      section: 'WATERFOWL',
      colorBadge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      accentBorder: 'hover:border-cyan-400',
      bgHover: 'hover:bg-cyan-50/40',
      description: 'Local Water Ducks & Geese (Giggs) & Other Breeds',
    },
  ];

  const unitSummaries = unitConfigs.map((u) => {
    const rows = ledgerRows.filter((r) => r.unitCode === u.code);
    const liveCount = rows.reduce((acc, r) => acc + (r.liveCount || 0), 0);
    const casualties = rows.reduce((acc, r) => acc + (r.casualties || 0), 0);
    return {
      ...u,
      liveCount,
      casualties,
      productCount: rows.length,
    };
  });

  const totalLiveAnimals = unitSummaries.reduce((acc, u) => acc + u.liveCount, 0);
  const totalCasualties = unitSummaries.reduce((acc, u) => acc + u.casualties, 0);

  // Compile recent shift activity
  const recentActivities: Array<{ id: string; title: string; detail: string; time: string; badge: string }> = [
    ...sales.slice(0, 3).map((s) => ({
      id: s.id,
      title: 'Farm Sale',
      detail: `₦${s.totalAmount.toLocaleString()} • ${s.description} (${s.customerName})`,
      time: s.date,
      badge: 'SALE',
    })),
    ...remittances.slice(0, 2).map((r) => ({
      id: r.id,
      title: 'Driver Remittance',
      detail: `₦${r.remittedAmount.toLocaleString()} from ${r.driverName} (${r.plateNumber})`,
      time: r.timestamp,
      badge: 'CASH',
    })),
    ...fuelLogs.slice(0, 2).map((fl) => ({
      id: fl.id,
      title: fl.recordType === 'FUEL' ? 'Fuel Purchase' : 'Vehicle Repair',
      detail: `₦${fl.costTotal.toLocaleString()} • ${fl.vehiclePlate} (${fl.vendorName})`,
      time: fl.timestamp,
      badge: fl.recordType,
    })),
  ].slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-2">
      
      {/* 1. WELCOME BANNER (SIMPLE, HIGH CONTRAST & CLEAR) */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-xs">
              Primary Data Entry Terminal
            </span>
            <span className="text-xs text-blue-100 font-medium">• Musa Bello (Field Staff)</span>
            <span className="text-xs text-blue-200 bg-blue-900/50 px-2 py-0.5 rounded-full border border-blue-400/30">
              Active Shift
            </span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Daily Field Punch-In Station
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl font-medium leading-relaxed mt-1">
              Field staff enter all daily recordings here — feeding, egg/milk collection, casualties, vehicle fuel, driver cash, and new animal intakes. All records automatically update the supervisor radar and official ledger.
            </p>
          </div>

          {/* Quick Metrics Header Strip */}
          <div className="pt-2 flex items-center gap-4 sm:gap-6 text-xs flex-wrap border-t border-white/15">
            <div>
              <span className="text-blue-200 block text-[10px] uppercase font-bold tracking-wider">Live Animal Stock</span>
              <span className="text-lg font-black font-mono text-white">{totalLiveAnimals.toLocaleString()} Head</span>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div>
              <span className="text-blue-200 block text-[10px] uppercase font-bold tracking-wider">Recorded Casualties</span>
              <span className="text-lg font-black font-mono text-rose-200">{totalCasualties} Casualties</span>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div>
              <span className="text-blue-200 block text-[10px] uppercase font-bold tracking-wider">Shift Entries Today</span>
              <span className="text-lg font-black font-mono text-emerald-300">{recentLogsCount} Punches</span>
            </div>
          </div>
        </div>

        <div className="absolute right-6 bottom-2 opacity-10 text-9xl pointer-events-none font-black select-none text-white">
          L1
        </div>
      </div>

      {/* 2. THE 6 OFFICIAL ANIMAL PRODUCTION UNITS (EXCEL INVENTORY OVERVIEW) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1 flex-wrap gap-2">
          <div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Animal Production Units (Official Registry)</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Live headcount and casualties across all 6 production sectors. Use quick buttons to record feed, health, or new animal intake.
            </p>
          </div>
          {onOpenRegisterDrawer && (
            <button
              onClick={() => onOpenRegisterDrawer()}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Register New Intake</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {unitSummaries.map((unit) => (
            <div
              key={unit.code}
              className={`bg-white rounded-3xl p-5 border border-slate-200/90 ${unit.accentBorder} ${unit.bgHover} transition-all duration-200 shadow-xs flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${unit.colorBadge}`}>
                    Unit {unit.code}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    {unit.productCount} Product Lines
                  </span>
                </div>

                <div>
                  <h3 className="font-black text-base text-slate-900">
                    {unit.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {unit.description}
                  </p>
                </div>

                {/* Headcount & Casualties telemetry */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Live Count</span>
                    <span className="text-base font-black font-mono text-slate-900">
                      {unit.liveCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Casualties</span>
                    <span className={`text-base font-black font-mono ${unit.casualties > 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                      {unit.casualties} Head
                    </span>
                  </div>
                </div>
              </div>

              {/* Unit Quick Actions: Register Intake, Record Feeding, Sick Animals & Deaths */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                {onOpenRegisterDrawer && (
                  <button
                    type="button"
                    onClick={() => onOpenRegisterDrawer(unit.section as LivestockSection)}
                    className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                    title={`Register new intake of ${unit.name}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Register Intake</span>
                  </button>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenFeedDrawer(unit.section as LivestockSection)}
                    className="py-2 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-[11px] font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                    title={`Record animal feeding for ${unit.name}`}
                  >
                    <Wheat className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Feed Animals</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenMedDrawer(unit.section as LivestockSection)}
                    className="py-2 px-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-[11px] font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                    title={`Record sick animals, medicines or deaths for ${unit.name}`}
                  >
                    <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
                    <span>Sick & Deaths</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PRIMARY ACTION PUNCH-IN CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-700" />
            <span>Tap an Action to Punch Today's Record</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">4 daily punch cards active</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* 1. Register / Intake New Animals */}
          {onOpenRegisterDrawer && (
            <button
              onClick={() => onOpenRegisterDrawer()}
              className="bg-white hover:bg-indigo-50/60 p-6 rounded-3xl border border-slate-200/90 hover:border-indigo-300 text-left transition-all duration-200 shadow-xs hover:shadow-md group flex flex-col justify-between space-y-4 cursor-pointer"
            >
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FilePlus2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-900">
                      Register Animals
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      New Intake
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Add new Cattle, Rams, Goats, Rabbits, Poultry, or Waterfowl with breed presets & costs.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-indigo-700">
                <span>Flock Registry</span>
                <span className="group-hover:translate-x-1 transition-transform">Start Intake →</span>
              </div>
            </button>
          )}

          {/* 2. Sell Farm Goods */}
          <button
            onClick={() => (onOpenSaleDrawer ? onOpenSaleDrawer() : onOpenYieldDrawer())}
            className="bg-white hover:bg-emerald-50/60 p-6 rounded-3xl border border-slate-200/90 hover:border-emerald-300 text-left transition-all duration-200 shadow-xs hover:shadow-md group flex flex-col justify-between space-y-4 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-900">
                  Sell Farm Products
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Record sales of live animals, dressed birds, fresh milk, or eggs to customers.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-emerald-700">
              <span>Direct Sales</span>
              <span className="group-hover:translate-x-1 transition-transform">Start →</span>
            </div>
          </button>

          {/* 3. Driver Daily Cash Returns */}
          <button
            onClick={onOpenRemittanceDrawer}
            className="bg-white hover:bg-amber-50/60 p-6 rounded-3xl border border-slate-200/90 hover:border-amber-300 text-left transition-all duration-200 shadow-xs hover:shadow-md group flex flex-col justify-between space-y-4 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-900">
                  Driver Cash Returns
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Enter daily cash brought by motorcycle, bus, or tricycle drivers against their target.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-amber-700">
              <span>Transport Cashier</span>
              <span className="group-hover:translate-x-1 transition-transform">Start →</span>
            </div>
          </button>

          {/* 4. Fuel & Vehicle Repairs */}
          <button
            onClick={onOpenFuelDrawer}
            className="bg-white hover:bg-cyan-50/60 p-6 rounded-3xl border border-slate-200/90 hover:border-cyan-300 text-left transition-all duration-200 shadow-xs hover:shadow-md group flex flex-col justify-between space-y-4 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Fuel className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-cyan-900">
                  Fuel & Vehicle Repairs
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Record petrol/diesel bought, odometer mileage, or mechanic workshop maintenance bills.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold text-cyan-700">
              <span>Fleet Telematics</span>
              <span className="group-hover:translate-x-1 transition-transform">Start →</span>
            </div>
          </button>

        </div>
      </div>

      {/* 4. RECENT SHIFT ACTIVITY LOG */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-slate-600" />
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">
              My Shift Activity Log
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Auto-sent to Supervisor Desk</span>
        </div>

        {recentActivities.length > 0 ? (
          <div className="space-y-2">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-md font-mono font-bold text-[10px] bg-slate-200 text-slate-700">
                    {act.badge}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900">{act.title}: </span>
                    <span className="text-slate-600">{act.detail}</span>
                  </div>
                </div>
                <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            No entries recorded yet on this shift. Tap any action card above to punch your first record.
          </div>
        )}
      </div>

      {/* 5. SHIFT STATUS FOOTER */}
      <div className="bg-slate-100/90 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600 border border-slate-200">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-slate-500 shrink-0" />
          <div>
            <span className="font-bold text-slate-800">Field Punch Station: Ready for Entries</span>
            <span className="block text-[11px] text-slate-500 mt-0.5">
              Entries are immediately stamped, stock deducted, and verified on Supervisor & Executive consoles.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="px-3 py-1.5 bg-white rounded-xl border border-slate-200 font-bold text-slate-800 text-xs">
            {recentLogsCount} Total Punches
          </span>
          <span className="text-emerald-700 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Station Active
          </span>
        </div>
      </div>

    </div>
  );
};
