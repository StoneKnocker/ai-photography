import { z } from "zod";
import { t } from "../init";
import { getRequestContext } from "~/server/cf.server";
import {
  createGuestTask,
  getGuestTaskByTaskId,
  updateGuestTask,
  guestTaskSuccess,
  guestTaskFailed,
} from "~/server/db/guest_tasks";
import { STATUS } from "~/lib/consts";

const MusicGenerationSchema = z.object({
  prompt: z.string(),
  style: z.string().optional(),
  title: z.string().optional(),
  customMode: z.boolean().optional(),
  instrumental: z.boolean().optional(),
  model: z.string().optional(),
  callBackUrl: z.string().optional(),
  negativeTags: z.string().optional(),
  sessionId: z.string(),
});

const MusicResponseSchema = z.object({
  code: z.number(),
  msg: z.string(),
  data: z.object({
    taskId: z.string(),
  }),
});

const TaskStatusResponseSchema = z.object({
  code: z.number(),
  msg: z.string(),
  data: z.object({
    taskId: z.string(),
    status: z.string(),
    response: z.object({
      sunoData: z.array(
        z.object({
          id: z.string(),
          audioUrl: z.string(),
          streamAudioUrl: z.string(),
          imageUrl: z.string(),
          prompt: z.string(),
          title: z.string(),
          tags: z.string(),
          duration: z.number(),
          createTime: z.string(),
        })
      ),
    }),
  }),
});

export const kieRouter = t.router({
  generateMusic: t.procedure
    .input(MusicGenerationSchema)
    .mutation(async (opts) => {
      const { input } = opts;
      const cf = getRequestContext();

      try {
        // Call KIE AI API
        const response = await fetch("https://api.kie.ai/api/v1/generate", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cf.env.KIE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: input.prompt,
            style: input.style || "Classical",
            title: input.title || "Generated Music",
            customMode: input.customMode ?? true,
            instrumental: input.instrumental ?? true,
            model: input.model || "V3_5",
            callBackUrl: input.callBackUrl,
            negativeTags: input.negativeTags || "",
            sessionId: input.sessionId,
          }),
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const result = await response.json();
        const validatedResult = MusicResponseSchema.parse(result);

        if (validatedResult.code !== 200) {
          throw new Error(`API error: ${validatedResult.msg}`);
        }

        // Save to guest_tasks table
        const taskId = validatedResult.data.taskId;

        // Get client IP address
        const clientIp =
          opts.ctx.req.headers.get("cf-connecting-ip") ||
          opts.ctx.req.headers.get("x-forwarded-for") ||
          opts.ctx.req.headers.get("x-real-ip") ||
          "";

        // todo 根据登录状态决定是 guest_task 还是 user_task
        await createGuestTask(clientIp, input.sessionId, taskId, input.prompt);
        // todo 扣积分

        return {
          taskId: taskId,
        };
      } catch (error) {
        console.error("Music generation error:", error);
        throw new Error(
          `Failed to generate music: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }),

  getTaskStatus: t.procedure
    .input(z.object({ taskId: z.string() }))
    .query(async (opts) => {
      const { taskId } = opts.input;
      const cf = getRequestContext();

      try {
        // Call KIE AI API to get task status
        const response = await fetch(
          `https://api.kie.ai/api/v1/generate/record-info?taskId=${taskId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cf.env.KIE_API_KEY}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const result = await response.json();
        const validatedResult = TaskStatusResponseSchema.parse(result);

        if (validatedResult.code !== 200) {
          throw new Error(`API error: ${validatedResult.msg}`);
        }

        const taskStatus = validatedResult.data.status;
        const sunoData = validatedResult.data.response.sunoData[0];

        // Update database based on task status
        // todo 根据登录状态决定是 guest_task 还是 user_task
        if (taskStatus === "SUCCESS") {
          await guestTaskSuccess(
            taskId,
            sunoData.audioUrl,
            sunoData.streamAudioUrl,
            sunoData.imageUrl,
            sunoData.duration,
            sunoData.title,
            sunoData.tags
          );
          return {
            status: STATUS.SUCCESS,
            data: sunoData,
          };
        } else if (taskStatus.includes("FAILED")) {
          await guestTaskFailed(taskId);
          // todo 积分退回
          return {
            status: STATUS.ERROR,
          };
        }
        return {
          status: STATUS.INIT,
        };
      } catch (error) {
        console.error("Get task status error:", error);
        throw new Error(
          `Failed to get task status: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }),
});
