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

const stageTeamsMap = (
  length: number
): { stage: MatchStage; codes: CodeStage[] } | null => {
  if (length === 2) return { stage: "FINAL", codes: ["FINAL"] };
  else if (length === 4)
    return { stage: "SEMIFINAL", codes: ["SEMIFINALA1", "SEMIFINALB1"] };
  else if (length === 8)
    return {
      stage: "QUARTERFINAL",
      codes: [
        "QUARTERFINALA1",
        "QUARTERFINALA2",
        "QUARTERFINALB1",
        "QUARTERFINALB2",
      ],
    };
  return null;
};

export const createTournament = (
  db: DbData,
  data: {
    tournament: Tournament;
    teams: Teams[];
    userPredictions: number;
  }
): void => {
  const matches: Matches[] = [];

  const stages = stageTeamsMap(data.teams.length);
  if (!stages) throw new Error("Wrong teams number");

  let teamIndex = 0;
  for (const code_stage of stages.codes) {
    matches.push({
      ...templateMatch(
        data.teams[teamIndex].id,
        data.teams[teamIndex + 1].id,
        data.tournament.id
      ),
      stage: stages.stage,
      code_stage,
    });
    teamIndex += 2;
  }

  for (let i = 0; i < data.userPredictions; i++) {
    const user = templateUser();
    db.users.push(user);
    db.userTournaments.push({
      ...templateUserTournament(
        user.id,
        data.tournament.id,
        getRandom(data.teams).id
      ),
      score: 0,
    });
    matches.forEach((m) =>
      db.predictions.push({
        ...templatePrediction(m.id, user.id, data.tournament.id),
      })
    );
  }

  db.teams.push(...data.teams);
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
