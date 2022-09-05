import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TournamentDetailHeader from "../components/TournamentDetailHeader";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";
import TournamentMatches from "../components/TournamentMatches";
import TournamentRanking from "../components/TournamentRanking";
import TournamentLoadResults from "../components/TournamentLoadResults";
import api from "../services/api";

function TournamentDetail() {
  const { id } = useParams<{ id: string }>();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    (async () => {
      const resMyTournaments = await api.get(`/tournaments/mytournaments`);
      setIsOwner(resMyTournaments.data.find((t: any) => t.id === id));
    })();
  }, []);

  return (
    <Box bgColor="primary">
      <NavBar />
      <Box maxW="3xl" mx={["4", "4", "auto"]} mt="10">
        <TournamentDetailHeader id={id} isOwner={isOwner} />
        {isOwner && <TournamentLoadResults id={id} />}
        <TournamentMatches id={id} />
        <TournamentRanking id={id} />
      </Box>
    </Box>
  );
}

export default TournamentDetail;
