import React from "react";
import { Flex, Heading, Stack, Text, UnorderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddPrediction from "../components/AddPrediction";
import NavBar from "../components/NavBar";
import { ArrowBackIcon } from "@chakra-ui/icons";

function Predictions() {
  const { id } = useParams<{ id: string }>();

  return (
    <Flex backgroundColor={"primary"} flexDirection={"column"}>
      <NavBar />
      <Stack margin={"22px"} maxW="3xl" mx={["4", "4", "auto"]} mt="10">
        <Stack mb="10" spacing={10}>
          <Stack>
            <Heading color={"text"}>Prode</Heading>
            <Link color={"white.500"} to={`/torneos/${id}`}>
              <Flex>
                <ArrowBackIcon color="buttons" fontSize="30px" />
                <Heading color={"buttons"} size={"md"}>
                  Volver
                </Heading>
              </Flex>
            </Link>
          </Stack>
          <Flex
            flexDir={"column"}
            border={"1px solid white"}
            borderRadius={5}
            textAlign={"center"}
            py={5}
          >
            <Heading color={"text"}>Sistema de puntos</Heading>
            <UnorderedList mt={5}>
              <Text color={"text"}>Acertar campeon: 20 puntos</Text>
              <Text color={"text"}>Acertar resultado: 3 puntos</Text>
            </UnorderedList>
          </Flex>
        </Stack>

        <AddPrediction id={id} />
      </Stack>
    </Flex>
  );
}

export default Predictions;
