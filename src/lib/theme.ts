import redis from "./redis";

export async function getUserTheme(userId: string): Promise<"light" | "dark"> {
  const key = `theme:${userId}`;
  const value = (await redis.get(key)) ?? "light";
  return value === "dark" ? "dark" : "light";
}

export async function setUserTheme(userId: string, theme: "light" | "dark"){
  const key = `theme:${userId}`;
  await redis.set(key, theme)
}