import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchTournamentRanking } from "../redux/slices/tournamentThunk";
import RankingCard from "./RankingCard";

function TournamentRanking({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const tournamentRanking = useAppSelector(
    (state) => state.tournaments.tournamentRanking
  );

  useEffect(() => {
    dispatch(fetchTournamentRanking(id));
  }, []);

  useEffect(() => {
    console.log(tournamentRanking);
  }, [tournamentRanking]);

  return (
    <Box>
      <Heading mb="4" mt="8" size="md">
        Ranking del torneo
      </Heading>
      {tournamentRanking?.map((r, id) => (
        <RankingCard
          key={id}
          score={r.score}
          fullName={r.full_name}
          username={r.username}
          position={r.position}
        />
      ))}
    </Box>
  );
}

export default TournamentRanking;
