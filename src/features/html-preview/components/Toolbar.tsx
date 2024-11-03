"use client";

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
} from "@chakra-ui/react";
import { FaExpand, FaCompress } from "react-icons/fa";
import { useHtmlPreviewStore } from "../store/store";
import { HTML_THEMES } from "../themes";
import { useFullscreen } from "@/shared/hooks/useFullscreen";

export default function Toolbar() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { theme, layout, zoom, setTheme, setLayout, setZoom } = useHtmlPreviewStore();

  return (
    <Box 
      position="fixed" 
      top={0} 
      right={0} 
      p={4} 
      bg="white" 
      boxShadow="sm"
      borderRadius="md"
      m={2}
      _dark={{ bg: "gray.800" }}
    >
      <Flex direction="column" gap={4}>
        <Select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          size="sm"
        >
          {Object.entries(HTML_THEMES).map(([key, value]) => (
            <option key={key} value={key}>{value.name}</option>
          ))}
        </Select>

        <Select
          value={layout}
          onChange={(e) => setLayout(e.target.value as 'responsive' | 'fixed')}
          size="sm"
        >
          <option value="responsive">响应式布局</option>
          <option value="fixed">固定宽度</option>
        </Select>

        <Box>
          <Text fontSize="sm">缩放</Text>
          <Slider
            value={zoom}
            min={0.5}
            max={2}
            step={0.1}
            onChange={(v) => setZoom(v)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>

        <Tooltip label={isFullscreen ? "退出全屏" : "全屏"}>
          <IconButton
            aria-label="切换全屏"
            icon={isFullscreen ? <FaCompress /> : <FaExpand />}
            onClick={toggleFullscreen}
            size="sm"
          />
        </Tooltip>
      </Flex>
    </Box>
  );
} 