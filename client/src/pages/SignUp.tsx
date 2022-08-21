import {
  FormControl,
  FormErrorMessage,
  Text,
  Box,
  Input,
  Button,
  Flex,
  Stack,
  Heading,
  Link,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import { Link as ReactLink, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import api from "../services/api";
import { FaExclamationCircle } from "react-icons/fa";

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
  const history = useHistory();
  const isAuthenticated = useAppSelector((state) => state.auth.token);
  const [signUpError, setSignUpError] = useState("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(
      validate({ ...input, [e.currentTarget.name]: e.currentTarget.value })
    );

    try {
      await api.post("/auth/signup", input);
      history.push("/auth/login");
    } catch (e: any) {
      setSignUpError(e.response.data.message);
    }
  };

  const cambiosEnInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
    setErrors(
      validate({ ...input, [e.currentTarget.name]: e.currentTarget.value })
    );
  };

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [isAuthenticated]);

  return (
    <Flex
      width="100wh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Avatar bg="purple.500" mt="10" />
      <Heading color="purple.500" mb="10">
        Crear cuenta
      </Heading>
      <Box minW={{ base: "90%", md: "468px" }}>
        <form onSubmit={handleSubmit}>
          <Stack p="1rem" spacing={4}>
            <FormControl isInvalid={errors.full_name !== "Completado"}>
              <Input
                type="text"
                name="full_name"
                value={input.full_name}
                onChange={cambiosEnInput}
                placeholder="Nombre completo"
              />
              <FormErrorMessage>{errors.full_name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.username !== "Completado"}>
              <Input
                type="text"
                name="username"
                value={input.username}
                onChange={cambiosEnInput}
                placeholder="Nombre de usuario"
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email !== "Completado"}>
              <Input
                type="text"
                name="email"
                value={input.email}
                onChange={cambiosEnInput}
                placeholder="Email"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.birth_date !== "Completado"}>
              <Input
                type="date"
                name="birth_date"
                value={input.birth_date}
                onChange={cambiosEnInput}
                placeholder="Fecha de nacimiento"
              />
              <FormErrorMessage>{errors.birth_date}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password !== "Completado"}>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={cambiosEnInput}
                placeholder="Contraseña"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.passwordConfirm !== "Completado"}>
              <Input
                type="password"
                name="passwordConfirm"
                onChange={cambiosEnInput}
                value={input.passwordConfirm}
                placeholder="Confirmar contraseña"
              />

              <FormErrorMessage>{errors.passwordConfirm}</FormErrorMessage>
            </FormControl>
            <Text fontSize="15px">
              ¿Ya tienes una cuenta?{" "}
              <Link color="purple.500" as={ReactLink} to={"/auth/login"}>
                Ingresar
              </Link>
            </Text>

            <Button
              mt={4}
              colorScheme="purple"
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
              Crear cuenta
            </Button>
            {signUpError && (
              <Flex mt="4" alignItems="center">
                <Icon as={FaExclamationCircle} color="red.500" mr="2" />
                <Text as="span" color="red.500" fontWeight="500">
                  {signUpError}
                </Text>
              </Flex>
            )}
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}

export default FormSignUp;
