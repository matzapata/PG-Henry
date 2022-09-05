import React from "react";
import { Button, Flex, Text, Link, Box } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Logo from "./Logo";
import SignOutButton from "./SignOutButton";
import ModalReview from "./ModalReview";

export default function NavBar() {
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const data = useAppSelector((state) => state.auth.decoded);

  return (
    <Flex
      py="4"
      px={[4, 10]}
      alignItems="center"
      borderBottom="1px"
      justify="space-between"
      borderColor="gray.300"
    >
      <Flex alignItems="center">
        <Logo />
        <Text
          ml="2"
          color="text"
          fontSize="30px"
          fontWeight="bold"
          mr={["4", "10"]}
        >
          ProdeMaster
        </Text>
        {data?.is_admin && (
          <Link
            mx="4"
            as={ReactLink}
            to={"/admin"}
            color="text"
            fontSize="20px"
            fontWeight="medium"
          >
            Admin
          </Link>
        )}

        {isLoggedIn && (
          <Link
            mx="4"
            color="text"
            fontSize="20px"
            fontWeight="medium"
            as={ReactLink}
            to="/torneos"
          >
            Torneos
          </Link>
        )}
        <Link
          mx="4"
          color="text"
          fontSize="20px"
          fontWeight="medium"
          as={ReactLink}
          to="/about"
        >
          Sobre Nosotros
        </Link>
      </Flex>
      {isLoggedIn ? (
        <Box width="325px" display="flex" justifyContent="space-evenly">
          <ModalReview />

          <Button
            size="md"
            as={ReactLink}
            bgColor="buttons"
            color="text"
            _hover={{
              bg: "secondary",
              color: "primary",
            }}
            to="/auth/perfil"
          >
            Perfil
          </Button>
          <SignOutButton />
        </Box>
      ) : (
        <Box width="200px" display="flex" justifyContent="space-evenly">
          <Button
            as={ReactLink}
            to="/auth/signup"
            bgColor="buttons"
            color="text"
            _hover={{
              bg: "secondary",
              color: "primary",
            }}
            size="md"
            mr={3}
          >
            Registrate
          </Button>
          <Button
            as={ReactLink}
            to="/auth/login"
            bgColor="buttons"
            color="text"
            _hover={{
              bg: "secondary",
              color: "primary",
            }}
            size="md"
          >
            Ingresar
          </Button>
        </Box>
      )}
    </Flex>
  );
}
