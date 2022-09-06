import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import api from "../services/api";

type Match = {
  id: string;
  date: string;
  stage: string;
  tournament_id: string;
  team_a: {
    name: string;
    shield_url: string;
  };
  team_b: {
    name: string;
    shield_url: string;
  };
};

function LoadMatchResultCard({ match }: { match: Match }) {
  const [state, setState] = useState({
    score_a: 0,
    score_b: 0,
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(
        `/tournaments/${match.tournament_id}/match/${match.id}/result`,
        {
          score_a: Number(state.score_a),
          score_b: Number(state.score_b),
        }
      );
      setLoaded(true);
    } catch (e: any) {
      setError(e.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.score_a < 0 && state.score_b < 0) {
      setError("Goles mayor que 0");
      setIsValid(false);
    } else if (state.score_a === state.score_b) {
      setError("Empate no permitidos");
      setIsValid(false);
    } else {
      setIsValid(true);
      setError("");
    }
  }, [state]);

  return (
    <form onSubmit={onSubmit}>
      <Flex
        backgroundColor="rgba(0, 161, 171,0.5)"
        borderRadius="5"
        p="4"
        flexDir="column"
        my={1}
      >
        <Text fontSize="xs" mb="2" color="text" textAlign="center">
          {new Date(match.date).toLocaleDateString()} - {match.stage}
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
              isReadOnly={loaded}
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
              isReadOnly={loaded}
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
          disabled={!isValid || loaded}
          isLoading={loading}
        >
          Guardar
        </Button>
        {error && (
          <Text color="red.300" mt="1">
            {error}
          </Text>
        )}
        {loaded && (
          <Text color="green.300" mt="1">
            Resultado cargado exitosamente
          </Text>
        )}
      </Flex>
    </form>
  );
}

export default LoadMatchResultCard;
