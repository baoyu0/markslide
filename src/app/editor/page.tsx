"use client";

import { Box } from "@chakra-ui/react";
import Layout from "@/components/layout/Layout";
import TipTapEditor from "@/components/editor/TipTapEditor";
import { useState } from "react";

export default function EditorPage() {
  const [content, setContent] = useState("");

  return (
    <Layout>
      <Box maxW="container.xl" mx="auto" py={8}>
        <TipTapEditor 
          content={content} 
          onChange={setContent} 
        />
      </Box>
    </Layout>
  );
} 