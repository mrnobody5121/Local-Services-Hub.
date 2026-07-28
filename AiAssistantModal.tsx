import React, { useState } from "react";
import { Sparkles, Send, X, ShieldCheck, CheckCircle2, HelpCircle } from "lucide-react";

interface AiAssistantModalProps {
  currentCity: string;
  onClose: () => void;
  onSelectCategoryFilter: (categoryName: string) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  currentCity,
  onClose,
  onSelectCategoryFilter,
}) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    answer: string;
    estimatedCostPKR?: string;
    suggestedCategory?: string;
    safetyTips?: string[];
  } | null>(null);

  const sampleQueries = [
    "How much does 1.5 Ton AC gas refilling cost in Islamabad?",
    "What is the average charge for rewiring a 10 Marla home in Lahore?",
    "How much does deep sofa steam cleaning cost in Karachi?",
    "Rate for O-Level Physics tutor in Rawalpindi per month?",
  ];

  const handleAsk = async (textToSubmit?: string) => {
    const q = textToSubmit || query;
    if (!q.trim()) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, city: currentCity }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data);
      }
    } catch (err) {
      console.error("AI assistant error:", err);
      setResponse({
        answer: `For ${q}, standard Pakistani service charges usually range between Rs. 1,000 to Rs. 4,500 depending on required parts. Browse our verified providers list to call or WhatsApp directly!`,
        estimatedCostPKR: "Rs. 1,000 - 4,500",
        suggestedCategory: "General Service",
        safetyTips: [
          "Always verify technician CNIC and credentials.",
          "Ask for an upfront price breakdown before work begins.",
        ],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border-2 border-[#FFD400]/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-white my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-[#FFD400]/40 text-[#FFD400] text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hub AI • Price Estimator & Advisor</span>
          </div>
          <h3 className="text-2xl font-black text-white">Ask Anything About Local Services</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Get instant market price estimates in PKR and expert troubleshooting advice in {currentCity}.
          </p>
        </div>

        {/* Query Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="space-y-3 mb-6"
        >
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask e.g. How much does AC gas refill cost in Lahore?"
              className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-3.5 text-xs font-semibold text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD400] pr-12"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-2 bottom-2 px-3.5 rounded-xl bg-[#FFD400] text-black font-black text-xs hover:bg-[#ffe033] transition disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? "..." : <Send className="w-4 h-4 stroke-[2.5]" />}
            </button>
          </div>

          {/* Quick Prompts */}
          <div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1.5">
              Popular Queries in Pakistan:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sampleQueries.map((sq, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuery(sq);
                    handleAsk(sq);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-black border border-zinc-800 hover:border-[#FFD400] text-[11px] text-zinc-300 font-medium transition text-left"
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Answer Box */}
        {isLoading && (
          <div className="p-8 bg-black/60 rounded-2xl border border-zinc-800 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#FFD400] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-zinc-400">Consulting Pakistani market rate database...</p>
          </div>
        )}

        {response && !isLoading && (
          <div className="bg-black/80 p-5 rounded-2xl border border-[#FFD400]/40 space-y-4 animate-in fade-in duration-300">
            {/* Price Estimate Pill */}
            {response.estimatedCostPKR && (
              <div className="p-3 rounded-xl bg-[#FFD400]/10 border border-[#FFD400]/40 flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-400 uppercase">Estimated Rate in PKR:</span>
                <span className="font-black text-[#FFD400] text-base">{response.estimatedCostPKR}</span>
              </div>
            )}

            {/* Main Answer */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase mb-1">Hub AI Guidance:</h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-normal whitespace-pre-line">
                {response.answer}
              </p>
            </div>

            {/* Safety Tips */}
            {response.safetyTips && response.safetyTips.length > 0 && (
              <div className="pt-3 border-t border-zinc-800 text-xs">
                <span className="font-bold text-[#FFD400] block mb-1">Safety & Preparation Tips:</span>
                <ul className="list-disc list-inside text-zinc-400 space-y-1">
                  {response.safetyTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (response.suggestedCategory) {
                    onSelectCategoryFilter(response.suggestedCategory.toLowerCase());
                  }
                }}
                className="btn-yellow w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider"
              >
                Find Verified Providers On Marketplace
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
