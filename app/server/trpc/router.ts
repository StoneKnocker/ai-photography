import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { type Context } from "./context";
import { getRequestContext } from "~/server/cf.server";
import { kieRouter } from "./biz/kie";
type User = {
  id: string;
  name: string;
  bio?: string;
};

export const t = initTRPC.context<Context>().create();
export const appRouter = t.router({
  kie: kieRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
