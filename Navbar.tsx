import React, { useState } from "react";
import { Wrench, MapPin, Search, UserPlus, PhoneCall, Sparkles, Menu, X, ShieldCheck } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenBecomeProvider: () => void;
  onOpenAiAssistant: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBecomeProvider,
  onOpenAiAssistant,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "providers", label: "Providers" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-zinc-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FFD400] text-black flex items-center justify-center font-black text-xl shadow-lg shadow-[#FFD400]/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#FFD400] block leading-none drop-shadow-[0_0_10px_rgba(255,212,0,0.3)]">
                LOCAL SERVICES HUB
              </span>
              <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-[#FFD400]" /> Pakistan's #1 Service Network
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-full border border-zinc-800">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    isActive
                      ? "bg-[#FFD400] text-black shadow-md shadow-[#FFD400]/20"
                      : "text-zinc-300 hover:text-[#FFD400] hover:bg-zinc-800/60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenAiAssistant}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-[#FFD400]/40 text-[#FFD400] hover:bg-zinc-800 text-xs font-bold transition flex items-center gap-2 hover:border-[#FFD400]"
              title="Get price estimates & service advice in PKR"
            >
              <Sparkles className="w-4 h-4 text-[#FFD400]" />
              <span>Ask Hub AI</span>
            </button>

            <button
              onClick={onOpenBecomeProvider}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-[#FFD400] text-zinc-200 text-xs font-bold transition flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-[#FFD400]" />
              <span>Become a Provider</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="btn-yellow px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#FFD400]/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Service</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenAiAssistant}
              className="p-2.5 rounded-xl bg-zinc-900 border border-[#FFD400]/50 text-[#FFD400]"
            >
              <Sparkles className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:text-[#FFD400] border border-zinc-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-b border-zinc-800 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold text-base transition ${
                  activeSection === item.id
                    ? "bg-[#FFD400] text-black"
                    : "text-zinc-300 hover:bg-zinc-900 hover:text-[#FFD400]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBecomeProvider();
              }}
              className="w-full py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 text-sm font-bold flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-[#FFD400]" />
              <span>Become a Provider</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-yellow w-full py-3 rounded-xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Service Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
