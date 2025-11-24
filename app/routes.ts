import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  // 多语言路由组
  ...prefix("/:locale?", [
    layout("routes/locale-layout.tsx", [
      route("/privacy-policy", "routes/support-pages/privacy-policy.tsx"),
      route(
        "/terms-and-conditions",
        "routes/support-pages/terms-and-conditions.tsx"
      ),
      index("routes/index.tsx"),
    ]),
  ]),

  route("*", "routes/not-found.tsx"),

  ...prefix("/api", [
    route("/auth/*", "routes/api/auth.ts"),
    route("/locales", "routes/api/locales.ts"),
    route("/trpc/*", "routes/api/trpc.ts"),
  ]),
] satisfies RouteConfig;
