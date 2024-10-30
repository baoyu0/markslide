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
  useToast,
  MenuDivider,
  Portal,
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
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { PREVIEW_THEMES, ThemeId } from "@/config/themes";
import { useCallback, useState } from "react";

interface PreviewToolbarProps {
  theme: ThemeId;
  mode: "light" | "dark";
  isFullscreen: boolean;
  onThemeChange: (theme: ThemeId) => void;
  onModeChange: () => void;
  onFullscreenChange: () => void;
  onDownload: () => void;
  onPrint: () => void;
  onShare: () => void;
  onCopy: () => void;
  canDownload?: boolean;
  canPrint?: boolean;
  canShare?: boolean;
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
  canDownload = true,
  canPrint = true,
  canShare = true,
}: PreviewToolbarProps) {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const iconColor = useColorModeValue("gray.600", "gray.400");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const toast = useToast();
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      setIsCopying(true);
      await onCopy();
      toast({
        title: "复制成功",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "复制失败",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsCopying(false);
    }
  }, [onCopy, toast]);

  const handleShare = useCallback(async () => {
    try {
      await onShare();
      toast({
        title: "分享成功",
        description: "链接已复制到剪贴板",
        status: "success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "分享失败",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
      });
    }
  }, [onShare, toast]);

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
          <Portal>
            <MenuList>
              {Object.entries(PREVIEW_THEMES).map(([id, themeConfig]) => (
                <MenuItem
                  key={id}
                  onClick={() => onThemeChange(id as ThemeId)}
                  bg={theme === id ? hoverBg : "transparent"}
                  icon={theme === id ? <FontAwesomeIcon icon={faCheck} /> : undefined}
                >
                  {themeConfig.name}
                </MenuItem>
              ))}
            </MenuList>
          </Portal>
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
            icon={<FontAwesomeIcon icon={isCopying ? faCheck : faCopy} />}
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            aria-label="Copy content"
            color={isCopying ? "green.500" : iconColor}
            _hover={{ bg: hoverBg }}
            isDisabled={isCopying}
          />
        </Tooltip>

        {canDownload && (
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
        )}

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
          <Portal>
            <MenuList>
              {canPrint && (
                <MenuItem
                  onClick={onPrint}
                  icon={<FontAwesomeIcon icon={faPrint} />}
                >
                  打印文档
                </MenuItem>
              )}
              {canShare && (
                <MenuItem
                  onClick={handleShare}
                  icon={<FontAwesomeIcon icon={faShare} />}
                >
                  分享文档
                </MenuItem>
              )}
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
    </Flex>
  );
}
