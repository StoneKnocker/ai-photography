import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import LocalizedNavLink from "@/components/localized-navlink";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer
      className={cn(
        "bg-gray-100/80 backdrop-blur-md border-t border-gray-200 text-gray-700 py-6"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-lg font-semibold flex items-center gap-2">
            <LocalizedNavLink to="/">
              <LazyLoadImage
                src="/logo.svg"
                alt="website Logo"
                className="h-8 w-8 bg-white/90 rounded-md"
                width={24}
                height={24}
              />
            </LocalizedNavLink>
            {import.meta.env.VITE_SITE_NAME}
          </div>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <LocalizedNavLink
              to="/privacy-policy"
              className="text-sm hover:text-gray-900 transition-colors"
            >
              {t("privacy")}
            </LocalizedNavLink>
            <LocalizedNavLink
              to="/terms-and-conditions"
              className="text-sm hover:text-gray-900 transition-colors"
            >
              {t("terms")}
            </LocalizedNavLink>
          </div>
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          © {new Date().getFullYear()} {import.meta.env.VITE_SITE_NAME}. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
