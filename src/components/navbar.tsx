import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function Navbar() {


  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/skills">Skills</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>

          <NavigationMenuLink asChild>
            <Link href="/projects">Projects</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>


        <NavigationMenuItem>

          <NavigationMenuLink asChild>
            <Link href="/clients">Clients</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>


        <NavigationMenuItem>

          <NavigationMenuLink asChild>
            <Link href="/roles">Roles</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>

          <NavigationMenuLink asChild>
            <Link href="/people">People</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>


        <NavigationMenuItem>

          <NavigationMenuLink asChild>
            <Link href="/admin-panel">Admin Panel</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>


        <NavigationMenuItem>

          <NavigationMenuLink asChild>
            <Link href="/statistics">Statistics</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>


        <NavigationMenuItem>

          <NavigationMenuLink asChild>
            <Link href="/ai">AI</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>


        <NavigationMenuItem>

          <NavigationMenuLink asChild>
            <Link href="/opshub">Opshub</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>

          <NavigationMenuLink asChild>
            <Link href="/settings">Settings</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}