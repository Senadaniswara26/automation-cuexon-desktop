import { expect } from "@playwright/test";
import { Given } from "./fixtures";
import { env } from "../utils/env";

Given("the test environment is configured", async () => {
  expect(["staging", "production"]).toContain(env.testEnv);
});
