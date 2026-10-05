import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Account, AccountStore, Role, TestEnvironment } from "../types";
import { env } from "./env";

const accountFile = resolve(process.cwd(), "src/data/accounts/accounts.json");

function isAccount(value: unknown): value is Account {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const account = value as Record<string, unknown>;
  return (
    typeof account.username === "string" && typeof account.password === "string"
  );
}

export function getAccount(role: Role): Account {
  const environment = (process.env.TEST_ENV || env.testEnv) as TestEnvironment;
  let accounts: AccountStore;

  try {
    accounts = JSON.parse(readFileSync(accountFile, "utf8")) as AccountStore;
  } catch (error) {
    throw new Error(
      `Could not read ${accountFile}. Copy accounts.example.json to accounts.json and set the ${environment}.${role} credentials. ${String(error)}`,
      { cause: error },
    );
  }

  const account: unknown = accounts[environment]?.[role];
  if (!isAccount(account) || !account.username || !account.password) {
    throw new Error(
      `Account "${role}" for TEST_ENV="${environment}" is missing or incomplete in ${accountFile}.`,
    );
  }
  return account;
}
