import { marked } from 'marked';
import { removeYamlFrontMatter } from '@/shared/utils/converter';
import Reveal from 'reveal.js';

export async function convertToPPT(content: string): Promise<string> {
  const processedContent = removeYamlFrontMatter(content);
  
  // 使用正则表达式匹配标题
  const sections = processedContent.split(/(?=^#{1,3}\s)/m)
    .filter(section => section.trim());

  const slides = await Promise.all(
    sections.map(async (section) => {
      const sectionHtml = await marked.parse(section, {
        async: true,
        breaks: true,
        gfm: true
      });
      
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

export function initializeReveal(container: HTMLElement): Reveal.Api {
  return new Reveal(container, {
    hash: true,
    controls: true,
    progress: true,
    center: true,
    transition: 'slide'
  });
} 