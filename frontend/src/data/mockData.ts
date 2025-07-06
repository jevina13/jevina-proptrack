import { Property, Client, Inquiry, Viewing, Agent, DashboardStats } from '@/types';
import { apiClient } from '@/services/api';

// Mock Properties Data
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views. Features include modern appliances, hardwood floors, and a private balcony.',
    price: 2500,
    type: 'rent',
    location: {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    amenities: ['Parking', 'Gym', 'Balcony', 'Pet Friendly', 'Laundry'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&h=600&fit=crop'
    ],
    status: 'active',
    agentId: '1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Luxury Family Home',
    description: 'Spacious 4-bedroom family home with a large backyard, perfect for families. Features include a modern kitchen, master suite, and two-car garage.',
    price: 750000,
    type: 'sale',
    location: {
      address: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    amenities: ['Garage', 'Garden', 'Pool', 'Fireplace', 'Walk-in Closet'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop'
    ],
    status: 'active',
    agentId: '1',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    title: 'Cozy Studio Loft',
    description: 'Perfect starter home or investment property. This charming studio loft features exposed brick walls, high ceilings, and modern amenities.',
    price: 1800,
    type: 'rent',
    location: {
      address: '789 Broadway',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    amenities: ['Parking', 'Gym', 'Rooftop Deck', 'Laundry'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'
    ],
    status: 'active',
    agentId: '1',
    createdAt: '2024-01-25T09:15:00Z',
    updatedAt: '2024-01-25T09:15:00Z'
  },
  {
    id: '4',
    title: 'Suburban Paradise',
    description: 'Beautiful 3-bedroom home in quiet suburban neighborhood. Features include updated kitchen, finished basement, and large lot.',
    price: 450000,
    type: 'sale',
    location: {
      address: '321 Elm Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      coordinates: { lat: 30.2672, lng: -97.7431 }
    },
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    amenities: ['Garage', 'Garden', 'Basement', 'Fireplace'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    ],
    status: 'active',
    agentId: '1',
    createdAt: '2024-02-01T11:45:00Z',
    updatedAt: '2024-02-01T11:45:00Z'
  }
];

// Mock Clients Data
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    inquiries: [],
    viewings: [],
    createdAt: '2024-01-10T08:00:00Z'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 987-6543',
    inquiries: [],
    viewings: [],
    createdAt: '2024-01-15T10:30:00Z'
  }
];

// Mock Inquiries Data
export const mockInquiries: Inquiry[] = [
  {
    id: '1',
    propertyId: '1',
    clientId: '1',
    message: 'I am interested in scheduling a viewing for this apartment. When would be a good time?',
    status: 'new',
    createdAt: '2024-02-05T14:20:00Z'
  },
  {
    id: '2',
    propertyId: '2',
    clientId: '2',
    message: 'Could you provide more information about the neighborhood and schools nearby?',
    status: 'contacted',
    createdAt: '2024-02-03T16:45:00Z'
  }
];

// Mock Viewings Data
export const mockViewings: Viewing[] = [
  {
    id: '1',
    propertyId: '1',
    clientId: '1',
    agentId: '1',
    scheduledDate: '2024-02-10T15:00:00Z',
    status: 'scheduled',
    createdAt: '2024-02-05T14:25:00Z'
  },
  {
    id: '2',
    propertyId: '2',
    clientId: '2',
    agentId: '1',
    scheduledDate: '2024-02-08T10:30:00Z',
    status: 'completed',
    notes: 'Client was very interested, considering making an offer.',
    createdAt: '2024-02-03T17:00:00Z'
  }
];

// Mock Agent Data
export const mockAgent: Agent = {
  id: '1',
  name: 'Alex Thompson',
  email: 'alex.thompson@proptrack.com',
  phone: '+1 (555) 234-5678',
  properties: mockProperties
};

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalProperties: 4,
  activeListings: 4,
  totalInquiries: 2,
  scheduledViewings: 1,
  recentActivity: [
    {
      id: '1',
      type: 'inquiry',
      message: 'New inquiry received for Modern Downtown Apartment',
      timestamp: '2024-02-05T14:20:00Z'
    },
    {
      id: '2',
      type: 'viewing',
      message: 'Viewing completed for Luxury Family Home',
      timestamp: '2024-02-08T10:30:00Z'
    },
    {
      id: '3',
      type: 'property',
      message: 'New property added: Suburban Paradise',
      timestamp: '2024-02-01T11:45:00Z'
    }
  ]
};

