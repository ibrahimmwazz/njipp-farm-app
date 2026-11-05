'use client';

import React, { useState } from 'react';
import { UserRoleLevel, LivestockSection, ExpenseCategory } from '@/types';
import { X, Wheat, Coins, Stethoscope, FilePlus2, BarChart3, DollarSign, Receipt } from 'lucide-react';

interface ActionModalsProps {
  currentRole: UserRoleLevel;
  activeModal: string | null;
  onClose: () => void;
  onAddFeedLog: (data: { section: LivestockSection; pen: string; feedType: string; bags: number }) => void;
  onAddRemittance: (data: { vehiclePlate: string; driverName: string; target: number; remitted: number; paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'POS' }) => void;
  onAddMedical: (data: { section: LivestockSection; targetBatch: string; type: any; diagnosis: string; treatment: string; mortality: number; cost: number }) => void;
  onAddRequisition: (data: { category: any; title: string; description: string; amount: number; terms: string }) => void;
  onAddYield: (data: { section: LivestockSection; batchOrPen: string; yieldType: any; quantity: number; feedBags: number }) => void;
  onAddSale: (data: { section: LivestockSection; description: string; quantity: number; unitPrice: number; customer: string; paymentStatus: any }) => void;
  onAddExpense: (data: { division: any; category: ExpenseCategory; description: string; amount: number; vendor: string }) => void;
}

