'use client'

import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box as="main" minH="100vh">
      {children}
    </Box>
  )
} 