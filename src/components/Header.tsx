import React from 'react';
import { useLang } from '../context/LanguageContext';
import { Share2, Languages, ChefHat } from 'lucide-react';

interface HeaderProps {
  onOpenVendorModal?: () => void;
}

export function Header({ onOpenVendorModal }: HeaderProps) {
  const { lang, setLang } = useLang();
  const isEn = lang === 'en';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Achu & Kati-Kati Express',
          text: 'Order authentic Bamenda-style Achu & Kati-Kati in Douala!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF5]/95 backdrop-blur-md border-b border-amber-100/80 px-3 py-2">
      <div className="max-w-md mx-auto flex items-center justify-between gap-1.5">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#B91C1C] flex items-center justify-center shadow-sm shrink-0">
            <span className="text-white font-bold text-xs">AK</span>
          </div>
          <div className="leading-none">
            <h1 className="text-[#1E293B] font-bold text-xs tracking-tight">
              Achu & Kati-Kati
            </h1>
            <p className="text-amber-600 text-[9px] font-medium mt-0.5">Express</p>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-1.5">
          {/* Become a Cook Trigger */}
          {onOpenVendorModal && (
            <button
              onClick={onOpenVendorModal}
              className="px-2 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-[10px] transition-colors flex items-center gap-1 shadow-sm shrink-0"
              title="Become a Cook"
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Become a Cook</span>
            </button>
          )}

          {/* Original Share App Button */}
          <button
            onClick={handleShare}
            className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1 shadow-sm leading-tight text-left shrink-0"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="text-[10px] font-extrabold leading-none">
              Share<br />App
            </span>
          </button>

          {/* Original EN | FR Language Toggle */}
          <div className="flex items-center gap-1 border border-amber-200/80 rounded-full px-2 py-1 bg-white shadow-sm shrink-0">
            <button
              onClick={() => setLang('en')}
              className={`text-[10px] font-bold transition-colors ${
                isEn ? 'text-amber-600' : 'text-slate-400'
              }`}
            >
              EN
            </button>
            <span className="text-slate-300 text-[10px]">|</span>
            <button
              onClick={() => setLang('fr')}
              className={`text-[10px] font-bold transition-colors ${
                !isEn ? 'text-amber-600' : 'text-slate-400'
              }`}
            >
              FR
            </button>
            <Languages className="w-3 h-3 text-amber-400 ml-0.5" />
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;