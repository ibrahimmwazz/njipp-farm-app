'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Scale,
  Lock,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  DollarSign,
  AlertOctagon,
  Clock,
  History,
  Trash2,
  ShieldAlert,
  ArrowUpRight,
  TrendingDown,
  Layers,
  FileText,
  Search,
  Printer,
  ChevronRight,
  ExternalLink,
  Building,
  CreditCard
} from 'lucide-react';
import {
  UserRoleLevel,
  PendingApprovalItem,
  AuditTrailEntry,
  CategorizedExpenseRecord,
  DebtAgingRecord,
  PurchaseOrderRecord,
  DebtAgingBracket
} from '@/types';
import { ModernMetricCard } from '@/components/ui/ModernMetricCard';

interface ModernGovernanceProps {
  currentRole: UserRoleLevel;
  pendingApprovals: PendingApprovalItem[];
  expenses: CategorizedExpenseRecord[];
  debtAging: DebtAgingRecord[];
  purchaseOrders?: PurchaseOrderRecord[];
  auditTrail: AuditTrailEntry[];
  onApproveItem: (id: string, name: string) => void;
  onRejectItem: (id: string, name: string) => void;
  onOpenDraftDrawer: () => void;
  onOpenExpenseDrawer: () => void;
  onSettleDebt?: (id: string, amount: number) => void;
}

