import { useRouter } from 'next/navigation'
import type { PreviewMode } from '../types/file'

export function usePreview() {
  const router = useRouter()

  const openPreview = (mode: PreviewMode, fileId: string) => {
    const url = `/${mode}-preview/${fileId}`
    window.open(url, '_blank')
  }

  return { openPreview }
}

export function getPreviewIcon(mode: PreviewMode) {
  switch (mode) {
    case 'markdown':
      return 'markdown'
    case 'html':
      return 'html5'
    case 'ppt':
      return 'file-powerpoint'
    default:
      return 'file'
  }
}

export function getPreviewTooltip(mode: PreviewMode) {
  switch (mode) {
    case 'markdown':
      return '预览 Markdown'
    case 'html':
      return '预览 HTML'
    case 'ppt':
      return '预览 PPT'
    default:
      return '预览'
  }
} 