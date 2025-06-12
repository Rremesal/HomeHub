
import { useState } from "react";

// Core
import { Avatar } from "@heroui/avatar";
import Popover from "@/components/popover";

// Hooks
import useTheme from "@/components/hooks/theme.hook";
import useAuth from "@/components/hooks/auth.hook";

// Icons
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { MoonIcon, SunIcon, UserCircleIcon } from "@heroicons/react/24/outline";

function NavAvatar() {
  const { theme, changeTheme } = useTheme();
  const { currentUser, logout } = useAuth();

  const items = [
    {
      content: currentUser?.fullName,
    },
    {
      content: theme === "dark" ? "Light" : "Dark",
      icon: theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />,
      onClick: changeTheme,
    },
    {
      content: "Profile",
      icon: <UserCircleIcon className="size-5"/>,
      href: "/profile"
    }, 
    {
      content: "Logout",
      icon: <ArrowLeftEndOnRectangleIcon className="size-5" />,
      onClick: logout,
    }
  ];

  return (
    <Popover
      triggerComponent={<Avatar/>}
      items={items}
    />
  );
}

export default NavAvatar;
