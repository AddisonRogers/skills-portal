"use client"

import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {useUserInfo} from "@/hooks/useUserInfo";

export default function AvatarOrLogin() {
  const {loggedIn, user, userEmail, isAdmin} = useUserInfo();

  const userImg = user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name ?? "User")}&background=0D8ABC&color=fff`;


  return (
    loggedIn ? (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={userImg}/>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
            <Link href={"/profile"}>
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Statistics</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      // Log in button
      <div>

      </div>
    )
  )
}
