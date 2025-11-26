import { useState } from "react";
import LocalizedNavLink from "@/components/localized-navlink";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "./ui/button";
import LoginDialog from "./login-dialog";
import { UserDropdown } from "./user-dropdown";
import { useAuth } from "@/lib/hooks/use-auth";

export default function Header() {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <>
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          Homepage</div>
      </header>
    </>
  );
}
