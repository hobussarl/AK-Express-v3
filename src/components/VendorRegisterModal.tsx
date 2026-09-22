import React, { useState } from 'react';
import { X } from 'lucide-react';

interface VendorRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VendorRegisterModal: React.FC<VendorRegisterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Register Your Kitchen</h2>
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Kitchen / Vendor Name</label>
            <input type="text" required className="mt-1 w-full border border-slate-300 rounded-lg p-2 text-sm" placeholder="e.g. Mama Amaka's Kitchen" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Phone / Mobile Money Number</label>
            <input type="tel" required className="mt-1 w-full border border-slate-300 rounded-lg p-2 text-sm" placeholder="6xxxxxxxx" />
          </div>
          <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-sm transition-colors">
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
};