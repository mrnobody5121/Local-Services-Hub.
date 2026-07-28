import React, { useState } from "react";
import { Provider } from "../types";
import {
  X,
  Star,
  MapPin,
  Phone,
  MessageSquare,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Award,
  Mail,
  Briefcase,
  UserCheck,
} from "lucide-react";

interface ProviderProfileModalProps {
  provider: Provider;
  onClose: () => void;
  onBookProvider: (provider: Provider) => void;
}

export const ProviderProfileModal: React.FC<ProviderProfileModalProps> = ({
  provider,
  onClose,
  onBookProvider,
}) => {
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [authorName, setAuthorName] = useState("");
  const [reviews, setReviews] = useState(provider.reviewsList || []);

  const handleCall = () => {
    window.location.href = `tel:${provider.phone.replace(/\s+/g, "")}`;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `AoA ${provider.name}, I am contacting you via Local Services Hub for ${provider.profession} in ${provider.city}.`
    );
    const cleanNum = provider.whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanNum}?text=${text}`, "_blank");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim() || !authorName.trim()) return;

    const added = {
      id: `r-${Date.now()}`,
      authorName,
      city: provider.city,
      rating: newReviewRating,
      date: "Just now",
      comment: newReviewText,
    };

    setReviews([added, ...reviews]);
    setNewReviewText("");
    setAuthorName("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border-2 border-[#FFD400]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-white my-8 max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Banner Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-zinc-800">
          <div className="relative shrink-0">
            <img
              src={provider.avatarUrl}
              alt={provider.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-[#FFD400] shadow-xl"
            />
            <span
              className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-zinc-900 ${
                provider.isAvailable ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> CNIC Verified Pro
              </span>
              <span className="px-3 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-bold">
                {provider.startingPrice}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">
              {provider.name}
            </h2>
            <p className="text-sm font-bold text-[#FFD400] mb-2">{provider.profession}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-zinc-300">
              <span className="flex items-center gap-1 font-bold">
                <MapPin className="w-3.5 h-3.5 text-[#FFD400]" /> {provider.area}, {provider.city}
              </span>
              <span className="flex items-center gap-1 font-bold">
                <Star className="w-3.5 h-3.5 text-[#FFD400] fill-[#FFD400]" /> {provider.rating} ({reviews.length} reviews)
              </span>
              <span className="flex items-center gap-1 font-bold">
                <Briefcase className="w-3.5 h-3.5 text-[#FFD400]" /> {provider.experienceYears} Years Exp
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
          <button
            onClick={() => {
              onClose();
              onBookProvider(provider);
            }}
            className="btn-yellow py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FFD400]/20"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Service</span>
          </button>

          <button
            onClick={handleCall}
            className="py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-zinc-700 transition"
          >
            <Phone className="w-4 h-4 text-[#FFD400]" />
            <span>Call {provider.phone}</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="py-3 rounded-2xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-700 transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Direct</span>
          </button>
        </div>

        {/* Bio & Details */}
        <div className="space-y-6 text-xs">
          {/* About Provider */}
          <div className="bg-black/60 p-4 rounded-2xl border border-zinc-800">
            <h4 className="font-black text-white text-sm uppercase tracking-wider mb-2">
              About {provider.name}
            </h4>
            <p className="text-zinc-300 leading-relaxed font-normal">{provider.bio}</p>
          </div>

          {/* Services Offered */}
          {provider.servicesOffered && provider.servicesOffered.length > 0 && (
            <div>
              <h4 className="font-black text-white text-sm uppercase tracking-wider mb-3">
                Key Services Offered
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {provider.servicesOffered.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/60 border border-zinc-800 flex items-center gap-2 text-zinc-200 font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FFD400] shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <h4 className="font-black text-white text-xs uppercase tracking-wider mb-2">
              Verified Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300 font-medium">
              <div>📞 Phone: <strong className="text-white">{provider.phone}</strong></div>
              <div>💬 WhatsApp: <strong className="text-emerald-400">{provider.whatsapp}</strong></div>
              <div>📧 Email: <strong className="text-zinc-200">{provider.email}</strong></div>
              <div>📍 City: <strong className="text-white">{provider.city} ({provider.area})</strong></div>
            </div>
          </div>

          {/* Reviews List & Add Review Form */}
          <div className="pt-4 border-t border-zinc-800">
            <h4 className="font-black text-white text-sm uppercase tracking-wider mb-4">
              Customer Reviews ({reviews.length})
            </h4>

            {/* Existing Reviews */}
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl bg-black/60 border border-zinc-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{r.authorName} ({r.city})</span>
                    <span className="text-[10px] text-zinc-500">{r.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-[#FFD400] fill-[#FFD400]" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-300 mt-1 font-normal">"{r.comment}"</p>
                </div>
              ))}
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleAddReview} className="bg-black/80 p-4 rounded-2xl border border-zinc-800 space-y-3">
              <h5 className="font-bold text-white text-xs uppercase">Leave a Verified Review</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-[#FFD400]"
                />
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-[#FFD400]"
                >
                  <option value={5}>★★★★★ Excellent (5/5)</option>
                  <option value={4}>★★★★☆ Good (4/5)</option>
                  <option value={3}>★★★☆☆ Average (3/5)</option>
                </select>
              </div>

              <textarea
                rows={2}
                required
                placeholder="Share your experience working with this service provider..."
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-[#FFD400]"
              />

              <button
                type="submit"
                className="btn-yellow px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
