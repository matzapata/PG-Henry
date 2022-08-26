import React, { useEffect } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUserTournaments } from "../redux/slices/userThunk";
import TournamentCard from "./TournamentCard";
import { Link as ReactLink } from "react-router-dom";
import Pagination from "./Pagination";

function UserTournament() {
  const dispatch = useAppDispatch();
  const userTournaments = useAppSelector((state) => state.user.userTournaments);

  useEffect(() => {
    dispatch(fetchUserTournaments());
  }, []);

  return (
    <>
      <Heading color="text" size="lg" mb="4">
        Tus torneos
      </Heading>
      {userTournaments.tournaments.length === 0 && (
        <>
          <Text color="text" mb="2">
            Aun no participas de ningun torneo
          </Text>
          <Button size="sm" as={ReactLink} to="/torneos">
            Explorar torneos
          </Button>
        </>
      )}
      <Box mb="6">
        {userTournaments.tournaments.map((t, i) => (
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
        onPageChange={(page) => {
          console.log(page);
        }}
        lastPage={userTournaments.lastPage}
      />
    </>
  );
}

export default UserTournament;
