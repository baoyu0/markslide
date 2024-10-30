import { create } from "zustand";
import { PPT_THEMES } from "@/config/preview-themes";

interface PPTState {
  currentTheme: keyof typeof PPT_THEMES;
  isFullscreen: boolean;
  currentSlide: number;
  totalSlides: number;
  isOverview: boolean;
  transition: "slide" | "fade" | "convex" | "concave" | "zoom";

  // Actions
  setTheme: (theme: keyof typeof PPT_THEMES) => void;
  setFullscreen: (isFullscreen: boolean) => void;
  setCurrentSlide: (slide: number) => void;
  setTotalSlides: (total: number) => void;
  setOverview: (isOverview: boolean) => void;
  setTransition: (
    transition: "slide" | "fade" | "convex" | "concave" | "zoom",
  ) => void;
}

export const usePPTStore = create<PPTState>((set) => ({
  currentTheme: "black",
  isFullscreen: false,
  currentSlide: 0,
  totalSlides: 0,
  isOverview: false,
  transition: "slide",

  setTheme: (theme) => set({ currentTheme: theme }),
  setFullscreen: (isFullscreen) => set({ isFullscreen }),
  setCurrentSlide: (slide) => set({ currentSlide: slide }),
  setTotalSlides: (total) => set({ totalSlides: total }),
  setOverview: (isOverview) => set({ isOverview }),
  setTransition: (transition) => set({ transition }),
}));
