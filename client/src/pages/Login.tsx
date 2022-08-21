import React from "react";
import { useState, useEffect } from "react";
import {
  Flex,
  Text,
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
  Image,
  Icon,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaExclamationCircle } from "react-icons/fa";
import { login } from "../redux/slices/authThunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link as ReactLink, useHistory } from "react-router-dom";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { isEmail } from "../utils/validations";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.token);
  const authError = useAppSelector((state) => state.auth.error);
  const authLoading = useAppSelector((state) => state.auth.loading);
  const auth0 = new Auth0Client({
    domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
    redirect_uri: process.env.REACT_APP_CLIENT_URL,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    keepSessionOpen: false,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmail(state.email)) return alert("Invalid email");
    else if (state.password === "") return alert("Invalid password");

    dispatch(login({ email: state.email, password: state.password }));
  };

  const onChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const auth0Login = async () => {
    try {
      await auth0?.loginWithRedirect();
      const isAuth = await auth0.isAuthenticated();
      const user = await auth0.getUser();
      console.log(user, isAuth, "auth response");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    auth0.isAuthenticated().then((isAuth0Authenticated) => {
      if (isAuthenticated || isAuth0Authenticated) history.push("/");
    });
  }, [isAuthenticated]);

  useEffect(() => {
    auth0.isAuthenticated().then((isAuth0Authenticated) => {
      if (isAuthenticated || isAuth0Authenticated) history.push("/");
    });
  }, [isAuthenticated]);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      bgColor="primary"
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
        <Avatar size="lg" bgGradient="linear(to-r, #4FBDBA, #AEFEFF)" />
        <Text
          bgGradient="linear(to-r, #4FBDBA, #AEFEFF)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="bold"
        >
          Iniciar Sesión
        </Text>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={onSubmit}>
            <Stack p="4" spacing="4" borderRadius="4" backgroundColor="white">
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
                <Checkbox mt="2">Mantener sesión iniciada</Checkbox>
              </FormControl>
              <Button
                width="full"
                type="submit"
                colorScheme="teal"
                isLoading={authLoading}
                disabled={state.email === "" || state.password === ""}
              >
                Ingresar
              </Button>
              <Button
                type="button"
                width="full"
                display="flex"
                colorScheme="gray"
                border="1px"
                borderColor="gray.300"
                onClick={auth0Login}
              >
                <Image src="/img/auth0.png" alt="logo_auth0" width="50px" />
                <span>Ingresar con Auth0</span>
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box color="text">
        Aun no tienes una cuenta?{" "}
        <Link as={ReactLink} color="teal.400" to="/auth/signup">
          Crear una
        </Link>
      </Box>
      {authError && (
        <Flex mt="4" alignItems="center">
          <Icon as={FaExclamationCircle} color="red.500" mr="2" />
          <Text as="span" color="red.500" fontWeight="500">
            {authError}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

export default Login;
