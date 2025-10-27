# Phase 2B: Admin Approval Workflow - Implementation Prompts

## Overview
Enable admins to approve/reject seller-submitted listings, updating their status in DynamoDB with proper timestamps. This completes the seller→admin workflow cycle.

---

## Module 2: Admin Approval Workflow

### Goals
1. Admins can approve pending listings (pending → approved)
2. Admins can reject pending listings (pending → rejected) with optional reason
3. Status changes persist to DynamoDB with timestamps (approvedAt/rejectedAt)
4. Bulk actions: approve/reject multiple properties at once
5. UI updates in real-time with feedback

---

## Current State Analysis

### What Exists (From Phase 1)
- ✅ Admin panel UI: `frontend/src/pages/AdminPanel.tsx`
- ✅ Admin table: `frontend/src/sections/admin/AdminPropertiesTable.tsx`
- ✅ Admin detail drawer: `frontend/src/sections/admin/AdminDetailDrawer.tsx`
- ✅ Approve/Reject buttons in UI (not functional)
- ✅ Bulk selection checkboxes (not functional)
- ✅ PUT /api/properties/:id endpoint (needs enhancement)

### What's Missing
- ❌ Approve button doesn't call API
- ❌ Reject button doesn't call API
- ❌ No timestamp setting (approvedAt, rejectedAt)
- ❌ No rejection reason capture
- ❌ Bulk actions don't work
- ❌ No real-time UI updates after status change

---

## Module 2.1: Backend - Enhanced Status Update Endpoint

### Current State

**File:** `backend/src/routes/properties.ts` (lines 80-97)

**What exists:**
- PUT /api/properties/:id endpoint
- Partial validation with Zod
- Updates property in DynamoDB
- Returns updated property

**What needs enhancement:**
- Set approvedAt timestamp when status changes to "approved"
- Set rejectedAt timestamp when status changes to "rejected"
- Add optional rejectionReason field
- Enhanced logging for status changes

---

## Step 2.1.1: Review Current PUT Endpoint

**Action:** Understand how updates currently work

**File:** `backend/src/routes/properties.ts` (lines 80-97)

**Current code does:**
1. Validates partial property data with Zod
2. Calls updateProperty in repository
3. Returns 404 if property not found
4. Logs update
5. Returns updated property

**Key observation:** No special handling for status changes or timestamps

---

## Step 2.1.2: Add Timestamp Logic for Status Changes

**Goal:** Set approvedAt/rejectedAt when status changes

**File:** `backend/src/routes/properties.ts`

**Current code (lines 80-97):**
```typescript
router.put('/:id', async (req, res, next) => {
  try {
    const parseResult = propertySchema.partial().safeParse(req.body)
    if (!parseResult.success) {
      return next(new ApiError(400, parseResult.error.message))
    }

    const updated = await updateProperty(req.params.id, parseResult.data)
    if (!updated) {
      return next(new ApiError(404, 'Property not found'))
    }

    logger.info('Updated property', req.params.id)
    return res.json(updated)
  } catch (error) {
    return next(error)
  }
})
```

**Enhance to:**
```typescript
router.put('/:id', async (req, res, next) => {
  try {
    const parseResult = propertySchema.partial().safeParse(req.body)
    if (!parseResult.success) {
      return next(new ApiError(400, parseResult.error.message))
    }

    const updates = parseResult.data
    
    // Set timestamps based on status change
    if (updates.status === 'approved') {
      updates.approvedAt = new Date().toISOString()
    } else if (updates.status === 'rejected') {
      updates.rejectedAt = new Date().toISOString()
    }

    const updated = await updateProperty(req.params.id, updates)
    if (!updated) {
      return next(new ApiError(404, 'Property not found'))
    }

    logger.info('Updated property', {
      propertyId: req.params.id,
      status: updates.status,
      changes: Object.keys(updates)
    })
    
    return res.json(updated)
  } catch (error) {
    logger.error('Failed to update property', error)
    return next(error)
  }
})
```

