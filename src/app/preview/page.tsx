"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Spinner, Center, useColorMode } from "@chakra-ui/react";
import MarkdownPreview from "@/components/preview/MarkdownPreview";
import HTMLPreview from "@/components/preview/HTMLPreview";
import PPTPreview from "@/components/preview/PPTPreview";
import Layout from "@/components/layout/Layout";

export default function PreviewPage() {
  const { colorMode } = useColorMode();
  const searchParams = useSearchParams();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const filePath = searchParams.get("path");
  const fileType = searchParams.get("type") as "markdown" | "html" | "ppt";

  useEffect(() => {
    if (filePath) {
      fetch(filePath)
        .then((res) => res.text())
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch((error) => {
          console.error("加载文件失败:", error);
          setLoading(false);
        });
    }
  }, [filePath]);

  if (loading) {
    return (
      <Layout>
        <Center h="calc(100vh - 64px)">
          <Spinner size="xl" />
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        minH="calc(100vh - 64px)"
        w="100%"
        p={0}
        bg={colorMode === "light" ? "white" : "gray.800"}
      >
        {fileType === "markdown" && <MarkdownPreview content={content} />}
        {fileType === "html" && <HTMLPreview content={content} />}
        {fileType === "ppt" && <PPTPreview content={content} />}
      </Box>
    </Layout>
  );
}
