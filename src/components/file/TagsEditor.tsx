'use client'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Input,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'

interface TagsEditorProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
}

export default function TagsEditor({ tags, onTagsChange }: TagsEditorProps) {
  const [newTag, setNewTag] = useState('')
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleAddTag = () => {
    const trimmedTag = newTag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <IconButton
          aria-label="编辑标签"
          icon={<AddIcon />}
          size="sm"
          variant="ghost"
          colorScheme="blue"
        />
      </PopoverTrigger>
      <PopoverContent bg={bgColor} borderColor={borderColor}>
        <PopoverBody>
          <VStack spacing={3} align="stretch">
            <HStack>
              <Input
                placeholder="添加标签..."
                size="sm"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={20}
              />
              <Button 
                size="sm" 
                colorScheme="blue"
                onClick={handleAddTag}
                isDisabled={!newTag.trim()}
              >
                添加
              </Button>
            </HStack>
            <HStack wrap="wrap" spacing={2}>
              {tags.map(tag => (
                <Tag 
                  key={tag} 
                  size="sm"
                  colorScheme="blue"
                  variant="subtle"
                >
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                </Tag>
              ))}
            </HStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
} 