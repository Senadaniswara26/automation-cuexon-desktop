import type { APIRequestContext } from "@playwright/test";
import { ENDPOINTS } from "../endpoints";
import type { ApiResult, UserProfile } from "../schemas/auth.schema";
import { BaseClient } from "./base.client";

export class UserClient extends BaseClient {
  constructor(context: APIRequestContext) {
    super(context);
  }

  async getProfile(): Promise<ApiResult<UserProfile>> {
    return this.get<UserProfile>(ENDPOINTS.users.profile);
  }
}
