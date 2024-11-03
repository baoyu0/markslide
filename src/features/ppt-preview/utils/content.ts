import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkFrontmatter from 'remark-frontmatter'
import { marked } from 'marked'
import { Node } from 'unist'
import { removeYamlFrontMatter } from '@/shared/utils/converter'

interface SlideContent {
  content: string
  notes?: string
  title?: string
}

export function processContent(markdown: string): SlideContent[] {
  const processedContent = removeYamlFrontMatter(markdown)
  
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(remarkMath)
  
  const ast = processor.parse(processedContent)
  return splitIntoSlides(ast)
}

function splitIntoSlides(ast: Node): SlideContent[] {
  const slides: SlideContent[] = []
  let currentSlide: string[] = []
  let currentNotes: string[] = []
  let currentTitle: string = ''
  let isInNotes = false

  ast.children.forEach((node: any) => {
    if (node.type === 'heading') {
      if (currentSlide.length > 0) {
        slides.push({
          content: currentSlide.join('\n'),
          notes: currentNotes.length > 0 ? currentNotes.join('\n') : undefined,
          title: currentTitle
        })
        currentSlide = []
        currentNotes = []
      }
      currentTitle = node.children[0].value
    }

    const content = node.value || ''
    
    if (content.includes('???')) {
      isInNotes = true
      return
    }

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
      notes: currentNotes.length > 0 ? currentNotes.join('\n') : undefined,
      title: currentTitle
    })
  }

  return slides
}

export async function formatSlideContent(slides: SlideContent[]): Promise<string> {
  const formattedSlides = await Promise.all(
    slides.map(async (slide) => {
      const content = await marked.parse(slide.content, {
        async: true,
        breaks: true,
        gfm: true
      })
      
      const notes = slide.notes ? 
        await marked.parse(slide.notes, { async: true, breaks: true }) : ''

      return `
        <section data-markdown>
          <div class="markdown-section">
            ${content}
            ${notes ? `<aside class="notes">${notes}</aside>` : ''}
          </div>
        </section>
      `
    })
  )

  return formattedSlides.join('\n')
}

export function extractSlideNotes(slides: SlideContent[]): string[] {
  return slides.map(slide => slide.notes || '')
} 