import React from "react";
import { Button, Flex, Text, Link, Box } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "../redux/slices/authThunk";
import Logo from "./Logo";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar() {
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const { logout, isAuthenticated } = useAuth0();

  return (
    <Flex
      justify="space-between"
      alignItems="center"
      px={[4, 10]}
      py="4"
      borderBottom="1px"
      borderColor="gray.300"
    >
      <Flex alignItems="center">
        <Logo />
        <Text
          fontSize="30px"
          fontWeight="bold"
          color="#F7F7F7"
          ml="2"
          mr={["4", "10"]}
        >
          ProdeMaster
        </Text>
        {(isLoggedIn || isAuthenticated) && (
          <>
            <Link
              color="#F7F7F7"
              fontSize="20px"
              fontWeight="medium"
              mx="4"
              as={ReactLink}
              to="/torneos"
            >
              Torneos
            </Link>
          </>
        )}
        <Link
          color="#F7F7F7"
          fontSize="20px"
          fontWeight="medium"
          mx="4"
          as={ReactLink}
          to="/about"
        >
          Sobre Nosotros
        </Link>
      </Flex>
      {isLoggedIn || isAuthenticated ? (
        <Box width="150px" display="flex" justifyContent="space-evenly">
          <Button
            as={ReactLink}
            bgColor="#4FBDBA"
            color="#F7F7F7"
            size="md"
            mr={3}
            to="/auth/perfil"
          >
            Perfil
          </Button>
          <Button
            onClick={() => {
              if (isAuthenticated && isLoggedIn) {
                logout();
                dispatch(signOut());
              } else if (isLoggedIn) dispatch(signOut());
            }}
            bgColor="#4FBDBA"
            color="#F7F7F7"
            size="md"
          >
            Salir
          </Button>
        </Box>
      ) : (
        <Box width="200px" display="flex" justifyContent="space-evenly">
          <Button
            as={ReactLink}
            to="/auth/signup"
            bgColor="#4FBDBA"
            color="#F7F7F7"
            size="md"
            mr={3}
          >
            Registrate
          </Button>
          <Button
            as={ReactLink}
            to="/auth/login"
            bgColor="#4FBDBA"
            color="#F7F7F7"
            size="md"
          >
            Ingresar
          </Button>
        </Box>
      )}
    </Flex>
  );
}
