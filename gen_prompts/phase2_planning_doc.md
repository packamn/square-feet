# Phase 2 Planning Document - Authentication, Listings & Email Workflows

## Overview

Phase 2 focuses on making the platform functional for real user interactions:
1. Seller listing creation and management
2. Admin approval workflows
3. Email notifications for key events
4. Image upload capability
5. Authentication and role-based access (deferred to later)

---

## Current State Analysis

### What's Working (Phase 1 + Localization Complete)
- ✅ Frontend UI with Hyderabad content deployed to squarefeet.co.in
- ✅ Backend API deployed on App Runner
- ✅ DynamoDB with 24 mock Hyderabad properties
- ✅ Seller dashboard (mock data, read-only)
- ✅ Admin panel (mock data, read-only)
- ✅ Property display and filtering

### What's Missing (Phase 2 Targets)
- ❌ Seller form doesn't save to database
- ❌ Admin approval doesn't persist changes
- ❌ No email notifications
- ❌ No image upload (using placeholder URLs)
- ❌ No authentication (open access)
- ❌ No real user/seller tracking

---

## Phase 2 Goals - Prioritized

### Priority 1: Functional Listing Creation (CURRENT FOCUS)
**Goal:** Sellers can create listings that save to DynamoDB

**Components:**
- ✅ UI exists: `frontend/src/sections/dashboard/SellerPropertyForm.tsx`
- ❌ API integration: Wire form to POST `/api/properties`
- ❌ Validation: Ensure data integrity
- ❌ Success feedback: Show confirmation to seller

---

### Priority 2: Admin Approval Workflow
**Goal:** Admin can approve/reject listings and update status

**Components:**
- ✅ UI exists: `frontend/src/sections/admin/AdminPropertiesTable.tsx`
- ❌ API integration: Wire approve/reject buttons to PUT `/api/properties/:id`
- ❌ Status management: Update property status (pending → approved/rejected)
- ❌ Bulk actions: Approve/reject multiple properties

---

### Priority 3: Email Notifications
**Goal:** Send emails when key events happen

**Events to notify:**
1. Seller creates listing → Email to admin
2. Admin approves listing → Email to seller
3. Admin rejects listing → Email to seller with reason
4. Contact form submission → Email to admin

**Email Service:** Resend (as per original plan)

---

### Priority 4: Image Upload
**Goal:** Replace placeholder URLs with real uploaded images

**Components:**
- S3 bucket for image storage
- Upload endpoint in backend
- Frontend image picker/upload
- Image optimization/compression

---

### Priority 5: Authentication (Later)
**Goal:** Secure access with login/roles

**Deferred for now** - Will implement after core workflows are stable

---

## Detailed Implementation Plan

---

## Module 1: Seller Listing Creation (Complete CRUD)

### 1.1 Backend - Property Creation Endpoint Enhancement

**Current State:**
- `POST /api/properties` exists in `backend/src/routes/properties.ts`
- Validates with Zod schema
- Creates property in DynamoDB

**What Needs Enhancement:**
- Add sellerId from authenticated user (mock for now)
- Set default status to "pending" (requires admin approval)
- Add timestamps (createdAt, updatedAt)
- Return success response with property ID

**File:** `backend/src/routes/properties.ts` (lines 51-78)

**Changes needed:**
- Ensure status defaults to "pending" instead of "draft"
- Add server-side validation for required fields
- Return proper 201 response with created property

---

### 1.2 Frontend - Wire Seller Form to API

**Current State:**
- Form exists: `frontend/src/sections/dashboard/SellerPropertyForm.tsx`
- Uses React Hook Form
- No API integration

**What Needs Implementation:**
- Import `apiFetch` from utils/api
- On form submit, call `POST /api/properties`
- Handle loading state during submission
- Show success message on creation
- Show error message if validation fails
- Reset form after successful submission
- Redirect to dashboard or show created listing

**File:** `frontend/src/sections/dashboard/SellerPropertyForm.tsx`

**Changes needed:**
- Add `onSubmit` handler that calls API
- Add loading state
- Add success/error toast notifications
- Clear form on success

