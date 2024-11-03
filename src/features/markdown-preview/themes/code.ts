import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const CODE_THEMES = {
  light: oneLight,
  dark: oneDark,
} as const;

export type CodeTheme = keyof typeof CODE_THEMES; 