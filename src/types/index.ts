export type Role = "admin" | "user";

export type TestEnvironment = "staging" | "production";

export type Account = {
  username: string;
  password: string;
};

export type RegistrationData = {
  whatsapp: string;
  email: string;
  password: string;
  ownerName: string;
  businessName: string;
  province: string;
  city: string;
  district: string;
};

export type AccountStore = Partial<
  Record<TestEnvironment, Partial<Record<Role, Account>>>
>;
