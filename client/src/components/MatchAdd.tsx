import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Text,
  Flex,
  Stack,
  Input,
  Button,
  GridItem,
  FormControl,
  FormErrorMessage,
  Select,
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
type props = {
  cb: any;
  equipos: Team[];
};
function validate(input: Match, matches: Match[], agregar = false) {
  const errors = {
    teams: "",
    stage: "",
    date: "",
    matches: "",
  };
  if (input.team_a_name != "Equipo A" && input.team_b_name != "Equipo B") {
    if (input.team_a_name !== input.team_b_name) {
      errors.teams = "Completado";
    } else {
      errors.teams = "Partido Inválido";
    }
  }
  console.log(matches);
  console.log(input);
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
          match.team_b_name === input.team_b_name ||
          match.team_b_name === input.team_a_name
        )
          errors.matches =
            "El equipo " + input.team_b_name + " ya tiene un partido asignado.";
      }
    }
  });

  if (!!input.stage.length) errors.stage = "Completado";
  if (!!input.date.length) errors.date = "Completado";
  if (agregar) {
    if (errors.teams === "") errors.teams = "Campo Requerido";
    if (errors.stage === "") errors.stage = "Campo Requerido";
    if (errors.date === "") errors.date = "Campo Requerido";
  }
  return errors;
}
export default function MatchAdd(props: props): JSX.Element {
  const { equipos } = props;
  const { cb } = props;
  const [matches, setMatches] = useState<Match[]>([]);
  const [input, setInput] = useState<Match>({
    key: 0,
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

  const cambiosEnInput = (
    e:
      | React.FormEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
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
      newErrors.stage === "Completado" &&
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
          stage: input.stage,
        },
      ]);
      setInput({ ...input, key: input.key + 1 });
    }
  };
  const quitarPartido = (e: any) => {
    const newInputMatch = matches.filter((el) => {
      return el.key != e.target.value;
    });

    setMatches(newInputMatch);
  };
  const llenarSelect = (teams: Team[]) => {
    const selectA: any = document.getElementById("team_a");
    const selectB: any = document.getElementById("team_b");
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
    for (let i = 0; i < teams.length; i++) {
      const aTag = document.createElement("option");
      const aTag2 = document.createElement("option");
      //Agrego un caractére alfabético en el nombre del atributo, por que no puede recivir solo números.
      aTag.setAttribute("a" + teams[i].key, teams[i].name);
      aTag2.setAttribute("b" + teams[i].key, teams[i].name);

      aTag.innerHTML = teams[i].name;
      aTag2.innerHTML = teams[i].name;

      selectA?.appendChild(aTag);
      selectB?.appendChild(aTag2);
    }
    setInput({
      ...input,
      team_a_name: selectA.value,
      team_b_name: selectB.value,
    });
  };
  function actualizarMatches() {
    const teamsNames = equipos.map((team) => {
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

  useEffect(() => {
    llenarSelect(equipos);
    actualizarMatches();
  }, [equipos]);
  useEffect(() => {
    cb(matches);
  }, [matches]);

  return (
    <div>
      <Container>
        <Flex>
          <Box
            h="100%"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            p="20px"
            backgroundColor="rgba(57,70,100,0.9)"
          >
            <Stack spacing="9px">
              <form onSubmit={agregaPartido}>
                <Text>Agregar Partidos</Text>

                <FormControl
                /* isInvalid={
                    input.team_a_name !== input.team_b_name || !equipos.length
                      ? false
                      : true
                  } */
                >
                  <Stack direction="column" spacing={4}>
                    <FormControl
                      isInvalid={
                        errors.teams === "Completado" || errors.teams === ""
                          ? false
                          : true
                      }
                    >
                      <Stack direction="row" spacing={4}>
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
                      <FormControl
                        isInvalid={
                          errors.stage === "Completado" || errors.stage === ""
                            ? false
                            : true
                        }
                      >
                        <Select name="stage" onChange={cambiosEnInput}>
                          <option selected value="">
                            Instacia
                          </option>
                          <option value={"FASEGROUP"}>Fase de Grupo</option>
                          <option value={"ROUNDOF32"}>Ronda de 32</option>
                          <option value={"QUARTERFINAL"}>
                            Cuartos de final
                          </option>
                          <option value={"SEMIFINAL"}>Semifinal</option>
                          <option value={"FINAL"}>Final</option>
                        </Select>
                        <FormErrorMessage>{errors.stage}</FormErrorMessage>
                      </FormControl>
                    </Stack>

                    <Button
                      type="submit"
                      /* disabled={
                        !equipos.length ||
                        input.team_a_name === input.team_b_name ||
                        input.team_a_name === "Equipo A" ||
                        input.team_b_name === "Equipo B" ||
                        input.stage === ""
                          ? true
                          : false
                      } */
                    >
                      Agregar
                    </Button>
                    {errors.matches != "Completado" && (
                      <Text color="red.500">{errors.matches}</Text>
                    )}
                  </Stack>

                  <FormErrorMessage>Partido inválido</FormErrorMessage>
                </FormControl>
              </form>

              {!!matches.length &&
                matches.map((el) => (
                  <Box key={el.key}>
                    <GridItem
                      _hover={{
                        bgColor: "#04879C",
                      }}
                      boxShadow="dark-lg"
                      transition="200ms ease"
                      backgroundColor="rgba(57,91,100,0.7)"
                      borderRadius="20px"
                      display={"flex"}
                      flexDirection="column"
                      p="5px"
                      w="auto"
                      margin="5px"
                    >
                      <Stack
                        p="5px"
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                        direction="row"
                      >
                        <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                          {el.team_a_name}
                        </Text>
                        <Text> Vs. </Text>
                        <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                          {el.team_b_name}
                        </Text>
                        <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                          {el.date}
                        </Text>
                        <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                          {el.stage}
                        </Text>
                        <Button value={el.key} onClick={quitarPartido}>
                          X
                        </Button>
                      </Stack>
                    </GridItem>
                  </Box>
                ))}
            </Stack>
          </Box>
        </Flex>
      </Container>
    </div>
  );
}
