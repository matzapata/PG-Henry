import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import api from "../services/api";
import LoadMatchResultCard from "./LoadMatchResult";

type Match = {
  id: string;
  code_stage: string;
  date: string;
  score_a: number | null;
  score_b: number | null;
  stage: string;
  team_a: {
    id: string;
    name: string;
    shield_url: string;
  };
  team_a_id: string;
  team_b: {
    id: string;
    name: string;
    shield_url: string;
  };
  team_b_id: string;
  tournament_id: string;
};

function TournamentLoadResults({ id }: { id: string }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    (async () => {
      const allmatches = await api.get(`/tournaments/${id}/allmatches`);
      const resMyTournaments = await api.get(`/tournaments/mytournaments`);
      setMatches(allmatches.data);
      setIsOwner(resMyTournaments.data.find((t: any) => t.id === id));
    })();
  }, []);

  if (isOwner) {
    return (
      <Box my="8">
        <Heading color="text" size="md" mb="4">
          Carga los resultados de los partidos
        </Heading>
        {matches.map((m, i) => (
          <LoadMatchResultCard
            key={i}
            match={{
              id: m.id,
              date: m.date,
              stage: m.stage,
              tournament_id: m.tournament_id,
              team_a: {
                name: m.team_a.name,
                shield_url: m.team_a.shield_url,
              },
              team_b: {
                name: m.team_b.name,
                shield_url: m.team_b.shield_url,
              },
            }}
          />
        ))}
      </Box>
    );
  } else {
    return null;
  }
}

export default TournamentLoadResults;
