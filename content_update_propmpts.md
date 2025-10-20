# Content Update Implementation Prompts

## Overview
Update SquareFeet UI content to reflect Hyderabad, India residential plots targeting NRI buyers (USA-based clients). This is a content refresh maintaining existing UI structure.

---

## Step 1: Create Contact Configuration File

**File**: `frontend/src/config/contact.ts`

**Action**: Create new configuration file with placeholder contact information that can be easily updated later.

```typescript
export const contactConfig = {
  phone: '', // Format: +91-XXX-XXX-XXXX
  whatsapp: '', // WhatsApp link
  scheduleUrl: '', // Calendly or scheduling tool URL
  email: 'info@squarefeet.com', // Update as needed
}
```

---

## Step 2: Update HeroSection Component

**File**: `frontend/src/sections/HeroSection.tsx`

**Changes**:

1. **Tagline** (line ~28):
   - Current: `Elevated buying & selling journeys`
   - New: `MOVING BACK TO HYDERABAD FROM USA?`

2. **Main headline** (line ~36):
   - Current: `Discover the properties that move your life forward`
   - New: `Buy vetted residential plots all around Hyderabad!`

3. **Subheadline** (line ~46):
   - Current: `SquareFeet blends curated inventory, real-time analytics, and concierge-grade service so every buyer, seller, and investor feels confident from discovery to closing day.`
   - New: `Squarefeet Property Group brings you residential plots fully verified by our legal team, so that you don't have to worry about those headaches.`

4. **Button labels** (lines ~58, ~64):
   - Button 1: `Browse listings` → `Browse Listings` (keep as is)
   - Button 2: `Request valuation` → `Request Evaluation`

5. **Support cards** (lines 4-17) - Replace array with:
```typescript
const supportCards = [
  {
    title: 'Personalized tours',
    description: 'In-person and video showings guided by our team tailored to your schedule.',
  },
  {
    title: 'Remote property registration',
    description: 'You can have your property registered 100% remotely from outside India with the help of a family member or the Squarefeet Team.',
  },
  {
    title: 'Construction in-house',
    description: 'After purchase of your plot, you have the option of having your dream house custom-built by our team.',
  },
]
```

6. **Featured property card** (lines 105-117):
   - Keep as placeholder for now (will update with real Hyderabad plot data later)

---

## Step 3: Update WhyChooseUs Component

**File**: `frontend/src/sections/WhyChooseUs.tsx`

**Changes**:

1. **Section title** (line ~24):
   - Current: `Why work with SquareFeet?`
   - New: `Why work with us?`

2. **Subtitle** (line ~25):
   - Current: `Purpose-built for discerning buyers, investors, and sellers—giving you the clarity, pace, and confidence today's market requires.`
   - New: `Purpose-built for NRIs looking to buy vetted properties in Hyderabad.`

3. **Features array** (lines 1-17) - Replace with:
```typescript
const features = [
  {
    title: 'Family owned',
    description:
      'We are a fully family-owned business with each one of us heading a different department of the business.',
  },
  {
    title: 'Curated inventory',
    description:
      'All the properties listed here are either owned by us or are fully vetted by us, thereby eliminating the headache of unverified listings and online scams.',
  },
  {
    title: 'Partner network',
    description:
      'Financing, inspections, repairs, construction, material supply and legal—our vetted partners keep transactions effortless and transparent.',
  },
]
```

---

## Step 4: Update Testimonials Component

**File**: `frontend/src/sections/Testimonials.tsx`

**Changes**:

Replace testimonials array (lines 4-26) with:
```typescript
const testimonials = [
  {
    quote:
      'Venkateshwarlu uncle is very knowledgeable, friendly and cared about our specific needs. Uncle and his team have helped us with the construction of our family home in Nagole, Hyderabad and also the purchase of another residential plot for investment. I highly recommend their services.',
    name: 'Karunakar Vanguru',
    role: 'IT Professional – Raleigh, NC',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote:
      'I've worked with the Squarefeet team on multiple occasions. They are very approachable and trustworthy and always pay attention to detail. Will definitely be my first choice for any real estate or construction needs. It's my pleasure to recommend them.',
    name: 'Sundeep Kumar Ch',
    role: 'Data Architect – Antioch, CA',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
]
```

**Note**: Removed third generic testimonial; keeping 2 real client stories. Update avatar URLs with actual photos later.

---

## Step 5: Update TeamSection Component

**File**: `frontend/src/sections/TeamSection.tsx`

**Changes**:

1. **Section title** (line ~28):
   - Current: `Built by operators, guided by data`
   - New: `Built by operators, guided by data` (keep as is)

2. **Subtitle** (line ~30):
   - Current: `Our leadership team combines luxury brokerage, investment analytics, and white-glove client service. We're here to unlock your next move—no matter the city.`
   - New: `Family owned and operated business. Our Team includes:`

3. **Team array** (lines 1-20) - Replace with:
```typescript
const team = [
  {
    name: 'Yadavally Venkateshwarlu',
    role: 'Managing Director',
    bio: 'Former Deputy Engineer of over 30 years of experience working for the Irrigation Department of the government of Telangana (erstwhile United AP) turned to private construction since 2014. Leads our Construction Division along with Site inspections and Flood Management.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Manthrala Jyothi',
    role: 'Acquisitions & Legal',
    bio: 'Former Teacher for the government of Telangana, practicing Lawyer at the Ranga Reddy District Court. Leads our Acquisitions and Legal Division.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Yadavally Mourya',
    role: 'Sales',
    bio: 'Data Analyst & IT Consulting Business Operator. Leads our NRI Sales Division.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
  },
]
```

