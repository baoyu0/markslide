import DOMPurify from 'dompurify';

export function sanitizeHTML(content: string, options?: object): string {
  return DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ['style'],
    ADD_ATTR: ['target'],
    ...options,
  });
} 