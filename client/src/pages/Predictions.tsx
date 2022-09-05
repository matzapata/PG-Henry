import { Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddPrediction from "../components/AddPrediction";
import NavBar from "../components/NavBar";
import SelectWinner from "../components/SelectWinner";

function Predictions() {
  const { id } = useParams<{ id: string }>();

  return (
    <Flex backgroundColor={"primary"} flexDirection={"column"}>
      <NavBar />
      <Stack margin={"22px"} maxW="3xl" mx={["4", "4", "auto"]} mt="10">
        <Stack mb="10">
          <Heading color={"text"}>Prode</Heading>
          <Link color={"white.500"} to={`/torneos/${id}`}>
            <Heading color={"text"} size={"md"}>
              Volver al torneo
            </Heading>
          </Link>
        </Stack>

        <AddPrediction id={id} />
      </Stack>
    </Flex>
  );
}

export default Predictions;