**Note**: Avatar URLs are placeholders. Replace with actual family photos later by updating these URLs.

---

## Step 6: Add Testimonials and Team Sections to Home Page

**File**: `frontend/src/pages/Home.tsx`

**Changes**:

1. Add import at top (after line 4):
```typescript
import Testimonials from '../sections/Testimonials'
import TeamSection from '../sections/TeamSection'
```

2. Add sections before closing `</motion.div>` (after line 45):
```tsx
<motion.section variants={sectionVariants} className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
  <Testimonials />
</motion.section>
<motion.section variants={sectionVariants} className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
  <TeamSection />
</motion.section>
```

---

## Step 7: Update Sell Page Content

**File**: `frontend/src/pages/Sell.tsx`

**Changes**:

1. **Hero section title** (line ~44):
   - Current: `Sell faster with concierge-grade execution`
   - New: `List with Squarefeet`

2. **Hero description** (line ~45):
   - Keep the existing description (already matches new content)

3. **Second section title** (line ~61):
   - Current: `Your journey, managed end-to-end`
   - New: `Your journey, managed end-to-end` (keep as is)

4. **Reasons array stays the same** (concierge onboarding, precision pricing, visibility)

5. **Steps array stays the same** (strategy session, concierge prep, launch & offers, close with confidence)

6. **Final CTA section** (line ~105):
   - Current: `We're ready when you are.`
   - New: `We're ready when you are.` (keep as is)

**Note**: Sell page content already closely matches new requirements. Minimal changes needed.

---

## Step 8: Update Page Metadata

**File**: `frontend/src/pages/Home.tsx`

**Change** (lines 26-28):
```typescript
usePageMetadata({
  title: 'Squarefeet · Vetted Residential Plots in Hyderabad',
  description: 'Buy fully verified residential plots in Hyderabad, India. Purpose-built for NRIs with legal vetting, remote registration, and in-house construction services.',
})
```

---

## Step 9: Add Contact Footer Component (Optional Enhancement)

**File**: `frontend/src/components/Footer.tsx`

**Action**: Add contact section with placeholders that pull from `contactConfig`:

```tsx
import { contactConfig } from '../config/contact'

// Add before existing footer content:
<div className="border-t border-slate-200 pt-8">
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <h3 className="font-display text-lg font-semibold text-slate-900">Ready to talk?</h3>
      <p className="text-sm text-slate-600">
        Personalized strategy session with a Squarefeet advisor. We'll align inventory, timelines, and financing in a single call.
      </p>
    </div>
    <div className="flex gap-3">
      {contactConfig.scheduleUrl && (
        <a href={contactConfig.scheduleUrl} className="btn-primary">Schedule Time</a>
      )}
      {contactConfig.phone && (
        <a href={`tel:${contactConfig.phone}`} className="btn-secondary">Call now</a>
      )}
      {contactConfig.whatsapp && (
        <a href={contactConfig.whatsapp} className="btn-secondary">WhatsApp</a>
      )}
    </div>
  </div>
</div>
```

**Note**: This section will be hidden until contact details are populated in config.

---

## Step 10: Verify and Test

1. **Build frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Check for TypeScript/lint errors**:
   ```bash
   npm run lint
   ```

3. **Visual verification**:
   - Start dev server: `npm run dev`
   - Navigate through pages: Home, Properties, Sell
   - Verify all text updates appear correctly
   - Ensure testimonials section displays 2 stories
   - Confirm team section shows 3 members
   - Check responsive layout on mobile/tablet

4. **Content checklist**:
   - [ ] Hero emphasizes Hyderabad plots for NRIs
   - [ ] Support cards mention remote registration + construction
   - [ ] "Why work with us" highlights family ownership
   - [ ] Testimonials show real NRI client names
   - [ ] Team section displays actual family members
   - [ ] Contact placeholders ready for future updates

---

## Step 11: Deploy to S3 (After Verification)

Once content is verified locally:

```bash
# From frontend directory
npm run build

# Sync to S3
aws s3 sync dist s3://squarefeet-demo --delete

# Verify live site
# Visit: http://squarefeet-demo.s3-website-us-east-1.amazonaws.com
```

---

## Future Updates (Not in Current Scope)

1. **Replace placeholder team photos**: Update avatar URLs in `TeamSection.tsx`
2. **Add real contact info**: Update `frontend/src/config/contact.ts` with phone, WhatsApp, scheduling links
3. **Update featured property card**: Replace HeroSection placeholder with actual Hyderabad plot details
4. **Add Hyderabad property images**: Replace Unsplash URLs with real plot photos
5. **Custom domain**: Point custom domain to App Runner API and S3/CloudFront frontend

---

## Notes

- All changes preserve existing UI structure and animations
- No breaking changes to backend API or data models
- Contact CTAs coded as conditional renders for easy activation
- Placeholder images use professional Unsplash URLs (can swap without code changes)
- Content updates are isolated to 6 component files + 1 new config file

