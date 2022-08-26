import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchTournamentRanking } from "../redux/slices/tournamentThunk";
import Pagination from "./Pagination";
import RankingCard from "./RankingCard";

function TournamentRanking({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const tournamentRanking = useAppSelector(
    (state) => state.tournaments.tournamentRanking
  );

  useEffect(() => {
    dispatch(fetchTournamentRanking({ id, page: 1, pageSize: 5 }));
  }, []);

  return (
    <Box>
      <Heading mb="4" mt="8" size="md" color="text">
        Ranking del torneo
      </Heading>
      {tournamentRanking.ranking?.map((r, id) => (
        <RankingCard
          key={id}
          score={r.score}
          fullName={r.full_name}
          username={r.username}
        />
      ))}
      <Box my="4">
        <Pagination
          lastPage={tournamentRanking.lastPage}
          onPageChange={(page) => {
            dispatch(fetchTournamentRanking({ id, page, pageSize: 5 }));
          }}
        />
      </Box>
    </Box>
  );
}

export default TournamentRanking;
