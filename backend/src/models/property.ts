export type PropertyStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'sold' | 'expired'

export type PropertyType = 'house' | 'apartment' | 'condo' | 'land' | 'commercial'

export interface Address {
  street: string
  locality: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Property {
  propertyId: string
  title: string
  description: string
  price: number
  currency: string
  address: Address
  propertyType: PropertyType
  bedrooms?: number
  bathrooms?: number
  squareFootage?: number
  lotSize?: number
  yearBuilt?: number
  features: string[]
  images: string[]
  status: PropertyStatus
  sellerId: string
  createdAt: string
  updatedAt: string
  approvedAt?: string
  rejectedAt?: string
  rejectionReason?: string
}
