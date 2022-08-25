import React from "react";
import { Flex, Text } from "@chakra-ui/react";

function RankingCard({
  score,
  username,
  fullName,
  position,
}: {
  score: number;
  username: string;
  fullName: string;
  position: number;
}) {
  return (
    <Flex
      px="4"
      py="3"
      mb="0.5"
      borderRadius="1"
      alignItems="center"
      bg="secondary"
      justifyContent="space-between"
    >
      <Flex>
        <Text mr="3">{position}</Text>
        <Flex flexDir="column">
          <Text>{fullName}</Text>
          <Text fontSize="sm" color="gray.300">
            {username}
          </Text>
        </Flex>
      </Flex>
      <Text>{score}</Text>
    </Flex>
  );
}

export default RankingCard;
