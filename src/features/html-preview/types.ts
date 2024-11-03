export interface HTMLPreviewConfig {
  theme: string;
  layout: 'responsive' | 'fixed';
  zoom: number;
  sanitizeOptions: {
    allowedTags: string[];
    allowedAttributes: Record<string, string[]>;
  };
}

export interface HTMLToolbarProps {
  onThemeChange: (theme: string) => void;
  onLayoutChange: (layout: 'responsive' | 'fixed') => void;
  onZoomChange: (zoom: number) => void;
} 