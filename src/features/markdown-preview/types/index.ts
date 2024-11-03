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

export type MarkdownTheme = 'light' | 'dark' | 'github' | 'custom'
export type CodeTheme = 'light' | 'dark' | 'github' | 'dracula' 