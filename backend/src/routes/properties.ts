import { Router } from 'express'
import { randomUUID } from 'node:crypto'

import { ApiError } from '../middleware/errorHandler'
import type { Property } from '../models/property'
import {
  createProperty,
  deleteProperty,
  getPropertyById,
  listProperties,
  updateProperty,
} from '../repositories/propertyRepository'
import { logger } from '../utils/logger'
import { propertySchema } from '../utils/validation'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const { status, propertyType, city, minPrice, maxPrice, search } = req.query

    const filters = {
      status: typeof status === 'string' ? status : undefined,
      propertyType: typeof propertyType === 'string' ? propertyType : undefined,
      city: typeof city === 'string' ? city : undefined,
      minPrice: typeof minPrice === 'string' ? Number(minPrice) : undefined,
      maxPrice: typeof maxPrice === 'string' ? Number(maxPrice) : undefined,
      search: typeof search === 'string' ? search : undefined,
    }

    const properties = await listProperties(filters)
    res.json({ items: properties, count: properties.length })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id)
    if (!property) {
      return next(new ApiError(404, 'Property not found'))
    }

    return res.json(property)
  } catch (error) {
    return next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const parseResult = propertySchema.safeParse(req.body)
    if (!parseResult.success) {
      return next(new ApiError(400, parseResult.error.message))
    }

    const now = new Date().toISOString()
    const body = parseResult.data

    const property: Property = {
      ...body,
      propertyId: body.propertyId ?? randomUUID(),
      createdAt: now,
      updatedAt: now,
      status: body.status ?? 'pending',
      sellerId: body.sellerId ?? 'SELLER_DEMO_001',
      features: body.features ?? [],
      images: body.images ?? [],
    }

    await createProperty(property)
    logger.info('Created property', {
      propertyId: property.propertyId,
      title: property.title,
      sellerId: property.sellerId,
      status: property.status,
      price: property.price,
      location: `${property.address.city}, ${property.address.state}`
    })
    res.status(201).json(property)
  } catch (error) {
    logger.error('Failed to create property', error)
    next(error)
  }
})

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
      changes: Object.keys(updates),
    })

    return res.json(updated)
  } catch (error) {
    logger.error('Failed to update property', error)
    return next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const removed = await deleteProperty(req.params.id)
    if (!removed) {
      return next(new ApiError(404, 'Property not found'))
    }

    logger.warn('Deleted property', req.params.id)
    return res.status(204).send()
  } catch (error) {
    return next(error)
  }
})

export default router
