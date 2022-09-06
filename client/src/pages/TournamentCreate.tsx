import React from "react";

import {
  Container,
  Box,
  Text,
  Stack,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Logo from "../components/Logo";
import Steper from "../components/TournamentCreateSteper";
export default function TournamentCreate(): JSX.Element {
  return (
    <Container
      maxW="100vw"
      h="950px"
      bgSize="cover"
      bgImage="url('https://www.xtrafondos.com/wallpapers/uefa-champions-league-estadio-2932.jpg')"
      p="0"
    >
      <Box
        h="80px"
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        p="20px"
      >
        <Flex alignItems="center">
          <Logo />
          <Text fontSize="30px" fontWeight="bold" color="text" ml="2">
            Crear torneo
          </Text>
        </Flex>

        <Flex>
          <Link to="/torneos">
            <ArrowBackIcon color="text" fontSize="30px" />
          </Link>
          <Text color="text" fontSize="20px" fontWeight="bold" ml="2">
            Torneos
          </Text>
        </Flex>
      </Box>
      <Divider />
      <Container
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgba(8, 32, 50,0.5)"
        borderRadius={5}
        maxW={"35%"}
        h={"60%"}
        mt="5%"
      >
        <Heading color={"text"} mb={2}>
          Creá tu torneo
        </Heading>
        <Steper />
      </Container>
    </Container>
  );
}
