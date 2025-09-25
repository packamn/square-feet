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
const propertyTypes: PropertyType[] = [
  "house",
  "apartment",
  "condo",
  "land",
  "commercial",
];

const cities = [
  { city: "San Francisco", state: "CA" },
  { city: "Austin", state: "TX" },
  { city: "New York", state: "NY" },
  { city: "Seattle", state: "WA" },
  { city: "Miami", state: "FL" },
  { city: "Denver", state: "CO" },
];

const featuresPool = [
  "Ocean View",
  "Private Pool",
  "Smart Home Automation",
  "Chef Kitchen",
  "Floor-to-Ceiling Windows",
  "Rooftop Deck",
  "24/7 Concierge",
  "EV Charging",
  "Wine Cellar",
  "Home Theater",
];

const placeholderImages = [
  "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
];

const randomFrom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const randomFeatures = () => {
  const shuffled = [...featuresPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.floor(Math.random() * 4) + 3);
};

export const generateProperty = (statusOverride?: PropertyStatus): Property => {
  const { city, state } = randomFrom(cities);
  const propertyId = randomUUID();
  const status = statusOverride ?? randomFrom(statuses);
  const propertyType = randomFrom(propertyTypes);
  const now = new Date().toISOString();
  const price = Math.floor(Math.random() * 3_500_000) + 350_000;

  return {
    propertyId,
    title: `${randomFrom(["Skyline", "Crest", "Vista", "Harbor", "Summit"])} ${randomFrom(
      ["Residences", "Estates", "Manor", "Heights", "Collection"],
    )}`,
    description:
      "Thoughtfully designed luxury property with premium finishes, expansive living spaces, and breathtaking views.",
    price,
    currency: "USD",
    address: {
      street: `${Math.floor(Math.random() * 900) + 100} ${randomFrom(["Market St", "Broadway", "Ocean Ave", "Pine St", "Lombard St"])}`,
      city,
      state,
      zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
      country: "USA",
    },
    propertyType,
    bedrooms: Math.floor(Math.random() * 4) + 2,
    bathrooms: Math.floor(Math.random() * 3) + 2,
    squareFootage: Math.floor(Math.random() * 2500) + 1400,
    lotSize: propertyType === "land" ? Math.random() * 2 + 0.5 : undefined,
    yearBuilt: Math.floor(Math.random() * 30) + 1995,
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
