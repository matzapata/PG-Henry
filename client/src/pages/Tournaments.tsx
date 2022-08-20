import React, { useEffect } from "react";
import TournamentCard from "../components/TournamentCard";
import TournamentFilter from "../components/TournamentFilter";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchTournaments } from "../redux/slices/tournamentSlice";
import { Container, Text, Button } from "@chakra-ui/react";
import TournametsSearchBar from "../components/TournamentSearchBar";

function Tournaments(): JSX.Element {
  const currentTournamets = useAppSelector((state) => state.tournaments);
  console.log(currentTournamets.tournaments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTournaments());
  }, []);

  return (
    <Container>
      <Text fontSize={40}>Torneos</Text>
      <Text>
        Busca entre los mejores torneos mundiales y nacionales, o crea el tuyo
        propio!
      </Text>
      <Button colorScheme="teal" size="md">
        Crear Torneo
      </Button>
      <TournametsSearchBar />
      {currentTournamets.loading && <Text>Loading...</Text>}
      {!currentTournamets.loading && currentTournamets.error ? (
        <Text>Error: {currentTournamets.error}</Text>
      ) : null}
      <TournamentFilter />
      {!currentTournamets.loading &&
        currentTournamets.tournaments.map((el) => (
          <TournamentCard
            key={el.id}
            id={el.id}
            name={el.name}
            status={el.status}
            type={el.type}
          />
        ))}
    </Container>
  );
}

export default Tournaments;
