interface HTMLTheme {
  name: string;
  styles: {
    light: Record<string, any>;
    dark: Record<string, any>;
  };
}

export const HTML_THEMES = {
  modern: {
    name: "现代简约",
    styles: {
      light: {
        backgroundColor: "#ffffff",
        color: "#2d3748",
        headingColor: "#1a365d",
        linkColor: "#3182ce",
        fontFamily: "'Microsoft YaHei', 'SimSun', sans-serif",
        fontSize: "16px",
        lineHeight: "1.6",
        contentWidth: "800px",
        contentBackground: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      },
      dark: {
        backgroundColor: "#1a202c",
        color: "#e2e8f0",
        headingColor: "#90cdf4",
        linkColor: "#63b3ed",
        fontFamily: "'Microsoft YaHei', 'SimSun', sans-serif",
        fontSize: "16px",
        lineHeight: "1.6",
        contentWidth: "800px",
        contentBackground: "#2d3748",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  classic: {
    name: "经典",
    styles: {
      light: {
        backgroundColor: "#f8f9fa",
        color: "#343a40",
        linkColor: "#007bff",
      },
      dark: {
        backgroundColor: "#212529",
        color: "#f8f9fa",
        linkColor: "#0d6efd",
      },
    },
  },
  paper: {
    name: "纸张",
    styles: {
      light: {
        backgroundColor: "#fff9f0",
        color: "#2d3748",
        linkColor: "#805ad5",
      },
      dark: {
        backgroundColor: "#2d3748",
        color: "#fff9f0",
        linkColor: "#d6bcfa",
      },
    },
  },
} as const; 