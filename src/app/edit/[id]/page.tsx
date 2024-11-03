"use client";

import { useParams } from "next/navigation";
import { Box } from "@chakra-ui/react";
import PreviewContainer from "@/components/preview/PreviewContainer";
import { useFileStore } from "@/shared/stores/fileStore";
import dynamic from 'next/dynamic'

const Editor = dynamic(
  () => import('@/features/editor/components/Editor'),
  { ssr: false }
)

export default function EditPage() {
  const params = useParams();
  const fileId = params?.id as string;

  if (!fileId) {
    return <Box p={4}>文件 ID 不存在</Box>;
  }

  const { getFile, updateFile } = useFileStore();
  const file = getFile(fileId);

  if (!file) {
    return <Box p={4}>文件不存在</Box>;
  }

  return (
    <PreviewContainer fileId={fileId}>
      <Editor
        initialContent={file.content}
        onChange={(content) => updateFile(fileId, { content })}
      />
    </PreviewContainer>
  );
} 