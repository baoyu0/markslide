// 常量配置
export const SUPPORTED_FILE_TYPES = {
  markdown: {
    extensions: [".md"],
    mimeTypes: ["text/markdown"],
    maxSize: 5242880, // 5MB
  },
  html: {
    extensions: [".html", ".htm"],
    mimeTypes: ["text/html"],
    maxSize: 5242880, // 5MB
  },
  powerpoint: {
    extensions: [".ppt", ".pptx"],
    mimeTypes: [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
    maxSize: 10485760, // 10MB
  },
};

export const ERROR_MESSAGES = {
  invalidType: "不支持的文件类型",
  tooLarge: "文件大小超出限制",
  readError: "文件读取失败",
  uploadError: "文件上传失败",
};

export const PREVIEW_THEMES = {
  markdown: {
    github: {
      name: "GitHub",
      light: "github-light",
      dark: "github-dark",
    },
    dracula: {
      name: "Dracula",
      light: "dracula",
      dark: "dracula",
    },
  },
  ppt: {
    default: {
      name: "默认",
      theme: "black",
    },
    light: {
      name: "明亮",
      theme: "white",
    },
  },
}; 