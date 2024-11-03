import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FileStore, FileData, PreviewMode } from '../types/file';

export const useFileStore = create<FileStore>()(
  persist(
    (set, get) => ({
      files: [],
      addFile: (file) => set((state) => ({
        files: [...state.files, {
          ...file,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          version: 1,
          tags: []
        } as FileData]
      })),
      deleteFile: (id) => set((state) => ({
        files: state.files.filter((f) => f.id !== id)
      })),
      updateFile: (id, updates) => set((state) => ({
        files: state.files.map((f) =>
          f.id === id ? {
            ...f,
            ...updates,
            updatedAt: Date.now(),
            version: (f.version || 1) + 1
          } : f
        )
      })),
      getFile: (id) => get().files.find((f) => f.id === id),
      searchFiles: (query) => {
        const files = get().files;
        const lowerQuery = query.toLowerCase();
        return files.filter(f => 
          f.name.toLowerCase().includes(lowerQuery) ||
          f.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
      },
      filterFiles: (type, tags) => {
        let files = get().files;
        if (type) {
          files = files.filter(f => f.type === type);
        }
        if (tags?.length) {
          files = files.filter(f => 
            tags.every(tag => f.tags.includes(tag))
          );
        }
        return files;
      },
      sortFiles: (by, order) => set((state) => {
        const sorted = [...state.files].sort((a, b) => {
          switch (by) {
            case 'name':
              return order === 'asc' 
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
            case 'date':
              return order === 'asc'
                ? a.lastModified - b.lastModified
                : b.lastModified - a.lastModified;
            case 'size':
              return order === 'asc'
                ? a.size - b.size
                : b.size - a.size;
            default:
              return 0;
          }
        });
        return { files: sorted };
      }),
    }),
    {
      name: 'file-storage',
      version: 1,
    }
  )
);