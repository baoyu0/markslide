import pptxgen from 'pptxgenjs'
import type { PPTThemeStyles } from '../themes'

interface ExportPPTOptions {
  content: string
  fileName: string
  theme: PPTThemeStyles
}

export async function exportToPPT({ content, fileName, theme }: ExportPPTOptions) {
  const pres = new pptxgen()

  // 设置主题
  pres.layout = 'LAYOUT_WIDE'
  pres.theme = {
    background: { color: theme.backgroundColor },
    text: [
      {
        color: theme.color,
        fontFace: theme.fontFamily,
        fontSize: parseInt(theme.fontSize.text),
      },
    ],
  }

  // 分割幻灯片内容
  const slides = content.split('\n---\n')

  // 为每个分割创建幻灯片
  slides.forEach((slideContent) => {
    const slide = pres.addSlide()

    // 添加文本
    slide.addText(slideContent, {
      x: '5%',
      y: '5%',
      w: '90%',
      h: '90%',
      color: theme.color,
      fontSize: parseInt(theme.fontSize.text),
      fontFace: theme.fontFamily,
    })
  })

  // 保存文件
  await pres.writeFile(`${fileName}.pptx`)
} 