import React from "react";
import { useParams } from "react-router-dom";
import TournamentDetailHeader from "../components/TournamentDetailHeader";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";
import Mercadopago from "../components/Mercadopago";

function TournamentDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box bgColor="primary">
      <NavBar />
      <Box maxW="3xl" mx="auto" mt="10">
        <TournamentDetailHeader id={id} />
        <Mercadopago />
      </Box>
    </Box>
  );
}

export default TournamentDetail;
