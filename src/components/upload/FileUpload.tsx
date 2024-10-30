"use client";

import {
  Box,
  Text,
  VStack,
  useColorMode,
  useToast,
  Progress,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faFileAlt,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { useFileStore } from "@/store/useFileStore";
import { v4 as uuidv4 } from "uuid";
import { UPLOAD_CONFIG } from "@/config/upload";

export default function FileUpload() {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const addFile = useFileStore((state) => state.addFile);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (file: File) => {
    // 检查文件类型
    const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    const allowedExtensions = Object.values(UPLOAD_CONFIG.allowedTypes)
      .flatMap((type) => type.extensions);
    
    if (!allowedExtensions.includes(extension)) {
      throw new Error(UPLOAD_CONFIG.errorMessages.invalidType);
    }

    // 检查文件大小
    const fileType = Object.entries(UPLOAD_CONFIG.allowedTypes).find(([_, type]) =>
      type.extensions.includes(extension)
    )?.[0];

    if (fileType && file.size > UPLOAD_CONFIG.allowedTypes[fileType].maxSize) {
      throw new Error(
        `${UPLOAD_CONFIG.errorMessages.tooLarge} (最大 ${
          UPLOAD_CONFIG.allowedTypes[fileType].maxSize / 1024 / 1024
        }MB)`
      );
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      try {
        // 验证文件
        validateFile(file);

        setIsUploading(true);
        setUploadProgress(0);

        // 模拟上传进度
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 100);

        // 读取文件内容
        const content = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error(UPLOAD_CONFIG.errorMessages.readError));
          reader.readAsText(file);
        });

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

        await addFile(newFile);
        setUploadProgress(100);

        toast({
          title: "上传成功",
          description: `${file.name} 已成功上传`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast({
          title: "上传失败",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [addFile, toast],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    maxSize: UPLOAD_CONFIG.maxSize,
    accept: Object.values(UPLOAD_CONFIG.allowedTypes).reduce(
      (acc, { mimeTypes, extensions }) => ({
        ...acc,
        [mimeTypes[0]]: extensions,
      }),
      {},
    ),
    multiple: false,
  });

  const getBorderColor = () => {
    if (isDragReject) return "red.400";
    if (isDragActive) return "blue.400";
    return colorMode === "light" ? "light.border" : "dark.border";
  };

  return (
    <Box>
      <Box
        {...getRootProps()}
        p={10}
        bg={colorMode === "light" ? "light.surface" : "dark.surface"}
        border="2px dashed"
        borderColor={getBorderColor()}
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
            icon={isDragReject ? faExclamationTriangle : faCloudUploadAlt}
            size="3x"
            color={isDragReject ? "#F56565" : isDragActive ? "#4299E1" : "#A0AEC0"}
          />
          <Text
            textAlign="center"
            color={isDragReject ? "red.500" : isDragActive ? "blue.400" : "gray.500"}
          >
            {isDragReject
              ? "不支持的文件类型"
              : isDragActive
              ? "松开以上传文件"
              : "拖拽文件到此处或点击上传"}
          </Text>
          <Text fontSize="sm" color="gray.500">
            支持的文件格式：
            {Object.values(UPLOAD_CONFIG.allowedTypes)
              .flatMap((type) => type.extensions)
              .join(", ")}
          </Text>
          <Text fontSize="sm" color="gray.500">
            单个文件最大：
            {UPLOAD_CONFIG.maxSize / 1024 / 1024}MB
          </Text>
        </VStack>
      </Box>

      {isUploading && (
        <Box mt={4}>
          <Progress
            value={uploadProgress}
            size="sm"
            colorScheme="blue"
            hasStripe
            isAnimated
          />
          <Text mt={2} fontSize="sm" color="gray.500" textAlign="center">
            正在上传... {uploadProgress}%
          </Text>
        </Box>
      )}
    </Box>
  );
}
