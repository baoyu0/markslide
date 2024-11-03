import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { File, FileStore } from '../types/file';

export const useFileStore = create<FileStore>()(
  persist(
    (set, get) => ({
      files: [],
      
      addFile: (file) => set((state) => ({
        files: [...state.files, {
          ...file,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }],
      })),

      updateFile: (id, updates) => set((state) => ({
        files: state.files.map((file) =>
          file.id === id
            ? { ...file, ...updates, updatedAt: Date.now() }
            : file
        ),
      })),

      deleteFile: (id) => set((state) => ({
        files: state.files.filter((file) => file.id !== id),
      })),

      getFile: (id) => get().files.find((file) => file.id === id),
    }),
    {
      name: 'file-storage',
      version: 1,
    }
  )
);