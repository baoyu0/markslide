"use client";

import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faExpand,
  faCompress,
  faDownload,
  faAdjust,
  faEllipsisV,
  faPrint,
  faShare,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

interface PreviewToolbarProps {
  theme: string;
  mode: "light" | "dark";
  isFullscreen: boolean;
  onThemeChange: (theme: string) => void;
  onModeChange: () => void;
  onFullscreenChange: () => void;
  onDownload: () => void;
  onPrint: () => void;
  onShare: () => void;
  onCopy: () => void;
}

export default function PreviewToolbar({
  theme,
  mode,
  isFullscreen,
  onThemeChange,
  onModeChange,
  onFullscreenChange,
  onDownload,
  onPrint,
  onShare,
  onCopy,
}: PreviewToolbarProps) {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const iconColor = useColorModeValue("gray.600", "gray.400");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const themes = [
    { id: "github", name: "GitHub" },
    { id: "notion", name: "Notion" },
  ];

  return (
    <Flex
      position="sticky"
      top={0}
      zIndex={100}
      p={2}
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      alignItems="center"
      justifyContent="space-between"
      backdropFilter="blur(10px)"
      transition="all 0.2s"
    >
      <Flex gap={2}>
        <Menu>
          <Tooltip label="主题">
            <MenuButton
              as={IconButton}
              icon={<FontAwesomeIcon icon={faPalette} />}
              variant="ghost"
              size="sm"
              color={iconColor}
              _hover={{ bg: hoverBg }}
            />
          </Tooltip>
          <MenuList>
            {themes.map((t) => (
              <MenuItem
                key={t.id}
                onClick={() => onThemeChange(t.id)}
                bg={theme === t.id ? hoverBg : "transparent"}
              >
                {t.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Tooltip label={mode === "light" ? "切换到暗色" : "切换到亮色"}>
          <IconButton
            icon={<FontAwesomeIcon icon={faAdjust} />}
            onClick={onModeChange}
            variant="ghost"
            size="sm"
            aria-label="Toggle theme"
            color={iconColor}
            _hover={{ bg: hoverBg }}
          />
        </Tooltip>
      </Flex>

      <Flex gap={2}>
        <Tooltip label="复制内容">
          <IconButton
            icon={<FontAwesomeIcon icon={faCopy} />}
            onClick={onCopy}
            variant="ghost"
            size="sm"
            aria-label="Copy content"
            color={iconColor}
            _hover={{ bg: hoverBg }}
          />
        </Tooltip>

        <Tooltip label="下载文档">
          <IconButton
            icon={<FontAwesomeIcon icon={faDownload} />}
            onClick={onDownload}
            variant="ghost"
            size="sm"
            aria-label="Download"
            color={iconColor}
            _hover={{ bg: hoverBg }}
          />
        </Tooltip>

        <Tooltip label={isFullscreen ? "退出全屏" : "全屏模式"}>
          <IconButton
            icon={
              <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
            }
            onClick={onFullscreenChange}
            variant="ghost"
            size="sm"
            aria-label="Toggle fullscreen"
            color={iconColor}
            _hover={{ bg: hoverBg }}
          />
        </Tooltip>

        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FontAwesomeIcon icon={faEllipsisV} />}
            variant="ghost"
            size="sm"
            color={iconColor}
            _hover={{ bg: hoverBg }}
          />
          <MenuList>
            <MenuItem
              onClick={onPrint}
              icon={<FontAwesomeIcon icon={faPrint} />}
            >
              打印文档
            </MenuItem>
            <MenuItem
              onClick={onShare}
              icon={<FontAwesomeIcon icon={faShare} />}
            >
              分享文档
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
