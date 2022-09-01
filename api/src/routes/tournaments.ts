import prisma from "../db";
import * as express from "express";
import { MatchStage, Status, TournamentType } from "@prisma/client";
import db from "../db";
import * as bcrypt from "bcryptjs";
import { protectedRoute } from "../middleware/auth";

type Team = {
  name: string;
  shield_url: string;
  key: number;
};

type Match = {
  date: string;
  stage: MatchStage;
  tournament_id: string;
  team_a_name: string;
  team_b_name: string;
  key: number;
};

const router: express.Router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const { page, status, type, name, sort } = req.query;
    const pageN = Number(page) - 1;
    const paginado = page ? pageN * 9 : 0;

    const result = await prisma.tournament.findMany({
      take: 10,
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

router.get("/password", async (req: express.Request, res: express.Response) => {
  try {
    const { tournamentid, password } = req.query;
    if (password && tournamentid) {
      const tournaments = await prisma.tournament.findUnique({
        where: {
          id: tournamentid as string,
        },
      });
      const hashedPassword = await bcrypt.compare(
        password as string,
        tournaments?.password as string
      );
      if (hashedPassword) {
        res.status(200).send("Ok");
      } else {
        res.status(200).send("Contraseña incorrecta");
      }
    }
  } catch (error: any) {
    res.status(400).send(error);
  }
});

router.get(
  "/:id/matches",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const stage = req.query.stage;

    const page = req.query.page === undefined ? 1 : Number(req.query.page);
    const pageSize =
      req.query.pageSize === undefined ? 10 : Number(req.query.pageSize);

    if (id === undefined) return res.status(400).send("Missing parameters");

    try {
      const result = await prisma.matches.findMany({
        take: pageSize,
        skip: pageSize * (page - 1),
        where: {
          tournament_id: id,
          stage: stage as MatchStage,
        },
        include: {
          team_a: {
            select: {
              name: true,
              shield_url: true,
            },
          },
          team_b: {
            select: {
              name: true,
              shield_url: true,
            },
          },
        },
        orderBy: { date: "asc" },
      });
      const count = await prisma.matches.count({
        where: { tournament_id: id },
      });
      res
        .status(200)
        .send({ matches: result, lastPage: Math.ceil(count / pageSize) });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);
router.get(
  "/:id/allmatches",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    console.log("entró");
    try {
      const result = await prisma.matches.findMany({
        where: {
          tournament_id: id,
        },
        include: {
          team_a: {
            select: {
              name: true,
              shield_url: true,
              id: true,
            },
          },
          team_b: {
            select: {
              name: true,
              shield_url: true,
              id: true,
            },
          },
        },
      });

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.get("/:id", async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: id },
    });
    if (tournament) {
      res.send({
        id: tournament.id,
        name: tournament.name,
        description: tournament.description,
        user_limit: tournament.user_limit,
        status: tournament.status,
        type: tournament.type,
        pool: tournament.pool,
        logo_url: tournament.logo_url,
        creator_user_id: tournament.creator_user_id,
        is_official: tournament.is_official,
      });
    } else res.status(404).send("Not found.");
  } catch (e: any) {
    res.status(400).send({ message: e.message });
  }
});
router.post(
  "/checkName",
  protectedRoute,
  async (req: express.Request, res: express.Response, next) => {
    try {
      const { name } = req.body;

      let torneo: any;
      torneo = await db.tournament.findUnique({
        where: { name },
      });
      if (torneo) {
        return res.status(400).send({
          message:
            "El nombre del torneo " + torneo.name + " ya está registrado.",
        });
      } else {
        res.status(200).send({ message: "Torneo disponible" });
      }
    } catch (e: any) {
      res.status(400).send({ message: e.message });
    }
  }
);
router.post(
  "/checkTeams",
  protectedRoute,
  async (req: express.Request, res: express.Response) => {
    try {
      const { teams } = req.body;

      let encontrados: string[] = [];
      const teamsArray = teams.map(async (team: Team) => {
        const teamName = await db.teams.findUnique({
          where: { name: team.name },
        });
        if (teamName) {
          encontrados.push(teamName.name);
        }
        return teamName;
      });
      await Promise.all(teamsArray);
      if (!!encontrados.length) {
        if (encontrados.length === 1)
          return res.status(400).send({
            message: "El equipo " + encontrados[0] + " ya está registrado.",
          });
        return res.status(400).send({
          message:
            "Los equipos " + encontrados.toString() + " ya están registrados.",
        });
      } else {
        res.status(200).send({ message: "Equipos disponibles" });
      }
    } catch (e: any) {
      res.status(400).send({ message: e.message });
    }
  }
);

