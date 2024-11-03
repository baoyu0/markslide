export function formatSlideContent(content: string) {
  return content
    .split('\n---\n')
    .map(slide => {
      // 检测是否以标题开始
      const hasTitle = slide.trim().startsWith('#');
      if (!hasTitle) {
        // 如果没有标题，添加一个空标题
        return `<section>
          <h2>&nbsp;</h2>
          ${slide}
        </section>`;
      }
      
      // 处理标题和内容的布局
      return `<section>
        ${slide
          .replace(/^# (.*?)$/m, '<h1>$1</h1>')
          .replace(/^## (.*?)$/m, '<h2>$1</h2>')
          .replace(/^### (.*?)$/m, '<h3>$1</h3>')}
      </section>`;
    })
    .join('\n');
} 