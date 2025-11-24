import { getDb } from "./db";
import { date2str, genOrderNo } from "@/lib/tools";
import { STATUS } from "@/lib/consts";

export interface Order {
  id: number;
  orderNo: string;
  userEmail: string;
  amount: number;
  period: string;
  tier: string;
  paidAt?: string;
  expiredAt?: string;
  paymentProvider: string;
  outOrderId?: string;
  orderStatus: number;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

export async function insertOrder(order: Order) {
  console.debug("order:", order);
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO orders
        (orderNo, userEmail, amount, period, tier, paidAt, expiredAt, paymentProvider, outOrderId, orderStatus, credits, createdAt, updatedAt)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  );
  await stmt
    .bind(
      order.orderNo,
      order.userEmail,
      order.amount,
      order.period,
      order.tier,
      order.paidAt || null,
      order.expiredAt || null,
      order.paymentProvider,
      order.outOrderId || null,
      order.orderStatus,
      order.credits,
      order.createdAt,
      order.updatedAt
    )
    .run();
}

export async function createTrialOrder(userEmail: string) {
  const db = getDb();
  const stmt = db.prepare(
    `SELECT count(*) as count FROM orders WHERE userEmail = ?`
  );
  const row = await stmt.bind(userEmail).first<{ count: number }>();
  if (row.count > 0) {
    return;
  }

  const orderNo = genOrderNo();

  const currentDate = new Date();
  const oneMonthLater = new Date(currentDate);
  oneMonthLater.setMonth(currentDate.getMonth() + 1);

  const createdAt = date2str(currentDate);
  const expiredAt = date2str(oneMonthLater);

  const order: Order = {
    orderNo,
    userEmail,
    amount: 0,
    period: "once",
    tier: "free",
    paidAt: createdAt,
    expiredAt,
    paymentProvider: "",
    orderStatus: STATUS.SUCCESS,
    credits: 1,
    createdAt,
    updatedAt: createdAt,
  };
  await insertOrder(order);
}

export async function findOrderByOrderNo(
  orderNo: string
): Promise<Order | null> {
  const db = getDb();
  const stmt = db.prepare(`SELECT * FROM orders WHERE orderNo = ? LIMIT 1`);
  const row = await stmt.bind(orderNo).first<Order>();
  if (!row) {
    return null;
  }

  return row;
}

export async function updateOrderStatus(
  orderNo: string,
  orderStatus: number,
  paidAt: string,
  expiredAt: string,
  outOrderId: string
) {
  const db = getDb();
  const stmt = db.prepare(
    `UPDATE orders SET orderStatus=?, paidAt=?, expiredAt=?, outOrderId=?, updatedAt=CURRENT_TIMESTAMP WHERE orderNo=?`
  );
  await stmt.bind(orderStatus, paidAt, expiredAt, outOrderId, orderNo).run();
}

// 当前用户当前生效的订单
export const getCurrentOrder = async (
  userEmail: string
): Promise<Order | null> => {
  const now = date2str(new Date());
  const db = getDb();
  const stmt = db.prepare(
    `SELECT * FROM orders WHERE userEmail = ? AND orderStatus = 1 AND expiredAt >= ? 
    order by id desc limit 1`
  );
  const row = await stmt.bind(userEmail, now).first<Order>();
  return row;
};

// 当前是否有生效订单
export const hasValidOrder = async (userEmail: string): Promise<boolean> => {
  const order = await getCurrentOrder(userEmail);
  return order && order.tier !== "free";
};
