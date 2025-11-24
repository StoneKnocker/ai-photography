import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import LocalizedLink from "./localized-link";
import LocalizedNavLink from "./localized-navlink";
import { HeaderLinks } from "./header";

export function HeaderMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-white/10">
          <Menu className="h-5 w-5 text-gray-200" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-[280px] p-0 bg-zinc-900/95 backdrop-blur-md border-white/20 text-gray-200"
      >
        <div
          className="flex items-center gap-2 p-4"
          onClick={() => setIsOpen(false)}
        >
          <LocalizedLink to="/">
            <LazyLoadImage
              src="/logo.svg"
              alt="website Logo"
              className="h-8 w-8 bg-white/90 rounded-md"
              width={24}
              height={24}
            />
          </LocalizedLink>
          <LocalizedLink to="/">
            <span className="text-lg font-extrabold text-amber-100 drop-shadow-[0px_0px_39px_rgba(255,0,123,0.9)]">
              {import.meta.env.VITE_SITE_NAME}
            </span>
          </LocalizedLink>
        </div>
        <nav
          className="flex flex-col gap-2 pl-8 pt-4"
          onClick={() => setIsOpen(false)}
        >
          <HeaderLinks />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
