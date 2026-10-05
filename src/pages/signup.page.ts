import type { Page } from "@playwright/test";
import type { RegistrationData } from "../types";
import { BasePage } from "./base.page";

export class SignupPage extends BasePage {
  whatsappInput = () => this.page.getByLabel("Nomor WhatsApp");
  emailInput = () => this.page.getByLabel("Email");
  passwordInput = () => this.page.getByLabel("Password");
  ownerNameInput = () => this.page.getByLabel("Nama Owner");
  businessNameInput = () => this.page.getByLabel("Nama Bisnis");
  provinceInput = () => this.page.getByLabel("Provinsi");
  cityInput = () => this.page.getByLabel("Kota");
  districtInput = () => this.page.getByLabel("Kelurahan");
  registerButton = () => this.page.getByRole("button", { name: "Daftar Akun" });
  registrationConfirmation = () =>
    this.page.getByText(/berhasil|success|verifikasi|verification/i).first();

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto("/signup");
    await this.waitForLoaded();
  }

  async register(data: RegistrationData): Promise<void> {
    await this.whatsappInput().fill(data.whatsapp);
    await this.emailInput().fill(data.email);
    await this.passwordInput().fill(data.password);
    await this.ownerNameInput().fill(data.ownerName);
    await this.businessNameInput().fill(data.businessName);
    await this.provinceInput().fill(data.province);
    await this.cityInput().fill(data.city);
    await this.districtInput().fill(data.district);
    await this.registerButton().click();
  }
}
