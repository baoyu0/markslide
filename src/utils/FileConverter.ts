import { parse as parseMarkdown } from "marked";
import DOMPurify from "dompurify";

export class FileConverter {
  // Markdown 转 HTML
  static markdownToHtml(markdown: string): string {
    const html = parseMarkdown(markdown, {
      gfm: true,
      breaks: true,
      headerIds: true,
      mangle: false,
    });
    return DOMPurify.sanitize(html);
  }

  // Markdown 转 PPT
  static markdownToPPT(markdown: string): string {
    // 按照 --- 分割幻灯片
    const slides = markdown.split(/\n---\n/).map((slide) => {
      const slideHtml = parseMarkdown(slide.trim(), {
        gfm: true,
        breaks: true,
      });
      return `<section>${DOMPurify.sanitize(slideHtml)}</section>`;
    });

    return `
      <div class="reveal">
        <div class="slides">
          ${slides.join("\n")}
        </div>
      </div>
    `;
  }

  // HTML 转 Markdown
  static htmlToMarkdown(html: string): string {
    // 这里可以使用 turndown 库实现 HTML 到 Markdown 的转换
    // 暂时返回原始 HTML
    return html;
  }

  // 根据文件类型和目标格式进行转换
  static convert(content: string, fromType: string, toType: string): string {
    if (fromType === toType) return content;

    const conversions: Record<
      string,
      Record<string, (content: string) => string>
    > = {
      markdown: {
        html: this.markdownToHtml,
        ppt: this.markdownToPPT,
      },
      html: {
        markdown: this.htmlToMarkdown,
        ppt: (html) => this.markdownToPPT(this.htmlToMarkdown(html)),
      },
    };

    const converter = conversions[fromType]?.[toType];
    if (!converter) {
      throw new Error(`Unsupported conversion from ${fromType} to ${toType}`);
    }

    return converter(content);
  }
}
