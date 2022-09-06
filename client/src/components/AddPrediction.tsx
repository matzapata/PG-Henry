import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchTournamentAllMatches,
  fetchTournamentDetail,
} from "../redux/slices/tournamentThunk";

import MatchForm, { Input } from "./PredictionCard";
import api from "../services/api";
import { TournamentMatch } from "../redux/slices/tournament";
import SelectWinner from "./SelectWinner";

export default function AddPrediction({ id }: { id: string }) {
  const dispatch = useAppDispatch();

  const unido = useAppSelector(
    (state) => state.user.userTournaments.is_attached
  );
  const user_id = useAppSelector((state) => state.auth.decoded?.id);

  const tournamentCreator = useAppSelector(
    (state) => state.tournaments.tournamentDetail?.creator_user_id
  );
  const tournamentDetail = useAppSelector(
    (state) => state.tournaments.tournamentDetail
  );
  const matches = useAppSelector(
    (state) => state.tournaments.tournamentAllMatches
  );
  const [newMatches, setNewMatches] = useState<TournamentMatch[]>([]);

  const filtrarPredicciones = () => {
    if (!!matches?.length && user_id) {
      const finalMatches: TournamentMatch[] = [];

      matches?.map((match) => {
        if (!!match.match_id.length) {
          match.match_id.map((prediction) => {
            if (prediction.user_id === user_id) {
              finalMatches.push({
                ...match,
                score_a: prediction.score_a,
                score_b: prediction.score_b,
              });
            } else {
              if (
                (match.score_a === undefined && match.score_b === undefined) ||
                (match.score_a === null && match.score_b === null)
              ) {
                finalMatches.push({
                  ...match,
                  score_a: undefined,
                  score_b: undefined,
                });
              } else {
                finalMatches.push({
                  ...match,
                  score_a: 999,
                  score_b: 999,
                });
              }
            }
          });
        } else {
          if (
            (match.score_a === undefined && match.score_b === undefined) ||
            (match.score_a === null && match.score_b === null)
          ) {
            finalMatches.push({
              ...match,
              score_a: undefined,
              score_b: undefined,
            });
          } else {
            finalMatches.push({
              ...match,
              score_a: 999,
              score_b: 999,
            });
          }
        }
      });

      setNewMatches(finalMatches);
    }
  };

  async function onSubmit(data: Input) {
    const dataPost = {
      user_id,
      tournament_id: id,
      data,
    };
    try {
      await api.post("/predictions", {
        dataPost,
      });
    } catch (e: any) {
      console.log(e.response.data);
    }
  }

  useEffect(() => {
    dispatch(fetchTournamentDetail(id));
    if (user_id) dispatch(fetchTournamentAllMatches({ id, user_id }));

    filtrarPredicciones();
  }, []);

  useEffect(() => {
    if (matches) filtrarPredicciones();
  }, [matches]);

  return (
    <Box>
      <Heading color={"white"}>{tournamentDetail?.name}</Heading>
      {tournamentCreator !== user_id && (
        <Box>
          {unido && (
            <Box>
              <Box marginTop="4">
                <Heading size="md" color="text" mb="4">
                  Haz tus predicciones
                </Heading>

                <SelectWinner />

                <Box
                  mt="4"
                  bgColor="rgba(0, 161, 171,0.5)"
                  borderRadius="4"
                  p="6"
                >
                  {matches &&
                    newMatches?.map((match, index) => (
                      <Box key={match.id + "B1"}>
                        <Text color={"text"}>{match.date}</Text>
                        {(match.score_a === undefined ||
                          match.score_b === undefined) && (
                          <MatchForm
                            key={match.id + "M"}
                            match={{
                              match_id: match.id,
                              stage: match.stage,
                              team_a: {
                                scores: match.score_a,
                                shield_url: match.team_a.shield_url,
                                name: match.team_a.name,
                                id: match.team_a_id,
                              },
                              team_b: {
                                scores: match.score_b,
                                shield_url: match.team_b.shield_url,
                                name: match.team_b.name,
                                id: match.team_b_id,
                              },
                              match_result: matches[index],
                            }}
                            onSubmit={onSubmit}
                          />
                        )}
                      </Box>
                    ))}
                </Box>
              </Box>

              <Box marginTop="6">
                <Heading size="md" color="text" mb="4">
                  Predicciones que hiciste
                </Heading>
                <Box marginTop={"5px"}>
                  <Box margin={"5px"} borderRadius="4">
                    {newMatches &&
                      matches &&
                      newMatches.map((match, index) => (
                        <Box key={match.id + "B2"}>
                          <Text color={"text"}>{match.date}</Text>
                          {(match.score_a !== undefined ||
                            match.score_b !== undefined) && (
                            <MatchForm
                              key={match.id + "N"}
                              match={{
                                match_id: match.id,
                                stage: match.stage,
                                team_a: {
                                  scores: match.score_a,
                                  shield_url: match.team_a.shield_url,
                                  name: match.team_a.name,
                                  id: match.team_a_id,
                                },
                                team_b: {
                                  scores: match.score_b,
                                  shield_url: match.team_b.shield_url,
                                  name: match.team_b.name,
                                  id: match.team_b_id,
                                },
                                match_result: matches[index],
                              }}
                              onSubmit={onSubmit}
                            />
                          )}
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
