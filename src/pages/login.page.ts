import type { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  usernameInput = () => this.page.getByTestId("username");
  passwordInput = () => this.page.getByTestId("password");
  loginButton = () => this.page.getByRole("button", { name: "Login" });
  errorMessage = () => this.page.getByTestId("error");

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto("/");
    await this.waitForLoaded();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }
}
