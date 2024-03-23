export interface GetUser {
  id: string;
  userName: string;
}

export interface SignIn {
  accessToken: string;
  refreshToken: string;
}
