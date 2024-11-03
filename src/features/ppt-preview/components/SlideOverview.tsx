'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Box,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

interface SlideOverviewProps {
  isOpen: boolean
  onClose: () => void
  slides: string[]
  currentSlide: number
  onSlideSelect: (index: number) => void
}

export default function SlideOverview({
  isOpen,
  onClose,
  slides,
  currentSlide,
  onSlideSelect,
}: SlideOverviewProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const currentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>幻灯片概览</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <SimpleGrid columns={3} spacing={4}>
            {slides.map((slide, index) => (
              <Box
                key={index}
                ref={index === currentSlide ? currentRef : null}
                p={4}
                border="2px"
                borderColor={index === currentSlide ? 'blue.500' : borderColor}
                borderRadius="md"
                cursor="pointer"
                onClick={() => {
                  onSlideSelect(index)
                  onClose()
                }}
                _hover={{
                  borderColor: 'blue.500',
                  transform: 'scale(1.02)',
                }}
                transition="all 0.2s"
                position="relative"
                height="200px"
                overflow="hidden"
              >
                <Text
                  position="absolute"
                  top={2}
                  right={2}
                  bg="blue.500"
                  color="white"
                  px={2}
                  py={1}
                  borderRadius="md"
                  fontSize="sm"
                >
                  {index + 1}
                </Text>
                <Box
                  dangerouslySetInnerHTML={{ __html: slide }}
                  sx={{
                    'h1,h2,h3': { fontSize: 'sm' },
                    'p,li': { fontSize: 'xs' },
                    img: { maxHeight: '100px' },
                  }}
                />
              </Box>
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
} 