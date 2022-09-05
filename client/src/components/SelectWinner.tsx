import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Select, Box, Button, Text, Input, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchUniqueUserTournament } from "../redux/slices/userThunk";
import {
  postUserTournamentWinner,
  fetchUserTournamentWinner,
} from "../redux/slices/userThunk";
import { fetchTournamentAllMatches } from "../redux/slices/tournamentThunk";

const teamInitialState = {
  team_id: "",
};

function SelectWinner() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const user_id = useAppSelector((state) => state.auth.decoded?.id);
  const tournamentDetail = useAppSelector(
    (state) => state.tournaments.tournamentDetail
  );
  const [team, setTeam] = useState(teamInitialState);
  const unido = useAppSelector(
    (state) => state.user.userTournaments.is_attached
  );
  const winner = useAppSelector((state) => state.user.userTournaments.winner);
  const currentTeams = useAppSelector(
    (state) => state.tournaments.tournamentAllMatches
  );

  useEffect(() => {
    dispatch(fetchTournamentAllMatches({ id: id, user_id: user_id }));
  }, []);

  useEffect(() => {
    dispatch(fetchUniqueUserTournament({ tournamentid: id, userid: user_id }));
  }, []);

  useEffect(() => {
    dispatch(fetchUserTournamentWinner({ tournamentid: id, userid: user_id }));
  });

  function handleWinner(e: React.ChangeEvent<HTMLSelectElement>) {
    setTeam({
      team_id: e.target.value,
    });
  }

  function postWinner(e: React.MouseEvent<HTMLButtonElement>) {
    dispatch(
      postUserTournamentWinner({
        tournamentid: id,
        userid: user_id,
        teamid: team.team_id,
      })
    );
  }

  if (tournamentDetail?.status === "INCOMING" && unido === true) {
    return (
      <Box>
        {!winner ? (
          <Flex>
            <Select
              onChange={handleWinner}
              placeholder="Elige al ganador del torneo"
              color={"white"}
            >
              {currentTeams?.map((e) => (
                <option key={e.id} value={e.team_a_id}>
                  {e.team_a.name}
                </option>
              ))}
              {currentTeams?.map((e) => (
                <option key={e.id} value={e.team_b_id}>
                  {e.team_b.name}
                </option>
              ))}
            </Select>
            <Button
              bgColor="buttons"
              color="text"
              _hover={{
                bg: "secondary",
                color: "primary",
              }}
              size="md"
              ml="2"
              onClick={postWinner}
            >
              Enviar ganador
            </Button>
          </Flex>
        ) : (
          <Text color={"white"}>Ya has seleccionado un ganador</Text>
        )}
      </Box>
    );
  } else return null;
}

export default SelectWinner;
