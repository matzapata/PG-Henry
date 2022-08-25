import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchTournamentRanking } from "../redux/slices/tournamentThunk";

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

  return <></>;
}

export default TournamentRanking;
