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
  };

  const agregaPartido = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      aTag.setAttribute(teams[i].name, teams[i].name);
      aTag2.setAttribute(teams[i].name, teams[i].name);

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

  useEffect(() => {
    llenarSelect(equipos);
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
            backgroundColor="rgba(57,91,100,0.9)"
          >
            <Stack spacing="9px">
              <form onSubmit={agregaPartido}>
                <Text>Agregar Partidos</Text>

                <FormControl
                  isInvalid={
                    input.team_a_name !== input.team_b_name || !equipos.length
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
                    <Input
                      type="date"
                      name="date"
                      value={input.date}
                      onChange={cambiosEnInput}
                    />
                    <Button
                      type="submit"
                      disabled={
                        !equipos.length ||
                        input.team_a_name === input.team_b_name ||
                        input.team_a_name === "Equipo A" ||
                        input.team_b_name === "Equipo B" ||
                        input.stage === ""
                          ? true
                          : false
                      }
                    >
                      Agregar
                    </Button>
                    <Select name="stage" onChange={cambiosEnInput}>
                      <option selected value="">
                        Instacia
                      </option>
                      <option value={"FASEGROUP"}>FASEGROUP</option>
                      <option value={"ROUNDOF32"}>ROUNDOF32</option>
                      <option value={"QUARTERFINAL"}>QUARTERFINAL</option>
                      <option value={"SEMIFINAL"}>SEMIFINAL</option>
                      <option value={"FINAL"}>FINAL</option>
                    </Select>
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
                      p="5px"
                      w="auto"
                      margin="5px"
                    >
                      <Stack p="5px" spacing={3}>
                        <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                          {el.team_a_name}
                        </Text>
                        <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                          {el.team_b_name}
                        </Text>
                        <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                          {el.date}
                        </Text>
                        <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                          {el.stage}
                        </Text>
                      </Stack>
                      <Button value={el.key} onClick={quitarPartido}>
                        X
                      </Button>
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
