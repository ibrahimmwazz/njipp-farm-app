'use client';

import React from 'react';
import {
  Truck,
  Fuel,
  Wrench,
  DollarSign,
  Users,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Layers,
  AlertCircle,
  Plus,
  Download
} from 'lucide-react';
import { VehicleCategoryLedgerRow, VehicleType } from '@/types';

interface TransportUnitsDashboardProps {
  vehicleRows: VehicleCategoryLedgerRow[];
  onOpenRemittanceDrawer?: () => void;
  onOpenFuelDrawer?: () => void;
  onSelectCategory?: (category: VehicleType) => void;
}

export const TransportUnitsDashboard: React.FC<TransportUnitsDashboardProps> = ({
  vehicleRows,
  onOpenRemittanceDrawer,
  onOpenFuelDrawer,
}) => {
  // Aggregate Grand Totals across all vehicles
  const totalCount = vehicleRows.reduce((a, b) => a + (b.currentCount || 0), 0);
  const totalInRepair = vehicleRows.reduce((a, b) => a + (b.inRepair || 0), 0);
  const totalFuelTransit = vehicleRows.reduce((a, b) => a + (b.fuelTransitCost || 0), 0);
  const totalMaintenance = vehicleRows.reduce((a, b) => a + (b.maintenanceCost || 0), 0);
  const totalSalaries = vehicleRows.reduce((a, b) => a + (b.driverSalary || 0), 0);
  const totalOther = vehicleRows.reduce((a, b) => a + (b.otherExpenses || 0), 0);
  const totalExpenses = vehicleRows.reduce((a, b) => a + (b.totalExpenses || 0), 0);
  const totalRevenue = vehicleRows.reduce((a, b) => a + (b.dailyWeeklyIncome || 0), 0);
  const netProfitLoss = totalRevenue - totalExpenses;
  const avgCostPerAsset =
    totalCount > 0
      ? Math.round(
          vehicleRows.reduce((a, b) => a + b.costPerAsset * b.currentCount, 0) / totalCount
        )
      : 0;

  // Category visual configurations
  const categoryMeta: Record<
    VehicleType,
    { color: string; borderAccent: string; badgeBg: string }
  > = {
    BUS: {
      color: 'blue',
      borderAccent: 'border-blue-200 hover:border-blue-400',
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    TRIKE: {
      color: 'amber',
      borderAccent: 'border-amber-200 hover:border-amber-400',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    MOTORCYCLE: {
      color: 'emerald',
      borderAccent: 'border-emerald-200 hover:border-emerald-400',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
  };

  const handleExportFleetCSV = () => {
    const headers = [
      'Category Code',
      'Category Name',
      'Current Count',
      'In Repair',
      'Cost per Asset (NGN)',
      'Fuel Transit Cost (NGN)',
      'Maintenance Cost (NGN)',
      'Driver Salary (NGN)',
      'Other Expenses (NGN)',
      'Total Expenses (NGN)',
      'Total Income / Revenue (NGN)',
      'Net Profit / Loss (NGN)'
    ];

    const rowsData = vehicleRows.map((r) => [
      `"${r.category}"`,
      `"${r.categoryName}"`,
      r.currentCount,
      r.inRepair,
      r.costPerAsset,
      r.fuelTransitCost,
      r.maintenanceCost,
      r.driverSalary,
      r.otherExpenses,
      r.totalExpenses,
      r.dailyWeeklyIncome,
      r.netProfitLoss
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rowsData.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NJIPP_Fleet_Financial_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* ============================================================ */}
      {/* 1. TOTAL EXECUTIVE TRANSPORT & FLEET DASHBOARD (ROLL-UP)     */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-slate-800">
        <div className="relative z-10 space-y-6">
          
          {/* Header Title & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Fleet Financial Roll-Up
                </span>
                <span className="text-xs text-slate-300">• Transport Operations P&L</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                Total Vehicle & Fleet Performance Dashboard
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Executive aggregation across Commercial Buses, Tricycles, and Dispatch Motorcycles.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleExportFleetCSV}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-white/20 shadow-xs cursor-pointer"
                title="Download transport & fleet financial ledger spreadsheet (.csv)"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Export Fleet (CSV)</span>
              </button>

              {onOpenRemittanceDrawer && (
                <button
                  type="button"
                  onClick={onOpenRemittanceDrawer}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Record Driver Return</span>
                </button>
              )}
              {onOpenFuelDrawer && (
                <button
                  type="button"
                  onClick={onOpenFuelDrawer}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  <Fuel className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Fuel / Maintenance</span>
                </button>
              )}
            </div>
          </div>

          {/* Core Key Figures */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* 1. Fleet Vehicle Count */}
            <div className="bg-white/5 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/10">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Fleet Count
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                {totalCount} <span className="text-sm font-sans font-normal text-slate-400">Vehicles</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-[10px] ${
                  totalInRepair > 0
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {totalInRepair} In Repair
                </span>
                <span className="text-[11px] text-slate-400">Workshop</span>
              </div>
            </div>

            {/* 2. Total Expenses */}
            <div className="bg-white/5 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/10">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Expenses
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300 mt-1">
                ₦{(totalExpenses / 1000000).toFixed(2)}M
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                ₦{totalExpenses.toLocaleString()} Total Outflow
              </p>
            </div>

            {/* 3. Total Income / Revenue */}
            <div className="bg-white/5 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/10">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Income / Revenue
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 mt-1">
                ₦{(totalRevenue / 1000000).toFixed(2)}M
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                ₦{totalRevenue.toLocaleString()} Daily & Weekly Returns
              </p>
            </div>

            {/* 4. Net Profit / Loss */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${
              netProfitLoss >= 0 ? 'bg-emerald-950/40 border-emerald-500/30' : 'bg-rose-950/40 border-rose-500/30'
            }`}>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Net Profit / Loss
              </span>
              <div className={`text-2xl sm:text-3xl font-black font-mono mt-1 ${
                netProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {netProfitLoss >= 0 ? '+' : '-'}₦{(Math.abs(netProfitLoss) / 1000000).toFixed(2)}M
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                  netProfitLoss >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {netProfitLoss >= 0 ? 'PROFITABLE FLEET' : 'NET DEFICIT'}
                </span>
              </div>
            </div>

          </div>

          {/* Operational Cost Breakdown Strip */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Fleet Operational Cost Breakdown:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Fuel className="w-3.5 h-3.5 text-cyan-400" /> Fuel Transit Cost
                </span>
                <span className="font-mono font-bold text-sm text-white block">
                  ₦{totalFuelTransit.toLocaleString()}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-indigo-400" /> Maintenance Cost
                </span>
                <span className="font-mono font-bold text-sm text-white block">
                  ₦{totalMaintenance.toLocaleString()}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-400" /> Driver Salaries
                </span>
                <span className="font-mono font-bold text-sm text-white block">
                  ₦{totalSalaries.toLocaleString()}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Other Expenses
                </span>
                <span className="font-mono font-bold text-sm text-white block">
                  ₦{totalOther.toLocaleString()}
                </span>
              </div>
              <div className="space-y-0.5 bg-white/5 p-2 rounded-xl">
                <span className="text-[10px] text-slate-300 font-bold uppercase block">
                  Avg Cost per Asset
                </span>
                <span className="font-mono font-black text-sm text-emerald-300 block">
                  ₦{avgCostPerAsset.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. THE 3 INDIVIDUAL VEHICLE CATEGORY CARDS                  */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-700" />
              <span>Vehicle Category Breakdown (P&L & Financial Metrics)</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Every category includes Current Count, In Repair, Cost per Asset, Fuel, Maintenance, Salaries, Revenue, and Net Profit/Loss.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">3 Vehicle Categories</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicleRows.map((cat) => {
            const meta = categoryMeta[cat.category] || categoryMeta.BUS;
            const handleExportFleetCSV = () => {
    const headers = [
      'Category Code',
      'Category Name',
      'Current Count',
      'In Repair',
      'Cost per Asset (NGN)',
      'Fuel Transit Cost (NGN)',
      'Maintenance Cost (NGN)',
      'Driver Salary (NGN)',
      'Other Expenses (NGN)',
      'Total Expenses (NGN)',
      'Total Income / Revenue (NGN)',
      'Net Profit / Loss (NGN)'
    ];

    const rowsData = vehicleRows.map((r) => [
      `"${r.category}"`,
      `"${r.categoryName}"`,
      r.currentCount,
      r.inRepair,
      r.costPerAsset,
      r.fuelTransitCost,
      r.maintenanceCost,
      r.driverSalary,
      r.otherExpenses,
      r.totalExpenses,
      r.dailyWeeklyIncome,
      r.netProfitLoss
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rowsData.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NJIPP_Fleet_Financial_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
              <div
                key={cat.id}
                className={`bg-white rounded-3xl p-6 border ${meta.borderAccent} shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5`}
              >
                {/* Header: Title, Icon & Active/Repair counts */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${meta.badgeBg}`}>
                      {cat.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                      <span className="font-bold text-slate-800">{cat.currentCount} Active</span>
                      <span>•</span>
                      <span className={cat.inRepair > 0 ? 'text-amber-600 font-bold' : 'text-slate-400'}>
                        {cat.inRepair} In Repair
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{cat.icon}</span>
                    <div>
                      <h4 className="font-black text-base text-slate-900 leading-tight">
                        {cat.categoryName}
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        Asset Valuation: ₦{(cat.costPerAsset * cat.currentCount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* The 10 Metrics Specified by User */}
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-1.5 border-b border-slate-200 flex justify-between items-center">
                    <span>Category Financial Ledger</span>
                    <span className="font-mono text-slate-600">Performance</span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {/* 1. Current Count */}
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-600 font-medium">Current Count:</span>
                      <span className="font-mono font-bold text-slate-900">{cat.currentCount} Active Vehicles</span>
                    </div>

                    {/* 2. In Repair */}
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-600 font-medium">In Repair:</span>
                      <span className={`font-mono font-bold ${cat.inRepair > 0 ? 'text-amber-600' : 'text-slate-700'}`}>
                        {cat.inRepair} Workshop Breakdown
                      </span>
                    </div>

                    {/* 3. Cost per Asset */}
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-600 font-medium">Cost per Asset:</span>
                      <span className="font-mono font-bold text-slate-900">₦{cat.costPerAsset.toLocaleString()}</span>
                    </div>

                    {/* 4. Fuel Transit Cost */}
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-600 font-medium">Fuel Transit Cost:</span>
                      <span className="font-mono font-bold text-cyan-800">₦{cat.fuelTransitCost.toLocaleString()}</span>
                    </div>

                    {/* 5. Maintenance Cost */}
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-600 font-medium">Maintenance Cost:</span>
                      <span className="font-mono font-bold text-indigo-800">₦{cat.maintenanceCost.toLocaleString()}</span>
                    </div>

                    {/* 6. Driver Salary */}
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-600 font-medium">Driver Salary:</span>
                      <span className="font-mono font-bold text-slate-900">₦{cat.driverSalary.toLocaleString()}</span>
                    </div>

                    {/* 7. Other Expenses */}
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-600 font-medium">Other Expenses:</span>
                      <span className="font-mono font-bold text-slate-900">₦{cat.otherExpenses.toLocaleString()}</span>
                    </div>

                    {/* 8. Total Expenses */}
                    <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-rose-50/70 border border-rose-200/60">
                      <span className="text-rose-900 font-bold">Total Expenses:</span>
                      <span className="font-mono font-black text-rose-700">₦{cat.totalExpenses.toLocaleString()}</span>
                    </div>

                    {/* 9. Total Income / Revenue (Daily & Weekly Income) */}
                    <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-cyan-50/70 border border-cyan-200/60">
                      <div>
                        <span className="text-cyan-950 font-bold block">Total Income / Revenue:</span>
                        <span className="text-[10px] text-cyan-700">Daily & Weekly Returns</span>
                      </div>
                      <span className="font-mono font-black text-cyan-800">₦{cat.dailyWeeklyIncome.toLocaleString()}</span>
                    </div>

                    {/* 10. Net Profit / Loss */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-slate-900 font-bold">Net Profit / Loss:</span>
                      <span className={`font-mono font-black px-2 py-0.5 rounded-lg text-xs ${
                        cat.netProfitLoss >= 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {cat.netProfitLoss >= 0 ? '+' : '-'}₦{Math.abs(cat.netProfitLoss).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick actions for this category */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {onOpenRemittanceDrawer && (
                    <button
                      type="button"
                      onClick={onOpenRemittanceDrawer}
                      className="py-2 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer border border-blue-200"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Post Income</span>
                    </button>
                  )}
                  {onOpenFuelDrawer && (
                    <button
                      type="button"
                      onClick={onOpenFuelDrawer}
                      className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer border border-slate-200"
                    >
                      <Fuel className="w-3.5 h-3.5 text-slate-600" />
                      <span>Fuel / Repair</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
