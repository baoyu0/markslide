"use client";

import { Box } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useState } from "react";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";
import PreviewToolbar from "./PreviewToolbar";

// 添加 Markdown 样式
import "./markdown.css";

// Markdown 主题配置
const markdownThemes = {
  github: {
    light: {
      bg: "#ffffff",
      color: "#24292e",
      fontFamily:
        "'SF Pro Text', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontSize: "16px",
      lineHeight: 1.7,
      codeFont:
        "'SF Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
      headerFont:
        "'SF Pro Display', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      codeTheme: "github",
      borderColor: "#e1e4e8",
      blockquoteBg: "#f6f8fa",
      blockquoteColor: "#6a737d",
      linkColor: "#0366d6",
      headerBg: "#ffffff",
      headerBorderColor: "#e1e4e8",
      selectBg: "#ffffff",
      selectBorderColor: "#e1e4e8",
      selectHoverBg: "#f6f8fa",
    },
    dark: {
      bg: "#0d1117",
      color: "#c9d1d9",
      fontFamily:
        "'SF Pro Text', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontSize: "16px",
      lineHeight: 1.7,
      codeFont:
        "'SF Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
      headerFont:
        "'SF Pro Display', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      codeTheme: "github-dark",
      borderColor: "#30363d",
      blockquoteBg: "#161b22",
      blockquoteColor: "#8b949e",
      linkColor: "#58a6ff",
      headerBg: "#0d1117",
      headerBorderColor: "#30363d",
      selectBg: "#161b22",
      selectBorderColor: "#30363d",
      selectHoverBg: "#1c2128",
    },
  },
  notion: {
    light: {
      bg: "#ffffff",
      color: "#37352f",
      fontFamily:
        "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontSize: "16px",
      lineHeight: 1.8,
      codeFont: "'JetBrains Mono', 'Fira Code', monospace",
      headerFont:
        "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      codeTheme: "github",
      borderColor: "#e5e5e5",
      blockquoteBg: "#f7f6f3",
      blockquoteColor: "#6b6b6b",
      linkColor: "#2381fe",
      headerBg: "#ffffff",
      headerBorderColor: "#e5e5e5",
      selectBg: "#ffffff",
      selectBorderColor: "#e5e5e5",
      selectHoverBg: "#f7f6f3",
    },
    dark: {
      bg: "#191919",
      color: "#e6e6e5",
      fontFamily:
        "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      fontSize: "16px",
      lineHeight: 1.8,
      codeFont: "'JetBrains Mono', 'Fira Code', monospace",
      headerFont:
        "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      codeTheme: "github-dark",
      borderColor: "#2f2f2f",
      blockquoteBg: "#242424",
      blockquoteColor: "#999999",
      linkColor: "#2381fe",
      headerBg: "#191919",
      headerBorderColor: "#2f2f2f",
      selectBg: "#242424",
      selectBorderColor: "#2f2f2f",
      selectHoverBg: "#1c2128",
    },
  },
};

// 修改主题类型定义
type ThemeKey = "github" | "notion"; // 明确指定可用的主题
type ThemeMode = "light" | "dark";

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export default function MarkdownPreview({
  content,
  className,
}: MarkdownPreviewProps) {
  const [theme, setTheme] = useState<ThemeKey>("github");
  const [mode, setMode] = useState<ThemeMode>("light");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 确保主题存在
  const currentTheme =
    markdownThemes[theme]?.[mode] || markdownThemes.github.light;

  // 添加下载功能
  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      // 可以添加一个成功提示
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Markdown Document",
          text: content,
        });
      } catch (err) {
        console.error("Failed to share:", err);
      }
    }
  };

  // 修改主题切换处理函数
  const handleModeChange = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <Box className="markdown-preview-container">
      <PreviewToolbar
        theme={theme}
        mode={mode}
        isFullscreen={isFullscreen}
        onThemeChange={(newTheme) => setTheme(newTheme as ThemeKey)}
        onModeChange={handleModeChange}
        onFullscreenChange={() => setIsFullscreen(!isFullscreen)}
        onDownload={handleDownload}
        onPrint={handlePrint}
        onShare={handleShare}
        onCopy={handleCopy}
      />

      <Box
        className={`markdown-body ${className}`}
        p={{ base: 4, md: 8 }}
        maxW={isFullscreen ? "none" : "900px"}
        mx="auto"
        bg={currentTheme.bg}
        color={currentTheme.color}
        sx={{
          // 基础样式
          fontFamily: currentTheme.fontFamily,
          fontSize: currentTheme.fontSize,
          lineHeight: currentTheme.lineHeight,

          // 标题样式
          "h1, h2, h3, h4, h5, h6": {
            fontFamily: currentTheme.headerFont,
            fontWeight: "600",
            letterSpacing: "-0.02em",
            marginTop: "2em",
            marginBottom: "1em",
          },

          // 代码块样式
          "pre, code": {
            fontFamily: currentTheme.codeFont,
            borderRadius: "6px",
          },
          pre: {
            padding: "1.25em",
            background: mode === "light" ? "gray.50" : "gray.900",
            boxShadow:
              mode === "light"
                ? "inset 0 0 0 1px rgba(0,0,0,0.05)"
                : "inset 0 0 0 1px rgba(255,255,255,0.05)",
          },

          // 引用样式
          blockquote: {
            borderLeftWidth: "4px",
            borderLeftStyle: "solid",
            borderLeftColor: mode === "light" ? "gray.200" : "gray.600",
            paddingLeft: "1.5em",
            marginLeft: 0,
            marginRight: 0,
            fontStyle: "italic",
          },

          // 列表样式
          "ul, ol": {
            paddingLeft: "1.5em",
            marginBottom: "1.5em",
          },

          // 表格样式
          table: {
            width: "100%",
            marginBottom: "2em",
            borderCollapse: "separate",
            borderSpacing: 0,
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow:
              mode === "light"
                ? "0 0 0 1px rgba(0,0,0,0.1)"
                : "0 0 0 1px rgba(255,255,255,0.1)",
          },
          "th, td": {
            padding: "0.75em 1em",
            borderBottom: "1px solid",
            borderColor: mode === "light" ? "gray.200" : "gray.700",
          },
          th: {
            fontWeight: "600",
            background: mode === "light" ? "gray.50" : "gray.800",
          },

          // 链接样式
          a: {
            color: mode === "light" ? "blue.600" : "blue.400",
            textDecoration: "none",
            transition: "all 0.2s",
            _hover: {
              color: mode === "light" ? "blue.700" : "blue.300",
              textDecoration: "underline",
            },
          },

          // 图片样式
          img: {
            maxWidth: "100%",
            height: "auto",
            borderRadius: "8px",
            margin: "2em 0",
            boxShadow:
              mode === "light"
                ? "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)"
                : "0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -1px rgba(0,0,0,0.18)",
          },

          // 水平线样式
          hr: {
            margin: "3em 0",
            border: "none",
            height: "1px",
            background: mode === "light" ? "gray.200" : "gray.700",
          },
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            a: ({ ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </Box>
    </Box>
  );
}
