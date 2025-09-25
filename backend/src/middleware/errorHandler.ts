import type { NextFunction, Request, Response } from 'express'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' })
}

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message })
  }

  console.error('Unexpected error', err)
  return res.status(500).json({ error: 'Internal Server Error' })
}
