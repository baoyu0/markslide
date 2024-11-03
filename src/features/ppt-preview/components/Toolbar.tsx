'use client';

import {
  Box,
  ButtonGroup,
  Button,
  Select,
  HStack,
  useColorMode,
} from '@chakra-ui/react';
import { usePptPreviewStore } from '../store/store';
import { PPT_THEMES, TRANSITIONS } from '../themes';

export default function Toolbar() {
  const { theme, transition, fontSize, setTheme, setTransition, setFontSize } = usePptPreviewStore();
  const { colorMode } = useColorMode();

  return (
    <Box 
      p={4} 
      borderBottom="1px" 
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
    >
      <HStack spacing={4}>
        <ButtonGroup spacing={2}>
          {Object.entries(PPT_THEMES).map(([key, value]) => (
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

        <ButtonGroup spacing={2}>
          {TRANSITIONS.map((t) => (
            <Button
              key={t.value}
              size="sm"
              colorScheme={transition === t.value ? 'blue' : 'gray'}
              onClick={() => setTransition(t.value)}
            >
              {t.label}
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
      </HStack>
    </Box>
  );
} 