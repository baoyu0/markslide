'use client'

import { Box, Container, HStack, IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import type { PreviewMode } from '@/shared/types/file'

interface PreviewContainerProps {
  children: React.ReactNode
  fileId: string
  type: PreviewMode
}

export default function PreviewContainer({ children, fileId, type }: PreviewContainerProps) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW="container.xl" py={4}>
      <HStack justify="flex-end" mb={4}>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </HStack>

      <Box
        borderWidth={1}
        borderRadius="lg"
        overflow="hidden"
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        minH="calc(100vh - 120px)"
      >
        {children}
      </Box>
    </Container>
  )
} 