"use client";

import { Box, Text, VStack, useColorMode, useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useFileStore } from "@/store/useFileStore";
import { v4 as uuidv4 } from "uuid";

const MAX_FILE_SIZE = Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 10485760; // 10MB
const ALLOWED_FILE_TYPES = [".md", ".html", ".ppt", ".pptx"];

export default function FileUpload() {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const addFile = useFileStore((state) => state.addFile);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          const content = await file.text();
          const fileType = file.name.split(".").pop()?.toLowerCase() || "";

          const newFile = {
            id: uuidv4(),
            name: file.name,
            content,
            type: fileType,
            size: file.size,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          addFile(newFile);

          toast({
            title: "文件上传成功",
            description: `${file.name} 已成功上传`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } catch (err) {
          console.error("文件读取错误:", err);
          toast({
            title: "文件上传失败",
            description: "读取文件时发生错误",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    },
    [addFile, toast],
  );

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
    multiple: false,
  });

  return (
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
        <Text textAlign="center" color={isDragActive ? "blue.400" : "gray.500"}>
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
  );
}
