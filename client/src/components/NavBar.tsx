import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function NavBar() {
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
        <Text fontSize="lg" fontWeight="medium" ml="2">
          ProdeMaster
        </Text>
      </Flex>
      <Button as={Link} to="/auth/login" colorScheme="purple" size="sm">
        Ingresar
      </Button>
    </Flex>
  );
}
