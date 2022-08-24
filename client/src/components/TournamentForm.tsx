import React, {
  FieldsetHTMLAttributes,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";

import {
  Container,
  Box,
  Text,
  Stack,
  Input,
  Button,
  Divider,
  Textarea,
  Select,
  Flex,
  InputRightElement,
  FormControl,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  Image,
  GridItem,
  SelectProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { check } from "prettier";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useHistory } from "react-router-dom";
//import teamSlice from "../redux/slices/teamSlice";

/*model Tournament {
  id              String            @unique @default(uuid())
  name            String            @unique
  description     String
  user_limit      Int
  creator_id      User              @relation(fields: [creator_user_id], references: [id])
  creator_user_id String
  status          Status            @default(INCOMING)
  type            TournamentType    @default(PUBLIC)
  pool            Int               @default(0)
  logo_url        String
  stage           TournamentStage
  tournament_id   User_Tournament[]
  predictions_id  Predictions[]
  matches_id      Matches[]
}

enum TournamentStage {
  FASEGROUP
  ROUNDOF32
  ROUNDOF16
  QUARTERFINAL
  SEMIFINAL
  FINAL
}

enum TournamentType {
  PRIVATE
  PUBLIC
}

enum Status {
  INCOMING
  INPROGRESS
  CONCLUDED
} 
model Teams {
  id         String    @unique @default(uuid())
  name       String    @unique
  shield_url String
  id_team_a  Matches[] @relation("team_a")
  id_team_b  Matches[] @relation("team_b")
}

model Matches {
  id            String      @unique @default(uuid())
  id_a          Teams       @relation(name: "team_a", fields: [team_a_id], references: [id])
  team_a_id     String
  id_b          Teams       @relation(name: "team_b", fields: [team_b_id], references: [id])
  team_b_id     String
  scores_a      Int
  scores_b      Int
  date          DateTime
  tournament    Tournament  @relation(fields: [tournament_id], references: [id])
  tournament_id String
  match_id      Predictions[]

  @@id([team_a_id, team_b_id])
}

*/
type Inputs = {
  name: string;
  description: string;
  user_limit: number;
  creator_user_id: number;
  is_public: boolean;
  type: string;
  logo_url: string;
  stage: string;
  password: string;
  teamName: string;
  teamShield: string;
  teamKey: number;
  teams: Team[];
  matches: Matches[];
  matchDate: string;
  team_a_name: string;
  team_b_name: string;
  matchKey: number;
};

type Team = {
  name: string;
  shield: string;
  key: number;
};

type Matches = {
  key: number;
  team_a_name: string;
  team_b_name: string;
  date: string;
};

const validateTeamNames = (teams: Team[], newName: string) => {
  const result = teams.map((team) => {
    return team.name === newName ? true : false;
  });
  if (result.includes(true)) {
    alert("ya existe");
    return false;
  }
  return true;
};

export default function TournamentForm(): JSX.Element {
  const history = useHistory();
  //const currentTeams = useAppSelector((state) => state.teams);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState<Inputs>({
    name: "",
    description: "",
    user_limit: 0,
    creator_user_id: 0,
    is_public: true,
    type: "PUBLIC",
    logo_url: "",
    stage: "",
    password: "",
    teamName: "",
    teamShield: "",
    teamKey: 0,
    teams: [],
    matches: [],
    matchDate: "",
    team_a_name: "",
    team_b_name: "",
    matchKey: 0,
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
  const agregaEquipo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateTeamNames(input.teams, input.teamName)) {
      setInput({
        ...input,
        teams: [
          ...input.teams,
          {
            name: input.teamName,
            shield: input.teamShield,
            key: input.teamKey,
          },
        ],
        teamName: "",
        teamShield: "",
        teamKey: input.teamKey + 1,
      });
    }
  };
  const quitarEquipo = (e: any) => {
    const newInputTeam = input.teams.filter((el) => {
      return el.key != e.target.value;
    });

    setInput({ ...input, teams: newInputTeam });
  };
  const agregaPartido = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setInput({
      ...input,
      matches: [
        ...input.matches,
        {
          team_a_name: input.team_a_name,
          team_b_name: input.team_b_name,
          date: input.matchDate,
          key: input.teamKey,
        },
      ],
      teamName: "",
      teamShield: "",
      teamKey: input.teamKey + 1,
    });
  };
  const quitarPartido = (e: any) => {
    const newInputMatch = input.matches.filter((el) => {
      return el.key != e.target.value;
    });

    setInput({ ...input, matches: newInputMatch });
  };
  const llenarSelect = (teams: Team[]) => {
    const selectA: any = document.getElementById("team_a");
    const selectB: any = document.getElementById("team_b");
    for (let i = selectA?.options.length; i >= 0; i--) {
      selectA.remove(i);
      selectB.remove(i);
    }
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
    llenarSelect(input.teams);
  }, [input.teams]);
  console.log(input);
  return (
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
            <Stack direction="row" spacing={4}>
              <Input
                type="text"
                name="name"
                value={input.name}
                placeholder="Nombre del torneo"
                onChange={cambiosEnInput}
              />
              <Select name="type" onChange={cambiosEnInput}>
                <option value="PRIVATE">Privado</option>
                <option value="PUBLIC" selected>
                  Público
                </option>
              </Select>
            </Stack>
            {input.type === "PRIVATE" && (
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                  ></InputLeftElement>
                  <Input
                    name="password"
                    onChange={cambiosEnInput}
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña para el torneo"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      backgroundColor="gray"
                      mr="0.5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}

            <Stack spacing={1}>
              <Text mb="8px">Descripción: </Text>
              <Textarea
                name="description"
                value={input.description}
                placeholder="Descripción"
                size="sm"
                onChange={cambiosEnInput}
              />
            </Stack>

            <Flex inputMode="numeric">
              <FormControl>
                <InputGroup>
                  <NumberInput>
                    <NumberInputField
                      inputMode="numeric"
                      type="number"
                      name="user_limit"
                      value={input.user_limit}
                      placeholder="Cantidad máxima de usuarios"
                      onChange={cambiosEnInput}
                    />
                  </NumberInput>
                </InputGroup>
              </FormControl>
            </Flex>

            <Box>
              <form onSubmit={agregaEquipo}>
                <Text>Agregar Equipos</Text>
                <Stack direction="row" spacing={4}>
                  <Input
                    type="text"
                    name="teamName"
                    value={input.teamName}
                    placeholder="Nombre"
                    onChange={cambiosEnInput}
                  />
                  <Input
                    type="text"
                    name="teamShield"
                    value={input.teamShield}
                    placeholder="Escudo"
                    onChange={cambiosEnInput}
                  />
                  <Button type="submit">Agregar</Button>
                </Stack>
              </form>

              {!!input.teams.length &&
                input.teams.map((el) => (
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
                      <Image
                        src={el.shield}
                        w="4rem"
                        h="4rem"
                        fit="cover"
                        borderRadius={"20px"}
                      />

                      <Stack p="5px" spacing={3}>
                        <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                          {el.name}
                        </Text>
                      </Stack>
                      <Button value={el.key} onClick={quitarEquipo}>
                        X
                      </Button>
                    </GridItem>
                  </Box>
                ))}
            </Box>
            <Box>
              {/*  /////////////////PARTIDOS////////////////// */}

              <form onSubmit={agregaPartido}>
                <Text>Agregar Partidos</Text>

                <FormControl
                  isInvalid={
                    input.team_a_name !== input.team_b_name ||
                    !input.teams.length
                      ? false
                      : true
                  }
                >
                  <Stack direction="row" spacing={4}>
                    <Select
                      id="team_a"
                      name="team_a_name"
                      onChange={cambiosEnInput}
                    ></Select>
                    <Text>Vs.</Text>
                    <Select
                      id="team_b"
                      name="team_b_name"
                      onChange={cambiosEnInput}
                    ></Select>
                    <Input
                      type="date"
                      name="date"
                      value={input.matchDate}
                      onChange={cambiosEnInput}
                    />
                    <Button
                      type="submit"
                      disabled={
                        !input.teams.length ||
                        input.team_a_name === input.team_b_name
                          ? true
                          : false
                      }
                    >
                      Agregar
                    </Button>
                  </Stack>
                  <FormErrorMessage>Partido inválido</FormErrorMessage>
                </FormControl>
              </form>

              {!!input.matches.length &&
                input.matches.map((el) => (
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
                      </Stack>
                      <Button value={el.key} onClick={quitarPartido}>
                        X
                      </Button>
                    </GridItem>
                  </Box>
                ))}
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}
