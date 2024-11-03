import { create } from 'zustand'
import type { File } from '@/shared/types/file'

interface FileStore {
  files: File[]
  currentFile: File | null
  setFiles: (files: File[]) => void
  setCurrentFile: (file: File | null) => void
  addFile: (file: File) => void
  removeFile: (id: string) => void
  updateFile: (id: string, updates: Partial<Omit<File, 'id'>>) => void
  getFile: (id: string) => File | undefined
}

export const useFileStore = create<FileStore>((set, get) => ({
  files: [],
  currentFile: null,
  setFiles: (files) => set({ files }),
  setCurrentFile: (file) => set({ currentFile: file }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (id) => set((state) => ({ 
    files: state.files.filter(f => f.id !== id),
    currentFile: state.currentFile?.id === id ? null : state.currentFile
  })),
  updateFile: (id, updates) => set((state) => ({
    files: state.files.map(file => 
      file.id === id ? { ...file, ...updates } : file
    ),
    currentFile: state.currentFile?.id === id 
      ? { ...state.currentFile, ...updates }
      : state.currentFile
  })),
  getFile: (id) => get().files.find(file => file.id === id)
})) 