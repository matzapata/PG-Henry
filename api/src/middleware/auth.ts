import "dotenv/config";
import * as express from "express";
import db from "../db";
import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "../types/auth";

export async function protectedRoute(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response | void> {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).send({ message: "No token provided!" });

  try {
    const decoded = (await verifyAccessToken(token as string)) as JwtPayload;
    req.user = {
      id: decoded.payload.id,
      email: decoded.payload.email,
      username: decoded.payload.username,
    };
    next();
  } catch (e) {
    return res.status(401).send({ message: "Unauthorized" });
  }
}

export async function isAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response<any, Record<string, any>> | void> {
  const user = await db.user.findUnique({ where: { id: req.user.id } });
  if (user?.is_admin) next();
  else return res.status(403).send({ message: "Require Admin Role!" });
}
