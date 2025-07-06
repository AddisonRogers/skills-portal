import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000"
})

export const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "microsoft",
    callbackURL: "/dashboard", // The URL to redirect to after the sign in
  });
};



export const { useSession } = authClient