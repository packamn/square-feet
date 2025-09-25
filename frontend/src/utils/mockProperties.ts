import type { Property } from '../types/property'

export const adaptPropertyFromApi = (raw: unknown): Property => raw as Property
