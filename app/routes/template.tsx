import { useTranslation } from "react-i18next";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { Button } from "~/components/ui/button";
import toast from "~/lib/toast";
import { trpc } from "~/lib/trpc-client";

import type { Route } from "./+types/home";
import { getCanonical, getHreflangs } from "~/lib/buildLink";
import { fallbackLng, supportedLngs } from "~/config/i18n";
import i18nServer from "~/server/i18n.server";

export async function loader({ request, params }: Route.LoaderArgs) {
  const locale = params.locale || fallbackLng;

  return {
    locale,
    title: "",
    description: "",
  };
}

export function meta({ data }: { data: Awaited<ReturnType<typeof loader>> }) {
  const slug = "/hello";
  const hreflangs = getHreflangs(slug, supportedLngs);

  return [
    { title: data.title },
    {
      name: "description",
      content: data.description,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: getCanonical(data.locale, slug),
    },
    // hreflang alternate links
    ...Object.entries(hreflangs).flatMap(([lang, url]) => [
      {
        tagName: "link",
        rel: "alternate",
        hrefLang: lang,
        href: url,
      },
    ]),
  ];
}

export default function HomePage() {
  const { t, i18n } = useTranslation("home");

  const handleClick = async () => {
    const data = await trpc.getUserById.query("1");
    toast.success(JSON.stringify(data));
  };

  return (
    <>
      <Header />
      <div className="text-center">
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.subtitle")}</p>
        <Button onClick={handleClick}>toaster</Button>
      </div>
      <Footer />
    </>
  );
}
