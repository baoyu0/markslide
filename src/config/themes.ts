export const PREVIEW_THEMES = {
  github: {
    name: "GitHub",
    light: {
      background: "#ffffff",
      text: "#24292e",
      code: "github",
    },
    dark: {
      background: "#0d1117",
      text: "#c9d1d9",
      code: "github-dark",
    },
  },
  notion: {
    name: "Notion",
    light: {
      background: "#ffffff",
      text: "#37352f",
      code: "github",
    },
    dark: {
      background: "#191919",
      text: "#e6e6e5",
      code: "monokai",
    },
  },
  dracula: {
    name: "Dracula",
    light: {
      background: "#f8f8f2",
      text: "#282a36",
      code: "vs",
    },
    dark: {
      background: "#282a36",
      text: "#f8f8f2",
      code: "dracula",
    },
  },
} as const;

export type ThemeId = keyof typeof PREVIEW_THEMES; 