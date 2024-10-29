"use client";

import { Box } from "@chakra-ui/react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

interface HTMLPreviewProps {
  content: string;
  className?: string;
}

export default function HTMLPreview({ content, className }: HTMLPreviewProps) {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <Box className={className} p={4}>
      {parse(sanitizedContent)}
    </Box>
  );
}
