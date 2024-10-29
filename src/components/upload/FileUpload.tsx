"use client";

import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import MarkdownPreview from "../preview/MarkdownPreview";

const MAX_FILE_SIZE = Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 10485760; // 10MB
const ALLOWED_FILE_TYPES = process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES?.split(
  ",",
) || [".md", ".html", ".ppt", ".pptx"];

export default function FileUpload() {
  const [content, setContent] = useState<string>("");
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setContent(reader.result as string);
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: MAX_FILE_SIZE,
    accept: {
      "text/markdown": [".md"],
      "text/html": [".html"],
      "application/vnd.ms-powerpoint": [".ppt"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
    },
  });

  return (
    <VStack spacing={4} width="100%">
      <Box
        {...getRootProps()}
        p={10}
        bg={bgColor}
        border="2px dashed"
        borderColor={isDragActive ? "blue.400" : borderColor}
        borderRadius="lg"
        cursor="pointer"
        transition="all 0.2s"
        width="100%"
        _hover={{
          borderColor: "blue.400",
        }}
      >
        <input {...getInputProps()} />
        <VStack spacing={4}>
          <FontAwesomeIcon
            icon={faCloudUploadAlt}
            size="3x"
            color={isDragActive ? "#4299E1" : "#A0AEC0"}
          />
          <Text
            textAlign="center"
            color={isDragActive ? "blue.400" : "gray.500"}
          >
            {isDragActive ? "松开以上传文件" : "拖拽文件到此处或点击上传"}
          </Text>
          <Text fontSize="sm" color="gray.500">
            支持的文件格式：{ALLOWED_FILE_TYPES.join(", ")}
          </Text>
          <Text fontSize="sm" color="gray.500">
            最大文件大小：{MAX_FILE_SIZE / 1024 / 1024}MB
          </Text>
        </VStack>
      </Box>

      {content && <MarkdownPreview content={content} />}
    </VStack>
  );
}
