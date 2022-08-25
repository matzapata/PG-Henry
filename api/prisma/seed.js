"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
exports.__esModule = true;
var client_1 = require("@prisma/client");
var faker_1 = require("@faker-js/faker");
var bcrypt = require("bcryptjs");
var client = new client_1.PrismaClient();
function getRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function getMultipleRandom(arr, num) {
  var shuffled = __spreadArray([], arr, true).sort(function () {
    return 0.5 - Math.random();
  });
  return shuffled.slice(0, num);
}
function dropDb() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, client.userTournament.deleteMany({})];
        case 1:
          _a.sent();
          return [4 /*yield*/, client.predictions.deleteMany({})];
        case 2:
          _a.sent();
          return [4 /*yield*/, client.matches.deleteMany({})];
        case 3:
          _a.sent();
          return [4 /*yield*/, client.teams.deleteMany({})];
        case 4:
          _a.sent();
          return [4 /*yield*/, client.tournament.deleteMany({})];
        case 5:
          _a.sent();
          return [4 /*yield*/, client.user.deleteMany({})];
        case 6:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
}
function createRandomUser() {
  var _a, _b;
  var fullName = faker_1.faker.name.fullName();
  return {
    full_name: fullName,
    id: faker_1.faker.datatype.uuid(),
    username: (_a = faker_1.faker.internet).userName.apply(
      _a,
      fullName.split(" ")
    ),
    email: (_b = faker_1.faker.internet).email.apply(_b, fullName.split(" ")),
    password: bcrypt.hashSync("password", 8),
    birth_date: faker_1.faker.date.birthdate(),
    is_admin: false,
    verification_token: faker_1.faker.datatype.uuid(),
    is_active: faker_1.faker.datatype.boolean(),
    is_banned: faker_1.faker.datatype.boolean(),
    last_access: faker_1.faker.date.recent(),
  };
}
function createRandomTeam() {
  return {
    id: faker_1.faker.datatype.uuid(),
    name: faker_1.faker.company.name(),
    shield_url: faker_1.faker.image.abstract(),
  };
}
function createUserTournament(userId, winnerTeamId, tournamentId) {
  return {
    user: { connect: { id: userId } },
    winner: { connect: { id: winnerTeamId } },
    tournament: { connect: { id: tournamentId } },
  };
}
function createRandomPrediction(userId, matchId, tournamentId) {
  return {
    score_a: faker_1.faker.datatype.number({ min: 0, max: 8 }),
    score_b: faker_1.faker.datatype.number({ min: 0, max: 8 }),
    match: { connect: { id: matchId } },
    user: { connect: { id: userId } },
    tournament: { connect: { id: tournamentId } },
  };
}
function createRandomTournament(creatorUserId, status, type) {
  return {
    type: type ? type : getRandom(["PRIVATE", "PUBLIC"]),
    password: "password",
    name: faker_1.faker.company.name(),
    description: faker_1.faker.lorem.sentences(),
    user_limit: faker_1.faker.datatype.number({ min: 4, max: 100 }),
    status: status
      ? status
      : getRandom(["INCOMING", "INPROGRESS", "CONCLUDED"]),
    pool: faker_1.faker.datatype.number(),
    logo_url: faker_1.faker.image.abstract(),
    creator: { connect: { id: creatorUserId } },
  };
}
function createRandomMatch(
  teamAId,
  teamBId,
  tournamentId,
  stage,
  score_a,
  score_b
) {
  return {
    stage: stage,
    date: faker_1.faker.date.future(),
    score_a: score_a,
    score_b: score_b,
    team_a: { connect: { id: teamAId } },
    team_b: { connect: { id: teamBId } },
    tournament: { connect: { id: tournamentId } },
  };
}
function createFinalOnlyTournament(dbUsers, status) {
  return __awaiter(this, void 0, void 0, function () {
    var creatorUser, tournament, team_a, team_b, finalMatch, i, clientUser, e_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          creatorUser = getRandom(dbUsers);
          return [
            4 /*yield*/,
            client.tournament.create({
              data: createRandomTournament(creatorUser.id, status, "PUBLIC"),
            }),
          ];
        case 1:
          tournament = _a.sent();
          return [
            4 /*yield*/,
            client.teams.create({ data: createRandomTeam() }),
          ];
        case 2:
          team_a = _a.sent();
          return [
            4 /*yield*/,
            client.teams.create({ data: createRandomTeam() }),
          ];
        case 3:
          team_b = _a.sent();
          return [
            4 /*yield*/,
            client.matches.create({
              data:
                status === "INCOMING"
                  ? createRandomMatch(
                      team_a.id,
                      team_b.id,
                      tournament.id,
                      "FINAL"
                    )
                  : createRandomMatch(
                      team_a.id,
                      team_b.id,
                      tournament.id,
                      "FINAL",
                      1,
                      0
                    ),
            }),
          ];
        case 4:
          finalMatch = _a.sent();
          i = 0;
          _a.label = 5;
        case 5:
          if (!(i < 50)) return [3 /*break*/, 11];
          _a.label = 6;
        case 6:
          _a.trys.push([6, 9, , 10]);
          clientUser = getRandom(dbUsers);
          if (clientUser.id === creatorUser.id) return [3 /*break*/, 10];
          return [
            4 /*yield*/,
            client.userTournament.create({
              data: createUserTournament(
                clientUser.id,
                team_a.id,
                tournament.id
              ),
            }),
          ];
        case 7:
          _a.sent();
          return [
            4 /*yield*/,
            client.predictions.create({
              data: createRandomPrediction(
                clientUser.id,
                finalMatch.id,
                tournament.id
              ),
            }),
          ];
        case 8:
          _a.sent();
          return [3 /*break*/, 10];
        case 9:
          e_1 = _a.sent();
          return [3 /*break*/, 10];
        case 10:
          i++;
          return [3 /*break*/, 5];
        case 11:
          return [2 /*return*/];
      }
    });
  });
}
function createSemifinalTournament(dbUsers, status) {
  return __awaiter(this, void 0, void 0, function () {
    var creatorUser,
      tournament,
      team_a,
      team_b,
      team_c,
      team_d,
      abMatch,
      cdMatch,
      finalMatch,
      i,
      clientUser,
      e_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          creatorUser = getRandom(dbUsers);
          return [
            4 /*yield*/,
            client.tournament.create({
              data: createRandomTournament(creatorUser.id, status, "PUBLIC"),
            }),
          ];
        case 1:
          tournament = _a.sent();
          return [
            4 /*yield*/,
            client.teams.create({ data: createRandomTeam() }),
          ];
        case 2:
          team_a = _a.sent();
          return [
            4 /*yield*/,
            client.teams.create({ data: createRandomTeam() }),
          ];
        case 3:
          team_b = _a.sent();
          return [
            4 /*yield*/,
            client.teams.create({ data: createRandomTeam() }),
          ];
        case 4:
          team_c = _a.sent();
          return [
            4 /*yield*/,
            client.teams.create({ data: createRandomTeam() }),
          ];
        case 5:
          team_d = _a.sent();
          return [
            4 /*yield*/,
            client.matches.create({
              data:
                status === "INCOMING"
                  ? createRandomMatch(
                      team_a.id,
                      team_b.id,
                      tournament.id,
                      "SEMIFINAL"
                    )
                  : createRandomMatch(
                      team_a.id,
                      team_b.id,
                      tournament.id,
                      "SEMIFINAL",
                      1,
                      0
                    ),
            }),
          ];
        case 6:
          abMatch = _a.sent();
          return [
            4 /*yield*/,
            client.matches.create({
              data: createRandomMatch(
                team_c.id,
                team_d.id,
                tournament.id,
                "SEMIFINAL"
              ),
            }),
          ];
        case 7:
          cdMatch = _a.sent();
          return [
            4 /*yield*/,
            client.matches.create({
              data: createRandomMatch(
                team_a.id,
                team_d.id,
                tournament.id,
                "FINAL"
              ),
            }),
          ];
        case 8:
          finalMatch = _a.sent();
          i = 0;
          _a.label = 9;
        case 9:
          if (!(i < 50)) return [3 /*break*/, 17];
          _a.label = 10;
        case 10:
          _a.trys.push([10, 15, , 16]);
          clientUser = getRandom(dbUsers);
          if (clientUser.id === creatorUser.id) return [3 /*break*/, 16];
          return [
            4 /*yield*/,
            client.userTournament.create({
              data: createUserTournament(
                clientUser.id,
                team_a.id,
                tournament.id
              ),
            }),
          ];
        case 11:
          _a.sent();
          return [
            4 /*yield*/,
            client.predictions.create({
              data: createRandomPrediction(
                clientUser.id,
                abMatch.id,
                tournament.id
              ),
            }),
          ];
        case 12:
          _a.sent();
          return [
            4 /*yield*/,
            client.predictions.create({
              data: createRandomPrediction(
                clientUser.id,
                cdMatch.id,
                tournament.id
              ),
            }),
          ];
        case 13:
          _a.sent();
          return [
            4 /*yield*/,
            client.predictions.create({
              data: createRandomPrediction(
                clientUser.id,
                finalMatch.id,
                tournament.id
              ),
            }),
          ];
        case 14:
          _a.sent();
          return [3 /*break*/, 16];
        case 15:
          e_2 = _a.sent();
          return [3 /*break*/, 16];
        case 16:
          i++;
          return [3 /*break*/, 9];
        case 17:
          return [2 /*return*/];
      }
    });
  });
}
function seed() {
  return __awaiter(this, void 0, void 0, function () {
    var users, i, dbUsers, i;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.log("Seeding...");
          return [4 /*yield*/, dropDb()];
        case 1:
          _a.sent();
          users = [];
          for (i = 0; i < 1000; i++) users.push(createRandomUser());
          return [
            4 /*yield*/,
            client.user.createMany({
              data: users,
              skipDuplicates: true,
            }),
          ];
        case 2:
          _a.sent();
          return [4 /*yield*/, client.user.findMany({})];
        case 3:
          dbUsers = _a.sent();
          i = 0;
          _a.label = 4;
        case 4:
          if (!(i < 5)) return [3 /*break*/, 10];
          return [4 /*yield*/, createFinalOnlyTournament(dbUsers, "INCOMING")];
        case 5:
          _a.sent();
          return [
            4 /*yield*/,
            createFinalOnlyTournament(dbUsers, "INPROGRESS"),
          ];
        case 6:
          _a.sent();
          return [4 /*yield*/, createSemifinalTournament(dbUsers, "INCOMING")];
        case 7:
          _a.sent();
          return [
            4 /*yield*/,
            createSemifinalTournament(dbUsers, "INPROGRESS"),
          ];
        case 8:
          _a.sent();
          _a.label = 9;
        case 9:
          i++;
          return [3 /*break*/, 4];
        case 10:
          console.log("Done");
          return [2 /*return*/];
      }
    });
  });
}
seed();
