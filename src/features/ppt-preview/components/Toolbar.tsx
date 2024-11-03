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
  useToast,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { usePptPreviewStore } from '../store/store';
import { PPT_THEMES, TRANSITIONS } from '../themes';
import { exportToPPT } from '../utils/export';
import { useErrorHandler } from '@/shared/utils/error';

interface ToolbarProps {
  fileId: string;
  fileName: string;
  content: string;
}

export default function Toolbar({ fileId, fileName, content }: ToolbarProps) {
  const { theme, transition, fontSize, setTheme, setTransition, setFontSize } = usePptPreviewStore();
  const { colorMode } = useColorMode();
  const { handleError, handleSuccess } = useErrorHandler();

  const handleExport = async () => {
    try {
      await exportToPPT({
        content,
        fileName,
        theme: PPT_THEMES[theme].styles,
      });
      handleSuccess('PPT 导出成功');
    } catch (error) {
      handleError(error, 'PPT 导出失败');
    }
  };

  return (
    <Box 
      p={4} 
      borderBottom="1px" 
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      className="toolbar-animation"
    >
      <HStack spacing={4}>
        <ButtonGroup spacing={2}>
          {Object.entries(PPT_THEMES).map(([key, value]) => (
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
          value={transition}
          onChange={(e) => setTransition(e.target.value as any)}
          size="sm"
          w="150px"
        >
          {TRANSITIONS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
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

        <Tooltip label="导出 PPT">
          <IconButton
            aria-label="Export PPT"
            icon={<DownloadIcon />}
            onClick={handleExport}
            size="sm"
            className="export-button-animation"
          />
        </Tooltip>
      </HStack>
    </Box>
  );
} 