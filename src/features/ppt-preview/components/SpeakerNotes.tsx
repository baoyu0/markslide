'use client'

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'

interface SpeakerNotesProps {
  isOpen: boolean
  onClose: () => void
  notes: string[]
  currentSlide: number
}

export default function SpeakerNotes({ 
  isOpen, 
  onClose, 
  notes, 
  currentSlide 
}: SpeakerNotesProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent bg={bgColor}>
        <DrawerCloseButton />
        <DrawerHeader color={textColor}>演讲者注释</DrawerHeader>
        <DrawerBody>
          <VStack align="stretch" spacing={4}>
            {notes[currentSlide] ? (
              <Text color={textColor}>{notes[currentSlide]}</Text>
            ) : (
              <Text color="gray.500">当前幻灯片没有注释</Text>
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
} 