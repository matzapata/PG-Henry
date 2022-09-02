import {
  MatchStage,
  PrismaClient,
  Status,
  TournamentType,
  User,
  AuthProvider,
  CodeStage,
} from "@prisma/client";
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
  await client.teams.deleteMany({});
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
    authProvider: "JWT" as AuthProvider,
    verification_token: faker.datatype.uuid(),
    is_active: faker.datatype.boolean(),
    is_banned: faker.datatype.boolean(),
    last_access: faker.date.recent(),
    url_avatar: faker.image.avatar(),
    alias_mp: fullName,
  };
}

function createRandomTeam() {
  return {
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    shield_url: faker.image.abstract(640, 480, true),
  };
}

function createUserTournament(
  userId: string,
  winnerTeamId: string,
  tournamentId: string
) {
  return {
    user: { connect: { id: userId } },
    score: faker.datatype.number({ min: 0, max: 50 }),
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
    score_a: faker.datatype.number({ min: 0, max: 8 }),
    score_b: faker.datatype.number({ min: 0, max: 8 }),
    match: { connect: { id: matchId } },
    user: { connect: { id: userId } },
    tournament: { connect: { id: tournamentId } },
  };
}

function createRandomTournament(
  creatorUserId: string,
  status: undefined | Status,
  type: undefined | TournamentType
) {
  return {
    type: type ? type : getRandom(["PRIVATE", "PUBLIC"]),
    password: "password", // constant to ease development
    name: faker.company.name(),
    description: faker.lorem.sentences(),
    user_limit: faker.datatype.number({ min: 4, max: 100 }),
    status: status
      ? status
      : getRandom(["INCOMING", "INPROGRESS", "CONCLUDED"]),
    pool: faker.datatype.number(),
    logo_url: faker.image.abstract(640, 480, true),
    creator: { connect: { id: creatorUserId } },
  };
}

function createRandomMatch(
  teamAId: string,
  teamBId: string,
  tournamentId: string,
  stage: MatchStage,
  code_stage: CodeStage,
  score_a?: number,
  score_b?: number
) {
  return {
    stage,
    code_stage,
    date: faker.date.future(),
    score_a,
    score_b,
    team_a: { connect: { id: teamAId } },
    team_b: { connect: { id: teamBId } },
    tournament: { connect: { id: tournamentId } },
  };
}

// async function createFinalOnlyTournament(dbUsers: User[], status: Status) {
//   const creatorUser = getRandom(dbUsers);

//   const tournament = await client.tournament.create({
//     data: createRandomTournament(creatorUser.id, status, "PUBLIC"),
//   });

//   const team_a = await client.teams.create({ data: createRandomTeam() });
//   const team_b = await client.teams.create({ data: createRandomTeam() });

//   const finalMatch = await client.matches.create({
//     data:
//       status === "INCOMING"
//         ? createRandomMatch(team_a.id, team_b.id, tournament.id, "FINAL")
//         : createRandomMatch(team_a.id, team_b.id, tournament.id, "FINAL", 1, 0),
//   });

//   for (let i = 0; i < 50; i++) {
//     try {
//       const clientUser = getRandom(dbUsers);
//       if (clientUser.id === creatorUser.id) continue;

//       await client.userTournament.create({
//         data: createUserTournament(clientUser.id, team_a.id, tournament.id),
//       });

//       await client.predictions.create({
//         data: createRandomPrediction(
//           clientUser.id,
//           finalMatch.id,
//           tournament.id
//         ),
//       });
//     } catch (e) {
//       // Some constrains may be violated because of how faker works. We'll just skip those.
//     }
//   }
// }

async function createSemifinalTournament(dbUsers: User[], status: Status) {
  const creatorUser = getRandom(dbUsers);

  const tournament = await client.tournament.create({
    data: createRandomTournament(creatorUser.id, status, "PUBLIC"),
  });

  const team_a = await client.teams.create({ data: createRandomTeam() });
  const team_b = await client.teams.create({ data: createRandomTeam() });
  const team_c = await client.teams.create({ data: createRandomTeam() });
  const team_d = await client.teams.create({ data: createRandomTeam() });

  const abMatch = await client.matches.create({
    data: createRandomMatch(
      team_a.id,
      team_b.id,
      tournament.id,
      "SEMIFINAL",
      "SEMIFINALA1"
    ),
  });
  const cdMatch = await client.matches.create({
    data: createRandomMatch(
      team_c.id,
      team_d.id,
      tournament.id,
      "SEMIFINAL",
      "SEMIFINALB1"
    ),
  });

  for (let i = 0; i < 50; i++) {
    try {
      const clientUser = getRandom(dbUsers);
      if (clientUser.id === creatorUser.id) continue;

      await client.userTournament.create({
        data: createUserTournament(clientUser.id, team_a.id, tournament.id),
      });

      await client.predictions.create({
        data: createRandomPrediction(clientUser.id, abMatch.id, tournament.id),
      });
      await client.predictions.create({
        data: createRandomPrediction(clientUser.id, cdMatch.id, tournament.id),
      });
    } catch (e) {
      // Some unique constrain may be violated because of the faker random algorithm. In that case we'll just ignore it and keep going
    }
  }
}

async function seed() {
  console.log("Seeding...");

  await dropDb();

  const users: User[] = [];
  for (let i = 0; i < 100; i++) users.push(createRandomUser());
  await client.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  const dbUsers = await client.user.findMany({});

  // for (let i = 0; i < 5; i++) {
  // await createFinalOnlyTournament(dbUsers, "INCOMING");
  // await createFinalOnlyTournament(dbUsers, "INPROGRESS");
  // await createSemifinalTournament(dbUsers, "INPROGRESS");
  // }

  await createSemifinalTournament(dbUsers, "INCOMING");

  console.log("Done");
}

seed();
