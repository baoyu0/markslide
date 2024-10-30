import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

// 定义 Section 接口
interface Section {
  title: string;
  content: string[];
}

// 定义 YAML 元数据类型
interface YAMLMetadata {
  title?: string;
  author?: string;
  date?: string;
  tags?: string[];
  [key: string]: string | string[] | undefined;
}

// Markdown 转 HTML
export function convertMarkdownToHtml(markdown: string): string {
  const cleanContent = removeYAMLFrontMatter(markdown);
  return unified()
    .use(remarkParse)
    .use(remarkHtml)
    .processSync(cleanContent)
    .toString();
}

// Markdown 转 PPT
export function convertMarkdownToPPT(markdown: string): string {
  const cleanContent = removeYAMLFrontMatter(markdown);

  // 按标题分割内容
  const sections = splitByHeadings(cleanContent);

  // 转换每个部分为幻灯片
  const slides = sections
    .map((section: Section) => {
      // 转换内容为 HTML
      const htmlContent = unified()
        .use(remarkParse)
        .use(remarkHtml)
        .processSync(section.content.join("\n"))
        .toString();

      // 处理代码块的语法高亮
      const processedContent = htmlContent.replace(
        /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
        (_, lang, code) => `
        <pre><code class="language-${lang}" data-line-numbers>
          ${code.trim()}
        </code></pre>
      `,
      );

      // 构建幻灯片 HTML
      return `
      <section data-auto-animate>
        <h2 class="slide-title">${section.title}</h2>
        <div class="slide-content">
          ${processedContent}
        </div>
      </section>
    `;
    })
    .join("\n");

  return `
    <div class="reveal">
      <div class="slides">
        ${slides}
      </div>
    </div>
  `;
}

/**
 * 按标题分割 Markdown 内容
 */
function splitByHeadings(markdown: string): Section[] {
  const lines = markdown.split("\n");
  const sections: Section[] = [];
  let currentSection: Section | null = null;

  lines.forEach((line) => {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      // 如果找到标题，保存当前部分并开始新部分
      if (currentSection) {
        sections.push(currentSection);
      }

      // 开始新部分
      currentSection = {
        title: headingMatch[2],
        content: [],
      };
    } else if (currentSection) {
      // 将内容添加到当前部分
      currentSection.content.push(line);
    }
  });

  // 添加最后一个部分
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

// 从 Markdown 内容中移除 YAML/YML 前置元数据
export function removeYAMLFrontMatter(content: string): string {
  // 匹配开头的 YAML/YML 格式
  const yamlRegex = /^---\n([\s\S]*?)\n---\n/;

  // 如果存在 YAML 前置内容，则移除
  if (yamlRegex.test(content)) {
    return content.replace(yamlRegex, "");
  }

  return content;
}

/**
 * 从 Markdown 内容中提取 YAML/YML 前置元数据
 */
export function extractYAMLFrontMatter(content: string): {
  metadata: YAMLMetadata;
  content: string;
} {
  const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(yamlRegex);

  if (!match) {
    return {
      metadata: {},
      content: content,
    };
  }

  try {
    // 提取 YAML 内容
    const yamlContent = match[1];
    // 解析 YAML 内容为对象
    const metadata = Object.fromEntries(
      yamlContent
        .split("\n")
        .map((line) => line.split(":").map((part) => part.trim()))
        .filter((parts) => parts.length === 2),
    ) as YAMLMetadata;

    // 移除 YAML 内容
    const cleanContent = content.replace(yamlRegex, "");

    return {
      metadata,
      content: cleanContent,
    };
  } catch (error) {
    console.error("解析 YAML 前置元数据失败:", error);
    return {
      metadata: {},
      content: content,
    };
  }
}

// 添加 PPT 主题相关的样式
export function getPPTThemeStyles(colorMode: string): string {
  return `
    .reveal .slides {
      text-align: left;
    }

    .reveal .slides section {
      height: 100%;
      padding: 40px;
      background: ${colorMode === "light" ? "#ffffff" : "#2d3748"};
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .reveal .slide-title {
      color: ${colorMode === "light" ? "#2d3748" : "#f7fafc"};
      font-size: 2.5em;
      margin-bottom: 1em;
      border-bottom: 2px solid ${colorMode === "light" ? "#e2e8f0" : "#4a5568"};
      padding-bottom: 0.3em;
    }

    .reveal .slide-content {
      font-size: 1.5em;
      line-height: 1.6;
      color: ${colorMode === "light" ? "#4a5568" : "#e2e8f0"};
    }
  `;
}
