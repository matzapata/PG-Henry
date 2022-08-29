import prisma from "../db";
import * as express from "express";
import db from "../db";
import * as bcrypt from "bcryptjs";
import { protectedRoute } from "../middleware/auth";
import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

const router: express.Router = express.Router();

router.get(
  "/tournaments",
  protectedRoute,
  async (req: express.Request, res: express.Response) => {
    const userId = req.user.id;
    const page = req.query.page === undefined ? 1 : Number(req.query.page);
    const pageSize =
      req.query.pageSize === undefined ? 10 : Number(req.query.pageSize);

    try {
      const [tournaments, tournamentsCount] = await prisma.$transaction([
        db.userTournament.findMany({
          where: { user_id: userId },
          include: {
            tournament: {
              select: { name: true, logo_url: true, status: true, type: true },
            },
          },
          take: pageSize,
          skip: pageSize * (page - 1),
        }),
        prisma.userTournament.count({ where: { user_id: userId } }),
      ]);

      res.send({
        page,
        lastPage: Math.ceil(tournamentsCount / pageSize),
        tournaments: tournaments.map((t) => {
          return {
            id: t.tournament_id,
            score: t.score,
            name: t.tournament.name,
            logo_url: t.tournament.logo_url,
            status: t.tournament.status,
            type: t.tournament.type,
          };
        }),
      });
    } catch (e: any) {
      res.status(400).send({ msg: e.message });
    }
  }
);

router.get("/findTournament", async (req, res) => {
  try {
    const { tournamentid, userid } = req.query;
    const result = await db.userTournament.findFirstOrThrow({
      where: {
        user_id: userid as string,
        tournament_id: tournamentid as string,
      },
    });
    res.send(result);
  } catch (e: any) {
    res.status(400).send({ msg: e.message });
  }
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
        await db.user.update({
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
        await db.user.update({
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
