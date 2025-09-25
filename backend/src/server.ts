import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import config from './config/env'
import routes from './routes'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'

const app = express()

app.use(cors({ origin: config.corsOrigin }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', routes)

app.get('/', (_req, res) => {
  res.json({ name: 'SquareFeet API', status: 'running' })
})

app.use(notFoundHandler)
app.use(errorHandler)

const server = app.listen(config.port, () => {
  console.log(`🚀 API running on port ${config.port} (${config.nodeEnv})`)
})

process.on('SIGTERM', () => {
  server.close(() => process.exit(0))
})

process.on('SIGINT', () => {
  server.close(() => process.exit(0))
})
