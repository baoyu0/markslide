'use client'

import { useParams } from 'next/navigation'
import { Box } from '@chakra-ui/react'
import { useFileStore } from '@/shared/stores/fileStore'
import PreviewContainer from '@/components/preview/PreviewContainer'
import dynamic from 'next/dynamic'

const Preview = dynamic(
  () => import('@/features/ppt-preview/components/Preview'),
  { ssr: false }
)

export default function PptPreviewPage() {
  const params = useParams()
  const fileId = params?.id as string
  const file = useFileStore((state) => state.getFile(fileId))

  if (!file) {
    return <Box p={4}>文件不存在</Box>
  }

  return (
    <PreviewContainer fileId={fileId} type="ppt">
      <Preview content={file.content} />
    </PreviewContainer>
  )
} 