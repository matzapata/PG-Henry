import React from "react";
import { Flex, Text } from "@chakra-ui/react";

function RankingCard({
  score,
  username,
  fullName,
  tournament_status,
  winner_score,
}: {
  score: number;
  username: string;
  fullName: string;
  tournament_status: string | undefined;
  winner_score: number;
}) {
  return (
    <Flex
      px="4"
      py="3"
      mb="0.5"
      borderRadius={5}
      alignItems="center"
      backgroundColor="rgba(0, 161, 171,0.5)"
      justifyContent="space-between"
    >
      <Flex flexDir="column">
        <Text color="text">{fullName}</Text>
        <Text fontSize="sm" color="gray.300">
          {username}
        </Text>
      </Flex>
      {score === winner_score && (
        <Text fontSize="xl" color="Text">
          ¡¡GANADOR!!
        </Text>
      )}
      <Text color="text">{score}</Text>
    </Flex>
  );
}

export default RankingCard;
