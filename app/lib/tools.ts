import { SnowflakeIdv1 } from "simple-flakeid";

/**
 * 生日颜色配置的类型定义
 */
export type MoonColorConfig = {
  date: string;
  color_name: string;
  hex_code: string;
  color_meaning: string;
};

export function getFileExtention(fileName: string): string {
  return fileName.split(".").pop()?.toLocaleLowerCase() || "";
}

/**
 * 从 URL 字符串中解析文件扩展名。
 * 该函数会查找 URL 路径名末尾（查询参数之前）的部分。
 *
 * @param urlString 要解析的 URL 字符串。
 * @returns 文件扩展名（不含点'.'），如果找不到扩展名或 URL 无效，则返回空字符串。
 */
export function getExtensionFromUrl(urlString: string): string {
  try {
    // 1. 创建一个 URL 对象，以便轻松访问 pathname 等部分。
    const url = new URL(urlString);

    // 2. 获取 pathname (例如 "/path/to/file.ext")。
    const pathname = url.pathname;

    // 3. 查找路径名中最后一个点 ('.') 的索引。
    const lastDotIndex = pathname.lastIndexOf(".");

    // 4. 检查是否找到了点，并且这个点不是路径名的第一个字符，
    //    并且它后面还有字符 (处理像 "/path/to/file." 这样的情况)。
    if (
      lastDotIndex === -1 ||
      lastDotIndex === 0 ||
      lastDotIndex === pathname.length - 1
    ) {
      return ""; // 没有找到有效的扩展名
    }

    // 5. 提取最后一个点之后的部分作为扩展名。
    const extension = pathname.substring(lastDotIndex + 1);

    return extension;
  } catch (error) {
    // 优雅地处理无效的 URL 字符串。
    console.error(`解析 URL "${urlString}" 时出错:`, error);
    return ""; // 对于无效 URL 返回空字符串
  }
}

export function formatDate(date: Date): string {
  // 定义月份的英文缩写数组
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // 获取月份 (getMonth() 返回 0-11，所以需要用作数组索引)
  const monthIndex = date.getMonth();
  const month = monthNames[monthIndex];

  // 获取日期 (getDate() 返回 1-31)
  const day = date.getDate();

  // 获取年份 (getFullYear() 返回四位数的年份)
  const year = date.getFullYear();

  // 使用模板字符串拼接成目标格式 "Jan 2, 2025"
  return `${month} ${day}, ${year}`;
}

export function genOrderNo(): string {
  const gen = new SnowflakeIdv1({ workerId: 1 });
  const snowId = gen.NextId();

  return snowId.toString();
}

export function date2str(date: Date): string {
  return date.toISOString().replace(/T/, " ").slice(0, -5);
}
