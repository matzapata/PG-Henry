import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { TournamentMatch } from "../redux/slices/tournament";
export type Input = {
  scores_a: number | undefined;
  scores_b: number | undefined;
  match_id: string;
};
export type MatchData = {
  match_id: string;
  stage: string;
  team_a: {
    scores?: number;
    shield_url: string;
    name: string;
    id: number;
  };
  team_b: {
    scores?: number;
    shield_url: string;
    name: string;
    id: number;
  };
  match_result: TournamentMatch | null;
};

function MatchForm({
  match,
  onSubmit,
}: {
  match: MatchData;
  onSubmit: (data: Input) => void;
}) {
  function validate(input: Input) {
    const errors = {
      scores_a: "",
      scores_b: "",
    };
    if (
      input.scores_a !== undefined &&
      (input.scores_a < 0 || input.scores_a > 35)
    )
      errors.scores_a = "Maximo de puntaje es 35 y minimo 0";
    if (
      input.scores_b !== undefined &&
      (input.scores_b < 0 || input.scores_b > 35)
    )
      errors.scores_b = "Maximo de puntaje es 35 y minimo 0";
    return errors;
  }

  const [input, setInput] = useState<Input>({
    scores_a: undefined,
    scores_b: undefined,
    match_id: "",
  });
  const [errors, setErrors] = useState({
    scores_a: "",
    scores_b: "",
  });
  const [enviado, setEnviado] = useState(false);

  const cambiosInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]: Number(e.currentTarget.value),
    });
    setErrors(
      validate({
        ...input,
        [e.currentTarget.name]: Number(e.currentTarget.value),
      })
    );
  };

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !errors.scores_a &&
      !errors.scores_b &&
      input.scores_a != undefined &&
      input.scores_b != undefined
    )
      onSubmit(input);
    setEnviado(true);
  }
  useEffect(() => {
    setInput({
      scores_a: match.team_a.scores,
      scores_b: match.team_b.scores,
      match_id: match.match_id,
    });
    if (match.team_a.scores != undefined && match.team_b.scores != undefined)
      setEnviado(true);
  }, []);

  return (
    <form onSubmit={enviar}>
      <Flex bg="secondary" borderRadius="1" p="4" flexDir="column">
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
            {input.scores_a === 999 ? (
              <Input
                w="14"
                color="text"
                textAlign="center"
                readOnly
                value={"X"}
                bg={"red.500"}
              ></Input>
            ) : (
              <FormControl isInvalid={errors.scores_a !== ""}>
                <Input
                  w="14"
                  color="text"
                  textAlign="center"
                  isReadOnly={match.team_a.scores !== undefined || enviado}
                  type="number"
                  value={input.scores_a}
                  bg={
                    match.match_result?.score_a === null
                      ? "gray.500"
                      : input.scores_a === match.match_result?.score_a
                      ? "green.500"
                      : "red.500"
                  }
                  name="scores_a"
                  onChange={cambiosInput}
                />
                <FormErrorMessage>{errors.scores_a}</FormErrorMessage>
              </FormControl>
            )}

            <Text color="text" mx="4">
              VS
            </Text>

            {input.scores_b === 999 ? (
              <Input
                w="14"
                color="text"
                type="number"
                textAlign="center"
                readOnly
                value={"X"}
                bg={"red.500"}
              ></Input>
            ) : (
              <FormControl isInvalid={errors.scores_b !== ""}>
                <Input
                  w="14"
                  color="text"
                  type="number"
                  textAlign="center"
                  isReadOnly={match.team_b.scores !== undefined || enviado}
                  value={input.scores_b}
                  name="scores_b"
                  onChange={cambiosInput}
                  bg={
                    match.match_result?.score_b === null
                      ? "gray.500"
                      : input.scores_b === match.match_result?.score_b
                      ? "green.500"
                      : "red.500"
                  }
                />
                <FormErrorMessage>{errors.scores_b}</FormErrorMessage>
              </FormControl>
            )}
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

        {input.scores_a !== undefined &&
          input.scores_b !== undefined &&
          !enviado && (
            <Button type="submit" size="sm" mt="3" colorScheme="whiteAlpha">
              Guardar
            </Button>
          )}
      </Flex>
    </form>
  );
}

export default MatchForm;
