import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const UsernameMenu = () => {
  const { logout, user } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold text-orange-500 gap-2">
        <Avatar>
          <AvatarImage src={user?.picture} alt="avatar" sizes="10px" />
          <AvatarFallback>Avatar User</AvatarFallback>
        </Avatar>
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white outline-none ring-0">
        <DropdownMenuItem>
          <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button onClick={async () => await logout()} className="flex flex-1 font-bold bg-orange-500">
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
