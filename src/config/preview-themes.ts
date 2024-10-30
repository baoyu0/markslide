import type { SyntaxHighlighterProps } from "react-syntax-highlighter";
import * as themes from "react-syntax-highlighter/dist/cjs/styles/prism";

// 定义代码样式接口
interface CodeStyle {
  inline: {
    background: string;
    color: string;
    padding: string;
    borderRadius: string;
    fontSize: string;
    fontFamily: string;
    fontWeight?: string;
  };
  block: {
    background: string;
    padding: string;
    borderRadius: string;
    fontSize: string;
    lineHeight: string;
    fontFamily: string;
    margin?: string;
    overflowX?: string;
  };
  background?: string;
  text?: string;
}

// 定义标题样式接口
interface HeadingStyle {
  fontSize: string;
  fontWeight: string;
  margin: string;
  letterSpacing?: string;
  paddingBottom?: string;
  borderBottom?: string;
  color?: string;
}

// 定义主题样式接口
export interface ThemeStyle {
  background: string;
  text: string;
  heading: string;
  link: string;
  code?: CodeStyle;
  font?: {
    base: string;
    code: string;
    size: string;
    lineHeight: string;
    weight?: string;
    letterSpacing?: string;
    heading?: string;
  };
  headings?: {
    h1?: HeadingStyle;
    h2?: HeadingStyle;
    h3?: HeadingStyle;
    h4?: HeadingStyle;
    h5?: HeadingStyle;
    h6?: HeadingStyle;
  };
  spacing?: {
    paragraph: string;
    list: string;
    table: string;
  };
  links?: {
    color?: string;
    textDecoration?: string;
    hover?: {
      color?: string;
      textDecoration?: string;
    };
  };
  animations?: {
    links?: string;
    transitions?: string;
  };
  blockquote?: {
    background: string;
    borderWidth: string;
    border: string;
    text: string;
    padding: string;
    margin: string;
    borderRadius: string;
    fontStyle: string;
  };
  lists?: {
    unordered?: {
      listStyleType: string;
      padding: string;
      nested?: {
        listStyleType: string;
        padding: string;
      };
    };
    ordered?: {
      listStyleType: string;
      padding: string;
      nested?: {
        listStyleType: string;
        padding: string;
      };
    };
  };
  table?: {
    header?: {
      background: string;
      color: string;
      fontWeight: string;
    };
    border: string;
    cell?: {
      padding: string;
      background: string;
      borderColor: string;
    };
    hover?: {
      background: string;
    };
  };
  images?: {
    maxWidth: string;
    borderRadius: string;
    margin: string;
    boxShadow: string;
    caption?: Record<string, string>;
  };
  horizontalRule?: {
    margin: string;
    border: string;
    height: string;
    background: string;
  };
  elements?: {
    kbd?: Record<string, string>;
    mark?: Record<string, string>;
    abbr?: Record<string, string>;
  };
  footnotes?: Record<string, string>;
  references?: Record<string, string>;
  breakpoints?: {
    mobile?: {
      fontSize: string;
      contentPadding: string;
    };
  };
}

// 主题接口
export interface Theme {
  name: string;
  codeTheme?: SyntaxHighlighterProps["style"];
  styles: {
    light: ThemeStyle;
    dark: ThemeStyle;
  };
}

// 主题映射类型
export type ThemeMap = {
  [key: string]: Theme;
};

// PPT 主题接口
export interface IPPTTheme {
  name: string;
  cssPath: string;
  styles: {
    light: Partial<ThemeStyle>;
    dark: Partial<ThemeStyle>;
  };
}

// PPT 主题映射类型
export type PPTThemeMap = {
  [key: string]: IPPTTheme;
};

// Markdown 预览主题
export const MARKDOWN_THEMES: ThemeMap = {
  github: {
    name: "GitHub",
    codeTheme: themes.prism,
    styles: {
      light: {
        background: "#ffffff",
        text: "#24292e",
        heading: "#24292e",
        link: "#0366d6",
        code: {
          inline: {
            background: "#f6f8fa",
            color: "#24292e",
            padding: "0.2em 0.4em",
            borderRadius: "3px",
            fontSize: "0.875em",
            fontFamily:
              "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
          },
          block: {
            background: "#f6f8fa",
            padding: "1em",
            borderRadius: "4px",
            fontSize: "0.875em",
            lineHeight: "1.6",
            fontFamily:
              "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
            margin: "1em 0",
            overflowX: "auto",
          },
        },
      },
      dark: {
        background: "#0d1117",
        text: "#c9d1d9",
        heading: "#c9d1d9",
        link: "#58a6ff",
        code: {
          inline: {
            background: "#161b22",
            color: "#c9d1d9",
            padding: "0.2em 0.4em",
            borderRadius: "3px",
            fontSize: "0.875em",
            fontFamily:
              "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
          },
          block: {
            background: "#161b22",
            padding: "1em",
            borderRadius: "4px",
            fontSize: "0.875em",
            lineHeight: "1.6",
            fontFamily:
              "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
            margin: "1em 0",
            overflowX: "auto",
          },
        },
      },
    },
  },
  // ... 其他 Markdown 主题
};

// HTML 预览主题
export const HTML_THEMES: ThemeMap = {
  modern: {
    name: "现代",
    styles: {
      light: {
        background: "#ffffff",
        text: "#2d3748",
        heading: "#1a202c",
        link: "#3182ce",
      },
      dark: {
        background: "#1a202c",
        text: "#e2e8f0",
        heading: "#f7fafc",
        link: "#63b3ed",
      },
    },
  },
  // ... 其他 HTML 主题
};

// PPT 主题
export const PPT_THEMES: PPTThemeMap = {
  black: {
    name: "黑色",
    cssPath: "/reveal-themes/black.css",
    styles: {
      light: {
        background: "#ffffff",
        text: "#2d3748",
        heading: "#1a202c",
        link: "#3182ce",
      },
      dark: {
        background: "#1a202c",
        text: "#e2e8f0",
        heading: "#f7fafc",
        link: "#63b3ed",
      },
    },
  },
  // ... 其他 PPT 主题
};

// 预览类型枚举
export enum PreviewType {
  MARKDOWN = "markdown",
  HTML = "html",
  PPT = "ppt",
}

// 获取对应预览类型的主题
export function getThemes(type: PreviewType) {
  switch (type) {
    case PreviewType.MARKDOWN:
      return MARKDOWN_THEMES;
    case PreviewType.HTML:
      return HTML_THEMES;
    case PreviewType.PPT:
      return PPT_THEMES;
    default:
      return MARKDOWN_THEMES;
  }
}

// 主题类型定义
export type MarkdownTheme = keyof typeof MARKDOWN_THEMES;
export type HTMLTheme = keyof typeof HTML_THEMES;
export type PPTThemeKey = keyof typeof PPT_THEMES;

// 通用主题配置接口
export interface ThemeConfig {
  name: string;
  styles: ThemeStyle;
  codeTheme?: SyntaxHighlighterProps["style"];
}
