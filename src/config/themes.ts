export const PREVIEW_THEMES = {
  github: {
    name: "GitHub",
    styles: {
      light: {
        bg: "white",
        color: "#24292e",
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          color: "#24292e",
          borderBottom: "1px solid #eaecef",
          marginTop: "24px",
          marginBottom: "16px",
          fontWeight: "600",
          lineHeight: "1.25",
        },
        "& h1": { fontSize: "2em", borderBottomWidth: "2px" },
        "& h2": { fontSize: "1.5em", borderBottomWidth: "1px" },
        "& h3": { fontSize: "1.25em" },
        "& code": {
          backgroundColor: "#f6f8fa",
          color: "#24292e",
          padding: "0.2em 0.4em",
          borderRadius: "3px",
          fontSize: "85%",
          fontFamily: "var(--font-geist-mono)",
        },
        "& pre": {
          backgroundColor: "#f6f8fa",
          padding: "16px",
          overflow: "auto",
          fontSize: "85%",
          lineHeight: "1.45",
          borderRadius: "6px",
        },
      },
      dark: {
        bg: "#0d1117",
        color: "#c9d1d9",
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          color: "#c9d1d9",
          borderBottom: "1px solid #21262d",
          marginTop: "24px",
          marginBottom: "16px",
          fontWeight: "600",
          lineHeight: "1.25",
        },
        "& code": {
          backgroundColor: "#161b22",
          color: "#c9d1d9",
          padding: "0.2em 0.4em",
          borderRadius: "3px",
          fontSize: "85%",
        },
        "& pre": {
          backgroundColor: "#161b22",
          padding: "16px",
          overflow: "auto",
          fontSize: "85%",
          lineHeight: "1.45",
          borderRadius: "6px",
        },
      },
    },
  },
  notion: {
    name: "Notion",
    styles: {
      light: {
        bg: "#ffffff",
        color: "#37352f",
        padding: "2rem 4rem",
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          color: "#37352f",
          marginTop: "2em",
          marginBottom: "1em",
          fontWeight: "700",
          lineHeight: "1.3",
        },
        "& h1": { fontSize: "2.4em" },
        "& h2": { fontSize: "1.8em" },
        "& h3": { fontSize: "1.4em" },
        "& p": {
          marginBottom: "1.5em",
          lineHeight: "1.7",
        },
        "& code": {
          backgroundColor: "#f7f6f3",
          color: "#eb5757",
          padding: "0.2em 0.4em",
          borderRadius: "3px",
          fontSize: "85%",
        },
        "& pre": {
          backgroundColor: "#f7f6f3",
          padding: "1.5em",
          overflow: "auto",
          fontSize: "85%",
          lineHeight: "1.45",
          borderRadius: "3px",
        },
      },
      dark: {
        bg: "#191919",
        color: "#e6e6e5",
        padding: "2rem 4rem",
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          color: "#ffffff",
          marginTop: "2em",
          marginBottom: "1em",
          fontWeight: "700",
          lineHeight: "1.3",
        },
        "& p": {
          marginBottom: "1.5em",
          lineHeight: "1.7",
        },
        "& code": {
          backgroundColor: "#2f2f2f",
          color: "#ff6b6b",
          padding: "0.2em 0.4em",
          borderRadius: "3px",
          fontSize: "85%",
        },
        "& pre": {
          backgroundColor: "#2f2f2f",
          padding: "1.5em",
          overflow: "auto",
          fontSize: "85%",
          lineHeight: "1.45",
          borderRadius: "3px",
        },
      },
    },
  },
  minimal: {
    name: "极简",
    styles: {
      light: {
        bg: "#fafafa",
        color: "#333",
        padding: "3rem",
        fontFamily: "'SF Pro Text', -apple-system, sans-serif",
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          color: "#000",
          fontWeight: "800",
          letterSpacing: "-0.03em",
          marginTop: "2.5em",
          marginBottom: "1em",
        },
        "& h1": { fontSize: "3em" },
        "& h2": { fontSize: "2.2em" },
        "& h3": { fontSize: "1.8em" },
        "& p": {
          lineHeight: "1.8",
          fontSize: "1.1em",
          marginBottom: "1.5em",
        },
        "& code": {
          backgroundColor: "#eee",
          color: "#333",
          padding: "0.2em 0.4em",
          borderRadius: "4px",
          fontSize: "0.9em",
        },
        "& pre": {
          backgroundColor: "#eee",
          padding: "1.5em",
          borderRadius: "8px",
          fontSize: "0.9em",
        },
      },
      dark: {
        bg: "#111",
        color: "#eee",
        padding: "3rem",
        fontFamily: "'SF Pro Text', -apple-system, sans-serif",
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          color: "#fff",
          fontWeight: "800",
          letterSpacing: "-0.03em",
          marginTop: "2.5em",
          marginBottom: "1em",
        },
        "& p": {
          lineHeight: "1.8",
          fontSize: "1.1em",
          marginBottom: "1.5em",
        },
        "& code": {
          backgroundColor: "#222",
          color: "#eee",
          padding: "0.2em 0.4em",
          borderRadius: "4px",
          fontSize: "0.9em",
        },
        "& pre": {
          backgroundColor: "#222",
          padding: "1.5em",
          borderRadius: "8px",
          fontSize: "0.9em",
        },
      },
    },
  },
  retro: {
    name: "复古",
    styles: {
      light: {
        bg: "#fffef5",
        color: "#433422",
        padding: "2rem",
        fontFamily: "Georgia, serif",
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          fontFamily: "'Playfair Display', serif",
          color: "#2c1810",
          borderBottom: "2px solid #d3c5a0",
          paddingBottom: "0.5em",
          marginTop: "2em",
          marginBottom: "1em",
        },
        "& h1": { fontSize: "2.8em", textAlign: "center" },
        "& h2": { fontSize: "2em" },
        "& h3": { fontSize: "1.6em" },
        "& p": {
          lineHeight: "1.9",
          fontSize: "1.1em",
          marginBottom: "1.5em",
          textAlign: "justify",
        },
        "& code": {
          backgroundColor: "#f3efe5",
          color: "#6b4423",
          padding: "0.2em 0.4em",
          borderRadius: "2px",
          fontSize: "0.9em",
          fontFamily: "'Courier Prime', monospace",
        },
        "& pre": {
          backgroundColor: "#f3efe5",
          padding: "1.5em",
          border: "1px solid #d3c5a0",
          borderRadius: "4px",
          fontSize: "0.9em",
        },
        "& blockquote": {
          borderLeft: "4px solid #d3c5a0",
          color: "#6b4423",
          fontStyle: "italic",
          margin: "2em 0",
          padding: "1em 2em",
          backgroundColor: "#f9f7f0",
        },
      },
      dark: {
        bg: "#2a2520",
        color: "#e6d5b8",
        padding: "2rem",
        fontFamily: "Georgia, serif",
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          fontFamily: "'Playfair Display', serif",
          color: "#f0e6d6",
          borderBottom: "2px solid #695d47",
          paddingBottom: "0.5em",
          marginTop: "2em",
          marginBottom: "1em",
        },
        "& p": {
          lineHeight: "1.9",
          fontSize: "1.1em",
          marginBottom: "1.5em",
          textAlign: "justify",
        },
        "& code": {
          backgroundColor: "#3a342d",
          color: "#e6d5b8",
          padding: "0.2em 0.4em",
          borderRadius: "2px",
          fontSize: "0.9em",
          fontFamily: "'Courier Prime', monospace",
        },
        "& pre": {
          backgroundColor: "#3a342d",
          padding: "1.5em",
          border: "1px solid #695d47",
          borderRadius: "4px",
          fontSize: "0.9em",
        },
        "& blockquote": {
          borderLeft: "4px solid #695d47",
          color: "#c4b59d",
          fontStyle: "italic",
          margin: "2em 0",
          padding: "1em 2em",
          backgroundColor: "#332e28",
        },
      },
    },
  },
} as const;

export type ThemeId = keyof typeof PREVIEW_THEMES;

// 创建一个主题状态管理
import { create } from "zustand";

interface ThemeState {
  currentTheme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: "github",
  setTheme: (theme) => set({ currentTheme: theme }),
}));
