import { PassThrough } from "node:stream";

import type { EntryContext } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import {
  renderToPipeableStream,
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

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get("user-agent");

    const readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode
        ? "onAllReady"
        : "onShellReady";

    const { pipe, abort } = renderToPipeableStream(
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={instance}>
          <ServerRouter context={routerContext} url={request.url} />
        </I18nextProvider>
      </QueryClientProvider>,
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) console.error(error);
        },
      }
    );

    setTimeout(abort, streamTimeout + 1000);
  });
}
