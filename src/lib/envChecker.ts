import "server-only";

const REQUIRED_ENV_KEYS = [
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL"
] as const;

export function getMissingRequiredEnv(): string[] {
    return REQUIRED_ENV_KEYS.filter((key) => {
        const v = process.env[key];
        return !v || v.trim().length === 0;
    });
}