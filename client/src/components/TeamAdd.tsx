import {
  Box,
  Container,
  Text,
  Flex,
  Stack,
  Input,
  Image,
  Button,
  GridItem,
  FormControl,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import UploadFiles from "./UploadFile";
type Team = {
  name: string;
  shield_url: string;
  key: number;
};

const validateTeamNames = (teams: Team[], newName: string) => {
  const result = teams.map((team) => {
    return team.name === newName ? true : false;
  });

  if (result.includes(true)) {
    alert("Ya existe un equipo con ese nombre.");
    return false;
  }
  return true;
};

const validateName = (input: Team, agregar = false) => {
  let error = "";
  if (!!input.name.length) error = "Completado";
  if (agregar) {
    if (error === "") error = "Campo Requerido";
  }
  return error;
};

export default function TeamAdd({ cb }: any): JSX.Element {
  const logo_a = useAppSelector((state) => state.team.logo_a);
  const [logo, setLogo] = useState(logo_a);
  const [error, setError] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [input, setInput] = useState<Team>({
    name: "",
    shield_url: "",
    key: 0,
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
    setError(
      validateName({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value,
      })
    );
  };
  const agregaEquipo = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    setError(validateName(input, true));
    if (error === "Completado") {
      if (validateTeamNames(teams, input.name)) {
        let finalShield_url = "";
        if (logo != logo_a) {
          setLogo(logo_a);
          finalShield_url = logo_a;
        }
        if (finalShield_url === "") finalShield_url = "/img/Escudo_vacío.png";
        setTeams([
          ...teams,

          { name: input.name, shield_url: finalShield_url, key: input.key },
        ]);
        setInput({ name: "", shield_url: "", key: input.key + 1 });
        setError("");
      }
    }
  };

  const quitarEquipo = (e: any) => {
    const newInputTeam = teams.filter((el) => {
      return el.key != e.target.value;
    });

    setTeams(newInputTeam);
  };

  useEffect(() => {
    cb(teams);
  }, [teams]);
  useEffect(() => {
    setLogo(logo_a);
  }, []);
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
      >
        <Stack spacing="9px">
          <Stack direction="column" spacing={4}>
            <Stack direction="row" spacing={4}>
              <FormControl
                isInvalid={
                  error === "Completado" || error === "" ? false : true
                }
              >
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  placeholder="Nombre"
                  onChange={cambiosEnInput}
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <UploadFiles
                imagen={true}
                logo_equipo={true}
                funcion={"Logo Equipo"}
                titulo={"Sube una imagen del equipo"}
              />
            </Stack>
            <Button
              onClick={agregaEquipo}
              bg={"blue.400"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Agregar
            </Button>
          </Stack>

          {!!teams.length &&
            teams.map((el) => (
              <Box key={el.key} display="Flex" flexDirection="row">
                <GridItem
                  boxShadow="dark-lg"
                  transition="200ms ease"
                  backgroundColor="#04878C"
                  borderRadius="20px"
                  display={"flex"}
                  justifyContent="space-between"
                  alignItems="center"
                  p="5px"
                  w="100%"
                  margin="5px"
                >
                  <Image
                    className="image"
                    src={el.shield_url}
                    w="3rem"
                    h="3rem"
                    fit="cover"
                    borderRadius={"20px"}
                  />

                  <Stack p="5px" spacing={3}>
                    <Text fontSize="15px" fontWeight="bold" color="#AEFEFF">
                      {el.name}
                    </Text>
                  </Stack>
                  <Button
                    value={el.key}
                    onClick={quitarEquipo}
                    bg="red.300"
                    _hover={{
                      bgColor: "red.500",
                    }}
                  >
                    X
                  </Button>
                </GridItem>
              </Box>
            ))}
        </Stack>
      </Box>
    </Container>
  );
}
