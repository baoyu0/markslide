import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkFrontmatter from 'remark-frontmatter'
import { Node } from 'unist'

interface SlideContent {
  content: string
  notes?: string
}

export function processContent(markdown: string): SlideContent[] {
  // 移除 YAML 头部
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(remarkMath)
  
  const ast = processor.parse(markdown)
  // 移除 YAML 节点
  ast.children = ast.children.filter(node => node.type !== 'yaml')
  
  return splitIntoSlides(ast)
}

function splitIntoSlides(ast: Node): SlideContent[] {
  const slides: SlideContent[] = []
  let currentSlide: string[] = []
  let currentNotes: string[] = []
  let isInNotes = false

  ast.children.forEach((node: any) => {
    const content = node.value || ''

    // 检查是否是注释标记
    if (content.includes('???')) {
      isInNotes = true
      return
    }

    // 如果是标题或者已经积累了内容，创建新的幻灯片
    if (node.type === 'heading' && currentSlide.length > 0) {
      slides.push({
        content: currentSlide.join('\n'),
        notes: currentNotes.length > 0 ? currentNotes.join('\n') : undefined
      })
      currentSlide = []
      currentNotes = []
      isInNotes = false
    }

    // 根据是否在注释部分，添加内容
    if (isInNotes) {
      currentNotes.push(content)
    } else {
      currentSlide.push(content)
    }
  })

  // 添加最后一个幻灯片
  if (currentSlide.length > 0) {
    slides.push({
      content: currentSlide.join('\n'),
      notes: currentNotes.length > 0 ? currentNotes.join('\n') : undefined
    })
  }

  return slides
}

export function formatSlideContent(slides: SlideContent[]): string {
  return slides
    .map(slide => {
      const formattedContent = slide.content.trim()
      const formattedNotes = slide.notes 
        ? `\n<aside class="notes">${slide.notes.trim()}</aside>` 
        : ''
      
      return `<section>
        ${formattedContent}
        ${formattedNotes}
      </section>`
    })
    .join('\n')
}

export function extractSlideNotes(slides: SlideContent[]): string[] {
  return slides.map(slide => slide.notes || '')
} 