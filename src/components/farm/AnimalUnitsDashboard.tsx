'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Truck,
  Wheat,
  Stethoscope,
  Users,
  Package,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Download
} from 'lucide-react';
import { AnimalProductionLedgerRow, AnimalProductionUnitCode } from '@/types';

interface AnimalUnitsDashboardProps {
  ledgerRows: AnimalProductionLedgerRow[];
  onOpenLedgerTab?: () => void;
  onSelectUnit?: (unitCode: AnimalProductionUnitCode) => void;
}

export const AnimalUnitsDashboard: React.FC<AnimalUnitsDashboardProps> = ({
  ledgerRows,
  onOpenLedgerTab,
  onSelectUnit,
}) => {
  // Aggregate Grand Totals across all 6 Units (Entire Animal Production Department)
  const totalLive = ledgerRows.reduce((a, b) => a + (b.liveCount || 0), 0);
  const totalCasualties = ledgerRows.reduce((a, b) => a + (b.casualties || 0), 0);
  const totalTransport = ledgerRows.reduce((a, b) => a + (b.transportationCost || 0), 0);
  const totalFeeding = ledgerRows.reduce((a, b) => a + (b.feedingCost || 0), 0);
  const totalMedication = ledgerRows.reduce((a, b) => a + (b.medicationCost || 0), 0);
  const totalSalaries = ledgerRows.reduce((a, b) => a + (b.salaries || 0), 0);
  const totalOther = ledgerRows.reduce((a, b) => a + (b.otherExpenses || 0), 0);
  const totalExpenses = ledgerRows.reduce((a, b) => a + (b.totalExpenses || 0), 0);
  const totalRevenue = ledgerRows.reduce((a, b) => a + (b.totalIncomeRevenue || 0), 0);
  const netProfitLoss = totalRevenue - totalExpenses;
  const avgUnitCost = totalLive > 0 ? Math.round(totalExpenses / totalLive) : 0;

  // Configuration for each of the 6 official Units (A through F)
  const unitDefs: Array<{
    code: AnimalProductionUnitCode;
    title: string;
    icon: string;
    color: string;
    borderAccent: string;
    badgeBg: string;
  }> = [
    {
      code: 'A',
      title: 'A. CATTLE UNIT',
      icon: '🐄',
      color: 'emerald',
      borderAccent: 'border-emerald-200 hover:border-emerald-400',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      code: 'B',
      title: 'B. RAMS UNIT (SHEEP)',
      icon: '🐑',
      color: 'blue',
      borderAccent: 'border-blue-200 hover:border-blue-400',
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      code: 'C',
      title: 'C. GOATS UNIT',
      icon: '🐐',
      color: 'amber',
      borderAccent: 'border-amber-200 hover:border-amber-400',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      code: 'D',
      title: 'D. RABBITS UNIT',
      icon: '🐇',
      color: 'purple',
      borderAccent: 'border-purple-200 hover:border-purple-400',
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    {
      code: 'E',
      title: 'E. POULTRY UNIT (CHICKENS)',
      icon: '🐔',
      color: 'rose',
      borderAccent: 'border-rose-200 hover:border-rose-400',
      badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
    },
    {
      code: 'F',
      title: 'F. WATERFOWL UNIT (DUCKS & GEESE)',
      icon: '🦆',
      color: 'cyan',
      borderAccent: 'border-cyan-200 hover:border-cyan-400',
      badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    },
  ];

  const unitMetrics = unitDefs.map((u) => {
    const rows = ledgerRows.filter((r) => r.unitCode === u.code);
    const live = rows.reduce((a, b) => a + (b.liveCount || 0), 0);
    const casualties = rows.reduce((a, b) => a + (b.casualties || 0), 0);
    const transport = rows.reduce((a, b) => a + (b.transportationCost || 0), 0);
    const feeding = rows.reduce((a, b) => a + (b.feedingCost || 0), 0);
    const medication = rows.reduce((a, b) => a + (b.medicationCost || 0), 0);
    const salaries = rows.reduce((a, b) => a + (b.salaries || 0), 0);
    const other = rows.reduce((a, b) => a + (b.otherExpenses || 0), 0);
    const expenses = rows.reduce((a, b) => a + (b.totalExpenses || 0), 0);
    const revenue = rows.reduce((a, b) => a + (b.totalIncomeRevenue || 0), 0);
    const profit = revenue - expenses;
    const unitCost = live > 0 ? Math.round(expenses / live) : 0;

    return {
      ...u,
      live,
      casualties,
      transport,
      feeding,
      medication,
      salaries,
      other,
      expenses,
      revenue,
      profit,
      unitCost,
      productCount: rows.length,
    };
  });

  const handleExportCSV = () => {
    const headers = [
      'Unit Code',
      'Unit Name',
      'Departmental Group / Products',
      'Purpose',
      'Live Count (Head)',
      'Casualties (Head)',
      'Cost per Head (NGN)',
      'Transportation Cost (NGN)',
      'Feeding Cost (NGN)',
      'Medication Cost (NGN)',
      'Salaries (NGN)',
      'Other Expenses (NGN)',
      'Total Unit Cost (NGN/Head)',
      'Total Expenses (NGN)',
      'Total Income / Revenue (NGN)',
      'Net Profit / Loss (NGN)'
    ];

    const rowsData = ledgerRows.map((r) => [
      `"${r.unitCode}"`,
      `"${r.unitName}"`,
      `"${r.breedOrProduct}"`,
      `"${r.purpose}"`,
      r.liveCount,
      r.casualties,
      r.costPerHead,
      r.transportationCost,
      r.feedingCost,
      r.medicationCost,
      r.salaries,
      r.otherExpenses,
      r.totalUnitCost,
      r.totalExpenses,
      r.totalIncomeRevenue,
      r.netProfitLoss
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rowsData.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NJIPP_Animal_Production_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      
      {/* ============================================================ */}
      {/* 1. TOTAL EXECUTIVE DASHBOARD FOR ALL UNITS (BOTTOM-LINE P&L) */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-slate-800">
        <div className="relative z-10 space-y-6">
          
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Total Department Roll-Up
                </span>
                <span className="text-xs text-slate-300">• NJIPP KONSULT Financial Ledger</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                Total Animal Production Dashboard (All 6 Units)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Executive aggregation across Cattle, Rams, Goats, Rabbits, Poultry, and Waterfowl.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-white/20 shadow-xs cursor-pointer"
                title="Download 25-row financial ledger spreadsheet (.csv)"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Ledger (CSV)</span>
              </button>

              {onOpenLedgerTab && (
                <button
                  type="button"
                  onClick={onOpenLedgerTab}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>View Full 25-Row Excel Ledger</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Core Key Figures (Total Headcount, Expenses, Revenue, Net Profit) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* 1. Total Live Headcount & Casualties */}
            <div className="bg-white/5 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/10">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Live Headcount
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                {totalLive.toLocaleString()} <span className="text-sm font-sans font-normal text-slate-400">Head</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <span className="px-2 py-0.5 rounded-md font-mono font-bold text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {totalCasualties} Casualties
                </span>
                <span className="text-[11px] text-slate-400">Recorded</span>
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
                ₦{totalRevenue.toLocaleString()} Total Inflow
              </p>
            </div>

            {/* 4. Net Profit / Loss */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${netProfitLoss >= 0 ? 'bg-emerald-950/40 border-emerald-500/30' : 'bg-rose-950/40 border-rose-500/30'}`}>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Net Profit / Loss
              </span>
              <div className={`text-2xl sm:text-3xl font-black font-mono mt-1 ${netProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {netProfitLoss >= 0 ? '+' : '-'}₦{(Math.abs(netProfitLoss) / 1000000).toFixed(2)}M
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${netProfitLoss >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                  {netProfitLoss >= 0 ? 'PROFITABLE OPERATION' : 'NET LOSS'}
                </span>
              </div>
            </div>

          </div>

          {/* Detailed Expense Breakdown Strip (Transport, Feeding, Meds, Salaries, Others, Avg Unit Cost) */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Total Department Operational Cost Breakdown:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-400" /> Transportation
                </span>
                <span className="font-mono font-bold text-sm text-white block">
                  ₦{totalTransport.toLocaleString()}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Wheat className="w-3.5 h-3.5 text-amber-400" /> Feeding Cost
                </span>
                <span className="font-mono font-bold text-sm text-white block">
                  ₦{totalFeeding.toLocaleString()}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Stethoscope className="w-3.5 h-3.5 text-rose-400" /> Medication Cost
                </span>
                <span className="font-mono font-bold text-sm text-white block">
                  ₦{totalMedication.toLocaleString()}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-indigo-400" /> Salaries
                </span>
                <span className="font-mono font-bold text-sm text-white block">
                  ₦{totalSalaries.toLocaleString()}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-slate-400" /> Other Expenses
                </span>
                <span className="font-mono font-bold text-sm text-white block">
                  ₦{totalOther.toLocaleString()}
                </span>
              </div>
              <div className="space-y-0.5 bg-white/5 p-2 rounded-xl">
                <span className="text-[10px] text-slate-300 font-bold uppercase block">
                  Avg Total Unit Cost
                </span>
                <span className="font-mono font-black text-sm text-emerald-300 block">
                  ₦{avgUnitCost.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">/ head</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. THE 6 INDIVIDUAL UNIT CARDS (COMPLETE FINANCIAL BREAKDOWN) */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700" />
              <span>Each Unit Financial & Inventory Breakdown</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Every unit includes Live Count, Casualties, Feed, Transport, Meds, Unit Cost, Revenue, and Net Profit/Loss.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">6 Units Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unitMetrics.map((unit) => (
            <div
              key={unit.code}
              className={`bg-white rounded-3xl p-6 border ${unit.borderAccent} shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5`}
            >
              {/* Header: Title & Badges */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${unit.badgeBg}`}>
                    Unit {unit.code}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                    <span className="font-bold text-slate-800">{unit.live} Head</span>
                    <span>•</span>
                    <span className={unit.casualties > 0 ? 'text-rose-600 font-bold' : 'text-slate-400'}>
                      {unit.casualties} Casualties
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl">{unit.icon}</span>
                  <div>
                    <h4 className="font-black text-base text-slate-900">
                      {unit.title}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {unit.productCount} Product Lines Tracked
                    </span>
                  </div>
                </div>
              </div>

              {/* The 8 Key Financial Metrics Requested */}
              <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pb-1.5 border-b border-slate-200 flex justify-between items-center">
                  <span>Unit Financial Performance</span>
                  <span className="font-mono text-slate-600">8 Metrics</span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {/* 1. Transportation Cost */}
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-slate-600 font-medium">Transportation Cost:</span>
                    <span className="font-mono font-bold text-slate-900">₦{unit.transport.toLocaleString()}</span>
                  </div>

                  {/* 2. Feeding Cost */}
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-slate-600 font-medium">Feeding Cost:</span>
                    <span className="font-mono font-bold text-slate-900">₦{unit.feeding.toLocaleString()}</span>
                  </div>

                  {/* 3. Medication Cost */}
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-slate-600 font-medium">Medication Cost:</span>
                    <span className="font-mono font-bold text-slate-900">₦{unit.medication.toLocaleString()}</span>
                  </div>

                  {/* 4. Other Expenses */}
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-slate-600 font-medium">Other Expenses:</span>
                    <span className="font-mono font-bold text-slate-900">₦{(unit.other + unit.salaries).toLocaleString()}</span>
                  </div>

                  {/* 5. Total Unit Cost (₦ / head) */}
                  <div className="flex items-center justify-between py-1 px-2 rounded-lg bg-emerald-50/70 border border-emerald-200/60">
                    <span className="text-emerald-900 font-bold">Total Unit Cost (₦ / head):</span>
                    <span className="font-mono font-black text-emerald-800">₦{unit.unitCost.toLocaleString()} / head</span>
                  </div>

                  {/* 6. Total Expenses */}
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-slate-600 font-medium">Total Expenses:</span>
                    <span className="font-mono font-black text-rose-600">₦{unit.expenses.toLocaleString()}</span>
                  </div>

                  {/* 7. Total Income / Revenue */}
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-slate-600 font-medium">Total Income / Revenue:</span>
                    <span className="font-mono font-black text-emerald-700">₦{unit.revenue.toLocaleString()}</span>
                  </div>

                  {/* 8. Net Profit / Loss */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-900 font-bold">Net Profit / Loss:</span>
                    <span className={`font-mono font-black px-2 py-0.5 rounded-lg text-xs ${
                      unit.profit >= 0
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {unit.profit >= 0 ? '+' : '-'}₦{Math.abs(unit.profit).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {onOpenLedgerTab && (
                <button
                  type="button"
                  onClick={onOpenLedgerTab}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open {unit.title} in Excel Ledger</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
