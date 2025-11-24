import { useState } from "react";
import LocalizedNavLink from "@/components/localized-navlink";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "./ui/button";
import LoginDialog from "./login-dialog";
import { UserDropdown } from "./user-dropdown";
import { useAuth } from "@/lib/hooks/use-auth";

// 导航链接配置
const navLinks = [
  { to: "/#workspace", label: "Workspace" },
  { to: "/#features", label: "Features" },
  { to: "/#example-video", label: "Example" },
];

// 导航链接组件
const NavLinks = ({
  onItemClick,
  isMobile = false,
}: {
  onItemClick?: () => void;
  isMobile?: boolean;
}) => (
  <>
    {navLinks.map((link) => (
      <LocalizedNavLink
        key={link.to}
        to={link.to}
        className={`text-gray-300 hover:text-white transition-colors ${
          isMobile ? "block py-3 text-lg" : ""
        }`}
        onClick={onItemClick}
      >
        {link.label}
      </LocalizedNavLink>
    ))}
  </>
);

export default function Header() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <>
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side: Mobile Menu + Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              {/* Logo and Site Name */}
              <div className="flex items-center gap-2">
                <div className="hidden md:block flex-shrink-0">
                  <LocalizedNavLink to="/">
                    <LazyLoadImage
                      src="/logo.svg"
                      alt="website Logo"
                      className="h-8 w-8 bg-white/90 rounded-md"
                      width={24}
                      height={24}
                    />
                  </LocalizedNavLink>
                </div>
                <LocalizedNavLink to="/">
                  <span className="text-lg font-extrabold text-amber-100 drop-shadow-[0px_0px_39px_rgba(255,0,123,0.9)]">
                    {import.meta.env.VITE_SITE_NAME}
                  </span>
                </LocalizedNavLink>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLinks isMobile={false} />
            </div>

            {/* Auth Buttons */}
            <nav className="flex items-center space-x-3">
              {isLoading ? (
                <div className="w-20 h-10 bg-gray-700 rounded animate-pulse"></div>
              ) : isAuthenticated && user ? (
                <UserDropdown />
              ) : (
                <LoginDialog
                  trigger={
                    <Button variant="outline" size="sm">
                      <p className="text-gray-600">Sign in</p>
                    </Button>
                  }
                  open={isLoginDialogOpen}
                  onOpenChange={setIsLoginDialogOpen}
                />
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Side Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Side Panel */}
          <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out border-r border-gray-700">
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <LocalizedNavLink
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg font-extrabold text-amber-100 drop-shadow-[0px_0px_39px_rgba(255,0,123,0.9)]">
                    {import.meta.env.VITE_SITE_NAME}
                  </span>
                </LocalizedNavLink>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-4">
                <NavLinks
                  onItemClick={() => setIsMobileMenuOpen(false)}
                  isMobile={true}
                />
              </nav>
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="fixed inset-0 bg-transparent"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ marginLeft: "16rem" }}
          />
        </div>
      )}
    </>
  );
}
