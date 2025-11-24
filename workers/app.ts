import { createRequestHandler } from "react-router";
import { getRequestContext } from "../app/server/cf.server";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    const cf = { env, ctx };
    getRequestContext(cf);
    return requestHandler(request, {
      cloudflare: cf,
    });
  },
} satisfies ExportedHandler<Env>;
