export interface PPTThemeStyles {
  backgroundColor: string;
  color: string;
  headingColor: string;
  linkColor: string;
  fontFamily: string;
  fontSize: {
    h1: string;
    h2: string;
    h3: string;
    text: string;
    code: string;
  };
}

export const PPT_THEMES = {
  modern: {
    name: "现代简约",
    styles: {
      backgroundColor: "#ffffff",
      color: "#2d3748",
      headingColor: "#1a365d",
      linkColor: "#3182ce",
      fontFamily: "'Microsoft YaHei', 'SimSun', sans-serif",
      fontSize: {
        h1: "2.2em",
        h2: "1.8em",
        h3: "1.5em",
        text: "1.2em",
        code: "0.9em"
      }
    }
  },
  dark: {
    name: "深色专业",
    styles: {
      backgroundColor: "#1a202c",
      color: "#e2e8f0",
      headingColor: "#90cdf4",
      linkColor: "#63b3ed",
      fontFamily: "'Microsoft YaHei', 'SimSun', sans-serif",
      fontSize: {
        h1: "2.2em",
        h2: "1.8em",
        h3: "1.5em",
        text: "1.2em",
        code: "0.9em"
      }
    }
  },
  tech: {
    name: "科技风格",
    styles: {
      backgroundColor: "#000000",
      color: "#00ff00",
      headingColor: "#00ffff",
      linkColor: "#00ff00",
      fontFamily: "'Fira Code', monospace",
      fontSize: {
        h1: "2.4em",
        h2: "2em",
        h3: "1.6em",
        text: "1.2em",
        code: "1em"
      }
    }
  },
  elegant: {
    name: "优雅经典",
    styles: {
      backgroundColor: "#f8f9fa",
      color: "#343a40",
      headingColor: "#495057",
      linkColor: "#495057",
      fontFamily: "'Times New Roman', 'SimSun', serif",
      fontSize: {
        h1: "2.5em",
        h2: "2em",
        h3: "1.6em",
        text: "1.3em",
        code: "1em"
      }
    }
  },
  nature: {
    name: "自然清新",
    styles: {
      backgroundColor: "#f1f8e9",
      color: "#33691e",
      headingColor: "#1b5e20",
      linkColor: "#2e7d32",
      fontFamily: "'Microsoft YaHei', 'SimSun', sans-serif",
      fontSize: {
        h1: "2.3em",
        h2: "1.9em",
        h3: "1.5em",
        text: "1.2em",
        code: "0.9em"
      }
    }
  },
  business: {
    name: "商务专业",
    styles: {
      backgroundColor: "#eceff1",
      color: "#263238",
      headingColor: "#0d47a1",
      linkColor: "#1565c0",
      fontFamily: "'Arial', 'Microsoft YaHei', sans-serif",
      fontSize: {
        h1: "2.2em",
        h2: "1.8em",
        h3: "1.5em",
        text: "1.2em",
        code: "0.9em"
      }
    }
  }
} as const;

export type PPTThemeName = keyof typeof PPT_THEMES;

export const TRANSITIONS = [
  { value: 'none', label: '无过渡' },
  { value: 'fade', label: '淡入淡出' },
  { value: 'slide', label: '滑动' },
  { value: 'convex', label: '凸出' },
  { value: 'concave', label: '凹入' },
  { value: 'zoom', label: '缩放' },
] as const;

export type Transition = typeof TRANSITIONS[number]['value'];