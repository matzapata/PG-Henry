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
  Icon,
  Divider,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaExclamationCircle } from "react-icons/fa";
import { login, loginAuth0 } from "../redux/slices/authThunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link as ReactLink, useHistory } from "react-router-dom";
import { isEmail } from "../utils/validations";
import { useAuth0 } from "@auth0/auth0-react";
import Auth0SignInButton from "../components/Auth0SignInButton";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ResetPassword from "../components/ResetPassword";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const [check, setCheck] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.token);
  const authError = useAppSelector((state) => state.auth.error);
  const authLoading = useAppSelector((state) => state.auth.loading);
  const { isAuthenticated: isAuth0Authenticated, user } = useAuth0();

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

    dispatch(login({ email: state.email, password: state.password, check }));
  };

  const onChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) history.push("/");
    else if (isAuth0Authenticated) {
      dispatch(
        loginAuth0({
          email: user?.email as string,
          full_name: user?.name as string,
          birth_date: user?.birthdate as string,
          username: (user?.preferred_username
            ? user.preferred_username
            : user?.nickname) as string,
          check,
        })
      );
    }
  }, [isAuthenticated, isAuth0Authenticated]);

  return (
    <Flex
      flexDirection="column"
      minH="100vh"
      bgColor="primary"
      justifyContent="center"
      alignItems="center"
      px="4"
    >
      <Stack
        mb="2"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Avatar
          size={{ base: "md", md: "lg" }}
          bgGradient="linear(to-r, #4FBDBA, #AEFEFF)"
        />
        <Text
          bgGradient="linear(to-r, #4FBDBA, #AEFEFF)"
          bgClip="text"
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          pb="4"
        >
          Iniciar Sesión
        </Text>
        <Box w="full" maxW="md">
          <form onSubmit={onSubmit}>
            <Stack
              p="4"
              spacing="4"
              borderRadius="4"
              backgroundColor="white"
              paddingTop="30px"
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
                <Flex
                  flexDir={{ base: "column", md: "row" }}
                  justifyContent={"space-between"}
                >
                  <Checkbox
                    onChange={() => {
                      setCheck(!check);
                    }}
                    mt="2"
                  >
                    Mantener sesión iniciada
                  </Checkbox>
                  <Flex mt={"0.5rem"}>
                    <ResetPassword />
                  </Flex>
                </Flex>
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
              <Divider />
              <Auth0SignInButton />
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
      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        pt="5"
      >
        <Box display="flex" flexDir="row">
          <Link as={ReactLink} color="teal.400" to="/" fontSize="lg">
            <ArrowBackIcon mr="2" />
            Volver
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
