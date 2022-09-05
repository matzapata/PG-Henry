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
  await db.user.createMany({ data: seedData.users });
  await db.tournament.createMany({ data: seedData.tournaments });
  await db.teams.createMany({ data: seedData.teams });
  await db.matches.createMany({ data: seedData.matches });
  await db.userTournament.createMany({ data: seedData.userTournaments });
  await db.predictions.createMany({ data: seedData.predictions });

  await db.comments.createMany({ data: seedData.comments });
  await db.banned.createMany({ data: seedData.banned });
})();