---

### 1.3 Testing Seller Creation Flow

**Test Steps:**
1. Navigate to Dashboard → Click "Create new listing"
2. Fill form with Hyderabad property details
3. Submit
4. Verify property appears in DynamoDB (AWS console)
5. Verify property shows in dashboard with "pending" status
6. Verify admin can see new property in admin panel

---

## Module 2: Admin Approval Workflow

### 2.1 Backend - Update Property Status Endpoint

**Current State:**
- `PUT /api/properties/:id` exists
- Updates any property fields

**What Needs Enhancement:**
- Add specific approve/reject actions
- Set approvedAt/rejectedAt timestamps
- Validate status transitions (pending → approved/rejected only)
- Return updated property

**File:** `backend/src/routes/properties.ts` (lines 80-97)

**Changes needed:**
- Add validation for status transitions
- Set timestamp fields based on status
- Add rejection reason field (optional)

---

### 2.2 Frontend - Wire Admin Actions

**Current State:**
- Admin table exists: `frontend/src/sections/admin/AdminPropertiesTable.tsx`
- Approve/Reject buttons exist but don't persist

**What Needs Implementation:**
- Connect approve button to `PUT /api/properties/:id` with `{status: 'approved'}`
- Connect reject button to `PUT /api/properties/:id` with `{status: 'rejected'}`
- Add optional rejection reason modal
- Optimistic UI updates
- Refresh table after action
- Show success/error feedback

**Files:**
- `frontend/src/sections/admin/AdminPropertiesTable.tsx`
- `frontend/src/sections/admin/AdminDetailDrawer.tsx`

**Changes needed:**
- Add approve/reject handlers
- Add API calls
- Add loading states
- Add toast notifications

---

### 2.3 Bulk Actions Implementation

**Goal:** Admin can approve/reject multiple properties at once

**What Needs Implementation:**
- Backend: Add bulk update endpoint `PUT /api/properties/bulk`
- Frontend: Wire bulk action buttons
- Frontend: Show confirmation modal before bulk action
- Update all selected properties in one call

**File to create:** `backend/src/routes/properties.ts` - new bulk endpoint

---

### 2.4 Testing Admin Workflow

**Test Steps:**
1. Create listing as seller (from Module 1)
2. Navigate to Admin panel
3. Find property with "pending" status
4. Click "Approve" → verify status changes to "approved"
5. Verify approvedAt timestamp is set
6. Create another listing, reject it
7. Verify status = "rejected" and rejectedAt timestamp
8. Test bulk approve on multiple properties

---

## Module 3: Email Notification System

### 3.1 Email Service Setup (Resend)

**Why Resend:**
- Simple API integration
- Good deliverability
- Template support
- Affordable pricing
- Previous experience (per original plan)

**Setup Steps:**
1. Sign up for Resend account
2. Verify domain `squarefeet.co.in` in Resend
3. Add Resend DNS records (SPF, DKIM) to Squarespace
4. Get API key
5. Store API key in environment variables

**Environment Variables:**
```env
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@squarefeet.co.in
ADMIN_EMAIL=admin@squarefeet.co.in
```

---

### 3.2 Backend - Email Service Implementation

**File to create:** `backend/src/services/emailService.ts`

**Functions needed:**
```typescript
- sendNewListingNotification(property, sellerEmail, adminEmail)
- sendApprovalNotification(property, sellerEmail)
- sendRejectionNotification(property, sellerEmail, reason)
- sendContactFormNotification(contactData, adminEmail)
```

**Dependencies to install:**
```bash
npm install resend --save
```

**Email Templates needed:**
1. New listing notification (to admin)
2. Approval notification (to seller)
3. Rejection notification (to seller)
4. Contact form submission (to admin)

---

### 3.3 Backend - Email Trigger Integration

**Where to add email triggers:**

1. **After listing creation** (`POST /api/properties`):
   ```typescript
   await createProperty(property)
   await emailService.sendNewListingNotification(property, ...)
   ```

