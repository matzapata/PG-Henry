import React, { useEffect } from "react";
import TournamentCard from "../components/TournamentCard";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchTournaments } from "../redux/slices/tournamentSlice";
import { Container, Text, Button } from "@chakra-ui/react";

function Tournaments(): JSX.Element {
  const currentTournamets = useAppSelector(
    (state) => state.tournaments.tournaments
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTournaments());
  }, []);

  console.log(currentTournamets);

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
      {currentTournamets &&
        currentTournamets.map((el) => (
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
