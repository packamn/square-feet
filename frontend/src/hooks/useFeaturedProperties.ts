import { useProperties } from './useProperties'

export const useFeaturedProperties = () => {
  return useProperties({ status: 'approved' })
}
