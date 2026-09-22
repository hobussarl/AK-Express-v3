import React, { useState, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';
import { Header } from '../components/Header';
import ShareButton from '../components/ShareButton';
import { VendorRegisterModal } from '../components/VendorRegisterModal';
import { getVendorImage, HERO_IMAGE } from '@/lib/images';
import { formatXaf } from '@/lib/pricing';
import { MOCK_VENDORS } from '@/lib/mockVendors';
import {
  Search,
  Utensils,
  Truck,
  ShieldCheck,
  Star,
  Clock,
  Flame,
  MapPin,
  ChevronRight,
  Soup,
  Drumstick,
  LayoutGrid,
  BadgeCheck,
  ChevronDown,
  Check,
} from 'lucide-react';

type CategoryFilter = 'all' | 'achu' | 'kati_kati' | 'full_menu';

interface Props {
  onOrder: (vendor: any) => void;
}

export default function HomePage({ onOrder }: Props) {
  const { t } = useLang();
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);

  useEffect(() => {
    setVendors(MOCK_VENDORS);
    setLoading(false);
  }, []);

  const filtered = vendors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.quarter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'achu') return v.servesAchu;
    if (selectedCategory === 'kati_kati') return v.servesKatiKati;
    if (selectedCategory === 'full_menu') return v.servesAchu && v.servesKatiKati;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF5] pb-24">
      {/* Header with Vendor Modal Trigger */}
      <Header onOpenVendorModal={() => setIsVendorModalOpen(true)} />

      {/* Hero / Banner */}
      <div className="px-5 pt-4 pb-2">
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-amber-100 bg-amber-900 min-h-[140px] flex items-center p-5">
          <img
            src={HERO_IMAGE}
            alt="Achu Special"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative z-10 max-w-[220px]">
            <span className="inline-block px-2 py-0.5 bg-amber-500 text-white font-bold text-[10px] rounded-full uppercase tracking-wider mb-1">
              Fresh Daily
            </span>
            <h2 className="text-white font-bold text-lg leading-tight mb-1">
              Authentic Douala Delicacies
            </h2>
            <p className="text-amber-100 text-xs font-medium">
              Pounded fresh. Delivered hot to your door.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-5 mt-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search kitchen, quarter, or dish..."
            className="w-full bg-white border border-amber-200/80 rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-5 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-amber-200/60'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> All
          </button>
          <button
            onClick={() => setSelectedCategory('achu')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'achu'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-amber-200/60'
            }`}
          >
            <Soup className="w-3.5 h-3.5" /> Achu
          </button>
          <button
            onClick={() => setSelectedCategory('kati_kati')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'kati_kati'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-amber-200/60'
            }`}
          >
            <Drumstick className="w-3.5 h-3.5" /> Kati-Kati
          </button>
        </div>
      </div>

      {/* Vendors List */}
      <div className="px-5 mt-6">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-bold text-[#1E293B]">All Douala Cooks</h2>
          <span className="text-xs font-medium text-amber-600">
            {filtered.length} cooks
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">Loading cooks...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-amber-100 p-6">
            <p className="text-slate-500 font-medium text-sm">No cooks found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-36">
                  <img
                    src={getVendorImage(vendor.id)}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 px-2 py-1 bg-emerald-500/90 text-white text-[10px] font-bold rounded-full">
                    Available now
                  </span>
                  <div className="absolute bottom-3 left-3 text-white flex items-center gap-1 text-xs font-bold">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{vendor.rating}</span>
                    <span className="text-slate-300 font-normal">({vendor.reviewsCount})</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-slate-800 text-base flex items-center gap-1">
                        {vendor.name}
                        {vendor.isVerified && (
                          <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-100" />
                        )}
                      </h3>
                      <p className="text-xs text-amber-600 font-medium">{vendor.specialty}</p>
                    </div>
                    <span className="font-bold text-slate-900 text-sm">
                      {formatXaf(vendor.basePrice)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 my-2">
                    {vendor.description}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> {vendor.quarter}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {vendor.deliveryTime}
                    </span>
                  </div>

                  <button
                    onClick={() => onOrder(vendor)}
                    className="w-full mt-3 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    Order Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vendor Registration Modal */}
      <VendorRegisterModal
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
      />
    </div>
  );
}