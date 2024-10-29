import { create } from "zustand";

interface PreviewState {
  currentFileId: string | null;
  previewType: "markdown" | "html" | "ppt";
  setCurrentFile: (fileId: string | null) => void;
  setPreviewType: (type: "markdown" | "html" | "ppt") => void;
}

export const usePreviewStore = create<PreviewState>((set) => ({
  currentFileId: null,
  previewType: "markdown",
  setCurrentFile: (fileId) => set({ currentFileId: fileId }),
  setPreviewType: (type) => set({ previewType: type }),
}));
