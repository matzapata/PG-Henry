import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddPrediction from "../components/AddPrediction";
import NavBar from "../components/NavBar";

function Predictions() {
  const { id } = useParams<{ id: string }>();

  return (
    <Flex
      backgroundColor={"primary"}
      width={"100vw"}
      height={"100vh"}
      flexDirection={"column"}
    >
      <NavBar />
      <Stack margin={"22px"}>
        <Stack>
          <Heading color={"text"}>Prode</Heading>
          <Link color={"white.500"} to={`/torneos/${id}`}>
            <Heading color={"text"} size={"md"}>
              Volver al torneo
            </Heading>
          </Link>
        </Stack>
        <Box margin={"100px"} p={"100px"} pt={"50px"}>
          <AddPrediction id={id} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default Predictions;
