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
  await client.userTournament.deleteMany();
  await client.matches.deleteMany();
  await client.tournament.deleteMany();
  await client.predictions.deleteMany();
  await client.user.deleteMany();
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
    name: faker.company.name(),
    description: faker.lorem.sentences(),
    user_limit: faker.datatype.number({ min: 2, max: 100 }),
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
    data: {
      name: "Tournament",
      description: "Irure magna qui deserunt Lorem.",
      logo_url: faker.image.avatar(),
      type: "PUBLIC",
      creator: { connect: { id: creatorUser.id } },
    },
  });

  // Create tournament teams or get teams ids
  const team_a = await client.teams.create({ data: createRandomTeam() });
  const team_b = await client.teams.create({ data: createRandomTeam() });

  // Create tournament matches and connect them with tournament
  const finalMatch = await client.matches.create({
    data: {
      date: faker.date.future(),
      stage: "FINAL",
      team_a: { connect: { id: team_a.id } },
      team_b: { connect: { id: team_b.id } },
      tournament: { connect: { id: tournament.id } },
    },
  });

  // Subscribe user to tournament
  const clientUser = await client.user.create({ data: createRandomUser() });
  await client.userTournament.create({
    data: {
      winner: { connect: { id: team_a.id } },
      user: { connect: { id: clientUser.id } },
      tournament: { connect: { id: tournament.id } },
    },
  });

  // Create user prediction
  await client.predictions.create({
    data: {
      scores_a: 1,
      scores_b: 0,
      match: { connect: { id: finalMatch.id } },
      user: { connect: { id: clientUser.id } },
      tournament: { connect: { id: tournament.id } },
    },
  });
}

seed();
