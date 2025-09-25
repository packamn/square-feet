import { useEffect } from 'react'

type MetadataOptions = {
  title?: string
  description?: string
}

export const usePageMetadata = ({ title, description }: MetadataOptions) => {
  useEffect(() => {
    if (title) {
      document.title = title
    }

    if (description) {
      let descriptionTag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (!descriptionTag) {
        descriptionTag = document.createElement('meta')
        descriptionTag.setAttribute('name', 'description')
        document.head.appendChild(descriptionTag)
      }
      descriptionTag.setAttribute('content', description)
    }
  }, [title, description])
}
