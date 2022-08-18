import * as bcrypt from "bcryptjs";
import { signAccessToken } from "./jwt";
import db from "../db";

export async function register(
  email: string,
  password: string,
  username: string,
  full_name: string
): Promise<string | Error | undefined> {
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = await db.user.create({
    data: {
      email,
      username,
      full_name,
      password: hashedPassword,
    },
  });

  return await signAccessToken({
    id: user.id,
    email: user.email,
    username: user.username,
  });
}

export async function login(
  email: string,
  password: string
): Promise<string | Error | undefined> {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) return new Error("User not registered");

  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword) return new Error("Email address or password not valid");

  return await signAccessToken({
    id: user.id,
    email: user.email,
    username: user.username,
  });
}
