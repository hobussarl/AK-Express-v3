import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';
import ShareButton from '@/components/ShareButton';
import { VendorRegisterModal } from '@/components/VendorRegisterModal';
import { Languages, ChefHat } from 'lucide-react';

function Header() {
  const { lang, setLang, t } = useLang();
  const isEn = lang === 'en';
  const [vendorModalOpen, setVendorModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFFDF5]/95 backdrop-blur-md border-b border-amber-100">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#B91C1C] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">AK</span>
            </div>
            <div className="leading-tight">
              <h1 className="text-[#1E293B] font-bold text-sm tracking-tight">
                Achu & Kati-Kati
              </h1>
              <p className="text-amber-600 text-[10px] font-medium">Express</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setVendorModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-full text-[11px] shadow-sm shadow-amber-500/30 transition-all active:scale-95 shrink-0"
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{t.navVendor}</span>
              <span className="xs:hidden">{t.navVendor}</span>
            </button>
            <ShareButton />
            <div className="flex items-center gap-1 bg-white rounded-full border border-amber-200 p-0.5 shadow-sm">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  isEn
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-500 hover:text-amber-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  !isEn
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-500 hover:text-amber-600'
                }`}
              >
                FR
              </button>
              <Languages className="w-3.5 h-3.5 text-amber-400 mr-1" />
            </div>
          </div>
        </div>
      </header>
      <VendorRegisterModal
        isOpen={vendorModalOpen}
        onClose={() => setVendorModalOpen(false)}
      />
    </>
  );
}

export { Header };
export default Header;
