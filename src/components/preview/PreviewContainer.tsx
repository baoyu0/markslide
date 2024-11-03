'use client'

import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useFileStore } from '@/shared/stores/fileStore'

interface PreviewContainerProps {
  children?: ReactNode
  fileId?: string
  type?: 'markdown' | 'html' | 'ppt'
}

export default function PreviewContainer({ children, fileId, type }: PreviewContainerProps) {
  const file = fileId ? useFileStore(state => state.getFile(fileId)) : null

  if (fileId && !file) {
    return <Box p={4}>文件不存在</Box>
  }

  if (type && file && file.type !== type) {
    return <Box p={4}>文件类型不匹配</Box>
  }

  return (
    <Box 
      p={4} 
      bg="white" 
      borderRadius="md" 
      shadow="sm"
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
      {children}
    </Box>
  )
} 