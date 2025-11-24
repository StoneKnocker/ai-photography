import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast, type ToastT } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 公共的 toast 样式配置
const defaultToastOptions: ToastT = {
  position: "top-center",
  style: {
    backgroundColor: "black",
    color: "white",
    top: "64px",
  },
  id: "custom-toast",
};

// 公共的 toast 方法
const showToast = {
  success: (message: string, options?: Partial<ToastT>) => {
    return toast.success(message, { ...defaultToastOptions, ...options });
  },
  error: (message: string, options?: Partial<ToastT>) => {
    return toast.error(message, { ...defaultToastOptions, ...options });
  },
};

export default showToast;
