'use client'

import {
  Box,
  Input,
  Select,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  InputGroup,
  InputLeftElement,
  IconButton,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import type { PreviewMode } from '@/shared/types/file'

interface FileFiltersProps {
  onSearch: (query: string) => void
  onFilter: (type?: PreviewMode, tags?: string[]) => void
  onSort: (by: 'name' | 'date' | 'size', order: 'asc' | 'desc') => void
}

export default function FileFilters({
  onSearch,
  onFilter,
  onSort,
}: FileFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<PreviewMode | ''>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const handleTypeChange = (value: string) => {
    const type = value as PreviewMode | ''
    setSelectedType(type)
    onFilter(type || undefined, selectedTags)
  }

  const handleTagRemove = (tag: string) => {
    const newTags = selectedTags.filter(t => t !== tag)
    setSelectedTags(newTags)
    onFilter(selectedType || undefined, newTags)
  }

  return (
    <Box>
      <HStack spacing={4} mb={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="搜索文件..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>

        <Select
          placeholder="文件类型"
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          w="200px"
        >
          <option value="markdown">Markdown</option>
          <option value="html">HTML</option>
          <option value="ppt">PPT</option>
        </Select>

        <Select
          placeholder="排序方式"
          onChange={(e) => {
            const [by, order] = e.target.value.split('-') as ['name' | 'date' | 'size', 'asc' | 'desc']
            onSort(by, order)
          }}
          w="200px"
        >
          <option value="name-asc">名称 (A-Z)</option>
          <option value="name-desc">名称 (Z-A)</option>
          <option value="date-desc">最新优先</option>
          <option value="date-asc">最早优先</option>
          <option value="size-desc">大小 (大-小)</option>
          <option value="size-asc">大小 (小-大)</option>
        </Select>
      </HStack>

      {selectedTags.length > 0 && (
        <Box mb={4}>
          {selectedTags.map(tag => (
            <Tag key={tag} size="md" variant="subtle" colorScheme="blue" mr={2}>
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(tag)} />
            </Tag>
          ))}
        </Box>
      )}
    </Box>
  )
} 