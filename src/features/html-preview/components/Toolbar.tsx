"use client";

import {
  Box,
  ButtonGroup,
  Button,
  Select,
  HStack,
  IconButton,
  Tooltip,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import { useHtmlPreviewStore } from '../store/store'
import { HTML_THEMES } from '../themes'
import { exportFile } from '@/shared/utils/export'

interface ToolbarProps {
  fileId: string
  fileName: string
  content: string
}

export default function Toolbar({ fileId, fileName, content }: ToolbarProps) {
  const { theme, fontSize, lineHeight, setTheme, setFontSize, setLineHeight } = useHtmlPreviewStore()
  const { colorMode } = useColorMode()
  const toast = useToast()

  const handleExport = async () => {
    try {
      await exportFile(content, fileName, 'html')
      toast({
        title: "导出成功",
        status: "success",
        duration: 2000,
      })
    } catch (error) {
      toast({
        title: "导出失败",
        description: error instanceof Error ? error.message : "未知错误",
        status: "error",
        duration: 3000,
      })
    }
  }

  return (
    <Box 
      p={4} 
      borderBottom="1px" 
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      className="toolbar-animation"
    >
      <HStack spacing={4}>
        <ButtonGroup spacing={2}>
          {Object.entries(HTML_THEMES).map(([key, value]) => (
            <Button
              key={key}
              size="sm"
              colorScheme={theme === key ? 'blue' : 'gray'}
              onClick={() => setTheme(key as any)}
              className="theme-button-animation"
            >
              {value.name}
            </Button>
          ))}
        </ButtonGroup>

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

        <Tooltip label="导出 HTML">
          <IconButton
            aria-label="Export HTML"
            icon={<DownloadIcon />}
            onClick={handleExport}
            size="sm"
            className="export-button-animation"
          />
        </Tooltip>
      </HStack>
    </Box>
  )
} 