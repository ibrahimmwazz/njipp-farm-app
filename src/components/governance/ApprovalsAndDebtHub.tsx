'use client';

import React from 'react';
import { UserRoleLevel, PendingApprovalItem, AuditTrailEntry } from '@/types';
import {
  ShieldAlert,
  Scale,
  CheckCircle2,
  XCircle,
  FileText,
  AlertOctagon,
  Clock,
  Lock,
  Plus,
  Trash2,
  KeyRound
} from 'lucide-react';

interface ApprovalsAndDebtHubProps {
  currentRole: UserRoleLevel;
  pendingApprovals: PendingApprovalItem[];
  auditTrail: AuditTrailEntry[];
  onApproveItem: (id: string, name: string) => void;
  onRejectItem: (id: string, name: string) => void;
  onOpenDraftModal: () => void;
}

export const ApprovalsAndDebtHub: React.FC<ApprovalsAndDebtHubProps> = ({
  currentRole,
  pendingApprovals,
  auditTrail,
  onApproveItem,
  onRejectItem,
  onOpenDraftModal,
}) => {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Executive Governance & Approval Gate</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-mono font-medium uppercase">
              Level 3 Gatekeeper
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sole authority for company debt incurrence, capital purchase requisitions, and permanent record purge under NJIPP KONSULT bylaws.
          </p>
        </div>

        <button
          onClick={onOpenDraftModal}
          className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Draft New Requisition</span>
        </button>
      </div>

      {/* LEVEL 3 BYLAW BANNER */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/50 border border-indigo-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xl shrink-0">
            ⚖️
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>NJIPP Fiscal & Corporate Governance Protocol</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono">
                Active Policy
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              <strong>Level 3 (Executive / Managing Director)</strong> holds exclusive constitutional sign-off for debts, loan commitments, purchase orders &gt; ₦50,000, and permanent deletion of archived data.
            </p>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end shrink-0 text-xs">
          <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            ISO-Audit Compliant
          </span>
          <span className="text-[10px] text-slate-500">Append-Only Cryptographic Log</span>
        </div>
      </div>

      {/* PENDING APPROVAL REQUISITIONS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Requisitions Requiring Sanction ({pendingApprovals.length})
          </h3>
          {currentRole !== 'LEVEL_3' && (
            <span className="text-xs text-amber-400 font-medium flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
              <Lock className="w-3.5 h-3.5" />
              Viewing in Read/Draft Mode — Level 3 Signature Required
            </span>
          )}
        </div>

        {pendingApprovals.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center border border-slate-800 text-slate-400 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">All Requisitions Cleared</h4>
            <p className="text-xs text-slate-500">No pending debt, purchase or deletion tickets.</p>
          </div>
        ) : (
          pendingApprovals.map((req) => {
            const isDebt = req.category === 'DEBT_ASSUMPTION';
            const isPur = req.category === 'PURCHASE_ORDER';
            const isDel = req.category === 'DELETION_QUARANTINE';

            return (
              <div
                key={req.id}
                className={`glass-panel p-5 rounded-2xl border-l-4 space-y-3 transition-all ${
                  isDebt
                    ? 'border-rose-500'
                    : isPur
                    ? 'border-amber-500'
                    : 'border-purple-500'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase font-mono ${
                          isDebt
                            ? 'bg-rose-500/20 text-rose-300'
                            : isPur
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-purple-500/20 text-purple-300'
                        }`}
                      >
                        {req.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{req.id}</span>
                      <span className="text-xs text-slate-500">• {req.department}</span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-1.5">{req.title}</h4>
                  </div>

                  <div className="text-left sm:text-right">
                    {req.amount && (
                      <div
                        className={`text-xl font-bold font-mono-num ${
                          isDebt ? 'text-rose-400' : 'text-amber-400'
                        }`}
                      >
                        ₦{req.amount.toLocaleString()}
                      </div>
                    )}
                    {req.repaymentTerms && (
                      <span className="text-[10px] text-slate-400 font-medium">
                        {req.repaymentTerms}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{req.description}</p>

                {req.supervisorEndorsement && (
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">Supervisor Endorsement:</span>
                    <span>{req.supervisorEndorsement}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-slate-800/80 text-xs gap-3">
                  <div className="text-slate-400 text-[11px]">
                    Initiated by: <strong className="text-slate-200">{req.initiatedBy}</strong> ({req.initiatorLevel})
                  </div>

                  <div className="flex items-center gap-2">
                    {currentRole !== 'LEVEL_3' ? (
                      <div className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Requires Level 3 Sign-Off</span>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => onRejectItem(req.id, req.title)}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 font-semibold border border-rose-500/30 transition-all"
                        >
                          Reject Requisition
                        </button>
                        <button
                          onClick={() => onApproveItem(req.id, req.title)}
                          className={`px-4 py-1.5 rounded-lg text-white font-semibold shadow-md transition-all ${
                            isDebt
                              ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
                              : isDel
                              ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/30'
                              : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                          }`}
                        >
                          {isDebt
                            ? 'Approve Debt (L3)'
                            : isDel
                            ? 'Authorize Deletion (L3)'
                            : 'Approve Payment (L3)'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* IMMUTABLE AUDIT TRAIL LOG */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              Cryptographic Audit Trail (Append-Only)
            </h3>
            <p className="text-xs text-slate-400">
              Un-editable record of all approvals, stock movements, and soft-delete events.
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-bold">100% Tamper-Evident</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Timestamp / ID</th>
                <th className="px-4 py-3">Action Type</th>
                <th className="px-4 py-3">Officer</th>
                <th className="px-4 py-3">Details & Audit Remarks</th>
                <th className="px-4 py-3">Verification Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {auditTrail.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-medium text-white">
                    <div>{entry.id}</div>
                    <span className="text-[10px] text-slate-500 font-mono-num">{entry.timestamp}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                      {entry.action}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-white font-medium">{entry.performedBy}</span>
                    <span className="text-[10px] text-slate-500 block">({entry.roleLevel})</span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{entry.details}</td>
                  <td className="px-4 py-3 font-mono text-[10px] text-slate-500">
                    {entry.hash.substring(0, 18)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
