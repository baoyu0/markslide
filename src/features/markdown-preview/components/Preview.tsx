'use client'

import { Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useMarkdownPreviewStore } from '../store/store'
import { MARKDOWN_THEMES, CODE_THEMES } from '../themes'

interface PreviewProps {
  content: string
}

export default function Preview({ content }: PreviewProps) {
  const { theme, codeTheme } = useMarkdownPreviewStore()
  const themeStyles = MARKDOWN_THEMES[theme]

  return (
    <Box 
      className="markdown-preview"
      sx={themeStyles}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                {...props}
                style={CODE_THEMES[codeTheme]}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  )
} 