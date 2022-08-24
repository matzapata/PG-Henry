import * as express from "express";
import db from "../db";
import * as bcrypt from "bcryptjs";
import { protectedRoute } from "../middleware/auth";
import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

const router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.send("User index");
});

router.put(
  "/changepsw",
  protectedRoute,
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send("Faltan parametros requeridos!");

    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).send({ message: "No token provided!" });

    try {
      const decoded = (await verifyAccessToken(token as string)) as JwtPayload;
      req.user = {
        id: decoded.payload.id,
        email: decoded.payload.email,
        username: decoded.payload.username,
      };

      const user: any = await db.user.findUnique({ where: { email } });

      if (
        user.email === req.user.email &&
        email === req.user.email &&
        user.id === req.user.id
      ) {
        const update_user = await db.user.update({
          where: {
            email: email,
          },
          data: {
            password: bcrypt.hashSync(password, 8),
          },
        });
        return res
          .status(200)
          .json({ msg: "Contraseña cambiada exitosamente." });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Ingresaste un mail incorrecto." });
    }
  }
);

export default router;
