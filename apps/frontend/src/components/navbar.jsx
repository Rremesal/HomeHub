// icons
import NavAvatar from "@/modules/navigation/nav_avatar";
import { Link } from "@heroui/link";


function NavBar() {
  return (
    <nav className=" h-navbar flex justify-between items-center p-1 border-b-2 shadow-md border-primary-500 bg-background">
      <Link href="/" color="foreground" isBlock>
        Home
      </Link>

      <NavAvatar />
    </nav>
  )
}

export default NavBar;