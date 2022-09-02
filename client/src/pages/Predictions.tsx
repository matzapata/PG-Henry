import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
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
      <Heading color={"text"}>Prode</Heading>
      <Box margin={"20px"}>
        <AddPrediction id={id} />
      </Box>
    </Flex>
  );
}

export default Predictions;
