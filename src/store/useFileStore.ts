import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FileItem {
  id: string;
  name: string;
  content: string;
  type: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

interface FileState {
  files: FileItem[];
  addFile: (file: FileItem) => void;
  removeFile: (id: string) => void;
  updateFile: (id: string, updates: Partial<FileItem>) => void;
  getFile: (id: string) => FileItem | undefined;
}

export const useFileStore = create<FileState>()(
  persist(
    (set, get) => ({
      files: [],
      addFile: (file) =>
        set((state) => ({
          files: [...state.files, file],
        })),
      removeFile: (id) =>
        set((state) => ({
          files: state.files.filter((f) => f.id !== id),
        })),
      updateFile: (id, updates) =>
        set((state) => ({
          files: state.files.map((f) =>
            f.id === id
              ? { ...f, ...updates, updatedAt: new Date().toISOString() }
              : f,
          ),
        })),
      getFile: (id) => get().files.find((f) => f.id === id),
    }),
    {
      name: "file-storage",
      skipHydration: true,
    },
  ),
);
