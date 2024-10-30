export const ENV_CONFIG = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Markslide",
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "一个优雅的文档转换和预览工具",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0",
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/yourusername/markslide",
  },
  features: {
    enableCloudStorage: process.env.NEXT_PUBLIC_ENABLE_CLOUD_STORAGE === "true",
    enableCollaboration: process.env.NEXT_PUBLIC_ENABLE_COLLABORATION === "true",
    maxFileSize: Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 10485760, // 10MB
  },
} as const; 