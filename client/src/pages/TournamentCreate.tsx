import React from "react";

import { Container, Box, Text, Stack, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import TournamentForm from "../components/TournamentForm";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Logo from "../components/Logo";
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
        <Stack flexDir="row" alignItems="center">
          <Logo />
          <Text fontSize="30px" fontWeight="bold" color="#F7F7F7" ml="40px">
            Crear torneo
          </Text>
        </Stack>

        <Box display="flex" flexDir="row">
          <Link to="/torneos">
            <ArrowBackIcon color="#F7F7F7" fontSize="30px" pt="2px" />
          </Link>
          <Text
            color="#F7F7F7"
            mr="10px"
            fontSize="20px"
            fontWeight="bold"
            pt="5px"
          >
            Torneos
          </Text>
        </Box>
      </Box>

      <Divider />
      <TournamentForm />
    </Container>
  );
}
