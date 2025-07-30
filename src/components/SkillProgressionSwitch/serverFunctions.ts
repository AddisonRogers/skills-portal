"use server"

import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export async function changeSkillProgression(value: string) {
  const session = await auth.api.getSession({
    headers: await headers() // some endpoint might require headers
  })

  const userEmail = session?.user?.email

}