export const ActionModals: React.FC<ActionModalsProps> = ({
  currentRole,
  activeModal,
  onClose,
  onAddFeedLog,
  onAddRemittance,
  onAddMedical,
  onAddRequisition,
  onAddYield,
  onAddSale,
  onAddExpense,
}) => {
  // Feed Form State
  const [feedSection, setFeedSection] = useState<LivestockSection>('POULTRY');
  const [feedPen, setFeedPen] = useState('Pen 1 - North Wing (Layers)');
  const [feedType, setFeedType] = useState('Layer Mash 25kg');
  const [feedBags, setFeedBags] = useState(5);

  // Remit Form State
  const [selectedVehicle, setSelectedVehicle] = useState('FLEET-BUS-01');
  const [remitAmount, setRemitAmount] = useState(20000);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'BANK_TRANSFER' | 'POS'>('CASH');

  // Medical Form State
  const [medSection, setMedSection] = useState<LivestockSection>('CATTLE');
  const [medBatch, setMedBatch] = useState('Cattle Dairy Barn');
  const [medDiag, setMedDiag] = useState('Routine Tick Spray / Acaricide Dip');
  const [medTreatment, setMedTreatment] = useState('Applied Flumethrin pour-on 10ml');
  const [medMortality, setMedMortality] = useState(0);
  const [medCost, setMedCost] = useState(25000);

  // Requisition Form State
  const [reqCategory, setReqCategory] = useState<'PURCHASE_ORDER' | 'DEBT_ASSUMPTION'>('PURCHASE_ORDER');
  const [reqTitle, setReqTitle] = useState('Bulk Procurement of Animal Antibiotics & Vaccines');
  const [reqDesc, setReqDesc] = useState('Scheduled preventive healthcare stock replenishment.');
  const [reqAmount, setReqAmount] = useState(350000);
  const [reqTerms, setReqTerms] = useState('Net 14 Days Payment');

  // Yield Form State
  const [ydSection, setYdSection] = useState<LivestockSection>('POULTRY');
  const [ydBatch, setYdBatch] = useState('Pen 1 - North Wing (Layers)');
  const [ydType, setYdType] = useState<'EGGS_CRATES' | 'MILK_LITERS' | 'MEAT_LIVEWEIGHT'>('EGGS_CRATES');
  const [ydQty, setYdQty] = useState(68);
  const [ydFeedConsumed, setYdFeedConsumed] = useState(14);

  // Sale Form State
  const [saleSection, setSaleSection] = useState<LivestockSection>('POULTRY');
  const [saleDesc, setSaleDesc] = useState('Wholesale Fresh Farm Eggs (100 Crates)');
  const [saleQty, setSaleQty] = useState(100);
  const [salePrice, setSalePrice] = useState(3800);
  const [saleCustomer, setSaleCustomer] = useState('Royal Confectioneries Ltd');
  const [saleStatus, setSaleStatus] = useState<'PAID' | 'CREDIT_PENDING_L3'>('PAID');

  // Expense Form State
  const [expDiv, setExpDiv] = useState<'LIVESTOCK_FARM' | 'TRANSPORT_SERVICES' | 'EXECUTIVE_OPS'>('LIVESTOCK_FARM');
  const [expCategory, setExpCategory] = useState<ExpenseCategory>('FEED_PURCHASE');
  const [expDesc, setExpDesc] = useState('Bulk Purchase of Starter Mash Bags');
  const [expAmount, setExpAmount] = useState(95000);
  const [expVendor, setExpVendor] = useState('Premier Feed Mills');

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* 1. FEED LOG MODAL */}
      {activeModal === 'FEED_LOG' && (
        <div className="bg-white max-w-lg w-full rounded-2xl p-6 border border-slate-200 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Wheat className="w-5 h-5 text-emerald-700" />
              <span>Record Farm Feeding & Auto-Deduct Stock</span>
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAddFeedLog({
                section: feedSection,
                pen: feedPen,
                feedType,
                bags: Number(feedBags),
              });
              onClose();
            }}
            className="space-y-3.5 text-xs"
          >
            <div>
              <label className="block text-slate-700 font-bold mb-1">Livestock Division</label>
              <select
                value={feedSection}
                onChange={(e) => setFeedSection(e.target.value as LivestockSection)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              >
                <option value="POULTRY">Poultry (Layers / Broilers)</option>
                <option value="SHEEP">Sheep Section</option>
                <option value="GOATS">Goat Section</option>
                <option value="CATTLE">Cattle Barns / Ranches</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Pen / Paddock Location</label>
              <input
                type="text"
                value={feedPen}
                onChange={(e) => setFeedPen(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Feed Formulation / SKU</label>
                <input
                  type="text"
                  value={feedType}
                  onChange={(e) => setFeedType(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Quantity (Bags)</label>
                <input
                  type="number"
                  value={feedBags}
                  onChange={(e) => setFeedBags(Number(e.target.value))}
                  min={1}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-emerald-800 font-mono-num font-bold text-sm"
                />
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-[11px] leading-relaxed">
              📦 <strong>Automatic Inventory Coupler:</strong> Submitting will automatically deduct <strong>{feedBags} bags</strong> from the Central Warehouse stock ledger and record an unalterable audit log.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 rounded-xl text-white font-bold shadow-sm"
              >
                Save & Deduct Stock
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. REMITTANCE MODAL */}
      {activeModal === 'REMITTANCE' && (
        <div className="bg-white max-w-lg w-full rounded-2xl p-6 border border-slate-200 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Coins className="w-5 h-5 text-blue-700" />
              <span>Log Driver Daily Remittance</span>
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const isBus = selectedVehicle === 'FLEET-BUS-01';
              const isTrike = selectedVehicle === 'FLEET-TRK-01';
              const target = isBus ? 20000 : isTrike ? 10000 : 6000;
              const plate = isBus ? 'KSF-842-XB' : isTrike ? 'ABJ-319-TR' : 'KD-441-MC';
              const driver = isBus ? 'Ibrahim Danladi' : isTrike ? 'Sunday Eze' : 'Garba Yakubu';

              onAddRemittance({
                vehiclePlate: plate,
                driverName: driver,
                target,
                remitted: Number(remitAmount),
                paymentMethod,
              });
              onClose();
            }}
            className="space-y-3.5 text-xs"
          >
            <div>
              <label className="block text-slate-700 font-bold mb-1">Assigned Vehicle & Driver</label>
              <select
                value={selectedVehicle}
                onChange={(e) => {
                  setSelectedVehicle(e.target.value);
                  const isBus = e.target.value === 'FLEET-BUS-01';
                  const isTrike = e.target.value === 'FLEET-TRK-01';
                  setRemitAmount(isBus ? 20000 : isTrike ? 10000 : 6000);
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              >
                <option value="FLEET-BUS-01">Toyota Coaster Bus (KSF-842-XB) — Ibrahim Danladi [Target: ₦20,000]</option>
                <option value="FLEET-TRK-01">TVS King Trike (ABJ-319-TR) — Sunday Eze [Target: ₦10,000]</option>
                <option value="FLEET-MC-01">Bajaj Motorcycle (KD-441-MC) — Garba Yakubu [Target: ₦6,000]</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Expected Daily Target (₦)</label>
                <input
                  type="text"
                  value={
                    selectedVehicle === 'FLEET-BUS-01'
                      ? '₦20,000'
                      : selectedVehicle === 'FLEET-TRK-01'
                      ? '₦10,000'
                      : '₦6,000'
                  }
                  readOnly
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-700 font-mono-num font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Actual Remitted (₦)</label>
                <input
                  type="number"
                  value={remitAmount}
                  onChange={(e) => setRemitAmount(Number(e.target.value))}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-emerald-800 font-mono-num font-black text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              >
                <option value="CASH">Cash Handover (Verified by Yard Cashier)</option>
                <option value="BANK_TRANSFER">Direct Bank Transfer to NJIPP Account</option>
                <option value="POS">POS Terminal Settlement</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-700 hover:bg-blue-800 rounded-xl text-white font-bold shadow-sm"
              >
                Post Remittance
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. YIELD COLLECTION MODAL (FCR ANALYSIS) */}
      {activeModal === 'YIELD_LOG' && (
        <div className="bg-white max-w-lg w-full rounded-2xl p-6 border border-slate-200 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-700" />
              <span>Log Daily Yield Collection & FCR Index</span>
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAddYield({
                section: ydSection,
                batchOrPen: ydBatch,
                yieldType: ydType,
                quantity: Number(ydQty),
                feedBags: Number(ydFeedConsumed),
              });
              onClose();
            }}
            className="space-y-3.5 text-xs"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Division</label>
                <select
                  value={ydSection}
                  onChange={(e) => setYdSection(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                >
                  <option value="POULTRY">Poultry</option>
                  <option value="CATTLE">Cattle (Dairy/Beef)</option>
                  <option value="SHEEP">Sheep</option>
                  <option value="GOATS">Goats</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Yield Metric</label>
                <select
                  value={ydType}
                  onChange={(e) => setYdType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                >
                  <option value="EGGS_CRATES">Eggs (Crates)</option>
                  <option value="MILK_LITERS">Milk (Liters)</option>
                  <option value="MEAT_LIVEWEIGHT">Meat Liveweight (Kg)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Pen / Paddock Batch</label>
              <input
                type="text"
                value={ydBatch}
                onChange={(e) => setYdBatch(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Yield Quantity</label>
                <input
                  type="number"
                  value={ydQty}
                  onChange={(e) => setYdQty(Number(e.target.value))}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-emerald-800 font-mono-num font-bold text-sm"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Feed Consumed (Bags)</label>
                <input
                  type="number"
                  value={ydFeedConsumed}
                  onChange={(e) => setYdFeedConsumed(Number(e.target.value))}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono-num font-bold"
                />
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-[11px]">
              📊 <strong>Automated FCR Engine:</strong> Correlates input feed ratio against output yield to flag feed diversion or feed waste.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 rounded-xl text-white font-bold"
              >
                Save Yield Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. LIVESTOCK SALE MODAL */}
      {activeModal === 'LIVESTOCK_SALE' && (
        <div className="bg-white max-w-lg w-full rounded-2xl p-6 border border-slate-200 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-700" />
              <span>Record Direct Livestock / Produce Sale</span>
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAddSale({
                section: saleSection,
                description: saleDesc,
                quantity: Number(saleQty),
                unitPrice: Number(salePrice),
                customer: saleCustomer,
                paymentStatus: saleStatus,
              });
              onClose();
            }}
            className="space-y-3.5 text-xs"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Division</label>
                <select
                  value={saleSection}
                  onChange={(e) => setSaleSection(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                >
                  <option value="POULTRY">Poultry (Eggs/Meat)</option>
                  <option value="SHEEP">Sheep (Live Rams)</option>
                  <option value="GOATS">Goats</option>
                  <option value="CATTLE">Cattle (Milk/Beef)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Payment Status</label>
                <select
                  value={saleStatus}
                  onChange={(e) => setSaleStatus(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                >
                  <option value="PAID">Paid in Full (Cash/Bank)</option>
                  <option value="CREDIT_PENDING_L3">Credit Sale (Awaiting Level 3 Approval)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Sale Description</label>
              <input
                type="text"
                value={saleDesc}
                onChange={(e) => setSaleDesc(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Customer / Merchant Name</label>
              <input
                type="text"
                value={saleCustomer}
                onChange={(e) => setSaleCustomer(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Quantity</label>
                <input
                  type="number"
                  value={saleQty}
                  onChange={(e) => setSaleQty(Number(e.target.value))}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono-num font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Unit Price (₦)</label>
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono-num font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 rounded-xl text-white font-bold"
              >
                Post Sale Entry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. FIELD EXPENSE & RECEIPT MODAL */}
      {activeModal === 'EXPENSE_LOG' && (
        <div className="bg-white max-w-lg w-full rounded-2xl p-6 border border-slate-200 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-indigo-700" />
              <span>Record Categorized Field Expense & Receipt</span>
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAddExpense({
                division: expDiv,
                category: expCategory,
                description: expDesc,
                amount: Number(expAmount),
                vendor: expVendor,
              });
              onClose();
            }}
            className="space-y-3.5 text-xs"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Division</label>
                <select
                  value={expDiv}
                  onChange={(e) => setExpDiv(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                >
                  <option value="LIVESTOCK_FARM">Livestock Farm</option>
                  <option value="TRANSPORT_SERVICES">Transport Services</option>
                  <option value="EXECUTIVE_OPS">Executive Operations</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Category</label>
                <select
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                >
                  <option value="FEED_PURCHASE">Feed Purchase</option>
                  <option value="FUEL_LOGISTICS">Fuel Logistics</option>
                  <option value="SPARE_PARTS">Spare Parts</option>
                  <option value="VET_SUPPLIES">Vet Supplies</option>
                  <option value="STAFF_SALARIES">Staff Salaries</option>
                  <option value="UTILITIES_FACILITY">Utilities & Facility</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Expense Description</label>
              <input
                type="text"
                value={expDesc}
                onChange={(e) => setExpDesc(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Vendor / Payee</label>
                <input
                  type="text"
                  value={expVendor}
                  onChange={(e) => setExpVendor(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Amount (₦)</label>
                <input
                  type="number"
                  value={expAmount}
                  onChange={(e) => setExpAmount(Number(e.target.value))}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono-num font-bold"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-[11px] flex items-center justify-between">
              <span className="font-semibold">Receipt Image / Photo Proof:</span>
              <span className="text-emerald-700 font-bold font-mono">Captured (Simulated)</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-700 hover:bg-indigo-800 rounded-xl text-white font-bold"
              >
                Submit Expense Log
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 6. MEDICAL LOG MODAL */}
      {activeModal === 'MEDICAL_LOG' && (
        <div className="bg-white max-w-lg w-full rounded-2xl p-6 border border-slate-200 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-emerald-700" />
              <span>Log Veterinary Care / Medical Record</span>
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAddMedical({
                section: medSection,
                targetBatch: medBatch,
                type: 'TREATMENT',
                diagnosis: medDiag,
                treatment: medTreatment,
                mortality: Number(medMortality),
                cost: Number(medCost),
              });
              onClose();
            }}
            className="space-y-3.5 text-xs"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Division</label>
                <select
                  value={medSection}
                  onChange={(e) => setMedSection(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                >
                  <option value="POULTRY">Poultry</option>
                  <option value="SHEEP">Sheep</option>
                  <option value="GOATS">Goats</option>
                  <option value="CATTLE">Cattle</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Target Batch / Pen</label>
                <input
                  type="text"
                  value={medBatch}
                  onChange={(e) => setMedBatch(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Clinical Event / Diagnosis</label>
              <input
                type="text"
                value={medDiag}
                onChange={(e) => setMedDiag(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Prescribed Treatment / Vaccine</label>
              <input
                type="text"
                value={medTreatment}
                onChange={(e) => setMedTreatment(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Mortality Count</label>
                <input
                  type="number"
                  value={medMortality}
                  onChange={(e) => setMedMortality(Number(e.target.value))}
                  min={0}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono-num"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Cost of Drugs / Vet Fee (₦)</label>
                <input
                  type="number"
                  value={medCost}
                  onChange={(e) => setMedCost(Number(e.target.value))}
                  min={0}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono-num font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 rounded-xl text-white font-bold"
              >
                Log Medical Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 7. REQUISITION / DEBT MODAL */}
      {activeModal === 'REQUISITION' && (
        <div className="bg-white max-w-lg w-full rounded-2xl p-6 border border-slate-200 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FilePlus2 className="w-5 h-5 text-indigo-700" />
              <span>Draft Purchase / Debt Requisition</span>
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAddRequisition({
                category: reqCategory,
                title: reqTitle,
                description: reqDesc,
                amount: Number(reqAmount),
                terms: reqTerms,
              });
              onClose();
            }}
            className="space-y-3.5 text-xs"
          >
            <div>
              <label className="block text-slate-700 font-bold mb-1">Requisition Type</label>
              <select
                value={reqCategory}
                onChange={(e) => setReqCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              >
                <option value="PURCHASE_ORDER">Purchase Order / Farm Input Procurement</option>
                <option value="DEBT_ASSUMPTION">Debt Assumption / Hire-Purchase Liability</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Title</label>
              <input
                type="text"
                value={reqTitle}
                onChange={(e) => setReqTitle(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Operational Justification</label>
              <textarea
                value={reqDesc}
                onChange={(e) => setReqDesc(e.target.value)}
                rows={2}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Requested Amount (₦)</label>
                <input
                  type="number"
                  value={reqAmount}
                  onChange={(e) => setReqAmount(Number(e.target.value))}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-mono-num font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Repayment Terms</label>
                <input
                  type="text"
                  value={reqTerms}
                  onChange={(e) => setReqTerms(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 text-[11px] leading-relaxed">
              🛡️ <strong>Level 3 Gate Notice:</strong> Under NJIPP KONSULT bylaws, this draft enters the <code>PENDING_APPROVAL</code> queue and can only be authorized by Level 3 Executive command.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-700 hover:bg-indigo-800 rounded-xl text-white font-bold"
              >
                Submit for L3 Sanction
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