2. **After approval** (`PUT /api/properties/:id` with approved status):
   ```typescript
   await updateProperty(id, {status: 'approved'})
   await emailService.sendApprovalNotification(property, ...)
   ```

3. **After rejection** (`PUT /api/properties/:id` with rejected status):
   ```typescript
   await updateProperty(id, {status: 'rejected', rejectionReason: ...})
   await emailService.sendRejectionNotification(property, ...)
   ```

**File:** `backend/src/routes/properties.ts`

---

### 3.4 Email Templates

**Template 1: New Listing to Admin**
```
Subject: New Property Listing Pending Approval - {propertyTitle}

Hi Admin,

A new property listing has been submitted and requires your review:

Property: {propertyTitle}
Location: {address.city}, {address.state}
Price: ₹{price}
Type: {propertyType}
Seller ID: {sellerId}

Review and approve: https://squarefeet.co.in/admin

---
SquareFeet Property Group
```

**Template 2: Approval to Seller**
```
Subject: Your Property Listing Has Been Approved!

Congratulations!

Your property listing has been approved and is now live on SquareFeet.

Property: {propertyTitle}
Location: {address.city}
Price: ₹{price}

View your listing: https://squarefeet.co.in/properties/{propertyId}
Manage listings: https://squarefeet.co.in/dashboard

---
SquareFeet Property Group
```

**Template 3: Rejection to Seller**
```
Subject: Update on Your Property Listing

Hi,

We've reviewed your property listing and unfortunately cannot approve it at this time.

Property: {propertyTitle}
Reason: {rejectionReason}

You can update and resubmit: https://squarefeet.co.in/dashboard

Contact us: admin@squarefeet.co.in

---
SquareFeet Property Group
```

---

### 3.5 Domain Email Verification in Resend

**Steps for Client:**
1. Login to Resend dashboard
2. Go to Domains → Add domain
3. Enter: `squarefeet.co.in`
4. Resend provides DNS records (SPF, DKIM, DMARC)
5. Client adds these to Squarespace DNS
6. Verification takes 5-30 minutes
7. Can send from `noreply@squarefeet.co.in`, `admin@squarefeet.co.in`, etc.

**DNS Records Client Will Need to Add:**
- TXT record for SPF
- CNAME records for DKIM (usually 2-3)
- TXT record for DMARC (optional but recommended)

---

### 3.6 Testing Email Flow

**Test Steps:**
1. Create test listing as seller
2. Check admin@squarefeet.co.in inbox for notification
3. Approve listing from admin panel
4. Check seller email for approval notification
5. Create another listing and reject it
6. Check seller email for rejection notification
7. Verify all emails arrive within 1-2 minutes

---

## Module 4: Image Upload System

### 4.1 S3 Bucket for Images

**Setup Steps:**
1. Create new S3 bucket: `squarefeet-images` (or reuse existing)
2. Enable CORS for uploads from squarefeet.co.in
3. Set lifecycle policy (optional - delete old images after X days)
4. Create IAM policy for App Runner to upload images

