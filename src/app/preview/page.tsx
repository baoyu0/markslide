"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";
import MarkdownPreview from "@/components/preview/MarkdownPreview";
import HTMLPreview from "@/components/preview/HTMLPreview";
import PPTPreview from "@/components/preview/PPTPreview";

export default function PreviewPage() {
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
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box minH="100vh" w="100%" p={0}>
      {fileType === "markdown" && <MarkdownPreview content={content} />}
      {fileType === "html" && <HTMLPreview content={content} />}
      {fileType === "ppt" && <PPTPreview content={content} />}
    </Box>
  );
}
