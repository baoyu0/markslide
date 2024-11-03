"use client";

import { useParams } from "next/navigation";
import { Box, Container, HStack, IconButton, useToast } from "@chakra-ui/react";
import { useFileStore } from "@/shared/stores/fileStore";
import Editor from "@/features/editor/components/Editor";
import { SaveIcon, PreviewIcon } from "@/components/icons";

export default function EditPage() {
  const params = useParams();
  const fileId = params?.id as string;
  const { getFile, updateFile } = useFileStore();
  const toast = useToast();
  const file = getFile(fileId);

  if (!file) {
    return <Box p={4}>文件不存在</Box>;
  }

  const handleSave = (content: string) => {
    updateFile(fileId, { content });
    toast({
      title: "保存成功",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <HStack spacing={4} mb={4}>
        <IconButton
          aria-label="Save"
          icon={<SaveIcon />}
          onClick={() => handleSave(file.content)}
        />
        <IconButton
          aria-label="Preview"
          icon={<PreviewIcon />}
          onClick={() => window.open(`/markdown-preview/${fileId}`, "_blank")}
        />
      </HStack>

      <Editor
        content={file.content}
        onChange={(content) => updateFile(fileId, { content })}
      />
    </Container>
  );
} 