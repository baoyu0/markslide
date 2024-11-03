'use client'

import {
  VStack,
  Box,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
  Tag,
  TagLabel,
  useColorMode,
} from '@chakra-ui/react'
import {
  EyeIcon,
  EditIcon,
  DeleteIcon,
  DownloadIcon,
  MarkdownIcon,
  HtmlIcon,
  PptIcon,
  TagIcon,
} from '@/components/icons'
import type { FileData, PreviewMode } from '@/shared/types/file'
import { formatFileSize, formatDate } from '@/shared/utils/file'

interface FileListProps {
  files: FileData[]
  onPreview: (mode: PreviewMode, fileId: string) => void
  onEdit: (fileId: string) => void
  onDelete: (fileId: string) => void
  onExport: (fileId: string, format: PreviewMode) => void
  onTagsEdit: (fileId: string) => void
}

export default function FileList({
  files,
  onPreview,
  onEdit,
  onDelete,
  onExport,
  onTagsEdit,
}: FileListProps) {
  const { colorMode } = useColorMode()

  if (!files?.length) {
    return (
      <Box textAlign="center" py={8} color="gray.500">
        暂无文件
      </Box>
    )
  }

  return (
    <VStack spacing={4} align="stretch" w="full">
      {files.map((file) => (
        <Box
          key={file.id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          bg={colorMode === 'light' ? 'white' : 'gray.700'}
          shadow="sm"
          transition="all 0.2s"
          _hover={{
            shadow: 'md',
            transform: 'translateY(-2px)',
          }}
        >
          <HStack justify="space-between">
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold" fontSize="lg">
                {file.name}
              </Text>
              <HStack spacing={4} color="gray.500" fontSize="sm">
                <Text>{formatFileSize(file.size)}</Text>
                <Text>修改于 {formatDate(file.updatedAt)}</Text>
                <Text>版本 {file.version}</Text>
              </HStack>
              {file.tags?.length > 0 && (
                <HStack spacing={2}>
                  {file.tags.map((tag) => (
                    <Tag key={tag} size="sm" colorScheme="blue">
                      <TagLabel>{tag}</TagLabel>
                    </Tag>
                  ))}
                </HStack>
              )}
            </VStack>

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
                    onClick={() => onPreview('markdown', file.id)}
                  >
                    Markdown 预览
                  </MenuItem>
                  <MenuItem
                    icon={<HtmlIcon />}
                    onClick={() => onPreview('html', file.id)}
                  >
                    HTML 预览
                  </MenuItem>
                  <MenuItem
                    icon={<PptIcon />}
                    onClick={() => onPreview('ppt', file.id)}
                  >
                    PPT 预览
                  </MenuItem>
                </MenuList>
              </Menu>

              <Tooltip label="编辑">
                <IconButton
                  aria-label="Edit file"
                  icon={<EditIcon />}
                  variant="ghost"
                  onClick={() => onEdit(file.id)}
                />
              </Tooltip>

              <Menu>
                <Tooltip label="导出">
                  <MenuButton
                    as={IconButton}
                    aria-label="Export options"
                    icon={<DownloadIcon />}
                    variant="ghost"
                  />
                </Tooltip>
                <MenuList>
                  <MenuItem onClick={() => onExport(file.id, 'markdown')}>
                    导出为 Markdown
                  </MenuItem>
                  <MenuItem onClick={() => onExport(file.id, 'html')}>
                    导出为 HTML
                  </MenuItem>
                  <MenuItem onClick={() => onExport(file.id, 'ppt')}>
                    导出为 PPT
                  </MenuItem>
                </MenuList>
              </Menu>

              <Tooltip label="编辑标签">
                <IconButton
                  aria-label="Edit tags"
                  icon={<TagIcon />}
                  variant="ghost"
                  onClick={() => onTagsEdit(file.id)}
                />
              </Tooltip>

              <Tooltip label="删除">
                <IconButton
                  aria-label="Delete file"
                  icon={<DeleteIcon />}
                  variant="ghost"
                  onClick={() => onDelete(file.id)}
                />
              </Tooltip>
            </HStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  )
} 