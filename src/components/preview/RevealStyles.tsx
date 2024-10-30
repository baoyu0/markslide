"use client";

interface RevealStylesProps {
  colorMode: string;
}

export function RevealStyles({ colorMode }: RevealStylesProps) {
  return (
    <style jsx global>{`
      .reveal-container {
        background: ${colorMode === "light" ? "#f1f5f9" : "#1a202c"};
      }

      .reveal {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, sans-serif;
      }

      .reveal .slides {
        text-align: left;
      }

      .reveal .slides section {
        padding: 40px;
        height: 720px;
        background: ${colorMode === "light" ? "#ffffff" : "#2d3748"};
        border-radius: 4px;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }

      .reveal h1 {
        font-size: 2.5em;
        color: ${colorMode === "light" ? "#2d3748" : "#f7fafc"};
        margin-bottom: 0.5em;
        border-bottom: 2px solid
          ${colorMode === "light" ? "#e2e8f0" : "#4a5568"};
        padding-bottom: 0.2em;
      }

      .reveal h2 {
        font-size: 1.8em;
        color: ${colorMode === "light" ? "#4a5568" : "#e2e8f0"};
        margin-bottom: 0.5em;
      }

      .reveal h3 {
        font-size: 1.4em;
        color: ${colorMode === "light" ? "#718096" : "#cbd5e0"};
      }

      .reveal p {
        font-size: 1.2em;
        line-height: 1.6;
        color: ${colorMode === "light" ? "#4a5568" : "#e2e8f0"};
      }

      .reveal ul,
      .reveal ol {
        display: block;
        margin-left: 2em;
      }

      .reveal li {
        margin: 0.5em 0;
        color: ${colorMode === "light" ? "#4a5568" : "#e2e8f0"};
      }

      .reveal pre {
        width: 100%;
        font-size: 0.9em;
        box-shadow: none;
        border-radius: 8px;
        background: ${colorMode === "light" ? "#f7fafc" : "#2d3748"};
        margin: 1em 0;
        padding: 1em;
      }

      .reveal code {
        font-family: "Fira Code", monospace;
        padding: 0.2em 0.4em;
        border-radius: 4px;
        background: ${colorMode === "light"
          ? "rgba(0,0,0,0.05)"
          : "rgba(255,255,255,0.1)"};
      }

      .reveal img {
        margin: 1em 0;
        max-height: 65vh;
        border-radius: 4px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      .reveal .controls {
        color: ${colorMode === "light" ? "#4a5568" : "#e2e8f0"};
      }

      .reveal .progress {
        height: 4px;
        background: ${colorMode === "light" ? "#e2e8f0" : "#4a5568"};
      }

      .reveal .progress span {
        background: ${colorMode === "light" ? "#3182ce" : "#63b3ed"};
      }

      .reveal .slide-number {
        background: transparent;
        color: ${colorMode === "light" ? "#718096" : "#a0aec0"};
        font-size: 0.9em;
        padding: 8px;
      }

      .reveal .backgrounds {
        background: ${colorMode === "light" ? "#f1f5f9" : "#1a202c"};
      }

      @media print {
        .reveal aside.controls,
        .reveal .progress {
          display: none;
        }
      }
    `}</style>
  );
}
