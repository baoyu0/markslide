export interface BaseTheme {
  name: string
  styles: {
    backgroundColor: string
    color: string
    fontFamily: string
    fontSize: {
      h1: string
      h2: string
      h3: string
      text: string
      code: string
    }
    spacing: {
      block: string
      inline: string
    }
  }
}

export const baseThemes = {
  light: {
    name: '浅色主题',
    styles: {
      backgroundColor: '#ffffff',
      color: '#24292e',
      fontFamily: "'Microsoft YaHei', system-ui, sans-serif",
      fontSize: {
        h1: '2.2em',
        h2: '1.8em',
        h3: '1.5em',
        text: '1em',
        code: '0.9em'
      },
      spacing: {
        block: '1.5em',
        inline: '0.5em'
      }
    }
  },
  dark: {
    name: '深色主题',
    styles: {
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      fontFamily: "'Microsoft YaHei', system-ui, sans-serif",
      fontSize: {
        h1: '2.2em',
        h2: '1.8em',
        h3: '1.5em',
        text: '1em',
        code: '0.9em'
      },
      spacing: {
        block: '1.5em',
        inline: '0.5em'
      }
    }
  }
} as const 