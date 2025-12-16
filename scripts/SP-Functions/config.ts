export interface Config {
    roadmapPath: string;
    postgresUrl: string;
    s3Bucket: string;
    s3Region: string;
    s3AccessKeyId: string;
    s3SecretAccessKey: string;
}

export function loadConfig(): Config {
    const requiredVars = {
        ROADMAP_PATH: process.env.ROADMAP_PATH,
        POSTGRES_URL: process.env.POSTGRES_URL,
        S3_BUCKET: process.env.S3_BUCKET || process.env.AWS_BUCKET,
        S3_REGION: process.env.S3_REGION || process.env.AWS_REGION,
        S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
        S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
    };

    const missing = Object.entries(requiredVars)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }

    return {
        roadmapPath: requiredVars.ROADMAP_PATH!,
        postgresUrl: requiredVars.POSTGRES_URL!,
        s3Bucket: requiredVars.S3_BUCKET!,
        s3Region: requiredVars.S3_REGION!,
        s3AccessKeyId: requiredVars.S3_ACCESS_KEY_ID!,
        s3SecretAccessKey: requiredVars.S3_SECRET_ACCESS_KEY!,
    };
}
