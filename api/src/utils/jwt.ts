import * as jwt from "jsonwebtoken";
import "dotenv/config";

export function signAccessToken(
  payload: string | object | Buffer
): Promise<Error | string | undefined> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { payload },
      process.env.JWT_SECRET_KEY as jwt.Secret,
      {},
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

export function verifyAccessToken(
  token: string
): Promise<Error | string | jwt.JwtPayload | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as jwt.Secret,
      (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      }
    );
  });
}
