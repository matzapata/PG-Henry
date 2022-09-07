import React, { useState } from "react";

import {
  Flex,
  Button,
  Heading,
  Box,
  Stack,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import TeamAdd from "./TeamAdd";
import TournamentForm from "./TournamentForm";
import MatchAdd from "./MatchAdd";
import { useHistory } from "react-router-dom";
import api from "../services/api";
import { BsCircle } from "react-icons/bs";
type Inputs = {
  tournament: Tournament;
  teams: Team[];
  matches: Match[];
};

type Tournament = {
  name: string;
  description: string;
  user_limit: number | undefined;
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

const Steper = () => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [CrearError, setCrearError] = useState("");
  const [pagina, setPagina] = useState(0);
  const [input, setInput] = useState<Inputs>({
    tournament: {
      name: "",
      description: "",
      user_limit: undefined,
      creator_user_id: "",
      type: "PUBLIC",
      logo_url: "",
      password: "",
    },
    teams: [],
    matches: [],
  });

  const siguientePaso = () => {
    setPagina(pagina + 1);
  };
  const volverPaso = () => {
    setPagina(pagina - 1);
  };

  const crear = async () => {
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
  function addTournament(inputTournamnet: Tournament) {
    setInput({ ...input, tournament: inputTournamnet });
  }
  function addTeams(newTeams: Team[]) {
    setInput({ ...input, teams: newTeams });
    actualizarMatches();
  }
  function addMatches(newMatch: Match[]) {
    setInput({ ...input, matches: newMatch });
  }
  function reset() {
    setInput({
      tournament: {
        name: "",
        description: "",
        user_limit: undefined,
        creator_user_id: "",
        type: "PUBLIC",
        logo_url: "",
        password: "",
      },
      teams: [],
      matches: [],
    });
    onClose();
    setPagina(0);
  }
  function actualizarMatches() {
    const teamsNames = input.teams.map((team) => {
      return team.name;
    });
    const el = input.teams.length;
    let newStage = "";

    if (el === 2) {
      newStage = "FINAL";
    } else {
      if (el === 4) {
        newStage = "SEMIFINAL";
      } else {
        if (el === 8) {
          newStage = "QUARTERFINAL";
        } else {
          if (el === 16) {
            newStage = "ROUNDOF16";
          } else {
            newStage = "ROUNDOF32";
          }
        }
      }
    }

    const newMatches = input.matches.filter((match) => {
      return (
        teamsNames.includes(match.team_a_name) &&
        teamsNames.includes(match.team_b_name) &&
        match.stage === newStage
      );
    });

    if (newMatches.length != input.matches.length)
      setInput({ ...input, matches: newMatches });
  }

  const cont = [
    <TournamentForm
      key={"0"}
      siguientePaso={siguientePaso}
      addTournament={addTournament}
      torneo={input.tournament}
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
    <Box key={"3"}>
      <Flex px={4} py={4} width="100%" flexDirection="column">
        <Button mx="auto" mt={"0"} onClick={onOpen} margin={"1rem"}>
          Reseterar formulario
        </Button>
        <Button mx="auto" mt={"0px"} onClick={volverPaso} margin={"1rem"}>
          Atras
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
          marginTop={"1rem"}
        >
          Crear Torneo
        </Button>
        <Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Resetear formulario</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                ¿Estás seguro? ¡Perderás la información ya ingresada!
              </ModalBody>

              <ModalFooter>
                <Button onClick={reset} mr={3}>
                  Resetear
                </Button>
                <Button onClick={onClose} colorScheme="blue" mr={3}>
                  Cerrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
    </Box>,
  ];

  return (
    <>
      <Box
        p="5"
        rounded={5}
        boxShadow={"lg"}
        bg={useColorModeValue("white", "gray.700")}
      >
        <Stack justifyContent="center" alignItems={"space-around"}>
          <Box
            display={"flex"}
            flexDir={{ base: "column", md: "row" }}
            alignItems={"start"}
            justifyContent="space-around"
          >
            <Stack
              flexDir="row"
              spacing="9px"
              justifyContent="center"
              alignItems={"center"}
            >
              <Stack p={"0.5rem"}>
                <label
                  style={
                    pagina == 0 ? { color: "lightblue" } : { color: "green" }
                  }
                >
                  Torneo
                </label>
              </Stack>

              <Stack p={"0.5rem"} paddingBottom="1rem">
                <BsCircle
                  style={
                    pagina == 0 ? { color: "lightblue" } : { color: "green" }
                  }
                />
              </Stack>
            </Stack>
            <Stack
              flexDir={"row"}
              spacing="9px"
              justifyContent="center"
              alignItems={"center"}
            >
              <Stack p={"0.5rem"}>
                <label
                  style={
                    pagina == 1
                      ? { color: "lightblue" }
                      : pagina == 0
                      ? { color: "black" }
                      : { color: "green" }
                  }
                >
                  Equipos
                </label>
              </Stack>
              <Stack p={"0.5rem"} paddingBottom="1rem">
                <BsCircle
                  style={
                    pagina == 1
                      ? { color: "lightblue" }
                      : pagina == 0
                      ? { color: "Black" }
                      : { color: "green" }
                  }
                />
              </Stack>
            </Stack>
            <Stack
              flexDir={"row"}
              spacing="9px"
              justifyContent="center"
              alignItems={"center"}
            >
              <Stack p={"0.5rem"}>
                <label
                  style={
                    pagina == 2
                      ? { color: "lightblue" }
                      : pagina == 0 || pagina == 1
                      ? { color: "black" }
                      : { color: "green" }
                  }
                >
                  Partidos
                </label>
              </Stack>
              <Stack p={"0.5rem"} paddingBottom="1rem">
                <BsCircle
                  style={
                    pagina == 2
                      ? { color: "lightblue" }
                      : pagina == 0 || pagina == 1
                      ? { color: "black" }
                      : { color: "green" }
                  }
                />
              </Stack>
            </Stack>
          </Box>
          {pagina === 0
            ? cont[0]
            : pagina === 1
            ? cont[1]
            : pagina === 2
            ? cont[2]
            : cont[3]}
        </Stack>
        {/*  */}
      </Box>
    </>
  );
};

export default Steper;
