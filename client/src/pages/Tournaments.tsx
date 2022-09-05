import React from "react";
import TournamentCard from "../components/TournamentCard";
import TournamentFilter from "../components/TournamentFilter";
import { useAppSelector } from "../redux/hooks";
import { useHistory } from "react-router-dom";
import {
  Container,
  Text,
  Button,
  Box,
  Divider,
  Stack,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Logo from "../components/Logo";

function Tournaments(): JSX.Element {
  const currentTournaments = useAppSelector((state) => state.tournaments);
  const showingTournaments = currentTournaments.tournaments.slice(0, 12);
  const history = useHistory();

  return (
    <Container maxW="100vw" h="100vh" bgColor={"primary"} p="0">
      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        p="20px"
      >
        <Flex flexDir="row" alignItems="center">
          <Logo />
          <Text fontSize="30px" fontWeight="bold" color="text" ml={2}>
            Torneos
          </Text>
        </Flex>
        <Box display="flex" flexDir="row" alignItems={"center"}>
          <Link to="/">
            <ArrowBackIcon color="text" fontSize="30px" pt="2px" />
          </Link>
          <Text color="text" mr="10px" fontSize="20px" fontWeight="bold">
            Inicio
          </Text>
          <Button
            onClick={() => history.push("torneos/crear")}
            _hover={{
              color: "primary",
            }}
            bgColor="buttons"
            color="text"
          >
            Crear Torneo
          </Button>
        </Box>
      </Box>
      <Divider />
      <TournamentFilter />
      {currentTournaments.loading && <Text>Loading...</Text>}
      {!currentTournaments.loading && currentTournaments.error ? (
        <Text>Error: {currentTournaments.error}</Text>
      ) : null}
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 2fr)",
          "repeat(3, 3fr)",
        ]}
        gap={[4, 4, 4, 10]}
        m="20px"
        pt="50px"
      >
        {!currentTournaments.loading &&
          showingTournaments.map((el) => (
            <TournamentCard
              key={el.id}
              id={el.id}
              name={el.name}
              status={el.status}
              type={el.type}
              logo={el.logo_url}
              is_official={el.is_official}
            />
          ))}
      </Grid>
    </Container>
  );
}

export default Tournaments;
