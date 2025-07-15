import { Fragment } from "react";

// Core
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Link } from "@heroui/link";
import Popover from "./popover";
import ThemeSwitch from "./theme_switch";

// Hooks
import useAuth from "@/hooks/auth";

function Navbar() {
  const { currentUser, logout } = useAuth();
  
  return (
    <Fragment>
      <nav className="h-[52px] bg-primary-500 flex items-center justify-between px-2">
        <div className="flex gap-1">
          <Link isBlock href="#">Home</Link>

          <Link isBlock href="/users">User management</Link>
        </div>
        
        <Popover 
          trigger={<Avatar />}
        >
          <ul className="flex flex-col gap-1">
            <li className="text-foreground">{currentUser?.fullName}</li>
            <li>
              <ThemeSwitch />
            </li>
            <li>
              <Button size="sm" fullWidth color="danger" onPress={logout}>Logout</Button>
            </li>
          </ul>
        </Popover>
      </nav>
    </Fragment>
  )
}

export default Navbar;
