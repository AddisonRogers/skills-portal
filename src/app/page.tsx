"use client"

import {useSession} from "@/lib/auth-client";
import {useEffect} from "react";

export default function Home() {
  const { isPending, data } = useSession();
  const status = isPending ? "loading" : "authenticated";
  const user = data?.user;

  // Get data from backend with user info
  // Otherwise show default



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Kill yourself
    </div>
  );
}
