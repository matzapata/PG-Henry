import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Box,
  Input,
  Button,
  Flex,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import React, { Fragment, useState } from "react";

interface Inputs {
  full_name: string;
  username: string;
  email: string;
  birth_date: string;
  password: string;
  passwordConfirm: string;
}

function validate(input: Inputs) {
  const errors: Inputs = {
    full_name: "",
    username: "",
    email: "",
    birth_date: "",
    password: "",
    passwordConfirm: "",
  };
  if (!!input.full_name.length) {
    errors.full_name = "Completado";
    if (!/^[a-zA-Z\u00C0-\u017F\s]+$/.test(input.full_name))
      errors.full_name = " Nombre Inválido";
    if (input.full_name.length > 50)
      errors.full_name = " Cantidad de caracteres superada!!";
  }

  if (!!input.username.length) {
    errors.username = "Completado";
    if (input.username.length > 50)
      errors.username = " Cantidad de caracteres superada!!";
  }

  if (!!input.email.length) {
    errors.email = "Completado";
    if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        input.email
      )
    )
      errors.email = " E-mail inválido";
    if (input.email.length > 50)
      errors.email = " Cantidad de caracteres superada!!";
  }

  if (!!input.birth_date.length) {
    errors.birth_date = "Completado";
    if (
      !/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(
        input.birth_date
      )
    )
      errors.birth_date = " Fecha inválida";

    const tiempoTranscurrido = Date.now();
    const hoyN = new Date(tiempoTranscurrido);

    const hoy = hoyN.toLocaleDateString();
    const yyyy = (Number(hoy.slice(5)) - 18).toString();
    let mm = hoy.slice(-6, 4);
    if (mm.length === 1) mm = "0" + mm;
    let dd = hoy.slice(0, 2);
    if (dd.length === 1) dd = "0" + dd;
    const fecha = yyyy + "-" + mm + "-" + dd;
    if (fecha < input.birth_date)
      errors.birth_date = " Tienes que ser mayor de 18 años";
  }

  if (!!input.password.length) {
    errors.password = "Completado";
    if (input.password.length > 50)
      errors.password = " Cantidad de caracteres superada!!";
    if (input.password.length < 7)
      errors.password = " Ingresa al menos 7 caracteres";
  }

  if (!!input.passwordConfirm.length) {
    errors.passwordConfirm = "Completado";
    if (input.password !== input.passwordConfirm)
      errors.passwordConfirm = " Error en la confirmación";
    if (input.passwordConfirm.length > 50)
      errors.passwordConfirm = "Cantidad de caracteres superada!!";
  }

  return errors;
}

function FormSignUp() {
  const [errors, setErrors] = useState<Inputs>({
    full_name: "",
    username: "",
    email: "",
    birth_date: "",
    password: "",
    passwordConfirm: "",
  });
  const [input, setInput] = useState<Inputs>({
    full_name: "",
    username: "",
    email: "",
    birth_date: "",
    password: "",
    passwordConfirm: "",
  });
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(
      validate({ ...input, [e.currentTarget.name]: e.currentTarget.value })
    );

    fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => {
        res.ok && history.push("/auth/login");
      })
      .catch((e) => {
        alert("Error");
        console.log(e);
      });
  };

  const cambiosEnInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
    setErrors(
      validate({ ...input, [e.currentTarget.name]: e.currentTarget.value })
    );
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      ></Stack>
      <Fragment>
        <Heading color="#4D4BCC">Crear cuenta</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl isInvalid={errors.full_name !== "Completado"}>
                <FormLabel>Nombre</FormLabel>
                <Input
                  type="text"
                  name="full_name"
                  value={input.full_name}
                  onChange={cambiosEnInput}
                />
                {errors.email !== "Completado" && (
                  <FormErrorMessage>{errors.full_name}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.username !== "Completado"}>
                <FormLabel>Nombre de usuario</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={cambiosEnInput}
                />
                {errors.username !== "Completado" && (
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={errors.email !== "Completado"}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={cambiosEnInput}
                />
                {errors.email !== "Completado" && (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={errors.birth_date !== "Completado"}>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <Input
                  type="date"
                  name="birth_date"
                  value={input.birth_date}
                  onChange={cambiosEnInput}
                />
                {errors.birth_date !== "Completado" && (
                  <FormErrorMessage>{errors.birth_date}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.password !== "Completado"}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="text"
                  name="password"
                  value={input.password}
                  onChange={cambiosEnInput}
                />
                {errors.password !== "Completado" && (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={errors.passwordConfirm !== "Completado"}>
                <FormLabel>Confirmar contraseña</FormLabel>
                <Input
                  type="text"
                  name="passwordConfirm"
                  value={input.passwordConfirm}
                  onChange={cambiosEnInput}
                />
                {errors.password !== "Completado" && (
                  <FormErrorMessage>{errors.passwordConfirm}</FormErrorMessage>
                )}
              </FormControl>
              <Text fontSize="15px" color="black">
                ¿Ya tienes una cuenta? <Link to={"/login"}>Ingresar</Link>
              </Text>

              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                disabled={
                  errors.username === "Completado" &&
                  errors.username === "Completado" &&
                  errors.email === "Completado" &&
                  errors.birth_date === "Completado" &&
                  errors.password === "Completado" &&
                  errors.passwordConfirm === "Completado"
                    ? false
                    : true
                }
              >
                Enviar
              </Button>
            </Stack>
          </form>
        </Box>
      </Fragment>
    </Flex>
  );
}

export default FormSignUp;
