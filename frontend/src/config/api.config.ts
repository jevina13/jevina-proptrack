// ============================================
// API CONFIGURATION - BACKEND INTEGRATION
// ============================================
// TODO: Set up environment variables in your deployment platform
// TODO: Configure different environments (dev, staging, prod)

// ============================================
// ENVIRONMENT CONFIGURATION
// ============================================

export const API_CONFIG = {
  // TODO: Replace with actual backend URL
  // TODO: Set VITE_API_BASE_URL in your environment variables
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  
  // TODO: Configure timeout based on your backend performance
  TIMEOUT: 10000, // 10 seconds
  
  // TODO: Set up proper CORS configuration on backend
  CREDENTIALS: 'include' as RequestCredentials,
  
  // TODO: Configure retry logic for failed requests
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// ============================================
// API ENDPOINTS - BACKEND ROUTES MAPPING
// ============================================
// TODO: Update these endpoints to match your Express.js routes

export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',              // TODO: POST - User login
    LOGOUT: '/auth/logout',            // TODO: POST - User logout  
    REGISTER: '/auth/register',        // TODO: POST - User registration
    REFRESH: '/auth/refresh-token',    // TODO: POST - Refresh JWT token
    PROFILE: '/auth/profile',          // TODO: GET - Get user profile
    FORGOT_PASSWORD: '/auth/forgot-password', // TODO: POST - Password reset
    RESET_PASSWORD: '/auth/reset-password',   // TODO: POST - Password reset confirmation
  },

  // Properties endpoints  
  PROPERTIES: {
    BASE: '/properties',               // TODO: GET (all), POST (create)
    BY_ID: '/properties/:id',          // TODO: GET, PUT, DELETE
    SEARCH: '/properties/search',      // TODO: GET - Advanced search with filters
    FEATURED: '/properties/featured',  // TODO: GET - Featured properties
    ARCHIVE: '/properties/:id/archive', // TODO: PATCH - Archive property
    UPLOAD_IMAGES: '/properties/:id/images', // TODO: POST - Upload property images
    NEARBY: '/properties/:id/nearby',  // TODO: GET - Get nearby properties
  },

  // Inquiries endpoints
  INQUIRIES: {
    BASE: '/inquiries',                // TODO: GET (all), POST (create)
    BY_ID: '/inquiries/:id',           // TODO: GET, PUT, DELETE
    RESPOND: '/inquiries/:id/respond', // TODO: POST - Send response to inquiry
    BY_PROPERTY: '/inquiries/property/:propertyId', // TODO: GET - Get inquiries for property
    BY_CLIENT: '/inquiries/client/:clientId',       // TODO: GET - Get client's inquiries
    MARK_READ: '/inquiries/:id/read',  // TODO: PATCH - Mark inquiry as read
  },

  // Viewings endpoints
  VIEWINGS: {
    BASE: '/viewings',                 // TODO: GET (all), POST (create)
    BY_ID: '/viewings/:id',            // TODO: GET, PUT, DELETE
    CANCEL: '/viewings/:id/cancel',    // TODO: PATCH - Cancel viewing
    COMPLETE: '/viewings/:id/complete', // TODO: PATCH - Mark viewing as completed
    BY_PROPERTY: '/viewings/property/:propertyId', // TODO: GET - Get viewings for property
    BY_AGENT: '/viewings/agent/:agentId',          // TODO: GET - Get agent's viewings
    BY_CLIENT: '/viewings/client/:clientId',       // TODO: GET - Get client's viewings
    AVAILABILITY: '/viewings/availability',        // TODO: GET - Check agent availability
  },

  // Clients endpoints
  CLIENTS: {
    BASE: '/clients',                  // TODO: GET (all), POST (create)
    BY_ID: '/clients/:id',             // TODO: GET, PUT, DELETE
    BY_EMAIL: '/clients/email/:email', // TODO: GET - Find client by email
    MERGE: '/clients/:id/merge',       // TODO: POST - Merge duplicate clients
  },

  // Agents endpoints
  AGENTS: {
    BASE: '/agents',                   // TODO: GET (all), POST (create)
    BY_ID: '/agents/:id',              // TODO: GET, PUT, DELETE
    PROPERTIES: '/agents/:id/properties', // TODO: GET - Get agent's properties
    PERFORMANCE: '/agents/:id/stats',  // TODO: GET - Agent performance metrics
  },

  // Dashboard endpoints
  DASHBOARD: {
    STATS: '/dashboard/stats',         // TODO: GET - Dashboard statistics
    RECENT_ACTIVITY: '/dashboard/activity', // TODO: GET - Recent activity feed
    ANALYTICS: '/dashboard/analytics', // TODO: GET - Advanced analytics
    EXPORT: '/dashboard/export',       // TODO: GET - Export data
  },

  // File upload endpoints
  UPLOAD: {
    IMAGES: '/upload/images',          // TODO: POST - Upload property images
    DOCUMENTS: '/upload/documents',    // TODO: POST - Upload documents
    AVATAR: '/upload/avatar',          // TODO: POST - Upload user avatar
  },

  // Search and filters
  SEARCH: {
    PROPERTIES: '/search/properties',  // TODO: GET - Advanced property search
    SUGGESTIONS: '/search/suggestions', // TODO: GET - Search suggestions/autocomplete
    SAVED_SEARCHES: '/search/saved',   // TODO: GET, POST - Saved searches
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: '/notifications',            // TODO: GET (all), POST (create)
    MARK_READ: '/notifications/:id/read', // TODO: PATCH - Mark as read
    PREFERENCES: '/notifications/preferences', // TODO: GET, PUT - Notification settings
  }
};