**Bucket Configuration:**
```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://squarefeet.co.in", "https://www.squarefeet.co.in"],
      "AllowedMethods": ["GET", "PUT", "POST"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

---

### 4.2 Backend - Image Upload Endpoint

**File to create:** `backend/src/routes/uploads.ts`

**Endpoint:** `POST /api/uploads/image`

**Functionality:**
- Accept multipart/form-data
- Validate file type (jpg, png, webp only)
- Validate file size (max 5MB)
- Generate unique filename with UUID
- Upload to S3
- Return S3 URL

**Dependencies:**
```bash
npm install multer @aws-sdk/client-s3 --save
npm install @types/multer --save-dev
```

---

### 4.3 Frontend - Image Upload Component

**Component to create:** `frontend/src/components/ImageUpload.tsx`

**Features:**
- Drag and drop support
- Preview before upload
- Progress indicator
- Multiple image upload (5 max)
- Delete uploaded images
- Reorder images

**Integration:**
- Add to SellerPropertyForm
- Replace images array input with upload component

---

### 4.4 Image Optimization

**Optional enhancements:**
- Resize images to standard dimensions (1600px width)
- Convert to WebP for better compression
- Generate thumbnails (400px width)
- Use Sharp library for server-side processing

---

## Implementation Phases - Step-by-Step Breakdown

---

## Phase 2A: Seller Listing Creation (Week 1)

### Step 2A.1: Backend Property Creation
- [ ] Review existing POST endpoint
- [ ] Ensure status defaults to "pending"
- [ ] Add proper error handling
- [ ] Test with Postman/curl

### Step 2A.2: Frontend Form Integration
- [ ] Import apiFetch utility
- [ ] Add form submission handler
- [ ] Add loading state (disable submit button)
- [ ] Add success toast notification
- [ ] Add error toast notification
- [ ] Test form submission end-to-end

### Step 2A.3: Verification
- [ ] Create listing from UI
- [ ] Verify in DynamoDB console
- [ ] Verify appears in seller dashboard
- [ ] Verify appears in admin panel with "pending" status

**Output:** Sellers can create listings that persist to database

---

## Phase 2B: Admin Approval Workflow (Week 1-2)

### Step 2B.1: Backend Status Update
- [ ] Review existing PUT endpoint
- [ ] Add status transition validation
- [ ] Set approvedAt/rejectedAt timestamps
- [ ] Test with Postman/curl

### Step 2B.2: Frontend Admin Actions - Single Property
- [ ] Add approve button handler in AdminDetailDrawer
- [ ] Add reject button handler with reason modal
- [ ] Call PUT /api/properties/:id
- [ ] Update UI optimistically
- [ ] Refresh table after action
- [ ] Add toast notifications

### Step 2B.3: Frontend Admin Actions - Bulk
- [ ] Add bulk approve handler
- [ ] Add bulk reject handler
- [ ] Show confirmation modal
- [ ] Call backend for each selected property
- [ ] Show progress indicator
- [ ] Refresh table after completion

### Step 2B.4: Verification
- [ ] Create listing as seller
- [ ] Approve from admin panel
- [ ] Verify status changes in database
- [ ] Verify approvedAt timestamp
- [ ] Test rejection flow
- [ ] Test bulk operations

**Output:** Admin can approve/reject listings with status persisting to database

---

## Phase 2C: Email Integration (Week 2)

### Step 2C.1: Resend Account Setup
- [ ] Sign up for Resend account
- [ ] Get API key
- [ ] Add to backend .env

### Step 2C.2: Domain Email Verification
- [ ] Add domain to Resend
- [ ] Get DNS records (SPF, DKIM, DMARC)
- [ ] Client adds records to Squarespace
- [ ] Verify domain in Resend (wait for propagation)
- [ ] Test sending from noreply@squarefeet.co.in

### Step 2C.3: Email Service Implementation
- [ ] Install resend package
- [ ] Create emailService.ts
- [ ] Implement sendNewListingNotification
- [ ] Implement sendApprovalNotification
- [ ] Implement sendRejectionNotification
- [ ] Create email templates (HTML + text)

### Step 2C.4: Email Trigger Integration
- [ ] Add email call after listing creation
- [ ] Add email call after approval
- [ ] Add email call after rejection
- [ ] Add error handling (don't fail if email fails)
- [ ] Add email logging

### Step 2C.5: Testing
- [ ] Create listing → verify admin receives email
- [ ] Approve listing → verify seller receives email
- [ ] Reject listing → verify seller receives email
- [ ] Check spam folders
- [ ] Verify email formatting on mobile

**Output:** Automated email notifications for all key workflow events

---

## Phase 2D: Image Upload (Week 3)

### Step 2D.1: S3 Bucket Setup
- [ ] Create/configure S3 bucket for images
- [ ] Set CORS policy
- [ ] Update IAM role for App Runner
- [ ] Test upload with AWS CLI

### Step 2D.2: Backend Upload Endpoint
- [ ] Install multer for file uploads
- [ ] Create uploads route
- [ ] Implement file validation (type, size)
- [ ] Generate unique filenames
- [ ] Upload to S3
- [ ] Return S3 URL
- [ ] Add error handling

### Step 2D.3: Frontend Upload Component
- [ ] Create ImageUpload component
- [ ] Add drag-and-drop
- [ ] Add file preview
- [ ] Add progress indicator
- [ ] Add delete functionality
- [ ] Integrate with SellerPropertyForm

### Step 2D.4: Testing
- [ ] Upload single image
- [ ] Upload multiple images
- [ ] Verify S3 storage
- [ ] Verify URLs work in property listings
- [ ] Test error cases (wrong format, too large)

**Output:** Users can upload real property images

---

## Technical Specifications

### Email Service Architecture

```
Seller Action (Create Listing)
    ↓
