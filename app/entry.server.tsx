import type { EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import {
  renderToReadableStream,
} from "react-dom/server";
import { QueryClientProvider } from "@tanstack/react-query";
import { createInstance } from "i18next";
import i18nServer from "./server/i18n.server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import * as i18n from "./config/i18n";
import { queryClient } from "./lib/query-client";

export const streamTimeout = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext
  // If you have middleware enabled:
  // loadContext: unstable_RouterContextProvider
) {
  const instance = createInstance();
  const lng = await i18nServer.getLocale(request);
  const ns = i18nServer.getRouteNamespaces(routerContext);

  await instance.use(initReactI18next).init({ ...i18n, lng, ns });

  let hustonWeHaveAProblem = false;

  const stream = await renderToReadableStream(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={instance}>
        <ServerRouter context={routerContext} url={request.url} />
      </I18nextProvider>
    </QueryClientProvider>,
    {
      onError(error) {
        console.error("Error during rendering:", error);
        hustonWeHaveAProblem = true;
      },
      bootstrapScriptContent: `window.ENV = ${JSON.stringify({
        LANGUAGE: instance.language,
        NAMESPACES: Object.keys(instance.options.ns || {}),
      })};`,
    }
  );

  const userAgent = request.headers.get("user-agent");
  if (isbot(userAgent)) {
    await stream.allReady;
  }

  return new Response(stream, {
    status: hustonWeHaveAProblem ? 500 : responseStatusCode,
    headers: responseHeaders,
  });
}
