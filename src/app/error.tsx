'use client';

import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Box p={8} textAlign="center">
      <Heading mb={4}>出错了</Heading>
      <Text mb={4}>{error.message}</Text>
      <Button
        onClick={reset}
        colorScheme="blue"
      >
        重试
      </Button>
    </Box>
  )
} 