import {
  Comments,
  Matches,
  Predictions,
  Teams,
  Tournament,
  User,
  UserTournament,
  Banned,
} from "@prisma/client";
import {
  createActiveUser,
  createAdminUser,
  createBannedReasons,
  createRandomComment,
  createTournament,
  randomConcludedFinalTournament,
  randomIncomingQuarterTournament,
} from "./generators";
import { templateTeam, templateTournament } from "./templateData";

export type DbData = {
  users: User[];
  tournaments: Tournament[];
  userTournaments: UserTournament[];
  teams: Teams[];
  predictions: Predictions[];
  matches: Matches[];
  comments: Comments[];
  banned: Banned[];
};

const db: DbData = {
  users: [],
  tournaments: [],
  userTournaments: [],
  teams: [],
  predictions: [],
  matches: [],
  comments: [],
  banned: [],
};

// Admin dbUsers
createAdminUser(db, "Admin", "admin@gmail.com");
createAdminUser(db, "Agustin Zapata", "agustinzapata@gmail.com");

// Tournaments
const creator = createActiveUser(db, "creator@gmail.com");
createTournament(db, {
  tournament: {
    ...templateTournament(creator.id),
    name: "Cuartos copa libertadores 2020",
    status: "INCOMING",
  },
  matches: [
    {
      team_a: { ...templateTeam(), name: "Athletico paranaense" },
      team_b: { ...templateTeam(), name: "Estudiantes la plata" },
      stage: "QUARTERFINAL",
      code_stage: "QUARTERFINALA1",
    },
    {
      team_a: { ...templateTeam(), name: "Atletico mineiro" },
      team_b: { ...templateTeam(), name: "Palmeiras" },
      stage: "QUARTERFINAL",
      code_stage: "QUARTERFINALA2",
    },
    {
      team_a: { ...templateTeam(), name: "Flamengo" },
      team_b: { ...templateTeam(), name: "Corinthians" },
      stage: "QUARTERFINAL",
      code_stage: "QUARTERFINALB1",
    },
    {
      team_a: { ...templateTeam(), name: "Velez sarsfield" },
      team_b: { ...templateTeam(), name: "Talleres cordoba" },
      stage: "QUARTERFINAL",
      code_stage: "QUARTERFINALB2",
    },
  ],
  userPredictions: 30,
});

createTournament(db, randomIncomingQuarterTournament(creator.id));
createTournament(db, randomIncomingQuarterTournament(creator.id));
createTournament(db, randomIncomingQuarterTournament(creator.id));
createTournament(db, randomConcludedFinalTournament(creator.id));
createTournament(db, randomConcludedFinalTournament(creator.id));
createTournament(db, randomIncomingQuarterTournament(creator.id, true));

createRandomComment(db);

createBannedReasons(db);

export default db;
