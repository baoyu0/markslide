export interface PPTPreviewConfig {
  theme: string;
  transition: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
  controls: boolean;
  progress: boolean;
  center: boolean;
}

export interface PPTToolbarProps {
  onThemeChange: (theme: string) => void;
  onTransitionChange: (transition: string) => void;
  onControlsChange: (show: boolean) => void;
} 