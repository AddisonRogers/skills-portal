"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Book, Server, Code2 } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    name: "Frontend",
    icon: <Code2 className="w-4 h-4 mr-2" />,
    href: "/courses/frontend",
  },
  {
    name: "Backend",
    icon: <Server className="w-4 h-4 mr-2" />,
    href: "/courses/backend",
  },
  {
    name: "General",
    icon: <Book className="w-4 h-4 mr-2" />,
    href: "/courses/general",
  },
];

export default function SkillsSidebar() {
  return (
    <aside className="w-56 min-h-screen shrink-0 border-r bg-white flex flex-col py-6 px-4">
      <NavigationMenu orientation="vertical" className="w-full items-start">
        <NavigationMenuList className="flex flex-col gap-2 w-full ">
          {courses.map(({ name, icon, href }) => (
            <NavigationMenuItem key={name} className="w-full">
                <NavigationMenuLink
                  className={cn(
                    "flex items-center w-full py-2 px-3 rounded-md hover:bg-gray-100 transition-colors",
                    // add more classes for active state if needed
                  )}
                >
                  <Link href={href}>
                    {icon}{name}
                  </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
}