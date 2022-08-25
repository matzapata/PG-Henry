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
  Icon,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
import TeamAdd from "./TeamAdd";
import MatchAdd from "./MatchAdd";
import { FaExclamationCircle } from "react-icons/fa";
import api from "../services/api";
import { useAppSelector } from "../redux/hooks";

type Inputs = {
  name: string;
  description: string;
  user_limit: number;
  creator_user_id: string;
  type: string;
  logo_url: string;
  password: string;
  teams: Team[];
  matches: Match[];
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

export default function TournamentForm(): JSX.Element {
  const userCreatorId = useAppSelector((state) => state.auth.decoded?.id);
  const history = useHistory();
  const [CrearError, setCrearError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState<Inputs>({
    name: "",
    description: "",
    user_limit: 0,
    creator_user_id: "",
    type: "PUBLIC",
    logo_url: "",
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
  const cambiosENUser_Limit = (e: React.FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]: Number(e.currentTarget.value),
    });
  };
  const crear = async () => {
    console.log("enviando...");
    console.log(input);
    try {
      await api.post("/tournaments/create", {
        ...input,
        creator_user_id: userCreatorId,
      });
      //history.push("/torneos");
      console.log("Envio completado");
    } catch (e: any) {
      setCrearError(e.response.data.message);
    }
  };
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
                      onChange={cambiosENUser_Limit}
                    />
                  </NumberInput>
                </InputGroup>
              </FormControl>
            </Flex>

            <Input
              type="text"
              name="logo_url"
              value={input.logo_url}
              placeholder="URL logo"
              onChange={cambiosEnInput}
            />

            <TeamAdd cb={addTeam} />

            <MatchAdd cb={addMatch} equipos={input.teams} />
            <Box></Box>
            {CrearError && (
              <Flex mt="4" alignItems="center">
                <Icon as={FaExclamationCircle} color="red.500" mr="2" />
                <Text as="span" color="red.500" fontWeight="500">
                  {CrearError}
                </Text>
              </Flex>
            )}
            <Button onClick={crear}>Crear</Button>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}
