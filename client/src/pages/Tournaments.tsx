import React, { useEffect } from "react";
import TournamentCard from "../components/TournamentCard";
import TournamentFilter from "../components/TournamentFilter";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchTournaments } from "../redux/slices/tournamentSlice";
import {
  Container,
  Text,
  Button,
  Box,
  Divider,
  Stack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Logo from "../components/Logo";

function Tournaments(): JSX.Element {
  const currentTournamets = useAppSelector((state) => state.tournaments);
  console.log(currentTournamets.tournaments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTournaments());
  }, []);

  return (
    <Container
      maxW="100vw"
      h="950px"
      /* bgColor="#082032" */
      bgSize="cover"
      bgImage="url('https://www.xtrafondos.com/wallpapers/uefa-champions-league-estadio-2932.jpg')"
      p="0"
    >
      <Box
        /* bgGradient="linear(to-r, #4FBDBA, #AEFEFF)" */
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
            Torneos
          </Text>
        </Stack>
        {/* <Text fontSize="20px" pt="10px" p="20px" color="#F7F7F7">
          Busca entre los mejores torneos mundiales y nacionales, o crea el tuyo
          propio!
        </Text> */}
        <Box display="flex" flexDir="row">
          <Link to="/">
            <ArrowBackIcon color="#F7F7F7" fontSize="30px" pt="2px" />
          </Link>
          <Text
            color="#F7F7F7"
            mr="10px"
            fontSize="20px"
            fontWeight="bold"
            pt="5px"
          >
            Inicio
          </Text>
          <Button
            _hover={{
              color: "#082032",
            }}
            bgColor="#4FBDBA"
            color="#F7F7F7"
          >
            Crear Torneo
          </Button>
        </Box>
      </Box>
      {/*  <Text fontSize="20px" pt="10px" p="20px" color="#F7F7F7">
        Busca entre los mejores torneos mundiales y nacionales, o crea el tuyo
        propio!
      </Text> */}
      <Divider />
      <TournamentFilter />
      {currentTournamets.loading && <Text>Loading...</Text>}
      {!currentTournamets.loading && currentTournamets.error ? (
        <Text>Error: {currentTournamets.error}</Text>
      ) : null}
      <Grid templateColumns="repeat(3, 3fr)" gap={10} m="20px" pt="50px">
        {!currentTournamets.loading &&
          currentTournamets.tournaments.map((el) => (
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
