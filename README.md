# SquareFeet - Real Estate Property Management Platform

A modern, full-stack real estate platform with a polished React frontend, Express backend API, and DynamoDB database. Designed for NRI buyers to discover and manage residential properties in Hyderabad, India.

---

## 📋 Table of Contents
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Local Setup (Step-by-Step)](#local-setup-step-by-step)
- [Running the Application](#running-the-application)
- [Useful Commands](#useful-commands)
- [Deployment](#deployment)
- [Features](#features)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + TypeScript for type-safe component development
- **Vite** for fast development & optimized builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **React Hook Form** for form management

### Backend
- **Node.js** with Express.js for REST API
- **TypeScript** for type safety
- **AWS SDK v3** for DynamoDB integration
- **Zod** for validation

### Database & Infrastructure
- **DynamoDB Local** for development (via Docker)
- **Docker Compose** for local services orchestration
- **AWS DynamoDB** for production
- **S3** for static site hosting (frontend)
- **CloudFront** for CDN (frontend)
- **App Runner** for containerized backend (production)

---

## ✅ Prerequisites

Before starting, ensure you have:

1. **Node.js** (v18 or higher)
   - Download from [nodejs.org](https://nodejs.org)
   - Verify: `node --version` and `npm --version`

2. **Docker & Docker Compose**
   - Download from [docker.com](https://www.docker.com/products/docker-desktop)
   - Verify: `docker --version` and `docker-compose --version`

3. **Git** (for version control)
   - Verify: `git --version`

4. **Text Editor/IDE** (VSCode recommended)
   - Download from [code.visualstudio.com](https://code.visualstudio.com)

---

## 📁 Project Structure

```
square-feet/
├── frontend/                    # React + Vite application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page-level components
│   │   ├── sections/           # Page sections (Hero, Team, etc)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Utility functions & API client
│   │   ├── constants/          # Mock data & constants
│   │   └── App.tsx             # Root component
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/                     # Express + TypeScript API
│   ├── src/
│   │   ├── config/             # Configuration (env, DynamoDB)
│   │   ├── models/             # TypeScript interfaces
│   │   ├── routes/             # API routes
│   │   ├── repositories/       # Data access layer
│   │   ├── middleware/         # Express middleware
│   │   ├── scripts/            # DynamoDB setup scripts
│   │   ├── utils/              # Utilities & validation
│   │   └── server.ts           # Express app entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── docker-compose.yml          # DynamoDB Local setup
├── package.json                # Root npm scripts
└── README.md
```

---

## 🚀 Local Setup (Step-by-Step)

### Step 1: Clone or Navigate to Project

```bash
# If cloning (replace with your repo URL if needed)
git clone <your-repo-url>
cd square-feet
```

### Step 2: Install Dependencies

Install both root and project-specific dependencies:

```bash
# Install root-level dependencies (if any)
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

**Verify Installation:**
```bash
npm list --depth=0
```

### Step 3: Start DynamoDB Local

Start the DynamoDB Local container using Docker Compose:

```bash
# Start DynamoDB in the background
npm run dynamo:up

# Verify container is running
docker ps | grep dynamodb
```

You should see: `square-feet-dynamodb` container running on port 8000.

### Step 4: Create DynamoDB Table

In a new terminal, create the `Properties` table:

```bash
npm run dynamo:create
```

**Expected output:**
```
Creating table Properties...
Waiting for table to become active...
Table Properties created.
```

### Step 5: Seed DynamoDB with Mock Data

Populate the table with 24 mock Hyderabad properties:

```bash
npm run dynamo:seed
```

**Expected output:**
```
Seeded 24 properties into Properties
```

### Step 6: Verify DynamoDB Setup

Check that data is in DynamoDB:

```bash
# (Optional) Use AWS CLI or DynamoDB admin tool to verify
# For now, we'll verify when the API starts
```

---

## ▶️ Running the Application

### Terminal 1: Start Backend API

```bash
cd /Users/packman/Desktop/square-feet

# Start the Express server with hot reload
npm run dev
```

**Expected output:**
```
🚀 API running on port 5001 (development)
```

**Test the API:**
```bash
# In another terminal, test the health endpoint
curl http://localhost:5001/api/health

# Expected response:
# {"status":"ok","timestamp":"2025-10-28T..."}
```

### Terminal 2: Start Frontend Dev Server

```bash
cd /Users/packman/Desktop/square-feet/frontend

# Start Vite dev server
npm run dev
```

**Expected output:**
```
  VITE v... ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

### Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

You should see:
- ✅ SquareFeet landing page with hero section
- ✅ Featured properties carousel
- ✅ Properties page showing 24 Hyderabad listings
- ✅ Seller dashboard
- ✅ Admin panel

---

## 📚 Useful Commands

### Backend Commands

```bash
# Start backend dev server (with hot reload)
npm run dev

# Build backend for production
npm run build

# Run compiled backend
npm start

# Run linter
npm run lint
```

### DynamoDB Commands

```bash
# Start DynamoDB Local container
npm run dynamo:up

# Stop DynamoDB Local container
npm run dynamo:down

# Create Properties table
npm run dynamo:create

# Seed mock data
npm run dynamo:seed

# Regenerate mock properties
npx ts-node backend/src/scripts/seedProperties.ts
```

### Frontend Commands

```bash
# Navigate to frontend directory
cd frontend

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Useful curl Commands to Test API

```bash
# Get all properties
curl http://localhost:5001/api/properties

# Get properties by status (approved)
curl "http://localhost:5001/api/properties?status=approved"

# Get properties in specific city (Nagole)
curl "http://localhost:5001/api/properties?city=Nagole"

# Get single property by ID
curl http://localhost:5001/api/properties/<propertyId>

# Get health status
curl http://localhost:5001/api/health
```

---

## 🧹 Cleanup & Troubleshooting

### Stop All Services

```bash
# Stop backend (Ctrl+C in backend terminal)
# Stop frontend (Ctrl+C in frontend terminal)

# Stop DynamoDB Local
npm run dynamo:down

# Remove Docker container
docker rm square-feet-dynamodb
```

### Common Issues

| Issue | Solution |
|-------|----------|
| **Port 5001 already in use** | Kill process: `lsof -i tcp:5001` then `kill -9 <PID>` |
| **Port 5173 already in use** | Kill process: `lsof -i tcp:5173` then `kill -9 <PID>` |
| **DynamoDB won't start** | Check Docker is running; restart: `npm run dynamo:down && npm run dynamo:up` |
| **"Properties table not found"** | Run: `npm run dynamo:create && npm run dynamo:seed` |
| **API returns empty properties** | Ensure seeding completed: `npm run dynamo:seed` |
| **CORS errors in browser** | Check backend is running on port 5001 |

---

## 🌐 Environment Variables

### Backend (.env.local)

Create a file at `/.env.local`:

```env
NODE_ENV=development
PORT=5001
AWS_REGION=us-east-1
PROPERTIES_TABLE=Properties
DYNAMODB_ENDPOINT=http://localhost:8000
CORS_ORIGIN=http://localhost:5173
```

**Note:** For local development, **you do NOT need real AWS credentials**. DynamoDB Local uses fake credentials (`local`/`local`) configured in `docker-compose.yml`.

### Frontend (.env.local)

Create a file at `/frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5001/api
```

---

## 🔐 AWS Credentials (For Deployment Only)

For **local development**: ✅ **NO credentials needed** - DynamoDB Local uses mock credentials.

For **deployment to AWS** (ECR, S3, CloudFront, App Runner): ⚠️ **AWS credentials required**.

### Setting Up AWS Credentials for Deployment

1. **Create an IAM user with deployment permissions:**
   - Go to AWS Console → IAM → Users
   - Create a user with permissions for: ECR, S3, CloudFront, App Runner, DynamoDB

2. **Generate access keys:**
   - In IAM user → Security credentials → Create access key
   - Save `Access Key ID` and `Secret Access Key`

3. **Configure AWS CLI:**
   ```bash
   aws configure
   # Enter Access Key ID
   # Enter Secret Access Key
   # Enter region: us-east-1
   # Enter output format: json
   ```

4. **Verify credentials:**
   ```bash
   aws sts get-caller-identity
   ```

   Should return your account ID, user ARN, etc.

These credentials are used **only** for deployment commands (`docker push`, `aws s3 sync`, etc.), not for local development.

---

## 📦 Deployment

### Frontend Deployment (S3 + CloudFront)

```bash
# Build frontend
cd frontend
npm run build

# Sync to S3
aws s3 sync dist s3://squarefeet-demo --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
```

### Backend Deployment (Docker + App Runner)

```bash
# Build Docker image
docker build -f backend/Dockerfile -t squarefeet-api:latest /Users/packman/Desktop/square-feet

# Tag for ECR
docker tag squarefeet-api:latest 174332572589.dkr.ecr.us-east-1.amazonaws.com/squarefeet-api:latest

# Push to ECR
docker push 174332572589.dkr.ecr.us-east-1.amazonaws.com/squarefeet-api:latest

# Deploy via App Runner (manual via console or CLI)
```

See [custom_domain_setup.md](./custom_domain_setup.md) for detailed deployment steps.

---

## 🎯 Features

### Landing Page
- Hero section with motion animations
- Featured properties carousel
- Search & filter capabilities
- Team section
- Testimonials
- Responsive design

### Seller Dashboard
- View personal listings
- Create new listings
- Edit/delete properties
- Status management (draft → approved → sold)
- Motion-enhanced UI

### Admin Panel
- View all properties
- Bulk approve/reject listings
- Status filtering
- Detail drawer for quick review
- Animated table interactions

### Property Management
- Support for multiple property types (house, apartment, condo, land, commercial)
- Rich property details (bedrooms, bathrooms, sq ft, features, images)
- Price in INR (Indian Rupees) for Hyderabad focus
- Status workflow (draft → pending → approved → sold)

---

## 📞 Support & Documentation

For detailed deployment setup with custom domains, see:
- [custom_domain_setup.md](./custom_domain_setup.md) - AWS CloudFront + App Runner setup
- [backend_localization_prompts.md](./backend_localization_prompts.md) - Hyderabad data localization
- [content_update_propmpts.md](./content_update_propmpts.md) - Content update guide

---

## 📄 License

This project is proprietary and confidential.

---

## ✨ Quick Reference

```bash
# One-time setup
git clone <repo>
cd square-feet
npm install && cd backend && npm install && cd ../frontend && npm install && cd ..

# Start services (in separate terminals)
npm run dynamo:up && npm run dynamo:create && npm run dynamo:seed
npm run dev                    # Terminal 1: Backend
cd frontend && npm run dev     # Terminal 2: Frontend

# Visit
http://localhost:5173
```

Enjoy building! 🚀
