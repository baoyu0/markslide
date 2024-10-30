"use client";

import { Box, useColorMode } from "@chakra-ui/react";
import { useState, useCallback, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import PreviewToolbar from "./PreviewToolbar";
import { MARKDOWN_THEMES, ThemeStyle } from "@/config/preview-themes";
import { MarkdownStyles } from "./MarkdownStyles";
import { removeYAMLFrontMatter } from "@/utils/contentProcessor";

type ThemeKey = keyof typeof MARKDOWN_THEMES;

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

interface MarkdownPreviewProps {
  content: string;
  className?: string;
  initialTheme?: ThemeKey;
}

export default function MarkdownPreview({
  content,
  className,
  initialTheme = "github" as ThemeKey,
}: MarkdownPreviewProps) {
  const { colorMode } = useColorMode();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>(initialTheme);
  const [toc, setToc] = useState<TableOfContentsItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentThemeConfig = MARKDOWN_THEMES[currentTheme];
  const themeStyles = currentThemeConfig.styles[colorMode] as ThemeStyle;

  // 生成目录
  useEffect(() => {
    const generateToc = () => {
      if (!contentRef.current) return;

      const headings = contentRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6",
      );
      const tocItems: TableOfContentsItem[] = Array.from(headings).map(
        (heading, index) => {
          const text = heading.textContent || "";
          const id = `toc-${index}`;

          heading.setAttribute("id", id);

          console.log("生成目录项:", {
            id,
            text,
            level: parseInt(heading.tagName[1]),
            element: heading,
            exists: !!document.getElementById(id),
          });

          return {
            id,
            text,
            level: parseInt(heading.tagName[1]),
          };
        },
      );

      setToc(tocItems);
    };

    // 等待 ReactMarkdown 渲染完成
    const timer = setTimeout(generateToc, 100);
    return () => clearTimeout(timer);
  }, [content]);

  // 处理目录项点击
  const handleTocItemClick = useCallback((id: string) => {
    console.log("目录项点击:", { id });

    const element = contentRef.current?.querySelector(
      `#${id}`,
    ) as HTMLElement | null;
    if (!element || !contentRef.current) {
      console.warn("目标元素未找到:", {
        id,
        element,
        contentRef: contentRef.current,
        allHeadings: contentRef.current?.querySelectorAll(
          "h1, h2, h3, h4, h5, h6",
        ),
      });
      return;
    }

    try {
      // 计算滚动位置
      const containerRect = contentRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const scrollOffset =
        elementRect.top - containerRect.top + contentRef.current.scrollTop;

      console.log("滚动计算:", {
        elementTop: elementRect.top,
        containerTop: containerRect.top,
        scrollOffset,
        currentScroll: contentRef.current.scrollTop,
      });

      // 使用平滑滚动
      contentRef.current.scrollTo({
        top: Math.max(0, scrollOffset - 80),
        behavior: "smooth",
      });

      // 添加高亮效果
      const originalBg = element.style.backgroundColor;
      element.style.backgroundColor = "rgba(66, 153, 225, 0.1)";
      setTimeout(() => {
        element.style.backgroundColor = originalBg;
      }, 1500);

      console.log("滚动完成");
    } catch (error) {
      console.error("滚动失败:", error);
    }
  }, []);

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const handleThemeChange = useCallback((newTheme: string) => {
    if (newTheme in MARKDOWN_THEMES) {
      console.log("Changing theme to:", newTheme);
      setCurrentTheme(newTheme as ThemeKey);
    }
  }, []);

  // 处理内容，移除 YAML
  const processedContent = removeYAMLFrontMatter(content);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      bg={themeStyles.background}
    >
      <PreviewToolbar
        theme={String(currentTheme)}
        previewType="markdown"
        isFullscreenMode={isFullscreen}
        onThemeChange={handleThemeChange}
        onFullscreenChange={handleFullscreenChange}
        onPrint={() => window.print()}
        onDownload={() => {}}
        onShare={() => {}}
        onCopy={() => navigator.clipboard.writeText(processedContent)}
        toc={toc}
        onItemClick={handleTocItemClick}
      />

      <Box
        ref={contentRef}
        flex="1"
        overflow="auto"
        p={8}
        maxW="1000px"
        mx="auto"
        width="100%"
        className={`markdown-preview ${className || ""}`}
        sx={{
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e0",
            borderRadius: "4px",
          },
          "& h1, & h2, & h3, & h4, & h5, & h6": {
            scrollMarginTop: "80px",
            transition: "background-color 0.3s ease",
            position: "relative",
          },
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
            h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
            h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
            h4: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
            h5: ({ children, ...props }) => <h5 {...props}>{children}</h5>,
            h6: ({ children, ...props }) => <h6 {...props}>{children}</h6>,
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const isInline = !match;

              return isInline ? (
                <code
                  className={className}
                  style={{
                    backgroundColor: themeStyles.code?.inline?.background,
                    color: themeStyles.code?.inline?.color,
                    padding: themeStyles.code?.inline?.padding,
                    borderRadius: themeStyles.code?.inline?.borderRadius,
                    fontSize: themeStyles.code?.inline?.fontSize,
                    fontFamily: themeStyles.code?.inline?.fontFamily,
                  }}
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <SyntaxHighlighter
                  language={match[1]}
                  style={currentThemeConfig.codeTheme}
                  PreTag="div"
                  customStyle={{
                    margin: themeStyles.code?.block?.margin,
                    padding: themeStyles.code?.block?.padding,
                    backgroundColor: themeStyles.code?.block?.background,
                    borderRadius: themeStyles.code?.block?.borderRadius,
                    fontSize: themeStyles.code?.block?.fontSize,
                    lineHeight: themeStyles.code?.block?.lineHeight,
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            },
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </Box>

      <MarkdownStyles theme={themeStyles} />
    </Box>
  );
}
