import { STATUS } from "@/lib/consts";
import { getDb } from "./db";
import { consumeCredit, getRecordByTaskId } from "./credit_records";
import { date2str } from "@/lib/tools";

export interface UserTask {
  id: number;
  userEmail: string;
  taskId: string;
  taskStatus: number; // 0: pending 1: success 2: failed
  audioUrl: string | null;
  streamAudioUrl: string | null;
  imageUrl: string | null;
  prompt: string | null;
  title: string | null;
  tags: string | null;
  duration: number;
  isPublic: number; // 0: private, 1: public
  isPublicShow: number; // 0: hidden, 1: visible
  createdAt: string;
  updatedAt: string;
}

export const createTask = async (
  userEmail: string,
  taskId: string,
  prompt: string,
  isPublic: number
) => {
  const db = getDb();
  await db
    .prepare(
      "insert into user_tasks(userEmail, taskId, prompt, isPublic) values(?,?,?,?)"
    )
    .bind(userEmail, taskId, prompt, isPublic)
    .run();
};

// 更新任务状态, 并返回影响行数
export const updateTask = async (
  taskId: string,
  taskStatus: number,
  audioUrl: string | null = null
): Promise<number> => {
  const db = getDb();
  const res = await db
    .prepare(
      "update user_tasks set taskStatus = ?, audioUrl =?, updatedAt=CURRENT_TIMESTAMP where taskId = ? and taskStatus=0"
    )
    .bind(taskStatus, audioUrl, taskId)
    .run();
  console.debug("updateTask res: ", res);
  return res.meta.changes;
};

export const taskSuccess = async (
  taskId: string,
  audioUrl: string | null
): Promise<boolean> => {
  const db = getDb();
  const res = await db
    .prepare(
      `update user_tasks
      set taskStatus = 1, audioUrl =?, updatedAt=CURRENT_TIMESTAMP
       where taskId=?`
    )
    .bind(audioUrl, taskId)
    .run();
  return res.meta.changes > 0;
};

export const taskFailed = async (taskId: string): Promise<boolean> => {
  const hasChanged = (await updateTask(taskId, STATUS.ERROR)) > 0;
  // task failed, refund credits
  if (hasChanged) {
    console.log("task failed, refund credits, taskId: ", taskId);
    const creditRecord = await getRecordByTaskId(taskId);
    if (!creditRecord) {
      console.error("credit record not found, taskId: ", taskId);
      return hasChanged;
    }
    await consumeCredit(
      creditRecord.user_email,
      -creditRecord.credit_amount,
      "refund",
      taskId
    );
  }
  return hasChanged;
};

export const getTasksByPage = async (
  userEmail: string,
  page: number = 1,
  page_size: number = 10
): Promise<UserTask[]> => {
  const db = getDb();
  const tasks = await db
    .prepare(
      "select * from user_tasks where userEmail = ? and taskStatus = 1 order by createdAt desc limit ? offset ?"
    )
    .bind(userEmail, page_size, (page - 1) * page_size)
    .all<UserTask>();
  return tasks.results;
};

export const getTasksCount = async (userEmail: string): Promise<number> => {
  const db = getDb();
  const row = await db
    .prepare(
      "select count(*) as count from user_tasks where userEmail = ? and taskStatus = 1"
    )
    .bind(userEmail)
    .first<{ count: number }>();
  return row?.count as number;
};

export const getByTaskId = async (taskId: string): Promise<UserTask | null> => {
  const db = getDb();
  const row = await db
    .prepare(
      "select * from user_tasks where taskId = ? order by id desc limit 1"
    )
    .bind(taskId)
    .first<UserTask>();
  return row;
};

export const getPendingTask = async (): Promise<UserTask | null> => {
  const db = getDb();

  // Calculate timestamp from 5 minutes ago
  const fiveMinutesAgo = new Date();
  fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 10);
  const fiveMinutesAgoStr = date2str(fiveMinutesAgo);

  const row = await db
    .prepare(
      "select * from user_tasks where taskStatus=0 and createdAt <= ? order by id desc limit 1"
    )
    .bind(fiveMinutesAgoStr)
    .first<UserTask>();
  return row;
};

export const bindTrialTask = async (userEmail: string, session_id: string) => {
  const db = getDb();
  await db
    .prepare(
      `insert into user_tasks(userEmail, taskId, taskStatus, prompt, audioUrl) 
      select '${userEmail}' as userEmail, taskId, taskStatus, prompt, audioUrl from guest_tasks where session_id=?`
    )
    .bind(session_id)
    .run();
};
