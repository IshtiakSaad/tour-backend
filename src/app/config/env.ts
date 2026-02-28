import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV"];

  requiredEnvVariables.forEach(key => {
    if (!process.env[key]) {
      throw new Error(`Missing Env Variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  };
};

// wrap the call so we can log and exit with a sensible message instead of letting
// an uncaught exception bubble up into the loader (which ts-node-dev was
// rendering as a confusing object).
let envVars: EnvConfig;
try {
  envVars = loadEnvVariables();
} catch (err) {
  console.error("Error loading environment variables:", err);
  // kill process early so the watcher doesn't keep restarting infinitely
  process.exit(1);
}

export { envVars };
