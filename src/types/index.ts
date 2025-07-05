// PropTrack Types
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'sale' | 'rent';
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq ft
  amenities: string[];
  images: string[];
  status: 'active' | 'sold' | 'rented' | 'archived';
  agentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiries: Inquiry[];
  viewings: Viewing[];
  createdAt: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  clientId: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface Viewing {
  id: string;
  propertyId: string;
  clientId: string;
  agentId: string;
  scheduledDate: string;
  status: 'scheduled' | 'completed' | 'no-show' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  properties: Property[];
}

export interface PropertyFilters {
  priceRange: [number, number];
  location: string;
  type: 'all' | 'sale' | 'rent';
  bedrooms: number | null;
  bathrooms: number | null;
  minArea: number | null;
  maxArea: number | null;
  amenities: string[];
}

export interface DashboardStats {
  totalProperties: number;
  activeListings: number;
  totalInquiries: number;
  scheduledViewings: number;
  recentActivity: Array<{
    id: string;
    type: 'inquiry' | 'viewing' | 'property';
    message: string;
    timestamp: string;
  }>;
}