Backend: POST /api/properties
    ↓
Save to DynamoDB
    ↓
Trigger: emailService.sendNewListingNotification()
    ↓
Resend API → admin@squarefeet.co.in
```

```
Admin Action (Approve/Reject)
    ↓
Backend: PUT /api/properties/:id
    ↓
Update DynamoDB status
    ↓
Trigger: emailService.sendApprovalNotification()
    ↓
Resend API → seller email (from property.sellerId lookup)
```

---

### Database Schema Updates

**Property Model Enhancement:**

Add optional fields:
```typescript
rejectionReason?: string  // Admin provides reason for rejection
sellerEmail?: string      // For email notifications (temporary until auth)
sellerName?: string       // Display in emails
```

**File:** `backend/src/models/property.ts`

---

### API Endpoints Summary

**Existing (enhance):**
```
POST   /api/properties          Create property (set status=pending, trigger email)
GET    /api/properties          List properties (already works)
GET    /api/properties/:id      Get single property (already works)
PUT    /api/properties/:id      Update property (add email triggers)
DELETE /api/properties/:id      Delete property (already works)
```

**New endpoints needed:**
```
PUT    /api/properties/bulk     Bulk update (approve/reject multiple)
POST   /api/uploads/image       Upload image to S3
POST   /api/contact             Contact form submission (future)
```

---

## Environment Variables Checklist

### Backend Production (.env or App Runner config)

```env
# Existing
NODE_ENV=production
PORT=5001
AWS_REGION=us-east-1
PROPERTIES_TABLE=Properties
DYNAMODB_ENDPOINT=https://dynamodb.us-east-1.amazonaws.com
CORS_ORIGIN=https://squarefeet.co.in,https://www.squarefeet.co.in

