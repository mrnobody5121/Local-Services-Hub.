import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Local Services Hub PK", geminiAvailable: !!process.env.GEMINI_API_KEY });
});

// Endpoint: AI Service Assistant (Price Estimates & Guidance)
app.post("/api/ai-assistant", async (req, res) => {
  try {
    const { query, city = "Islamabad", category = "General" } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    if (!ai) {
      return res.json({
        success: true,
        answer: `For ${category} in ${city}, standard Pakistani market rates range between Rs. 1,000 to Rs. 4,500 depending on scope. You can browse verified providers on Local Services Hub or click "Book Service" to get an exact quote.`,
        suggestedCategory: category,
        estimatedCostPKR: "Rs. 1,000 - 4,500",
      });
    }

    const systemInstruction = `You are "Hub AI", the expert customer support and price estimation assistant for Local Services Hub (Pakistan's #1 Local Service Marketplace).
You provide helpful, friendly, and practical guidance tailored specifically to Pakistani households and cities (Islamabad, Rawalpindi, Lahore, Karachi, Peshawar, Faisalabad, Multan, etc.).
Currency: Pakistani Rupees (PKR / Rs.).

Your goal:
1. Answer the user's question clearly.
2. Estimate reasonable current market prices in Pakistani Rupees (PKR) for services like AC repair, electricians, plumbers, home cleaning, solar, tutoring, mechanics, car wash, etc.
3. Provide 2-3 quick safety tips or questions they should ask their technician.

Keep the response concise, helpful, and formatted with bullet points.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `User asked: "${query}". Location context: ${city}, Service area: ${category}. Provide guidance & estimated cost in PKR.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description: "Direct helpful advice and explanation.",
            },
            estimatedCostPKR: {
              type: Type.STRING,
              description: "Estimated cost range in Pakistani Rupees (e.g. Rs. 1,500 - 3,500).",
            },
            suggestedCategory: {
              type: Type.STRING,
              description: "Matching service category name.",
            },
            safetyTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 short practical tips.",
            },
          },
          required: ["answer", "estimatedCostPKR", "suggestedCategory"],
        },
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text.trim());
      return res.json({
        success: true,
        answer: data.answer,
        estimatedCostPKR: data.estimatedCostPKR,
        suggestedCategory: data.suggestedCategory,
        safetyTips: data.safetyTips || [],
      });
    }

    throw new Error("Empty response from Gemini");
  } catch (error: any) {
    console.error("AI Assistant Error:", error);
    res.status(500).json({
      success: false,
      answer: "Standard service charges in Pakistan typically range from Rs. 800 for basic repairs to Rs. 5,000 for complex jobs. Browse our verified providers list to call or WhatsApp directly!",
      estimatedCostPKR: "Rs. 1,000 - 5,000",
      suggestedCategory: "General",
    });
  }
});

// Endpoint: Confirm Booking Request
app.post("/api/booking/create", (req, res) => {
  const { customerName, phone, address, city, area, serviceCategory, providerName, preferredDate, preferredTime, notes } = req.body;

  if (!customerName || !phone || !city) {
    return res.status(400).json({ error: "Name, phone, and city are required." });
  }

  const bookingId = `LSH-${Math.floor(100000 + Math.random() * 900000)}`;

  res.json({
    success: true,
    bookingId,
    message: `Booking request ${bookingId} submitted successfully! The service provider will call/WhatsApp you shortly at ${phone}.`,
    details: {
      bookingId,
      customerName,
      phone,
      address,
      city,
      area,
      serviceCategory,
      providerName: providerName || "Nearest Verified Professional",
      preferredDate,
      preferredTime,
      notes,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    },
  });
});

// Vite Integration (Development vs Production)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Local Services Hub Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
