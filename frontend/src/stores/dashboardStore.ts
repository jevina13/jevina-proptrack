import { create } from 'zustand';
import { DashboardStats, Inquiry, Viewing } from '@/types';
// TODO: Replace mockData import with actual API service
import { api } from '@/data/mockData';
// TODO: Use these when backend is ready
// import { inquiriesAPI, viewingsAPI, dashboardAPI } from '@/services/api';

interface DashboardStore {
  stats: DashboardStats | null;
  inquiries: Inquiry[];
  viewings: Viewing[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchDashboardStats: () => Promise<void>;
  fetchInquiries: () => Promise<void>;
  fetchViewings: () => Promise<void>;
  createViewing: (viewing: Omit<Viewing, 'id' | 'createdAt'>) => Promise<void>;
  updateViewing: (id: string, viewing: Partial<Viewing>) => Promise<void>;
  createInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  stats: null,
  inquiries: [],
  viewings: [],
  loading: false,
  error: null,

  fetchDashboardStats: async () => {
    set({ loading: true, error: null });
    try {
      const stats = await api.getDashboardStats() as DashboardStats;
      set({ stats, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch dashboard stats', loading: false });
    }
  },

  fetchInquiries: async () => {
    set({ loading: true, error: null });
    try {
      const inquiries = await api.getInquiries() as Inquiry[];
      set({ inquiries, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch inquiries', loading: false });
    }
  },

  fetchViewings: async () => {
    set({ loading: true, error: null });
    try {
      const viewings = await api.getViewings() as Viewing[];
      set({ viewings, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch viewings', loading: false });
    }
  },

  createViewing: async (viewing) => {
    set({ loading: true, error: null });
    try {
      await api.createViewing(viewing);
      get().fetchViewings();
    } catch (error) {
      set({ error: 'Failed to create viewing', loading: false });
    }
  },

  updateViewing: async (id, viewing) => {
    set({ loading: true, error: null });
    try {
      await api.updateViewing(id, viewing);
      get().fetchViewings();
    } catch (error) {
      set({ error: 'Failed to update viewing', loading: false });
    }
  },

  createInquiry: async (inquiry) => {
    set({ loading: true, error: null });
    try {
      await api.createInquiry(inquiry);
      get().fetchInquiries();
    } catch (error) {
      set({ error: 'Failed to create inquiry', loading: false });
    }
  }
}));