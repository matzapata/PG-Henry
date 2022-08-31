import { Container, Divider, Flex, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import Chart from "../components/admin/Chart";
import Featured from "../components/admin/Featured";
import SideBar from "../components/admin/SideBar";
import Widget from "../components/admin/Widget";

function Admin() {
  return (
    <Flex height={"100vh"}>
      <SideBar />
      <Divider orientation="vertical" />
      <Flex flex={6} flexDir={"column"}>
        <Heading color={"gray.400"} fontWeight={"normal"} p={5}>
          Dashboard
        </Heading>
        <Flex flex={1} m={"10px 20px"}>
          <Widget />
          <Widget />
          <Widget />
          <Widget />
        </Flex>
        <Flex p={5} flex={2}>
          <Featured />
          <Chart />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Admin;
