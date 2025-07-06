import axios from 'axios';

// ============================================
// API SERVICE LAYER - BACKEND INTEGRATION
// ============================================
import {
  Property,
  Inquiry,
  Viewing,
  DashboardStats,
  PropertyFilters,
  Activity,
  PropertyPerformance,
  User,
  LoginResponse
} from '@/types';

// ============================================
// BASE API CONFIGURATION
// ============================================
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});


// Auth interceptor
apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Redirect to login if unauthorized
          window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
          break;
        case 403:
          // Handle forbidden errors
          console.error('Forbidden:', error.response.data);
          break;
        case 404:
          // Handle not found errors
          console.error('Not Found:', error.config?.url);
          break;
        case 500:
          // Handle server errors
          console.error('Server Error:', error.response.data);
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      console.error('Network Error:', 'No response received');
    } else {
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);
// Complted till here = edit
// ============================================
// PROPERTIES API - Full CRUD Operations
// ============================================

export const propertiesAPI = {
  create: async (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> => {
    try {
      const formData = new FormData();
      Object.entries(property).forEach(([key, value]) => {
        if (key === 'images') {
          (value as File[]).forEach((image) => formData.append('images', image));
        } else if (key === 'location') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string | Blob);
        }
      });

      const response = await apiClient.post<Property>('/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return handleAPIError(error);
    }
  },

  getAll: async (filters?: PropertyFilters): Promise<{ properties: Property[]; pagination: any }> => {
    try {
      const response = await apiClient.get('/properties', {
        params: filters,
        paramsSerializer: {
          indexes: null,
        },
      });
      return response.data;  // ✅ This is already { properties, pagination }
    } catch (error) {
      return handleAPIError(error);
    }
  },

  getById: async (id: string): Promise<Property> => {
    try {
      const response = await apiClient.get<Property>(`/properties/${id}`);
      return response.data;
    } catch (error) {
      return handleAPIError(error);
    }
  },

  update: async (id: string, updates: Partial<Property>): Promise<Property> => {
    try {
      const response = await apiClient.patch<Property>(`/properties/${id}`, updates);
      return response.data;
    } catch (error) {
      return handleAPIError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/properties/${id}`);
    } catch (error) {
      handleAPIError(error);
    }
  },

  archive: async (id: string): Promise<Property> => {
    try {
        const response = await apiClient.patch<Property>(`/properties/${id}/archive`);
        return response.data;
      } catch (error) {
        return handleAPIError(error);
      }
    },
};

  // READ - Get all properties with filters
  // getAll: async (filters?: PropertyFilters): Promise<Property[]> => {
    // TODO: GET /api/properties with query parameters
    // TODO: Implement server-side filtering, sorting, pagination
    // TODO: Add caching strategy
    /*
    const queryParams = new URLSearchParams();
    if (filters) {
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.type !== 'all') queryParams.append('type', filters.type);
      if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms.toString());
      if (filters.bathrooms) queryParams.append('bathrooms', filters.bathrooms.toString());
      if (filters.minArea) queryParams.append('minArea', filters.minArea.toString());
      if (filters.maxArea) queryParams.append('maxArea', filters.maxArea.toString());
      if (filters.priceRange) {
        queryParams.append('minPrice', filters.priceRange[0].toString());
        queryParams.append('maxPrice', filters.priceRange[1].toString());
      }
      if (filters.amenities?.length) {
        queryParams.append('amenities', filters.amenities.join(','));
      }
    }

    const response = await fetch(`${API_BASE_URL}/properties?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    
    return await response.json();
    */
    
    //   console.log('API Call: GET /api/properties', filters);
    //   // Mock implementation - replace with actual API call
    //   const { mockProperties } = await import('@/data/mockData');
    //   return new Promise((resolve) => {
    //     setTimeout(() => resolve(mockProperties), 500);
    //   });
    // },

  // READ - Get single property by ID
  // getById: async (id: string): Promise<Property> => {
    // TODO: GET /api/properties/:id
    // TODO: Handle 404 errors
    // TODO: Add related data (inquiries, viewings) if needed
    /*
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Property not found');
      }
      throw new Error('Failed to fetch property');
    }
    
    return await response.json();
    */
    
    //   console.log('API Call: GET /api/properties/' + id);
    //   const { mockProperties } = await import('@/data/mockData');
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       const property = mockProperties.find(p => p.id === id);
    //       if (property) {
    //         resolve(property);
    //       } else {
    //         reject(new Error('Property not found'));
    //       }
    //     }, 500);
    //   });
    // },

  // UPDATE - Update existing property
  // update: async (id: string, updates: Partial<Property>): Promise<Property> => {
    // TODO: PUT /api/properties/:id or PATCH /api/properties/:id
    // TODO: Handle partial updates
    // TODO: Validate permissions (only owner/agent can update)
    /*
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(updates)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update property');
    }
    
    return await response.json();
    */
    
    // console.log('API Call: PATCH /api/properties/' + id, updates);
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve({
    //         id,
    //         ...updates,
    //         updatedAt: new Date().toISOString(),
    //       } as Property);
    //     }, 1000);
    //   });
    // },

  // DELETE - Delete property (soft delete recommended)
  // delete: async (id: string): Promise<void> => {
    // TODO: DELETE /api/properties/:id
    // TODO: Implement soft delete (set status to 'deleted')
    // TODO: Validate permissions
    // TODO: Handle related data (inquiries, viewings)
    /*
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete property');
    }
    */
    
    //   console.log('API Call: DELETE /api/properties/' + id);
    //   return new Promise((resolve) => {
    //     setTimeout(() => resolve(), 1000);
    //   });
    // },

  // ARCHIVE - Archive property (change status)
    // archive: async (id: string): Promise<Property> => {
      // TODO: PATCH /api/properties/:id with status update
      /*
        const response = await fetch(`${API_BASE_URL}/properties/${id}/archive`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to archive property');
        }
        
        return await response.json();
        */

  //     console.log('API Call: PATCH /api/properties/' + id + '/archive');
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve({
  //           id,
  //           status: 'archived',
  //           updatedAt: new Date().toISOString(),
  //         } as Property);
  //       }, 1000);
  //     });
  //   }
// };

// ============================================
// INQUIRIES API - Full CRUD Operations
// ============================================
// TODOs : to wrap with try catch
export const inquiriesAPI = {
  create: async (inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Promise<Inquiry> => {
    const response = await apiClient.post('/inquiries', inquiry);
    return response.data;
  },

  getAll: async (): Promise<Inquiry[]> => {
    const response = await apiClient.get('/inquiries');
    return response.data;
  },

  updateStatus: async (id: string, status: Inquiry['status']): Promise<Inquiry> => {
    const response = await apiClient.patch(`/inquiries/${id}`, { status });
    return response.data;
  },

  respond: async (id: string, response: string): Promise<void> => {
    await apiClient.post(`/inquiries/${id}/respond`, { response });
  },
};

// ============================================
// VIEWINGS API - Full CRUD Operations
// ============================================
// TODO : to wrap with try catch
export const viewingsAPI = {
  create: async (viewing: Omit<Viewing, 'id' | 'createdAt'>): Promise<Viewing> => {
    const response = await apiClient.post('/viewings', viewing);
    return response.data;
  },

  getAll: async (): Promise<Viewing[]> => {
    const response = await apiClient.get('/viewings');
    return response.data;
  },

  update: async (id: string, updates: Partial<Viewing>): Promise<Viewing> => {
    const response = await apiClient.patch(`/viewings/${id}`, updates);
    return response.data;
  },

  cancel: async (id: string, reason?: string): Promise<void> => {
    await apiClient.patch(`/viewings/${id}/cancel`, { reason });
  },
};
// ============================================
// DASHBOARD API - Analytics & Stats
// ============================================
// TODO : to wrap with try catch
export const dashboardAPI = {
  /**
   * Get dashboard statistics and analytics
   * @returns Promise<DashboardStats>
   */
  getStats: async (): Promise<DashboardStats> => {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      handleAPIError(error);
      throw error; // Re-throw after handling
    }
  },

  /**
   * Get recent activity log
   * @param limit Number of recent activities to fetch
   * @returns Promise<Activity[]>
   */
  getRecentActivity: async (limit: number = 10): Promise<Activity[]> => {
    try {
      const response = await apiClient.get('/dashboard/activity', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      handleAPIError(error);
      throw error;
    }
  },

  /**
   * Get property performance metrics
   * @param timeframe '7d' | '30d' | '90d' | 'all'
   * @returns Promise<PropertyPerformance>
   */
  getPropertyPerformance: async (
    timeframe: '7d' | '30d' | '90d' | 'all' = '30d'
  ): Promise<PropertyPerformance> => {
    try {
      const response = await apiClient.get('/dashboard/performance', {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      handleAPIError(error);
      throw error;
    }
  }
};

// ============================================
// AUTHENTICATION API
// ============================================
// TODO : to wrap with try catch
export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', { email, password });
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } catch (error) {
      return handleAPIError(error);
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
      localStorage.removeItem('authToken');
    } catch (error) {
      handleAPIError(error);
    }
  },

  register: async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await apiClient.post<User>('/auth/register', userData);
      return response.data;
    } catch (error) {
      return handleAPIError(error);
    }
  },

  refreshToken: async (): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/refresh-token');
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } catch (error) {
      localStorage.removeItem('authToken');
      return handleAPIError(error);
    }
  },

  getProfile: async (): Promise<User> => {
    try {
      const response = await apiClient.get<User>('/auth/profile');
      return response.data;
    } catch (error) {
      return handleAPIError(error);
    }
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// TODO: Implement token management
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const handleAPIError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message;
    const statusCode = error.response?.status;
    const errorMessage = serverMessage || error.message;
    
    //SCOPE: You can integrate with your notification system here
    console.error(`API Error [${statusCode}]:`, errorMessage);
    
    throw new Error(errorMessage);
  }
};

export const uploadFiles = async (files: File[], endpoint = '/upload'): Promise<string[]> => {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    const response = await apiClient.post<{ urls: string[] }>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.urls;
  } catch (error) {
    return handleAPIError(error);
  }
};


// ============================================
// EXPORT ALL API SERVICES
// ============================================

export const API = {
  properties: propertiesAPI,
  inquiries: inquiriesAPI,
  viewings: viewingsAPI,
  dashboard: dashboardAPI,
  auth: authAPI,
  upload: uploadFiles,
};