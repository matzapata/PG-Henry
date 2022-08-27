import prisma from "../db";
import * as express from "express";
import { MatchStage, Status, TournamentType } from "@prisma/client";
import db from "../db";

const router: express.Router = express.Router();

router.put("/:id", async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { shield } = req.body;
  try {
    if (!id) return res.send("Faltan parametros requeridos");

    const team = await db.teams.findUnique({ where: { id } });
    if (!team) return res.send("No existe este equipo...");

    if (id === team.id) {
      await db.teams.update({
        where: { id },
        data: { shield_url: shield },
      });
      return res.send("Logo cargado exitosamente!");
    }
    return res.send(team);
  } catch (err: any) {
    return res.send(err);
  }
});

export default router;
