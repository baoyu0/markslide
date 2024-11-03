import { create } from 'zustand'

interface TOCState {
  activeId: string
  setActiveId: (id: string) => void
}

export const useTOCStore = create<TOCState>((set) => ({
  activeId: '',
  setActiveId: (id) => set({ activeId: id })
})) 