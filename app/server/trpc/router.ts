import { t } from "./init";
import { kieRouter } from "./biz/kie";
export const appRouter = t.router({
  kie: kieRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
