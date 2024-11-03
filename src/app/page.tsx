"use client";

import { useState, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { useDropzone } from 'react-dropzone'
import {
  Container,
  VStack,
  HStack,
  Heading,
  Box,
  Link,
  IconButton,
  useColorMode,
  useToast,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  EyeIcon,
  EditIcon,
  DeleteIcon,
  DownloadIcon,
  MarkdownIcon,
  HtmlIcon,
  PptIcon,
  GithubIcon,
} from '@/components/icons'
import { useFileStore } from '@/shared/stores/fileStore'
import type { PreviewMode } from '@/shared/types/file'
import FileList from '@/components/file/FileList'
import FileFilters from '@/components/file/FileFilters'
import RenameDialog from '@/components/file/RenameDialog'
import UploadProgress from '@/components/file/UploadProgress'
import { useRouter } from 'next/navigation'
import { createFileMetadata, validateFile } from '@/shared/utils/file'
import TagsEditor from '@/components/file/TagsEditor'

export default function Home() {
  const {
    files,
    addFile,
    deleteFile,
    updateFile,
    getFile,
    searchFiles: searchFilesStore,
    filterFiles: filterFilesStore,
    sortFiles: sortFilesStore,
  } = useFileStore()
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const router = useRouter()
  const [renameFile, setRenameFile] = useState<{ id: string; name: string } | null>(null)
  const [uploadProgress, setUploadProgress] = useState<{
    fileName: string
    progress: number
  } | null>(null)

  const handleAddFile = useCallback((file: File) => {
    try {
      validateFile(file)
      
      const reader = new FileReader()
      reader.onloadstart = () => {
        setUploadProgress({
          fileName: file.name,
          progress: 0,
        })
      }
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          setUploadProgress({
            fileName: file.name,
            progress,
          })
        }
      }
      reader.onload = () => {
        const content = reader.result as string
        const metadata = createFileMetadata(file)
        
        addFile({
          ...metadata,
          id: nanoid(),
          content,
        })

        toast({
          title: "上传成功",
          status: "success",
          duration: 2000,
        })
        setUploadProgress(null)
      }
      reader.readAsText(file)
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : "上传失败",
        status: "error",
        duration: 3000,
      })
      setUploadProgress(null)
    }
  }, [addFile, toast])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "文件过大",
          description: "文件大小不能超过10MB",
          status: "error",
          duration: 3000,
        })
        return
      }
      handleAddFile(file)
    })
  }, [handleAddFile, toast])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md'],
      'text/html': ['.html'],
      'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
    },
  })

  const handlePreview = (mode: PreviewMode, fileId: string) => {
    window.open(`/${mode}-preview/${fileId}`, '_blank')
  }

  const handleEdit = (fileId: string) => {
    router.push(`/edit/${fileId}`)
  }

  const handleDelete = (fileId: string) => {
    if (window.confirm('确定要删除这个文件吗？')) {
      deleteFile(fileId)
      toast({
        title: "删除成功",
        status: "success",
        duration: 2000,
      })
    }
  }

  const handleExport = (fileId: string, format: PreviewMode) => {
    // TODO: 实现导出功能
    toast({
      title: "导出功能开发中",
      status: "info",
      duration: 2000,
    })
  }

  const handleRename = (fileId: string, newName: string) => {
    updateFile(fileId, { 
      name: newName,
      updatedAt: Date.now()
    })
    toast({
      title: "重命名成功",
      status: "success",
      duration: 2000,
    })
  }

  const handleTagsChange = (fileId: string, newTags: string[]) => {
    updateFile(fileId, { 
      tags: newTags,
      updatedAt: Date.now()
    })
    toast({
      title: "标签更新成功",
      status: "success",
      duration: 2000,
    })
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Heading size="xl">Markslide</Heading>
          <HStack spacing={4}>
            <FileFilters
              onSearch={searchFilesStore}
              onFilter={filterFilesStore}
              onSort={sortFilesStore}
            />
            <Link
              href="https://github.com/yourusername/markslide"
              isExternal
              _hover={{ transform: 'scale(1.1)' }}
            >
              <IconButton
                aria-label="GitHub repository"
                icon={<GithubIcon />}
                variant="ghost"
              />
            </Link>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            />
          </HStack>
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
            <Box>拖放文件到这里 ...</Box>
          ) : (
            <Box>拖放文件到这里，或点击选择文件</Box>
          )}
        </Box>

        <FileList
          files={files}
          onPreview={handlePreview}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={handleExport}
          onTagsEdit={(fileId) => {
            const file = getFile(fileId)
            if (file) {
              handleTagsChange(file.id, file.tags)
            }
          }}
        />
      </VStack>

      {renameFile && (
        <RenameDialog
          isOpen={!!renameFile}
          onClose={() => setRenameFile(null)}
          onRename={(newName) => handleRename(renameFile.id, newName)}
          currentName={renameFile.name}
        />
      )}

      {uploadProgress && (
        <UploadProgress
          isOpen={!!uploadProgress}
          fileName={uploadProgress.fileName}
          progress={uploadProgress.progress}
        />
      )}
    </Container>
  )
}
