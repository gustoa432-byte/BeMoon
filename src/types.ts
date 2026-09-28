export type CategoryType = 
  | 'all'
  | 'hair'
  | 'nails'
  | 'barber'
  | 'brows'
  | 'makeup'
  | 'skin'
  | 'tattoo';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  durationMinutes: number;
  priceFrom: number;
  image?: string;
}

export interface CareerMilestone {
  year: string;
  placeName: string;
  role: string;
  isCurrent?: boolean;
  notes?: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  serviceName: string;
  text: string;
  photoUrl?: string;
}

export interface WorkItem {
  id: string;
  masterId: string;
  title: string;
  mediaUrl: string;
  aspectRatio: 'square' | 'portrait';
  likesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  serviceId?: string;
  serviceName?: string;
  tags: string[];
  date: string;
  isBeforeAfter?: boolean;
  beforeMediaUrl?: string;
}

export interface ShortItem {
  id: string;
  masterId: string;
  masterName: string;
  masterAvatar: string;
  specialization: string;
  title: string;
  videoUrl: string;
  posterUrl: string;
  views: number;
  duration: number;
  category: string;
  serviceId?: string;
  serviceName?: string;
  priceFrom?: number;
  likes: number;
  isLiked?: boolean;
}

export interface Master {
  id: string;
  name: string;
  handle: string;
  specialization: string;
  category: CategoryType;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  followersCount: number;
  isFollowing?: boolean;
  city: string;
  district: string;
  distanceKm: number;
  startingPrice: number;
  about: string;
  instagram?: string;
  currentPlaceId: string;
  currentPlaceName: string;
  careerHistory: CareerMilestone[];
  services: ServiceItem[];
  works: WorkItem[];
  shorts: ShortItem[];
  reviews: ReviewItem[];
  availability: Record<string, string[]>;
  lat: number;
  lng: number;
}

export interface PlaceItem {
  id: string;
  name: string;
  city: string;
  district: string;
  address: string;
  rating: number;
  reviewsCount: number;
  photos: string[];
  description: string;
  workingMasterIds: string[];
  amenities: string[];
  lat: number;
  lng: number;
}

export interface Booking {
  id: string;
  masterId: string;
  masterName: string;
  masterAvatar: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  placeName: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  clientNote?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  masterId: string;
  sender: 'user' | 'master';
  text: string;
  timestamp: string;
  contextCard?: {
    serviceId: string;
    serviceName: string;
    priceFrom: number;
    durationMinutes: number;
  };
}

export interface FilterState {
  searchQuery: string;
  category: CategoryType;
  location: string;
  maxPrice: number | null;
  availableTodayOnly: boolean;
  minRating: number | null;
}
