"use client";

import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faPalette,
  faExpand,
  faCompress,
  faDownload,
  faAdjust,
  faPrint,
  faShare,
  faCopy,
  faCheck,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { PREVIEW_THEMES, ThemeId } from "@/config/themes";
import { useCallback, useState } from "react";
import TableOfContents from "./TableOfContents";
import { useFullscreen } from "@/hooks/useFullscreen";

interface PreviewToolbarProps {
  theme: ThemeId;
  isFullscreenMode: boolean;
  toc: Array<{ id: string; text: string; level: number }>;
  onThemeChange: (theme: ThemeId) => void;
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
  isFullscreenMode,
  toc,
  onThemeChange,
  onFullscreenChange,
  onDownload,
  onPrint,
  onShare,
  onCopy,
  canDownload = true,
  canPrint = true,
  canShare = true,
}: PreviewToolbarProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const iconColor = useColorModeValue("gray.600", "gray.400");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const toast = useToast();
  const [isCopying, setIsCopying] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleFullscreen } = useFullscreen();

  const handleCopy = useCallback(async () => {
    try {
      await onCopy();
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    } catch (error) {
      console.error("复制失败:", error);
    }
  }, [onCopy]);

  const handleShare = useCallback(() => {
    onShare();
  }, [onShare]);

  const handleThemeChange = useCallback(
    (newTheme: ThemeId) => {
      console.log("点击主题切换:", { currentTheme: theme, newTheme });
      if (typeof onThemeChange === "function") {
        onThemeChange(newTheme);
        toast({
          title: `已切换到${PREVIEW_THEMES[newTheme].name}主题`,
          status: "success",
          duration: 2000,
        });
      } else {
        console.warn("onThemeChange 不是一个函数");
      }
    },
    [theme, onThemeChange, toast],
  );

  const handleFullscreenChange = useCallback(() => {
    toggleFullscreen();
    onFullscreenChange?.();
    toast({
      title: isFullscreenMode ? "已退出全屏" : "已进入全屏",
      status: "success",
      duration: 2000,
    });
  }, [toggleFullscreen, isFullscreenMode, onFullscreenChange, toast]);

  return (
    <>
      <Flex
        position="sticky"
        top={0}
        zIndex={10}
        p={2}
        bg={bg}
        borderBottom="1px solid"
        borderColor={borderColor}
        justify="space-between"
        align="center"
      >
        <Tooltip label="显示目录" placement="right">
          <IconButton
            aria-label="显示目录"
            icon={<FontAwesomeIcon icon={faList} />}
            variant="ghost"
            size="sm"
            color={iconColor}
            _hover={{ bg: hoverBg }}
            onClick={onOpen}
          />
        </Tooltip>

        <Flex gap={2}>
          <Tooltip label={`切换${colorMode === "light" ? "深色" : "浅色"}模式`}>
            <IconButton
              aria-label="切换题模式"
              icon={<FontAwesomeIcon icon={faAdjust} />}
              variant="ghost"
              size="sm"
              color={iconColor}
              _hover={{ bg: hoverBg }}
              onClick={toggleColorMode}
            />
          </Tooltip>

          <Menu>
            <Tooltip label="主题样式">
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
              {Object.entries(PREVIEW_THEMES).map(([id, { name }]) => (
                <MenuItem
                  key={id}
                  onClick={() => handleThemeChange(id as ThemeId)}
                  icon={
                    theme === id ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : undefined
                  }
                >
                  {name}主题
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Tooltip label={isFullscreenMode ? "退出全屏" : "全屏模式"}>
            <IconButton
              aria-label={isFullscreenMode ? "退出全屏" : "全屏模式"}
              icon={
                <FontAwesomeIcon
                  icon={isFullscreenMode ? faCompress : faExpand}
                />
              }
              variant="ghost"
              size="sm"
              color={iconColor}
              _hover={{ bg: hoverBg }}
              onClick={handleFullscreenChange}
            />
          </Tooltip>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FontAwesomeIcon icon={faCog} />}
              variant="ghost"
              size="sm"
              color={iconColor}
              _hover={{ bg: hoverBg }}
            />
            <MenuList>
              <MenuItem
                icon={<FontAwesomeIcon icon={faCopy} />}
                onClick={handleCopy}
                isDisabled={isCopying}
              >
                {isCopying ? "已复制" : "复制内容"}
              </MenuItem>
              {canDownload && (
                <MenuItem
                  icon={<FontAwesomeIcon icon={faDownload} />}
                  onClick={onDownload}
                >
                  下载文档
                </MenuItem>
              )}
              {canPrint && (
                <MenuItem
                  icon={<FontAwesomeIcon icon={faPrint} />}
                  onClick={onPrint}
                >
                  打印文档
                </MenuItem>
              )}
              {canShare && (
                <MenuItem
                  icon={<FontAwesomeIcon icon={faShare} />}
                  onClick={handleShare}
                >
                  分享文档
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">目录</DrawerHeader>
          <DrawerBody>
            <TableOfContents items={toc} onItemClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
