export {}; // to make the file a module and avoid the TypeScript error

declare global {
  namespace Express {
    interface Request {
      user: {
        is_admin: boolean;
        id: string;
        email: string;
        username: string;
      };
    }
  }
}
