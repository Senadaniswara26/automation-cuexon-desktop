import dotenv from "dotenv";
import type { TestEnvironment } from "../types";

dotenv.config();

function getUrl(name: string, fallback: string): string {
  const value = process.env[name] || fallback;
  try {
    new URL(value);
  } catch {
    throw new Error(
      `Environment variable ${name} must be a valid URL; received "${value}".`,
    );
  }
  return value;
}

const configuredEnvironment = process.env.TEST_ENV || "staging";
if (!["staging", "production"].includes(configuredEnvironment)) {
  throw new Error(
    `TEST_ENV must be "staging" or "production"; received "${configuredEnvironment}".`,
  );
}

const configuredHeadless = (process.env.HEADLESS || "true").toLowerCase();
if (!["true", "false"].includes(configuredHeadless)) {
  throw new Error(
    `HEADLESS must be "true" or "false"; received "${configuredHeadless}".`,
  );
}

export const env = {
  testEnv: configuredEnvironment as TestEnvironment,
  baseUrl: getUrl("BASE_URL", "https://www.saucedemo.com"),
  registrationBaseUrl: getUrl(
    "REGISTRATION_BASE_URL",
    "https://miesspasuruan.tech",
  ),
  apiBaseUrl: getUrl("API_BASE_URL", "https://dummyjson.com"),
  headless: configuredHeadless === "true",
};