router.post(
  "/create",
  protectedRoute,
  async (req: express.Request, res: express.Response) => {
    try {
      const { tournament, teams, matches } = req.body;

      const {
        name,
        description,
        user_limit,
        creator_user_id,
        type,
        logo_url,
        password,
      } = tournament;

      if ([name, description, user_limit, type].includes(undefined))
        return res
          .status(400)
          .send({ message: "Missing required parameters." });

      ///////CHEQUEO DE EQUIPOS PREXISTENTES///////
      let encontrados: string[] = [];
      const teamsArray = teams.map(async (team: Team) => {
        const teamName = await db.teams.findUnique({
          where: { name: team.name },
        });
        if (teamName) {
          encontrados.push(teamName.name);
        }
        return teamName;
      });
      await Promise.all(teamsArray);
      if (!!encontrados.length) {
        if (encontrados.length === 1)
          return res.status(400).send({
            message: "El equipo " + encontrados[0] + " ya está registrado.",
          });
        return res.status(400).send({
          message:
            "Los equipos " + encontrados.toString() + " ya están registrados.",
        });
      }
      /////////CHEQUEO DE TORNEO PREXISTENTE///////////
      let torneo: any;
      torneo = await db.tournament.findUnique({
        where: { name },
      });
      if (torneo) {
        return res.status(400).send({
          message:
            "El nombre del torneo " + torneo.name + " ya está registrado.",
        });
      }

      if (type === "PUBLIC") {
        const user = await db.user.findUnique({
          where: { id: creator_user_id },
        });
        torneo = await db.tournament.create({
          data: {
            name,
            description,
            user_limit,
            creator_user_id,
            type,
            logo_url,
            is_official: user?.is_admin ? true : false,
          },
        });
      } else {
        const user = await db.user.findUnique({
          where: { id: creator_user_id },
        });
        if (!password) return res.status(400).send("Password required.");
        const hashedPassword = bcrypt.hashSync(password, 8);
        torneo = await db.tournament.create({
          data: {
            name,
            description,
            user_limit,
            creator_user_id,
            type,
            logo_url,
            password: hashedPassword,
            is_official: user?.is_admin ? true : false,
          },
        });
      }

      if (!teams.length) {
        return res
          .status(400)
          .send("Missing required parameters. When Teams create");
      } else {
        const teamsPromises = teams.map(async (team: Team) => {
          const newTeam = await db.teams.create({
            data: { shield_url: team.shield_url, name: team.name },
          });

          return newTeam;
        });
        await Promise.all(teamsPromises);
        if (!matches.length) {
          return res
            .status(400)
            .send("Missing required parameters. When Matches create");
        } else {
          const matchesPromises = matches.map(async (match: Match) => {
            const newDate = match.date + "T00:00:00.000Z";
            const team_a = await prisma.teams.findUnique({
              where: { name: match.team_a_name },
            });
            const team_b = await prisma.teams.findUnique({
              where: { name: match.team_b_name },
            });
            if (team_a && team_b) {
              const newMatch = await db.matches.create({
                data: {
                  tournament_id: torneo.id,
                  date: newDate,
                  stage: match.stage,
                  team_a_id: team_a?.id,
                  team_b_id: team_b?.id,
                },
              });
              return newMatch;
            } else {
              return res
                .status(400)
                .send("Missing required parameters. Fail Team_a || team_b");
            }
          });
          await Promise.all(matchesPromises);
        }
      }

      res.status(200).json(torneo.id);
    } catch (e: any) {
      res.status(400).send({ message: e.message });
    }
  }
);

router.get(
  "/:id/ranking",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const page = req.query.page === undefined ? 1 : Number(req.query.page);
    const pageSize =
      req.query.pageSize === undefined ? 10 : Number(req.query.pageSize);

    if (id === undefined) return res.status(400).send("Missing parameters");

    const [ranking, participantsCount] = await prisma.$transaction([
      prisma.userTournament.findMany({
        where: { tournament_id: id },
        include: { user: { select: { full_name: true, username: true } } },
        orderBy: { score: "desc" },
        take: pageSize,
        skip: pageSize * (page - 1),
      }),
      prisma.userTournament.count({ where: { tournament_id: id } }),
    ]);

    res.send({
      page,
      lastPage: Math.ceil(participantsCount / pageSize),
      ranking: ranking.map((ut) => {
        return {
          score: ut.score,
          full_name: ut.user.full_name,
          username: ut.user.username,
        };
      }),
    });
  }
);

export default router;
