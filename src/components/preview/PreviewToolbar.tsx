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
  ButtonGroup,
  Text,
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
  faChevronLeft,
  faChevronRight,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState, useMemo } from "react";
import { useFullscreen } from "@/hooks/useFullscreen";
import { TableOfContents } from "@/components/common/TableOfContents";
import {
  MARKDOWN_THEMES,
  HTML_THEMES,
  PPT_THEMES,
  ThemeMap,
  Theme,
  PPTThemeMap,
} from "@/config/preview-themes";

interface PreviewToolbarProps {
  theme: string;
  previewType?: "markdown" | "html" | "ppt";
  isFullscreenMode: boolean;
  onThemeChange: (theme: string) => void;
  onFullscreenChange: () => void;
  onPrint: () => void;
  onDownload: () => void;
  onShare: () => void;
  onCopy: () => void;
  toc?: Array<{ id: string; text: string; level: number }>;
  onItemClick?: (id: string) => void;
  activeId?: string;
  isPPTMode?: boolean;
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
  onOverview?: () => void;
  canDownload?: boolean;
  canPrint?: boolean;
  canShare?: boolean;
  currentSlide?: number;
  totalSlides?: number;
}

export default function PreviewToolbar({
  theme,
  previewType = "markdown",
  isFullscreenMode,
  onThemeChange,
  onFullscreenChange,
  onPrint,
  onDownload,
  onShare,
  onCopy,
  toc = [],
  onItemClick = () => {},
  activeId,
  isPPTMode,
  onPrevSlide,
  onNextSlide,
  onOverview,
  canDownload = true,
  canPrint = true,
  canShare = true,
  currentSlide,
  totalSlides,
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

  const getThemes = useCallback(() => {
    switch (previewType) {
      case "markdown":
        return MARKDOWN_THEMES as ThemeMap;
      case "html":
        return HTML_THEMES as ThemeMap;
      case "ppt":
        return PPT_THEMES as PPTThemeMap;
      default:
        return MARKDOWN_THEMES as ThemeMap;
    }
  }, [previewType]);

  const themes = useMemo(() => getThemes(), [getThemes]);

  const handleThemeChange = useCallback(
    (newTheme: string) => {
      console.log("点击主题切换:", { currentTheme: theme, newTheme });
      if (typeof onThemeChange === "function" && themes[newTheme]) {
        onThemeChange(newTheme);
        toast({
          title: `已切换到${themes[newTheme].name}主题`,
          status: "success",
          duration: 2000,
        });
      }
    },
    [theme, onThemeChange, toast, themes],
  );

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

  const handleFullscreenChange = useCallback(() => {
    toggleFullscreen();
    onFullscreenChange?.();
    toast({
      title: isFullscreenMode ? "已退出全屏" : "已进入全屏",
      status: "success",
      duration: 2000,
    });
  }, [toggleFullscreen, isFullscreenMode, onFullscreenChange, toast]);

  const slideInfo = useMemo(() => {
    if (
      isPPTMode &&
      typeof currentSlide !== "undefined" &&
      typeof totalSlides !== "undefined"
    ) {
      return `${currentSlide + 1} / ${totalSlides}`;
    }
    return null;
  }, [currentSlide, totalSlides, isPPTMode]);

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
              aria-label="切换主题模式"
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
              {Object.entries(themes).map(([id, themeConfig]) => (
                <MenuItem
                  key={id}
                  onClick={() => handleThemeChange(id)}
                  icon={
                    theme === id ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : undefined
                  }
                >
                  {(themeConfig as Theme | { name: string }).name}主题
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
            <TableOfContents
              items={toc}
              activeId={activeId}
              onItemClick={(id) => {
                onItemClick(id);
                onClose();
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {isPPTMode && (
        <ButtonGroup size="sm" variant="ghost" spacing={2}>
          <Tooltip label="上一页">
            <IconButton
              aria-label="Previous slide"
              icon={<FontAwesomeIcon icon={faChevronLeft} />}
              onClick={onPrevSlide}
            />
          </Tooltip>
          <Tooltip label="下一页">
            <IconButton
              aria-label="Next slide"
              icon={<FontAwesomeIcon icon={faChevronRight} />}
              onClick={onNextSlide}
            />
          </Tooltip>
          <Tooltip label="幻灯片概览">
            <IconButton
              aria-label="Slides overview"
              icon={<FontAwesomeIcon icon={faThLarge} />}
              onClick={onOverview}
            />
          </Tooltip>
        </ButtonGroup>
      )}

      {slideInfo && (
        <Text fontSize="sm" color="gray.600">
          {slideInfo}
        </Text>
      )}
    </>
  );
}
