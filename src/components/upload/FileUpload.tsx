"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import MarkdownPreview from "../preview/MarkdownPreview";

const MAX_FILE_SIZE = Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 10485760; // 10MB
const ALLOWED_FILE_TYPES = process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES?.split(
  ",",
) || [".md", ".html", ".ppt", ".pptx"];

export default function FileUpload() {
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
        bg={colorMode === "light" ? "light.surface" : "dark.surface"}
        border="2px dashed"
        borderColor={
          isDragActive
            ? "blue.400"
            : colorMode === "light"
              ? "light.border"
              : "dark.border"
        }
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
            color={
              isDragActive
                ? "#4299E1"
                : colorMode === "light"
                  ? "#A0AEC0"
                  : "#A2A7B3"
            }
          />
          <Text
            textAlign="center"
            color={
              isDragActive
                ? "blue.400"
                : colorMode === "light"
                  ? "light.text.secondary"
                  : "dark.text.secondary"
            }
          >
            {isDragActive ? "松开以上传文件" : "拖拽文件到此处或点击上传"}
          </Text>
          <Text
            fontSize="sm"
            color={
              colorMode === "light"
                ? "light.text.tertiary"
                : "dark.text.tertiary"
            }
          >
            支持的文件格式：{ALLOWED_FILE_TYPES.join(", ")}
          </Text>
          <Text
            fontSize="sm"
            color={
              colorMode === "light"
                ? "light.text.tertiary"
                : "dark.text.tertiary"
            }
          >
            最大文件大小：{MAX_FILE_SIZE / 1024 / 1024}MB
          </Text>
        </VStack>
      </Box>

      {content && <MarkdownPreview content={content} />}
    </VStack>
  );
}
