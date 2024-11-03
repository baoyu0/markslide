import { useRouter } from 'next/navigation'

export const usePreview = () => {
  const router = useRouter()

  const openPreview = (type: string, id: string) => {
    switch (type) {
      case 'markdown':
        router.push(`/markdown-preview/${id}`)
        break
      case 'html':
        router.push(`/html-preview/${id}`)
        break
      case 'ppt':
        router.push(`/ppt-preview/${id}`)
        break
      default:
        console.error('Unsupported preview type:', type)
    }
  }

  return { openPreview }
} 