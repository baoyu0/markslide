'use client'

import { useParams } from 'next/navigation'
import { Box } from '@chakra-ui/react'
import PreviewContainer from '@/components/preview/PreviewContainer'
import dynamic from 'next/dynamic'

const Preview = dynamic(
  () => import('@/features/ppt-preview/components/Preview'),
  { ssr: false }
)

export default function PptPreviewPage() {
  const params = useParams()
  const fileId = params?.id as string

  if (!fileId) {
    return <Box p={4}>文件 ID 不存在</Box>
  }

  return (
    <PreviewContainer fileId={fileId} type="ppt">
      <Preview />
    </PreviewContainer>
  )
} 