**Changes:**
- Extract parsed data to `updates` variable
- Check if status is "approved" → set `approvedAt`
- Check if status is "rejected" → set `rejectedAt`
- Enhanced logging with status and changed fields
- Added error logging

---

## Step 2.1.3: Add Rejection Reason Support

**Goal:** Allow admins to provide reason when rejecting

**File:** `backend/src/models/property.ts`

**Current Property interface - check if rejectionReason exists:**
- If missing, add: `rejectionReason?: string`

**File:** `backend/src/utils/validation.ts`

**Update schema to allow rejectionReason:**
```typescript
export const propertySchema = z.object({
  // ... existing fields
  rejectionReason: z.string().optional(),
})
```

**File:** `backend/src/routes/properties.ts` (in PUT endpoint)

**Handle rejection reason:**
```typescript
if (updates.status === 'rejected') {
  updates.rejectedAt = new Date().toISOString()
  // rejectionReason comes from request body if provided
}
```

---

## Step 2.1.4: Test PUT Endpoint with curl

**Goal:** Verify status updates work before frontend integration

**Test Approve:**
```bash
# Use a propertyId from your database
curl -X PUT https://hr3hgvamzk.us-east-1.awsapprunner.com/api/properties/YOUR_PROPERTY_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "approved"}'
```

**Expected response:**
```json
{
  "propertyId": "...",
  "status": "approved",
  "approvedAt": "2025-10-28T...",
  ...
}
```

**Test Reject:**
```bash
curl -X PUT https://hr3hgvamzk.us-east-1.awsapprunner.com/api/properties/YOUR_PROPERTY_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "rejected",
    "rejectionReason": "Incomplete documentation"
  }'
```

**Expected response:**
```json
{
  "propertyId": "...",
  "status": "rejected",
  "rejectedAt": "2025-10-28T...",
  "rejectionReason": "Incomplete documentation",
  ...
}
```

**Verify in DynamoDB:**
- Status changed
- Timestamp field set
- Rejection reason saved (if provided)

---

## Module 2.2: Frontend - Admin Single Property Actions

### Current State

**Files:**
- `frontend/src/sections/admin/AdminDetailDrawer.tsx` - Detail view with approve/reject buttons
- `frontend/src/sections/admin/AdminPropertiesTable.tsx` - Table with property list

**What exists:**
- Approve/Reject buttons in drawer
- Status badges
- Property details display

**What's missing:**
- Button click handlers
- API integration
- Loading states
- Success/error feedback
- Table refresh after action

---

## Step 2.2.1: Read Admin Components

**Action:** Understand current implementation

**Files to read:**
1. `frontend/src/sections/admin/AdminDetailDrawer.tsx`
2. `frontend/src/sections/admin/AdminPropertiesTable.tsx`
3. `frontend/src/pages/AdminPanel.tsx`

**What to look for:**
- Where are approve/reject buttons?
- How is selectedProperty passed around?
- How does table refresh data?
- Any existing state management?

---

## Step 2.2.2: Add Approve Handler to AdminDetailDrawer

**File:** `frontend/src/sections/admin/AdminDetailDrawer.tsx`

**Implementation:**

### 1. Add imports:
```typescript
import { useState } from 'react'
import toast from 'react-hot-toast'
import { apiFetch } from '../../utils/api'
```

### 2. Add loading state:
```typescript
const [isApproving, setIsApproving] = useState(false)
```

### 3. Implement approve handler:
```typescript
const handleApprove = async () => {
  if (!property) return
  
  setIsApproving(true)
  
  try {
    await apiFetch(`/properties/${property.propertyId}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'approved' }),
    })
    
    toast.success(`${property.title} approved successfully!`)
    
    // Close drawer
    onClose()
    
    // Trigger refresh
    if (onRefresh) {
      onRefresh()
    }
  } catch (error) {
    console.error('Failed to approve property:', error)
    toast.error('Failed to approve property. Please try again.')
  } finally {
    setIsApproving(false)
  }
}
```

### 4. Wire to button:
```tsx
<button
  onClick={handleApprove}
  disabled={isApproving || property.status === 'approved'}
  className="..."
>
  {isApproving ? 'Approving...' : 'Approve'}
