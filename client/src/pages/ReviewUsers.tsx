import React from "react";
import { Flex, Divider, Heading, Box, Button } from "@chakra-ui/react";
import Reviews from "../components/admin/UserReviews";
import SideBar from "../components/admin/SideBar";

function ReviewUsers() {
  return (
    <Flex height={"100vh"}>
      <SideBar />
      <Divider orientation="vertical" />
      <Flex flex={6} flexDir={"column"} p={5}>
        <Heading color={"gray.400"} fontWeight={"normal"} py={5}>
          Comentarios de los Usuarios
        </Heading>

        <Divider my="4" />
        <Box overflowY={"scroll"}>
          <Reviews />
        </Box>
      </Flex>
    </Flex>
  );
}

export default ReviewUsers;
