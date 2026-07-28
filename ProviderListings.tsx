import React from "react";
import { Provider, SearchFilterState } from "../types";
import {
  Star,
  MapPin,
  Phone,
  MessageSquare,
  Calendar,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  Briefcase,
  Filter,
  Eye,
} from "lucide-react";
import { CATEGORIES, PAKISTAN_CITIES_MAP } from "../data/mockData";

interface ProviderListingsProps {
  providers: Provider[];
  filter: SearchFilterState;
  onFilterChange: (updates: Partial<SearchFilterState>) => void;
  onBookProvider: (provider: Provider) => void;
  onViewProfile: (provider: Provider) => void;
  onResetFilters: () => void;
}

export const ProviderListings: React.FC<ProviderListingsProps> = ({
  providers,
  filter,
  onFilterChange,
  onBookProvider,
  onViewProfile,
  onResetFilters,
}) => {
  const selectedCityAreas = PAKISTAN_CITIES_MAP[filter.city] || PAKISTAN_CITIES_MAP["Islamabad"];

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber.replace(/\s+/g, "")}`;
  };

  const handleWhatsApp = (provider: Provider) => {
    const text = encodeURIComponent(
      `AoA ${provider.name}, I found your profile on Local Services Hub for ${provider.profession} in ${provider.city}. Are you available for a service booking?`
    );
    const cleanNum = provider.whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanNum}?text=${text}`, "_blank");
  };

  return (
    <section id="providers" className="py-20 bg-[#0D0D0D] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-zinc-900 border border-[#FFD400]/40 text-[#FFD400] text-xs font-black uppercase tracking-wider mb-2">
              VERIFIED PROFESSIONALS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              TRUSTED <span className="text-[#FFD400]">SERVICE PROVIDERS</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Showing {providers.length} verified experts near {filter.area ? `${filter.area}, ` : ""}{filter.city}
            </p>
          </div>

          <button
            onClick={onResetFilters}
            className="text-xs font-bold text-[#FFD400] hover:underline self-start md:self-auto"
          >
            Reset All Filters
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-zinc-900/90 p-4 rounded-3xl border border-zinc-800 mb-10 shadow-lg">
          <div className="flex items-center gap-2 mb-3 text-xs font-black uppercase tracking-wider text-[#FFD400]">
            <Filter className="w-4 h-4" />
            <span>Refine Search & Filters</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {/* Service */}
            <div>
              <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">
                Category
              </label>
              <select
                value={filter.service}
                onChange={(e) => onFilterChange({ service: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#FFD400]"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">
                City
              </label>
              <select
                value={filter.city}
                onChange={(e) => onFilterChange({ city: e.target.value, area: "" })}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#FFD400]"
              >
                {Object.keys(PAKISTAN_CITIES_MAP).map((c) => (
                  <option key={c} value={c}>
                    📍 {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Area */}
            <div>
              <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">
                Area
              </label>
              <select
                value={filter.area}
                onChange={(e) => onFilterChange({ area: e.target.value })}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#FFD400]"
              >
                <option value="">All Areas</option>
                {selectedCityAreas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">
                Min Rating
              </label>
              <select
                value={filter.minRating}
                onChange={(e) => onFilterChange({ minRating: Number(e.target.value) })}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#FFD400]"
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>★ 4.5 & Above</option>
                <option value={4.8}>★ 4.8 Top Rated</option>
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">
                Availability
              </label>
              <select
                value={filter.availability}
                onChange={(e) =>
                  onFilterChange({
                    availability: e.target.value as "all" | "available_now",
                  })
                }
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#FFD400]"
              >
                <option value="all">All Providers</option>
                <option value="available_now">🟢 Available Now</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty Search Results */}
        {providers.length === 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-3xl bg-zinc-800 text-[#FFD400] flex items-center justify-center mx-auto mb-4 text-2xl font-black">
              🔍
            </div>
            <h3 className="text-xl font-black text-white mb-2">No Providers Match Your Criteria</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Try clearing specific area filters or choosing "All Categories" to see all available professionals in {filter.city}.
            </p>
            <button
              onClick={onResetFilters}
              className="btn-yellow px-6 py-3 rounded-xl text-xs uppercase font-black"
            >
              Show All Providers in {filter.city}
            </button>
          </div>
        )}

        {/* Provider Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((p) => (
            <div
              key={p.id}
              className="bg-zinc-900/90 rounded-3xl p-6 border border-zinc-800 hover:border-[#FFD400]/70 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-[#FFD400]/10 group relative"
            >
              {/* Card Header & Badges */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  {/* Avatar & Availability Dot */}
                  <div className="relative">
                    <img
                      src={p.avatarUrl}
                      alt={p.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-zinc-700 group-hover:border-[#FFD400] transition"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-zinc-900 ${
                        p.isAvailable ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                      title={p.availabilityText}
                    />
                  </div>

                  {/* Verification Badges */}
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[10px] font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>CNIC Verified</span>
                    </div>

                    <span className="text-[10px] font-semibold text-zinc-400 bg-black px-2.5 py-1 rounded-full border border-zinc-800">
                      {p.startingPrice}
                    </span>
                  </div>
                </div>

                {/* Name & Profession */}
                <h3 className="text-lg font-black text-white group-hover:text-[#FFD400] transition">
                  {p.name}
                </h3>
                <p className="text-xs font-bold text-[#FFD400] mb-2">{p.profession}</p>

                {/* City & Area */}
                <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#FFD400] shrink-0" />
                  <span>
                    {p.city} • <strong className="text-white">{p.area}</strong>
                  </span>
                </div>

                {/* Stats Row: Rating & Experience */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-black/60 border border-zinc-800 mb-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#FFD400] fill-[#FFD400]" />
                    <span className="font-black text-white">{p.rating}</span>
                    <span className="text-zinc-500 text-[11px]">({p.reviewCount} reviews)</span>
                  </div>

                  <div className="flex items-center gap-1 text-zinc-300 font-bold">
                    <Briefcase className="w-3.5 h-3.5 text-[#FFD400]" />
                    <span>{p.experienceYears} Yrs Exp</span>
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                  {p.bio}
                </p>

                {/* Contact Quick Details */}
                <div className="space-y-1.5 text-[11px] text-zinc-400 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Phone:</span>
                    <span className="font-mono text-zinc-200 font-bold">{p.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Status:</span>
                    <span className="font-semibold text-emerald-400">{p.availabilityText}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                {/* Book Service Primary Button */}
                <button
                  onClick={() => onBookProvider(p)}
                  className="btn-yellow w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#FFD400]/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Service</span>
                </button>

                {/* Secondary Call, WhatsApp & View Profile */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleCall(p.phone)}
                    className="py-2 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition border border-zinc-700"
                    title="Call Provider Now"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FFD400]" />
                    <span>Call</span>
                  </button>

                  <button
                    onClick={() => handleWhatsApp(p)}
                    className="py-2 px-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-300 font-bold text-[11px] flex items-center justify-center gap-1 transition border border-emerald-700/60"
                    title="WhatsApp Provider"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => onViewProfile(p)}
                    className="py-2 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1 transition border border-zinc-700"
                    title="View Full Profile"
                  >
                    <Eye className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Profile</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
