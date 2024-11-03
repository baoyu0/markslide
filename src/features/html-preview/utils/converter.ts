import DOMPurify from 'dompurify';
import { removeYamlFrontMatter } from '@/shared/utils/converter';

export async function sanitizeHTML(content: string): Promise<string> {
  const processedContent = removeYamlFrontMatter(content);
  return DOMPurify.sanitize(processedContent, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'img', 'ul', 'ol', 'li', 'code', 'pre', 'blockquote', 'em', 'strong', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'target'],
  });
}

export async function exportToHTML(content: string): Promise<string> {
  return content;
} 