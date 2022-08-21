import React, { useEffect } from "react";
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { login } from "../redux/slices/authThunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link as ReactLink, useHistory } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.token);
  const authError = useAppSelector((state) => state.auth.error);
  const authLoading = useAppSelector((state) => state.auth.loading);

  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    keepSessionOpen: false,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email: state.email, password: state.password }));
  };

  const onChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [isAuthenticated]);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        mb="2"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Avatar bg="purple.500" />
        <Heading color="purple.500">Iniciar Sesión</Heading>
        <Box minW={{ base: "95%", md: "468px" }}>
          <form onSubmit={onSubmit}>
            <Stack
              p="1rem"
              spacing={4}
              borderRadius="4"
              backgroundColor="whiteAlpha.900"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    name="email"
                    onChange={onChange}
                    placeholder="Correo electronico"
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name="password"
                    onChange={onChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      backgroundColor="white"
                      mr="0.5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Checkbox mt="2">Mantener sesión</Checkbox>
              </FormControl>

              <Button
                width="full"
                type="submit"
                colorScheme="purple"
                isLoading={authLoading}
                disabled={state.email === "" || state.password === ""}
              >
                Iniciar
              </Button>
              <Text color="red.500" fontWeight="500">
                {authError}
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Aun no tienes una cuenta?{" "}
        <Link as={ReactLink} color="purple.500" to="/auth/signup">
          Crear una
        </Link>
      </Box>
    </Flex>
  );
}

export default Login;
