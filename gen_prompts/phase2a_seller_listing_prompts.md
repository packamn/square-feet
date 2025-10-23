# Phase 2A: Seller Listing Creation - Implementation Prompts

## Overview
Enable sellers to create property listings through the UI form that persist to DynamoDB. For now, using a constant sellerId (no authentication) to get data flowing quickly.

---

## Module 1.1: Backend Property Creation Enhancement

### Current State Analysis

**File:** `backend/src/routes/properties.ts` (lines 51-78)

**What exists:**
- POST /api/properties endpoint
- Zod schema validation
- Creates property in DynamoDB
- Returns 201 with created property

**What needs enhancement:**
- Ensure status defaults to "pending" for seller-created listings
- Use constant sellerId for all submissions (temporary)
- Ensure proper validation and error handling
- Add detailed logging for debugging

---

## Step 1.1.1: Review Current POST Endpoint

**Action:** Read and understand the current implementation

**File:** `backend/src/routes/properties.ts` (lines 51-78)

**Current code does:**
1. Validates request body with Zod schema
2. Generates propertyId if not provided
3. Sets timestamps (createdAt, updatedAt)
4. Sets default status to "draft" or uses provided status
5. Generates sellerId if not provided
6. Calls createProperty repository method
7. Returns 201 response

**Key observation:** Status defaults to "draft" if not provided (line 66)

---

## Step 1.1.2: Update Status Default for Seller-Created Listings

**Goal:** Seller-created listings should start as "pending" (requires admin approval)

**File:** `backend/src/routes/properties.ts`

**Current code (line 66):**
```typescript
status: body.status ?? 'draft',
```

**Change to:**
```typescript
status: body.status ?? 'pending',
```

**Reasoning:** 
- Sellers should not be able to directly publish ("approved")
- "pending" requires admin review before going live
- "draft" can be used if we add "save as draft" functionality later

---

## Step 1.1.3: Set Constant Seller ID (Temporary)

**Goal:** Use a fixed sellerId for all submissions until authentication is implemented

**File:** `backend/src/routes/properties.ts`

**Current code (line 67):**
```typescript
sellerId: body.sellerId ?? randomUUID(),
```

**Change to:**
```typescript
sellerId: body.sellerId ?? 'SELLER_DEMO_001',
```

**Reasoning:**
- Makes it easy to filter seller listings in dashboard
- Easy to identify demo submissions vs real ones later
- Can be replaced with actual user ID when auth is implemented

---

## Step 1.1.4: Add Enhanced Logging

**Goal:** Better debugging and monitoring

**File:** `backend/src/routes/properties.ts`

**Current code (line 73):**
```typescript
logger.info('Created property', property.propertyId)
```

**Enhance to:**
```typescript
logger.info('Created property', {
  propertyId: property.propertyId,
  title: property.title,
  sellerId: property.sellerId,
  status: property.status,
  price: property.price,
  location: `${property.address.city}, ${property.address.state}`
})
```

**Reasoning:**
- Easier to debug issues
- Can track property creation patterns
- Helpful for CloudWatch log analysis

---

## Step 1.1.5: Verify Validation Schema

**Goal:** Ensure Zod schema is production-ready

**File:** `backend/src/utils/validation.ts`

**Review checklist:**
- [ ] All required fields marked as required
- [ ] Optional fields properly marked as .optional()
- [ ] Price is positive number
- [ ] Currency is 3 characters
- [ ] Property type matches enum
- [ ] Status matches enum
- [ ] Address fields all required

**Current schema looks good, but verify:**
```typescript
export const propertySchema = z.object({
  propertyId: z.string().optional(),
  title: z.string().min(3),          // ✅ Required, min 3 chars
  description: z.string().min(10),    // ✅ Required, min 10 chars
  price: z.number().positive(),       // ✅ Required, positive
  currency: z.string().length(3),     // ✅ Required, exactly 3 chars
  address: z.object({                 // ✅ All required
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  propertyType: z.enum(['house', 'apartment', 'condo', 'land', 'commercial']),
  // ... rest of fields
})
```

