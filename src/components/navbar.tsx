import Link from "next/link";
import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"; // Assumes you have a cn util for merging classes
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

const navLinks = [
  {name: "Home", href: "/"},
  {name: "Learn", href: "/learn"},
  {name: "Projects", href: "/projects"},
  {name: "People", href: "/people"},

  {name: "Admin Panel", href: "/admin-panel"},

];

export default function Navbar() {
  // TODO Conditionally render admin panel on the user's role


  return (
    <nav className="flex w-full px-4 bg-muted backdrop-blur border-b border-gray-200 shadow-sm sticky justify-between items-center">
      <div className="flex items-start justify-baseline">


        {navLinks.map((link) => (
          <Link
            href={link.href}
            className={cn(
              "inline-block px-4 py-2 font-medium text-black transition-colors duration-150 relative",
              "hover:text-primary hover:font-semibold" +
              " focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
              "after:content-[''] after:block after:h-[2px] after:bg-primary after:scale-x-0 after:transition-transform after:duration-200 after:absolute after:left-0 after:right-0 after:-bottom-1 hover:after:scale-x-100"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="inline-block px-4 py-2 font-medium text-black mt-1">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/10214025?v=4"/>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </nav>
  );
}