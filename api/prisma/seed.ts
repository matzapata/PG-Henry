import { PrismaClient, Status, TournamentType, User } from "@prisma/client";
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
  await client.user.deleteMany();
  await client.tournament.deleteMany();
  await client.predictions.deleteMany();
  await client.matches.deleteMany();
  await client.user_Tournament.deleteMany();
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

function createRandomTournament(creatorUserId: string) {
  const TOURNAMENT_TYPE: TournamentType[] = ["PRIVATE", "PUBLIC"];
  const STATUS: Status[] = ["INCOMING", "INPROGRESS", "CONCLUDED"];
  return {
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    description: faker.lorem.sentences(),
    user_limit: faker.datatype.number({ min: 2, max: 100 }),
    creator_user_id: creatorUserId,
    status: getRandom(STATUS),
    type: getRandom(TOURNAMENT_TYPE),
    pool: faker.datatype.number(),
    logo_url: faker.image.avatar(),
  };
}

function createRandomTeam() {
  return {
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    shield_url: faker.image.avatar(),
  };
}

function createRandomPrediction(
  matchId: string,
  tournamentId: string,
  userId: string
) {
  return {
    id: faker.datatype.uuid(),
    match_id: matchId,
    scores_a: faker.datatype.number({ max: 5 }),
    scores_b: faker.datatype.number({ max: 5 }),
    tournament_id: tournamentId,
    user_id: userId,
  };
}

function createRandomMatch(teamA: string, teamB: string, tournamentId: string) {
  return {
    id: faker.datatype.uuid(),
    date: faker.date.future(),
    scores_a: faker.datatype.number({ max: 5 }),
    scores_b: faker.datatype.number({ max: 5 }),
    team_a_id: teamA,
    team_b_id: teamB,
    tournament_id: tournamentId,
  };
}

function createRandomUserTournament(
  tournamentId: string,
  userId: string,
  teamId: string
) {
  return {
    id: faker.datatype.uuid(),
    tournament_id: tournamentId,
    user_id: userId,
    score: faker.datatype.number(),
    winner_team_id: teamId,
  };
}

async function seed() {
  await dropDb();

  const users: User[] = [];

  for (let i = 0; i < 200; i++) users.push(createRandomUser());
  await client.user.createMany({ data: users, skipDuplicates: true });
}

seed();
