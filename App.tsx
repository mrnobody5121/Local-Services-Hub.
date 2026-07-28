import React, { useState, useMemo } from "react";
import {
  Category,
  Provider,
  SearchFilterState,
  BookingRequest,
} from "./types";
import { INITIAL_PROVIDERS, CATEGORIES, PAKISTAN_CITIES_MAP } from "./data/mockData";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProviderListings } from "./components/ProviderListings";
import { BookingModal } from "./components/BookingModal";
import { BecomeProviderModal } from "./components/BecomeProviderModal";
import { ProviderProfileModal } from "./components/ProviderProfileModal";
import { AiAssistantModal } from "./components/AiAssistantModal";
import { AboutContactSection } from "./components/AboutContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  // Navigation State
  const [activeSection, setActiveSection] = useState("home");

  // Providers Master State
  const [providers, setProviders] = useState<Provider[]>(INITIAL_PROVIDERS);

  // Search Filter State
  const [filter, setFilter] = useState<SearchFilterState>({
    service: "",
    city: "Islamabad",
    area: "",
    minRating: 0,
    availability: "all",
    sortBy: "recommended",
    searchQuery: "",
  });

  // Modal States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingProvider, setSelectedBookingProvider] = useState<Provider | null>(null);

  const [isBecomeProviderOpen, setIsBecomeProviderOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  const [selectedProfileProvider, setSelectedProfileProvider] = useState<Provider | null>(null);

  // Toast Banner State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  // Filter Update Handler
  const handleFilterChange = (updates: Partial<SearchFilterState>) => {
    setFilter((prev) => ({ ...prev, ...updates }));
  };

  // Execute Search action from Hero
  const handleExecuteSearch = () => {
    setActiveSection("providers");
    const elem = document.getElementById("providers");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilter({
      service: "",
      city: "Islamabad",
      area: "",
      minRating: 0,
      availability: "all",
      sortBy: "recommended",
      searchQuery: "",
    });
  };

  // Select Category from Services Section
  const handleSelectCategory = (catId: string) => {
    handleFilterChange({ service: catId });
    setActiveSection("providers");
    const elem = document.getElementById("providers");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filtered Providers Calculation
  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      // Service filter
      if (filter.service && p.categoryId !== filter.service) {
        return false;
      }

      // City filter
      if (filter.city && p.city.toLowerCase() !== filter.city.toLowerCase()) {
        return false;
      }

      // Area filter
      if (filter.area && !p.area.toLowerCase().includes(filter.area.toLowerCase())) {
        return false;
      }

      // Rating filter
      if (filter.minRating > 0 && p.rating < filter.minRating) {
        return false;
      }

      // Availability filter
      if (filter.availability === "available_now" && !p.isAvailable) {
        return false;
      }

      // Keyword Search Query
      if (filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchProf = p.profession.toLowerCase().includes(q);
        const matchCity = p.city.toLowerCase().includes(q);
        const matchArea = p.area.toLowerCase().includes(q);
        const matchBio = p.bio.toLowerCase().includes(q);
        const matchServices = p.servicesOffered.some((s) => s.toLowerCase().includes(q));

        if (!matchName && !matchProf && !matchCity && !matchArea && !matchBio && !matchServices) {
          return false;
        }
      }

      return true;
    });
  }, [providers, filter]);

  // Open Booking for specific provider
  const handleOpenBookingForProvider = (provider: Provider) => {
    setSelectedBookingProvider(provider);
    setIsBookingModalOpen(true);
  };

  // Open general booking
  const handleOpenGeneralBooking = () => {
    setSelectedBookingProvider(null);
    setIsBookingModalOpen(true);
  };

  // Handle New Provider Registered
  const handleProviderRegistered = (newProvider: Provider) => {
    setProviders((prev) => [newProvider, ...prev]);
    setIsBecomeProviderOpen(false);

    // Filter to show new provider immediately
    setFilter({
      service: newProvider.categoryId,
      city: newProvider.city,
      area: newProvider.area,
      minRating: 0,
      availability: "all",
      sortBy: "recommended",
      searchQuery: "",
    });

    showToast(`🎉 Provider "${newProvider.name}" is now live in ${newProvider.city}!`);
    setActiveSection("providers");
    const elem = document.getElementById("providers");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle Booking Submitted
  const handleBookingSubmitted = (booking: BookingRequest) => {
    showToast(`✅ Booking Request ${booking.id} confirmed for ${booking.customerName}!`);
  };

  // Section Navigation Helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-zinc-100 font-sans selection:bg-[#FFD400] selection:text-black flex flex-col">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#FFD400] text-black font-black px-6 py-4 rounded-2xl shadow-2xl border-2 border-black animate-in fade-in slide-in-from-bottom-5 duration-300 text-sm flex items-center gap-3">
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-black font-bold text-base hover:opacity-75"
          >
            ✕
          </button>
        </div>
      )}

      {/* Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBecomeProvider={() => setIsBecomeProviderOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <HeroSection
          filter={filter}
          onFilterChange={handleFilterChange}
          onExecuteSearch={handleExecuteSearch}
        />

        {/* SERVICES SECTION */}
        <ServicesSection
          selectedCategoryId={filter.service}
          onSelectCategory={handleSelectCategory}
        />

        {/* PROVIDER LISTINGS SECTION */}
        <ProviderListings
          providers={filteredProviders}
          filter={filter}
          onFilterChange={handleFilterChange}
          onBookProvider={handleOpenBookingForProvider}
          onViewProfile={(p) => setSelectedProfileProvider(p)}
          onResetFilters={handleResetFilters}
        />

        {/* ABOUT & CONTACT SECTION */}
        <AboutContactSection />
      </main>

      {/* FOOTER */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBecomeProvider={() => setIsBecomeProviderOpen(true)}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* MODALS */}
      {/* 1. Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal
          selectedProvider={selectedBookingProvider}
          defaultCategory={filter.service}
          defaultCity={filter.city}
          defaultArea={filter.area}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSubmitted={handleBookingSubmitted}
        />
      )}

      {/* 2. Become a Provider Modal */}
      {isBecomeProviderOpen && (
        <BecomeProviderModal
          onClose={() => setIsBecomeProviderOpen(false)}
          onProviderRegistered={handleProviderRegistered}
        />
      )}

      {/* 3. Provider Profile Modal */}
      {selectedProfileProvider && (
        <ProviderProfileModal
          provider={selectedProfileProvider}
          onClose={() => setSelectedProfileProvider(null)}
          onBookProvider={handleOpenBookingForProvider}
        />
      )}

      {/* 4. AI Service Assistant Modal */}
      {isAiAssistantOpen && (
        <AiAssistantModal
          currentCity={filter.city}
          onClose={() => setIsAiAssistantOpen(false)}
          onSelectCategoryFilter={handleSelectCategory}
        />
      )}
    </div>
  );
}
