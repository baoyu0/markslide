"use client";

import { Box, useColorMode, useToast } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFileStore } from "@/store/useFileStore";
import { FileConverter } from "@/utils/FileConverter";
import MarkdownPreview from "@/components/preview/MarkdownPreview";
import HTMLPreview from "@/components/preview/HTMLPreview";
import PPTPreview from "@/components/preview/PPTPreview";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorDisplay from "@/components/common/ErrorDisplay";

type PreviewType = "markdown" | "html" | "ppt";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { colorMode } = useColorMode();
  const toast = useToast();
  const getFile = useFileStore((state) => state.getFile);

  const fileId = searchParams.get("fileId");
  const type = (searchParams.get("type") || "markdown") as PreviewType;

  useEffect(() => {
    const fetchContent = async () => {
      if (!fileId) {
        setError("未找到文件ID");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const file = await getFile(fileId);
        
        if (!file) {
          throw new Error("文件不存在");
        }

        // 根据预览类型转换内容
        let convertedContent = file.content;
        try {
          if (type !== file.type) {
            convertedContent = FileConverter.convert(file.content, file.type, type);
          }
          setContent(convertedContent);
        } catch (conversionError) {
          throw new Error(`文件转换失败: ${(conversionError as Error).message}`);
        }

      } catch (error) {
        const errorMessage = (error as Error).message;
        setError(errorMessage);
        toast({
          title: "加载失败",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [fileId, type, getFile, toast]);

  return (
    <Box
      minH="100vh"
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      position="relative"
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : (
        <>
          {type === "markdown" && <MarkdownPreview content={content} />}
          {type === "html" && <HTMLPreview content={content} />}
          {type === "ppt" && <PPTPreview content={content} />}
        </>
      )}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: ${colorMode === "light" ? "#3182ce40" : "#90cdf440"};
          color: inherit;
        }
      `}</style>
    </Box>
  );
}
