import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

// Markdown 转 HTML
export function convertMarkdownToHtml(markdown: string): string {
  return unified()
    .use(remarkParse)
    .use(remarkHtml)
    .processSync(markdown)
    .toString();
}

// Markdown 转 PPT
export function convertMarkdownToPPT(markdown: string): string {
  // 将 Markdown 转换为 reveal.js 支持的格式
  const slides = markdown
    .split("---")
    .map((slide) => `<section>${convertMarkdownToHtml(slide.trim())}</section>`)
    .join("\n");

  return `<div class="reveal"><div class="slides">${slides}</div></div>`;
}
