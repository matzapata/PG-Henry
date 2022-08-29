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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Logo from "../components/Logo";

function Tournaments(): JSX.Element {
  const currentTournaments = useAppSelector((state) => state.tournaments);
  const showingTournaments = currentTournaments.tournaments.slice(0, 9);
  const history = useHistory();

  return (
    <Container
      maxW="100vw"
      h="950px"
      bgSize="cover"
      bgImage="url('/img/landing-wallpaper.jpg')"
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
          <Text fontSize="30px" fontWeight="bold" color="text" ml="40px">
            Torneos
          </Text>
        </Stack>
        <Box display="flex" flexDir="row">
          <Link to="/">
            <ArrowBackIcon color="text" fontSize="30px" pt="2px" />
          </Link>
          <Text
            color="text"
            mr="10px"
            fontSize="20px"
            fontWeight="bold"
            pt="5px"
          >
            Inicio
          </Text>
          <Button
            onClick={() => history.push("torneos/crear")}
            _hover={{
              color: "#082032",
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
      <Grid templateColumns="repeat(3, 3fr)" gap={10} m="20px" pt="50px">
        {!currentTournaments.loading &&
          showingTournaments.map((el) => (
            <TournamentCard
              key={el.id}
              id={el.id}
              name={el.name}
              status={el.status}
              type={el.type}
              logo={el.logo_url}
            />
          ))}
      </Grid>
    </Container>
  );
}

export default Tournaments;
