import prisma from "../db";
import * as express from "express";
import db from "../db";
import * as bcrypt from "bcryptjs";
import { isAdmin, protectedRoute } from "../middleware/auth";
import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import sendEmail from "../utils/sendEmail";
import "dotenv/config";

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
    const result = await db.userTournament.findFirst({
      where: {
        user_id: userid as string,
        tournament_id: tournamentid as string,
      },
    });
    res.send(result);
  } catch (e: any) {
    res.status(400).send("No existe el torneo");
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
  "/:id/editProfile",
  protectedRoute,
  async (req: express.Request, res: express.Response) => {
    const { email, password, alias_mp } = req.body;
    const { id } = req.params;

    if ((!email && !password && alias_mp !== "") || (password && !email)) {
      return res.send("Faltan parametros requeridos!");
    }

    try {
      if (email && password && !alias_mp) {
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
        }
      }
      if (email && password && alias_mp) {
        const user: any = await db.user.findUnique({
          where: { email: req.user.email },
        });

        if (email === req.user.email && user.id === req.user.id) {
          const check = bcrypt.compareSync(password, user.password as string);
          if (check) {
            await db.user.update({
              where: { id: id },
              data: { alias_mp: alias_mp },
            });
          } else {
            return res.status(404).json({ msg: "La clave no coincide..." });
          }
        }
      }
      return res.status(200).json({ msg: "Perfil editado exitosamente." });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Ha ocurrido un error inesperado." });
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

router.put(
  "/banuser",
  protectedRoute,
  isAdmin,
  async (req: express.Request, res: express.Response) => {
    const { user, admin_email, reason, password, admin_name } = req.body;
    const motivo = reason || "No hay descripcion";
    try {
      if (!user || !admin_email)
        return res.send("Faltan parametros requeridos");

      const admin = await db.user.findFirst({
        where: { OR: [{ email: admin_email }, { username: admin_email }] },
      });
      if (!admin) return res.send("No existe ninguna cuenta con este correo");

      if (admin.authProvider === "JWT") {
        const check = bcrypt.compareSync(password, admin.password as string);
        if (!check) return res.send("La contraseña no coincide");
      }

      const ban_user = await db.user.findUnique({ where: { email: user } });
      if (!ban_user) return res.send("No existe el usuario que quieres banear");
      if (ban_user.is_banned)
        return res.send("El usuario ya se encuentra baneado");

      await db.user.update({
        where: { email: user },
        data: { is_banned: true },
      });

      await db.banned.create({
        data: {
          admin_name: admin.full_name,
          reason: motivo,
          user_id: ban_user.id,
        },
      });

      await sendEmail(
        ban_user.email,
        "Has sido baneado de Prode master",
        `El administrador ${admin_name} te ha baneado, por el siguiente motivo: ${motivo}`
      );

      return res.status(200).send("Usuario baneado correctamente!");
    } catch (err: any) {
      return res.status(400).json({ msg: err.message });
    }
  }
);

router.put(
  "/formAdmin",
  protectedRoute,
  isAdmin,
  async (req: express.Request, res: express.Response) => {
    const { email } = req.body;
    try {
      if (!email) return res.send("Faltan parametros requeridos");

      await db.user.update({
        where: { email: email },
        data: { is_admin: true },
      });

      await sendEmail(
        email,
        "Has sido asignado como Administrador de Prode master",
        `Felicidades ahora haces parte de nuestro equipo de Prode Master!!! 
        La mejor aplicacion de predicciones deportivas ✔`
      );

      return res
        .status(200)
        .send("Usuario asignado como administrador correctamente!");
    } catch (err: any) {
      return res.status(400).json({ msg: err.message });
    }
  }
);

router.post("/contact", async (req: express.Request, res: express.Response) => {
  const { email, name, mensaje } = req.body;
  try {
    if (!email || !name || !mensaje)
      return res.send("Faltan parametros requeridos...");

    sendEmail(
      process.env.EMAIL_USER as string,
      `Has recibido una solicitud del usuario: ${name}`,
      `${email} se ha puesto en contacto con el siguiente mensaje: \n ${mensaje}`
    );
    return res.send("Email enviado satisfactoriamente !");
  } catch (err: any) {
    return res.status(400).send({ message: err });
  }
});

router.put(
  "/resetpass",
  async (req: express.Request, res: express.Response) => {
    const { email } = req.body;
    try {
      if (!email) return res.send("No ingresaste ningun email...");
      const user = await db.user.findUnique({ where: { email } });
      if (!user) return res.send("No existe ninguna cuenta con ese correo...");

      const new_pass = bcrypt.hashSync(user.id.slice(0, 10), 8);
      await db.user.update({
        where: { email },
        data: { password: new_pass },
      });

      sendEmail(
        user.email,
        "Restablecimiento de contraseña",
        `Tu nueva contraseña es: ${user.id.slice(
          0,
          10
        )} \n Asegurate de cambiarla en tu perfil cuando entres nuevamente`
      );

      return res.send("Contraseña restablecida correctamente!");
    } catch (err: any) {
      return res.status(400).send({ message: err });
    }
  }
);

export default router;
