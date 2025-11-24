import { getDb } from "./db";

// 获取给定时间段内消耗的 credits
export async function getCreditConsumed(
  email: string,
  start: string,
  end: string
): Promise<number> {
  console.debug("start:", start, "end:", end);
  console.debug("email:", email);
  const db = getDb();
  const stmt = db.prepare(
    `SELECT sum(creditAmount) as credits FROM credit_records WHERE userEmail = ? AND createdAt >= ? AND createdAt <= ?`
  );
  const row = await stmt.bind(email, start, end).first();
  return (row?.credits as number) ?? 0;
}

export const consumeCredit = async (
  userEmail: string,
  creditAmount: number,
  creditType: string,
  taskId: string = ""
) => {
  const db = getDb();
  await db
    .prepare(
      "insert into credit_records(userEmail, creditAmount, taskId, creditType) values(?,?,?,?)"
    )
    .bind(userEmail, creditAmount, taskId, creditType)
    .run();
};

export interface CreditRecord {
  id: number;
  userEmail: string;
  taskId: string;
  creditAmount: number;
  creditType: string;
  createdAt: string;
}

export const getRecordByTaskId = async (taskId: string): Promise<CreditRecord | null> => {
  const db = getDb();
  const stmt = db.prepare(
    `SELECT * FROM credit_records WHERE taskId = ? ORDER BY createdAt DESC LIMIT 1`
  );
  const row = await stmt.bind(taskId).first<CreditRecord>();
  return row;
};
