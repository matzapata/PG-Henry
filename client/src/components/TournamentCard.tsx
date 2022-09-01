import React from "react";
import { Link } from "react-router-dom";
import { Flex, Image, Stack, Tag, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

interface CardProps {
  id: string;
  name: string;
  status: string;
  type: string;
  logo: string;
  is_official?: boolean;
}

function TournamentCard({
  id,
  name,
  status,
  type,
  logo,
  is_official,
}: CardProps): JSX.Element {
  return (
    <Flex
      _hover={{
        bgColor: "#04879C",
      }}
      boxShadow="dark-lg"
      transition="200ms ease"
      backgroundColor="rgba(57,91,100,0.7)"
      borderRadius="20px"
      p="5px"
      w="auto"
      mb="2"
    >
      <Image
        src={logo}
        w="6rem"
        h="6rem"
        fit="cover"
        mr="2"
        borderRadius={"20px"}
      />
      <Link to={`/torneos/${id}`}>
        <Stack p="5px" spacing={2}>
          <Text fontSize="2xl" fontWeight="bold" color="#AEFEFF">
            {name} {is_official === true ? <CheckCircleIcon /> : <Text></Text>}
          </Text>
          <Flex>
            {status === "INPROGRESS" && <Tag mr="2">En progreso</Tag>}
            {status === "CONCLUDED" && <Tag mr="2">Finalizado</Tag>}
            {status === "INCOMING" && <Tag mr="2">Proximamente</Tag>}

            {type === "PRIVATE" && <Tag>Privado</Tag>}
            {type === "PUBLIC" && <Tag>Publico</Tag>}
          </Flex>
        </Stack>
      </Link>
    </Flex>
  );
}

export default TournamentCard;
