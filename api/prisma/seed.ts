import { MatchStage, PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcryptjs";

const client = new PrismaClient();

function getRandom(list: Array<any>) {
  return list[Math.floor(Math.random() * list.length)];
}

function getMultipleRandom(arr: Array<any>, num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

async function dropDb() {
  await client.userTournament.deleteMany({});
  await client.predictions.deleteMany({});
  await client.matches.deleteMany({});
  await client.tournament.deleteMany({});
  await client.user.deleteMany({});
}

function createRandomUser() {
  const fullName = faker.name.fullName();
  return {
    full_name: fullName,
    id: faker.datatype.uuid(),
    username: faker.internet.userName(...fullName.split(" ")),
    email: faker.internet.email(...fullName.split(" ")),
    password: bcrypt.hashSync("password", 8), // fixed password to allow dev login
    birth_date: faker.date.birthdate(),
    is_admin: false,
    verification_token: faker.datatype.uuid(),
    is_active: faker.datatype.boolean(),
    is_banned: faker.datatype.boolean(),
    last_access: faker.date.recent(),
  };
}

function createRandomTeam() {
  return {
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    shield_url: faker.image.abstract(),
  };
}

function createUserTournament(
  userId: string,
  winnerTeamId: string,
  tournamentId: string
) {
  return {
    user: { connect: { id: userId } },
    winner: { connect: { id: winnerTeamId } },
    tournament: { connect: { id: tournamentId } },
  };
}

function createRandomPrediction(
  userId: string,
  matchId: string,
  tournamentId: string
) {
  return {
    scores_a: faker.datatype.number({ min: 0, max: 8 }),
    scores_b: faker.datatype.number({ min: 0, max: 8 }),
    match: { connect: { id: matchId } },
    user: { connect: { id: userId } },
    tournament: { connect: { id: tournamentId } },
  };
}

function createRandomTournament(creatorUserId: string) {
  const type = getRandom(["PRIVATE", "PUBLIC"]);
  const password = type === "PRIVATE" ? "password" : undefined;
  return {
    type,
    password,
    name: faker.company.name(),
    description: faker.lorem.sentences(),
    user_limit: faker.datatype.number({ min: 2, max: 100 }),
    status: getRandom(["INCOMING", "INPROGRESS", "CONCLUDED"]),
    pool: faker.datatype.number(),
    logo_url: faker.image.abstract(),
    creator: { connect: { id: creatorUserId } },
  };
}

function createRandomMatch(
  teamAId: string,
  teamBId: string,
  tournamentId: string,
  stage: MatchStage
) {
  return {
    stage,
    date: faker.date.future(),
    team_a: { connect: { id: teamAId } },
    team_b: { connect: { id: teamBId } },
    tournament: { connect: { id: tournamentId } },
  };
}

async function seed() {
  await dropDb();

  const users: User[] = [];

  // Create users
  for (let i = 0; i < 100; i++) users.push(createRandomUser());
  await client.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  // Create tournament user creator
  const creatorUser = await client.user.create({
    data: createRandomUser(),
  });

  // Create tournament
  const tournament = await client.tournament.create({
    data: createRandomTournament(creatorUser.id),
  });

  // Create tournament teams or get teams ids
  const team_a = await client.teams.create({ data: createRandomTeam() });
  const team_b = await client.teams.create({ data: createRandomTeam() });

  // Create tournament matches and connect them with tournament
  const finalMatch = await client.matches.create({
    data: createRandomMatch(team_a.id, team_b.id, tournament.id, "FINAL"),
  });

  // Subscribe user to tournament
  const clientUser = await client.user.create({ data: createRandomUser() });
  await client.userTournament.create({
    data: createUserTournament(clientUser.id, team_a.id, tournament.id),
  });

  // Create user prediction
  await client.predictions.create({
    data: createRandomPrediction(clientUser.id, finalMatch.id, tournament.id),
  });
}

seed();
