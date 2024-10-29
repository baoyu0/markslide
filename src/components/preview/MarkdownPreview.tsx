"use client";

import { Box } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";
import { useColorMode } from "@chakra-ui/react";

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
      className={className}
      p={4}
      bg={colorMode === "light" ? "white" : "gray.800"}
      borderRadius="md"
      shadow="sm"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // 移除未使用的 node 参数
          h1: ({ ...props }) => (
            <Box as="h1" fontSize="2xl" fontWeight="bold" mb={4} {...props} />
          ),
          h2: ({ ...props }) => (
            <Box as="h2" fontSize="xl" fontWeight="bold" mb={3} {...props} />
          ),
          h3: ({ ...props }) => (
            <Box as="h3" fontSize="lg" fontWeight="bold" mb={2} {...props} />
          ),
          p: ({ ...props }) => <Box as="p" mb={4} {...props} />,
          ul: ({ ...props }) => <Box as="ul" pl={4} mb={4} {...props} />,
          ol: ({ ...props }) => <Box as="ol" pl={4} mb={4} {...props} />,
          li: ({ ...props }) => <Box as="li" mb={1} {...props} />,
          blockquote: ({ ...props }) => (
            <Box
              as="blockquote"
              borderLeft="4px"
              borderColor="gray.200"
              pl={4}
              py={2}
              mb={4}
              color="gray.600"
              {...props}
            />
          ),
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const isHighlighted = !inline && match;
            return (
              <Box
                as="code"
                bg={colorMode === "light" ? "gray.50" : "gray.700"}
                p={isHighlighted ? 4 : inline ? "0.2em 0.4em" : 2}
                borderRadius="md"
                fontSize="sm"
                fontFamily="mono"
                display={inline ? "inline" : "block"}
                whiteSpace="pre-wrap"
                className={isHighlighted ? className : ""}
                {...props}
              >
                {children}
              </Box>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
