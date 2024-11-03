import { saveAs } from 'file-saver'
import type { PreviewMode } from '../types/file'

export async function exportFile(content: string, fileName: string, format: PreviewMode) {
  let blob: Blob
  let exportFileName: string

  switch (format) {
    case 'markdown':
      blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
      exportFileName = `${fileName}.md`
      break
    case 'html':
      // 添加基本的 HTML 结构
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${fileName}</title>
</head>
<body>
${content}
</body>
</html>`
      blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
      exportFileName = `${fileName}.html`
      break
    case 'ppt':
      // TODO: 使用 PptxGenJS 生成 PPT
      throw new Error('PPT export not implemented yet')
    default:
      throw new Error('Unsupported export format')
  }

  saveAs(blob, exportFileName)
} 