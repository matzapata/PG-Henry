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
import { getRandom } from "./randomUtilities";
import {
  templateMatch,
  templatePrediction,
  templateTeam,
  templateTournament,
  templateUser,
  templateUserTournament,
} from "./templateData";

const dbUsers: User[] = [];
const dbTournaments: Tournament[] = [];
const dbUserTournaments: UserTournament[] = [];
const dbTeams: Teams[] = [];
const dbPredictions: Predictions[] = [];
const dbMatches: Matches[] = [];
const dbComments: Comments[] = [];
const dbBanned: Banned[] = [];

const createAdminUser = (full_name: string, email: string) => ({
  ...templateUser(),
  full_name,
  email,
  username: full_name.toLowerCase().split(" ").join(""),
  is_active: true,
  is_admin: true,
});

const createActiveUser = (email: string) => ({
  ...templateUser(),
  email,
  is_active: true,
});

const createTournament = (_tournament: any) => {
  const creator: User = { ..._tournament.creator };
  const teams: Teams[] = [..._tournament.teams];
  const matches: Matches[] = [];
  const predictions: Predictions[] = [];
  const participants: User[] = [];
  const userTournaments: UserTournament[] = [];
  const tournament: Tournament = {
    ...templateTournament(creator.id),
    ..._tournament.tournament,
  };

  for (let i = 0; i < teams.length; i = i + 2) {
    matches.push({
      ...templateMatch(teams[i].id, teams[i + 1].id, tournament.id),
    });
  }

  for (let i = 0; i < _tournament.userPredictions; i++) {
    const user = templateUser();
    participants.push(user);
    userTournaments.push({
      ...templateUserTournament(user.id, tournament.id, getRandom(teams).id),
      score: 0,
    });
    matches.forEach((m) =>
      predictions.push({ ...templatePrediction(m.id, user.id, tournament.id) })
    );
  }

  dbUsers.push(creator, ...participants);
  dbTeams.push(...teams);
  dbMatches.push(...matches);
  dbPredictions.push(...predictions);
  dbUserTournaments.push(...userTournaments);
  dbTournaments.push(tournament);
};

const cuartosCopaLibertadores = {
  creator: createActiveUser("creator@gmail.com"),
  tournament: {
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
};

// Admin dbUsers
dbUsers.push(createAdminUser("Admin", "admin@gmail.com"));
dbUsers.push(createAdminUser("Agustin Zapata", "agustinzapata@gmail.com"));

// Tournaments
createTournament(cuartosCopaLibertadores);

export default {
  dbUsers,
  dbTournaments,
  dbUserTournaments,
  dbTeams,
  dbPredictions,
  dbMatches,
  dbComments,
  dbBanned,
};
