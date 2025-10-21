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
