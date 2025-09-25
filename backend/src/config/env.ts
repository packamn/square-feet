import dotenv from 'dotenv'
import path from 'node:path'

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.local'

dotenv.config({ path: path.resolve(process.cwd(), envFile) })

type AppConfig = {
  port: number
  nodeEnv: string
  corsOrigin: string | RegExp | (string | RegExp)[]
}

const config: AppConfig = {
  port: Number(process.env.PORT ?? 5001),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigin: process.env.CORS_ORIGIN?.split(',') ?? '*',
}

export default config
