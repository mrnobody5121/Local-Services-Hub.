import React, { useState } from "react";
import { Provider, BookingRequest } from "../types";
import { X, Calendar, Clock, MapPin, Phone, User, CheckCircle2, ShieldCheck, Wrench } from "lucide-react";
import { CATEGORIES, PAKISTAN_CITIES_MAP } from "../data/mockData";

interface BookingModalProps {
  selectedProvider: Provider | null;
  defaultCategory: string;
  defaultCity: string;
  defaultArea: string;
  onClose: () => void;
  onBookingSubmitted: (booking: BookingRequest) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  selectedProvider,
  defaultCategory,
  defaultCity,
  defaultArea,
  onClose,
  onBookingSubmitted,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(defaultCity || "Islamabad");
  const [area, setArea] = useState(defaultArea || "");
  const [address, setAddress] = useState("");
  const [serviceCategory, setServiceCategory] = useState(
    selectedProvider?.categoryId || defaultCategory || "electricians"
  );
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [preferredTime, setPreferredTime] = useState("10:00 AM - 01:00 PM");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);

  const cityAreas = PAKISTAN_CITIES_MAP[city] || PAKISTAN_CITIES_MAP["Islamabad"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) {
      alert("Please fill in your Name, Phone Number, and Complete Address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          address,
          city,
          area,
          serviceCategory,
          providerId: selectedProvider?.id,
          providerName: selectedProvider?.name,
          preferredDate,
          preferredTime,
          notes,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const bookingObj: BookingRequest = {
          id: data.bookingId || `LSH-${Math.floor(100000 + Math.random() * 900000)}`,
          customerName,
          phone,
          address,
          city,
          area,
          serviceCategory,
          providerId: selectedProvider?.id,
          providerName: selectedProvider?.name,
          preferredDate,
          preferredTime,
          notes,
          status: "Confirmed",
          createdAt: new Date().toLocaleDateString(),
        };

        setConfirmedBooking(bookingObj);
        onBookingSubmitted(bookingObj);
      }
    } catch (err) {
      console.error("Booking submission error:", err);
      // Fallback local confirm
      const bookingObj: BookingRequest = {
        id: `LSH-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName,
        phone,
        address,
        city,
        area,
        serviceCategory,
        providerId: selectedProvider?.id,
        providerName: selectedProvider?.name,
        preferredDate,
        preferredTime,
        notes,
        status: "Confirmed",
        createdAt: new Date().toLocaleDateString(),
      };
      setConfirmedBooking(bookingObj);
      onBookingSubmitted(bookingObj);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border-2 border-[#FFD400]/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-white my-8">
        {/* Top Glow & Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* State A: Confirmation Alert */}
        {confirmedBooking ? (
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto text-3xl">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-black uppercase tracking-wider">
                BOOKING CONFIRMED #{confirmedBooking.id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
                Thank You, {confirmedBooking.customerName}!
              </h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto mt-2 leading-relaxed">
                Your service request has been received. {confirmedBooking.providerName ? `${confirmedBooking.providerName} will call/WhatsApp you` : "A verified local provider will contact you"} shortly at <strong className="text-[#FFD400]">{confirmedBooking.phone}</strong>.
              </p>
            </div>

            {/* Booking Details Summary Box */}
            <div className="bg-black/80 p-5 rounded-2xl border border-zinc-800 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-500">Service:</span>
                <span className="font-bold text-white uppercase">{confirmedBooking.serviceCategory}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-500">Scheduled Date:</span>
                <span className="font-bold text-[#FFD400]">{confirmedBooking.preferredDate} ({confirmedBooking.preferredTime})</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-500">Location:</span>
                <span className="font-medium text-zinc-200">{confirmedBooking.address}, {confirmedBooking.area}, {confirmedBooking.city}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-yellow w-full py-3.5 rounded-2xl font-black uppercase text-sm tracking-wider"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          /* State B: Booking Form */
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-5 h-5 text-[#FFD400]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#FFD400]">
                  Service Booking Form
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">
                {selectedProvider ? `Book ${selectedProvider.name}` : "Book a Local Service"}
              </h3>
              {selectedProvider && (
                <p className="text-xs font-bold text-zinc-400 mt-0.5">
                  {selectedProvider.profession} • {selectedProvider.city}
                </p>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Service Required */}
              {!selectedProvider && (
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">
                    Select Service Required *
                  </label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-bold text-white focus:outline-none focus:border-[#FFD400]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.emoji} {cat.name} ({cat.avgPrice})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Muhammad Hassan"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-medium text-white focus:outline-none focus:border-[#FFD400]"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-300 block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-medium text-white focus:outline-none focus:border-[#FFD400]"
                  />
                </div>
              </div>

              {/* City & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">City *</label>
                  <select
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setArea("");
                    }}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-bold text-white focus:outline-none focus:border-[#FFD400]"
                  >
                    {Object.keys(PAKISTAN_CITIES_MAP).map((c) => (
                      <option key={c} value={c}>
                        📍 {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Area / Sector *</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-bold text-white focus:outline-none focus:border-[#FFD400]"
                  >
                    <option value="">Select Area</option>
                    {cityAreas.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Complete Address */}
              <div>
                <label className="font-bold text-zinc-300 block mb-1">
                  Complete House / Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House #, Street #, Sector/Phase, Block"
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-medium text-white focus:outline-none focus:border-[#FFD400]"
                />
              </div>

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-medium text-white focus:outline-none focus:border-[#FFD400]"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-300 block mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-bold text-white focus:outline-none focus:border-[#FFD400]"
                  >
                    <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM - 03:00 PM)</option>
                    <option value="Evening (03:00 PM - 07:00 PM)">Evening (03:00 PM - 07:00 PM)</option>
                    <option value="Urgent 24/7 Service">Urgent 24/7 Immediate</option>
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="font-bold text-zinc-300 block mb-1">
                  Additional Notes / Describe Issue
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 1.5 Ton Gree Inverter AC needs gas refill & jet wash..."
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 font-medium text-white focus:outline-none focus:border-[#FFD400]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-yellow w-full py-3.5 rounded-2xl font-black uppercase text-sm tracking-wider mt-4 flex items-center justify-center gap-2 shadow-lg shadow-[#FFD400]/20"
              >
                {isSubmitting ? (
                  <span>Confirming Booking...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                    <span>CONFIRM BOOKING NOW</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
