'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Progress,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'

interface UploadProgressProps {
  isOpen: boolean
  fileName: string
  progress: number
}

export default function UploadProgress({
  isOpen,
  fileName,
  progress,
}: UploadProgressProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => {}} 
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader color={textColor}>上传文件</ModalHeader>
        <ModalBody>
          <VStack spacing={4} pb={6}>
            <Text color={textColor} fontSize="md">
              {fileName}
            </Text>
            <Progress
              value={progress}
              width="100%"
              hasStripe
              isAnimated
              colorScheme="blue"
              borderRadius="full"
              size="lg"
            />
            <Text color={textColor} fontSize="sm">
              {progress}%
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
} 