</button>
```

---

## Step 2.2.3: Add Reject Handler with Reason Modal

**Goal:** Allow admin to provide rejection reason

**File:** `frontend/src/sections/admin/AdminDetailDrawer.tsx`

### 1. Add states:
```typescript
const [isRejecting, setIsRejecting] = useState(false)
const [showRejectModal, setShowRejectModal] = useState(false)
const [rejectionReason, setRejectionReason] = useState('')
```

### 2. Implement reject handler:
```typescript
const handleRejectClick = () => {
  setShowRejectModal(true)
}

const handleRejectConfirm = async () => {
  if (!property) return
  
  setIsRejecting(true)
  
  try {
    await apiFetch(`/properties/${property.propertyId}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: 'rejected',
        rejectionReason: rejectionReason || 'No reason provided'
      }),
    })
    
    toast.success(`${property.title} rejected.`)
    
    // Close both modals
    setShowRejectModal(false)
    setRejectionReason('')
    onClose()
    
    // Trigger refresh
    if (onRefresh) {
      onRefresh()
    }
  } catch (error) {
    console.error('Failed to reject property:', error)
    toast.error('Failed to reject property. Please try again.')
  } finally {
    setIsRejecting(false)
  }
}
```

### 3. Add rejection reason modal UI:
```tsx
{showRejectModal && (
  <Dialog open={showRejectModal} onClose={() => setShowRejectModal(false)}>
    <div className="fixed inset-0 bg-black/30" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <Dialog.Title className="text-lg font-semibold text-slate-900">
          Reject Listing
        </Dialog.Title>
        <p className="mt-2 text-sm text-slate-600">
          Provide a reason for rejection (optional):
        </p>
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          rows={3}
          placeholder="e.g., Incomplete documentation, pricing issues, etc."
          className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setShowRejectModal(false)}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={handleRejectConfirm}
            disabled={isRejecting}
            className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white"
          >
            {isRejecting ? 'Rejecting...' : 'Reject'}
          </button>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
)}
```

### 4. Wire reject button:
```tsx
<button
  onClick={handleRejectClick}
  disabled={isRejecting || property.status === 'rejected'}
  className="..."
>
  Reject
</button>
```

---

## Step 2.2.4: Update AdminPanel to Support Refresh

**File:** `frontend/src/pages/AdminPanel.tsx`

**Goal:** Refresh property list after approve/reject

**Implementation:**
- Add `refetch` from useProperties hook
- Pass `onRefresh={refetch}` to AdminDetailDrawer
- Table automatically refreshes and shows updated status

**Approach:**
```typescript
const { data, status, error, refetch } = useProperties(filters)

<AdminDetailDrawer
  property={selectedProperty}
  isOpen={isDrawerOpen}
  onClose={closeDrawer}
  onRefresh={refetch}  // ADD THIS
/>
```

---

## Module 2.3: Frontend - Bulk Actions Implementation

### Current State

**File:** `frontend/src/sections/admin/AdminBulkActions.tsx`

**What exists:**
- Bulk action toolbar UI
- Approve selected / Reject selected buttons
- Selection count display

**What's missing:**
- Button handlers
- Confirmation modal
- API calls for bulk updates
- Progress indicator
- Error handling for partial failures

---

## Step 2.3.1: Implement Bulk Approve

**File:** `frontend/src/sections/admin/AdminPropertiesTable.tsx` or `AdminPanel.tsx`

**Implementation:**

### 1. Add state for bulk operations:
```typescript
const [isBulkApproving, setIsBulkApproving] = useState(false)
const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 })
```

### 2. Implement bulk approve handler:
```typescript
const handleBulkApprove = async () => {
  if (selectedProperties.length === 0) return
  
  const confirmed = window.confirm(
    `Approve ${selectedProperties.length} properties?`
  )
  if (!confirmed) return
  
  setIsBulkApproving(true)
  setBulkProgress({ current: 0, total: selectedProperties.length })
  
  let successCount = 0
  let failCount = 0
  
  for (let i = 0; i < selectedProperties.length; i++) {
    try {
      await apiFetch(`/properties/${selectedProperties[i]}`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'approved' }),
      })
      successCount++
      setBulkProgress({ current: i + 1, total: selectedProperties.length })
    } catch (error) {
      console.error(`Failed to approve ${selectedProperties[i]}:`, error)
      failCount++
    }
  }
  
  setIsBulkApproving(false)
  setBulkProgress({ current: 0, total: 0 })
  
  // Show results
  if (failCount === 0) {
    toast.success(`Successfully approved ${successCount} properties!`)
  } else {
    toast.error(`Approved ${successCount}, failed ${failCount}`)
  }
  
  // Clear selection and refresh
  setSelectedProperties([])
  refetch()
}
```

---

## Step 2.3.2: Implement Bulk Reject

**Similar to bulk approve, but:**
- Prompt for rejection reason (optional)
- Set status to "rejected"
- Include rejectionReason in each API call

**Implementation:**
```typescript
const handleBulkReject = async () => {
  if (selectedProperties.length === 0) return
  
  const reason = window.prompt(
    `Provide rejection reason for ${selectedProperties.length} properties (optional):`
  )
  
  if (reason === null) return // User cancelled
  
  setIsBulkRejecting(true)
  setBulkProgress({ current: 0, total: selectedProperties.length })
  
  let successCount = 0
  let failCount = 0
  
  for (let i = 0; i < selectedProperties.length; i++) {
    try {
      await apiFetch(`/properties/${selectedProperties[i]}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: 'rejected',
          rejectionReason: reason || 'No reason provided'
        }),
      })
      successCount++
      setBulkProgress({ current: i + 1, total: selectedProperties.length })
    } catch (error) {
      console.error(`Failed to reject ${selectedProperties[i]}:`, error)
      failCount++
    }
  }
  
  setIsBulkRejecting(false)
  setBulkProgress({ current: 0, total: 0 })
  
  if (failCount === 0) {
    toast.success(`Successfully rejected ${successCount} properties.`)
  } else {
    toast.error(`Rejected ${successCount}, failed ${failCount}`)
  }
  
  setSelectedProperties([])
  refetch()
}
```

---

## Step 2.3.3: Add Bulk Progress Indicator

**Goal:** Show progress during bulk operations

**UI Component:**
```tsx
{isBulkApproving && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="rounded-2xl bg-white p-6 shadow-xl">
      <p className="text-sm font-semibold text-slate-900">
        Approving properties...
      </p>
      <div className="mt-3 h-2 w-64 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-brand-500 transition-all duration-300"
          style={{
            width: `${(bulkProgress.current / bulkProgress.total) * 100}%`
          }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-600">
        {bulkProgress.current} of {bulkProgress.total}
      </p>
    </div>
  </div>
)}
```

---

## Module 2.4: Testing & Verification

### Test Scenarios

#### Test 1: Single Property Approval
1. Navigate to Admin panel
2. Filter by "Pending" status
3. Click on a pending property (opens drawer)
4. Click "Approve" button
5. Verify:
   - Loading state shows
   - Toast appears: "Property approved successfully!"
   - Drawer closes
   - Table refreshes
   - Property disappears from pending filter
   - Check DynamoDB: status="approved", approvedAt timestamp set

#### Test 2: Single Property Rejection
1. Click on pending property
2. Click "Reject" button
3. Modal appears asking for reason
4. Enter reason: "Needs more documentation"
5. Click "Reject" in modal
6. Verify:
   - Toast appears
   - Drawer/modal close
   - Table refreshes
   - Property disappears from pending
   - Check DynamoDB: status="rejected", rejectedAt timestamp, rejectionReason saved

#### Test 3: Bulk Approve
1. Select 3 pending properties (checkboxes)
2. Click "Approve selected" button
3. Confirm in dialog
4. Verify:
   - Progress indicator shows
   - All 3 properties updated
   - Toast shows "Successfully approved 3 properties!"
   - Table refreshes
   - Selection cleared
   - Check DynamoDB: all 3 have status="approved"

#### Test 4: Bulk Reject
1. Select 2 pending properties
2. Click "Reject selected"
3. Enter reason in prompt
4. Confirm
5. Verify:
   - Progress shows
   - Both updated
   - Toast success
   - Table refreshes
   - Check DynamoDB: both rejected with reason

#### Test 5: Error Cases
- Try approving already-approved property → Button disabled
- Try approving with API down → Error toast, drawer stays open
- Bulk approve with 1 failure → Shows partial success message

---

## Implementation Checklist - Module 2

### Backend (Module 2.1)
- [ ] Add timestamp logic to PUT endpoint (approvedAt, rejectedAt)
- [ ] Add rejectionReason field to Property model
- [ ] Update validation schema for rejectionReason
- [ ] Enhanced logging for status changes
- [ ] Test with curl (approve & reject)
- [ ] Rebuild Docker image
- [ ] Push to ECR
- [ ] Deploy to App Runner
- [ ] Verify in CloudWatch logs

### Frontend - Single Actions (Module 2.2)
- [ ] Read AdminDetailDrawer current implementation
- [ ] Add approve handler
- [ ] Add reject handler with reason modal
- [ ] Add loading states
- [ ] Add toast notifications
- [ ] Pass refetch to drawer from parent
- [ ] Test approve flow
- [ ] Test reject flow
- [ ] Verify DynamoDB updates

### Frontend - Bulk Actions (Module 2.3)
- [ ] Add bulk approve handler
- [ ] Add bulk reject handler with reason
- [ ] Add progress indicator UI
- [ ] Add confirmation dialogs
- [ ] Handle partial failures
- [ ] Test bulk approve (3+ properties)
- [ ] Test bulk reject (2+ properties)
- [ ] Verify all updated in DynamoDB

### Deployment
- [ ] Build frontend
- [ ] Deploy to S3
- [ ] Invalidate CloudFront (or hard refresh)
- [ ] Test on squarefeet.co.in/admin
- [ ] End-to-end test: create listing as seller → approve as admin
- [ ] Verify approved property shows in Properties page

---

## Files to Modify

### Backend
1. `backend/src/routes/properties.ts` - PUT endpoint enhancement
2. `backend/src/models/property.ts` - Add rejectionReason (if missing)
3. `backend/src/utils/validation.ts` - Allow rejectionReason in schema

### Frontend
1. `frontend/src/sections/admin/AdminDetailDrawer.tsx` - Approve/reject handlers
2. `frontend/src/sections/admin/AdminPropertiesTable.tsx` - Bulk action handlers
3. `frontend/src/pages/AdminPanel.tsx` - Pass refetch callback

---

## Dependencies

**No new dependencies needed!**
- Already have react-hot-toast from Phase 2A
- Already have Dialog from @headlessui/react
- Already have apiFetch utility

---

## Success Criteria - Phase 2B

✅ Admin can approve single property  
✅ Admin can reject single property with reason  
✅ Status changes persist to DynamoDB  
✅ Timestamps (approvedAt, rejectedAt) are set correctly  
✅ Rejection reason is saved and displayed  
✅ Bulk approve works for multiple properties  
✅ Bulk reject works with shared reason  
✅ Progress indicator shows during bulk operations  
✅ Toast notifications provide clear feedback  
✅ Table refreshes after all actions  
✅ UI disables actions for already-processed properties  
✅ End-to-end flow: seller creates → admin approves → property goes live  

---

## Timeline Estimate

**Module 2.1 (Backend):** 1-2 hours
- Timestamp logic: 30 mins
- Rejection reason: 30 mins
- Testing & deployment: 30 mins

**Module 2.2 (Single Actions):** 2-3 hours
- Approve handler: 1 hour
- Reject with modal: 1 hour
- Testing: 1 hour

**Module 2.3 (Bulk Actions):** 2-3 hours
- Bulk approve: 1 hour
- Bulk reject: 1 hour
- Progress UI: 30 mins
- Testing: 30 mins

**Total:** 5-8 hours (1 day of focused work)

---

## Next: Module 2.1 Implementation

Start with backend changes, test with curl, then move to frontend integration.

Ready to begin?
