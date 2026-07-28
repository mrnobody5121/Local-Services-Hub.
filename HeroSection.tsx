import React from "react";
import { Search, MapPin, Wrench, ShieldCheck, Star, Clock, CheckCircle2 } from "lucide-react";
import { SearchFilterState } from "../types";
import { CATEGORIES, PAKISTAN_CITIES_MAP } from "../data/mockData";

interface HeroSectionProps {
  filter: SearchFilterState;
  onFilterChange: (updates: Partial<SearchFilterState>) => void;
  onExecuteSearch: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filter,
  onFilterChange,
  onExecuteSearch,
}) => {
  const selectedCityAreas = PAKISTAN_CITIES_MAP[filter.city] || PAKISTAN_CITIES_MAP["Islamabad"];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecuteSearch();
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 bg-[#0D0D0D] border-b border-zinc-800/80">
      {/* Background Decorative Glow Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFD400]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Verification Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-[#FFD400]/30 text-zinc-300 text-xs font-bold mb-6 animate-in fade-in duration-500">
          <ShieldCheck className="w-4 h-4 text-[#FFD400]" />
          <span>Pakistan's Premier Verified Services Marketplace</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-black uppercase tracking-tight text-[#FFD400] drop-shadow-[0_0_25px_rgba(255,212,0,0.35)] leading-tight mb-4 animate-in fade-in zoom-in-95 duration-700">
          LOCAL SERVICES HUB
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg sm:text-2xl font-medium text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-700">
          Find trusted local professionals near you in seconds.
        </p>

        {/* Large Multi-Field Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="max-w-4xl mx-auto bg-zinc-900/90 p-3 sm:p-4 rounded-3xl border-2 border-[#FFD400]/40 shadow-2xl glow-yellow backdrop-blur-xl text-left"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 1. Search by Service */}
            <div className="bg-black/60 p-3 rounded-2xl border border-zinc-800 focus-within:border-[#FFD400] transition">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Service Category
              </label>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#FFD400] shrink-0" />
                <select
                  value={filter.service}
                  onChange={(e) => onFilterChange({ service: e.target.value })}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-zinc-900 text-white">
                    All Services (Electrician, Plumber...)
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-zinc-900 text-white">
                      {cat.emoji} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Search by City */}
            <div className="bg-black/60 p-3 rounded-2xl border border-zinc-800 focus-within:border-[#FFD400] transition">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                City in Pakistan
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FFD400] shrink-0" />
                <select
                  value={filter.city}
                  onChange={(e) => onFilterChange({ city: e.target.value, area: "" })}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer"
                >
                  {Object.keys(PAKISTAN_CITIES_MAP).map((city) => (
                    <option key={city} value={city} className="bg-zinc-900 text-white">
                      📍 {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Search by Area */}
            <div className="bg-black/60 p-3 rounded-2xl border border-zinc-800 focus-within:border-[#FFD400] transition">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Area / Sector
              </label>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#FFD400] shrink-0" />
                <select
                  value={filter.area}
                  onChange={(e) => onFilterChange({ area: e.target.value })}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-zinc-900 text-white">
                    All Areas in {filter.city}
                  </option>
                  {selectedCityAreas.map((area) => (
                    <option key={area} value={area} className="bg-zinc-900 text-white">
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Yellow Search Button & Keyword Filter */}
          <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={filter.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                placeholder="Or search by keyword (e.g. solar, inverter, deep clean, MDCAT tutor...)"
                className="w-full bg-black/60 border border-zinc-800 rounded-2xl px-4 py-3 text-xs font-semibold text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD400]"
              />
            </div>

            <button
              type="submit"
              className="btn-yellow w-full sm:w-auto px-8 py-3.5 rounded-2xl text-base font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#FFD400]/30 shrink-0"
            >
              <Search className="w-5 h-5 stroke-[3]" />
              <span>SEARCH</span>
            </button>
          </div>
        </form>

        {/* Quick Trust Highlights */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD400]/10 text-[#FFD400] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-black text-white text-base">12,000+</span>
              <span className="text-xs text-zinc-400 font-medium">Verified Pros in PK</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD400]/10 text-[#FFD400] flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-[#FFD400]" />
            </div>
            <div>
              <span className="block font-black text-white text-base">4.9 / 5.0</span>
              <span className="text-xs text-zinc-400 font-medium">Customer Rating</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD400]/10 text-[#FFD400] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-black text-white text-base">20 Mins</span>
              <span className="text-xs text-zinc-400 font-medium">Avg Response Time</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD400]/10 text-[#FFD400] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-black text-white text-base">CNIC Checked</span>
              <span className="text-xs text-zinc-400 font-medium">Background Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
