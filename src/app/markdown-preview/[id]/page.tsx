'use client'

import { useParams } from 'next/navigation'
import { Box } from '@chakra-ui/react'
import { useFileStore } from '@/shared/stores/fileStore'
import dynamic from 'next/dynamic'
import PreviewContainer from '@/components/preview/PreviewContainer'

const Preview = dynamic(
  () => import('@/features/markdown-preview/components/Preview'),
  { ssr: false }
)

export default function MarkdownPreviewPage() {
  const params = useParams()
  const fileId = params?.id as string
  const file = useFileStore((state) => state.getFile(fileId))

  if (!file) {
    return (
      <Box p={4}>
        文件不存在
      </Box>
    )
  }

  return (
    <PreviewContainer fileId={fileId} type="markdown">
      <Preview content={file.content} />
    </PreviewContainer>
  )
} 