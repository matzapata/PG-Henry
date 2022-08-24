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
          mode: "insensitive",
        },
        status: status as Status,
        type: type as TournamentType,
      },
      orderBy:
        sort === "asc" || sort === "desc"
          ? { name: sort }
          : {
              tournament: {
                _count: sort === "mostpopular" ? "desc" : "asc",
              },
            },
    });
    res.send(result);
  } catch (error) {
    res.status(404).json({ status: "failed", msg: error });
  }
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: id },
    });
    if (tournament)
      res.send({
        id: tournament.id,
        name: tournament.name,
        description: tournament.description,
        user_limit: tournament.user_limit,
        status: tournament.status,
        type: tournament.type,
        pool: tournament.pool,
        logo_url: tournament.logo_url,
      });
    else res.status(404).send("Not found.");
  } catch (e: any) {
    res.status(400).send({ message: e.message });
  }
});

router.get(
  "/:id/ranking",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    if (id === undefined) return res.status(400).send("Missing parameters");

    const ranking = await prisma.userTournament.findMany({
      where: { tournament_id: id },
      include: { user: { select: { full_name: true } } },
      orderBy: { score: "desc" },
    });
    res.send(
      ranking.map((ut) => {
        return {
          score: ut.score,
          user: ut.user.full_name,
        };
      })
    );
  }
);

export default router;
