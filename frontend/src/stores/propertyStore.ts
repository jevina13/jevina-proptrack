import { create } from 'zustand';
import { Property, PropertyFilters } from '@/types';
// TODO: Replace mockData import with actual API service
// import { api } from '@/data/mockData'
import { propertiesAPI } from '@/services/api';

interface PropertyStore {
  properties: Property[];
  loading: boolean;
  error: string | null;
  filters: PropertyFilters;
  currentPage: number;
  totalPages: number;
  selectedProperty: Property | null;
  
  // Actions
  fetchProperties: () => Promise<void>;
  fetchProperty: (id: string) => Promise<void>;
  createProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
  setCurrentPage: (page: number) => void;
  clearSelectedProperty: () => void;
}

const defaultFilters: PropertyFilters = {
  priceRange: [0, 2000000],
  location: '',
  type: 'all',
  bedrooms: null,
  bathrooms: null,
  minArea: null,
  maxArea: null,
  amenities: []
};

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  properties: [],
  loading: false,
  error: null,
  filters: defaultFilters,
  currentPage: 1,
  totalPages: 1,
  selectedProperty: null,

  fetchProperties: async () => {
    set({ loading: true, error: null });
    try {
      const filters = get().filters;
  
      const { properties } = await propertiesAPI.getAll(filters);
 // ✅ destructure `data`
      console.log('Fetched properties:', properties); // Debugging line to check fetched data
      let filteredProperties = properties;

      if (filters.type !== 'all') {
        filteredProperties = filteredProperties.filter(p => p.type === filters.type);
      }
  
      if (filters.location) {
        filteredProperties = filteredProperties.filter(p =>
          p.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
          p.location.address.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
  
      if (filters.bedrooms !== null) {
        filteredProperties = filteredProperties.filter(p => p.bedrooms >= filters.bedrooms!);
      }
  
      if (filters.bathrooms !== null) {
        filteredProperties = filteredProperties.filter(p => p.bathrooms >= filters.bathrooms!);
      }
  
      if (filters.minArea !== null) {
        filteredProperties = filteredProperties.filter(p => p.area >= filters.minArea!);
      }
  
      if (filters.maxArea !== null) {
        filteredProperties = filteredProperties.filter(p => p.area <= filters.maxArea!);
      }
  
      if (filters.amenities.length > 0) {
        filteredProperties = filteredProperties.filter(p =>
          filters.amenities.some(amenity => p.amenities.includes(amenity))
        );
      }
  
      filteredProperties = filteredProperties.filter(p =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
      set({
        properties: filteredProperties,
        loading: false,
        totalPages: Math.ceil(filteredProperties.length / 12)
      });
    } catch (error) {
      set({ error: 'Failed to fetch properties', loading: false });
    }
  },
  
  fetchProperty: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const property = await propertiesAPI.getById(id) as Property;
      set({ selectedProperty: property, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch property', loading: false });
    }
  },

  createProperty: async (property) => {
    set({ loading: true, error: null });
    try {
      await propertiesAPI.create(property);
      get().fetchProperties();
    } catch (error) {
      set({ error: 'Failed to create property', loading: false });
    }
  },

  updateProperty: async (id, property) => {
    set({ loading: true, error: null });
    try {
      await propertiesAPI.update(id, property);
      get().fetchProperties();
    } catch (error) {
      set({ error: 'Failed to update property', loading: false });
    }
  },

  deleteProperty: async (id) => {
    set({ loading: true, error: null });
    try {
      await propertiesAPI.delete(id);
      get().fetchProperties();
    } catch (error) {
      set({ error: 'Failed to delete property', loading: false });
    }
  },

  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters }, currentPage: 1 });
    get().fetchProperties();
  },

  resetFilters: () => {
    set({ filters: defaultFilters, currentPage: 1 });
    get().fetchProperties();
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  clearSelectedProperty: () => {
    set({ selectedProperty: null });
  }
}));