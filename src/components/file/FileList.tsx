"use client";

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  ButtonGroup,
  Tooltip,
  useColorMode,
  Skeleton,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faDownload,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useFileStore } from "@/store/useFileStore";
import { formatFileSize, formatDate } from "@/utils/format";
import { useCallback } from "react";
import { usePreviewStore } from "@/store/usePreviewStore";

export default function FileList() {
  const { colorMode } = useColorMode();
  const store = useFileStore();
  const { setCurrentFile, setPreviewType } = usePreviewStore();

  // 处理函数
  const handlePreview = useCallback((fileId: string, type: "markdown" | "html" | "ppt") => {
    setCurrentFile(fileId);
    setPreviewType(type);
    window.open(`/preview?fileId=${fileId}&type=${type}`, "_blank");
  }, [setCurrentFile, setPreviewType]);

  const handleEdit = useCallback((fileId: string) => {
    console.log("编辑文件:", fileId);
  }, []);

  const handleDownload = useCallback((fileId: string) => {
    console.log("下载文件:", fileId);
  }, []);

  const handleDelete = useCallback(async (fileId: string) => {
    try {
      await store.removeFile(fileId);
    } catch (error) {
      console.error("删除文件失败:", error);
    }
  }, [store]);

  // 显示加载状态
  if (!store.isInitialized) {
    return (
      <Box>
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} height="50px" mb={2} />
        ))}
      </Box>
    );
  }

  // 显示空状态
  if (!store.files || store.files.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">暂无文件</Text>
      </Box>
    );
  }

  console.log("Rendering files:", store.files);

  // 渲染文件列表
  return (
    <Box overflowX="auto" bg={colorMode === "light" ? "white" : "gray.800"} borderRadius="lg" p={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>文件名</Th>
            <Th>大小</Th>
            <Th>上传时间</Th>
            <Th>预览</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {store.files.map((file) => (
            <Tr
              key={file.id}
              _hover={{
                bg: colorMode === "light" ? "gray.50" : "gray.700",
              }}
            >
              <Td>{file.name}</Td>
              <Td>{formatFileSize(file.size)}</Td>
              <Td>{formatDate(file.createdAt)}</Td>
              <Td>
                <ButtonGroup size="sm" variant="ghost" spacing={2}>
                  <Tooltip label="Markdown 预览">
                    <IconButton
                      aria-label="Markdown preview"
                      icon={<FontAwesomeIcon icon={faEye} />}
                      onClick={() => handlePreview(file.id, "markdown")}
                    />
                  </Tooltip>
                  <Tooltip label="HTML 预览">
                    <IconButton
                      aria-label="HTML preview"
                      icon={<FontAwesomeIcon icon={faEye} />}
                      onClick={() => handlePreview(file.id, "html")}
                    />
                  </Tooltip>
                  <Tooltip label="PPT 预览">
                    <IconButton
                      aria-label="PPT preview"
                      icon={<FontAwesomeIcon icon={faEye} />}
                      onClick={() => handlePreview(file.id, "ppt")}
                    />
                  </Tooltip>
                </ButtonGroup>
              </Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FontAwesomeIcon icon={faEllipsisV} />}
                    variant="ghost"
                    size="sm"
                  />
                  <MenuList>
                    <MenuItem
                      icon={<FontAwesomeIcon icon={faEdit} />}
                      onClick={() => handleEdit(file.id)}
                    >
                      编辑
                    </MenuItem>
                    <MenuItem
                      icon={<FontAwesomeIcon icon={faDownload} />}
                      onClick={() => handleDownload(file.id)}
                    >
                      下载
                    </MenuItem>
                    <MenuItem
                      icon={<FontAwesomeIcon icon={faTrash} />}
                      onClick={() => handleDelete(file.id)}
                      color="red.500"
                    >
                      删除
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
