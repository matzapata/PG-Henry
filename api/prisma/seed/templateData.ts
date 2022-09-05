import { faker } from "@faker-js/faker";
import {
  AuthProvider,
  Matches,
  MatchStage,
  Predictions,
  Teams,
  Tournament,
  TournamentType,
  User,
  UserTournament,
} from "@prisma/client";
import { getRandom } from "./randomUtilities";
import * as bcrypt from "bcryptjs";

export const templateUser = (password = "password"): User => {
  const full_name = faker.name.fullName();
  return {
    id: faker.datatype.uuid(),
    full_name,
    username: faker.internet.userName(...full_name.split(" ")),
    email: faker.internet.email(...full_name.split(" ")),
    password: bcrypt.hashSync(password, 8),
    birth_date: null,
    is_admin: false,
    authProvider: "JWT" as AuthProvider,
    verification_token: faker.datatype.uuid(),
    is_active: faker.datatype.boolean(),
    is_banned: faker.datatype.boolean(),
    last_access: faker.date.recent(),
    url_avatar: faker.image.avatar(),
    alias_mp: full_name,
  };
};

export const templateTournament = (
  creatorId: string,
  password = "password"
): Tournament => ({
  id: faker.datatype.uuid(),
  name: faker.company.name(),
  description: faker.lorem.sentences(),
  user_limit: null,
  status: getRandom(["INCOMING", "INPROGRESS", "CONCLUDED"]),
  type: "PUBLIC" as TournamentType,
  password: bcrypt.hashSync(password, 8),
  pool: 0,
  logo_url: null,
  is_official: false,
  creator_user_id: creatorId,
});

export const templateUserTournament = (
  userId: string,
  tournamentId: string,
  winnerTeamId: null | string
): UserTournament => ({
  id: faker.datatype.uuid(),
  score: faker.datatype.number({ min: 0, max: 50 }),
  position: null,
  compensation: 0,
  collected_payment: false,
  user_id: userId,
  tournament_id: tournamentId,
  winner_team_id: winnerTeamId,
});

export const templateTeam = (): Teams => ({
  id: faker.datatype.uuid(),
  name: faker.company.name(),
  shield_url: faker.image.abstract(640, 480, true),
});

export const templatePrediction = (
  matchId: string,
  userId: string,
  tournamentId: string
): Predictions => ({
  id: faker.datatype.uuid(),
  score_a: faker.datatype.number({ min: 0, max: 8 }),
  score_b: faker.datatype.number({ min: 0, max: 8 }),
  match_id: matchId,
  user_id: userId,
  tournament_id: tournamentId,
});

export const templateMatch = (
  teamAId: string,
  teamBId: string,
  tournamentId: string
): Matches => ({
  id: faker.datatype.uuid(),
  stage: "FINAL" as MatchStage,
  date: faker.date.future(),
  score_a: null,
  score_b: null,
  team_a_id: teamAId,
  team_b_id: teamBId,
  tournament_id: tournamentId,
  code_stage: null,
});
