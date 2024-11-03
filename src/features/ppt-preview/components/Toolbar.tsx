'use client';

import { Box, ButtonGroup, Button, Select } from '@chakra-ui/react';
import { usePptPreviewStore } from '../store/store';
import { PPT_THEMES, TRANSITIONS } from '../themes';

export default function Toolbar() {
  const { theme, transition, setTheme, setTransition } = usePptPreviewStore();

  return (
    <Box className="ppt-toolbar">
      <ButtonGroup spacing={2} mb={2}>
        {Object.entries(PPT_THEMES).map(([key, value]) => (
          <Button
            key={key}
            size="sm"
            colorScheme={theme === key ? 'blue' : 'gray'}
            onClick={() => setTheme(key)}
          >
            {value.name}
          </Button>
        ))}
      </ButtonGroup>

      <ButtonGroup spacing={2} ml={4}>
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
    </Box>
  );
} 