export const ModernGovernanceWorkspace: React.FC<ModernGovernanceProps> = ({
  currentRole,
  pendingApprovals,
  expenses,
  debtAging,
  purchaseOrders = [],
  auditTrail,
  onApproveItem,
  onRejectItem,
  onOpenDraftDrawer,
  onOpenExpenseDrawer,
  onSettleDebt,
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'APPROVALS' | 'POS' | 'DEBT' | 'EXPENSES' | 'QUARANTINE' | 'AUDIT'>('OVERVIEW');
  const [debtFilter, setDebtFilter] = useState<'ALL' | 'RECEIVABLE' | 'PAYABLE'>('ALL');
  const [selectedPO, setSelectedPO] = useState<PurchaseOrderRecord | null>(purchaseOrders[0] || null);
  const [auditSearch, setAuditSearch] = useState('');

  const totalReceivables = debtAging
    .filter((d) => d.accountType === 'RECEIVABLE_CLIENT_DEBT')
    .reduce((acc, curr) => acc + curr.balanceRemaining, 0);

  const totalPayables = debtAging
    .filter((d) => d.accountType === 'PAYABLE_VENDOR_LIABILITY')
    .reduce((acc, curr) => acc + curr.balanceRemaining, 0);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const quarantineItems = pendingApprovals.filter((i) => i.category === 'DELETION_QUARANTINE');
  const requisitionItems = pendingApprovals.filter((i) => i.category !== 'DELETION_QUARANTINE');

  // Filter debt aging
  const filteredDebt = debtAging.filter((d) => {
    if (debtFilter === 'RECEIVABLE') return d.accountType === 'RECEIVABLE_CLIENT_DEBT';
    if (debtFilter === 'PAYABLE') return d.accountType === 'PAYABLE_VENDOR_LIABILITY';
    return true;
  });

  // Filter audit trail
  const filteredAudit = auditTrail.filter((a) => {
    if (!auditSearch) return true;
    const q = auditSearch.toLowerCase();
    return (
      a.action.toLowerCase().includes(q) ||
      a.performedBy.toLowerCase().includes(q) ||
      a.details.toLowerCase().includes(q) ||
      (a.ipAddress && a.ipAddress.toLowerCase().includes(q))
    );
  });

  // Calculate aging brackets summary
  const brackets: DebtAgingBracket[] = ['CURRENT', '1_30_DAYS', '31_60_DAYS', '61_90_DAYS', 'OVER_90_DAYS'];
  const agingSummary = brackets.map((bracket) => {
    const recSum = debtAging
      .filter((d) => d.accountType === 'RECEIVABLE_CLIENT_DEBT' && d.agingBracket === bracket)
      .reduce((sum, d) => sum + d.balanceRemaining, 0);
    const paySum = debtAging
      .filter((d) => d.accountType === 'PAYABLE_VENDOR_LIABILITY' && d.agingBracket === bracket)
      .reduce((sum, d) => sum + d.balanceRemaining, 0);
    return { bracket, recSum, paySum, count: debtAging.filter((d) => d.agingBracket === bracket).length };
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. TOP HEADER & ACTION BAR */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-700 font-mono bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
              Finance & Management
            </span>
            <span className="text-xs font-bold text-slate-500">• Central Accounting • Approvals Gate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Finance, Approvals & Debts
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl font-medium">
            Approve spending requests, issue official Purchase Orders (PO), track money customers owe us, manage supplier debts, and view all expense records.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          <button
            onClick={onOpenDraftDrawer}
            className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all hover:shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Request Funds / Create PO</span>
          </button>
          <button
            onClick={onOpenExpenseDrawer}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Record Expense</span>
          </button>
        </div>
      </div>

      {/* 2. TAB NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'OVERVIEW', label: 'Financial Overview', icon: <Scale className="w-4 h-4" /> },
          { id: 'APPROVALS', label: 'Approvals Waiting', icon: <CheckCircle2 className="w-4 h-4" />, count: requisitionItems.length },
          { id: 'POS', label: 'Purchase Orders (PO)', icon: <FileText className="w-4 h-4" />, count: purchaseOrders.length },
          { id: 'DEBT', label: 'Money Owed & Debts', icon: <Layers className="w-4 h-4" />, count: debtAging.length },
          { id: 'EXPENSES', label: 'Expenses & Spending', icon: <FileCheck2 className="w-4 h-4" />, count: expenses.length },
          { id: 'QUARANTINE', label: 'Records to Delete', icon: <Trash2 className="w-4 h-4 text-rose-600" />, count: quarantineItems.length },
          { id: 'AUDIT', label: 'Activity History', icon: <History className="w-4 h-4" />, count: auditTrail.length },
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

      {/* ================= TAB 1: FINANCIAL OVERVIEW ================= */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8">
          
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ModernMetricCard
              title="Customers Owe Us"
              value={`₦${(totalReceivables / 1000).toLocaleString()}k`}
              subtitle="Unpaid credit for eggs/milk/livestock"
              change="+₦340k Milk"
              trend="up"
              trendGood={false}
              accentColor="emerald"
              icon={<ArrowUpRight className="w-5 h-5 text-emerald-600" />}
              badge="Credit Sales"
            />
            <ModernMetricCard
              title="We Owe Suppliers"
              value={`₦${(totalPayables / 1000000).toFixed(2)}M`}
              subtitle="Feed suppliers & vehicle hire purchase"
              change="₦200k Paid"
              trend="down"
              trendGood={true}
              accentColor="rose"
              icon={<TrendingDown className="w-5 h-5 text-rose-600" />}
              badge="Supplier Bills"
            />
            <ModernMetricCard
              title="Total Expenses This Month"
              value={`₦${(totalExpenses / 1000).toLocaleString()}k`}
              subtitle="Recorded receipts & operational spending"
              change="+₦190k Feed"
              trend="up"
              trendGood={false}
              accentColor="blue"
              icon={<FileCheck2 className="w-5 h-5 text-blue-600" />}
              badge="All Expenses"
            />
            <ModernMetricCard
              title="Pending Approvals"
              value={`${pendingApprovals.length} Items`}
              subtitle="Requisitions & deletion requests"
              change="Action Needed"
              trend="up"
              trendGood={false}
              accentColor="indigo"
              icon={<ShieldAlert className="w-5 h-5 text-indigo-600" />}
              badge="Pending Review"
            />
          </div>

          {/* GOVERNANCE RBAC & TIERED LIMITS BANNER */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/20 text-white">
                RBAC Architecture
              </span>
              <span className="text-xs text-indigo-200">NJIPP KONSULT LTD Operational Governance Model</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-white/10 rounded-2xl p-4 space-y-2 border border-white/10">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-white">Level 1: Entry Mode</h4>
                  <span className="text-[10px] font-mono bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded">Field Punch-In</span>
                </div>
                <p className="text-xs text-slate-300">
                  Field clerks, drivers, pen hands. Quick punch-in for feed logs, yield batches, and remittances. Strictly zero delete or approval rights.
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 space-y-2 border border-white/10">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-white">Level 2: Supervision</h4>
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded">Anomaly Radar</span>
                </div>
                <p className="text-xs text-slate-300">
                  Farm managers & fleet leads. Monitors fuel deviations, driver arrears, and initiates two-person soft-delete requests. Endorsement up to ₦100,000.
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 space-y-2 border border-white/10">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-white">Level 3: Executive Board</h4>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded">Sovereign Gate</span>
                </div>
                <p className="text-xs text-slate-300">
                  Managing Director. Exclusive authority over PO disbursement, debt/credit assumptions, and cryptographic permanent purge of quarantined records.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 2: TIERED APPROVALS QUEUE ================= */}
      {activeTab === 'APPROVALS' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Executive Authorization Gate</h3>
                <p className="text-xs text-slate-500">Tiered approval thresholds: L2 endorsement up to ₦100k; L3 exclusive sanction above ₦100k & all credit</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 self-start sm:self-auto">
                {requisitionItems.length} Tickets Pending
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {requisitionItems.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  Zero pending authorization tickets in executive queue.
                </div>
              ) : (
                requisitionItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-800 text-xs">{item.id}</span>
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-slate-700">
                          {item.category.replace('_', ' ')}
                        </span>
                        <span className="text-slate-400 text-xs">• {item.timestamp}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 max-w-2xl">{item.description}</p>
                      <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-4 flex-wrap">
                        <span>Department: <strong>{item.department}</strong></span>
                        <span>Initiated by: <strong>{item.initiatedBy}</strong> ({item.initiatorLevel})</span>
                        {item.vendorName && <span>Vendor: <strong>{item.vendorName}</strong></span>}
                        {item.repaymentTerms && <span>Terms: <strong>{item.repaymentTerms}</strong></span>}
                      </div>
                      {item.supervisorEndorsement && (
                        <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 mt-2">
                          <strong>Supervisor Endorsement:</strong> {item.supervisorEndorsement}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 sm:flex-col sm:items-end shrink-0">
                      <div className="text-xl font-black font-mono-num text-slate-900">
                        ₦{item.amount?.toLocaleString()}
                      </div>
                      {currentRole === 'LEVEL_3' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onApproveItem(item.id, item.title)}
                            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs"
                          >
                            Sanction & Issue PO
                          </button>
                          <button
                            onClick={() => onRejectItem(item.id, item.title)}
                            className="px-4 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-medium px-2.5 py-1 bg-slate-100 rounded-lg">
                          Awaiting Level 3 Sanction
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: PURCHASE ORDER (PO) GENERATOR & MANAGEMENT ================= */}
      {activeTab === 'POS' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* PO List */}
            <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-900">Purchase Orders Issued</h3>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {purchaseOrders.length} Orders
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {purchaseOrders.map((po) => (
                  <button
                    key={po.id}
                    onClick={() => setSelectedPO(po)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all my-1 ${
                      selectedPO?.id === po.id
                        ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 shadow-xs'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span className="font-mono text-xs">{po.id}</span>
                      <span className="font-mono-num text-sm text-slate-900">₦{po.grandTotal.toLocaleString()}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">{po.vendorName}</div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                      <span>{po.dateIssued}</span>
                      <span className={`px-1.5 py-0.5 rounded font-bold ${
                        po.status === 'DELIVERED_STOCKED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {po.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* PO Voucher Document Viewer */}
            <div className="lg:col-span-2">
              {selectedPO ? (
                <div className="bg-white rounded-3xl border border-slate-300 p-8 shadow-sm space-y-6">
                  {/* Document Header */}
                  <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Official Purchase Order</div>
                      <h2 className="text-2xl font-black text-slate-900 mt-1">NJIPP KONSULT LTD</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Commercial Agriculture, Fleet Logistics & Multi-Ventures</p>
                      <p className="text-[11px] text-slate-400">Zaria Road Enterprise Hub, Kaduna, Nigeria</p>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1 bg-slate-900 text-white font-mono font-bold text-sm rounded-xl inline-block">
                        {selectedPO.id}
                      </div>
                      <div className="text-xs text-slate-500 mt-2 font-mono">Date: {selectedPO.dateIssued}</div>
                      <div className="text-xs text-slate-500 font-mono">Requisition Ref: {selectedPO.requisitionRef}</div>
                    </div>
                  </div>

                  {/* Vendor & Department Cards */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-400 uppercase text-[10px] block">Vendor / Supplier:</span>
                      <strong className="text-slate-900 text-sm block">{selectedPO.vendorName}</strong>
                      <p className="text-slate-500">Corporate Verified Account</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-400 uppercase text-[10px] block">Disbursing Department:</span>
                      <strong className="text-slate-900 text-sm block">{selectedPO.department}</strong>
                      <p className="text-slate-500">Terms: {selectedPO.paymentTerms}</p>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3">Item Description</th>
                          <th className="px-4 py-3">Quantity</th>
                          <th className="px-4 py-3">Unit</th>
                          <th className="px-4 py-3 text-right">Unit Price (₦)</th>
                          <th className="px-4 py-3 text-right">Total (₦)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedPO.lineItems.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3 font-medium text-slate-900">{item.itemDescription}</td>
                            <td className="px-4 py-3 font-mono font-bold text-slate-800">{item.quantity}</td>
                            <td className="px-4 py-3 text-slate-600">{item.unit}</td>
                            <td className="px-4 py-3 font-mono text-right text-slate-700">₦{item.unitPrice.toLocaleString()}</td>
                            <td className="px-4 py-3 font-mono font-bold text-right text-slate-900">
                              ₦{item.totalPrice.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Total & Executive Sanction */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-200">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-slate-900">Executive Sanction Confirmed</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Sign-off: {selectedPO.approvedByL3}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 uppercase font-bold block">Grand Total Authorized:</span>
                      <span className="text-2xl font-black font-mono-num text-slate-900">
                        ₦{selectedPO.grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
                  Select a purchase order to view voucher preview.
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ================= TAB 4: 5-BRACKET DEBT & CREDIT AGING (AR/AP) ================= */}
      {activeTab === 'DEBT' && (
        <div className="space-y-8">
          
          {/* 5-BRACKET MATRIX OVERVIEW CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {agingSummary.map((b) => (
              <div key={b.bracket} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 uppercase">
                  <span>{b.bracket.replace('_', ' ')}</span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">{b.count}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-emerald-800 font-mono font-bold">
                    AR: ₦{b.recSum.toLocaleString()}
                  </div>
                  <div className="text-xs text-rose-800 font-mono font-bold">
                    AP: ₦{b.paySum.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs">
            {(['ALL', 'RECEIVABLE', 'PAYABLE'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setDebtFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  debtFilter === filter
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {filter === 'ALL'
                  ? `All Accounts (${debtAging.length})`
                  : filter === 'RECEIVABLE'
                  ? `Accounts Receivable (₦${totalReceivables.toLocaleString()})`
                  : `Accounts Payable (₦${totalPayables.toLocaleString()})`}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Account Type</th>
                    <th className="px-6 py-4">Counterparty / Merchant</th>
                    <th className="px-6 py-4">Contract Ref</th>
                    <th className="px-6 py-4">Principal Amount</th>
                    <th className="px-6 py-4">Balance Remaining</th>
                    <th className="px-6 py-4">Aging Bracket</th>
                    <th className="px-6 py-4">Due Date</th>
                    <th className="px-6 py-4">Governance Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDebt.map((debt) => (
                    <tr key={debt.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-mono ${
                            debt.accountType === 'RECEIVABLE_CLIENT_DEBT'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {debt.accountType === 'RECEIVABLE_CLIENT_DEBT' ? 'RECEIVABLE (AR)' : 'PAYABLE (AP)'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">{debt.partyName}</td>
                      <td className="px-6 py-4 font-mono text-slate-500 text-[11px]">{debt.contractRef}</td>
                      <td className="px-6 py-4 font-mono-num text-slate-600">
                        ₦{debt.principalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-mono-num font-black text-slate-900 text-sm">
                        ₦{debt.balanceRemaining.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                            debt.agingBracket === 'CURRENT'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : debt.agingBracket === '1_30_DAYS'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : debt.agingBracket === '31_60_DAYS'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {debt.agingBracket.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{debt.dueDate}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            debt.status === 'DEFAULT_FLAG'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {debt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {currentRole === 'LEVEL_3' && debt.balanceRemaining > 0 && onSettleDebt && (
                          <button
                            onClick={() => onSettleDebt(debt.id, debt.balanceRemaining)}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px]"
                          >
                            Clear Debt
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

      {/* ================= TAB 5: CATEGORIZED EXPENSES ================= */}
      {activeTab === 'EXPENSES' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Categorized Expense Outflows</h3>
                <p className="text-xs text-slate-500">Every spend voucher across farm, fleet, and operations with receipt capture audit</p>
              </div>
              <button
                onClick={onOpenExpenseDrawer}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs self-start sm:self-auto"
              >
                + Record Field Outflow
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Expense ID / Date</th>
                    <th className="px-6 py-4">Division</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Item Description</th>
                    <th className="px-6 py-4">Vendor / Payee</th>
                    <th className="px-6 py-4">Amount (₦)</th>
                    <th className="px-6 py-4">Receipt Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-800">
                        {exp.id}
                        <span className="block text-[10px] text-slate-400 font-sans">{exp.date}</span>
                      </td>
                      <td className="px-6 py-4 font-bold">{exp.division.replace('_', ' ')}</td>
                      <td className="px-6 py-4 font-mono text-[10px] text-slate-600">{exp.category}</td>
                      <td className="px-6 py-4 text-slate-900 font-bold">{exp.description}</td>
                      <td className="px-6 py-4 text-slate-700">{exp.vendorName}</td>
                      <td className="px-6 py-4 font-mono-num font-black text-slate-900 text-sm">
                        ₦{exp.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <FileCheck2 className="w-3 h-3" /> Scanned Attached
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

      {/* ================= TAB 6: DELETION QUARANTINE VAULT ================= */}
      {activeTab === 'QUARANTINE' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-rose-50/50 border-b border-rose-100 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-rose-950 flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-rose-600" />
                  Two-Person Deletion Quarantine Vault
                </h3>
                <p className="text-xs text-rose-700">Records soft-deleted by Level 2 Supervisors held here until Level 3 permanently purges or restores</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                {quarantineItems.length} Held in Quarantine
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {quarantineItems.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  Quarantine vault is empty. All operational records are active.
                </div>
              ) : (
                quarantineItems.map((q) => (
                  <div key={q.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-rose-700 text-xs">{q.id}</span>
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-rose-50 text-rose-800 border border-rose-200">
                          HOLD IN QUARANTINE
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{q.title}</h4>
                      <p className="text-xs text-slate-500">{q.description}</p>
                      <div className="text-[11px] text-slate-400">
                        Requested by: <strong>{q.initiatedBy}</strong> ({q.initiatorLevel})
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {currentRole === 'LEVEL_3' ? (
                        <>
                          <button
                            onClick={() => onApproveItem(q.id, q.title)}
                            className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-xs"
                          >
                            Confirm Permanent Purge
                          </button>
                          <button
                            onClick={() => onRejectItem(q.id, q.title)}
                            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                          >
                            Restore Record
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">
                          Awaiting Level 3 Final Action
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 7: CRYPTOGRAPHIC AUDIT TRAIL ================= */}
      {activeTab === 'AUDIT' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <History className="w-5 h-5 text-indigo-700" />
                  <span>Immutable System Audit Trail</span>
                </h3>
                <p className="text-xs text-slate-500">Cryptographically hashed SHA-256 logs of all field entries, supervisor deletes, and executive sanctions</p>
              </div>

              {/* Audit Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  placeholder="Filter logs by officer, IP..."
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Audit ID / Timestamp</th>
                    <th className="px-6 py-4">Action Type</th>
                    <th className="px-6 py-4">Officer & Role</th>
                    <th className="px-6 py-4">Details & Event Parameters</th>
                    <th className="px-6 py-4">Terminal IP Address</th>
                    <th className="px-6 py-4">Cryptographic Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAudit.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-900">
                        {a.id}
                        <span className="block text-[10px] text-slate-400 font-sans">{a.timestamp}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-indigo-50 text-indigo-800 border border-indigo-200">
                          {a.action}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <strong className="block text-slate-900">{a.performedBy}</strong>
                        <span className="text-[10px] text-slate-500 font-mono">({a.roleLevel})</span>
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-medium max-w-xs">{a.details}</td>
                      <td className="px-6 py-4 font-mono text-[11px] text-slate-600">
                        {a.ipAddress || '192.168.1.1 (Gateway)'}
                      </td>
                      <td className="px-6 py-4 font-mono text-[10px] text-slate-400">
                        {a.hash.substring(0, 22)}...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
