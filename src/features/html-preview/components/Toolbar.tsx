"use client";

import { Box, ButtonGroup, Button, Select } from '@chakra-ui/react'
import { useHtmlPreviewStore } from '../store/store'

export default function Toolbar() {
  const { theme, layout, setTheme, setLayout } = useHtmlPreviewStore()

  return (
    <Box className="html-toolbar">
      <ButtonGroup spacing={2} mb={2}>
        <Select
          size="sm"
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
          width="auto"
        >
          <option value="light">浅色主题</option>
          <option value="dark">深色主题</option>
        </Select>

        <Select
          size="sm"
          value={layout}
          onChange={(e) => setLayout(e.target.value as 'default' | 'wide' | 'full')}
          width="auto"
        >
          <option value="default">默认布局</option>
          <option value="wide">宽屏布局</option>
          <option value="full">全屏布局</option>
        </Select>
      </ButtonGroup>
    </Box>
  )
} 