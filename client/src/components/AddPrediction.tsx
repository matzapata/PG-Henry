import React, { useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchTournamentAllMatches,
  fetchTournamentDetail,
} from "../redux/slices/tournamentThunk";

import MatchForm, { Input } from "./PredictionCard";
import api from "../services/api";

export default function AddPrediction({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const matches = useAppSelector(
    (state) => state.tournaments.tournamentAllMatches
  );
  const unido = useAppSelector(
    (state) => state.user.userTournaments.is_attached
  );
  const userPrediction = useAppSelector((state) => state.auth.decoded?.id);

  const tournamentCreator = useAppSelector(
    (state) => state.tournaments.tournamentDetail?.creator_user_id
  );

  async function onSubmit(data: Input) {
    const dataPost = {
      user_id: userPrediction,
      tournament_id: id,
      data,
    };
    try {
      const result = await api.post("/predictions", {
        dataPost,
      });
      console.log(result);
    } catch (e: any) {
      console.log(e.response.data);
    }

    console.log(dataPost);
  }

  useEffect(() => {
    dispatch(fetchTournamentAllMatches({ id }));
    dispatch(fetchTournamentDetail(id));
  }, []);

  return (
    <Box>
      {tournamentCreator !== userPrediction && (
        <Box>
          {!unido && ( //CAMIAR CONDICIONN!!!!!!!!!!!!!!!!!!!!!!!!!!!
            <Box marginTop={"5px"}>
              <Heading size="md" color="text">
                Has tus predicciones
              </Heading>

              <Box margin={"5px"} bgColor="secondary" borderRadius="4" p="6">
                {matches &&
                  matches.map((match) => (
                    <MatchForm
                      key={match.id}
                      match={{
                        match_id: match.id,
                        team_a: {
                          scores: undefined,
                          shield_url: match.team_a.shield_url,
                          name: match.team_a.name,
                          id: match.team_a_id,
                        },
                        team_b: {
                          scores: undefined,
                          shield_url: match.team_b.shield_url,
                          name: match.team_b.name,
                          id: match.team_b_id,
                        },
                      }}
                      onSubmit={onSubmit}
                    />
                  ))}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
