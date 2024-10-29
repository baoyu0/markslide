"use client";

import { Box, useColorMode } from "@chakra-ui/react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface HTMLPreviewProps {
  content: string;
  className?: string;
}

export default function HTMLPreview({ content, className }: HTMLPreviewProps) {
  const { colorMode } = useColorMode();
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <Box
      className={`html-preview ${className}`}
      p={8}
      maxW="container.lg"
      mx="auto"
      bg={colorMode === "light" ? "white" : "gray.800"}
      color={colorMode === "light" ? "gray.800" : "gray.100"}
      borderRadius="md"
      shadow="sm"
      sx={{
        // 基础文本样式
        fontSize: "16px",
        lineHeight: "1.7",
        fontFamily: "var(--font-geist-sans)",

        // 标题样式
        "h1, h2, h3, h4, h5, h6": {
          fontWeight: "bold",
          lineHeight: 1.25,
          marginTop: "24px",
          marginBottom: "16px",
        },
        h1: {
          fontSize: "2em",
          paddingBottom: "0.3em",
          borderBottom: "1px solid",
          borderColor: colorMode === "light" ? "gray.200" : "gray.600",
        },
        h2: {
          fontSize: "1.5em",
          paddingBottom: "0.3em",
          borderBottom: "1px solid",
          borderColor: colorMode === "light" ? "gray.200" : "gray.600",
        },
        h3: { fontSize: "1.25em" },
        h4: { fontSize: "1em" },

        // 段落和列表样式
        "p, ul, ol": {
          marginBottom: "16px",
        },
        "ul, ol": {
          paddingLeft: "2em",
          marginBottom: "16px",
        },
        li: {
          margin: "4px 0",
        },

        // 引用样式
        blockquote: {
          padding: "0 1em",
          color: colorMode === "light" ? "gray.600" : "gray.400",
          borderLeft: "0.25em solid",
          borderColor: colorMode === "light" ? "gray.200" : "gray.600",
          margin: "16px 0",
        },

        // 代码样式
        "pre, code": {
          fontFamily: "var(--font-geist-mono)",
        },
        pre: {
          padding: "16px",
          overflow: "auto",
          fontSize: "85%",
          lineHeight: 1.45,
          backgroundColor: colorMode === "light" ? "gray.50" : "gray.700",
          borderRadius: "6px",
          marginBottom: "16px",
        },
        "code:not(pre code)": {
          padding: "0.2em 0.4em",
          backgroundColor: colorMode === "light" ? "gray.100" : "gray.700",
          borderRadius: "3px",
          fontSize: "85%",
        },

        // 表格样式
        table: {
          width: "100%",
          marginBottom: "16px",
          borderCollapse: "collapse",
          overflow: "auto",
          display: "block",
        },
        "th, td": {
          padding: "6px 13px",
          border: "1px solid",
          borderColor: colorMode === "light" ? "gray.200" : "gray.600",
        },
        th: {
          fontWeight: "600",
          background: colorMode === "light" ? "gray.50" : "gray.700",
        },
        "tr:nth-of-type(even)": {
          background: colorMode === "light" ? "gray.50" : "gray.700",
        },

        // 水平线样式
        hr: {
          height: "0.25em",
          padding: 0,
          margin: "24px 0",
          backgroundColor: colorMode === "light" ? "gray.200" : "gray.600",
          border: 0,
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
          margin: "16px 0",
          borderRadius: "4px",
        },

        // 表单元素样式
        "input, textarea, select": {
          padding: "8px 12px",
          borderRadius: "4px",
          border: "1px solid",
          borderColor: colorMode === "light" ? "gray.200" : "gray.600",
          backgroundColor: colorMode === "light" ? "white" : "gray.700",
          color: "inherit",
          fontSize: "inherit",
        },

        // 按钮样式
        button: {
          padding: "8px 16px",
          borderRadius: "4px",
          border: "1px solid",
          borderColor: colorMode === "light" ? "gray.200" : "gray.600",
          backgroundColor: colorMode === "light" ? "gray.100" : "gray.700",
          color: "inherit",
          cursor: "pointer",
          fontSize: "inherit",
          _hover: {
            backgroundColor: colorMode === "light" ? "gray.200" : "gray.600",
          },
        },

        // 定义列表样式
        dl: {
          marginBottom: "16px",
        },
        "dt, dd": {
          marginBottom: "8px",
        },
        dt: {
          fontWeight: "bold",
        },
        dd: {
          paddingLeft: "16px",
        },
      }}
    >
      {parse(sanitizedContent)}
    </Box>
  );
}
