import React, { useEffect, useState } from "react";

import {
  Container,
  Box,
  Text,
  Stack,
  Input,
  Button,
  Textarea,
  Select,
  Flex,
  useColorModeValue,
  InputRightElement,
  FormControl,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Icon,
} from "@chakra-ui/react";
import { useAppSelector } from "../redux/hooks";
import UploadFiles from "./UploadFile";
import api from "../services/api";
import { FaExclamationCircle } from "react-icons/fa";

type Inputs = {
  name: string;
  description: string;
  user_limit: number | undefined;
  creator_user_id: string;
  type: string;
  logo_url: string;
  password: string;
};

type Errors = {
  name: string;
  description: string;
  user_limit: string;
  password: string;
};

function validate(input: Inputs, submit = false) {
  const errors = {
    name: "",
    description: "",
    user_limit: "",
    password: "",
  };
  if (!!input.name.length) errors.name = "Completado";

  if (!!input.description.length) errors.description = "Completado";
  if (input.user_limit)
    if (input.user_limit >= 2 && input.user_limit <= 500)
      errors.user_limit = "Completado";

  if (input.type === "PRIVATE") {
    if (!!input.password.length) errors.password = "Completado";
  } else {
    errors.password = "Completado";
  }

  if (submit) {
    if (errors.name === "") errors.name = "Campo Requerido";
    if (errors.description === "") errors.description = "Campo Requerido";
    if (errors.user_limit === "") errors.user_limit = "Entre 2 y 500 usuarios";
    if (input.type === "PRIVATE") {
      if (errors.password === "") errors.password = "Campo Requerido";
    }
  }

  return errors;
}

export default function TournamentForm({
  siguientePaso,
  addTournament,
  torneo,
}: {
  siguientePaso: any;
  addTournament: any;
  torneo: Inputs;
}): JSX.Element {
  const userCreatorId = useAppSelector((state) => state.auth.decoded?.id);
  const logoTorneo = useAppSelector((state) => state.team.logo_b);
  const [logo, setLogo] = useState(logoTorneo);
  const [checkError, setCheckError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: "",
    description: "",
    user_limit: "",
    password: "",
  });
  const [input, setInput] = useState<Inputs>({
    name: "",
    description: "",
    user_limit: undefined,
    creator_user_id: "",
    type: "PUBLIC",
    logo_url: "",
    password: "",
  });

  const cambiosEnInput = (
    e:
      | React.FormEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    setErrors(
      validate({ ...input, [e.currentTarget.name]: e.currentTarget.value })
    );
  };

  const cambiosENUser_Limit = (e: React.FormEvent<HTMLInputElement>) => {
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

  const crear = async () => {
    const newErrors = validate(input, true);
    setErrors(newErrors);

    if (
      newErrors.name === "Completado" &&
      newErrors.description === "Completado" &&
      newErrors.user_limit === "Completado" &&
      newErrors.password === "Completado"
    ) {
      try {
        await api.post("/tournaments/checkName", input);
        let finalLogo_url = "";
        if (logo != logoTorneo) {
          setLogo(logoTorneo);
          finalLogo_url = logoTorneo;
        }
        if (finalLogo_url === "") finalLogo_url = "/img/torneo.jpg";
        addTournament({
          ...input,
          creator_user_id: userCreatorId,
          logo_url: finalLogo_url,
        });
        siguientePaso();
      } catch (e: any) {
        console.log(e.response.data);
        setCheckError(e.response.data.message);
      }
    }
  };

  const setInputTorneo = () => {
    setInput({
      ...input,
      name: torneo.name,
      description: torneo.description,
      user_limit: torneo.user_limit,
      type: torneo.type,
      logo_url: torneo.logo_url,
      password: torneo.password,
    });
  };

  useEffect(() => {
    setLogo(logoTorneo);
    setInputTorneo();
  }, []);

  return (
    <Container>
      <Flex alignItems="center">
        <Box
          h="100%"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
          p="20px"
          rounded={"xl"}
          boxShadow={"lg"}
          bg={useColorModeValue("white", "gray.700")}
        >
          <Stack alignItems="space-between" spacing="9px">
            textColor=
            {(errors.name === "Completado" || errors.name === "") &&
            (errors.description === "Completado" ||
              errors.description === "") &&
            (errors.user_limit === "Completado" || errors.user_limit === "") &&
            (errors.password === "Completado" || errors.password === "")
              ? "gray.400"
              : "red.500"}
            <Stack alignItems="space-between" spacing="9px">
              <Stack direction="row" spacing={4}>
                {/* INPUT NAME */}
                <FormControl
                  isInvalid={
                    errors.name === "Completado" || errors.name === ""
                      ? false
                      : true
                  }
                >
                  <Input
                    type="text"
                    name="name"
                    value={input.name}
                    placeholder="Nombre del torneo"
                    onChange={cambiosEnInput}
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                {/* SELECT TYPE PRIVADO/PUBLICO */}
                <Select
                  name="type"
                  onChange={cambiosEnInput}
                  defaultValue="PUBLIC"
                >
                  <option value="PRIVATE">Privado</option>
                  <option value="PUBLIC">Público</option>
                </Select>
              </Stack>
              {/* CONTRASEÑA */}
              {input.type === "PRIVATE" && (
                <FormControl
                  isInvalid={
                    errors.password === "Completado" || errors.password === ""
                      ? false
                      : true
                  }
                >
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                    ></InputLeftElement>
                    <Input
                      name="password"
                      onChange={cambiosEnInput}
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña para el torneo"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        backgroundColor="gray"
                        mr="0.5"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Ocultar" : "Mostrar"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              )}
              <Stack direction="row" spacing={4}>
                {/* ////USER_LIMIT */}

                <FormControl
                  isInvalid={
                    errors.user_limit === "Completado" ||
                    errors.user_limit === ""
                      ? false
                      : true
                  }
                >
                  <Input
                    inputMode="numeric"
                    type="number"
                    name="user_limit"
                    value={input.user_limit}
                    placeholder="Cantidad máx. de usuarios"
                    onChange={cambiosENUser_Limit}
                  />

                  <FormErrorMessage fontSize="15px">
                    {errors.user_limit}
                  </FormErrorMessage>
                </FormControl>

                {/*  ///LOGO/// */}
                <UploadFiles
                  imagen={true}
                  logo_torneo={true}
                  funcion={"Imagen Torneo"}
                  titulo={"Sube una imagen para el torneo"}
                />
              </Stack>

              {/* ////DESCRIPTION */}
              <FormControl
                isInvalid={
                  errors.description === "Completado" ||
                  errors.description === ""
                    ? false
                    : true
                }
              >
                <Stack spacing={1}>
                  <Text mb="8px">Descripción: </Text>
                  <Textarea
                    name="description"
                    value={input.description}
                    placeholder="Descripción"
                    size="sm"
                    onChange={cambiosEnInput}
                  />
                </Stack>
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>
            </Stack>
            {checkError && (
              <Flex mt="4" alignItems="center">
                <Icon as={FaExclamationCircle} color="red.500" mr="2" />
                <Text
                  as="span"
                  color="red.500"
                  fontWeight="500"
                  fontSize="20px"
                >
                  {checkError}
                </Text>
              </Flex>
            )}
            <Button onClick={crear}>Siguiente </Button>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}
