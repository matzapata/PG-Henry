import prisma from "../db";
import * as express from "express";
import { Status, TournamentType } from "@prisma/client";

const router: express.Router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const { page, status, type, name, sort } = req.query;
    const pageN = Number(page) - 1;
    const paginado = page ? pageN * 9 : 0;

    const result = await prisma.tournament.findMany({
      take: 9,
      skip: paginado,
      where: {
        name: {
          startsWith: typeof name === "string" ? name : "",
        },
        status: status as Status,
        type: type as TournamentType,
      },
      orderBy:
        sort === "asc" || sort === "desc"
          ? { name: sort as any }
          : {
              tournament_id: {
                _count: sort === "mostpopular" ? "desc" : "asc",
              },
            },
    });
    res.send(result);
  } catch (error) {
    res.status(404).json({ status: "failed", msg: error });
  }
});

export default router;
