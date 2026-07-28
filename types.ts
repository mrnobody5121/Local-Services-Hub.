export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name or emoji
  emoji: string;
  description: string;
  providerCount: number;
  avgPrice: string;
}

export interface Review {
  id: string;
  authorName: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Provider {
  id: string;
  name: string;
  profession: string;
  categoryId: string;
  city: string;
  area: string;
  phone: string;
  whatsapp: string;
  email: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  availabilityText: string;
  startingPrice: string;
  avatarUrl: string;
  cnicVerified: boolean;
  policeChecked: boolean;
  bio: string;
  servicesOffered: string[];
  reviewsList?: Review[];
}

export interface BookingRequest {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  area: string;
  serviceCategory: string;
  providerId?: string;
  providerName?: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface ProviderRegistration {
  name: string;
  profession: string;
  categoryId: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  area: string;
  experienceYears: number;
  startingPrice: string;
  photoUrl: string;
  description: string;
}

export interface SearchFilterState {
  service: string;
  city: string;
  area: string;
  minRating: number;
  availability: "all" | "available_now";
  sortBy: "recommended" | "rating" | "experience" | "price_low";
  searchQuery: string;
}

