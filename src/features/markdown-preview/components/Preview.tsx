'use client'

import { Box } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useMarkdownPreviewStore } from '../store/store'
import { themes } from '../themes'
import { CODE_THEMES } from '../themes/code'
import styles from '../styles/preview.module.css'
import Toolbar from './Toolbar'

interface PreviewProps {
  content: string
  fileId: string
  fileName: string
}

export default function Preview({ content, fileId, fileName }: PreviewProps) {
  const { theme, codeTheme, fontSize, lineHeight } = useMarkdownPreviewStore()
  const themeStyles = themes[theme].styles

  return (
    <Box>
      <Toolbar fileId={fileId} fileName={fileName} content={content} />
      
      <Box 
        className={styles.preview}
        sx={{
          ...themeStyles,
          fontSize,
          lineHeight,
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
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
    </Box>
  )
} 