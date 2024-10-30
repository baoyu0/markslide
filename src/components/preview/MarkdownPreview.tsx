"use client";

import {
  Box,
  useColorMode,
  Flex,
  useDisclosure,
  IconButton,
  Tooltip,
  chakra,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  tomorrow,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import PreviewToolbar from "./PreviewToolbar";
import { useState, useCallback, useRef, useEffect } from "react";
import TableOfContents from "./TableOfContents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { PREVIEW_THEMES, useThemeStore } from "@/config/themes";
import { motion, AnimatePresence } from "framer-motion";
import { Components } from "react-markdown";
import { HTMLProps } from "react";

const MotionBox = motion(Box);
const ChakraImg = chakra<"img", { src: string; alt?: string }>("img");
const ChakraTable = chakra<"table">("table");

interface MarkdownPreviewProps {
  content: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface CodeProps extends HTMLProps<HTMLElement> {
  inline?: boolean;
  className?: string;
}

interface CustomHeadingProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

interface ImageProps {
  src?: string;
  alt?: string;
}

interface TableProps {
  children?: React.ReactNode;
}

const MotionHeading = motion.h1;

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const { colorMode } = useColorMode();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const { currentTheme, setTheme } = useThemeStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isTocOpen,
    onToggle: onTocToggle,
    onClose,
  } = useDisclosure({ defaultIsOpen: true });
  const [readingProgress, setReadingProgress] = useState(0);

  // 处理阅读进度
  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      const totalHeight =
        contentRef.current.scrollHeight - contentRef.current.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    }
  }, []);

  // 添加滚动监听
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 处理标题高亮
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: [0, 1],
      },
    );

    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [content]);

  // 处理目录生成
  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const tocItems: TocItem[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: Number(heading.tagName.charAt(1)),
    }));
    setToc(tocItems);
  }, [content]);

  // 自定义渲染组件
  const components: Partial<Components> = {
    code({ inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      if (!inline && match) {
        return (
          <Box position="relative" my={4}>
            <Box
              position="absolute"
              top={2}
              right={2}
              fontSize="xs"
              color="gray.500"
              bg={colorMode === "light" ? "gray.100" : "gray.700"}
              px={2}
              py={1}
              borderRadius="md"
            >
              {language}
            </Box>
            <div style={{ position: "relative" }}>
              <SyntaxHighlighter
                style={colorMode === "light" ? oneLight : tomorrow}
                language={language}
                PreTag="div"
                showLineNumbers
                wrapLines
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          </Box>
        );
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children, ...props }: CustomHeadingProps) => (
      <MotionHeading
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </MotionHeading>
    ),
    img: ({ src, alt }: ImageProps) => (
      <Box as="figure" position="relative" my={6} textAlign="center">
        <ChakraImg
          src={src || ""}
          alt={alt}
          maxW="100%"
          borderRadius="lg"
          boxShadow="lg"
          transition="transform 0.3s"
          sx={{
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        />
        {alt && (
          <Box
            as="figcaption"
            mt={2}
            fontSize="sm"
            color="gray.500"
            fontStyle="italic"
          >
            {alt}
          </Box>
        )}
      </Box>
    ),
    table: ({ children }: TableProps) => (
      <Box overflowX="auto" my={6}>
        <ChakraTable
          width="100%"
          sx={{
            borderCollapse: "collapse",
          }}
        >
          {children}
        </ChakraTable>
      </Box>
    ),
  };

  // 修改 TableOfContents 的使用方式
  const handleItemClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Flex direction="column" minH="100vh">
      <PreviewToolbar
        theme={currentTheme}
        isFullscreenMode={isFullscreen}
        toc={toc}
        onThemeChange={setTheme}
        onFullscreenChange={() => setIsFullscreen(!isFullscreen)}
        onDownload={() => {}}
        onPrint={() => {}}
        onShare={() => {}}
        onCopy={() => navigator.clipboard.writeText(content)}
      />

      {/* 阅读进度条 */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        height="2px"
        bg="gray.200"
        zIndex={1000}
      >
        <Box
          height="100%"
          bg="blue.500"
          width={`${readingProgress}%`}
          transition="width 0.1s"
        />
      </Box>

      <Flex flex={1}>
        {/* 目录侧边栏 */}
        <AnimatePresence>
          {isTocOpen && (
            <MotionBox
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              w="300px"
              p={4}
              borderRight="1px solid"
              borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
              overflowY="auto"
              position="sticky"
              top="0"
              maxH="calc(100vh - 64px)"
            >
              <TableOfContents
                items={toc}
                activeId={activeHeading}
                onItemClick={handleItemClick}
              />
            </MotionBox>
          )}
        </AnimatePresence>

        {/* 主要内容区域 */}
        <Box
          ref={contentRef}
          flex={1}
          p={8}
          className="markdown-body"
          css={{
            ...PREVIEW_THEMES[currentTheme].styles[colorMode],
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={components}
          >
            {content}
          </ReactMarkdown>
        </Box>

        {/* 目录切换按钮 */}
        <Tooltip label={isTocOpen ? "隐藏目录" : "显示目录"} placement="right">
          <IconButton
            aria-label="Toggle table of contents"
            icon={
              <FontAwesomeIcon
                icon={isTocOpen ? faChevronLeft : faChevronRight}
              />
            }
            position="fixed"
            left={isTocOpen ? "300px" : "0"}
            top="50%"
            transform="translateY(-50%)"
            variant="ghost"
            size="sm"
            onClick={onTocToggle}
            transition="all 0.3s"
          />
        </Tooltip>
      </Flex>

      <style jsx global>{`
        .markdown-body {
          scroll-behavior: smooth;
        }

        .markdown-body :target {
          scroll-margin-top: 80px;
        }

        .markdown-body img {
          max-width: 100%;
          height: auto;
        }

        .markdown-body pre {
          position: relative;
          overflow-x: auto;
        }

        .markdown-body blockquote {
          border-left-width: 4px;
          border-left-style: solid;
          padding-left: 1em;
          margin: 1em 0;
        }

        .markdown-body table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
        }

        .markdown-body th,
        .markdown-body td {
          border: 1px solid;
          padding: 0.5em;
        }

        .markdown-body tr:nth-child(even) {
          background-color: ${colorMode === "light"
            ? "rgba(0,0,0,0.05)"
            : "rgba(255,255,255,0.05)"};
        }
      `}</style>
    </Flex>
  );
}