---

## Step 1.1.6: Test POST Endpoint with curl

**Goal:** Verify endpoint works before frontend integration

**Command to test:**
```bash
curl -X POST https://hr3hgvamzk.us-east-1.awsapprunner.com/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Plot in Nagole",
    "description": "This is a test property to verify the API works correctly.",
    "price": 1500000,
    "currency": "INR",
    "address": {
      "street": "Road 5, Nagole",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500068",
      "country": "India"
    },
    "propertyType": "land",
    "squareFootage": 1200,
    "features": ["Corner Plot", "Legal Verified"],
    "images": ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"]
  }'
```

**Expected response:**
```json
{
  "propertyId": "generated-uuid",
  "title": "Test Plot in Nagole",
  "status": "pending",
  "sellerId": "SELLER_DEMO_001",
  "createdAt": "2025-10-28T...",
  ...
}
```

**Verify in DynamoDB:**
1. Go to AWS Console → DynamoDB → Properties table
2. Run Scan
3. Find the new property with status "pending"
4. Verify all fields saved correctly

---

## Step 1.1.7: Error Handling Review

**Goal:** Ensure proper error responses

**Current implementation (lines 75-77):**
```typescript
} catch (error) {
  next(error)
}
```

**Enhancement to add:**
```typescript
} catch (error) {
  logger.error('Failed to create property', error)
  next(error)
}
```

**Test error cases:**
1. Missing required field → 400 Bad Request
2. Invalid property type → 400 Bad Request
3. Negative price → 400 Bad Request
4. DynamoDB error → 500 Internal Server Error

---

## Step 1.1.8: Update App Runner Environment (If Needed)

**Goal:** Ensure production has correct settings

**Check App Runner environment variables include:**
```env
NODE_ENV=production
PROPERTIES_TABLE=Properties
DYNAMODB_ENDPOINT=https://dynamodb.us-east-1.amazonaws.com
AWS_REGION=us-east-1
CORS_ORIGIN=https://squarefeet.co.in,https://www.squarefeet.co.in
```

If CORS is still set to S3 URL, update it to include the custom domains.

---

## Step 1.1.9: Rebuild and Redeploy Backend (If Changes Made)

**If you made any code changes:**

```bash
# From project root
docker build -f backend/Dockerfile -t squarefeet-api:latest /Users/packman/Desktop/square-feet

# Tag for ECR
docker tag squarefeet-api:latest 174332572589.dkr.ecr.us-east-1.amazonaws.com/squarefeet-api:latest

# Push to ECR
docker push 174332572589.dkr.ecr.us-east-1.amazonaws.com/squarefeet-api:latest
```

App Runner auto-deploys when new image is pushed (takes 2-3 minutes).

---

## Verification Checklist

After implementation:

- [ ] Code changes made and reviewed
- [ ] Docker image rebuilt and pushed
- [ ] App Runner deployed successfully
- [ ] curl test passes (property created)
- [ ] Property visible in DynamoDB with status="pending"
- [ ] Property has sellerId="SELLER_DEMO_001"
- [ ] Timestamps (createdAt, updatedAt) are set
- [ ] CloudWatch logs show successful creation
- [ ] No errors in logs

---

## Success Criteria for Module 1.1

✅ POST /api/properties endpoint accepts valid property data  
✅ Properties default to status="pending"  
✅ All properties use sellerId="SELLER_DEMO_001"  
✅ Validation errors return proper 400 responses  
✅ Created properties persist in DynamoDB  
✅ Logs show detailed property creation info  

---

## Next: Module 1.2 Preview

Once Module 1.1 is verified, we'll move to:
- **Module 1.2:** Frontend form integration
- Wire SellerPropertyForm to call POST /api/properties
- Add loading states and toast notifications
- Test end-to-end from UI → DB

---

## Notes

- Keep changes minimal and focused
- Test each change thoroughly before moving on
- Use CloudWatch logs to debug issues
- DynamoDB console is your friend for verification
- Document any issues or unexpected behavior

Ready to implement Module 1.1?

---

