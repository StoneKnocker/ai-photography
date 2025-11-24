import { getUUID } from "@/lib/uuid";

export function getTrialSessionId() {
  // 检查是否在服务器端
  if (typeof window === "undefined") {
    return null;
  }

  let sessionId = localStorage.getItem("trialSessionId");
  if (sessionId) {
    return sessionId;
  }
  sessionId = "s-" + getUUID();
  localStorage.setItem("trialSessionId", sessionId);

  // 同时记录 cookie
  document.cookie = `trialSessionId=${sessionId}; path=/; max-age=${
    7 * 24 * 60 * 60
  };`;

  return sessionId;
}
