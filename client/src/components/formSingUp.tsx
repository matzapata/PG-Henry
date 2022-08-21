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
import React, { useState } from "react";

interface Inputs {
  full_name: string;
  username: string;
  email: string;
  birth_date: string;
  password: string;
  passwordConfirm: string;
}

function validate(input: Inputs, submit = false) {
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

    const index = input.birth_date.toString().indexOf("-");
    if (input.birth_date.slice(0, index).length > 4) {
      errors.birth_date = " Año inválido";
    } else {
      if (Number(input.birth_date.slice(0, index)) < 1901)
        errors.birth_date = "No creo que seas tan viejo";
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
  if (submit) {
    if (errors.full_name === "") errors.full_name = "Campo Requerido";
    if (errors.username === "") errors.username = "Campo Requerido";
    if (errors.email === "") errors.email = "Campo Requerido";
    if (errors.birth_date === "") errors.birth_date = "Campo Requerido";
    if (errors.password === "") errors.password = "Campo Requerido";
    if (errors.passwordConfirm === "")
      errors.passwordConfirm = "Campo Requerido";
  }
  console.log("Fin de validacion");
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
  const redir = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(
      validate(
        {
          ...input,
          [e.currentTarget.name]: e.currentTarget.value,
        },
        true
      )
    );

    if (
      errors.full_name === "Completado" &&
      errors.username === "Completado" &&
      errors.email === "Completado" &&
      errors.birth_date === "Completado" &&
      errors.password === "Completado" &&
      errors.passwordConfirm === "Completado"
    ) {
      console.log(input);
      fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })
        .then((res) => {
          console.log(res);
          res.ok && redir.push("/auth/login");
        })
        .catch((e) => {
          alert("Error");
          console.log(e);
        });
    }
  };

  const cambiosEnInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value });
    setErrors(
      validate({ ...input, [e.currentTarget.name]: e.currentTarget.value })
    );
  };
  console.log(errors);
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="#082032"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          bgGradient="linear(to-r, #4FBDBA, #AEFEFF)"
          bgClip="text"
          fontSize="7xl"
          fontWeight="bold"
        >
          Crear cuenta
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              borderRadius="20px"
              boxShadow="md"
            >
              <FormControl
                isInvalid={
                  errors.full_name === "Completado" || errors.full_name === ""
                    ? false
                    : true
                }
              >
                {/* <FormLabel>Nombre</FormLabel> */}
                <Input
                  color="#B9D2D2"
                  placeholder="Nombre"
                  type="text"
                  name="full_name"
                  value={input.full_name}
                  onChange={cambiosEnInput}
                />
                {errors.full_name !== "Completado" && (
                  <FormErrorMessage>{errors.full_name}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={
                  errors.username === "Completado" || errors.username === ""
                    ? false
                    : true
                }
              >
                {/* <FormLabel>Nombre de usuario</FormLabel> */}
                <Input
                  color="#B9D2D2"
                  placeholder="Nombre de usuario"
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={cambiosEnInput}
                />
                {errors.username !== "Completado" && (
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                isInvalid={
                  errors.email === "Completado" || errors.email === ""
                    ? false
                    : true
                }
              >
                {/* <FormLabel>Email</FormLabel> */}
                <Input
                  type="text"
                  name="email"
                  color="#B9D2D2"
                  placeholder="Email"
                  value={input.email}
                  onChange={cambiosEnInput}
                />
                {errors.email !== "Completado" && (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                isInvalid={
                  errors.birth_date === "Completado" || errors.birth_date === ""
                    ? false
                    : true
                }
              >
                {/* <FormLabel>Fecha de nacimiento</FormLabel> */}
                <Input
                  type="date"
                  name="birth_date"
                  color="#B9D2D2"
                  placeholder="Fecha de nacimiento"
                  value={input.birth_date}
                  onChange={cambiosEnInput}
                />
                {errors.birth_date !== "Completado" && (
                  <FormErrorMessage>{errors.birth_date}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={
                  errors.password === "Completado" || errors.password === ""
                    ? false
                    : true
                }
              >
                {/* <FormLabel>Contraseña</FormLabel> */}
                <Input
                  type="text"
                  name="password"
                  color="#B9D2D2"
                  placeholder="Contraseña"
                  value={input.password}
                  onChange={cambiosEnInput}
                />
                {errors.password !== "Completado" && (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                isInvalid={
                  errors.passwordConfirm === "Completado" ||
                  errors.passwordConfirm === ""
                    ? false
                    : true
                }
              >
                {/* <FormLabel color="#B9D2D2">Confirmar contraseña</FormLabel> */}
                <Input
                  type="text"
                  name="passwordConfirm"
                  color="#B9D2D2"
                  placeholder="Confirmar contraseña"
                  value={input.passwordConfirm}
                  onChange={cambiosEnInput}
                />
                {errors.passwordConfirm !== "Completado" && (
                  <FormErrorMessage>{errors.passwordConfirm}</FormErrorMessage>
                )}
              </FormControl>

              <Button
                _hover={{
                  color: "#082032",
                }}
                mt={4}
                bgColor="#4FBDBA"
                color="#F7F7F7"
                type="submit"
                /* disabled={
                  errors.username === "Completado" &&
                  errors.username === "Completado" &&
                  errors.email === "Completado" &&
                  errors.birth_date === "Completado" &&
                  errors.password === "Completado" &&
                  errors.passwordConfirm === "Completado"
                    ? false
                    : true
                } */
              >
                Enviar
              </Button>
            </Stack>
          </form>
        </Box>

        <Box>
          <Flex flexDirection="row" justifyContent="space-between;">
            {/*  <Text onClick={volver}>
              <FontAwesomeIcon icon={faAngleLeft} />
              Atras
            </Text> */}
            <Text color="#F7F7F7">
              ¿Ya tienes una cuenta?{" "}
              <Link
                style={{ textDecoration: "none", color: "#AEFEFF" }}
                to={"/auth/ingresar"}
                href="#"
              >
                Iniciar
              </Link>
            </Text>
          </Flex>
        </Box>
      </Stack>
    </Flex>
  );
}

export default FormSignUp;
