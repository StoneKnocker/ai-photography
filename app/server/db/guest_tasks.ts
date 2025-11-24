import { STATUS } from "@/lib/consts";
import { getDb } from "./db";

export interface GuestTask {
  id: number;
  ip: string; // IP address of the guest user
  sessionId: string; // Unique session ID for guest users
  taskId: string; // Task ID for tracking
  taskStatus: number; // 0: pending 1: success 2: failed
  audioUrl: string | null; // Generated audio URL
  streamAudioUrl: string | null; // Streaming audio URL
  imageUrl: string | null; // Generated image URL
  prompt: string | null; // Prompt provided by the guest user
  title: string | null; // Task title
  tags: string | null; // JSON array of tags
  duration: number; // Duration in seconds
  createdAt: string;
  updatedAt: string;
}

export const createGuestTask = async (
  ip: string,
  sessionId: string,
  taskId: string,
  prompt: string
) => {
  const db = getDb();
  await db
    .prepare(
      "insert into guest_tasks(ip, sessionId, taskId, prompt) values(?,?,?,?)"
    )
    .bind(ip, sessionId, taskId, prompt)
    .run();
};

export const getGuestTask = async (
  ip: string,
  sessionId: string
): Promise<GuestTask | null> => {
  const db = getDb();
  const row = await db
    .prepare("select * from guest_tasks where ip = ? or sessionId = ?")
    .bind(ip, sessionId)
    .first<GuestTask>();
  return row;
};

export const getGuestTaskByTaskId = async (
  taskId: string
): Promise<GuestTask | null> => {
  const db = getDb();
  const row = await db
    .prepare("select * from guest_tasks where taskId = ?")
    .bind(taskId)
    .first<GuestTask>();
  return row;
};

export const updateGuestTask = async (
  taskId: string,
  taskStatus: number,
  audioUrl?: string,
  streamAudioUrl?: string,
  imageUrl?: string,
  duration?: number
): Promise<number> => {
  const db = getDb();
  const res = await db
    .prepare(
      `update guest_tasks 
       set taskStatus = ?, 
           audioUrl = COALESCE(?, audioUrl), 
           streamAudioUrl = COALESCE(?, streamAudioUrl), 
           imageUrl = COALESCE(?, imageUrl), 
           duration = COALESCE(?, duration), 
           updatedAt = CURRENT_TIMESTAMP 
       where taskId = ? and taskStatus = 0`
    )
    .bind(taskStatus, audioUrl, streamAudioUrl, imageUrl, duration, taskId)
    .run();
  console.debug("updateGuestTask res: ", res);
  return res.meta.changes;
};

export const guestTaskSuccess = async (
  taskId: string,
  audioUrl?: string,
  streamAudioUrl?: string,
  imageUrl?: string,
  duration?: number,
  title?: string,
  tags?: string
) => {
  const db = getDb();
  const res = await db
    .prepare(
      `update guest_tasks
       set taskStatus = 1, 
           audioUrl = COALESCE(?, audioUrl), 
           streamAudioUrl = COALESCE(?, streamAudioUrl), 
           imageUrl = COALESCE(?, imageUrl), 
           duration = COALESCE(?, duration),
           title = COALESCE(?, title),
           tags = COALESCE(?, tags),
           updatedAt = CURRENT_TIMESTAMP
       where taskId = ?`
    )
    .bind(audioUrl, streamAudioUrl, imageUrl, duration, title, tags, taskId)
    .run();
  console.debug("taskSuccess res: ", res);
};

export const guestTaskFailed = async (taskId: string) => {
  const db = getDb();
  const res = await db
    .prepare(
      `update guest_tasks 
       set taskStatus = 2, 
           updatedAt = CURRENT_TIMESTAMP 
       where taskId = ?`
    )
    .bind(taskId)
    .run();
  console.debug("taskFailed res: ", res);
};
