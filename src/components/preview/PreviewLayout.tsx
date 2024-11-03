'use client'

import { Box, Container, useColorMode } from '@chakra-ui/react'
import type { PreviewMode } from '@/shared/types/file'

interface PreviewLayoutProps {
  children: React.ReactNode
  mode: PreviewMode
  toolbar: React.ReactNode
}

export default function PreviewLayout({ children, mode, toolbar }: PreviewLayoutProps) {
  const { colorMode } = useColorMode()
  
  return (
    <Container maxW="container.xl" p={0}>
      <Box
        position="sticky"
        top={0}
        zIndex={100}
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        borderBottom="1px"
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      >
        {toolbar}
      </Box>
      
      <Box
        className={`preview-${mode}`}
        minH="calc(100vh - 64px)"
        position="relative"
      >
        {children}
      </Box>
    </Container>
  )
} 