// ============================================
// REQUEST HEADERS CONFIGURATION
// ============================================

export const getDefaultHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('authToken');
  
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    // TODO: Add other required headers (API key, version, etc.)
    // 'X-API-Version': '1.0',
    // 'X-Client-Platform': 'web',
  };
};

// ============================================
// ERROR CODES MAPPING
// ============================================
// TODO: Update these to match your backend error codes

export const API_ERROR_CODES = {
  // Authentication errors
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  TOKEN_EXPIRED: 498,

  // Client errors  
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  RATE_LIMITED: 429,

  // Server errors
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,

  // Custom business logic errors
  PROPERTY_NOT_AVAILABLE: 4001,
  VIEWING_CONFLICT: 4002,
  INQUIRY_DUPLICATE: 4003,
};

// ============================================
// CACHE CONFIGURATION
// ============================================

export const CACHE_CONFIG = {
  // TODO: Configure cache durations based on data freshness requirements
  PROPERTIES_LIST: 5 * 60 * 1000,     // 5 minutes
  PROPERTY_DETAILS: 10 * 60 * 1000,   // 10 minutes
  DASHBOARD_STATS: 2 * 60 * 1000,     // 2 minutes
  USER_PROFILE: 15 * 60 * 1000,       // 15 minutes
};

// ============================================
// FILE UPLOAD CONFIGURATION
// ============================================

export const UPLOAD_CONFIG = {
  // TODO: Configure file upload limits to match backend
  MAX_FILE_SIZE: 5 * 1024 * 1024,     // 5MB
  MAX_FILES_PER_PROPERTY: 10,
  ALLOWED_IMAGE_TYPES: [
    'image/jpeg',
    'image/png', 
    'image/webp',
    'image/heic'
  ],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
};

// ============================================
// DEVELOPMENT HELPERS
// ============================================

export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// TODO: Remove in production
if (isDevelopment) {
  console.log('🔧 API Configuration:', {
    baseUrl: API_CONFIG.BASE_URL,
    endpoints: Object.keys(API_ENDPOINTS),
    isDev: isDevelopment,
  });
}