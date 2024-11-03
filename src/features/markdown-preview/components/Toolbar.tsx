'use client';

import { Box, Select, HStack, IconButton } from '@chakra-ui/react'
import { themes } from '../themes'
import { usePreviewStore } from '../store/store'

export default function Toolbar() {
  const { theme, setTheme, fontSize, setFontSize } = usePreviewStore()

  return (
    <HStack spacing={4} p={4} borderBottom="1px" borderColor="gray.200">
      <Box>
        <Select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          size="sm"
          w="200px"
        >
          {Object.entries(themes).map(([key, theme]) => (
            <option key={key} value={key}>{theme.name}</option>
          ))}
        </Select>
      </Box>
      <Box>
        <Select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          size="sm"
          w="120px"
        >
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
        </Select>
      </Box>
    </HStack>
  )
} 