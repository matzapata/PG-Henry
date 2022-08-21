import React, { useEffect } from "react";
import { useState } from "react";
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
  FormHelperText,
  InputRightElement,
  Checkbox,
  Image,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Auth0Client } from "@auth0/auth0-spa-js";
// import { userLogin } from "../../redux/actions/userActions";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  let auth0: Auth0Client | null = null;
  useEffect(() => {
    const initialize = async () => {
      auth0 = new Auth0Client({
        domain: "dev-8nfj3ijq.us.auth0.com",
        client_id: "R4ZFyhpGGh2eKHFvO0MXWAWmdS6YB9oA",
        redirect_uri: "http://localhost:3000",
      });
      try {
        await auth0.getTokenSilently();
        console.log(auth0.getTokenSilently());
      } catch (e) {
        console.error(e);
      }
    };
    initialize();
  }, []);

  const login = async () => {
    try {
      await auth0?.loginWithRedirect();
    } catch (e) {}
    const isAuth = await auth0?.isAuthenticated();
    const user = await auth0?.getUser();
    console.log(user, isAuth, "auth response");
    if (isAuth) {
      const user = await auth0?.getUser();
    }
  };
  interface Inputs {
    email: string;
    password: string;
  }

  const validarCampos = (state: Inputs) => {
    const errores: Inputs = {
      email: "",
      password: "",
    };

    if (!/[a-z0-9-_.]+@[a-z]+\.[a-z]{2,3}/gi.test(state.email))
      errores.email = "Email invalido";
    else if (/[a-z0-9-_.]+@[a-z]+\.[a-z]{2,3}/gi.test(state.email))
      errores.email = "Email valido";

    return errores;
  };

  const [errores, setErrors] = useState<Inputs>({
    email: "",
    password: "",
  });

  const [state, setState] = useState<Inputs>({
    email: "",
    password: "",
  });

  const cambiosEnInput = (e: React.FormEvent<HTMLInputElement>) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
    setErrors(
      validarCampos({ ...state, [e.currentTarget.name]: e.currentTarget.value })
    );
    console.log(errores);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (errores.email !== "Email valido") {
      alert("Ingresa un correo valido");
    }

    fetch("http://localhost:8080/auth/signin", {
      method: "POST",
      body: JSON.stringify(state),
    }).then((r) => console.log(r));
    console.log(state);
  };

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
        <Avatar size="xl" bgGradient="linear(to-r, #4FBDBA, #AEFEFF)" />
        <Text
          bgGradient="linear(to-r, #4FBDBA, #AEFEFF)"
          bgClip="text"
          fontSize="7xl"
          fontWeight="bold"
        >
          Iniciar Sesión
        </Text>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              borderRadius="10px"
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Correo electronico"
                    borderColor="#B9D2D2"
                    onChange={cambiosEnInput}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    borderColor="#B9D2D2"
                    onChange={cambiosEnInput}
                    name="password"
                  />
                  <InputRightElement width="4.5rem" pr="5px">
                    <Button
                      _hover={{
                        color: "#082032",
                      }}
                      h="1.75rem"
                      size="sm"
                      onClick={handleShowClick}
                      bgColor="#4FBDBA"
                      color="#F7F7F7"
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText display="flex" justifyContent="space-between">
                  <Checkbox id="checkbox" borderColor="#B9D2D2">
                    Mantener sesión
                  </Checkbox>
                  <Link>Olvidaste tu contraseña?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                _hover={{
                  color: "#082032",
                }}
                id="login"
                type="submit"
                bgColor="#4FBDBA"
                color="#F7F7F7"
                width="full"
                onClick={(e) => handleSubmit(e)}
              >
                Iniciar
              </Button>
              <Button
                _hover={{
                  color: "#082032",
                }}
                display="flex"
                id="auth0_login"
                type="submit"
                bgColor="#4FBDBA"
                color="#F7F7F7"
                onClick={(e) => {
                  e.preventDefault;
                  login();
                }}
              >
                <Image
                  src="https://miro.medium.com/max/2400/1*kofg5S-_kcyij3HL-uCnZA.png"
                  alt="logo_auth0"
                  width="50px"
                />
                <span>Ingresar con Auth0</span>
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box color="#F7F7F7">
        Aun no tienes una cuenta?
        <Link color="#AEFEFF" ml="2px" href="http://localhost:3000/registrarse">
          Crear una
        </Link>
      </Box>
    </Flex>
  );
};

export default App;
