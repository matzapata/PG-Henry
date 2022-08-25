import React from "react";
import { Flex, Text } from "@chakra-ui/react";

function RankingCard({ score, user }: { score: number; user: string }) {
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
      <Text>{user}</Text>
      <Text>{score}</Text>
    </Flex>
  );
}

export default RankingCard;
