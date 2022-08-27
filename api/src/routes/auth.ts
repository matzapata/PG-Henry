import * as express from "express";
import { isAdmin, protectedRoute } from "../middleware/auth";
import { signAccessToken } from "../utils/jwt";
import * as bcrypt from "bcryptjs";
import db from "../db";
import * as crypto from "crypto";
import sendEmail from "../utils/sendEmail";
import "dotenv/config";

const router: express.Router = express.Router();

router.post("/signup", async (req: express.Request, res: express.Response) => {
  try {
    const { username, full_name, birth_date, email, password } = req.body;
    if ([username, full_name, birth_date, email, password].includes(undefined))
      return res.status(400).send("Missing required parameters.");

    const hashedPassword = bcrypt.hashSync(password, 8);
    const verification_token = crypto.randomBytes(32).toString("hex");
    const user = await db.user.create({
      data: {
        email,
        username,
        full_name,
        verification_token,
        birth_date: new Date(birth_date),
        password: hashedPassword,
      },
    });

    await sendEmail(
      email,
      "Verify Email",
      `Click to verify: ${process.env.BASE_URL}/auth/verify/${user.id}/${user.verification_token}`
    );

    res.status(200).send({ message: "User created successfully" });
  } catch (e: any) {
    let message = e.message;
    if (e.code === "P2002") message = `${e.meta.target[0]} already exists.`;

    res.status(400).send({ message });
  }
});

router.post("/signin", async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if ([email, password].includes(undefined))
      return res.status(400).send("Missing required parameters.");

    const user = await db.user.findUnique({ where: { email } });
    if (!user) return res.status(400).send({ message: "User not registered" });
    if (!user.is_active)
      return res.status(400).send({ message: "Pending email verification" });

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword)
      return res
        .status(400)
        .send({ message: "Email address or password invalid" });

    const token = await signAccessToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    res.status(200).send({
      message: "Account login successful",
      token,
    });
  } catch (e: any) {
    res.send({ message: e.message });
  }
});

router.post("/refresh", protectedRoute, async function (req, res) {
  const token = await signAccessToken({
    id: req.user.id,
    email: req.user.email,
    username: req.user.username,
  });
  res.status(200).send({
    message: "Token refreshed",
    token,
  });
});

router.get("/verify/:user_id/:token", async (req, res) => {
  try {
    const { user_id, token } = req.params;

    const user = await db.user.findFirst({
      where: { id: user_id, verification_token: token },
    });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    await db.user.update({
      where: { id: user_id },
      data: {
        is_active: true,
        verification_token: "",
      },
    });

    res.redirect(`${process.env.CLIENT_URL}/auth/login`);
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/protected", protectedRoute, function (req, res) {
  res.send({ message: "Authorized" });
});

router.get(
  "/admin",
  [protectedRoute, isAdmin],
  function (req: express.Request, res: express.Response) {
    res.send({ message: "Authorized" });
  }
);

router.post(
  "/authlogin",
  async (req: express.Request, res: express.Response) => {
    const { username, full_name, email } = req.body;
    if (!username || !full_name || !email)
      return res.send("Faltan parametros requeridos");
    try {
      const user: any = await db.user.findUnique({ where: { email } });
      if (!user) {
        const verification_token = crypto.randomBytes(32).toString("hex");
        const user = await db.user.create({
          data: {
            email,
            username,
            full_name,
            verification_token,
            birth_date: new Date(),
            password: bcrypt.hashSync("test", 8),
          },
        });
        const token = await signAccessToken({
          id: user.id,
          email: user.email,
          username: user.username,
        });
        return res.status(200).send({ user, token });
      }

      const token = await signAccessToken({
        id: user.id,
        email: user.email,
        username: user.username,
      });

      return res.status(200).send({ user, token });
    } catch (err: any) {
      res.status(404).json({ msg: err.message });
    }
  }
);

router.post(
  "/auth0/signin",
  async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;
      if ([email, password].includes(undefined))
        return res.status(400).send("Missing required parameters.");

      const user = await db.user.findUnique({ where: { email } });
      if (!user)
        return res.status(400).send({ message: "User not registered" });

      const checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword)
        return res
          .status(400)
          .send({ message: "Email address or password invalid" });

      const token = await signAccessToken({
        id: user.id,
        email: user.email,
        username: user.username,
      });

      res.status(200).send({
        message: "Account login successful",
        token,
      });
    } catch (e: any) {
      res.send({ message: e.message });
    }
  }
);

export default router;
