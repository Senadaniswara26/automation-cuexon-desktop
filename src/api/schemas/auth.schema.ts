export type LoginRequest = {
  username: string;
  password: string;
  expiresInMins?: number;
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type UserProfile = Omit<LoginResponse, "accessToken" | "refreshToken">;

export type ApiResult<T> = {
  status: number;
  body: T;
};
