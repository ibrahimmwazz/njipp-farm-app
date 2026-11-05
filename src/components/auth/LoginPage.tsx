'use client';

import React, { useState } from 'react';
import {
  Wheat,
  Truck,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  User,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  ClipboardList,
  AlertCircle
} from 'lucide-react';
import { UserSession, UserRoleLevel } from '@/types';

interface LoginPageProps {
  onLogin: (session: UserSession) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRoleLevel>('LEVEL_3');
  const [username, setUsername] = useState('ibrahim.md@njippkonsult.ng');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [showManualLogin, setShowManualLogin] = useState(false);

  // 3 Clear User Profiles
  const profiles: Record<UserRoleLevel, UserSession> = {
    LEVEL_1: {
      id: 'USR-STAFF-01',
      name: 'Musa Bello',
      role: 'LEVEL_1',
      roleTitle: 'Farm & Fleet Field Staff',
      department: 'Daily Operations & Store',
    },
    LEVEL_2: {
      id: 'USR-SUP-02',
      name: 'Kabiru Sanusi',
      role: 'LEVEL_2',
      roleTitle: 'Operations Supervisor',
      department: 'Farm & Transport Supervision',
    },
    LEVEL_3: {
      id: 'USR-MD-03',
      name: 'Ibrahim J.',
      role: 'LEVEL_3',
      roleTitle: 'Managing Director & Owner',
      department: 'Executive Management & Board',
    },
  };

  const handleSelectRole = (role: UserRoleLevel) => {
    setSelectedRole(role);
    if (role === 'LEVEL_1') {
      setUsername('musa.bello@njippkonsult.ng');
      setPassword('staff#pass2026');
    } else if (role === 'LEVEL_2') {
      setUsername('kabiru.sanusi@njippkonsult.ng');
      setPassword('supervisor#pass2026');
    } else {
      setUsername('ibrahim.md@njippkonsult.ng');
      setPassword('director#pass2026');
    }
  };

  const handleDirectLogin = (role: UserRoleLevel) => {
    setSelectedRole(role);
    onLogin(profiles[role]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(profiles[selectedRole]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-10 font-sans">
      
      {/* BACKGROUND ACCENT */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl relative z-10 space-y-8">
        
        {/* BRANDING HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-slate-900 text-white shadow-lg ring-4 ring-emerald-500/10 font-black text-2xl tracking-wider">
            NK
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              NJIPP KONSULT LTD
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
              Farm & Business Management System
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Select your role below to log in directly, or click to enter with your account.
            </p>
          </div>
        </div>

        {/* 3 SIMPLE ROLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: FIELD STAFF */}
          <div
            onClick={() => handleSelectRole('LEVEL_1')}
            className={`cursor-pointer rounded-3xl p-6 sm:p-7 border transition-all duration-200 flex flex-col justify-between space-y-6 ${
              selectedRole === 'LEVEL_1'
                ? 'bg-white border-blue-400 shadow-md ring-2 ring-blue-500/10'
                : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:shadow-xs'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Wheat className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Level 1 • Staff
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Farm & Fleet Field Staff
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Worker: <strong>Musa Bello</strong> • <em>Primary Data Entry Station</em>
                </p>
              </div>

              <div className="text-xs text-slate-600 space-y-2 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <p className="font-semibold text-slate-800">What you can do here:</p>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside text-[11px]">
                  <li>Register new animals (Cattle, Rams, Goats, Rabbits, Poultry, Waterfowl)</li>
                  <li>Live counts & casualty tracking across all 6 units</li>
                  <li>Record direct sales of animals and produce</li>
                  <li>Record driver cash returns, fuel receipts & vehicle repairs</li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDirectLogin('LEVEL_1');
              }}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <span>Log In as Field Staff</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* CARD 2: SUPERVISOR */}
          <div
            onClick={() => handleSelectRole('LEVEL_2')}
            className={`cursor-pointer rounded-3xl p-6 sm:p-7 border transition-all duration-200 flex flex-col justify-between space-y-6 ${
              selectedRole === 'LEVEL_2'
                ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-500/10'
                : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:shadow-xs'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Level 2 • Supervisor
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Operations Supervisor
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Supervisor: <strong>Kabiru Sanusi</strong> • <em>Verification & Radar Desk</em>
                </p>
              </div>

              <div className="text-xs text-slate-600 space-y-2 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <p className="font-semibold text-slate-800">What you can do here:</p>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside text-[11px]">
                  <li>Review & verify daily staff field entries</li>
                  <li>Check high vehicle fuel usage & efficiency flags</li>
                  <li>Track unpaid driver daily remittance arrears</li>
                  <li>Monitor sick animal treatments & clinical holds</li>
                  <li>Manage two-person delete quarantine requests</li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDirectLogin('LEVEL_2');
              }}
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <span>Log In as Supervisor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* CARD 3: OWNER / EXECUTIVE */}
          <div
            onClick={() => handleSelectRole('LEVEL_3')}
            className={`cursor-pointer rounded-3xl p-6 sm:p-7 border transition-all duration-200 flex flex-col justify-between space-y-6 ${
              selectedRole === 'LEVEL_3'
                ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/10'
                : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:shadow-xs'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Level 3 • Owner / MD
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Owner & Managing Director
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Executive: <strong>Ibrahim J.</strong> • <em>P&L & Financial Ledger</em>
                </p>
              </div>

              <div className="text-xs text-slate-600 space-y-2 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <p className="font-semibold text-slate-800">What you can do here:</p>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside text-[11px]">
                  <li>Full 13-column Animal Production Inventory & Financial Ledger</li>
                  <li>Subtotals across Units A–F, Unit Costs & Net Profit / Loss</li>
                  <li>Approve purchase requisitions & TVS debt facilities</li>
                  <li>Two-person deletion quarantine vault & audit trail</li>
                  <li>Strategic ventures (Viewing Centre, Water, Crops & Agroforestry)</li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDirectLogin('LEVEL_3');
              }}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <span>Log In as Owner / MD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* OPTIONAL MANUAL LOGIN TOGGLE */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setShowManualLogin(!showManualLogin)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline decoration-slate-300"
          >
            {showManualLogin ? '▲ Hide manual email & password inputs' : '▼ Enter with specific email & password'}
          </button>
        </div>

        {/* MANUAL LOGIN EXPANDABLE BOX */}
        {showManualLogin && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900">
              Sign In with Credentials
            </h4>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold text-xs mb-1">
                  Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-10 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer"
              >
                Sign In Now
              </button>
            </form>
          </div>
        )}

      </div>

    </div>
  );
};
