# Backend Localization Implementation Prompts

## Overview
Complete localization of SquareFeet platform from USA properties to Hyderabad, India residential plots. This involves updating the backend property generation, regenerating mock data, re-seeding DynamoDB, and redeploying the frontend with updated references.

---

## Step 1: Update Backend Property Generation Configuration

**File**: `backend/src/utils/generateProperties.ts`

**Action**: Replace USA cities/prices/features with Hyderabad-based properties.

Replace the entire file with:

```typescript
import { randomUUID } from "node:crypto";

import type {
  Property,
  PropertyStatus,
  PropertyType,
} from "../models/property";

const statuses: PropertyStatus[] = [
  "draft",
  "pending",
  "approved",
  "rejected",
  "sold",
  "expired",
];

// For Hyderabad plots, mostly "land" type
const propertyTypes: PropertyType[] = [
  "land",
  "house",
  "apartment",
];

// Hyderabad areas/neighborhoods
const areas = [
  { area: "Nagole", zone: "RR" },
  { area: "Gachibowli", zone: "RR" },
  { area: "HITEC City", zone: "RR" },
  { area: "Kukatpally", zone: "Medchal" },
  { area: "Ameerpet", zone: "Central" },
  { area: "Jubilee Hills", zone: "Central" },
  { area: "Banjara Hills", zone: "Central" },
  { area: "Secunderabad", zone: "North" },
  { area: "Bowenpally", zone: "North" },
  { area: "Malkajgiri", zone: "North" },
  { area: "Saroor Nagar", zone: "South" },
  { area: "Tolichowki", zone: "South" },
  { area: "Attapur", zone: "South" },
];

const featuresPool = [
  "Corner Plot",
  "Facing Park",
  "Gated Community",
  "Legal Verified",
  "Clear Ownership",
  "East Facing",
  "Underground Water",
  "Good Approach Road",
  "Peaceful Locality",
  "Near Schools",
];

const placeholderImages = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80", // Land plot
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=80", // Aerial view
  "https://images.unsplash.com/photo-1520763185298-1b434c919eba?auto=format&fit=crop&w=1600&q=80", // Property
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80", // Landscape
  "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1600&q=80", // Architecture
];

const randomFrom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const randomFeatures = () => {
  const shuffled = [...featuresPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 2);
};

export const generateProperty = (statusOverride?: PropertyStatus): Property => {
  const { area, zone } = randomFrom(areas);
  const propertyId = randomUUID();
  const status = statusOverride ?? randomFrom(statuses);
  const propertyType = randomFrom(propertyTypes);
  const now = new Date().toISOString();
  
  // Hyderabad plot prices in INR (1,200,000 to 8,000,000 rupees)
  const price = Math.floor(Math.random() * 6_800_000) + 1_200_000;
  
  // Plot sizes: 500-5000 sq.ft
  const squareFootage = Math.floor(Math.random() * 4500) + 500;

  return {
    propertyId,
    title: `${randomFrom(["Premium", "Luxury", "Spacious", "Modern", "Elegance"])} ${randomFrom(
      ["Plots", "Residential Plot", "Land Plot", "Property", "Estate"],
    )} in ${area}`,
    description:
      "Thoughtfully located residential plot in prime Hyderabad locality with legal verification, clear ownership, and excellent investment potential. Ideal for building your dream home.",
    price,
    currency: "INR",
    address: {
      street: `${randomFrom(["Road", "Street", "Lane", "Avenue", "Boulevard"])} ${Math.floor(Math.random() * 100) + 1}, ${area}`,
      city: "Hyderabad",
      state: "Telangana",
      zipCode: `5000${Math.floor(Math.random() * 90) + 10}`,
      country: "India",
    },
    propertyType,
    bedrooms: propertyType === "land" ? undefined : Math.floor(Math.random() * 4) + 2,
    bathrooms: propertyType === "land" ? undefined : Math.floor(Math.random() * 3) + 2,
    squareFootage,
    lotSize: propertyType === "land" ? squareFootage / 43.56 : undefined, // Convert to acres
    yearBuilt: Math.floor(Math.random() * 10) + 2015,
    features: randomFeatures(),
    images: placeholderImages.slice(0, 3),
    status,
    sellerId: randomUUID(),
    createdAt: now,
    updatedAt: now,
    approvedAt: status === "approved" ? now : undefined,
    rejectedAt: status === "rejected" ? now : undefined,
  };
};

export const generateProperties = (count: number): Property[] => {
  const result: Property[] = [];
  for (let i = 0; i < count; i += 1) {
    result.push(generateProperty());
  }

  return result;
};
```

