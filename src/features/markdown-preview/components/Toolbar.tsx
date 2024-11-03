'use client';

import {
  Box,
  Flex,
  Select,
  IconButton,
  Tooltip,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaExpand, FaCompress, FaSun, FaMoon } from "react-icons/fa";
import { useMarkdownPreviewStore } from "../store/store";
import { MARKDOWN_THEMES } from "../themes";
import { useFullscreen } from "@/shared/hooks/useFullscreen";

export default function Toolbar() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { colorMode, toggleColorMode } = useColorMode();
  const { theme, fontSize, lineHeight, setTheme, setFontSize, setLineHeight } = useMarkdownPreviewStore();

  return (
    <Box 
      position="fixed" 
      top={0} 
      right={0} 
      p={4} 
      bg={colorMode === 'light' ? 'white' : 'gray.800'} 
      boxShadow="sm"
      borderRadius="md"
      m={2}
    >
      <Flex direction="column" gap={4}>
        <Select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          size="sm"
        >
          {Object.entries(MARKDOWN_THEMES).map(([key, value]) => (
            <option key={key} value={key}>{value.name}</option>
          ))}
        </Select>

        <Box>
          <Text fontSize="sm">字体大小</Text>
          <Slider
            value={parseInt(fontSize)}
            min={12}
            max={24}
            onChange={(v) => setFontSize(`${v}px`)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>

        <Box>
          <Text fontSize="sm">行高</Text>
          <Slider
            value={parseFloat(lineHeight)}
            min={1.2}
            max={2}
            step={0.1}
            onChange={(v) => setLineHeight(v.toString())}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>

        <Flex gap={2}>
          <Tooltip label={colorMode === 'light' ? "切换到夜间模式" : "切换到日间模式"}>
            <IconButton
              aria-label="切换主题模式"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              size="sm"
            />
          </Tooltip>

          <Tooltip label={isFullscreen ? "退出全屏" : "全屏"}>
            <IconButton
              aria-label="切换全屏"
              icon={isFullscreen ? <FaCompress /> : <FaExpand />}
              onClick={toggleFullscreen}
              size="sm"
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
} 