# New for Phase 2
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@squarefeet.co.in
ADMIN_EMAIL=admin@squarefeet.co.in
S3_IMAGES_BUCKET=squarefeet-images
S3_IMAGES_REGION=us-east-1
```

---

## Dependencies to Install

### Backend
```bash
cd /Users/packman/Desktop/square-feet
npm install resend --save
npm install multer @aws-sdk/client-s3 --save
npm install @types/multer --save-dev
```

### Frontend
```bash
cd frontend
npm install react-hot-toast --save  # For notifications
npm install react-dropzone --save   # For image uploads
```

---

## Testing Strategy

### Manual Testing Checklist

**Seller Flow:**
- [ ] Navigate to dashboard
- [ ] Click "Create new listing"
- [ ] Fill all required fields
- [ ] Submit form
- [ ] See success message
- [ ] Property appears in "My Listings"
- [ ] Status shows "pending"

**Admin Flow:**
- [ ] Navigate to admin panel
- [ ] Filter by "pending" status
- [ ] Click on pending property
- [ ] Detail drawer opens
- [ ] Click "Approve"
- [ ] Status changes to "approved"
- [ ] Property moves out of pending filter

**Email Flow:**
- [ ] Create listing → admin receives email within 2 minutes
- [ ] Email contains property details
- [ ] Email has link to admin panel
- [ ] Approve listing → seller receives email
- [ ] Email confirms approval
- [ ] Reject listing → seller receives email with reason

---

## Risks & Mitigation

### Risk 1: Email Deliverability
**Risk:** Emails go to spam
**Mitigation:** 
- Verify domain in Resend
- Add SPF, DKIM, DMARC records
- Use professional email copy
- Test with multiple email providers

### Risk 2: Image Storage Costs
**Risk:** S3 storage costs increase with many images
**Mitigation:**
- Compress images before upload
- Set lifecycle policy to archive old images
- Limit image size (5MB max)
- Monitor S3 costs in AWS Billing

### Risk 3: Form Validation Bypass
**Risk:** Users submit invalid data
**Mitigation:**
- Frontend validation with React Hook Form
- Backend validation with Zod schema
- Sanitize inputs
- Add rate limiting (future)

### Risk 4: Email Service Downtime
**Risk:** Resend API unavailable
**Mitigation:**
- Don't fail property creation if email fails
- Log email errors
- Implement retry logic
- Add fallback notification method (future)

---

## Success Criteria

### Phase 2A Success:
- ✅ Seller can create listing
- ✅ Listing persists to DynamoDB
- ✅ Listing appears in dashboard
- ✅ Form validates correctly
- ✅ Error handling works

### Phase 2B Success:
- ✅ Admin can approve listings
- ✅ Admin can reject listings
- ✅ Status changes persist
- ✅ Timestamps set correctly
- ✅ UI updates in real-time

### Phase 2C Success:
- ✅ Admin receives email on new listing
- ✅ Seller receives email on approval
- ✅ Seller receives email on rejection
- ✅ Emails arrive within 2 minutes
- ✅ Emails not in spam
- ✅ All links in emails work

### Phase 2D Success:
- ✅ Users can upload images
- ✅ Images appear in listings
- ✅ Images load fast
- ✅ Multiple images supported
- ✅ Upload progress shown

---

## Timeline Estimate

**Phase 2A (Seller Creation):** 1-2 days
- Backend enhancements: 2 hours
- Frontend integration: 3 hours
- Testing: 1 hour

**Phase 2B (Admin Approval):** 2-3 days  
- Backend status management: 2 hours
- Frontend single actions: 3 hours
- Frontend bulk actions: 2 hours
- Testing: 2 hours

**Phase 2C (Email):** 3-4 days
- Resend setup: 1 hour
- Email service: 3 hours
- Templates: 2 hours
- Integration: 2 hours
- Domain verification: 2-24 hours (waiting)
- Testing: 2 hours

**Phase 2D (Images):** 2-3 days
- S3 setup: 1 hour
- Backend endpoint: 3 hours
- Frontend component: 4 hours
- Integration: 2 hours
- Testing: 2 hours

**Total Estimate:** 2-3 weeks for complete Phase 2

---

## Next Steps - Implementation Order

### Immediate (Now - This Session)
1. ✅ Document Phase 2 plan (this file)
2. Create detailed prompt files for each module
3. Start with Phase 2A implementation

### This Week
1. Phase 2A: Seller listing creation
2. Phase 2B: Admin approval workflow
3. Phase 2C: Basic email setup (Resend account)

### Next Week
1. Phase 2C: Email integration and templates
2. Phase 2D: Image upload system
3. Final testing and polish

---

## Documentation to Create

Based on this plan, we'll create:

1. **`phase2a_seller_listing_prompts.md`** - Detailed steps for seller creation
2. **`phase2b_admin_approval_prompts.md`** - Detailed steps for admin workflow
3. **`phase2c_email_integration_prompts.md`** - Detailed steps for email system
4. **`phase2d_image_upload_prompts.md`** - Detailed steps for image uploads

Each will have step-by-step implementation instructions like we did for localization.

---

## Questions to Clarify Before Implementation

1. **Seller identification:** For now, use mock sellerId or ask user to enter email/name in form?
   - Recommendation: Add optional email/name fields to form until authentication is ready

2. **Email styling:** Plain text or HTML templates?
   - Recommendation: Start with plain text, enhance with HTML later

3. **Image requirements:** How many images per property? File size limit?
   - Recommendation: 5 images max, 5MB each

4. **Rejection reasons:** Predefined list or free text?
   - Recommendation: Free text for now, can add predefined later

5. **Approval notification timing:** Immediate or daily digest?
   - Recommendation: Immediate for better UX

---

Ready to create the detailed prompt files for each module?
