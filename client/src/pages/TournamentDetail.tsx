import React from "react";
import { useParams } from "react-router-dom";
import TournamentDetailHeader from "../components/TournamentDetailHeader";
import NavBar from "../components/NavBar";
import { Box, Heading } from "@chakra-ui/react";
import TournamentMatches from "../components/TournamentMatches";
import TournamentRanking from "../components/TournamentRanking";
import Mercadopago from "../components/Mercadopago";
import AddPrediction from "../components/AddPrediction";

function TournamentDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box bgColor="primary">
      <NavBar />
      <Box maxW="3xl" mx="auto" mt="10">
        <TournamentDetailHeader id={id} />
        <Heading color="#F7F7F7">Partidos</Heading>
        <TournamentMatches id={id} />
        <TournamentRanking id={id} />
        <Mercadopago id={id} />
        <AddPrediction id={id} />
      </Box>
    </Box>
  );
}

export default TournamentDetail;
