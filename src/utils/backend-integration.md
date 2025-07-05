# Backend Integration Guide

## 🎯 Overview
This document provides a comprehensive guide for connecting the PropTrack frontend to a MERN (MongoDB + Express.js + React + Node.js) backend.

## 📁 Project Structure for Backend Integration

```
src/
├── services/           # API service layer
│   ├── api.ts         # Main API service with all CRUD operations
│   └── websocket.ts   # Real-time notifications (TODO)
├── config/            # Configuration files
│   ├── api.config.ts  # API endpoints and configuration
│   └── constants.ts   # App constants
├── types/             # TypeScript type definitions
│   ├── index.ts       # Main types (Property, Inquiry, etc.)
│   ├── api.types.ts   # API request/response types (TODO)
│   └── auth.types.ts  # Authentication types (TODO)
├── stores/            # Zustand state management
│   ├── propertyStore.ts   # Property state management
│   ├── dashboardStore.ts  # Dashboard state management
│   └── authStore.ts       # Authentication state (TODO)
├── hooks/             # Custom React hooks
│   ├── useApi.ts      # API calling hook (TODO)
│   ├── useAuth.ts     # Authentication hook (TODO)
│   └── useWebSocket.ts # WebSocket hook (TODO)
├── utils/             # Utility functions
│   ├── api-client.ts  # HTTP client configuration (TODO)
│   ├── error-handler.ts # Error handling utilities (TODO)
│   └── validation.ts  # Form validation utilities (TODO)
└── components/        # React components (existing)
```

## 🔧 Backend API Endpoints Required

### Authentication Endpoints
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/register
POST   /api/auth/refresh-token
GET    /api/auth/profile
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

### Properties Endpoints (Full CRUD)
```
GET    /api/properties              # Get all properties with filters
POST   /api/properties              # Create new property
GET    /api/properties/:id          # Get single property
PUT    /api/properties/:id          # Update property
DELETE /api/properties/:id          # Delete property (soft delete)
PATCH  /api/properties/:id/archive  # Archive property
POST   /api/properties/:id/images   # Upload property images
GET    /api/properties/search       # Advanced search
GET    /api/properties/featured     # Featured properties
```

### Inquiries Endpoints (Full CRUD)
```
GET    /api/inquiries               # Get all inquiries (agent view)
POST   /api/inquiries               # Create new inquiry
GET    /api/inquiries/:id           # Get single inquiry
PUT    /api/inquiries/:id           # Update inquiry
DELETE /api/inquiries/:id           # Delete inquiry
POST   /api/inquiries/:id/respond   # Send response to inquiry
PATCH  /api/inquiries/:id/read      # Mark as read
GET    /api/inquiries/property/:id  # Get inquiries for property
```

### Viewings Endpoints (Full CRUD)
```
GET    /api/viewings                # Get all viewings
POST   /api/viewings                # Schedule new viewing
GET    /api/viewings/:id            # Get single viewing
PUT    /api/viewings/:id            # Update viewing
DELETE /api/viewings/:id            # Delete viewing
PATCH  /api/viewings/:id/cancel     # Cancel viewing
PATCH  /api/viewings/:id/complete   # Mark as completed
GET    /api/viewings/agent/:id      # Get agent's viewings
GET    /api/viewings/availability   # Check availability
```

### Dashboard Endpoints
```
GET    /api/dashboard/stats         # Dashboard statistics
GET    /api/dashboard/activity      # Recent activity feed
GET    /api/dashboard/analytics     # Advanced analytics
```

### File Upload Endpoints
```
POST   /api/upload/images           # Upload property images
POST   /api/upload/documents        # Upload documents
POST   /api/upload/avatar           # Upload user avatar
```

## 🗄️ MongoDB Schema Requirements

### Property Schema
```javascript
const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['sale', 'rent'], required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  amenities: [String],
  images: [String],
  status: { 
    type: String, 
    enum: ['active', 'sold', 'rented', 'archived'], 
    default: 'active' 
  },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  featured: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 }
}, {
  timestamps: true
});
```

### Inquiry Schema
```javascript
const InquirySchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'closed'], 
    default: 'new' 
  },
  responses: [{
    message: String,
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    sentAt: { type: Date, default: Date.now }
  }],
  priority: { type: String, enum: ['low', 'normal', 'high'], default: 'normal' },
  isRead: { type: Boolean, default: false }
}, {
  timestamps: true
});
```

### Viewing Schema
```javascript
const ViewingSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  scheduledDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['scheduled', 'completed', 'no-show', 'cancelled'], 
    default: 'scheduled' 
  },
  notes: String,
  duration: { type: Number, default: 30 }, // minutes
  reminderSent: { type: Boolean, default: false },
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comments: String,
    interested: Boolean
  }
}, {
  timestamps: true
});
```

