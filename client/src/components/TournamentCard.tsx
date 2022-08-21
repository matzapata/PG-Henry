import React from "react";
import { Link } from "react-router-dom";
import { Box, Image, Stack, Text } from "@chakra-ui/react";

interface CardProps {
  id: string;
  name: string;
  status: string;
  type: string;
  logo: string;
}

function TournamentCard({
  id,
  name,
  status,
  type,
  logo,
}: CardProps): JSX.Element {
  return (
    <Box
      _hover={{
        bgColor: "#04879C",
      }}
      boxShadow="dark-lg"
      transition="200ms ease"
      bgColor="#395B64"
      borderRadius="20px"
      display={"flex"}
      p="5px"
      w="40%"
    >
      <Image src={logo} w="10rem" h="10rem" fit="cover" borderRadius={"20px"} />
      <Link to={`/tournaments/${id}`}>
        <Stack p="5px" spacing={3}>
          <Text fontSize="30px" fontWeight="bold" color="#AEFEFF">
            {name}
          </Text>
          {status === "INPROGRESS" && (
            <Text color="#F7F7F7">Status: En progreso</Text>
          )}
          {status === "CONCLUDED" && (
            <Text color="#F7F7F7">Status: Finalizado</Text>
          )}
          {status === "INCOMING" && (
            <Text color="#F7F7F7">Status: Proximamente</Text>
          )}
          {type === "PRIVATE" ? (
            <Text color="#F7F7F7">Acceso: Privado</Text>
          ) : (
            <Text color="#F7F7F7">Acceso: Publico</Text>
          )}
        </Stack>
      </Link>
    </Box>
  );
}

export default TournamentCard;
