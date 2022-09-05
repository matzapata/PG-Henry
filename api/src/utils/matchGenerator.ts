import { CodeStage, Matches, MatchStage } from "@prisma/client";

const stages: MatchStage[] = [
  "ROUNDOF32",
  "ROUNDOF16",
  "QUARTERFINAL",
  "SEMIFINAL",
  "FINAL",
];

const nextMatch = {
  ROUNDOF32A1: "ROUNDOF16A1",
  ROUNDOF32A2: "ROUNDOF16A1",
  ROUNDOF32A3: "ROUNDOF16A2",
  ROUNDOF32A4: "ROUNDOF16A2",
  ROUNDOF32A5: "ROUNDOF16A3",
  ROUNDOF32A6: "ROUNDOF16A3",
  ROUNDOF32A7: "ROUNDOF16A4",
  ROUNDOF32A8: "ROUNDOF16A4",

  ROUNDOF32B1: "ROUNDOF16B1",
  ROUNDOF32B2: "ROUNDOF16B1",
  ROUNDOF32B3: "ROUNDOF16B2",
  ROUNDOF32B4: "ROUNDOF16B2",
  ROUNDOF32B5: "ROUNDOF16B3",
  ROUNDOF32B6: "ROUNDOF16B3",
  ROUNDOF32B7: "ROUNDOF16B4",
  ROUNDOF32B8: "ROUNDOF16B4",

  ROUNDOF16A1: "QUARTERFINALA1",
  ROUNDOF16A2: "QUARTERFINALA1",
  ROUNDOF16A3: "QUARTERFINALA2",
  ROUNDOF16A4: "QUARTERFINALA2",

  ROUNDOF16B1: "QUARTERFINALB1",
  ROUNDOF16B2: "QUARTERFINALB1",
  ROUNDOF16B3: "QUARTERFINALB2",
  ROUNDOF16B4: "QUARTERFINALB2",

  QUARTERFINALA1: "SEMIFINALA",
  QUARTERFINALA2: "SEMIFINALA",

  QUARTERFINALB1: "SEMIFINALB",
  QUARTERFINALB2: "SEMIFINALB",

  SEMIFINALA1: "FINAL",
  SEMIFINALB1: "FINAL",

  FINAL: "FINAL",
};

function generateMatch(
  matchA: Matches,
  matchB: Matches
): {
  stage: MatchStage;
  team_a: string;
  team_b: string;
  code_stage: CodeStage | null;
} {
  if (matchA.score_a === null || matchA.score_b === null)
    throw new Error("Missing match A results");
  if (matchB.score_a === null || matchB.score_b === null)
    throw new Error("Missing match B results");

  const stage = stages[stages.findIndex((s) => s === matchA.stage) + 1];

  const winnerA =
    matchA.score_a > matchA?.score_b ? matchA.team_a_id : matchA.team_b_id;
  const winnerB =
    matchB.score_a > matchB?.score_b ? matchB.team_a_id : matchB.team_b_id;

  return {
    stage,
    team_a: winnerA,
    team_b: winnerB,
    code_stage:
      matchA.code_stage !== null
        ? (nextMatch[matchA.code_stage] as CodeStage)
        : null,
  };
}

export default generateMatch;
