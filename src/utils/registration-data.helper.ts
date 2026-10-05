import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { RegistrationData } from "../types";

const registrationFile = resolve(
  process.cwd(),
  "src/data/test-data/registration.wayan.json",
);

export function getRegistrationData(): RegistrationData {
  let data: RegistrationData;

  try {
    data = JSON.parse(
      readFileSync(registrationFile, "utf8"),
    ) as RegistrationData;
  } catch (error) {
    throw new Error(
      `Could not read ${registrationFile}. Copy registration.example.json to registration.json and provide the account data.`,
      { cause: error },
    );
  }

  const missingFields = Object.entries(data)
    .filter(([, value]) => typeof value !== "string" || !value.trim())
    .map(([key]) => key);

  if (missingFields.length > 0) {
    throw new Error(
      `Registration data is missing required values: ${missingFields.join(", ")}.`,
    );
  }

  return data;
}
