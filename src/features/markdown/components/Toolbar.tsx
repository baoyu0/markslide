import { Box, Select, IconButton, useColorMode } from "@chakra-ui/react";
import { useMarkdownStore } from "../store/markdownStore";
import { MARKDOWN_THEMES } from "../config/themes";

export default function MarkdownToolbar() {
  const { theme, setTheme } = useMarkdownStore();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box className="markdown-toolbar">
      <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {Object.entries(MARKDOWN_THEMES).map(([key, value]) => (
          <option key={key} value={key}>{value.name}</option>
        ))}
      </Select>
      {/* 其他工具栏控件 */}
    </Box>
  );
} 