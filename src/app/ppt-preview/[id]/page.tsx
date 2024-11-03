'use client'

import { useParams } from 'next/navigation'
import { Box, Spinner, Center } from '@chakra-ui/react'
import { useFileStore } from '@/shared/stores/fileStore'
import dynamic from 'next/dynamic'
import PreviewContainer from '@/components/preview/PreviewContainer'
import { Suspense } from 'react'

const Preview = dynamic(
  () => import('@/features/ppt-preview/components/Preview'),
  { ssr: false }
)

const LoadingSpinner = () => (
  <Center h="calc(100vh - 120px)">
    <Spinner size="xl" />
  </Center>
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
      <Suspense fallback={<LoadingSpinner />}>
        <Preview 
          content={file.content} 
          fileId={fileId} 
          fileName={file.name} 
        />
      </Suspense>
    </PreviewContainer>
  )
} 