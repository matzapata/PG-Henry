import prisma from "../db";
import * as express from "express";
import db from "../db";
import { isAdmin, protectedRoute } from "../middleware/auth";

const router: express.Router = express.Router();

router.get(
  "/",
  protectedRoute,
  isAdmin,
  async (req: express.Request, res: express.Response) => {
    try {
      const usersCount = await prisma.user.count({
        where: {
          is_admin: {
            equals: false,
          },
        },
      });
      const activeCount = await prisma.user.count({
        where: {
          is_active: {
            equals: true,
          },
        },
      });
      const inactiveCount = await prisma.user.count({
        where: {
          is_active: {
            equals: false,
          },
        },
      });
      const tournamentsCount = await prisma.tournament.count();
      const privateCount = await prisma.tournament.count({
        where: {
          type: {
            equals: "PRIVATE",
          },
        },
      });
      const publicCount = await prisma.tournament.count({
        where: {
          type: {
            equals: "PUBLIC",
          },
        },
      });
      const bannedCount = await prisma.user.count({
        where: {
          is_banned: {
            equals: true,
          },
        },
      });
      const poolSum = await prisma.tournament.aggregate({
        _sum: {
          pool: true,
        },
      });

      res.status(200).send({
        tournaments: tournamentsCount,
        privateTournaments: privateCount,
        publicTournaments: publicCount,
        users: usersCount,
        activeUsers: activeCount,
        inactiveUsers: inactiveCount,
        banned: bannedCount,
        revenue: poolSum._sum.pool,
      });
    } catch (error) {
      res.status(400).send("Algo salio mal");
    }
  }
);

export default router;
