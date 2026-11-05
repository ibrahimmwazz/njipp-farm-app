'use client';

import React, { useState } from 'react';
import {
  UserRoleLevel,
  PendingApprovalItem,
  AuditTrailEntry,
  CategorizedExpenseRecord,
  DebtAgingRecord
} from '@/types';
import {
  ShieldCheck,
  Plus,
  Scale,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  History,
  FileText,
  FileCheck2,
  DollarSign,
  AlertOctagon,
  Clock
} from 'lucide-react';

interface GovernancePortalWorkspaceProps {
  subDesk: string;
  currentRole: UserRoleLevel;
  pendingApprovals: PendingApprovalItem[];
  expenses: CategorizedExpenseRecord[];
  debtAging: DebtAgingRecord[];
  auditTrail: AuditTrailEntry[];
  onApproveItem: (id: string, name: string) => void;
  onRejectItem: (id: string, name: string) => void;
  onOpenDraftModal: () => void;
  onOpenExpenseModal: () => void;
  onSubDeskChange: (desk: string) => void;
}

export const GovernancePortalWorkspace: React.FC<GovernancePortalWorkspaceProps> = ({
  subDesk,
  currentRole,
  pendingApprovals,
  expenses,
  debtAging,
  auditTrail,
  onApproveItem,
  onRejectItem,
  onOpenDraftModal,
  onOpenExpenseModal,
  onSubDeskChange,
}) => {
  const totalReceivables = debtAging
    .filter((d) => d.accountType === 'RECEIVABLE_CLIENT_DEBT')
    .reduce((acc, curr) => acc + curr.balanceRemaining, 0);

  const totalPayables = debtAging
    .filter((d) => d.accountType === 'PAYABLE_VENDOR_LIABILITY')
    .reduce((acc, curr) => acc + curr.balanceRemaining, 0);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* DEPARTMENT HEADER & ACTION RIBBON */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>NJIPP Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-800 font-semibold">Division 3: Central Financials & Governance</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 capitalize">
              {subDesk.replace('gov_', '').replace('_', ' ')} Desk
            </span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>Central Financials & Approval Control</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold font-mono">
              Level 3 Sovereign Gate
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Categorized expense accounting, receipt audits, debt aging ledgers, and two-person deletion quarantine.
          </p>
        </div>

        {/* PRIMARY ACTIONS */}
        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          <button
            onClick={onOpenDraftModal}
            className="px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Draft Requisition / Debt</span>
          </button>
          <button
            onClick={onOpenExpenseModal}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 border border-slate-300 shadow-sm transition-all"
          >
            <DollarSign className="w-4 h-4 text-emerald-700" />
            <span>Record Field Expense</span>
          </button>
        </div>
      </div>

      {/* SOVEREIGN BYLAW BANNER */}
      <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
            ⚖️
          </div>
          <div>
            <div className="text-sm font-bold text-indigo-950 flex items-center gap-2">
              <span>Exclusive Level 3 Sovereign Financial Gate</span>
              <span className="text-[10px] bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded font-bold font-mono">
                BMS Mandate
              </span>
            </div>
            <p className="text-xs text-indigo-900/80 mt-0.5">
              Only <strong>Level 3 (Managing Director / Board)</strong> can approve corporate loans, credit sales, purchase disbursements &gt; ₦50,000, and permanent record purges.
            </p>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end shrink-0 text-xs">
          <span className="font-mono text-emerald-800 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ISO-Audit Compliant
          </span>
          <span className="text-[10px] text-slate-500">Tamper-Evident Ledger</span>
        </div>
      </div>

      {/* ================= DESK 1: FISCAL OVERVIEW ================= */}
      {subDesk === 'gov_overview' && (
        <div className="space-y-6">
          {/* 3 HIGH IMPACT FINANCIAL CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div
              onClick={() => onSubDeskChange('gov_debt')}
              className="portal-card-interactive p-5 rounded-2xl cursor-pointer border-t-4 border-t-emerald-600"
            >
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Accounts Receivable (Clients Owe NJIPP)
              </span>
              <div className="text-3xl font-black font-mono-num text-slate-900 mt-2">
                ₦{totalReceivables.toLocaleString()}
              </div>
              <p className="text-xs text-emerald-700 font-medium mt-1">
                Approved egg & milk client debts on credit terms
              </p>
            </div>

            <div
              onClick={() => onSubDeskChange('gov_debt')}
              className="portal-card-interactive p-5 rounded-2xl cursor-pointer border-t-4 border-t-rose-600"
            >
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Accounts Payable (NJIPP Liabilities)
              </span>
              <div className="text-3xl font-black font-mono-num text-rose-700 mt-2">
                ₦{totalPayables.toLocaleString()}
              </div>
              <p className="text-xs text-rose-700 font-medium mt-1">
                Simba TVS Hire-Purchase vehicle liability
              </p>
            </div>

            <div
              onClick={() => onSubDeskChange('gov_purchases')}
              className="portal-card-interactive p-5 rounded-2xl cursor-pointer border-t-4 border-t-indigo-600"
            >
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Pending Approval Gate
              </span>
              <div className="text-3xl font-black font-mono-num text-slate-900 mt-2">
                {pendingApprovals.length} Requisitions
              </div>
              <p className="text-xs text-indigo-700 font-medium mt-1">
                Awaiting Level 3 executive signature
              </p>
            </div>
          </div>

          {/* SPLIT TABLE PREVIEWS: EXPENSES & DEBT AGING */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Categorized Outflows */}
            <div className="portal-card rounded-2xl overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Recent Field Expense Outflows</h3>
                  <p className="text-xs text-slate-500">Categorized with receipt capture</p>
                </div>
                <button
                  onClick={() => onSubDeskChange('gov_expenses')}
                  className="text-xs font-bold text-indigo-700 hover:underline"
                >
                  View All Outflows →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {expenses.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/80 transition-colors">
                    <div>
                      <div className="font-bold text-slate-900">{exp.description}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        {exp.category.replace('_', ' ')} • {exp.vendorName}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-num font-black text-slate-900 text-sm">
                        ₦{exp.amount.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 justify-end">
                        <FileCheck2 className="w-3 h-3" /> Receipt Attached
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Debt Aging Overview */}
            <div className="portal-card rounded-2xl overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Debt & Credit Aging Summary</h3>
                  <p className="text-xs text-slate-500">Aging brackets & default risk flags</p>
                </div>
                <button
                  onClick={() => onSubDeskChange('gov_debt')}
                  className="text-xs font-bold text-indigo-700 hover:underline"
                >
                  Manage Debt Console →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {debtAging.map((debt) => (
                  <div key={debt.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/80 transition-colors">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{debt.partyName}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                          debt.accountType === 'RECEIVABLE_CLIENT_DEBT' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}>
                          {debt.accountType === 'RECEIVABLE_CLIENT_DEBT' ? 'RECEIVABLE' : 'PAYABLE'}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        Ref: {debt.contractRef} • Due: {debt.dueDate}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-num font-black text-slate-900 text-sm">
                        ₦{debt.balanceRemaining.toLocaleString()}
                      </div>
                      <span className={`text-[10px] font-bold ${
                        debt.agingBracket === 'CURRENT' ? 'text-emerald-700' : 'text-rose-600'
                      }`}>
                        {debt.agingBracket.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= DESK 2: PURCHASE REQUISITIONS ================= */}
      {subDesk === 'gov_purchases' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Purchase Requisitions Requiring Executive Sanction ({pendingApprovals.filter(p => p.category === 'PURCHASE_ORDER').length})
            </h3>
            {currentRole !== 'LEVEL_3' && (
              <span className="text-xs text-amber-800 font-semibold flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                Read-Only: Level 3 Signature Required
              </span>
            )}
          </div>

          {pendingApprovals.filter(p => p.category === 'PURCHASE_ORDER').length === 0 ? (
            <div className="portal-card p-10 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">All Purchase Requisitions Cleared</h4>
              <p className="text-xs text-slate-500">No pending operational orders.</p>
            </div>
          ) : (
            pendingApprovals
              .filter((p) => p.category === 'PURCHASE_ORDER')
              .map((req) => (
                <div key={req.id} className="portal-card p-5 rounded-2xl border-l-4 border-l-amber-500 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] uppercase font-mono bg-amber-100 text-amber-900">
                          PURCHASE ORDER
                        </span>
                        <span className="text-xs text-slate-500 font-mono">{req.id}</span>
                        <span className="text-xs text-slate-400">• {req.department}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{req.title}</h4>
                    </div>

                    <div className="text-left sm:text-right">
                      {req.amount && (
                        <div className="text-xl font-black font-mono-num text-slate-900">
                          ₦{req.amount.toLocaleString()}
                        </div>
                      )}
                      {req.repaymentTerms && (
                        <span className="text-[11px] text-slate-500 font-medium">
                          {req.repaymentTerms}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{req.description}</p>

                  {req.supervisorEndorsement && (
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 flex items-start gap-2">
                      <span className="text-emerald-800 font-bold">Supervisor Endorsement:</span>
                      <span>{req.supervisorEndorsement}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-slate-100 text-xs gap-3">
                    <div className="text-slate-500 text-[11px]">
                      Initiated by: <strong className="text-slate-800">{req.initiatedBy}</strong> ({req.initiatorLevel})
                    </div>

                    <div className="flex items-center gap-2">
                      {currentRole !== 'LEVEL_3' ? (
                        <div className="text-xs text-amber-800 font-bold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Requires Level 3 Sign-Off</span>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => onRejectItem(req.id, req.title)}
                            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-rose-700 font-semibold border border-rose-300 transition-all shadow-sm"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => onApproveItem(req.id, req.title)}
                            className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold shadow-sm transition-all"
                          >
                            Authorize Payment (L3)
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      )}

      {/* ================= DESK 3: DEBT & CREDIT CONSOLE ================= */}
      {subDesk === 'gov_debt' && (
        <div className="space-y-6">
          <div className="portal-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Corporate Debt & Credit Aging Console</h3>
                <p className="text-xs text-slate-500">
                  Exclusive Level 3 authorization: Outstanding receivables, vendor payables, and debt aging reports.
                </p>
              </div>
              <button
                onClick={onOpenDraftModal}
                className="px-3.5 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-sm"
              >
                + Issue Debt / Credit Facility
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5 font-bold">Party Name / Ref</th>
                    <th className="px-5 py-3.5 font-bold">Classification</th>
                    <th className="px-5 py-3.5 font-bold">Principal</th>
                    <th className="px-5 py-3.5 font-bold">Remaining Balance</th>
                    <th className="px-5 py-3.5 font-bold">Due Date</th>
                    <th className="px-5 py-3.5 font-bold">Aging Bracket</th>
                    <th className="px-5 py-3.5 font-bold">Status</th>
                    <th className="px-5 py-3.5 font-bold">L3 Sanction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {debtAging.map((debt) => (
                    <tr key={debt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">{debt.partyName}</div>
                        <span className="text-[10px] text-slate-400 font-mono">{debt.contractRef}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                          debt.accountType === 'RECEIVABLE_CLIENT_DEBT' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}>
                          {debt.accountType === 'RECEIVABLE_CLIENT_DEBT' ? 'RECEIVABLE' : 'PAYABLE'}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono-num text-slate-700">₦{debt.principalAmount.toLocaleString()}</td>
                      <td className="px-5 py-4 font-mono-num font-black text-slate-900 text-sm">
                        ₦{debt.balanceRemaining.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-slate-600 font-medium">{debt.dueDate}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          debt.agingBracket === 'CURRENT' ? 'bg-slate-100 text-slate-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {debt.agingBracket.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          debt.status === 'ACTIVE_AMORTIZING' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}>
                          {debt.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600 text-[11px]">{debt.approvedByLevel3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= DESK 4: DELETION QUARANTINE ================= */}
      {subDesk === 'gov_quarantine' && (
        <div className="space-y-4">
          <div className="portal-card rounded-2xl p-5 border-l-4 border-l-purple-600 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Two-Person Audit Rule: Deletion Quarantine Vault</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a Level 2 Supervisor requests a deletion, it is placed in quarantine with mandatory written justification. Only a Level 3 Executive can authorize the permanent purge or restore the entry.
            </p>
          </div>

          {pendingApprovals.filter(p => p.category === 'DELETION_QUARANTINE').map((req) => (
            <div key={req.id} className="portal-card p-5 rounded-2xl border-l-4 border-l-purple-600 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="px-2 py-0.5 rounded font-bold text-[10px] uppercase font-mono bg-purple-100 text-purple-900">
                    DELETION QUARANTINE
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">{req.title}</h4>
                </div>
                <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">
                  Two-Person Hold
                </span>
              </div>
              <p className="text-xs text-slate-600">{req.description}</p>
              <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500">Initiated by: {req.initiatedBy}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onRejectItem(req.id, req.title)}
                    className="px-3.5 py-1.5 rounded-lg bg-white text-slate-700 border hover:bg-slate-50 font-semibold"
                  >
                    Restore Record
                  </button>
                  <button
                    onClick={() => onApproveItem(req.id, req.title)}
                    className="px-4 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold"
                  >
                    Authorize Permanent Purge (L3)
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= DESK 5: AUDIT TRAIL ================= */}
      {subDesk === 'gov_audit' && (
        <div className="space-y-4">
          <div className="portal-card rounded-2xl overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-700" />
                  Cryptographic Audit Trail (Append-Only)
                </h3>
                <p className="text-xs text-slate-500">
                  Every data creation, edit, soft-delete, or approval logs the exact user ID, timestamp, and IP address.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Tamper-Evident Ledger
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5 font-bold">Timestamp / ID</th>
                    <th className="px-5 py-3.5 font-bold">Action Type</th>
                    <th className="px-5 py-3.5 font-bold">Officer</th>
                    <th className="px-5 py-3.5 font-bold">Audit Remarks</th>
                    <th className="px-5 py-3.5 font-bold">IP Address</th>
                    <th className="px-5 py-3.5 font-bold">SHA-256 Hash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditTrail.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">{entry.id}</div>
                        <span className="text-[10px] text-slate-400 font-mono-num">{entry.timestamp}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[10px] font-bold">
                          {entry.action}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">{entry.performedBy}</div>
                        <span className="text-[10px] text-slate-500">({entry.roleLevel})</span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{entry.details}</td>
                      <td className="px-5 py-4 font-mono text-[11px] text-slate-500">
                        {entry.ipAddress || '192.168.1.1'}
                      </td>
                      <td className="px-5 py-4 font-mono text-[10px] text-slate-400">
                        {entry.hash.substring(0, 18)}...
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
