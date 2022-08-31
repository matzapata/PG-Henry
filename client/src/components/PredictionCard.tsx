import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
export type Input = {
  scores_a: number | undefined;
  scores_b: number | undefined;
  match_id: string;
};
export type MatchData = {
  match_id: string;
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
  }, []);

  return (
    <form action="" onSubmit={enviar}>
      <Flex flexDirection={"row"} color={"white"} justify="center">
        <Image src={match.team_a.shield_url} w={10} h={10} mr="10px" />
        <Heading fontSize="md" color="white" mr="110px">
          {match.team_a.name}
        </Heading>
        <FormControl isInvalid={errors.scores_a !== ""}>
          <Input
            isReadOnly={match.team_a.scores !== undefined || enviado}
            w={"50px"}
            color={"white"}
            type="number"
            value={input.scores_a}
            name="scores_a"
            onChange={cambiosInput}
          />
          <FormErrorMessage>{errors.scores_a}</FormErrorMessage>
        </FormControl>

        <Text>VS</Text>
        <FormControl isInvalid={errors.scores_b !== ""}>
          <Input
            isReadOnly={match.team_b.scores !== undefined || enviado}
            w={"50px"}
            type="number"
            value={input.scores_b}
            name="scores_b"
            onChange={cambiosInput}
          />
          <FormErrorMessage>{errors.scores_b}</FormErrorMessage>
        </FormControl>
        <Heading fontSize="md" color="white" ml="110px">
          {match.team_b.name}
        </Heading>
        <Image src={match.team_b.shield_url} w={10} h={10} />
      </Flex>
      {input.scores_a !== undefined &&
        input.scores_b !== undefined &&
        !enviado && (
          <Button
            marginTop={"10px"}
            marginBottom={"30px"}
            marginRight={"20px"}
            width={"60px"}
            height={"20px"}
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
    </form>
  );
}

export default MatchForm;
