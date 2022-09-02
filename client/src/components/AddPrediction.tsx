import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchTournamentAllMatches,
  fetchTournamentDetail,
} from "../redux/slices/tournamentThunk";

import MatchForm, { Input } from "./PredictionCard";
import api from "../services/api";
import { TournamentMatch } from "../redux/slices/tournament";

export default function AddPrediction({ id }: { id: string }) {
  const dispatch = useAppDispatch();

  const unido = useAppSelector(
    (state) => state.user.userTournaments.is_attached
  );
  const user_id = useAppSelector((state) => state.auth.decoded?.id);

  const tournamentCreator = useAppSelector(
    (state) => state.tournaments.tournamentDetail?.creator_user_id
  );
  const matches = useAppSelector(
    (state) => state.tournaments.tournamentAllMatches
  );
  const [newMatches, setNewMatches] = useState<TournamentMatch[]>([]);

  const filtrarPredicciones = () => {
    if (!!matches?.length && user_id) {
      const ROCKMATCHES = [
        ...matches,
        {
          team_b_id: 123,
          team_a_id: 123,
          id: "6854173f-c948-44ea-b0ee-2c0485c3d387",
          score_a: 12,
          score_b: 12,
          date: "1212-03",
          stage: "string",
          team_a: { name: "RA", shield_url: "/img/Escudo_vacío.png" },
          team_b: { name: "RE", shield_url: "/img/Escudo_vacío.png" },
          match_id: [
            /* {
              id: "49a690fe-72b6-49d4-ad69-b5babfa6ad58",
              match_id: "6854173f-c948-44ea-b0ee-2c0485c3d387",
              score_a: 10,
              score_b: 10,
              tournament_id: "616a74d2-635f-4c78-a5a6-aacfbd1f4786",
              user_id: "e06e026d-36ce-48fb-9ae1-001cee0198ff",
            }, */
          ],
        },
      ];

      const finalMatches: TournamentMatch[] = [];

      ROCKMATCHES?.map((match) => {
        if (!!match.match_id.length) {
          match.match_id.map((prediction) => {
            if (prediction.user_id === user_id) {
              finalMatches.push({
                ...match,
                score_a: prediction.score_a,
                score_b: prediction.score_b,
              });
            } else {
              console.log(match.score_a);
              if (match.score_a === undefined && match.score_b === undefined) {
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
          if (match.score_a === undefined && match.score_b === undefined) {
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
  console.log(user_id);
  return (
    <Box>
      {tournamentCreator !== user_id && (
        <Box>
          {unido && (
            <Box>
              <Box marginTop={"5px"}>
                <Heading size="md" color="text">
                  Has tus predicciones
                </Heading>

                <Box margin={"5px"} bgColor="secondary" borderRadius="4" p="6">
                  {newMatches &&
                    newMatches.map((match) => (
                      <Box key={match.id + "B1"}>
                        {(match.score_a === undefined ||
                          match.score_b === undefined) && (
                          <MatchForm
                            key={match.id + "M"}
                            match={{
                              match_id: match.id,
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
                            }}
                            onSubmit={onSubmit}
                          />
                        )}
                      </Box>
                    ))}
                </Box>
              </Box>
              <Box>
                <Box marginTop={"5px"}>
                  <Heading size="md" color="text">
                    Prediciones que hiciste
                  </Heading>
                  <Box marginTop={"5px"}>
                    <Box
                      margin={"5px"}
                      bgColor="secondary"
                      borderRadius="4"
                      p="6"
                    >
                      {newMatches &&
                        newMatches.map((match) => (
                          <Box key={match.id + "B2"}>
                            {(match.score_a !== undefined ||
                              match.score_b !== undefined) && (
                              <MatchForm
                                key={match.id + "N"}
                                match={{
                                  match_id: match.id,
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
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
