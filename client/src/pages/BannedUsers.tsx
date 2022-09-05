import React from "react";
import { Flex, Divider, Heading, Box } from "@chakra-ui/react";
import BannedUsers from "../components/admin/UserTable";
import SideBar from "../components/admin/SideBar";

function AdminUsers() {
  return (
    <Flex height={"100vh"}>
      <SideBar />
      <Divider orientation="vertical" />
      <Flex flex={6} flexDir={"column"} p={5}>
        <Heading color={"gray.400"} fontWeight={"normal"} py={5}>
          Usuarios Baneados
        </Heading>

        <Divider my="4" />
        <Box overflowY={"scroll"}>
          <BannedUsers />
        </Box>
      </Flex>
    </Flex>
  );
}

export default AdminUsers;
