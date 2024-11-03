export interface HtmlThemeStyles {
  backgroundColor: string
  color: string
  linkColor: string
  fontFamily: string
  fontSize: string
  lineHeight: string
  headingColor: string
  borderColor: string
  codeBackground: string
}

export interface HtmlThemeConfig {
  name: string
  styles: HtmlThemeStyles
}

export type HtmlTheme = 'light' | 'dark' | 'paper' | 'custom' 