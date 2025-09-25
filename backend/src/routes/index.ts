import { Router } from 'express'

import propertiesRoutes from './properties'

const router = Router()

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

router.get('/status', (_req, res) => {
  res.json({
    service: 'square-feet-api',
    uptime: process.uptime(),
    env: process.env.NODE_ENV ?? 'development',
  })
})

router.use('/properties', propertiesRoutes)

export default router
