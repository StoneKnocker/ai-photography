import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

import { queryClient } from "@/lib/query-client";

export function useAuth() {
  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth-session"],
    queryFn: async () => {
      try {
        const result = await authClient.getSession();
        return result.data;
      } catch (error) {
        console.error("Error fetching session:", error);
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  const signIn = async (provider: "google") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: window.location.href,
      });
      // Invalidate the session query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["auth-session"] });
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
      // Clear the session from cache
      queryClient.setQueryData(["auth-session"], null);
      queryClient.invalidateQueries({ queryKey: ["auth-session"] });
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return {
    user: session?.user,
    session,
    isLoading,
    error,
    signIn,
    signOut,
    isAuthenticated: !!session?.user,
  };
}
