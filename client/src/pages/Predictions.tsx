import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import AddPrediction from "../components/AddPrediction";

function Predictions() {
  const { id } = useParams<{ id: string }>();
  return (
    <Flex backgroundColor={"primary"} width={"100vw"} height={"100vh"}>
      <Heading color={"text"}>Prode</Heading>

      <AddPrediction id={id} />
    </Flex>
  );
}

export default Predictions;
