import { useRouter } from 'next/navigation'
import type { PreviewMode } from '../types/file'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkFrontmatter from 'remark-frontmatter'

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

export function parseMarkdown(content: string) {
  // 移除 YAML 头部
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(remarkMath)
  
  const ast = processor.parse(content)
  // 移除 YAML 节点
  ast.children = ast.children.filter(node => node.type !== 'yaml')
  
  return ast
}

export function extractSlides(content: string) {
  const ast = parseMarkdown(content)
  const slides: string[] = []
  let currentSlide = ''
  
  ast.children.forEach(node => {
    if (node.type === 'heading') {
      if (currentSlide) {
        slides.push(currentSlide)
      }
      currentSlide = ''
    }
    currentSlide += node
  })
  
  if (currentSlide) {
    slides.push(currentSlide)
  }
  
  return slides
} 