import { z } from 'zod'

export const propertySchema = z.object({
  propertyId: z.string().optional(),
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  currency: z.string().length(3),
  address: z.object({
    street: z.string().min(5, 'Street address too short'),
    locality: z.string().min(2, 'Locality is required'),
    city: z.literal('Hyderabad'),
    state: z.literal('Telangana'),
    zipCode: z.string()
      .regex(/^\d{6}$/, 'Pin code must be 6 digits')
      .refine((val) => val.startsWith('5'), 'Hyderabad pin codes start with 5'),
    country: z.literal('India'),
  }),
  propertyType: z.enum(['house', 'apartment', 'condo', 'land', 'commercial']),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  squareFootage: z.number().optional(),
  lotSize: z.number().optional(),
  yearBuilt: z.number().optional(),
  features: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  status: z.enum(['draft', 'pending', 'approved', 'rejected', 'sold', 'expired']).optional(),
  sellerId: z.string().optional(),
  rejectionReason: z.string().optional(),
  approvedAt: z.string().optional(),
  rejectedAt: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})
