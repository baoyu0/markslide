declare module "marked" {
  export interface MarkedOptions {
    gfm?: boolean;
    breaks?: boolean;
    headerIds?: boolean;
    mangle?: boolean;
  }

  export function parse(markdown: string, options?: MarkedOptions): string;
  export function parseInline(
    markdown: string,
    options?: MarkedOptions,
  ): string;
}
