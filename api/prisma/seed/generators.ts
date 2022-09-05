import {
  User,
  Teams,
  Matches,
  Tournament,
  MatchStage,
  CodeStage,
} from "@prisma/client";
import { DbData } from "./data";
import { getRandom } from "./randomUtilities";
import {
  templateMatch,
  templatePrediction,
  templateUser,
  templateUserTournament,
} from "./templateData";

export const createTournament = (
  db: DbData,
  data: {
    tournament: Tournament;
    matches: {
      team_a: Teams;
      team_b: Teams;
      stage: MatchStage;
      code_stage: CodeStage;
      score_a?: number;
      score_b?: number;
      date?: Date;
    }[];
    userPredictions: number;
  }
): void => {
  const matches: Matches[] = [];
  const teams: Teams[] = [];

  data.matches.forEach((m) => {
    teams.push(m.team_a, m.team_b);
    matches.push({
      ...templateMatch(m.team_a.id, m.team_b.id, data.tournament.id),
      score_a: m.score_a ? m.score_a : null,
      score_b: m.score_b ? m.score_b : null,
      date: m.date ? m.date : null,
      stage: m.stage,
      code_stage: m.code_stage,
    });
  });

  for (let i = 0; i < data.userPredictions; i++) {
    const user = templateUser();
    db.users.push(user);
    db.userTournaments.push({
      ...templateUserTournament(
        user.id,
        data.tournament.id,
        getRandom(teams).id
      ),
      score: 0,
    });
    matches.forEach((m) =>
      db.predictions.push({
        ...templatePrediction(m.id, user.id, data.tournament.id),
      })
    );
  }

  db.teams.push(...teams);
  db.matches.push(...matches);
  db.tournaments.push(data.tournament);
};

export const createAdminUser = (
  db: DbData,
  full_name: string,
  email: string
): User => {
  const user = {
    ...templateUser(),
    full_name,
    email,
    username: full_name.toLowerCase().split(" ").join(""),
    is_active: true,
    is_admin: true,
  };
  db.users.push(user);
  return user;
};

export const createActiveUser = (db: DbData, email: string): User => {
  const user = {
    ...templateUser(),
    email,
    is_active: true,
  };
  db.users.push(user);
  return user;
};
