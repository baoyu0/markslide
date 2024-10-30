export const UPLOAD_CONFIG = {
  maxSize: Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 10485760, // 10MB
  allowedTypes: {
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
  },
  errorMessages: {
    invalidType: "不支持的文件类型",
    tooLarge: "文件大小超出限制",
    readError: "文件读取失败",
    uploadError: "文件上传失败",
  },
}; 