# 🏗️ Real Estate Website - Phase 1 Implementation Prompts

## **Phase 1: UI-First Demo (Week 1)**

### **Prompt 1: Project Setup**
```
Create a modern React + TypeScript + Node.js real estate website with the following structure:

**Frontend Requirements:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Framer Motion for animations
- React Hook Form for forms

**Backend Requirements:**
- Node.js with Express.js
- CORS enabled
- Environment configuration (.env)

**Project Structure:**
```
real-estate-app/
├── frontend/          # React app (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/           # Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   └── middleware/
│   ├── package.json
│   └── server.js
└── docker-compose.yml # For DynamoDB Local
```

**Setup Steps:**
1. Initialize frontend with Vite + React + TypeScript
2. Initialize backend with Express.js
3. Configure Tailwind CSS with custom design tokens
4. Set up React Router with basic routes
5. Create .env files for both frontend and backend
6. Set up Docker Compose for local DynamoDB
```

### **Prompt 2: Property Schema & Mock Data**
```
Design and implement a flexible property schema for the real estate application:

**DynamoDB Schema:**
- Table: Properties
- Primary Key: propertyId (UUID)
- Sort Key: status (draft, pending, approved, rejected, sold, expired)

**Property Fields:**
```typescript
interface Property {
  propertyId: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  propertyType: 'house' | 'apartment' | 'condo' | 'land' | 'commercial';
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  lotSize?: number;
  yearBuilt?: number;
  features: string[];
  images: string[]; // S3 URLs or local paths
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'sold' | 'expired';
  sellerId: string; // Mock UUID for now
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
}
```

**Mock Data Requirements:**
- Create 20+ sample properties with different statuses
- Include various property types and price ranges
- Add placeholder images (can use Unsplash or similar)
- Mix of approved, pending, and draft properties
- Different sellers (mock UUIDs)

**Implementation:**
1. Define TypeScript interfaces
2. Create JSON fixture files for mock data
3. Set up DynamoDB Local seeding script
4. Create utility functions to populate mock data
```

### **Prompt 3: CRUD API & Local DB Wiring**
```
Implement basic CRUD operations for properties with local DynamoDB:

**Backend Endpoints:**
```
POST /api/properties     # Create property
GET /api/properties      # List all properties (with filters)
GET /api/properties/:id  # Get single property
PUT /api/properties/:id  # Update property
DELETE /api/properties/:id # Delete property
```

**Frontend API Integration:**
- Create API client utility (axios/fetch)
- Implement React hooks for data fetching
- Add loading states and error handling
- Optimistic updates for better UX

**Database Setup:**
- DynamoDB Local with Docker
- Table creation script
- Seed data on startup

**Image Upload (Local First):**
- Multer for file uploads
- Local storage for images initially
- S3 integration structure for later

**Requirements:**
1. Full CRUD operations working
2. Proper error handling
3. CORS configuration
4. JSON responses
5. Status filtering support
```

### **Prompt 4: Landing Page Implementation**
```
Create a professional real estate landing page with the following sections:

**Hero Section:**
- Large banner with property GIF background
- Prominent search bar as main attraction
- Call-to-action button "List Your Property"
- Professional typography and spacing

**Search Bar Features:**
- Location input (city, state)
- Price range (min/max)
- Property type dropdown
- Bedrooms/bathrooms filters
- Search button with loading state

**Content Sections:**
- Featured Properties grid (6-8 properties)
- Testimonials carousel
- About Us section with team info
- Call-to-action sections

**Design Requirements:**
- Responsive and progressive for multi-platforms
- Smooth animations with Framer Motion
- Tailwind CSS styling
- SEO-friendly structure
- Mobile-optimized interactions

**Implementation:**
1. Create LandingPage component
2. Implement SearchForm with validation
3. Create PropertyCard component
4. Add testimonials and team sections
5. Wire search functionality to API
6. Add smooth scroll and animations
```

### **Prompt 5: Seller Dashboard Implementation**
```
Build a seller dashboard for property management:

**Dashboard Features:**
- Properties list in card format
- Filter by status (all, draft, pending, approved)
- Create new property button
- Edit/delete actions per property

**Property Card:**
- Image gallery preview
- Basic info (price, location, beds/baths)
- Status indicator
- Quick actions (edit, delete, view details)

**Detail View:**
- Full property information
- Image gallery with lightbox
- Edit form with validation
- Status change options

**Mock User Context:**
- Use mock seller ID for filtering "own" properties
- Simulate user permissions
- Show ownership indicators

**Implementation:**
1. Create SellerDashboard component
2. PropertyList with filtering
3. PropertyCard with actions
4. PropertyDetail modal/drawer
5. PropertyForm for create/edit
6. Mock user context provider
```

### **Prompt 6: Admin Panel Implementation**
```
Create an admin panel for property approval and management:

**Admin Features:**
- All properties table with pagination
- Filter by status and property type
- Bulk operations (approve, reject, delete)
- Quick status changes

**Property Management:**
- Approve/reject with notes
- Edit any property details
- Bulk status updates
- Property analytics overview

**UI Pattern:**
- Table view for overview
- Detail drawer/modal for editing
- Bulk action toolbar
- Status change workflows

**Mock Admin Context:**
- Full access to all properties
- Simulate admin permissions
- Show all properties regardless of status

**Implementation:**
1. Create AdminPanel component
2. PropertiesTable with sorting/filtering
3. PropertyDetail drawer
4. Bulk actions toolbar
5. Status change workflows
6. Mock admin context
```

### **Prompt 7: Polish for Demo**
```
Polish the application for client demonstration:

**Responsive Design:**
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Progressive enhancement

**Micro-interactions:**
- Smooth transitions
- Loading states
- Hover effects
- Form validations

**SEO & Performance:**
- Meta tags and Open Graph
- Semantic HTML structure
- Image optimization
- Basic accessibility

**Demo Features:**
- Sample email preview pages
- Error boundaries
- Loading skeletons
- Toast notifications

**Polish Requirements:**
1. Responsive across all breakpoints
2. Smooth animations and transitions
3. SEO-friendly structure
4. Accessibility considerations
5. Professional polish for client demo
6. Error handling and fallbacks
```

---

## **🚀 Phase 1 Deliverables**

By the end of Phase 1, you should have:

✅ **Functional React application** running locally
✅ **Landing page** with search and featured properties
✅ **Seller dashboard** for property management
✅ **Admin panel** for approval workflows
✅ **Local DynamoDB** with mock data
✅ **Basic CRUD operations** working
✅ **Responsive design** ready for demo
✅ **Professional UI** with smooth animations

**Demo Script:**
1. Show landing page with search functionality
2. Demonstrate seller creating and managing properties
3. Show admin approving/rejecting listings
4. Highlight responsive design on different devices
5. Explain the technical architecture

**Ready for Phase 2:** Authentication, email integration, and data validation
