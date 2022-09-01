import React from "react";
import { Flex, Divider, Heading } from "@chakra-ui/react";
import Payments from "../components/admin/Payments";
import SideBar from "../components/admin/SideBar";

function AdminUsers() {
  return (
    <Flex height={"100vh"}>
      <SideBar />
      <Divider orientation="vertical" />
      <Flex flex={6} flexDir={"column"} p={5}>
        <Heading color={"gray.400"} fontWeight={"normal"} py={5}>
          Usuarios
        </Heading>

        <Divider my="4" />

        <Heading size="md" mb="4" color="gray.600">
          Pagos pendientes
        </Heading>
        <Payments />
      </Flex>
    </Flex>
  );
}

export default AdminUsers;
