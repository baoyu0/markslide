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
    >
      {parse(sanitizedContent)}
    </Box>
  );
}
