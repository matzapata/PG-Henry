import { prisma } from "../db";
import * as express from "express";
import { Status, TournamentType } from "@prisma/client";

const router: express.Router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const { page, status, type } = req.query;
    let pageN = Number(page) - 1;
    let paginado: number;
    page ? (paginado = pageN * 5) : (paginado = 0);

    let result = await prisma.tournament.findMany({
      take: 5,
      skip: paginado,
      where: {
        status: status as Status,
        type: type as TournamentType,
      },
    });
    res.send(result);
  } catch (error) {
    res.status(404).json({ status: "failed", msg: error });
  }
});

export default router;
