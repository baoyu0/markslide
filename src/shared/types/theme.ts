export interface ThemeStyles {
  light: Record<string, any>;
  dark: Record<string, any>;
}

export interface Theme {
  name: string;
  styles: ThemeStyles;
}

export interface PreviewTheme extends Theme {
  codeTheme?: any;
} 