// API Placeholders - Replace with actual API calls when backend is ready
export const api = {
  // ============ PROPERTIES ============
  getProperties: async (filters?: PropertyFilters): Promise<Property[]> => {
    try {
      const response = await apiClient.get('/properties', {
        params: filters,
        paramsSerializer: {
          indexes: null, // Proper array serialization
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      throw error;
    }
  },

  getProperty: async (id: string): Promise<Property> => {
    try {
      const response = await apiClient.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch property ${id}:`, error);
      throw error;
    }
  },

  createProperty: async (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> => {
    try {
      const formData = new FormData();
      
      // Append all property fields
      Object.entries(property).forEach(([key, value]) => {
        if (key === 'images') {
          // Handle multiple image files
          property.images.forEach((image) => {
            formData.append('images', image);
          });
        } else if (key === 'location') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      const response = await apiClient.post('/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create property:', error);
      throw error;
    }
  },

  updateProperty: async (id: string, updates: Partial<Property>): Promise<Property> => {
    try {
      const response = await apiClient.patch(`/properties/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error(`Failed to update property ${id}:`, error);
      throw error;
    }
  },

  deleteProperty: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/properties/${id}`);
    } catch (error) {
      console.error(`Failed to delete property ${id}:`, error);
      throw error;
    }
  },

  // ============ INQUIRIES ============
  createInquiry: async (inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Promise<Inquiry> => {
    try {
      const response = await apiClient.post('/inquiries', inquiry);
      return response.data;
    } catch (error) {
      console.error('Failed to create inquiry:', error);
      throw error;
    }
  },

  getInquiries: async (): Promise<Inquiry[]> => {
    try {
      const response = await apiClient.get('/inquiries');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
      throw error;
    }
  },

  getPropertyInquiries: async (propertyId: string): Promise<Inquiry[]> => {
    try {
      const response = await apiClient.get(`/inquiries/property/${propertyId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch inquiries for property ${propertyId}:`, error);
      throw error;
    }
  },

  // ============ VIEWINGS ============
  createViewing: async (viewing: Omit<Viewing, 'id' | 'createdAt'>): Promise<Viewing> => {
    try {
      const response = await apiClient.post('/viewings', viewing);
      return response.data;
    } catch (error) {
      console.error('Failed to create viewing:', error);
      throw error;
    }
  },

  getViewings: async (): Promise<Viewing[]> => {
    try {
      const response = await apiClient.get('/viewings');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch viewings:', error);
      throw error;
    }
  },

  getAgentViewings: async (agentId: string): Promise<Viewing[]> => {
    try {
      const response = await apiClient.get(`/viewings/agent/${agentId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch viewings for agent ${agentId}:`, error);
      throw error;
    }
  },

  updateViewing: async (id: string, updates: Partial<Viewing>): Promise<Viewing> => {
    try {
      const response = await apiClient.patch(`/viewings/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error(`Failed to update viewing ${id}:`, error);
      throw error;
    }
  },

  cancelViewing: async (id: string, reason?: string): Promise<void> => {
    try {
      await apiClient.patch(`/viewings/${id}/cancel`, { reason });
    } catch (error) {
      console.error(`Failed to cancel viewing ${id}:`, error);
      throw error;
    }
  },

  // ============ DASHBOARD ============
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      throw error;
    }
  },

  getRecentActivity: async (limit: number = 10): Promise<Activity[]> => {
    try {
      const response = await apiClient.get('/dashboard/activity', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch recent activity:', error);
      throw error;
    }
  },

  getPropertyPerformance: async (
    timeframe: '7d' | '30d' | '90d' | 'all' = '30d'
  ): Promise<PropertyPerformance> => {
    try {
      const response = await apiClient.get('/dashboard/performance', {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch property performance:', error);
      throw error;
    }
  }
};

// Utility function for error handling
export const handleAPIError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    console.error('API Error:', message);
    // You can add toast notifications here
    throw new Error(message);
  }
};