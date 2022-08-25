import prisma from "../db";
import * as express from "express";
import db from "../db";
import * as bcrypt from "bcryptjs";
import { protectedRoute } from "../middleware/auth";
import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { token } from "morgan";

const router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.send("User index");
});

router.put(
  "/:id/status",
  async (req: express.Request, res: express.Response) => {
    try {
      const { is_active } = req.body;
      const { id } = req.params;
      if (is_active) {
        const status = await prisma.user.findUniqueOrThrow({
          where: {
            id: id,
          },
        });
        status.is_active = false;
        await prisma.user.update({
          where: {
            id: id,
          },
          data: status,
        });
        res.status(200).send("La cuenta a sido eliminada correctamente");
      } else {
        throw new Error("is_active is not true");
      }
    } catch (error: any) {
      res.status(404).json({ status: "failed", msg: error.message });
    }
  }
);

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

router.get(
  "/getprofileinfo",
  protectedRoute,
  async (req: express.Request, res: express.Response) => {
    try {
      const email = req.user.email;
      const user = await db.user.findUnique({ where: { email } });
      if (!user) return res.send("El usuario no existe");

      const user_detail = {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        is_admin: user.is_admin,
        banned: user.is_banned,
        avatar: user.url_avatar,
        alias_mp: user.alias_mp,
      };

      return res.status(200).json(user_detail);
    } catch (err: any) {
      res.status(404).json({ msg: err.message });
    }
  }
);

router.put(
  "/changeavatar",
  async (req: express.Request, res: express.Response) => {
    const { avatar, email, id } = req.body;
    try {
      const user = await db.user.findUnique({ where: { email } });
      if (!user) return res.send("El usuario no existe");

      if (email === user.email && id === user.id) {
        const user_update = await db.user.update({
          where: { id: id },
          data: { url_avatar: avatar },
        });
        return res.status(200).send("Imagen cambiada exitosamente!");
      }
    } catch (err: any) {
      res.status(404).json({ msg: err.message });
    }
  }
);

export default router;
