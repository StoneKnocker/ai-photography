import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { LocalizedLink } from "@/components/localized-link";
import { useAuth } from "@/lib/hooks/use-auth";

export function UserDropdown() {
  const { user, signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none flex items-center gap-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-gray-500 text-white">
            {user?.name?.charAt(0).toUpperCase() ||
              user?.email?.charAt(0).toUpperCase() ||
              "U"}
          </AvatarFallback>
        </Avatar>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LocalizedLink to={"/my-music"}>My Music</LocalizedLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={signOut}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
