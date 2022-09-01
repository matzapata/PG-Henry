import { Flex, Divider, Heading } from "@chakra-ui/react";
import React from "react";
import SideBar from "../components/admin/SideBar";

function AdminMatches() {
  return (
    <Flex height={"100vh"}>
      <SideBar />
      <Divider orientation="vertical" />
      <Flex flex={6} flexDir={"column"}>
        <Heading color={"gray.400"} fontWeight={"normal"} p={5}>
          Partidos
        </Heading>
      </Flex>
    </Flex>
  );
}

export default AdminMatches;
