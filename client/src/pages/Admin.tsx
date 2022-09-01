import { Divider, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Chart from "../components/admin/Chart";
import Featured from "../components/admin/Featured";
import SideBar from "../components/admin/SideBar";
import Widget from "../components/admin/Widget";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchStats } from "../redux/slices/adminThunk";

function Admin() {
  const stats = useAppSelector((state) => state.admin.stats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStats());
  }, []);

  console.log(stats);
  return (
    <Flex height={"100vh"}>
      <SideBar />
      <Divider orientation="vertical" />
      <Flex flex={6} flexDir={"column"}>
        <Heading color={"gray.400"} fontWeight={"normal"} p={5}>
          Dashboard
        </Heading>
        <Flex flex={1} m={"10px 20px"}>
          <Widget stats={stats} />
        </Flex>
        <Flex p={5} flex={2}>
          <Featured stats={stats} />
          <Chart />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Admin;
