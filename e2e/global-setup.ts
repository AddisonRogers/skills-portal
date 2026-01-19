import { execSync } from "node:child_process";
import path from "node:path";

export default async function globalSetup() {

  execSync("npx dotenv -e .env.test -- npm run migrate", { stdio: "inherit" });

  execSync("npx dotenv -e .env.test -- npm run seed:e2e", { stdio: "inherit" });
}
