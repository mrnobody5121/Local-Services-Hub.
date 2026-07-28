import React from "react";
import { Wrench, MapPin, Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenBecomeProvider: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBecomeProvider,
  onOpenBooking,
}) => {
  return (
    <footer className="bg-[#0A0A0A] text-zinc-400 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#FFD400] text-black flex items-center justify-center font-black text-xl">
                <Wrench className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-[#FFD400] block leading-none">
                  LOCAL SERVICES HUB
                </span>
                <span className="text-[9px] font-bold tracking-wider text-zinc-500 uppercase">
                  Pakistan's Service Network
                </span>
              </div>
            </button>

            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Find trusted local electricians, plumbers, tutors, mechanics, AC technicians, and deep cleaners near you across Pakistan in seconds.
            </p>

            <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
              <MapPin className="w-4 h-4 text-[#FFD400]" />
              <span>Islamabad • Lahore • Karachi • Rawalpindi</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-[#FFD400] transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-[#FFD400] transition"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("providers")}
                  className="hover:text-[#FFD400] transition"
                >
                  Verified Providers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-[#FFD400] transition"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-[#FFD400] transition"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Provider Portal & Legal */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Providers & Legal
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button
                  onClick={onOpenBecomeProvider}
                  className="hover:text-[#FFD400] transition text-[#FFD400] font-bold"
                >
                  Become a Provider
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#FFD400] transition"
                >
                  Book a Service
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FFD400] transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FFD400] transition">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links & Support */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Connect With Us
            </h4>
            <p className="text-xs text-zinc-400 mb-4">
              Follow Local Services Hub for verified home care tips, seasonal discounts, and technician updates across Pakistan.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#FFD400] hover:text-[#FFD400] flex items-center justify-center transition text-xs font-bold"
              >
                FB
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#FFD400] hover:text-[#FFD400] flex items-center justify-center transition text-xs font-bold"
              >
                IG
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#FFD400] hover:text-[#FFD400] flex items-center justify-center transition text-xs font-bold"
              >
                IN
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500">
          <p>© 2026 Local Services Hub. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-[#FFD400] fill-[#FFD400]" /> for Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
};
