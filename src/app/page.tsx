"use client";

import { 
  Container, 
  VStack, 
  HStack, 
  Heading, 
  IconButton, 
  Box, 
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Button
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';
import { useFileStore } from '@/shared/stores/fileStore';
import { usePreview } from '@/shared/utils/preview';
import { 
  EyeIcon, 
  DeleteIcon, 
  MarkdownIcon, 
  HtmlIcon, 
  PptIcon 
} from '@/components/icons';
import { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { files, addFile, deleteFile } = useFileStore();
  const { openPreview } = usePreview();
  const router = useRouter();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      try {
        const content = await file.text();
        const fileType = file.name.endsWith('.md') 
          ? 'markdown' 
          : file.name.endsWith('.html') 
            ? 'html' 
            : 'ppt';

        addFile({
          id: nanoid(),
          name: file.name,
          content,
          type: fileType,
          size: file.size,
          lastModified: file.lastModified,
        });
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  }, [addFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md'],
      'text/html': ['.html', '.htm'],
      'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleEdit = (fileId: string) => {
    router.push(`/edit/${fileId}`);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack w="full" justify="space-between">
          <Heading size="xl">Markslide</Heading>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </HStack>

        <Box
          {...getRootProps()}
          p={10}
          border="2px dashed"
          borderColor={isDragActive ? 'blue.500' : 'gray.200'}
          borderRadius="lg"
          textAlign="center"
          cursor="pointer"
          transition="all 0.2s"
          _hover={{
            borderColor: 'blue.500',
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text>拖放文件到这里 ...</Text>
          ) : (
            <Text>拖放文件到这里，或点击选择文件</Text>
          )}
        </Box>

        <VStack spacing={4} align="stretch">
          {files.map((file) => (
            <Box
              key={file.id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bg={colorMode === 'light' ? 'white' : 'gray.700'}
              shadow="sm"
            >
              <Box flex={1}>
                <Heading size="sm">{file.name}</Heading>
                <Text fontSize="sm" color="gray.500">
                  {new Date(file.createdAt).toLocaleString()}
                </Text>
              </Box>
              
              <HStack spacing={2}>
                <Menu>
                  <Tooltip label="预览">
                    <MenuButton
                      as={IconButton}
                      aria-label="Preview options"
                      icon={<EyeIcon />}
                      variant="ghost"
                    />
                  </Tooltip>
                  <MenuList>
                    <MenuItem 
                      icon={<MarkdownIcon />}
                      onClick={() => openPreview('markdown', file.id)}
                    >
                      Markdown 预览
                    </MenuItem>
                    <MenuItem 
                      icon={<HtmlIcon />}
                      onClick={() => openPreview('html', file.id)}
                    >
                      HTML 预览
                    </MenuItem>
                    <MenuItem 
                      icon={<PptIcon />}
                      onClick={() => openPreview('ppt', file.id)}
                    >
                      PPT 预览
                    </MenuItem>
                  </MenuList>
                </Menu>

                <Tooltip label="编辑">
                  <IconButton
                    aria-label="Edit file"
                    icon={<EditIcon />}
                    onClick={() => handleEdit(file.id)}
                    variant="ghost"
                  />
                </Tooltip>

                <Tooltip label="删除">
                  <IconButton
                    aria-label="Delete file"
                    icon={<DeleteIcon />}
                    onClick={() => deleteFile(file.id)}
                    variant="ghost"
                    colorScheme="red"
                  />
                </Tooltip>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
}
