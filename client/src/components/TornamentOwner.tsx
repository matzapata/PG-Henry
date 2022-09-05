import React, { useEffect } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getOwnerTournament } from "../redux/slices/userThunk";
import TournamentCard from "./TournamentCard";
import { Link as ReactLink } from "react-router-dom";
import Pagination from "./Pagination";

function OwnerTournament() {
  const dispatch = useAppDispatch();
  const ownerTournaments = useAppSelector(
    (state) => state.user.ownerTournaments
  );

  useEffect(() => {
    dispatch(getOwnerTournament({}));
  }, []);

  return (
    <>
      <Heading color="text" size="lg" mb="4">
        Torneos creados por ti
      </Heading>
      {ownerTournaments.tournaments.length === 0 && (
        <>
          <Text color="text" mb="2">
            Aún no participas de ningún torneo
          </Text>
          <Button size="sm" as={ReactLink} to="/torneos" w="min">
            Explorar torneos
          </Button>
        </>
      )}
      <Box mb="6">
        {ownerTournaments.tournaments.map((t, i) => (
          <TournamentCard
            id={t.id}
            key={i}
            type={t.type}
            name={t.name}
            status={t.status}
            logo={t.logo_url}
          />
        ))}
      </Box>
      <Pagination
        onPageChange={(page) => dispatch(getOwnerTournament({ page }))}
        lastPage={ownerTournaments.lastPage}
      />
    </>
  );
}

export default OwnerTournament;