---

## Step 2: Regenerate Mock Properties JSON

**File**: `backend/src/data/properties.json`

**Action**: Run the seed property generation script to create new Hyderabad-based mock data.

From project root, run:
```bash
npm run seed:properties
```

Or if that script doesn't exist, use ts-node directly:
```bash
npx ts-node backend/src/scripts/seedProperties.ts
```

This will regenerate `backend/src/data/properties.json` with ~24 Hyderabad properties.

**Verify**: Open the file and confirm it contains Hyderabad areas, INR prices, and plot-specific features.

---

## Step 3: Clear Old DynamoDB Data (AWS)

**Action**: Delete the old `Properties` table and recreate it fresh.

1. In AWS console → **DynamoDB → Tables → Properties**.
2. Click **Delete table**.
3. Confirm deletion.
4. Create new table:
   - Table name: `Properties`
   - Partition key: `propertyId` (String)
   - Sort key: `status` (String)
   - Billing: On-demand
   - Create.

Wait for status to show "Active".

---

## Step 4: Re-Seed DynamoDB with New Hyderabad Data

**Action**: Push the regenerated mock data to AWS DynamoDB.

From project root (`/Users/packman/Desktop/square-feet`), run:

```bash
AWS_REGION=us-east-1 \
DYNAMODB_ENDPOINT=https://dynamodb.us-east-1.amazonaws.com \
PROPERTIES_TABLE=Properties \
npm run dynamo:seed
```

**Verify**: In DynamoDB console, open `Properties` table → **Scan**. Confirm you see ~24 items with Hyderabad addresses and INR prices.

---

## Step 5: Update Frontend Mock Properties (Optional Fallback)

**File**: `frontend/src/utils/mockProperties.ts`

**Action**: Create/update frontend mock fallback data to match backend.

Create the file if it doesn't exist, or update with:

```typescript
export const mockProperties = [
  {
    propertyId: "sample-1",
    title: "Premium Plots in Nagole",
    description: "Thoughtfully located residential plot with legal verification and clear ownership.",
    price: 1_500_000,
    currency: "INR",
    address: {
      street: "Road 1, Nagole",
      city: "Hyderabad",
      state: "Telangana",
      zipCode: "500068",
      country: "India",
    },
    propertyType: "land",
    squareFootage: 1200,
    lotSize: 0.028,
    yearBuilt: 2020,
    features: ["Corner Plot", "Legal Verified", "Good Approach Road"],
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"],
    status: "approved",
    sellerId: "seller-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    propertyId: "sample-2",
    title: "Luxury Plots in Gachibowli",
    description: "Prime location plot in tech corridor with premium amenities and legal clarity.",
    price: 2_800_000,
    currency: "INR",
    address: {
      street: "Avenue 5, Gachibowli",
      city: "Hyderabad",
      state: "Telangana",
      zipCode: "500032",
      country: "India",
    },
    propertyType: "land",
    squareFootage: 2500,
    lotSize: 0.057,
    yearBuilt: 2021,
    features: ["Gated Community", "Facing Park", "Underground Water"],
    images: ["https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=80"],
    status: "approved",
    sellerId: "seller-2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
```

---

## Step 6: Rebuild Docker Image with Updated Code

**Action**: Rebuild the backend Docker image to include the updated property generation.

From project root, run:

```bash
docker build -f backend/Dockerfile -t squarefeet-api:latest /Users/packman/Desktop/square-feet
```

**Verify**: Docker build completes without errors.

---

## Step 7: Tag and Push to ECR

**Action**: Tag and push the new image to the ECR repository.

