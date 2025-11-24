import React from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { authClient } from "@/lib/auth-client";
import { Loader2, Music } from "lucide-react";
import showToast from "@/lib/toast";

interface LoginDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const LoginDialog = ({ trigger, open, onOpenChange }: LoginDialogProps) => {
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(open || false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Update internal state when open prop changes
  React.useEffect(() => {
    if (open !== undefined) {
      setLoginDialogOpen(open);
    }
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setLoginDialogOpen(newOpen);
    if (newOpen) {
      setIsLoading(false);
    }
    // Call the external onOpenChange handler if provided
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.href,
      });
    } catch (err) {
      showToast.error("Something went wrong, please try again later");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={loginDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border-0 p-0 w-full max-w-4xl bg-gray-900 shadow-2xl overflow-hidden">
        <div className="relative bg-gray-900 text-gray-200 rounded-xl shadow-2xl flex flex-col md:flex-row min-h-[600px]">
          {/* Close button */}
          <button
            onClick={() => handleOpenChange(false)}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Left side: Welcome section */}
          <div className="relative w-full md:w-2/5 bg-gradient-to-br from-red-500/20 to-red-500/5">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative h-full flex flex-col justify-between p-8">
              {/* Music icon section */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl"></div>
                  <Music className="relative h-32 w-32 text-red-400" />
                </div>
              </div>
              
              {/* Welcome text section */}
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome to Music Eleven
                </h2>
                <p className="text-gray-300 text-lg">
                  Your music journey starts here
                </p>
              </div>
            </div>
          </div>

          {/* Right side: Login form */}
          <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400">Sign in to access your music</p>
            </div>

            <div className="space-y-6">
              {/* Google login button */}
              <Button
                variant="outline"
                className="w-full h-12 bg-white hover:bg-gray-50 text-gray-800 border-gray-300 hover:border-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <FcGoogle className="mr-3 h-5 w-5" />
                    Continue with Google
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-gray-500 mt-8 pt-6 border-t border-gray-700">
                By signing in, you agree to our{" "}
                <Link
                  to="/terms-of-service"
                  className="text-red-500 hover:text-red-400 transition-colors"
                  onClick={() => handleOpenChange(false)}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-red-500 hover:text-red-400 transition-colors"
                  onClick={() => handleOpenChange(false)}
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
