export const MARKDOWN_THEMES = {
  github: {
    name: 'GitHub',
    styles: {
      light: {
        backgroundColor: '#ffffff',
        color: '#24292e',
        linkColor: '#0366d6',
        codeBackground: '#f6f8fa',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
      },
      dark: {
        backgroundColor: '#0d1117',
        color: '#c9d1d9',
        linkColor: '#58a6ff',
        codeBackground: '#161b22',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
      }
    }
  }
} as const

export type MarkdownTheme = keyof typeof MARKDOWN_THEMES 