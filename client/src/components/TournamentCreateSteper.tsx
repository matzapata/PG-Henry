import React, { useState } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Flex, Button, Heading, Box, Stack } from "@chakra-ui/react";
import TeamAdd from "./TeamAdd";
import TournamentForm from "./TournamentForm";
import MatchAdd from "./MatchAdd";
import { useHistory } from "react-router-dom";
import api from "../services/api";

type Inputs = {
  tournament: Tournament;
  teams: Team[];
  matches: Match[];
};

type Tournament = {
  name: string;
  description: string;
  user_limit: number;
  creator_user_id: string;
  type: string;
  logo_url: string;
  password: string;
};

type Team = {
  name: string;
  shield_url: string;
  key: number;
};

type Match = {
  key: number;
  team_a_name: string;
  team_b_name: string;
  date: string;
  stage: string;
};

const steps = [
  { label: "Torneo" },
  { label: "Equipos" },
  { label: "Partidos" },
];

export const Steper = () => {
  const history = useHistory();
  const [CrearError, setCrearError] = useState("");
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [input, setInput] = useState<Inputs>({
    tournament: {
      name: "",
      description: "",
      user_limit: 0,
      creator_user_id: "",
      type: "PUBLIC",
      logo_url: "",
      password: "",
    },
    teams: [],
    matches: [],
  });

  const siguientePaso = () => {
    nextStep();
  };
  const volverPaso = () => {
    prevStep();
  };

  const crear = async () => {
    // setErrors(validate(input, true));

    try {
      const tournamentID = await api.post("/tournaments/create", {
        ...input,
      });

      history.push("/torneos/" + tournamentID.data);
    } catch (e: any) {
      console.log(e.response.data);

      setCrearError(e.response.data.message);
    }
  };
  function addTornament(inputTournamnet: Tournament) {
    setInput({ ...input, tournament: inputTournamnet });
  }
  function addTeams(newTeams: Team[]) {
    setInput({ ...input, teams: newTeams });
    actualizarMatches();
  }
  function addMatches(newMatch: Match[]) {
    setInput({ ...input, matches: newMatch });
  }
  function actualizarMatches() {
    const teamsNames = input.teams.map((team) => {
      return team.name;
    });
    const newMatches = input.matches.filter((match) => {
      return (
        teamsNames.includes(match.team_a_name) &&
        teamsNames.includes(match.team_b_name)
      );
    });

    if (newMatches.length != input.matches.length)
      setInput({ ...input, matches: newMatches });
  }

  const cont = [
    <TournamentForm
      key={"0"}
      siguientePaso={siguientePaso}
      addTornament={addTornament}
    />,

    <TeamAdd
      key={"1"}
      equipos={input.teams}
      addTeams={addTeams}
      siguientePaso={siguientePaso}
      volverPaso={volverPaso}
    />,
    <MatchAdd
      key={"2"}
      equipos={input.teams}
      partidos={input.matches}
      addMatches={addMatches}
      siguientePaso={siguientePaso}
      volverPaso={volverPaso}
    />,
  ];

  return (
    <>
      <Box>
        <Stack justifyContent="center">
          <Steps
            orientation="horizontal"
            activeStep={activeStep}
            justifyContent="center"
          >
            {steps.map(({ label }, index) => (
              <Step /* width="50%" */ label={label} key={label}>
                {cont[index]}
              </Step>
            ))}
          </Steps>
        </Stack>
        {activeStep === steps.length ? (
          <Flex px={4} py={4} width="100%" flexDirection="column">
            <Button mx="auto" mt={6} size="sm" onClick={reset}>
              Reset
            </Button>
            {CrearError && (
              <Heading fontSize="xxl" textAlign="center" color={"red.500"}>
                {CrearError}
              </Heading>
            )}

            <Button
              fontSize="22px"
              bg={"blue.400"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={crear}
            >
              Crear Torneo
            </Button>
          </Flex>
        ) : null}
      </Box>
    </>
  );
};

export default Steper;
