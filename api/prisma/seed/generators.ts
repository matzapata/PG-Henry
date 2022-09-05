import { faker } from "@faker-js/faker";
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
  templateBanned,
  templateComment,
  templateMatch,
  templatePrediction,
  templateTeam,
  templateTournament,
  templateUser,
  templateUserTournament,
} from "./templateData";

type TournamentData = {
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
};

export const createTournament = (db: DbData, data: TournamentData): void => {
  const matches: Matches[] = [];
  const teams: Teams[] = [];

  data.matches.forEach((m) => {
    teams.push(m.team_a, m.team_b);
    matches.push({
      ...templateMatch(m.team_a.id, m.team_b.id, data.tournament.id),
      score_a: m.score_a !== undefined ? m.score_a : null,
      score_b: m.score_b !== undefined ? m.score_b : null,
      date: m.date ? m.date : null,
      stage: m.stage,
      code_stage: m.code_stage,
    });
  });

  for (let i = 0; i < data.userPredictions; i++) {
    const user = templateUser();
    const userTournament = {
      ...templateUserTournament(
        user.id,
        data.tournament.id,
        getRandom(teams).id
      ),
      score: faker.datatype.number({ min: 0, max: matches.length }) * 3,
    };
    matches.forEach((m) => {
      const prediction = templatePrediction(m.id, user.id, data.tournament.id);

      db.predictions.push(prediction);
    });

    db.users.push(user);
    db.userTournaments.push(userTournament);
    data.tournament.pool += 160;
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
    is_banned: false,
  };
  db.users.push(user);
  return user;
};

export const createActiveUser = (db: DbData, email: string): User => {
  const user = {
    ...templateUser(),
    email,
    is_active: true,
    is_banned: false,
  };
  db.users.push(user);
  return user;
};

export const randomIncomingQuarterTournament = (
  creatorId: string,
  isPrivate?: boolean
): TournamentData => ({
  tournament: {
    ...templateTournament(creatorId),
    name: faker.company.name(),
    status: "INCOMING",
    type: isPrivate ? "PRIVATE" : "PUBLIC",
  },
  matches: [
    {
      team_a: { ...templateTeam(), name: faker.company.name() },
      team_b: { ...templateTeam(), name: faker.company.name() },
      stage: "QUARTERFINAL",
      code_stage: "QUARTERFINALA1",
      date: faker.date.soon(),
    },
    {
      team_a: { ...templateTeam(), name: faker.company.name() },
      team_b: { ...templateTeam(), name: faker.company.name() },
      stage: "QUARTERFINAL",
      code_stage: "QUARTERFINALA2",
      date: faker.date.soon(),
    },
    {
      team_a: { ...templateTeam(), name: faker.company.name() },
      team_b: { ...templateTeam(), name: faker.company.name() },
      stage: "QUARTERFINAL",
      code_stage: "QUARTERFINALB1",
      date: faker.date.soon(),
    },
    {
      team_a: { ...templateTeam(), name: faker.company.name() },
      team_b: { ...templateTeam(), name: faker.company.name() },
      stage: "QUARTERFINAL",
      code_stage: "QUARTERFINALB2",
      date: faker.date.soon(),
    },
  ],
  userPredictions: faker.datatype.number({ min: 30, max: 50 }),
});

export const randomConcludedFinalTournament = (
  creatorId: string
): TournamentData => ({
  tournament: {
    ...templateTournament(creatorId),
    name: faker.company.name(),
    status: "CONCLUDED",
  },
  matches: [
    {
      team_a: { ...templateTeam(), name: faker.company.name() },
      team_b: { ...templateTeam(), name: faker.company.name() },
      score_a: 5,
      score_b: 0,
      stage: "FINAL",
      code_stage: "FINAL",
      date: faker.date.recent(),
    },
  ],
  userPredictions: faker.datatype.number({ min: 30, max: 50 }),
});

export const createComment = (
  db: DbData,
  message?: string,
  userId?: string
): void => {
  let creatorId = userId;
  if (creatorId === undefined) {
    const user = createActiveUser(db, faker.internet.email());
    creatorId = user.id;
  }
  const comment = templateComment(creatorId);
  if (message !== undefined) comment.comentaries = message;
  db.comments.push(comment);
};

export const createRandomComment = (db: DbData): void => {
  createComment(db, faker.lorem.sentence());
};

export const createBannedReasons = (db: DbData): void => {
  db.users.forEach((u) => {
    if (u.is_banned) {
      db.banned.push({
        ...templateBanned("admin", u.id),
      });
    }
  });
};
