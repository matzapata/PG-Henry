export interface JwtPayload {
  payload: {
    id: string;
    username: string;
    email: string;
  };
}
