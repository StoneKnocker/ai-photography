import LocalizedLink from "@/components/localized-link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation("not-found");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md w-full space-y-6">
        <div className="flex justify-center mb-4">
          <AlertTriangle
            className="w-24 h-24 text-destructive"
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>

        <p className="text-muted-foreground text-lg">{t("description")}</p>

        <div className="flex justify-center space-x-4">
          <Button asChild>
            <LocalizedLink to="/">{t("returnHome")}</LocalizedLink>
          </Button>

          {/* <Button asChild>
            <Link to="/contact">{t("contactSupport")}</Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
}
