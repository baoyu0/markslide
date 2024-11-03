export interface File {
  id: string;
  name: string;
  content: string;
  type: 'markdown' | 'html' | 'ppt';
  size: number;
  lastModified: number;
  createdAt: number;
  updatedAt: number;
}

export interface FileStore {
  files: File[];
  addFile: (file: Omit<File, 'createdAt' | 'updatedAt'>) => void;
  updateFile: (id: string, updates: Partial<File>) => void;
  deleteFile: (id: string) => void;
  getFile: (id: string) => File | undefined;
}

export type FileMetadata = Omit<File, 'content'>;

export type PreviewMode = 'markdown' | 'html' | 'ppt'; 