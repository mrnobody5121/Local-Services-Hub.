import React from "react";
import { CATEGORIES } from "../data/mockData";
import {
  Zap,
  Wrench,
  BookOpen,
  Camera,
  Car,
  Sparkles,
  Wind,
  Paintbrush,
  Home,
  Trees,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

interface ServicesSectionProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedCategoryId,
  onSelectCategory,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "electricians":
        return <Zap className="w-6 h-6 text-[#FFD400]" />;
      case "plumbers":
        return <Wrench className="w-6 h-6 text-[#FFD400]" />;
      case "tutors":
        return <BookOpen className="w-6 h-6 text-[#FFD400]" />;
      case "photographers":
        return <Camera className="w-6 h-6 text-[#FFD400]" />;
      case "mechanics":
        return <Car className="w-6 h-6 text-[#FFD400]" />;
      case "car_wash":
        return <Sparkles className="w-6 h-6 text-[#FFD400]" />;
      case "ac_repair":
        return <Wind className="w-6 h-6 text-[#FFD400]" />;
      case "painters":
        return <Paintbrush className="w-6 h-6 text-[#FFD400]" />;
      case "home_cleaning":
        return <Home className="w-6 h-6 text-[#FFD400]" />;
      case "garden_services":
        return <Trees className="w-6 h-6 text-[#FFD400]" />;
      default:
        return <Wrench className="w-6 h-6 text-[#FFD400]" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#0D0D0D] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-zinc-900 border border-[#FFD400]/40 text-[#FFD400] text-xs font-black uppercase tracking-wider mb-3">
            EXPLORE CATEGORIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            POPULAR <span className="text-[#FFD400]">LOCAL SERVICES</span>
          </h2>
          <p className="text-base text-zinc-400">
            Select a service category to instantly filter verified professionals in your city.
          </p>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative bg-zinc-900/90 rounded-3xl p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FFD400]/20 ${
                  isSelected
                    ? "border-[#FFD400] glow-yellow bg-zinc-900"
                    : "border-zinc-800 hover:border-[#FFD400]/60"
                }`}
              >
                <div>
                  {/* Top Header: Icon & Emoji & Count */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-black border border-zinc-800 group-hover:border-[#FFD400] flex items-center justify-center transition">
                        {getCategoryIcon(cat.id)}
                      </div>
                      <span className="text-3xl">{cat.emoji}</span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300 text-xs font-bold">
                      {cat.providerCount}+ Pros
                    </span>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-xl font-black text-white group-hover:text-[#FFD400] transition mb-2">
                    {cat.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 font-medium leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                {/* Bottom Footer: Price Range & Button */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase block">
                      Avg Rate
                    </span>
                    <span className="text-xs font-extrabold text-[#FFD400]">
                      {cat.avgPrice}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCategory(cat.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition ${
                      isSelected
                        ? "bg-[#FFD400] text-black"
                        : "bg-black text-zinc-200 group-hover:bg-[#FFD400] group-hover:text-black"
                    }`}
                  >
                    <span>View Providers</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
