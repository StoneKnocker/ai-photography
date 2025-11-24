import { Outlet, useParams } from "react-router";
import NotFoundPage from "@/routes/not-found";
import type { Route } from "./+types/locale-layout";
import { supportedLngs } from "~/config/i18n";

export default function LocaleLayout({ request }: Route.LoaderArgs) {
  const { locale: localeFromRoute } = useParams();

  if (localeFromRoute && !supportedLngs.includes(localeFromRoute)) {
    return <NotFoundPage />;
  }
  return <Outlet />;
}
