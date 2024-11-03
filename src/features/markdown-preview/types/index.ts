export interface ThemeStyles {
  fontSize: string
  lineHeight: string
  color: string
  backgroundColor: string
  codeBackground: string
  linkColor: string
  blockquoteBorderColor: string
  blockquoteColor: string
}

export interface ThemeConfig {
  name: string
  styles: ThemeStyles
}

export interface PreviewStore {
  theme: string
  setTheme: (theme: string) => void
  fontSize: string
  setFontSize: (size: string) => void
  lineHeight: string
  setLineHeight: (height: string) => void
} 