import type { File } from '../types/file'

export const createFile = (file: Omit<File, 'createdAt' | 'updatedAt'>): File => ({
  ...file,
  createdAt: Date.now(),
  updatedAt: Date.now(),
})

export const updateFile = (file: File, updates: Partial<File>): File => ({
  ...file,
  ...updates,
  updatedAt: Date.now(),
}) 