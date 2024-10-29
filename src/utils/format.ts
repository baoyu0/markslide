/**
 * 格式化文件大小
 * @param bytes 字节数
 * @returns 格式化后的文件大小字符串
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * 格式化日期
 * @param dateString ISO 日期字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // 使用 Intl.DateTimeFormat 进行本地化日期格式化
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * 格式化相对时间
 * @param dateString ISO 日期字符串
 * @returns 相对时间字符串
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} 天前`;
  } else if (hours > 0) {
    return `${hours} 小时前`;
  } else if (minutes > 0) {
    return `${minutes} 分钟前`;
  } else {
    return "刚刚";
  }
}

/**
 * 格式化文件名
 * @param filename 文件名
 * @param maxLength 最大长度
 * @returns 格式化后的文件名
 */
export function formatFileName(
  filename: string,
  maxLength: number = 20,
): string {
  if (filename.length <= maxLength) return filename;

  const ext = filename.split(".").pop() || "";
  const nameWithoutExt = filename.slice(0, -(ext.length + 1));
  const truncatedName = nameWithoutExt.slice(0, maxLength - 3 - ext.length);

  return `${truncatedName}...${ext}`;
}
