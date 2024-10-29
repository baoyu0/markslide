"use client";

import { Box, useColorMode } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MarkdownPreview from "@/components/preview/MarkdownPreview";
import HTMLPreview from "@/components/preview/HTMLPreview";
import PPTPreview from "@/components/preview/PPTPreview";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();
  const path = searchParams.get("path") || "";
  const type = searchParams.get("type") || "markdown";

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(path);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Error loading content:", error);
        setContent("# Error\n\nFailed to load content.");
      } finally {
        setIsLoading(false);
      }
    };

    if (path) {
      fetchContent();
    }
  }, [path]);

  return (
    <Box
      minH="100vh"
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      position="relative"
    >
      {isLoading ? (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
        >
          <Box
            as="div"
            className="loading-spinner"
            border="4px solid"
            borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
            borderTopColor={colorMode === "light" ? "blue.500" : "blue.200"}
            borderRadius="50%"
            w="40px"
            h="40px"
            animation="spin 1s linear infinite"
            mb={4}
          />
          <Box
            color={colorMode === "light" ? "gray.600" : "gray.400"}
            fontSize="sm"
          >
            加载中...
          </Box>
        </Box>
      ) : (
        <>
          {type === "markdown" && <MarkdownPreview content={content} />}
          {type === "html" && <HTMLPreview content={content} />}
          {type === "ppt" && <PPTPreview content={content} />}
        </>
      )}

      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* 滚动条样式 */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${colorMode === "light" ? "#f1f1f1" : "#2d3748"};
        }

        ::-webkit-scrollbar-thumb {
          background: ${colorMode === "light" ? "#888" : "#4a5568"};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${colorMode === "light" ? "#555" : "#718096"};
        }

        /* 平滑滚动 */
        html {
          scroll-behavior: smooth;
        }

        /* 选中文本样式 */
        ::selection {
          background: ${colorMode === "light" ? "#3182ce40" : "#90cdf440"};
          color: inherit;
        }
      `}</style>
    </Box>
  );
}
