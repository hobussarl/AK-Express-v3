import React from 'react';
import { useLang } from '../context/LanguageContext';
import { Languages, ChefHat } from 'lucide-react';
import ShareButton from './ShareButton';

interface HeaderProps {
  onOpenVendorModal?: () => void;
}

export function Header({ onOpenVendorModal }: HeaderProps) {
  const { lang, setLang } = useLang();
  const isEn = lang === 'en';

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF5]/95 backdrop-blur-md border-b border-amber-100/80 shadow-sm">
      <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center shadow-md shadow-red-900/10 ring-2 ring-amber-200/50">
            <span className="text-white font-black text-sm tracking-tight">AK</span>
          </div>
          <div className="leading-tight">
            <h1 className="text-slate-900 font-extrabold text-sm tracking-tight">
              Achu & Kati-Kati
            </h1>
            <p className="text-amber-600 text-[10px] font-bold tracking-wider uppercase">
              Express
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Become a Cook Button */}
          <button
            onClick={onOpenVendorModal}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-sm hover:shadow active:scale-95"
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Become a Cook</span>
          </button>

          {/* Share Button */}
          <ShareButton />

          {/* Language Switcher Toggle */}
          <div className="flex items-center bg-amber-50 rounded-full border border-amber-200/80 p-0.5 shadow-inner">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-black transition-all ${
                isEn
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-amber-700'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-black transition-all ${
                !isEn
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-amber-700'
              }`}
            >
              FR
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;