import React, { useEffect, useState } from "react";

import {
  Container,
  Box,
  Text,
  Stack,
  Input,
  Button,
  Textarea,
  Select,
  Flex,
  InputRightElement,
  FormControl,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  GridItem,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { check } from "prettier";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useHistory } from "react-router-dom";
import TeamAdd from "./TeamAdd";
import MatchAdd from "./MatchAdd";
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

  teams: Team[];
  matches: Match[];
};

type Team = {
  name: string;
  shield: string;
  key: number;
};

type Match = {
  key: number;
  team_a_name: string;
  team_b_name: string;
  date: string;
};

export default function TournamentForm(): JSX.Element {
  const history = useHistory();
  //const currentTeams = useAppSelector((state) => state.teams);
  const dispatch = useAppDispatch();
  const [suma, setSuma] = useState(0);
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
    teams: [],
    matches: [],
  });
  function addTeam(newTeams: Team[]) {
    setInput({ ...input, teams: newTeams });
  }
  function addMatch(newMatch: Match[]) {
    setInput({ ...input, matches: newMatch });
  }
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
          backgroundColor="rgba(57,91,100,0.98)"
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
            <TeamAdd cb={addTeam} />

            <MatchAdd cb={addMatch} equipos={input.teams} />
            <Box></Box>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}
