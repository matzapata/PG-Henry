import * as jwt from "jsonwebtoken";
import "dotenv/config";
import * as express from "express";
import db from "../db";

export function protectedRoute(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).send({ message: "No token provided!" });

  jwt.verify(
    token as string,
    process.env.JWT_SECRET_KEY as jwt.Secret,
    (err: Error | null, decoded: any) => {
      if (err) return res.status(401).send("Unauthorized");

      req.user = {
        id: decoded.payload.id,
        email: decoded.payload.email,
        username: decoded.payload.username,
      };
      next();
    }
  );
}

export async function isAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response<any, Record<string, any>> | void> {
  const user = await db.user.findUnique({
    where: {
      id: req.user.id,
    },
  });
  if (user?.is_admin) next();
  else return res.status(403).send("Require Admin Role!");
}
