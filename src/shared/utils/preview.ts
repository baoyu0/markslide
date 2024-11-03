import { useRouter } from 'next/navigation'
import type { PreviewMode } from '../types/file'

export function usePreview() {
  const router = useRouter()

  const openPreview = (mode: PreviewMode, fileId: string) => {
    switch (mode) {
      case 'markdown':
        router.push(`/markdown-preview/${fileId}`)
        break
      case 'html':
        router.push(`/html-preview/${fileId}`)
        break
      case 'ppt':
        router.push(`/ppt-preview/${fileId}`)
        break
    }
  }

  return { openPreview }
} 