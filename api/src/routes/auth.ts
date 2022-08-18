import * as express from "express";
import { isAdmin, protectedRoute } from "../middleware/auth";
import { signAccessToken } from "../utils/jwt";
import * as bcrypt from "bcryptjs";
import db from "../db";

const router: express.Router = express.Router();

router.post("/signup", async (req: express.Request, res: express.Response) => {
  try {
    const { username, full_name, birth_date, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    await db.user.create({
      data: {
        email,
        username,
        full_name,
        birth_date: new Date(birth_date),
        password: hashedPassword,
      },
    });

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
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return res.status(400).send({ message: "User not registered" });

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

export default router;
