import { PrismaClient } from "@prisma/client";
import seedData from "./seed/data";

const db = new PrismaClient();

async function dropDb() {
  await db.userTournament.deleteMany({});
  await db.predictions.deleteMany({});
  await db.matches.deleteMany({});
  await db.teams.deleteMany({});
  await db.tournament.deleteMany({});
  await db.user.deleteMany({});
}

(async function seed() {
  await dropDb();

  console.log("Seeding...");
  await db.user.createMany({ data: seedData.dbUsers });
  await db.tournament.createMany({ data: seedData.dbTournaments });
  await db.teams.createMany({ data: seedData.dbTeams });
  await db.matches.createMany({ data: seedData.dbMatches });
  await db.userTournament.createMany({ data: seedData.dbUserTournaments });
  await db.predictions.createMany({ data: seedData.dbPredictions });

  await db.comments.createMany({ data: seedData.dbComments });
  await db.banned.createMany({ data: seedData.dbBanned });
})();
