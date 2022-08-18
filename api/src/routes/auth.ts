import * as express from "express";
import { isAdmin, protectedRoute } from "../middleware/auth";
import { signAccessToken } from "../utils/jwt";
import * as bcrypt from "bcryptjs";
import db from "../db";

const router: express.Router = express.Router();

router.post("/signup", async (req: express.Request, res: express.Response) => {
  try {
    const { username, fullName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    await db.user.create({
      data: {
        email,
        username,
        full_name: fullName,
        password: hashedPassword,
      },
    });

    res.status(200).send({ message: "User created successfully" });
  } catch (e: any) {
    res.status(400).send({ message: e.message });
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
