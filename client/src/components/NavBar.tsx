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
        <Text fontSize="lg" fontWeight="medium" ml="2" mr={["4", "8"]}>
          ProdeMaster
        </Text>
        {(isLoggedIn || isAuthenticated) && (
          <>
            <Link color="purple.500" mx="4" as={ReactLink} to="/torneos">
              Torneos
            </Link>
          </>
        )}
      </Flex>
      {isLoggedIn || isAuthenticated ? (
        <Box width="150px" display="flex" justifyContent="space-evenly">
          <Button colorScheme="purple" size="sm">
            Perfil
          </Button>
          <Button
            onClick={() => {
              if (isLoggedIn) dispatch(signOut());
              else if (isAuthenticated) logout();
            }}
            colorScheme="purple"
            size="sm"
          >
            Salir
          </Button>
        </Box>
      ) : (
        <Box width="200px" display="flex" justifyContent="space-evenly">
          <Button
            as={ReactLink}
            to="/auth/signup"
            colorScheme="purple"
            size="sm"
          >
            Registrate
          </Button>
          <Button
            as={ReactLink}
            to="/auth/login"
            colorScheme="purple"
            size="sm"
          >
            Ingresar
          </Button>
        </Box>
      )}
    </Flex>
  );
}
