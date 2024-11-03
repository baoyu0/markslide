'use client';

import {
  Box,
  ButtonGroup,
  Button,
  Select,
  HStack,
  IconButton,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import { useMarkdownPreviewStore } from '../store/store'
import { themes } from '../themes'
import { exportFile } from '@/shared/utils/export'

interface ToolbarProps {
  fileId: string
  fileName: string
  content: string
}

export default function Toolbar({ fileId, fileName, content }: ToolbarProps) {
  const { 
    theme, 
    codeTheme, 
    fontSize, 
    lineHeight,
    setTheme,
    setCodeTheme,
    setFontSize,
    setLineHeight,
  } = useMarkdownPreviewStore()
  const { colorMode } = useColorMode()

  const handleExport = async () => {
    try {
      await exportFile(content, fileName, 'markdown')
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  return (
    <Box 
      p={4} 
      borderBottom="1px" 
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
    >
      <HStack spacing={4}>
        <ButtonGroup spacing={2}>
          {Object.entries(themes).map(([key, value]) => (
            <Button
              key={key}
              size="sm"
              colorScheme={theme === key ? 'blue' : 'gray'}
              onClick={() => setTheme(key as any)}
            >
              {value.name}
            </Button>
          ))}
        </ButtonGroup>

        <Select
          value={codeTheme}
          onChange={(e) => setCodeTheme(e.target.value as any)}
          size="sm"
          w="150px"
        >
          <option value="light">浅色代码</option>
          <option value="dark">深色代码</option>
          <option value="github">GitHub</option>
          <option value="dracula">Dracula</option>
        </Select>

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

        <Select
          value={lineHeight}
          onChange={(e) => setLineHeight(e.target.value)}
          size="sm"
          w="120px"
        >
          <option value="1.4">1.4</option>
          <option value="1.6">1.6</option>
          <option value="1.8">1.8</option>
          <option value="2.0">2.0</option>
        </Select>

        <Tooltip label="导出 Markdown">
          <IconButton
            aria-label="Export Markdown"
            icon={<DownloadIcon />}
            onClick={handleExport}
            size="sm"
          />
        </Tooltip>
      </HStack>
    </Box>
  )
} 