"use client";

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faEdit,
  faDownload,
  faFileAlt,
  faCode,
  faDesktop,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { useFileStore } from "@/store/useFileStore";
import { usePreviewStore } from "@/store/usePreviewStore";
import { formatFileSize, formatDate } from "@/utils/format";

export default function FileList() {
  const files = useFileStore((state) => state.files);
  const removeFile = useFileStore((state) => state.removeFile);
  const { setCurrentFile, setPreviewType } = usePreviewStore();

  const handlePreview = (fileId: string, type: "markdown" | "html" | "ppt") => {
    setCurrentFile(fileId);
    setPreviewType(type);
    window.open(`/preview?fileId=${fileId}&type=${type}`, "_blank");
  };

  const handleEdit = (fileId: string) => {
    console.log("编辑文件:", fileId);
    // TODO: 实现编辑功能
  };

  const handleDownload = (fileId: string) => {
    console.log("下载文件:", fileId);
    // TODO: 实现下载功能
  };

  if (files.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">暂无文件</Text>
      </Box>
    );
  }

  return (
    <Box overflowX="auto">
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
          {files.map((file) => (
            <Tr key={file.id}>
              <Td>{file.name}</Td>
              <Td>{formatFileSize(file.size)}</Td>
              <Td>{formatDate(file.createdAt)}</Td>
              <Td>
                <Menu>
                  <Tooltip label="选择预览模式">
                    <MenuButton
                      as={IconButton}
                      icon={<FontAwesomeIcon icon={faEye} />}
                      variant="ghost"
                      size="sm"
                    />
                  </Tooltip>
                  <MenuList>
                    <MenuItem
                      icon={<FontAwesomeIcon icon={faFileAlt} />}
                      onClick={() => handlePreview(file.id, "markdown")}
                    >
                      Markdown 预览
                    </MenuItem>
                    <MenuItem
                      icon={<FontAwesomeIcon icon={faCode} />}
                      onClick={() => handlePreview(file.id, "html")}
                    >
                      HTML 预览
                    </MenuItem>
                    <MenuItem
                      icon={<FontAwesomeIcon icon={faDesktop} />}
                      onClick={() => handlePreview(file.id, "ppt")}
                    >
                      PPT 预览
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
              <Td>
                <Menu>
                  <Tooltip label="更多操作">
                    <MenuButton
                      as={IconButton}
                      icon={<FontAwesomeIcon icon={faEllipsisV} />}
                      variant="ghost"
                      size="sm"
                    />
                  </Tooltip>
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
                      onClick={() => removeFile(file.id)}
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
