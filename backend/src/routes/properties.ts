import { Router } from 'express'
import { randomUUID } from 'node:crypto'

import { ApiError } from '../middleware/errorHandler'
import type { Property } from '../models/property'
import { logger } from '../utils/logger'

const router = Router()

const properties = new Map<string, Property>()

router.get('/', (_req, res) => {
  res.json({ items: Array.from(properties.values()), count: properties.size })
})

router.get('/:id', (req, res, next) => {
  const property = properties.get(req.params.id)
  if (!property) {
    return next(new ApiError(404, 'Property not found'))
  }

  res.json(property)
})

router.post('/', (req, res) => {
  const now = new Date().toISOString()
  const property: Property = {
    ...req.body,
    propertyId: req.body.propertyId ?? randomUUID(),
    createdAt: now,
    updatedAt: now,
  }

  properties.set(property.propertyId, property)
  logger.info('Created property', property.propertyId)
  res.status(201).json(property)
})

router.put('/:id', (req, res, next) => {
  const existing = properties.get(req.params.id)
  if (!existing) {
    return next(new ApiError(404, 'Property not found'))
  }

  const updated: Property = {
    ...existing,
    ...req.body,
    updatedAt: new Date().toISOString(),
  }

  properties.set(req.params.id, updated)
  logger.info('Updated property', req.params.id)
  res.json(updated)
})

router.delete('/:id', (req, res, next) => {
  if (!properties.has(req.params.id)) {
    return next(new ApiError(404, 'Property not found'))
  }

  properties.delete(req.params.id)
  logger.warn('Deleted property', req.params.id)
  res.status(204).send()
})

export default router
