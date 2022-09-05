import React from "react";
import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";

function TournamentPrizeCard({ poolSize }: { poolSize: number | undefined }) {
  return (
    <Flex
      backgroundColor="rgba(0, 161, 171,0.5)"
      borderRadius="4"
      p="6"
      alignItems="center"
    >
      <Icon as={FaTrophy} h="10" w="10" color="gray.300" />
      <Flex ml="6" flexDirection="column">
        <Text fontSize="0.9rem" color="text">
          Pozo acumulado:
        </Text>
        <Heading size="md" color="text">
          $ {poolSize} ARS
        </Heading>
      </Flex>
    </Flex>
  );
}

export default TournamentPrizeCard;