### Client Schema
```javascript
const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  preferences: {
    propertyType: String,
    priceRange: {
      min: Number,
      max: Number
    },
    location: String,
    bedrooms: Number,
    amenities: [String]
  },
  savedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  tags: [String], // VIP, first-time-buyer, etc.
  source: String, // website, referral, etc.
}, {
  timestamps: true
});
```

### Agent Schema
```javascript
const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  avatar: String,
  bio: String,
  specializations: [String],
  availability: {
    monday: [{ start: String, end: String }],
    tuesday: [{ start: String, end: String }],
    // ... other days
  },
  performance: {
    totalSales: { type: Number, default: 0 },
    totalRentals: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    responseTime: { type: Number, default: 0 } // in minutes
  }
}, {
  timestamps: true
});
```

## 🔐 Authentication & Authorization

### JWT Token Structure
```javascript
// JWT Payload
{
  userId: ObjectId,
  email: string,
  role: 'agent' | 'admin' | 'client',
  permissions: string[],
  iat: number,
  exp: number
}
```

### Middleware Requirements
```javascript
// Authentication middleware
const authenticateToken = (req, res, next) => {
  // TODO: Implement JWT verification
};

// Authorization middleware
const authorizeRole = (roles) => (req, res, next) => {
  // TODO: Check user role permissions
};

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

## 🔄 State Management Integration

### Zustand Store Updates Required

1. **Authentication Store** (TODO: Create)
```typescript
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}
```

2. **Error Handling Store** (TODO: Create)
```typescript
interface ErrorStore {
  errors: ApiError[];
  addError: (error: ApiError) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
}
```

## 📡 Real-time Features (WebSocket)

### Events to Implement
```typescript
// Client -> Server events
'join-room': { agentId: string }
'inquiry-submitted': { inquiryId: string }
'viewing-scheduled': { viewingId: string }

// Server -> Client events  
'new-inquiry': { inquiry: Inquiry }
'viewing-reminder': { viewing: Viewing }
'property-updated': { propertyId: string }
'client-message': { message: string, clientId: string }
```

## 🧪 Testing Requirements

### API Testing
```javascript
// Example test structure
describe('Properties API', () => {
  describe('GET /api/properties', () => {
    it('should return paginated properties');
    it('should filter by price range');
    it('should filter by location');
  });
  
  describe('POST /api/properties', () => {
    it('should create property with valid data');
    it('should reject invalid property data');
    it('should require authentication');
  });
});
```

## 🚀 Deployment Considerations

### Environment Variables
```bash
# Backend .env file
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/proptrack
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=24h

# File upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# Email service (SendGrid, etc.)
EMAIL_SERVICE_API_KEY=your-email-api-key
EMAIL_FROM=noreply@proptrack.com

# AWS S3 for file storage (optional)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=proptrack-uploads
```

### Frontend Environment Variables
```bash
# Frontend .env file
VITE_API_BASE_URL=https://api.proptrack.com
VITE_WS_URL=wss://api.proptrack.com
VITE_GOOGLE_MAPS_API_KEY=your-maps-key
VITE_SENTRY_DSN=your-sentry-dsn
```

## ✅ Integration Checklist

### Phase 1: Basic CRUD Operations
- [ ] Set up Express.js server with MongoDB
- [ ] Implement Property CRUD endpoints
- [ ] Connect property listing and details pages
- [ ] Test property creation/editing in dashboard

### Phase 2: Inquiries & Viewings
- [ ] Implement Inquiry submission and management
- [ ] Add Viewing scheduling system
- [ ] Connect dashboard inquiry/viewing pages
- [ ] Add email notifications

### Phase 3: Authentication
- [ ] Implement JWT authentication
- [ ] Add login/logout functionality
- [ ] Protect dashboard routes
- [ ] Add role-based permissions

### Phase 4: Advanced Features
- [ ] Add real-time notifications (WebSocket)
- [ ] Implement advanced search/filtering
- [ ] Add file upload for property images
- [ ] Performance optimization and caching

### Phase 5: Testing & Deployment
- [ ] Write API tests
- [ ] Set up CI/CD pipeline
- [ ] Deploy to production
- [ ] Monitor and optimize performance

## 📚 Useful Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB/Mongoose Documentation](https://mongoosejs.com/)
- [JWT Authentication Guide](https://jwt.io/)
- [Socket.io Documentation](https://socket.io/)
- [Multer for File Uploads](https://github.com/expressjs/multer)

---

**Next Steps:** Start with Phase 1 by setting up the Express.js server and implementing basic Property CRUD operations.
