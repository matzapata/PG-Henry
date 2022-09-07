import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchTournamentRanking } from "../redux/slices/tournamentThunk";
import Pagination from "./Pagination";
import RankingCard from "./RankingCard";
import { TournamentRanking } from "../redux/slices/tournament";

function _TournamentRanking({
  id,
  ranking,
}: {
  id: string;
  ranking: TournamentRanking[] | null;
}) {
  const dispatch = useAppDispatch();
  const tournamentRanking = useAppSelector(
    (state) => state.tournaments.tournamentRanking
  );
  const tournamentDetail = useAppSelector(
    (state) => state.tournaments.tournamentDetail
  );
  const [winnerScore, setWinnerScore] = useState(0);

  const _setWinerScore = () => {
    if (ranking && !!ranking.length) {
      setWinnerScore(ranking[0].score);
    }
  };

  useEffect(() => {
    dispatch(fetchTournamentRanking({ id, page: 1, pageSize: 5 }));
    if (tournamentDetail?.status === "CONCLUDED") _setWinerScore();
  }, []);

  useEffect(() => {
    if (tournamentDetail?.status === "CONCLUDED") _setWinerScore();
  }, [tournamentRanking.ranking]);
  return (
    <Box mb="10">
      <Heading mb="4" mt="8" size="md" color="text">
        Ranking del torneo
      </Heading>
      {ranking?.map((r, id) => (
        <RankingCard
          key={id}
          score={r.score}
          fullName={r.full_name}
          username={r.username}
          tournament_status={tournamentDetail?.status}
          winner_score={winnerScore}
        />
      ))}
      {ranking?.length !== 0 ? (
        <Box my="4">
          <Pagination
            lastPage={tournamentRanking.lastPage}
            onPageChange={(page) => {
              dispatch(fetchTournamentRanking({ id, page, pageSize: 5 }));
            }}
          />
        </Box>
      ) : (
        <Text color="text">No hay competidores en el torneo</Text>
      )}
    </Box>
  );
}

export default _TournamentRanking;
