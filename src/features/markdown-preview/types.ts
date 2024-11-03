export interface MarkdownPreviewConfig {
  theme: string;
  fontSize: string;
  lineHeight: string;
  codeTheme: string;
  showLineNumbers: boolean;
}

export interface MarkdownToolbarProps {
  onThemeChange: (theme: string) => void;
  onFontSizeChange: (size: string) => void;
  onLineHeightChange: (height: string) => void;
} 