```bash
docker tag squarefeet-api:latest 174332572589.dkr.ecr.us-east-1.amazonaws.com/squarefeet-api:latest
docker push 174332572589.dkr.ecr.us-east-1.amazonaws.com/squarefeet-api:latest
```

**Verify**: ECR console shows new image with latest digest.

---

## Step 8: Redeploy App Runner Service

**Action**: Trigger App Runner to deploy the new image.

In AWS console → **App Runner → squarefeet_api_runner**:
1. Click **Deploy → Deploy latest image**.
2. Wait for status to return to "Running" (2-3 minutes).

**Verify**: 
- Hit `https://hr3hgvamzk.us-east-1.awsapprunner.com/api/properties` in browser.
- You should see Hyderabad plots with INR prices and Telangana addresses.

---

## Step 9: Rebuild Frontend with Updated Content

**Action**: Rebuild the frontend to pick up any environment changes.

From project root:

```bash
cd frontend
npm run build
```

**Verify**: Build completes without TypeScript/lint errors.

---

## Step 10: Sync Frontend to S3

**Action**: Deploy the rebuilt frontend to S3.

```bash
aws s3 sync dist s3://squarefeet-demo --delete
```

---

## Step 11: Full End-to-End Verification

**Action**: Test the complete application with live Hyderabad data.

1. **Home page** (`http://squarefeet-demo.s3-website-us-east-1.amazonaws.com`):
   - Hero shows Hyderabad call-to-action
   - Featured listing shows Hyderabad plot (Nagole, ₹ 1,200,000, etc.)
   - Support cards mention construction services

2. **Properties page** (`/properties`):
   - All cards display Hyderabad locations (Nagole, Gachibowli, HITEC City, etc.)
   - Prices are in INR (₹)
   - Features mention plot-specific attributes (Corner Plot, Legal Verified, etc.)
   - States show "Telangana"

3. **Admin page** (`/admin`):
   - All 24+ seeded properties appear with Hyderabad data
   - Status filters work (approved, pending, draft, etc.)
   - Bulk actions are functional

4. **Seller Dashboard** (`/dashboard`):
   - List creation form ready for sellers
   - Mock data shows Hyderabad context

5. **Hard refresh** (Cmd+Shift+R / Ctrl+Shift+R) to clear cache if needed.

---

## Step 12: Backend Verification via CloudWatch (Optional)

**Action**: Check App Runner logs to confirm no errors with new data.

In App Runner → **Logs → View in CloudWatch**:
- Open `/application` log stream
- Confirm no errors related to property queries
- DynamoDB calls should be successful

---

## Rollback Plan (If Needed)

If something breaks:

1. **Revert Docker image**: Push the previous version to ECR
2. **Redeploy App Runner**: Use the previous image tag
3. **Re-seed DynamoDB**: If table corruption, delete and recreate with old data

---

## Files Modified Summary

1. `backend/src/utils/generateProperties.ts` - Hyderabad areas, prices, features
2. `backend/src/data/properties.json` - Regenerated mock data (auto-generated)
3. DynamoDB `Properties` table - Cleared and re-seeded
4. Docker image in ECR - New version pushed
5. App Runner service - Running new image
6. `frontend/dist` - Rebuilt and synced to S3

---

## Notes

- All prices are in INR (Indian Rupees)
- All addresses reference Hyderabad, Telangana
- Property types shift toward "land" (residential plots)
- Features emphasize legal clarity and investment potential
- Mock images still use Unsplash placeholders (can update with real plot photos later)
- API endpoints unchanged; data structure remains identical

---

## Future Enhancements (Not in Current Scope)

1. **Real plot photos**: Replace Unsplash URLs with actual Hyderabad property images
2. **Testimonials photos**: Add real NRI client headshots (Karunakar, Sundeep)
3. **Team photos**: Add family member photos to TeamSection
4. **Google Maps integration**: Embed Hyderabad maps showing available plot areas
5. **Currency conversion**: Add live INR ↔ USD converter for NRI buyers
6. **Contact integration**: Populate phone/WhatsApp/scheduling links when ready
