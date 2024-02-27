import MobileNavLinks from "../MobileNavLinks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu } from "lucide-react";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2 text-orange-500">
              <Avatar>
                <AvatarImage src={user?.picture} />
                <AvatarFallback>Avatar User</AvatarFallback>
              </Avatar>
              {user?.email}
            </span>
          ) : (
            <span> Welcome to MernEats.com!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button onClick={() => loginWithRedirect()} className="flex-1 font-bold bg-orange-500 text-white">
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
