import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <>
      <NavBar />
      <Box maxWidth="3xl" mx={["4", "8", "auto"]} mt="20">
        <Heading
          fontSize={["3xl", "5xl"]}
          fontWeight="800"
          color="purple.700"
          textAlign="center"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut explicabo
          quisquam.
        </Heading>
        <Text mt="6" textAlign="center" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada sed
          habitasse felis, volutpat nunc adipiscing mi, suspendisse. Nec
          ultrices sed lectus nunc fringilla. Tellus varius hendrerit nunc in
          iaculis eget. Quam volutpat donec auctor dictum.
        </Text>
      </Box>
    </>
  );
}

export default Home;
