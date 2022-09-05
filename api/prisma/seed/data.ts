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
  createTournament,
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
  teams: [
    { ...templateTeam(), name: "Athletico paranaense" },
    { ...templateTeam(), name: "Estudiantes la plata" },
    { ...templateTeam(), name: "Atletico mineiro" },
    { ...templateTeam(), name: "Palmeiras" },
    { ...templateTeam(), name: "Flamengo" },
    { ...templateTeam(), name: "Corinthians" },
    { ...templateTeam(), name: "Velez sarsfield" },
    { ...templateTeam(), name: "Talleres cordoba" },
  ],
  userPredictions: 30,
});

export default db;
