import type { Route } from "./+types/index";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Play,
  Skull,
  ShoppingCart,
  Flashlight,
  Users,
  Clock,
  Star,
  ExternalLink,
  Download,
  Target,
  Box,
  MessageCircle,
  Heart,
  MapPin,
  Music,
  Settings,
  Globe,
  Crown,
} from "lucide-react";
import Header from "~/components/header";
import { getCanonical, getHreflangs } from "~/lib/buildLink";
import { fallbackLng, supportedLngs } from "~/config/i18n";
import Footer from "~/components/footer";

export async function loader({ request, params }: Route.LoaderArgs) {
  const locale = params.locale || fallbackLng;

  return {
    locale,
    title: "Example Home Page",
    description:"Welcome to the Example Home Page",
  };
}

export function meta({ data }: { data: Awaited<ReturnType<typeof loader>> }) {
  const hreflangs = getHreflangs("/", supportedLngs);

  return [
    { title: data.title },
    {
      name: "description",
      content: data.description,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: getCanonical(data.locale, "/"),
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
  return (
    <>
      <Header />
      Home page
      <Footer />
    </>
  );
}
