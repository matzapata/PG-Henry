import React from "react";
import { Button, Flex, Text, Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "../redux/slices/authThunk";
import Logo from "./Logo";

export default function NavBar() {
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

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
        {isLoggedIn && (
          <>
            <Link color="purple.500" mx="4" as={ReactLink} to="/torneos">
              Torneos
            </Link>
          </>
        )}
      </Flex>
      {isLoggedIn ? (
        <Button
          onClick={() => dispatch(signOut())}
          colorScheme="purple"
          size="sm"
        >
          Salir
        </Button>
      ) : (
        <Button as={ReactLink} to="/auth/login" colorScheme="purple" size="sm">
          Ingresar
        </Button>
      )}
    </Flex>
  );
}
