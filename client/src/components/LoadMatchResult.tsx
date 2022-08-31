import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

type Match = {
  id: string;
  date: string;
  stage: string;
  team_a: {
    name: string;
    shield_url: string;
  };
  team_b: {
    name: string;
    shield_url: string;
  };
};

function LoadMatchResultCard({
  match,
  loadMatchResult,
}: {
  match: Match;
  loadMatchResult: (data: {
    id: string;
    score_a: number;
    score_b: number;
  }) => void;
}) {
  const [state, setState] = useState({
    score_a: 0,
    score_b: 0,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadMatchResult({
      ...state,
      id: match.id,
    });
  };

  const isValid = () => state.score_a >= 0 && state.score_b >= 0;

  return (
    <form onSubmit={onSubmit}>
      <Flex bg="secondary" borderRadius="1" p="4" flexDir="column">
        <Text fontSize="xs" mb="2" color="text" textAlign="center">
          {match.date} - {match.stage}
        </Text>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Image
              src={
                match.team_a.shield_url === ""
                  ? "/img/team-shield-placeholder.jpg"
                  : match.team_a.shield_url
              }
              borderRadius="1"
              h="14"
              w="14"
            />
            <Text color="text" ml="4" fontSize="lg" fontWeight="medium">
              {match.team_a.name}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Input
              w="14"
              color="text"
              type="number"
              textAlign="center"
              value={state.score_a}
              onChange={onChange}
              name="score_a"
            />
            <Text color="text" mx="4">
              VS
            </Text>
            <Input
              w="14"
              color="text"
              type="number"
              textAlign="center"
              value={state.score_b}
              onChange={onChange}
              name="score_b"
            />
          </Flex>
          <Flex alignItems="center">
            <Text color="text" fontSize="lg" fontWeight="medium" mr="4">
              {match.team_b.name}
            </Text>
            <Image
              src={
                match.team_a.shield_url === ""
                  ? "/img/team-shield-placeholder.jpg"
                  : match.team_a.shield_url
              }
              borderRadius="1"
              h="14"
              w="14"
            />
          </Flex>
        </Flex>
        <Button
          type="submit"
          size="sm"
          mt="3"
          colorScheme="whiteAlpha"
          disabled={!isValid()}
        >
          Guardar
        </Button>
      </Flex>
    </form>
  );
}

export default LoadMatchResultCard;
