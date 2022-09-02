import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Text,
  Stack,
  Input,
  Button,
  GridItem,
  FormControl,
  FormErrorMessage,
  Select,
  useColorModeValue,
  Flex,
  Heading,
} from "@chakra-ui/react";

type Match = {
  key: number;
  team_a_name: string;
  team_b_name: string;
  date: string;
  stage: string;
};

type Team = {
  name: string;
  shield_url: string;
  key: number;
};

function validate(input: Match, matches: Match[], agregar = false) {
  const errors = {
    teams: "",
    stage: "",
    date: "",
    matches: "",
  };
  if (input.team_a_name != "Equipo A" && input.team_b_name != "Equipo B")
    if (input.team_a_name !== input.team_b_name) {
      errors.teams = "Completado";
    } else {
      errors.teams = "Partido Inválido";
    }

  const tiempoTranscurrido = Date.now();
  const hoyN = new Date(tiempoTranscurrido);

  const hoy = hoyN.toLocaleDateString();
  const yyyy = Number(hoy.slice(5)).toString();

  if (!!input.date.length) {
    errors.date = "Completado";
    if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(input.date))
      errors.date = " Fecha inválida";
    const index = input.date.toString().indexOf("-");
    if (
      input.date.slice(0, index).length > 4 ||
      input.date.slice(0, index) < yyyy
    ) {
      errors.date = " Año inválido";
    }
  }
  matches.map((match: Match) => {
    if (
      (match.team_a_name === input.team_a_name &&
        match.team_b_name === input.team_b_name) ||
      (match.team_a_name === input.team_b_name &&
        match.team_b_name === input.team_a_name)
    ) {
      errors.matches =
        "El partido entre " +
        input.team_a_name +
        " y " +
        input.team_b_name +
        " ya está programado.";
    } else {
      if (
        match.team_a_name === input.team_a_name ||
        match.team_b_name === input.team_a_name
      ) {
        errors.matches =
          "El equipo " + input.team_a_name + " ya tiene un partido asignado.";
      } else {
        if (
          match.team_a_name === input.team_b_name ||
          match.team_b_name === input.team_b_name
        )
          errors.matches =
            "El equipo " + input.team_b_name + " ya tiene un partido asignado.";
      }
    }
  });

  if (agregar) {
    if (errors.teams === "") errors.teams = "Campo Requerido";
    if (errors.date === "") errors.date = "Campo Requerido";
  }
  return errors;
}
export default function MatchAdd({
  equipos,
  partidos,
  addMatches,
  siguientePaso,
  volverPaso,
}: any): JSX.Element {
  const [createError, setCreateError] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [input, setInput] = useState<Match>({
    key: 1000,
    team_a_name: "",
    team_b_name: "",
    date: "",
    stage: "",
  });
  const [errors, setErrors] = useState({
    teams: "",
    stage: "",
    date: "",
    matches: "",
  });
  const [_stage, set_stage] = useState("");

  const cambiosEnInput = (
    e:
      | React.FormEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (
      e.currentTarget.name === "team_a_name" ||
      e.currentTarget.name === "team_b_name"
    ) {
      llenarSelect(equipos);
    }
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    setErrors(
      validate(
        {
          ...input,
          [e.currentTarget.name]: e.currentTarget.value,
        },
        matches
      )
    );
  };

  const agregaPartido = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate(input, matches, true);
    setErrors(newErrors);
    if (
      newErrors.date === "Completado" &&
      newErrors.teams === "Completado" &&
      newErrors.matches === ""
    ) {
      setMatches([
        ...matches,
        {
          team_a_name: input.team_a_name,
          team_b_name: input.team_b_name,
          date: input.date,
          key: input.key,
          stage: _stage,
        },
      ]);
      addMatches([
        ...matches,
        {
          team_a_name: input.team_a_name,
          team_b_name: input.team_b_name,
          date: input.date,
          key: input.key,
          stage: _stage,
        },
      ]);
      setInput({ ...input, key: input.key + 1 });
      setCreateError("");
    }
  };
  const quitarPartido = (e: any) => {
    const newInputMatch = matches.filter((el) => {
      return el.key != e.target.value;
    });
    setErrors(validate(input, newInputMatch, false));
    setMatches(newInputMatch);
    addMatches(newInputMatch);
  };
  const llenarSelect = (teams: Team[]) => {
    const selectA: any = document.getElementById("team_a");
    const selectB: any = document.getElementById("team_b");
    let teamsA: Team[] = teams;
    let teamsB: Team[] = teams;
    let indexA;
    let indexB;

    const NameselectedA = selectA.value;
    const NameselectedB = selectB.value;

    teamsB = teams.filter((team: Team) => {
      return team.name != selectA.value;
    });

    teamsA = teams.filter((team: Team) => {
      return team.name != selectB.value;
    });

    for (let i = selectA?.options.length; i >= 0; i--) {
      selectA.remove(i);
      selectB.remove(i);
    }
    const EA = document.createElement("option");
    const EB = document.createElement("option");
    EA.setAttribute("A", "");
    EB.setAttribute("B", "");

    EA.innerHTML = "Equipo A";
    EB.innerHTML = "Equipo B";

    selectA?.appendChild(EA);
    selectB?.appendChild(EB);
    for (let i = 0; i < teamsA.length; i++) {
      const aTag = document.createElement("option");
      aTag.setAttribute("a" + teamsA[i].key, teamsA[i].name);
      aTag.innerHTML = teamsA[i].name;
      selectA?.appendChild(aTag);

      if (teamsA[i].name === NameselectedA) {
        indexA = i;
      }
    }
    for (let j = 0; j < teamsB.length; j++) {
      const aTag2 = document.createElement("option");
      aTag2.setAttribute("b" + teamsB[j].key, teamsB[j].name);
      aTag2.innerHTML = teamsB[j].name;
      selectB?.appendChild(aTag2);
      if (teamsB[j].name === NameselectedB) {
        indexB = j;
      }
    }

    if (indexA || indexA === 0) {
      selectA.children[indexA + 1].selected = true;
    }
    if (indexB || indexB === 0) {
      selectB.children[indexB + 1].selected = true;
    }

    setInput({
      ...input,
      team_a_name: selectA.value,
      team_b_name: selectB.value,
    });
  };
  function actualizarMatches() {
    const teamsNames = equipos.map((team: Team) => {
      return team.name;
    });
    const newMatches = matches.filter((match) => {
      return (
        teamsNames.includes(match.team_a_name) &&
        teamsNames.includes(match.team_b_name)
      );
    });

    if (newMatches.length != matches.length) setMatches(newMatches);
  }
  const crear = async () => {
    if (!matches.length) {
      setCreateError("Debe haber al menos 1 partido");
    } else {
      addMatches(matches);
      siguientePaso();
    }
  };

  const llenar_stage = () => {
    const el = equipos.length;
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
    set_stage(newStage);
  };

  useEffect(() => {
    setMatches(partidos);
    actualizarMatches();
    llenar_stage();
  }, []);

  useEffect(() => {
    llenarSelect(equipos);
    actualizarMatches();
  }, [equipos]);

  return (
    <Container p="0px">
      <Box
        h="100%"
        display="flex"
        flexDir="column"
        alignItems="space-between"
        justifyContent="space-between"
        p="12px"
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
      >
        <Stack spacing="9px">
          <form onSubmit={agregaPartido}>
            <Stack direction="column" spacing={4} alignItems="space-between">
              <FormControl
                isInvalid={
                  errors.teams === "Completado" || errors.teams === ""
                    ? false
                    : true
                }
              >
                <Heading marginBottom={"55px"}>{_stage}</Heading>
                <Stack direction="row" spacing={4} alignItems="center">
                  <Select
                    id="team_a"
                    name="team_a_name"
                    onChange={cambiosEnInput}
                  >
                    <option value="" selected disabled hidden>
                      Equipo A
                    </option>
                  </Select>
                  <Text>Vs.</Text>
                  <Select
                    id="team_b"
                    name="team_b_name"
                    onChange={cambiosEnInput}
                  >
                    <option value="" selected disabled hidden>
                      Equipo B
                    </option>
                  </Select>
                </Stack>
                <FormErrorMessage>{errors.teams}</FormErrorMessage>
              </FormControl>

              <Stack direction="row" spacing={4}>
                <FormControl
                  isInvalid={
                    errors.date === "Completado" || errors.date === ""
                      ? false
                      : true
                  }
                >
                  <Input
                    type="date"
                    name="date"
                    value={input.date}
                    onChange={cambiosEnInput}
                  />
                  <FormErrorMessage>{errors.date}</FormErrorMessage>
                </FormControl>
              </Stack>

              {errors.matches != "Completado" && (
                <Text color="red.500">{errors.matches}</Text>
              )}
              <Button
                type="submit"
                bg={"blue.400"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Agregar
              </Button>
            </Stack>
          </form>

          {!!matches.length &&
            matches.map((el) => (
              <Box key={el.key}>
                <GridItem
                  boxShadow="dark-lg"
                  transition="200ms ease"
                  backgroundColor="#04878C"
                  borderRadius="20px"
                  display={"flex"}
                  flexDirection="column"
                  p="10px"
                  w="auto"
                  margin="5px"
                >
                  <Stack
                    p="5px"
                    spacing={3}
                    justifyContent="space-around"
                    alignItems="center"
                    direction="row"
                    word-wrap="anywhere"
                  >
                    <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                      {el.date}
                    </Text>
                    <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                      {el.team_a_name}
                    </Text>
                    <Text>Vs.</Text>
                    <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                      {el.team_b_name}
                    </Text>
                    <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                      {el.stage}
                    </Text>
                    <Button
                      value={el.key}
                      onClick={quitarPartido}
                      bg="red.300"
                      _hover={{
                        bgColor: "red.500",
                      }}
                    >
                      X
                    </Button>
                  </Stack>
                </GridItem>
              </Box>
            ))}
          <Flex mt="4" alignItems="center">
            <FormControl
              isInvalid={
                createError === "Completado" || createError === ""
                  ? false
                  : true
              }
            >
              <FormErrorMessage justifyContent="center">
                {createError}
              </FormErrorMessage>
            </FormControl>
          </Flex>
          <Button onClick={crear}>Siguiente </Button>
          <Button onClick={volverPaso}>Anterior </Button>
        </Stack>
      </Box>
    </Container>
  );
}
