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

      res.send(payments);
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

export default router;
