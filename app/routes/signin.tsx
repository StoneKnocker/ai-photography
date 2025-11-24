import { authClient } from "@/lib/auth-client";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types";

export async function loader({ request, params }: Route.LoaderArgs) {
  console.log("当前模式:", import.meta.env.MODE);
  console.log("开发环境:", import.meta.env.DEV);
  console.log("env:", import.meta.env);

  return {};
}

export default function SignIn() {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button onClick={signIn}>Sign in with Google</Button>
    </div>
  );
}
