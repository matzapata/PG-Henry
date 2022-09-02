import * as express from "express";
import db from "../db";
import "dotenv/config";
import { isAdmin, protectedRoute } from "../middleware/auth";

const router: express.Router = express.Router();

router.get(
  "/payments/pending",
  protectedRoute,
  isAdmin,
  async (req: express.Request, res: express.Response) => {
    try {
      const payments = await db.userTournament.findMany({
        where: {
          position: { in: ["FIRST", "SECOND", "THIRD"] },
          collected_payment: false,
        },
        include: {
          tournament: { select: { id: true, name: true, pool: true } },
          user: { select: { full_name: true, alias_mp: true, email: true } },
        },
      });

      res.send(
        payments.map((p) => ({
          position: p.position,
          compensation: p.compensation,
          email: p.user.email,
          full_name: p.user.full_name,
          tournament: p.tournament,
          user_tournament_id: p.id,
        }))
      );
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

router.put(
  "/payments/:user_tournament_id/collected",
  protectedRoute,
  isAdmin,
  async (req: express.Request, res: express.Response) => {
    try {
      await db.userTournament.update({
        where: { id: req.params.user_tournament_id },
        data: { collected_payment: true },
      });
      return res.send("OK");
    } catch (e: any) {
      return res.status(500).send(e.message);
    }
  }
);

router.get(
  "/bannedusers",
  async (req: express.Request, res: express.Response) => {
    try {
      const users = await db.user.findMany({ where: { is_banned: true } });
      if (!users) return res.send({ message: "No hay usuarios baneados..." });
      return res.send(users.slice(0, 20));
    } catch (err: any) {
      console.error(err);
    }
  }
);

router.put(
  "/unbanuser",
  async (req: express.Request, res: express.Response) => {
    const { email } = req.body;
    try {
      if (!email) return res.send("Faltan parametros requeridos...");
      await db.user.update({
        where: { email },
        data: { is_banned: false },
      });

      return res.send("El usuario ha sido desbaneado!");
    } catch (err: any) {
      return res.status(400).send({ message: "Intenta nuevamente" });
    }
  }
);

export default router;
