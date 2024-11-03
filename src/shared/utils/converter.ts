import { marked } from 'marked';
import DOMPurify from 'dompurify';
import yaml from 'js-yaml';

// 配置 marked
marked.use({
  gfm: true,
  breaks: true,
});

// 解析 YAML 前置内容
export function parseYamlFrontMatter(content: string): { metadata: any; content: string } {
  const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(yamlRegex);
  
  if (!match) {
    return { metadata: {}, content };
  }

  try {
    const yamlContent = match[1];
    const metadata = yaml.load(yamlContent) as Record<string, unknown>;
    const contentWithoutYaml = content.replace(yamlRegex, '');
    return { metadata, content: contentWithoutYaml };
  } catch (error) {
    console.error('Failed to parse YAML:', error);
    return { metadata: {}, content };
  }
}

// 移除 YAML 前置内容
export function removeYamlFrontMatter(content: string): string {
  const { content: processedContent } = parseYamlFrontMatter(content);
  return processedContent;
}

// 将 Markdown 按标题分割为幻灯片
function splitMarkdownByHeadings(markdown: string): string[] {
  const processedContent = removeYamlFrontMatter(markdown);
  
  // 按任意级别的标题分割内容
  const sections = processedContent.split(/(?=^#{1,6}\s+[^\n]*$)/m);
  return sections.filter(section => section.trim());
}

export async function convertMarkdownToHTML(markdown: string): Promise<string> {
  const processedContent = removeYamlFrontMatter(markdown);
  return marked.parse(processedContent);
}

export async function convertMarkdownToPPT(markdown: string): Promise<string> {
  const sections = splitMarkdownByHeadings(markdown);
  const slides = await Promise.all(
    sections.map(async (section) => {
      const sectionHtml = await marked.parse(section);
      return `
        <section data-markdown>
          <div class="markdown-section">
            ${sectionHtml}
          </div>
        </section>
      `;
    })
  );
  return slides.join('\n');
}

export async function sanitizeHTML(html: string): Promise<string> {
  const processedContent = removeYamlFrontMatter(html);
  return DOMPurify.sanitize(processedContent, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'a', 'img', 'ul', 'ol', 'li',
      'code', 'pre', 'blockquote',
      'em', 'strong', 'table', 'thead',
      'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title',
      'class', 'id', 'target'
    ],
  });
} 