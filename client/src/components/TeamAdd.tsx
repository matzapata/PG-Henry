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
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";

type Team = {
  name: string;
  shield: string;
  key: number;
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

export default function TeamAdd({ cb }: any): JSX.Element {
  const [teams, setTeams] = useState<Team[]>([]);
  const [input, setInput] = useState<Team>({
    name: "",
    shield: "",
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
  };
  const agregaEquipo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateTeamNames(teams, input.name)) {
      setTeams([
        ...teams,

        { name: input.name, shield: input.shield, key: input.key },
      ]);
      setInput({ name: "", shield: "", key: input.key + 1 });
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
              <Box>
                <form onSubmit={agregaEquipo}>
                  <Text>Agregar Equipos</Text>
                  <Stack direction="row" spacing={4}>
                    <Input
                      type="text"
                      name="name"
                      value={input.name}
                      placeholder="Nombre"
                      onChange={cambiosEnInput}
                    />
                    <Input
                      type="text"
                      name="shield"
                      value={input.shield}
                      placeholder="Escudo"
                      onChange={cambiosEnInput}
                    />
                    <Button type="submit">Agregar</Button>
                  </Stack>
                </form>

                {!!teams.length &&
                  teams.map((el) => (
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
                          <Text
                            fontSize="15px"
                            fontWeight="bold"
                            color="#AEFEFF"
                          >
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
            </Stack>
          </Box>
        </Flex>
      </Container>
    </div>
  );
}
