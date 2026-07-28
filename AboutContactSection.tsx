import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, Award, Users, ThumbsUp } from "lucide-react";

export const AboutContactSection: React.FC = () => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setMessageSent(true);
    setContactName("");
    setContactEmail("");
    setContactSubject("");
    setContactMessage("");

    setTimeout(() => {
      setMessageSent(false);
    }, 5000);
  };

  return (
    <div className="bg-[#0D0D0D] border-b border-zinc-800">
      {/* ABOUT SECTION */}
      <section id="about" className="py-20 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image & Stats */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-zinc-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800"
                  alt="Verified Technician in Pakistan"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-6 bg-zinc-900/90 border border-[#FFD400]/40 rounded-2xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FFD400] text-black flex items-center justify-center font-black text-xl shrink-0">
                      <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-lg">100% CNIC & Police Verified</h4>
                      <p className="text-xs text-zinc-300">
                        Every service provider undergoes background screening before joining our network.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Copy */}
            <div className="space-y-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-zinc-900 border border-[#FFD400]/40 text-[#FFD400] text-xs font-black uppercase tracking-wider">
                ABOUT LOCAL SERVICES HUB
              </span>

              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                BUILDING PAKISTAN'S MOST <span className="text-[#FFD400]">TRUSTED MARKETPLACE</span>
              </h2>

              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                Local Services Hub was launched to resolve a fundamental challenge faced by millions of homeowners across Pakistan: finding reliable, honest, and skilled service professionals. Whether it’s an urgent short circuit in Bahria Town, an AC gas leak in DHA Lahore, or finding a top-ranked O-Level tutor in Islamabad, we bridge the gap.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <h4 className="font-black text-[#FFD400] text-base mb-1">Direct Communication</h4>
                  <p className="text-zinc-400">Call or WhatsApp technicians directly without hidden middleman fees.</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <h4 className="font-black text-[#FFD400] text-base mb-1">Transparent Pricing</h4>
                  <p className="text-zinc-400">Get upfront estimated service charges in PKR before work begins.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1 rounded-full bg-zinc-900 border border-[#FFD400]/40 text-[#FFD400] text-xs font-black uppercase tracking-wider mb-2">
              WE'RE HERE TO HELP
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              GET IN <span className="text-[#FFD400]">TOUCH WITH US</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Have questions, feedback, or need help finding a specialist in your city? Reach out to our customer support team!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Details Column */}
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFD400] text-black flex items-center justify-center shrink-0 font-bold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase block">Call Support</span>
                  <strong className="text-white text-base block font-bold">+92 51 111 574 82</strong>
                  <span className="text-xs text-zinc-400">+92 300 1234567 (WhatsApp)</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFD400] text-black flex items-center justify-center shrink-0 font-bold">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase block">Email Address</span>
                  <strong className="text-white text-base block font-bold">support@localserviceshub.pk</strong>
                  <span className="text-xs text-zinc-400">Response within 2 hours</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFD400] text-black flex items-center justify-center shrink-0 font-bold">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase block">Headquarters</span>
                  <strong className="text-white text-sm block font-bold">Local Services Hub PK</strong>
                  <span className="text-xs text-zinc-400">Office 402, Evacuee Trust Complex, F-5/1, Islamabad, Pakistan</span>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form Column */}
            <div className="lg:col-span-2 bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-xl">
              <h3 className="text-xl font-black text-white mb-4">Send Us a Direct Message</h3>

              {messageSent ? (
                <div className="p-6 rounded-2xl bg-emerald-950 border border-emerald-800 text-center text-emerald-300 space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
                  <h4 className="font-bold text-base text-white">Message Sent Successfully!</h4>
                  <p className="text-xs">
                    Thank you for reaching out. Our support team in Islamabad will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-zinc-300 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Asad Ullah"
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-[#FFD400]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-zinc-300 block mb-1">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="asad@example.com"
                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-[#FFD400]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-zinc-300 block mb-1">Subject</label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="e.g. Partnership query / Service issue in Lahore"
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-[#FFD400]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-zinc-300 block mb-1">Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-[#FFD400]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-yellow px-8 py-3.5 rounded-2xl font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FFD400]/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