## Module 1.2: Frontend - Wire Seller Form to API

### Current State Analysis

**File:** `frontend/src/sections/dashboard/SellerPropertyForm.tsx`

**What exists:**
- React Hook Form setup with validation
- Form fields for property details
- `onSubmit` callback prop (passed from parent)
- Loading state support via `isSaving` prop
- Form reset on property change

**What's missing:**
- Actual API call to POST /api/properties
- Toast notifications for success/error
- Loading state during submission
- Form reset after successful creation

---

## Step 1.2.1: Current Form Architecture Understanding

**How the form currently works:**

1. **Parent component** (SellerPropertyModal.tsx) passes:
   - `onSubmit` callback
   - `isSaving` boolean for loading state

2. **Form component** (SellerPropertyForm.tsx):
   - Collects user input
   - Validates locally
   - Transforms values to Property format
   - Calls parent's `onSubmit(payload)`

3. **Parent handles the submission** - but currently does nothing with it!

**Key observation:** We need to update the **parent component** to call the API, not the form itself.

---

## Step 1.2.2: Identify the Parent Component

**File:** `frontend/src/sections/dashboard/SellerPropertyModal.tsx`

**This component:**
- Shows the modal containing SellerPropertyForm
- Passes `onSubmit` callback to form
- Currently mock implementation (doesn't save)

**What we need to change:**
- Import `apiFetch` from `utils/api`
- Implement real `onSubmit` that calls API
- Add loading state management
- Add success toast notification
- Add error toast notification
- Close modal on success
- Refresh dashboard property list

---

## Step 1.2.3: Install Toast Notification Library

**Goal:** Show user-friendly success/error messages

**Command:**
```bash
cd /Users/packman/Desktop/square-feet/frontend
npm install react-hot-toast --save
```

**Why react-hot-toast:**
- Lightweight and simple
- Good looking default styles
- Easy to integrate
- Matches modern UI aesthetic

---

## Step 1.2.4: Update SellerPropertyModal with API Integration

**File:** `frontend/src/sections/dashboard/SellerPropertyModal.tsx`

**Implementation steps:**

### 1. Add imports:
```typescript
import { useState } from 'react'
import toast from 'react-hot-toast'
import { apiFetch } from '../../utils/api'
```

### 2. Add loading state:
```typescript
const [isSaving, setIsSaving] = useState(false)
```

### 3. Implement API submission handler:
```typescript
const handleSubmit = async (values: Partial<Property>) => {
  setIsSaving(true)
  
  try {
    const response = await apiFetch<Property>('/properties', {
      method: 'POST',
      body: JSON.stringify(values),
    })
    
    toast.success('Property listing created successfully! Pending admin approval.')
    
    // Close modal
    onClose()
    
    // Refresh property list (trigger parent refresh)
    // This depends on how parent manages state
    
  } catch (error) {
    console.error('Failed to create property:', error)
    toast.error('Failed to create property. Please try again.')
  } finally {
    setIsSaving(false)
  }
}
```

### 4. Pass to form component:
```typescript
<SellerPropertyForm 
  property={property}
  onSubmit={handleSubmit}
  isSaving={isSaving}
/>
```

---

## Step 1.2.5: Add Toast Provider to App

**Goal:** Enable toast notifications across the app

**File:** `frontend/src/main.tsx` or `frontend/src/App.tsx`

**Add import:**
```typescript
import { Toaster } from 'react-hot-toast'
```

**Add component to render tree:**
```tsx
function App() {
  return (
    <>
      <Toaster position="top-right" />
      {/* rest of app */}
    </>
  )
}
```

**Toast configuration:**
```typescript
<Toaster 
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    success: {
      iconTheme: {
        primary: '#10b981',
        secondary: '#fff',
      },
    },
    error: {
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    },
  }}
/>
```

---

## Step 1.2.6: Fix Form Country Field

**Issue:** Line 86 in SellerPropertyForm.tsx hardcodes `country: 'USA'`

**File:** `frontend/src/sections/dashboard/SellerPropertyForm.tsx`

**Current code (line 86):**
```typescript
country: 'USA',
```

**Change to:**
```typescript
country: 'India',
```

**Reasoning:** All properties are now in Hyderabad, India

---

## Step 1.2.7: Update Form Labels for INR

**Issue:** Line 123 shows "Price (USD)" but we use INR

**File:** `frontend/src/sections/dashboard/SellerPropertyForm.tsx`

**Current code (line 123):**
```typescript
<label className="text-sm font-semibold text-slate-700">Price (USD)</label>
```

**Change to:**
```typescript
<label className="text-sm font-semibold text-slate-700">Price (INR ₹)</label>
```

---

## Step 1.2.8: Update Placeholder Text for Hyderabad Context

**File:** `frontend/src/sections/dashboard/SellerPropertyForm.tsx`

**Changes needed:**

Line 104 - Title placeholder:
```typescript
// Change from:
placeholder="Modern skyline penthouse"
// To:
placeholder="Premium Plot in Nagole"
```

Line 115 - Description placeholder:
```typescript
// Change from:
placeholder="Highlight standout amenities, views, and lifestyle appeal."
// To:
placeholder="Describe location, plot features, legal status, and investment potential."
```

Line 210 - Features placeholder:
```typescript
// Change from:
placeholder="Rooftop deck, smart home automation, EV charging"
// To:
placeholder="Corner Plot, Legal Verified, Gated Community"
```

---

## Step 1.2.9: Add Square Footage Field

**Issue:** Form doesn't have squareFootage field but backend expects it

**File:** `frontend/src/sections/dashboard/SellerPropertyForm.tsx`

**Add to form type (line 6-19):**
```typescript
export type PropertyFormValues = {
  title: string
  description: string
  price: number
  bedrooms?: number
  bathrooms?: number
  squareFootage?: number  // ADD THIS
  street: string
  city: string
  state: string
  zipCode: string
  propertyType: Property['propertyType']
  status: Property['status']
  features: string
}
```

**Add to blank values (line 27-40):**
```typescript
const blankValues: PropertyFormValues = {
  // ... existing fields
  squareFootage: undefined,  // ADD THIS
  // ... rest
}
```

**Add to default values mapping (line 43-59):**
```typescript
const defaultValues = useMemo<PropertyFormValues>(() => {
  if (!property) return blankValues
  return {
    // ... existing fields
    squareFootage: property.squareFootage,  // ADD THIS
    // ... rest
  }
}, [property])
```

**Add to payload (line 74-96):**
```typescript
const payload: Partial<Property> = {
  // ... existing fields
  squareFootage: values.squareFootage ? Number(values.squareFootage) : undefined,  // ADD THIS
  // ... rest
}
```

**Add form field in UI (after line 146):**
```tsx
<div className="grid gap-3 md:grid-cols-3">
  {/* existing bedrooms/bathrooms fields */}
  
  <div>
    <label className="text-sm font-semibold text-slate-700">Square Footage</label>
    <input
      type="number"
      {...register('squareFootage', { valueAsNumber: true })}
      placeholder="1200"
      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
    />
  </div>
</div>
```

---

## Step 1.2.10: Read and Understand SellerPropertyModal

**Action:** Before making changes, read the current implementation

**File to read:** `frontend/src/sections/dashboard/SellerPropertyModal.tsx`

**What to look for:**
- How does it currently handle `onSubmit`?
- Does it manage any state?
- How does it refresh the property list after save?
- Does it already have loading state?

---

## Step 1.2.11: Implement API Call in SellerPropertyModal

**File:** `frontend/src/sections/dashboard/SellerPropertyModal.tsx`

**Steps:**

1. **Import dependencies:**
```typescript
import { useState } from 'react'
import toast from 'react-hot-toast'
import { apiFetch } from '../../utils/api'
```

2. **Add loading state:**
```typescript
const [isSaving, setIsSaving] = useState(false)
```

3. **Implement submit handler:**
```typescript
const handleSubmit = async (values: Partial<Property>) => {
  setIsSaving(true)
  
  try {
    // Call API to create property
    const newProperty = await apiFetch<Property>('/properties', {
      method: 'POST',
      body: JSON.stringify({
        ...values,
        currency: 'INR',  // Always INR for Hyderabad properties
      }),
    })
    
    // Show success message
    toast.success('Property listing created! Pending admin approval.')
    
    // Close modal
    onClose()
    
    // Trigger refresh of property list
    // Call parent's refresh function if available
    if (onSuccess) {
      onSuccess(newProperty)
    }
    
  } catch (error) {
    console.error('Failed to create property:', error)
    toast.error('Failed to create property. Please check all fields and try again.')
  } finally {
    setIsSaving(false)
  }
}
```

4. **Pass to form:**
```typescript
<SellerPropertyForm
  property={property}
  onSubmit={handleSubmit}
  isSaving={isSaving}
/>
```

---

## Step 1.2.12: Update Dashboard to Refresh After Creation

**File:** `frontend/src/pages/Dashboard.tsx`

**Goal:** Refresh property list after new listing is created

**Implementation:**
- Add `refetch` or reload function after modal closes
- Either re-fetch from API or add new property to local state
- This ensures new listing appears immediately

**Approach:**
```typescript
const handlePropertyCreated = (newProperty: Property) => {
  // Option A: Refetch all properties
  refetch()
  
  // Option B: Add to local state
  setProperties([newProperty, ...properties])
}

<SellerPropertyModal 
  onClose={closeModal}
  onSuccess={handlePropertyCreated}
/>
```

---

## Step 1.2.13: Testing Checklist

After implementation, test these scenarios:

### Happy Path:
- [ ] Fill form with valid Hyderabad property data
- [ ] Click "Create property"
- [ ] See loading state (button disabled, spinner)
- [ ] See success toast notification
- [ ] Modal closes automatically
- [ ] New property appears in dashboard
- [ ] Property has status "pending"
- [ ] Verify in DynamoDB console

### Error Cases:
- [ ] Submit with empty required field → See validation error
- [ ] Submit with invalid price (negative) → See error toast
- [ ] Simulate API error → See error toast
- [ ] Form stays open on error (doesn't close)
- [ ] Can retry submission after error

### Edge Cases:
- [ ] Very long title/description (2000+ chars)
- [ ] Special characters in fields
- [ ] Decimal prices
- [ ] Missing optional fields (bedrooms, bathrooms)
- [ ] Submit while offline → See error toast

---

## Files Summary - Module 1.2

**Files to modify:**
1. `frontend/src/sections/dashboard/SellerPropertyForm.tsx` - Fix country, currency label, add squareFootage
2. `frontend/src/sections/dashboard/SellerPropertyModal.tsx` - Add API integration
3. `frontend/src/main.tsx` or `App.tsx` - Add Toaster provider
4. `frontend/src/pages/Dashboard.tsx` - Add refresh after creation

**Dependencies to install:**
```bash
cd frontend
npm install react-hot-toast --save
```

---

## Implementation Order

1. ✅ Install react-hot-toast
2. ✅ Add Toaster to App
3. ✅ Fix form country field to "India"
4. ✅ Update form labels (INR, placeholders)
5. ✅ Add squareFootage field to form
6. ✅ Read SellerPropertyModal current implementation
7. ✅ Implement API call in SellerPropertyModal
8. ✅ Update Dashboard to refresh after creation
9. ✅ Test end-to-end

---

## Success Criteria for Module 1.2

✅ Form submits to POST /api/properties  
✅ Loading state shows during submission  
✅ Success toast appears on creation  
✅ Modal closes after success  
✅ New property appears in dashboard immediately  
✅ Property has status="pending"  
✅ Property visible in DynamoDB  
✅ Error toast appears if API fails  
✅ Form stays open if error (can retry)  

---

## Next: Module 1.3 Preview

Once Module 1.2 is complete:
- **Module 1.3:** End-to-end verification
- Create listing from UI
- Verify in all three places: UI, DynamoDB, Admin panel
- Test various property types and edge cases
- Document any issues

---

Ready to implement Module 1.2?
