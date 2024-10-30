import DOMPurify from "dompurify";

export class FileConverter {
  static convert(content: string, fromType: string, toType: string): string {
    // Markdown -> HTML
    if (fromType === "markdown" && toType === "html") {
      return content;
    }

    // HTML -> Markdown
    if (fromType === "html" && toType === "markdown") {
      return content;
    }

    // Markdown -> PPT
    if (fromType === "markdown" && toType === "ppt") {
      const slides = content.split("---").map((slide) => slide.trim());
      return slides.join('\n<section data-separator="---">\n');
    }

    // HTML -> PPT
    if (fromType === "html" && toType === "ppt") {
      return `<section data-separator="---">\n${DOMPurify.sanitize(content)}\n</section>`;
    }

    // 如果是相同类型或不支持的转换，直接返回原内容
    return content;
  }
}
