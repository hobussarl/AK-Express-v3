import React, { useState } from 'react';
import { X, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

interface VendorRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VendorRegisterModal: React.FC<VendorRegisterModalProps> = ({ isOpen, onClose }) => {
  const [agreedToStrikePolicy, setAgreedToStrikePolicy] = useState(false);
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToStrikePolicy || !agreedToDisclaimer) {
      alert("Please review and accept the vendor platform policies to register.");
      return;
    }
    alert("Registration submitted! Our team will verify your kitchen details shortly.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5 border-b pb-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
            👨‍🍳
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Register Your Kitchen</h2>
            <p className="text-xs text-slate-500">Join Douala's premier Achu & Kati-Kati Express vendor network</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Details */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Kitchen / Vendor Name</label>
            <input type="text" required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="e.g. Mama Njoh's Kitchen" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Quarter / Location</label>
              <input type="text" required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="e.g. Makepe, Douala" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Momo / Phone Number</label>
              <input type="tel" required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="6xxxxxxxx" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Specialty Dishes Offered</label>
            <input type="text" required className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="e.g. Freshly Pounded Achu (Yellow/Black Soup), Kati-Kati" />
          </div>

          {/* Policy Box 1: 3-Strike Policy */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>3-Strike Delivery & Order Fulfillment Policy</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              To maintain quality and trust, any vendor who accepts an order but fails to prepare or deliver it properly <strong>three (3) times</strong> will be automatically suspended and struck off the Achu & Kati-Kati Express marketplace.
            </p>
            <label className="flex items-start gap-2 pt-1 cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreedToStrikePolicy}
                onChange={(e) => setAgreedToStrikePolicy(e.target.checked)}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500" 
                required
              />
              <span className="text-amber-950 font-medium">I understand and accept the 3-Strike Strike-Off Policy.</span>
            </label>
          </div>

          {/* Policy Box 2: Platform Commission & Disclaimer */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <FileText className="w-4 h-4 text-slate-600 shrink-0" />
              <span>Platform Terms & Commission Disclaimer</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Vendors agree to a <strong>15% platform commission</strong> deducted directly from item menu prices upon successful escrow payout. Customers pay mobile money transaction fees separately. Vendors must maintain food hygiene and accuracy.
            </p>
            <label className="flex items-start gap-2 pt-1 cursor-pointer">
              <input 
                type="checkbox" 
                checked={agreedToDisclaimer}
                onChange={(e) => setAgreedToDisclaimer(e.target.checked)}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500" 
                required
              />
              <span className="text-slate-800 font-medium">I accept the 15% platform commission terms and food quality guidelines.</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-[0.99] mt-2 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Complete Kitchen Registration
          </button>
        </form>
      </div>
    </div>
  );
};