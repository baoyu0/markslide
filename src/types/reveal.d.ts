declare module "reveal.js" {
  export interface RevealOptions {
    embedded?: boolean;
    controls?: boolean;
    controlsLayout?: "edges" | "bottom-right";
    progress?: boolean;
    center?: boolean;
    hash?: boolean;
    transition?: "none" | "fade" | "slide" | "convex" | "concave" | "zoom";
    slideNumber?:
      | boolean
      | "h.v"
      | "h/v"
      | "c"
      | "c/t"
      | ((slideObject: {
          h: number;
          v: number;
        }) => string | [string, string, string]);
    overview?: boolean;
    width?: number | string;
    height?: number | string;
    margin?: number;
    minScale?: number;
    maxScale?: number;
    touch?: boolean;
    theme?: string;
    history?: boolean;
    fragments?: boolean;
    fragmentInURL?: boolean;
    autoSlide?: number | false;
    autoSlideStoppable?: boolean;
    defaultTiming?: number | null;
    mouseWheel?: boolean;
    previewLinks?: boolean;
    postMessage?: boolean;
    dependencies?: Array<{
      src: string;
      async?: boolean;
      callback?: () => void;
      condition?: () => boolean;
    }>;
    keyboard?: boolean;
    cursorHideTimeout?: number;
    hideCursor?: boolean;
  }

  export interface RevealInstance {
    initialize(options?: RevealOptions): Promise<void>;
    addEventListener(
      type: string,
      listener: (event: CustomEvent) => void,
      useCapture?: boolean,
    ): void;
    removeEventListener(
      type: string,
      listener: (event: CustomEvent) => void,
    ): void;
    getTotalSlides(): number;
    prev(): void;
    next(): void;
    toggleOverview(): void;
    destroy(): void;
    configure(options: Partial<RevealOptions>): void;
  }

  export interface RevealConstructor {
    new (element: HTMLElement, options?: RevealOptions): RevealInstance;
  }

  const Reveal: RevealConstructor;
  export default Reveal;
}
