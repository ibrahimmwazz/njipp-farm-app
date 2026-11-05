'use client';

import React, { useState, useMemo } from 'react';
import {
  AnimalProductionLedgerRow,
  AnimalProductionUnitCode,
  LivestockSection
} from '@/types';
import {
  TableProperties,
  Search,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  Edit3,
  CheckCircle2,
  X,
  FileSpreadsheet,
  Plus
} from 'lucide-react';

interface AnimalProductionLedgerProps {
  ledgerRows: AnimalProductionLedgerRow[];
  onUpdateRow?: (updatedRow: AnimalProductionLedgerRow) => void;
  onAddNewRow?: (newRow: AnimalProductionLedgerRow) => void;
}

export const AnimalProductionLedger: React.FC<AnimalProductionLedgerProps> = ({
  ledgerRows,
  onUpdateRow,
  onAddNewRow
}) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingRow, setEditingRow] = useState<AnimalProductionLedgerRow | null>(null);

  // Filtered rows based on unit code or search
  const filteredRows = useMemo(() => {
    return ledgerRows.filter((row) => {
      const matchesUnit = selectedUnit === 'ALL' || row.unitCode === selectedUnit;
      const matchesSearch =
        row.breedOrProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.unitName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesUnit && matchesSearch;
    });
  }, [ledgerRows, selectedUnit, searchQuery]);

  // Department-wide Grand Totals
  const grandTotals = useMemo(() => {
    return ledgerRows.reduce(
      (acc, r) => {
        acc.liveCount += r.liveCount;
        acc.casualties += r.casualties;
        acc.transportationCost += r.transportationCost;
        acc.feedingCost += r.feedingCost;
        acc.medicationCost += r.medicationCost;
        acc.salaries += r.salaries;
        acc.otherExpenses += r.otherExpenses;
        acc.totalExpenses += r.totalExpenses;
        acc.totalIncomeRevenue += r.totalIncomeRevenue;
        acc.netProfitLoss += r.netProfitLoss;
        return acc;
      },
      {
        liveCount: 0,
        casualties: 0,
        transportationCost: 0,
        feedingCost: 0,
        medicationCost: 0,
        salaries: 0,
        otherExpenses: 0,
        totalExpenses: 0,
        totalIncomeRevenue: 0,
        netProfitLoss: 0,
      }
    );
  }, [ledgerRows]);

  // Overall department unit cost
  const overallUnitCost = grandTotals.liveCount > 0
    ? Math.round(grandTotals.totalExpenses / grandTotals.liveCount)
    : 0;

  // Group filtered rows by Unit Code for organized display
  const groupedRows = useMemo(() => {
    const groups: { [key in AnimalProductionUnitCode]?: { name: string; rows: AnimalProductionLedgerRow[] } } = {};
    const unitNames: Record<AnimalProductionUnitCode, string> = {
      A: 'A. CATTLE UNIT',
      B: 'B. RAMS UNIT',
      C: 'C. GOATS UNIT',
      D: 'D. RABBITS UNIT',
      E: 'E. POULTRY UNIT (CHICKENS)',
      F: 'F. WATERFOWL UNIT (DUCKS & GEESE)',
    };

    filteredRows.forEach((row) => {
      if (!groups[row.unitCode]) {
        groups[row.unitCode] = {
          name: unitNames[row.unitCode] || row.unitName,
          rows: [],
        };
      }
      groups[row.unitCode]!.rows.push(row);
    });

    return groups;
  }, [filteredRows]);

  // Save edited row handler
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRow) return;

    // Recalculate financial totals
    const totalHead = editingRow.liveCount + editingRow.casualties;
    const baseCost = totalHead * editingRow.costPerHead;
    const totalExpenses =
      baseCost +
      editingRow.transportationCost +
      editingRow.feedingCost +
      editingRow.medicationCost +
      editingRow.salaries +
      editingRow.otherExpenses;
    const totalUnitCost = editingRow.liveCount > 0 ? Math.round(totalExpenses / editingRow.liveCount) : 0;
    const netProfitLoss = editingRow.totalIncomeRevenue - totalExpenses;

    const recalculatedRow: AnimalProductionLedgerRow = {
      ...editingRow,
      totalExpenses,
      totalUnitCost,
      netProfitLoss,
    };

    if (onUpdateRow) {
      onUpdateRow(recalculatedRow);
    }
    setEditingRow(null);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Unit Code',
      'Unit Name',
      'Departmental Group / Products',
      'Purpose',
      'Live Count',
      'Casualties',
      'Cost per Head',
      'Transportation Cost',
      'Feeding Cost',
      'Medication Cost',
      'Salaries',
      'Other Expenses',
      'Total Unit Cost',
      'Total Expenses',
      'Total Income / Revenue',
      'Net Profit / Loss'
    ];

    const rowsData = ledgerRows.map((r) => [
      r.unitCode,
      `"${r.unitName}"`,
      `"${r.breedOrProduct}"`,
      r.purpose,
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

    // Grand totals row
    rowsData.push([
      'TOTAL',
      '"Total Animal Production Department"',
      '"Grand Department Roll-Up"',
      'ALL',
      grandTotals.liveCount,
      grandTotals.casualties,
      0,
      grandTotals.transportationCost,
      grandTotals.feedingCost,
      grandTotals.medicationCost,
      grandTotals.salaries,
      grandTotals.otherExpenses,
      overallUnitCost,
      grandTotals.totalExpenses,
      grandTotals.totalIncomeRevenue,
      grandTotals.netProfitLoss
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
    <div className="space-y-6">
      {/* 1. TOP HEADER & METRICS BANNER */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Official Excel Mirror
              </span>
              <span className="text-xs text-slate-300">NJIPP KONSULT LTD Operational Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <FileSpreadsheet className="w-8 h-8 text-emerald-400" />
              <span>Animal Production Inventory & Financial Ledger</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Complete cost-per-head accounting across all 6 production units: Cattle, Rams, Goats, Rabbits, Chickens, and Waterfowl. Every cost center (purchases, logistics, feed, medicine, labor) rolls up into real-time net profitability.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Excel (CSV)</span>
            </button>
          </div>
        </div>

        {/* TOP SUMMARY STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xs">
            <span className="text-[11px] font-medium text-emerald-200">Total Live Count</span>
            <div className="text-2xl font-black text-white mt-1">
              {grandTotals.liveCount.toLocaleString()} <span className="text-xs font-normal text-slate-300">heads</span>
            </div>
            <span className="text-[10px] text-slate-300">Casualties: {grandTotals.casualties}</span>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xs">
            <span className="text-[11px] font-medium text-emerald-200">Total Department Expenses</span>
            <div className="text-2xl font-black text-white mt-1">
              ₦{(grandTotals.totalExpenses / 1000000).toFixed(2)}M
            </div>
            <span className="text-[10px] text-slate-300">Avg Unit Cost: ₦{overallUnitCost.toLocaleString()}</span>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xs">
            <span className="text-[11px] font-medium text-emerald-200">Total Income / Revenue</span>
            <div className="text-2xl font-black text-emerald-300 mt-1">
              ₦{(grandTotals.totalIncomeRevenue / 1000000).toFixed(2)}M
            </div>
            <span className="text-[10px] text-emerald-200">Livestock & produce sales</span>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xs">
            <span className="text-[11px] font-medium text-emerald-200">Department Net Profit</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              ₦{(grandTotals.netProfitLoss / 1000000).toFixed(2)}M
            </div>
            <span className="text-[10px] text-emerald-300 font-bold">
              Margin: {grandTotals.totalIncomeRevenue > 0 ? ((grandTotals.netProfitLoss / grandTotals.totalIncomeRevenue) * 100).toFixed(1) : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Unit Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'All Units' },
            { id: 'A', label: 'A. Cattle' },
            { id: 'B', label: 'B. Rams' },
            { id: 'C', label: 'C. Goats' },
            { id: 'D', label: 'D. Rabbits' },
            { id: 'E', label: 'E. Poultry' },
            { id: 'F', label: 'F. Waterfowl' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedUnit(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedUnit === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search breed, purpose, group..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* 3. SPREADSHEET TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            {/* TABLE HEADER (EXACT EXCEL COLUMNS) */}
            <thead className="bg-emerald-950 text-white sticky top-0 z-10 text-[11px] font-bold tracking-tight">
              <tr>
                <th className="py-3.5 px-4 font-bold border-r border-emerald-900 min-w-[240px]">
                  Departmental Group / Products
                </th>
                <th className="py-3.5 px-3 font-bold border-r border-emerald-900 text-center min-w-[70px]">
                  Live Count
                </th>
                <th className="py-3.5 px-3 font-bold border-r border-emerald-900 text-center min-w-[70px]">
                  Casualties
                </th>
                <th className="py-3.5 px-3 font-bold border-r border-emerald-900 text-right min-w-[100px]">
                  Cost per Head
                </th>
                <th className="py-3.5 px-3 font-bold border-r border-emerald-900 text-right min-w-[100px]">
                  Transportation Cost
                </th>
                <th className="py-3.5 px-3 font-bold border-r border-emerald-900 text-right min-w-[100px]">
                  Feeding Cost
                </th>
                <th className="py-3.5 px-3 font-bold border-r border-emerald-900 text-right min-w-[100px]">
                  Medication Cost
                </th>
                <th className="py-3.5 px-3 font-bold border-r border-emerald-900 text-right min-w-[90px]">
                  Salaries
                </th>
                <th className="py-3.5 px-3 font-bold border-r border-emerald-900 text-right min-w-[90px]">
                  Other Expenses
                </th>
                <th className="py-3.5 px-3 font-bold border-r border-emerald-900 text-right bg-emerald-900 min-w-[105px]">
                  Total Unit Cost
                </th>
                <th className="py-3.5 px-3 font-bold border-r border-emerald-900 text-right bg-emerald-900 min-w-[115px]">
                  Total Expenses
                </th>
                <th className="py-3.5 px-3 font-bold border-r border-emerald-900 text-right bg-emerald-900 min-w-[115px]">
                  Total Income / Revenue
                </th>
                <th className="py-3.5 px-4 font-bold text-right bg-emerald-800 min-w-[120px]">
                  Net Profit / Loss
                </th>
                <th className="py-3.5 px-3 font-bold text-center min-w-[50px]">
                  Action
                </th>
              </tr>
            </thead>

            {/* TABLE BODY (GROUPED BY A, B, C, D, E, F) */}
            <tbody className="divide-y divide-slate-100 text-[11px]">
              {(['A', 'B', 'C', 'D', 'E', 'F'] as AnimalProductionUnitCode[]).map((unitCode) => {
                const group = groupedRows[unitCode];
                if (!group || group.rows.length === 0) return null;

                // Subtotals for this unit
                const unitSubtotal = group.rows.reduce(
                  (acc, r) => {
                    acc.liveCount += r.liveCount;
                    acc.casualties += r.casualties;
                    acc.totalExpenses += r.totalExpenses;
                    acc.totalIncomeRevenue += r.totalIncomeRevenue;
                    acc.netProfitLoss += r.netProfitLoss;
                    return acc;
                  },
                  { liveCount: 0, casualties: 0, totalExpenses: 0, totalIncomeRevenue: 0, netProfitLoss: 0 }
                );

                return (
                  <React.Fragment key={unitCode}>
                    {/* UNIT HEADER ROW */}
                    <tr className="bg-slate-100/90 font-black text-slate-800 tracking-wider">
                      <td colSpan={14} className="py-2 px-4 border-y border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 uppercase">
                            {group.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {group.rows.length} breeds registered
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* BREED ROWS */}
                    {group.rows.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-emerald-50/40 transition-colors group border-b border-slate-100"
                      >
                        {/* Breed / Product Name */}
                        <td className="py-2.5 px-4 font-medium text-slate-900 border-r border-slate-100">
                          <div className="flex items-center justify-between">
                            <span>{row.breedOrProduct}</span>
                            <span
                              className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                                row.purpose === 'FATTENING'
                                  ? 'bg-amber-100 text-amber-800'
                                  : row.purpose === 'REPRODUCTION'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {row.purpose === 'FATTENING' ? 'Fattening' : row.purpose === 'REPRODUCTION' ? 'Reproduction' : 'General'}
                            </span>
                          </div>
                        </td>

                        {/* Live Count */}
                        <td className="py-2.5 px-3 text-center font-bold text-slate-900 border-r border-slate-100 font-mono">
                          {row.liveCount.toLocaleString()}
                        </td>

                        {/* Casualties */}
                        <td className="py-2.5 px-3 text-center font-bold text-rose-600 border-r border-slate-100 font-mono">
                          {row.casualties}
                        </td>

                        {/* Cost per Head */}
                        <td className="py-2.5 px-3 text-right font-mono text-slate-700 border-r border-slate-100">
                          {row.costPerHead.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                        {/* Transportation Cost */}
                        <td className="py-2.5 px-3 text-right font-mono text-slate-700 border-r border-slate-100">
                          {row.transportationCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                        {/* Feeding Cost */}
                        <td className="py-2.5 px-3 text-right font-mono text-slate-700 border-r border-slate-100">
                          {row.feedingCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                        {/* Medication Cost */}
                        <td className="py-2.5 px-3 text-right font-mono text-slate-700 border-r border-slate-100">
                          {row.medicationCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                        {/* Salaries */}
                        <td className="py-2.5 px-3 text-right font-mono text-slate-700 border-r border-slate-100">
                          {row.salaries.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                        {/* Other Expenses */}
                        <td className="py-2.5 px-3 text-right font-mono text-slate-700 border-r border-slate-100">
                          {row.otherExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                        {/* Total Unit Cost */}
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 border-r border-slate-100 bg-slate-50/60">
                          {row.totalUnitCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                        {/* Total Expenses */}
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 border-r border-slate-100 bg-slate-50/60">
                          {row.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                        {/* Total Income / Revenue */}
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-800 border-r border-slate-100 bg-emerald-50/30">
                          {row.totalIncomeRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                        {/* Net Profit / Loss */}
                        <td
                          className={`py-2.5 px-4 text-right font-mono font-black ${
                            row.netProfitLoss >= 0
                              ? 'text-emerald-700 bg-emerald-50/60'
                              : 'text-rose-700 bg-rose-50/60'
                          }`}
                        >
                          {row.netProfitLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>

                        {/* Edit Button */}
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => setEditingRow(row)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                            title="Edit row details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {/* UNIT SUBTOTAL ROW */}
                    <tr className="bg-emerald-50/30 font-bold text-[11px] border-b-2 border-slate-200 text-slate-800">
                      <td className="py-2 px-4 text-emerald-950 uppercase font-black">
                        Subtotal {group.name}
                      </td>
                      <td className="py-2 px-3 text-center font-mono">
                        {unitSubtotal.liveCount.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-center font-mono text-rose-700">
                        {unitSubtotal.casualties}
                      </td>
                      <td colSpan={6} className="text-right text-[10px] text-slate-400 px-3">
                        Unit Subtotal →
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-500">
                        -
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-black text-slate-900">
                        {unitSubtotal.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-black text-emerald-800">
                        {unitSubtotal.totalIncomeRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td
                        className={`py-2 px-4 text-right font-mono font-black ${
                          unitSubtotal.netProfitLoss >= 0 ? 'text-emerald-800' : 'text-rose-800'
                        }`}
                      >
                        {unitSubtotal.netProfitLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td></td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>

            {/* GRAND DEPARTMENT SUMMARY FOOTER (ROW 33 FROM SPREADSHEET) */}
            <tfoot className="bg-emerald-950 text-white font-black text-xs border-t-4 border-emerald-600">
              <tr>
                <td className="py-4 px-4 font-black uppercase tracking-wider text-emerald-300">
                  Total Animal Production Department
                </td>
                <td className="py-4 px-3 text-center font-mono text-white">
                  {grandTotals.liveCount.toLocaleString()}
                </td>
                <td className="py-4 px-3 text-center font-mono text-rose-400">
                  {grandTotals.casualties}
                </td>
                <td className="py-4 px-3 text-right font-mono text-slate-300">
                  -
                </td>
                <td className="py-4 px-3 text-right font-mono text-slate-200">
                  {grandTotals.transportationCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-3 text-right font-mono text-slate-200">
                  {grandTotals.feedingCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-3 text-right font-mono text-slate-200">
                  {grandTotals.medicationCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-3 text-right font-mono text-slate-200">
                  {grandTotals.salaries.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-3 text-right font-mono text-slate-200">
                  {grandTotals.otherExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-3 text-right font-mono text-emerald-300 bg-emerald-900">
                  {overallUnitCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-3 text-right font-mono text-white bg-emerald-900">
                  {grandTotals.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="py-4 px-3 text-right font-mono text-emerald-300 bg-emerald-900">
                  {grandTotals.totalIncomeRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td
                  className={`py-4 px-4 text-right font-mono text-sm ${
                    grandTotals.netProfitLoss >= 0 ? 'text-emerald-300 bg-emerald-800' : 'text-rose-300 bg-rose-900'
                  }`}
                >
                  {grandTotals.netProfitLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 4. MODAL: EDIT LEDGER ROW */}
      {editingRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {editingRow.unitName}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Update Ledger: {editingRow.breedOrProduct}
                </h3>
                <p className="text-xs text-slate-500">
                  Adjust live head count, expenses, and revenues. Calculations update automatically.
                </p>
              </div>
              <button
                onClick={() => setEditingRow(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              {/* Headcount & Casualties */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Live Count</label>
                  <input
                    type="number"
                    min={0}
                    value={editingRow.liveCount}
                    onChange={(e) => setEditingRow({ ...editingRow, liveCount: Number(e.target.value) })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 font-mono font-bold text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Casualties (Deaths)</label>
                  <input
                    type="number"
                    min={0}
                    value={editingRow.casualties}
                    onChange={(e) => setEditingRow({ ...editingRow, casualties: Number(e.target.value) })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 font-mono font-bold text-rose-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Cost per Head (₦)</label>
                  <input
                    type="number"
                    min={0}
                    value={editingRow.costPerHead}
                    onChange={(e) => setEditingRow({ ...editingRow, costPerHead: Number(e.target.value) })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 font-mono font-bold text-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Direct Input Costs */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Direct Input & Operational Costs (₦)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Transportation Cost</label>
                    <input
                      type="number"
                      min={0}
                      value={editingRow.transportationCost}
                      onChange={(e) => setEditingRow({ ...editingRow, transportationCost: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Feeding Cost</label>
                    <input
                      type="number"
                      min={0}
                      value={editingRow.feedingCost}
                      onChange={(e) => setEditingRow({ ...editingRow, feedingCost: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Medication Cost</label>
                    <input
                      type="number"
                      min={0}
                      value={editingRow.medicationCost}
                      onChange={(e) => setEditingRow({ ...editingRow, medicationCost: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Salaries Allocated</label>
                    <input
                      type="number"
                      min={0}
                      value={editingRow.salaries}
                      onChange={(e) => setEditingRow({ ...editingRow, salaries: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Other Expenses</label>
                    <input
                      type="number"
                      min={0}
                      value={editingRow.otherExpenses}
                      onChange={(e) => setEditingRow({ ...editingRow, otherExpenses: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Total Income / Revenue</label>
                    <input
                      type="number"
                      min={0}
                      value={editingRow.totalIncomeRevenue}
                      onChange={(e) => setEditingRow({ ...editingRow, totalIncomeRevenue: Number(e.target.value) })}
                      className="w-full bg-emerald-50/50 border border-emerald-300 rounded-xl p-2 font-mono font-bold text-emerald-800"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingRow(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-sm cursor-pointer"
                >
                  Save & Recalculate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
