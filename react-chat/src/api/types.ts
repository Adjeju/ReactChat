export type RegistratedUser = {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
    isActivated: string;
    username: string;
  };
};
