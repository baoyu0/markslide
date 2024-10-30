/**
 * 从 Markdown 内容中移除 YAML/YML 前置元数据
 */
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
  metadata: Record<string, string | number | boolean>;
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
    // 这里可以使用 js-yaml 库来解析 YAML
    // 暂时返回简单的键值对
    const metadata = Object.fromEntries(
      yamlContent
        .split("\n")
        .map((line) => line.split(":").map((part) => part.trim()))
        .filter((parts) => parts.length === 2),
    );

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
