// Markdown 转 HTML
export function convertMarkdownToHtml(markdown: string): string {
  // 使用 marked 或其他库进行转换
  return marked(markdown);
}

// Markdown 转 PPT
export function convertMarkdownToPPT(markdown: string): string {
  // 将 Markdown 转换为 reveal.js 支持的格式
  const slides = markdown
    .split("---")
    .map((slide) => `<section>${marked(slide.trim())}</section>`)
    .join("\n");

  return `<div class="reveal"><div class="slides">${slides}</div></div>`;
}
