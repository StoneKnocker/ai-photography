import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  redirect,
} from "react-router";
import i18nServer, { localeCookie } from "./server/i18n.server";
import { useChangeLanguage } from "remix-i18next/react";
import type { Route } from "./+types/root";
import "./app.css";
import { Toaster } from "./components/ui/sonner";
import {
  AdsenseScript,
  PlausibleAnalytics,
  ClarityAnalytics,
  GoogleAnalytics,
} from "./components/analytics";

export const handle = { i18n: ["common"] };

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  // 检查是否为 /en/ 开头的路径，如果是则重定向到去掉 /en 的路径
  if (url.pathname.startsWith("/en/") || url.pathname === "/en") {
    const pathWithoutEn = url.pathname.replace(/^\/en/, "") || "/";
    const newUrl = pathWithoutEn + url.search + url.hash;
    return redirect(newUrl, { status: 301 });
  }

  const locale = await i18nServer.getLocale(request);
  console.log("locale in loader:", locale, "URL:", request.url);
  return data(
    { locale },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } }
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData<typeof loader>("root");

  return (
    <html lang={loaderData?.locale ?? "en"}>
      <head>
        <link rel="icon" type="image/png" href="/logo.svg" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Analytics Scripts */}
        <AdsenseScript pubId="" />
        <PlausibleAnalytics domain={import.meta.env.VITE_DOMAIN} />
        <ClarityAnalytics clarityId="" />
        <GoogleAnalytics GA_MEASUREMENT_ID="" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  useChangeLanguage(loaderData.locale);
  return <Outlet />;
}
