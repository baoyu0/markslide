'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useState } from 'react'

interface RenameDialogProps {
  isOpen: boolean
  onClose: () => void
  onRename: (newName: string) => void
  currentName: string
}

export default function RenameDialog({
  isOpen,
  onClose,
  onRename,
  currentName,
}: RenameDialogProps) {
  const [name, setName] = useState(currentName)
  const [error, setError] = useState('')

  const handleRename = () => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('文件名不能为空')
      return
    }
    if (trimmedName === currentName) {
      onClose()
      return
    }
    onRename(trimmedName)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>重命名文件</ModalHeader>
        <ModalBody>
          <FormControl isInvalid={!!error}>
            <FormLabel>文件名</FormLabel>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRename()
                }
              }}
              autoFocus
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="blue" onClick={handleRename}>
            确定
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
} 