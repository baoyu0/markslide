import { marked } from 'marked';
import { removeYamlFrontMatter } from '@/shared/utils/converter';

export async function convertToHTML(content: string): Promise<string> {
  const processedContent = removeYamlFrontMatter(content);
  return marked.parse(processedContent, { async: true });
}

export async function exportToMarkdown(content: string): Promise<string> {
  return content;
} 