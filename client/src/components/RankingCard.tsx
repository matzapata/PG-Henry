import React from "react";
import { Flex, Text } from "@chakra-ui/react";

function RankingCard({
  score,
  username,
  fullName,
}: {
  score: number;
  username: string;
  fullName: string;
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
      <Text color="text">{score}</Text>
    </Flex>
  );
}

export default RankingCard;
