export const ROUTES = {
  HOME: '/',
  PREVIEW: {
    MARKDOWN: (id: string) => `/preview/markdown/${id}`,
    HTML: (id: string) => `/preview/html/${id}`,
    PPT: (id: string) => `/preview/ppt/${id}`,
  },
  EDIT: (id: string) => `/edit/${id}`,
} as const;

export type Routes = typeof ROUTES;