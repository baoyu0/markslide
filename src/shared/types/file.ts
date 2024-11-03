export type PreviewMode = 'markdown' | 'html' | 'ppt'

export interface FileData {
  id: string
  name: string
  content: string
  type: PreviewMode
  size: number
  lastModified: number
  createdAt: number
  updatedAt: number
  version: number
  tags: string[]
}

export interface FileMetadata {
  id: string
  name: string
  type: PreviewMode
  size: number
  lastModified: number
  createdAt?: number
  updatedAt?: number
  tags?: string[]
  version?: number
}

export interface FileStore {
  files: FileData[]
  addFile: (file: Partial<FileData> & Pick<FileData, 'id' | 'name' | 'content' | 'type' | 'size' | 'lastModified'>) => void
  deleteFile: (id: string) => void
  updateFile: (id: string, updates: Partial<FileData>) => void
  getFile: (id: string) => FileData | undefined
  searchFiles: (query: string) => FileData[]
  filterFiles: (type?: PreviewMode, tags?: string[]) => FileData[]
  sortFiles: (by: 'name' | 'date' | 'size', order: 'asc' | 'desc') => void
}