import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { JsxElement } from "typescript";
import { FaUsers, FaTrophy } from "react-icons/fa";
import { MdSpaceDashboard, MdSportsSoccer, MdLogout } from "react-icons/md";

function SideBar() {
  return (
    <VStack flex={1}>
      <Box p="5px">
        <Heading fontSize={"2xl"} fontWeight={"medium"} color={"buttons"} p={5}>
          Prode Master
        </Heading>
      </Box>
      <Divider />
      <VStack spacing={10} alignItems={"baseline"}>
        <Flex alignItems={"center"} mt={10}>
          <Icon as={MdSpaceDashboard} color={"buttons"} />
          <Text ml={2}>Dashboard</Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Icon as={FaUsers} color={"buttons"} />
          <Text ml={2}>Usuarios</Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Icon as={FaTrophy} color={"buttons"} />
          <Text ml={2}>Torneos</Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Icon as={MdSportsSoccer} color={"buttons"} />
          <Text ml={2}>Partidos</Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Icon as={MdLogout} color={"buttons"} />
          <Text ml={2}>Cerrar Sesion</Text>
        </Flex>
      </VStack>
    </VStack>
  );
}

export default SideBar;
