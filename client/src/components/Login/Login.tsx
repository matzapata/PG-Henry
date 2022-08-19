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
  FormHelperText,
  InputRightElement,
  Checkbox,
  CheckboxGroup,
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
      >
        <Avatar bg="#4D4BCC" />
        <Heading color="#4D4BCC">Iniciar Sesión</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
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
                  <Input type="email" placeholder="Correo electronico" />
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
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText display="flex" justifyContent="space-between">
                  <Checkbox id="checkbox">Mantener sesión</Checkbox>
                  <Link>Olvidaste tu contraseña?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                id="login"
                type="submit"
                variant="solid"
                colorScheme="purple"
                width="full"
              >
                Iniciar
              </Button>
              <Button
                display="flex"
                borderRadius={0}
                id="auth0_login"
                type="submit"
                variant="solid"
                colorScheme="gray"
                width="full"
                onClick={login}
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
      <Box>
        Aun no tienes una cuenta?
        <Link color="#4D4BCC" href="http://localhost:3000/signup">
          Crear una
        </Link>
      </Box>
    </Flex>
  );
};

export default App;
