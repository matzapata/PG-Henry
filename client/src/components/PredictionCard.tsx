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
import { Match } from "@testing-library/react";
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
    <form action="" onSubmit={enviar}>
      <Flex
        flexDirection={"row"}
        color={"white"}
        justifyContent="space-around"
        p={"10px"}
        rounded={"xl"}
        boxShadow={"lg"}
        bg={useColorModeValue("whiteAlpha.500", "gray.700")}
        alignItems={"center"}
        margin={"10px"}
      >
        <Stack flexDirection={"row"} align-items={"center"}>
          <Image
            src={match.team_a.shield_url}
            w={"3rem"}
            h={"3rem"}
            mr={"10px"}
          />
          <Box>
            <Text
              mr={"10px"}
              fontSize="xl"
              color={useColorModeValue("gray.700", "white")}
            >
              {match.team_a.name}
            </Text>
          </Box>
          {input.scores_a === 999 ? (
            <Input
              marginLeft={"50px"}
              w={"70px"}
              readOnly
              value={"X"}
              bg={"red.500"}
            ></Input>
          ) : (
            <FormControl isInvalid={errors.scores_a !== ""}>
              <Input
                marginLeft={"10px"}
                isReadOnly={match.team_a.scores !== undefined || enviado}
                w={"70px"}
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
        </Stack>
        <Stack>
          <Text>VS</Text>
        </Stack>
        <Stack
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          {input.scores_b === 999 ? (
            <Input
              marginLeft={"20px"}
              marginRight={"20px"}
              w={"70px"}
              readOnly
              value={"X"}
              bg={"red.500"}
            ></Input>
          ) : (
            <FormControl isInvalid={errors.scores_b !== ""}>
              <Input
                marginRight={"20px"}
                isReadOnly={match.team_b.scores !== undefined || enviado}
                w={"70px"}
                type="number"
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
          <Box>
            <Text
              mr={"10px"}
              fontSize="xl"
              color={useColorModeValue("gray.700", "white")}
            >
              {match.team_b.name}
            </Text>
          </Box>

          <Image
            marginLeft={"20px"}
            src={match.team_b.shield_url}
            w={"3rem"}
            h={"3rem"}
          />
        </Stack>
        {input.scores_a !== undefined &&
          input.scores_b !== undefined &&
          !enviado && (
            <Button
              width={"100px"}
              height={"40px"}
              type="submit"
              fontSize="15px"
              bg={"blue.400"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Guardar
            </Button>
          )}
      </Flex>
    </form>
  );
}

export default MatchForm;
