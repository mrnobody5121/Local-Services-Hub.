import React, { useState } from "react";
import { Provider } from "../types";
import { X, UserPlus, CheckCircle2, ShieldCheck, Wrench, Sparkles } from "lucide-react";
import { CATEGORIES, PAKISTAN_CITIES_MAP } from "../data/mockData";

interface BecomeProviderModalProps {
  onClose: () => void;
  onProviderRegistered: (newProvider: Provider) => void;
}

export const BecomeProviderModal: React.FC<BecomeProviderModalProps> = ({
  onClose,
  onProviderRegistered,
}) => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [categoryId, setCategoryId] = useState("electricians");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Islamabad");
  const [area, setArea] = useState("");
  const [experienceYears, setExperienceYears] = useState("5");
  const [startingPrice, setStartingPrice] = useState("Rs. 1,000");
  const [cnicNumber, setCnicNumber] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [bio, setBio] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const cityAreas = PAKISTAN_CITIES_MAP[city] || PAKISTAN_CITIES_MAP["Islamabad"];

  const sampleAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !city) {
      alert("Please provide your Name, Phone, and City.");
      return;
    }

    const selectedAvatar = photoUrl.trim() || sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)];

    const newProviderObj: Provider = {
      id: `p-${Date.now()}`,
      name,
      profession: profession || `${categoryId.toUpperCase()} Professional`,
      categoryId,
      city,
      area: area || cityAreas[0] || "Main City",
      phone,
      whatsapp: whatsapp || phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
      experienceYears: Number(experienceYears) || 3,
      rating: 5.0,
      reviewCount: 1,
      isAvailable: true,
      availabilityText: "Available Now",
      startingPrice: startingPrice.startsWith("Rs.") ? startingPrice : `Rs. ${startingPrice}`,
      avatarUrl: selectedAvatar,
      cnicVerified: true,
      policeChecked: true,
      bio: bio || `Experienced ${profession || categoryId} providing top quality services in ${city}.`,
      servicesOffered: [
        `${categoryId} Repair & Maintenance`,
        "Emergency On-Site Visit",
        "Free Inspection & Estimate",
      ],
      reviewsList: [
        {
          id: `r-${Date.now()}`,
          authorName: "Local Services Hub Team",
          city,
          rating: 5,
          date: "Just now",
          comment: "Newly verified local service provider registered on Local Services Hub!",
        },
      ],
    };

    onProviderRegistered(newProviderObj);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border-2 border-[#FFD400]/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-white my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Registration Success Alert */
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#FFD400]/10 text-[#FFD400] border-2 border-[#FFD400] flex items-center justify-center mx-auto text-3xl">
              <Sparkles className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-black uppercase tracking-wider">
                REGISTRATION SUCCESSFUL
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
                Welcome to Local Services Hub, {name}!
              </h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto mt-2 leading-relaxed">
                Your provider profile is now live in <strong className="text-[#FFD400]">{city}</strong>. Customers in {area} can now call, WhatsApp, and book your services directly.
              </p>
            </div>

            <button
              onClick={onClose}
              className="btn-yellow w-full py-3.5 rounded-2xl font-black uppercase text-sm tracking-wider"
            >
              View My Live Profile on Marketplace
            </button>
          </div>
        ) : (
          /* Registration Form */
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <UserPlus className="w-5 h-5 text-[#FFD400]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#FFD400]">
                  Join Pakistan's #1 Service Network
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">Become a Local Service Provider</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Register your skills today to get direct calls and customer bookings with 0% commission.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Full Name & Profession */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tariq Mahmood"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-medium text-white focus:outline-none focus:border-[#FFD400]"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-300 block mb-1">
                    Profession / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="e.g. Master Sanitary Plumber"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-medium text-white focus:outline-none focus:border-[#FFD400]"
                  />
                </div>
              </div>

              {/* Service Category & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">
                    Service Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-bold text-white focus:outline-none focus:border-[#FFD400]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.emoji} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-zinc-300 block mb-1">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-medium text-white focus:outline-none focus:border-[#FFD400]"
                  />
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">
                    Phone Number *
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

                <div>
                  <label className="font-bold text-zinc-300 block mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
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
                    <option value="">Select Primary Area</option>
                    {cityAreas.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service Charges & CNIC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">
                    Starting Service Fee (PKR)
                  </label>
                  <input
                    type="text"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    placeholder="e.g. Rs. 1,200"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-medium text-white focus:outline-none focus:border-[#FFD400]"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-300 block mb-1">
                    CNIC Number (Verification)
                  </label>
                  <input
                    type="text"
                    value={cnicNumber}
                    onChange={(e) => setCnicNumber(e.target.value)}
                    placeholder="37405-XXXXXXX-X"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 font-medium text-white focus:outline-none focus:border-[#FFD400]"
                  />
                </div>
              </div>

              {/* Profile Photo URL */}
              <div>
                <label className="font-bold text-zinc-300 block mb-1">
                  Profile Photo URL (Optional)
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 font-medium text-white focus:outline-none focus:border-[#FFD400]"
                />
              </div>

              {/* Description / Bio */}
              <div>
                <label className="font-bold text-zinc-300 block mb-1">
                  Short Description & Services Provided *
                </label>
                <textarea
                  rows={3}
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe your expertise, past work experience, and what services you offer..."
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 font-medium text-white focus:outline-none focus:border-[#FFD400]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-yellow w-full py-3.5 rounded-2xl font-black uppercase text-sm tracking-wider mt-4 flex items-center justify-center gap-2 shadow-lg shadow-[#FFD400]/20"
              >
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>REGISTER AS PROVIDER NOW</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
