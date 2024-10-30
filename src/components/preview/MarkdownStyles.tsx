"use client";

import { ThemeStyle } from "@/config/preview-themes";

interface MarkdownStylesProps {
  theme: ThemeStyle;
}

export function MarkdownStyles({ theme }: MarkdownStylesProps) {
  return (
    <style jsx global>{`
      .markdown-preview {
        /* 基础样式 */
        color: ${theme.text};
        background-color: ${theme.background};
        font-family: ${theme.font?.base ||
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'};
        font-size: ${theme.font?.size || "16px"};
        line-height: ${theme.font?.lineHeight || "1.5"};
        font-weight: ${theme.font?.weight || "400"};
        padding: 2rem;
        max-width: 100%;
        overflow-x: auto;

        /* 标题样式 */
        h1 {
          font-family: ${theme.font?.heading || theme.font?.base};
          font-size: ${theme.headings?.h1?.fontSize || "2em"};
          font-weight: ${theme.headings?.h1?.fontWeight || "600"};
          letter-spacing: ${theme.headings?.h1?.letterSpacing || "normal"};
          margin: ${theme.headings?.h1?.margin || "1.5em 0 0.5em"};
          padding-bottom: ${theme.headings?.h1?.paddingBottom || "0.3em"};
          border-bottom: ${theme.headings?.h1?.borderBottom || "none"};
          color: ${theme.headings?.h1?.color || theme.heading || theme.text};
        }

        h2 {
          font-family: ${theme.font?.heading || theme.font?.base};
          font-size: ${theme.headings?.h2?.fontSize || "1.5em"};
          font-weight: ${theme.headings?.h2?.fontWeight || "600"};
          letter-spacing: ${theme.headings?.h2?.letterSpacing || "normal"};
          margin: ${theme.headings?.h2?.margin || "1.5em 0 0.5em"};
          padding-bottom: ${theme.headings?.h2?.paddingBottom || "0.3em"};
          border-bottom: ${theme.headings?.h2?.borderBottom || "none"};
          color: ${theme.headings?.h2?.color || theme.heading || theme.text};
        }

        /* ... h3 到 h6 的样式类似 ... */

        /* 段落样式 */
        p {
          margin: ${theme.spacing?.paragraph || "1em 0"};
          line-height: ${theme.font?.lineHeight || "1.6"};
        }

        /* 链接样式 */
        a {
          color: ${theme.links?.color || theme.link};
          text-decoration: ${theme.links?.textDecoration || "none"};
          transition: ${theme.animations?.links || "color 0.2s ease"};

          &:hover {
            color: ${theme.links?.hover?.color || theme.link};
            text-decoration: ${theme.links?.hover?.textDecoration ||
            "underline"};
          }
        }

        /* 代码样式 */
        code:not([class*="language-"]) {
          font-family: ${theme.font?.code || "monospace"};
          background: ${theme.code?.inline?.background ||
          theme.code?.background ||
          "#f6f8fa"};
          color: ${theme.code?.inline?.color || theme.code?.text || theme.text};
          padding: ${theme.code?.inline?.padding || "0.2em 0.4em"};
          border-radius: ${theme.code?.inline?.borderRadius || "4px"};
          font-size: ${theme.code?.inline?.fontSize || "0.9em"};
          font-weight: ${theme.code?.inline?.fontWeight || "normal"};
        }

        pre {
          background: ${theme.code?.block?.background ||
          theme.code?.background ||
          "#f6f8fa"};
          padding: ${theme.code?.block?.padding || "1em"};
          border-radius: ${theme.code?.block?.borderRadius || "6px"};
          overflow-x: auto;
          font-size: ${theme.code?.block?.fontSize || "0.9em"};
          line-height: ${theme.code?.block?.lineHeight || "1.5"};
          margin: ${theme.code?.block?.margin || "1.5em 0"};
        }

        /* 引用块样式 */
        blockquote {
          background: ${theme.blockquote?.background || "#f6f8fa"};
          border-left: ${theme.blockquote?.borderWidth || "4px"} solid
            ${theme.blockquote?.border || "#dfe2e5"};
          color: ${theme.blockquote?.text || theme.text};
          padding: ${theme.blockquote?.padding || "1em"};
          margin: ${theme.blockquote?.margin || "1.5em 0"};
          border-radius: ${theme.blockquote?.borderRadius || "0 4px 4px 0"};
          font-style: ${theme.blockquote?.fontStyle || "italic"};
        }

        /* 列表样式 */
        ul {
          list-style-type: ${theme.lists?.unordered?.listStyleType || "disc"};
          padding: ${theme.lists?.unordered?.padding || "0 0 0 1.2em"};
          margin: ${theme.spacing?.list || "1em 0"};
        }

        ul ul {
          list-style-type: ${theme.lists?.unordered?.nested?.listStyleType ||
          "circle"};
          padding: ${theme.lists?.unordered?.nested?.padding || "0 0 0 1.5em"};
        }

        ol {
          list-style-type: ${theme.lists?.ordered?.listStyleType || "decimal"};
          padding: ${theme.lists?.ordered?.padding || "0 0 0 1.2em"};
          margin: ${theme.spacing?.list || "1em 0"};
        }

        ol ol {
          list-style-type: ${theme.lists?.ordered?.nested?.listStyleType ||
          "lower-alpha"};
          padding: ${theme.lists?.ordered?.nested?.padding || "0 0 0 1.5em"};
        }

        /* 表格样式 */
        table {
          width: 100%;
          border-collapse: collapse;
          margin: ${theme.spacing?.table || "1em 0"};
          font-size: ${theme.font?.size};
        }

        th {
          background: ${theme.table?.header?.background ||
          theme.table?.header ||
          "#f6f8fa"};
          color: ${theme.table?.header?.color || theme.text};
          font-weight: ${theme.table?.header?.fontWeight || "600"};
          border: 1px solid ${theme.table?.border || "#dfe2e5"};
          padding: ${theme.table?.cell?.padding || "0.5em 1em"};
        }

        td {
          background: ${theme.table?.cell?.background || "transparent"};
          border: 1px solid
            ${theme.table?.cell?.borderColor ||
            theme.table?.border ||
            "#dfe2e5"};
          padding: ${theme.table?.cell?.padding || "0.5em 1em"};
        }

        tr:hover td {
          background: ${theme.table?.hover?.background || "rgba(0,0,0,0.02)"};
        }

        /* 图片样式 */
        img {
          max-width: ${theme.images?.maxWidth || "100%"};
          border-radius: ${theme.images?.borderRadius || "4px"};
          margin: ${theme.images?.margin || "1.5em 0"};
          box-shadow: ${theme.images?.boxShadow || "none"};
        }

        /* 水平线样式 */
        hr {
          margin: ${theme.horizontalRule?.margin || "2em 0"};
          border: ${theme.horizontalRule?.border || "none"};
          height: ${theme.horizontalRule?.height || "1px"};
          background: ${theme.horizontalRule?.background || "#e9e9e7"};
        }

        /* 其他元素样式 */
        kbd {
          ${Object.entries(theme.elements?.kbd || {})
            .map(([key, value]) => `${key}: ${value};`)
            .join("\n")}
        }

        mark {
          ${Object.entries(theme.elements?.mark || {})
            .map(([key, value]) => `${key}: ${value};`)
            .join("\n")}
        }

        abbr {
          ${Object.entries(theme.elements?.abbr || {})
            .map(([key, value]) => `${key}: ${value};`)
            .join("\n")}
        }

        /* 动画和过渡效果 */
        * {
          transition: ${theme.animations?.transitions || "all 0.2s ease"};
        }

        /* 脚注样式 */
        .markdown-preview .footnotes {
          ${theme.footnotes &&
          Object.entries(theme.footnotes)
            .map(([key, value]) => `${key}: ${value};`)
            .join("\n")}
        }

        /* 参考文献样式 */
        .markdown-preview .references {
          ${theme.references &&
          Object.entries(theme.references)
            .map(([key, value]) => `${key}: ${value};`)
            .join("\n")}
        }

        /* 图片标题样式 */
        .markdown-preview figure {
          margin: ${theme.images?.margin || "1.5em 0"};
          text-align: center;
        }

        .markdown-preview figcaption {
          ${theme.images?.caption &&
          Object.entries(theme.images.caption)
            .map(([key, value]) => `${key}: ${value};`)
            .join("\n")}
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
          .markdown-preview {
            font-size: ${theme.breakpoints?.mobile?.fontSize || "14px"};
            padding: ${theme.breakpoints?.mobile?.contentPadding || "1rem"};
          }
        }
      }
    `}</style>
  );
}
