"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Assumes you have a cn util for merging classes

const navLinks = [
  { name: "Skills", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Clients", href: "/clients" },
  { name: "Roles", href: "/roles" },
  { name: "People", href: "/people" },
  { name: "Admin Panel", href: "/admin-panel" },
  { name: "Statistics", href: "/statistics" },
  { name: "AI", href: "/ai" },
  { name: "Opshub", href: "https://operations.fsp.team/" },
  { name: "Settings", href: "/settings" },
];

export default function Navbar() {
  // TODO Conditionally render admin panel on the user's role

  return (
    <nav className="w-full bg-white/70 backdrop-blur border-b border-gray-200 shadow-sm py-4 px-8 sticky top-0 z-50">
      <NavigationMenu className="max-w-7xl mx-auto w-full">
        <NavigationMenuList className="flex justify-between items-center w-full gap-4">
          {navLinks.map((link) => (
            <NavigationMenuItem key={link.href} className="flex-1 flex justify-center">
              <NavigationMenuLink asChild>
                <Link
                  href={link.href}
                  className={cn(
                    "inline-block rounded-md px-4 py-2 font-medium text-gray-700 hover:text-primary hover:bg-primary/10 transition-colors duration-150",
                    // Optionally more styling for active state below
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  )}
                >
                  {link.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}