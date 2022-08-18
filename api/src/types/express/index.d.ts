export {}; // to make the file a module and avoid the TypeScript error

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        username: string;
      };
    }
  }
}
