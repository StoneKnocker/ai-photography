import { getDb } from "./db";
import { createTrialOrder, getCurrentOrder } from "./order";
import { getCreditConsumed } from "./credit_records";
import { bindTrialTask } from "./user_tasks";
import { date2str } from "@/lib/tools";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export const getUserCreditsInfo = async (
  email: string
): Promise<{ credits: number; isPaidUser: boolean }> => {
  const res = {
    credits: 0,
    isPaidUser: false,
  };
  const currentOrder = await getCurrentOrder(email);
  if (!currentOrder) {
    return res;
  }
  if (currentOrder.tier !== "free") {
    res.isPaidUser = true;
  }

  let beginAt: string;
  let endAt: string;
  if (
    currentOrder.period === "monthly" ||
    currentOrder.period === "once" ||
    currentOrder.period === "weekly"
  ) {
    beginAt = currentOrder.paid_at;
    endAt = currentOrder.expired_at;
  } else if (currentOrder.period === "yearly") {
    const currentCircle = caclDates(
      currentOrder.paid_at,
      currentOrder.expired_at
    );
    console.log("currentCircle:", currentCircle);
    beginAt = currentCircle.beginAt;
    endAt = currentCircle.endAt;
  }

  console.log("email:", email);
  console.log("beginAt:", beginAt);
  console.log("endAt:", endAt);
  const creditsConsumed = await getCreditConsumed(email, beginAt, endAt);

  res.credits = currentOrder.credits - creditsConsumed;
  res.credits = Math.max(res.credits, 0);
  return res;
};

// beginAt 和 endAt 之间相差 12 个月
// 计算出这个 12 个周期
// 并计算出当前时间落于哪个周期之内
const caclDates = (
  beginAt: string,
  endAt: string
): { beginAt: string; endAt: string } | undefined => {
  // Parse beginAt into a Date object
  const beginDate = new Date(beginAt);

  // Initialize an array to store the cycles
  const cycles = [];

  // Generate 12 cycles by adding i months to beginDate for i from 0 to 11
  for (let i = 0; i < 12; i++) {
    // Create new Date objects for start and end to avoid modifying beginDate
    const start = new Date(beginDate);
    start.setMonth(start.getMonth() + i);
    const end = new Date(beginDate);
    end.setMonth(end.getMonth() + i + 1);
    cycles.push({ start, end: end });
  }

  // Find the cycle that contains the current time
  const now = new Date();
  for (let i = 0; i < cycles.length; i++) {
    // Each cycle is [start, end), i.e., includes start but excludes end
    if (now >= cycles[i].start && now < cycles[i].end) {
      return {
        beginAt: date2str(cycles[i].start),
        endAt: date2str(cycles[i].end),
      };
    }
  }

  return undefined;
};
