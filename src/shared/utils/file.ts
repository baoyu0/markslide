import type { FileData, FileMetadata } from '../types/file'

export const createFileMetadata = (file: File): FileMetadata => ({
  id: '',  // 由调用者设置
  name: file.name,
  type: getFileType(file),
  size: file.size,
  lastModified: file.lastModified,
  tags: [],
  version: 1,
})

export const getFileType = (file: File) => {
  if (file.name.endsWith('.md')) return 'markdown'
  if (file.name.endsWith('.html')) return 'html'
  if (file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) return 'ppt'
  throw new Error('Unsupported file type')
}

export const validateFile = (file: File) => {
  // 检查文件大小
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File size exceeds 10MB limit')
  }

  // 检查文件类型
  try {
    getFileType(file)
  } catch (error) {
    throw new Error('Unsupported file type')
  }
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString()
} 