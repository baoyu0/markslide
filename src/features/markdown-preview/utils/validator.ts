export function isValidMarkdown(content: string): boolean {
  // 基本的 Markdown 语法验证
  const hasHeadings = /^#{1,6}\s.+/m.test(content);
  const hasLists = /^[-*+]\s.+/m.test(content);
  const hasLinks = /\[.+\]\(.+\)/.test(content);
  
  return content.length > 0 && (hasHeadings || hasLists || hasLinks);
}

export function validateFontSize(size: string): boolean {
  const numValue = parseInt(size);
  return !isNaN(numValue) && numValue >= 12 && numValue <= 24;
}

export function validateLineHeight(height: string): boolean {
  const numValue = parseFloat(height);
  return !isNaN(numValue) && numValue >= 1.2 && numValue <= 2;
} 