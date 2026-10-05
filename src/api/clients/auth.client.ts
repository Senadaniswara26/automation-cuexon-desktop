import type { APIRequestContext } from "@playwright/test";
import { ENDPOINTS } from "../endpoints";
import type {
  ApiResult,
  LoginRequest,
  LoginResponse,
} from "../schemas/auth.schema";
import { BaseClient } from "./base.client";

export class AuthClient extends BaseClient {
  constructor(context: APIRequestContext) {
    super(context);
  }

  async login(payload: LoginRequest): Promise<ApiResult<LoginResponse>> {
    return this.post<LoginResponse>(ENDPOINTS.auth.login, payload);
  }
}
