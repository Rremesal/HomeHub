import { Fragment } from "react";

// Core
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import Popover from "./popover";

// Hooks
import useAuth from "@/hooks/auth";
import { Link } from "@heroui/link";

function Navbar() {
  const { currentUser, logout } = useAuth();
  
  return (
    <Fragment>
      <nav className="h-[52px] bg-primary-500 flex items-center justify-between px-2">
        <Link isBlock href="#">Home</Link>
        
        <Popover 
          trigger={<Avatar />}
        >
          <ul>
            <li>{currentUser?.fullName}</li>
            <li>
              <Button fullWidth color="danger" onPress={logout}>Logout</Button>
            </li>
          </ul>
        </Popover>
      </nav>


    </Fragment>
  )
}

export default Navbar;
