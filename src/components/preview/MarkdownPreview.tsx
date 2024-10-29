"use client";

import { Box, useColorMode } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export default function MarkdownPreview({
  content,
  className,
}: MarkdownPreviewProps) {
  const { colorMode } = useColorMode();

  return (
    <Box
      className={`markdown-body ${className}`}
      p={{ base: 4, md: 8 }}
      maxW="65ch"
      mx="auto"
      bg={colorMode === "light" ? "white" : "gray.800"}
      color={colorMode === "light" ? "gray.800" : "gray.100"}
      minH="100vh"
      sx={{
        // 基础文本样式
        fontSize: "16px",
        lineHeight: 1.8,
        fontFamily: "var(--font-geist-sans)",

        // 标题样式
        "h1, h2, h3, h4, h5, h6": {
          fontWeight: "bold",
          lineHeight: 1.25,
          marginTop: "2em",
          marginBottom: "1em",
        },
        h1: {
          fontSize: "2.5em",
          borderBottom: "1px solid",
          borderColor: colorMode === "light" ? "gray.200" : "gray.600",
          paddingBottom: "0.3em",
        },
        h2: {
          fontSize: "1.75em",
          borderBottom: "1px solid",
          borderColor: colorMode === "light" ? "gray.200" : "gray.600",
          paddingBottom: "0.3em",
        },
        h3: { fontSize: "1.5em" },
        h4: { fontSize: "1.25em" },

        // 段落和列表样式
        p: {
          marginTop: "1.25em",
          marginBottom: "1.25em",
        },
        "ul, ol": {
          paddingLeft: "1.5em",
          marginBottom: "1.25em",
        },
        li: {
          margin: "0.5em 0",
          "& > p": {
            marginTop: "0.5em",
            marginBottom: "0.5em",
          },
        },

        // 引用样式
        blockquote: {
          borderLeft: "4px solid",
          borderColor: colorMode === "light" ? "gray.200" : "gray.600",
          paddingLeft: "1em",
          marginLeft: 0,
          marginRight: 0,
          marginY: "1.5em",
          color: colorMode === "light" ? "gray.600" : "gray.400",
        },

        // 代码样式
        "pre, code": {
          fontFamily: "var(--font-geist-mono)",
        },
        pre: {
          padding: "1em",
          overflow: "auto",
          fontSize: "0.9em",
          lineHeight: 1.5,
          backgroundColor: colorMode === "light" ? "gray.50" : "gray.700",
          borderRadius: "6px",
          marginY: "1.5em",
        },
        "code:not(pre code)": {
          padding: "0.2em 0.4em",
          backgroundColor: colorMode === "light" ? "gray.100" : "gray.700",
          borderRadius: "3px",
          fontSize: "0.9em",
          fontWeight: "medium",
        },

        // 表格样式
        table: {
          width: "100%",
          marginY: "1.5em",
          borderCollapse: "collapse",
          fontSize: "0.9em",
        },
        "th, td": {
          padding: "0.75em 1em",
          border: "1px solid",
          borderColor: colorMode === "light" ? "gray.200" : "gray.600",
        },
        th: {
          fontWeight: "600",
          backgroundColor: colorMode === "light" ? "gray.50" : "gray.700",
        },

        // 水平线样式
        hr: {
          border: 0,
          borderTop: "1px solid",
          borderColor: colorMode === "light" ? "gray.200" : "gray.600",
          margin: "2em 0",
        },

        // 链接样式
        a: {
          color: "blue.500",
          textDecoration: "none",
          _hover: {
            textDecoration: "underline",
          },
        },

        // 图片样式
        img: {
          maxWidth: "100%",
          height: "auto",
          display: "block",
          margin: "1.5em auto",
          borderRadius: "4px",
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
  );
}
