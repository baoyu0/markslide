'use client';

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
  useColorModeValue,
  Text
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEllipsisVertical, 
  faEye, 
  faDownload, 
  faPen, 
  faTrash 
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface FileItem {
  id: string;
  name: string;
  type: 'markdown' | 'html' | 'ppt';
  size: number;
  lastModified: Date;
  path: string;
}

const DEMO_FILES: FileItem[] = [
  {
    id: '1',
    name: 'Markdown 示例',
    type: 'markdown',
    size: 2048,
    lastModified: new Date('2024-03-19'),
    path: '/examples/markdown/demo.md'
  },
  {
    id: '2',
    name: 'HTML 示例',
    type: 'html',
    size: 4096,
    lastModified: new Date('2024-03-19'),
    path: '/examples/html/demo.html'
  },
  {
    id: '3',
    name: 'PPT 示例',
    type: 'ppt',
    size: 8192,
    lastModified: new Date('2024-03-19'),
    path: '/examples/ppt/demo.html'
  }
];

export default function FileList() {
  const [files] = useState<FileItem[]>(DEMO_FILES);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handlePreview = (file: FileItem) => {
    // TODO: 实现预览功能
    console.log('Preview:', file);
  };

  const handleDownload = (file: FileItem) => {
    // TODO: 实现下载功能
    console.log('Download:', file);
  };

  const handleEdit = (file: FileItem) => {
    // TODO: 实现编辑功能
    console.log('Edit:', file);
  };

  const handleDelete = (file: FileItem) => {
    // TODO: 实现删除功能
    console.log('Delete:', file);
  };

  return (
    <Box 
      bg={bgColor} 
      borderRadius="lg" 
      border="1px" 
      borderColor={borderColor}
      overflow="hidden"
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>文件名</Th>
            <Th>类型</Th>
            <Th>大小</Th>
            <Th>修改时间</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {files.map((file) => (
            <Tr key={file.id}>
              <Td>
                <Text fontWeight="medium">{file.name}</Text>
              </Td>
              <Td>{file.type.toUpperCase()}</Td>
              <Td>{formatFileSize(file.size)}</Td>
              <Td>{formatDate(file.lastModified)}</Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
                    variant="ghost"
                    size="sm"
                  />
                  <MenuList>
                    <MenuItem 
                      icon={<FontAwesomeIcon icon={faEye} />}
                      onClick={() => handlePreview(file)}
                    >
                      预览
                    </MenuItem>
                    <MenuItem 
                      icon={<FontAwesomeIcon icon={faDownload} />}
                      onClick={() => handleDownload(file)}
                    >
                      下载
                    </MenuItem>
                    <MenuItem 
                      icon={<FontAwesomeIcon icon={faPen} />}
                      onClick={() => handleEdit(file)}
                    >
                      编辑
                    </MenuItem>
                    <MenuItem 
                      icon={<FontAwesomeIcon icon={faTrash} />}
                      onClick={() => handleDelete(file)}
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