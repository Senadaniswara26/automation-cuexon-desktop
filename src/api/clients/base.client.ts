import type { APIRequestContext, APIResponse } from "@playwright/test";
import type { ApiResult } from "../schemas/auth.schema";
import { logger } from "../../utils/logger";

export abstract class BaseClient {
  private token: string | undefined;

  protected constructor(protected readonly context: APIRequestContext) {}

  setToken(token: string): void {
    this.token = token;
  }

  protected async get<T>(path: string): Promise<ApiResult<T>> {
    const startedAt = Date.now();
    const response = await this.context.get(path, { headers: this.headers() });
    return this.toResult<T>("GET", path, response, startedAt);
  }

  protected async post<T>(path: string, body: unknown): Promise<ApiResult<T>> {
    const startedAt = Date.now();
    const response = await this.context.post(path, {
      data: body,
      headers: this.headers(),
    });
    return this.toResult<T>("POST", path, response, startedAt);
  }

  private headers(): Record<string, string> {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  private async toResult<T>(
    method: string,
    path: string,
    response: APIResponse,
    startedAt: number,
  ): Promise<ApiResult<T>> {
    logger.info(
      `${method} ${path} -> ${response.status()} (${Date.now() - startedAt} ms)`,
    );
    return {
      status: response.status(),
      body: (await response.json()) as T,
    };
  }
}
