/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { faker } from "@faker-js/faker";
import {
  AuthProvider,
  Status,
  TournamentType,
  MatchStage,
} from "@prisma/client";
import * as bcrypt from "bcryptjs";

export function createRandomUser() {
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

export function createRandomTeam() {
  return {
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    shield_url: faker.image.abstract(640, 480, true),
  };
}

export function createUserTournament(
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

export function createRandomPrediction(
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

export function createRandomTournament(
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

export function createRandomMatch(
  teamAId: string,
  teamBId: string,
  tournamentId: string,
  stage: MatchStage,
  score_a?: number,
  score_b?: number
) {
  return {
    stage,
    date: faker.date.future(),
    score_a,
    score_b,
    team_a: { connect: { id: teamAId } },
    team_b: { connect: { id: teamBId } },
    tournament: { connect: { id: tournamentId } },
  };
}

export function getRandom(list: Array<any>) {
  return list[Math.floor(Math.random() * list.length)];
}

export function getMultipleRandom(arr: Array<any>, num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export function generateN(n: number, generator: () => object) {
  return new Array(n).map(() => generator());
}
