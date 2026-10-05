import type { APIRequestContext } from "@playwright/test";
import type {
  ApiResult,
  LoginResponse,
  UserProfile,
} from "../schemas/auth.schema";
import { AuthClient } from "./auth.client";
import { UserClient } from "./user.client";

export class ApiClient {
  readonly auth: AuthClient;
  readonly users: UserClient;
  lastLogin: ApiResult<LoginResponse> | undefined;
  lastProfile: ApiResult<UserProfile> | undefined;

  constructor(context: APIRequestContext) {
    this.auth = new AuthClient(context);
    this.users = new UserClient(context);
  }

  setToken(token: string): void {
    this.auth.setToken(token);
    this.users.setToken(token);
  }
}
